-- ============================================================
-- PETTRACT CRM - DATABASE MIGRATION SCRIPT
-- Jalankan script ini di Supabase SQL Editor (Dashboard > SQL Editor)
-- Urutan: 1) Tables 2) RLS Policies 3) Triggers
-- ============================================================

-- ===================== 0. DROP TABLES LAMA (JIKA ADA) =====================
-- Note: User sebelumnya punya tabel manual dengan id BIGINT.
-- Script ini bikin ulang public.users dengan id UUID references auth.users.
drop table if exists public.medical_histories cascade;
drop table if exists public.appointments cascade;
drop table if exists public.patients cascade;
drop table if exists public.users cascade;

-- ===================== 1. TABLES =====================

-- Tabel ekstensi dari auth.users
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  role text not null default 'member' check (role in ('admin', 'member')),
  points integer not null default 0,
  tier text not null default 'Bronze' check (tier in ('Bronze', 'Silver', 'Gold')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabel pasien/hewan peliharaan
create table public.patients (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  name text not null,
  birth_date date not null,
  gender text check (gender in ('L', 'P')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabel janji temu
create table public.appointments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  patient_id uuid references public.patients(id) on delete cascade not null,
  appointment_date date not null,
  appointment_time time not null,
  status text not null default 'scheduled' check (status in ('scheduled', 'completed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabel riwayat medis
create table public.medical_histories (
  id uuid default gen_random_uuid() primary key,
  appointment_id uuid references public.appointments(id) on delete cascade unique not null,
  patient_id uuid references public.patients(id) on delete cascade not null,
  diagnosis text not null,
  treatment text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);


-- ===================== 1.5 FUNGSI HELPER (security definer) =====================
-- Fungsi ini diperlukan untuk menghindari infinite recursion di RLS.
-- Karena policy yang mengecek public.users dari dalam policy public.users
-- menyebabkan loop tak terbatas. Dengan security definer, query ini
-- bypass RLS dan bisa membaca public.users dengan aman.

create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.users where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;


-- ===================== 2. ROW LEVEL SECURITY (RLS) =====================

-- Enable RLS on all tables
alter table public.users enable row level security;
alter table public.patients enable row level security;
alter table public.appointments enable row level security;
alter table public.medical_histories enable row level security;

-- POLICIES: USERS
-- Catatan: Password disimpan di auth.users (internal Supabase),
-- bukan di public.users. Lihat penjelasan di bagian Register/Login flow.
create policy "Users can read own data"
  on public.users for select
  using (auth.uid() = id);

-- Gunakan public.is_admin() untuk menghindari infinite recursion!
create policy "Admins can read all users"
  on public.users for select
  using (public.is_admin());

-- POLICIES: PATIENTS
create policy "Members manage own patients"
  on public.patients for all
  using (auth.uid() = user_id);

create policy "Admins manage all patients"
  on public.patients for all
  using (public.is_admin());

-- POLICIES: APPOINTMENTS
create policy "Members manage own appointments"
  on public.appointments for all
  using (auth.uid() = user_id);

create policy "Admins manage all appointments"
  on public.appointments for all
  using (public.is_admin());

-- POLICIES: MEDICAL HISTORIES
create policy "Admins fully manage medical histories"
  on public.medical_histories for all
  using (public.is_admin());

create policy "Members can view own patient histories"
  on public.medical_histories for select
  using (
    exists (
      select 1 from public.patients
      where public.patients.id = public.medical_histories.patient_id
      and public.patients.user_id = auth.uid()
    )
  );


-- ===================== 3. DATABASE TRIGGERS (Otomatisasi) =====================

-- Trigger 1: Auto-insert ke public.users saat user register via Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, full_name, role, points, tier)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Member Baru'),
    'member',
    0,
    'Bronze'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- Trigger 2: Auto-update points & tier saat appointment status jadi 'completed'
create or replace function public.update_member_points()
returns trigger as $$
declare
  total_points integer;
begin
  if new.status = 'completed' and (old.status is distinct from 'completed') then
    -- Tambah 100 poin
    update public.users
    set points = points + 100
    where id = new.user_id;

    -- Kalkulasi tier berdasarkan total poin terkini
    select points into total_points
    from public.users
    where id = new.user_id;

    if total_points > 3000 then
      update public.users set tier = 'Gold' where id = new.user_id;
    elsif total_points > 1000 then
      update public.users set tier = 'Silver' where id = new.user_id;
    else
      update public.users set tier = 'Bronze' where id = new.user_id;
    end if;
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_appointment_completed on public.appointments;
create trigger on_appointment_completed
  after update on public.appointments
  for each row execute procedure public.update_member_points();


-- ===================== 4. BUAT AKUN ADMIN PERTAMA =====================
-- CATATAN: Setelah menjalankan script di atas, daftarkan user admin
-- melalui halaman Register di aplikasi (atau via Supabase Auth UI:
-- Authentication > Users > Invite user).
--
-- Lalu cari UUID user tersebut di Authentication > Users, dan jalankan:
-- update public.users
-- set role = 'admin'
-- where id = 'uuid-user-tersebut';
-- (Ganti dengan UUID yang didapat dari Auth dashboard)
