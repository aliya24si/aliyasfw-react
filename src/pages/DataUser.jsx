import React, { useState, useEffect } from 'react';
import { supabaseService } from '../services/supabaseService';
import { supabase } from '../lib/supabase';
import UserTable from '../components/users/UserTable';

export default function DataUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await supabaseService.fetchUsers();
      setUsers(data);
    } catch (err) {
      console.error("Gagal memuat list data user:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi Edit dinonaktifkan di level ini karena form dihapus, 
  // namun fungsi ini dipertahankan kosong agar tidak merusak prop UserTable jika dibutuhkan di masa depan.
  const handleEditDummy = () => {
    alert("Form ubah data dinonaktifkan dari halaman ini.");
  };

  // Delete dinonaktifkan sementara — menghapus dari public.users tidak menghapus auth.users
  // TODO: Fase 4 akan implementasi delete user via Supabase Admin API / Edge Function
  const handleDelete = async () => {
    alert("Fitur hapus user akan tersedia di fase pengembangan selanjutnya (via Admin API).");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 font-barlow">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kelola Data Users</h1>
        <p className="text-sm text-gray-500">Pantau seluruh akun terdaftar langsung dari database Supabase.</p>
      </div>

      <div className="w-full">
        <UserTable 
          users={users}
          onEdit={handleEditDummy}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  );
}