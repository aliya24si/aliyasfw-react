-- ============================================================
-- PETTRACT CRM - SAFE MIGRATION SCRIPT
-- Hanya menambahkan kolom BARU, TANPA menghapus tabel/data.
-- Jalankan di Supabase Dashboard > SQL Editor
-- ============================================================

-- ===================== 1. KOLOM BARU DI TABLE PATIENTS =====================
ALTER TABLE public.patients
  ADD COLUMN IF NOT EXISTS species text;

-- ===================== 2. KOLOM BARU DI TABLE APPOINTMENTS =====================
ALTER TABLE public.appointments
  ADD COLUMN IF NOT EXISTS service_type text,
  ADD COLUMN IF NOT EXISTS doctor_name text,
  ADD COLUMN IF NOT EXISTS total_price integer default 0,
  ADD COLUMN IF NOT EXISTS coupon_code text,
  ADD COLUMN IF NOT EXISTS discount_amount integer default 0;

-- ===================== 3. VERIFIKASI =====================
-- Cek apakah kolom sudah terbuat (akan muncul di hasil query)
SELECT 
  column_name, 
  data_type, 
  is_nullable 
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name IN ('patients', 'appointments')
ORDER BY table_name, ordinal_position;
