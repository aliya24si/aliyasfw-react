import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, User, Mail, Shield, Calendar } from 'lucide-react';

export default function Settings() {
  const [loading, setLoading] = useState(false);
  
  // State untuk menampung info akun admin aktif
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    role: '',
    createdAt: ''
  });

  useEffect(() => {
    getAdminProfile();
  }, []);

  const getAdminProfile = async () => {
    try {
      setLoading(true);
      
      // 1. Ambil data user dari session Supabase Auth
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;

      if (user) {
        // 2. Ambil detail pendukung dari tabel users
        const { data: userData, error: dbError } = await supabase
          .from('users')
          .select('full_name, role, created_at')
          .eq('id', user.id)
          .single();

        if (dbError) throw dbError;

        setProfile({
          fullName: userData?.full_name || 'Admin',
          email: user.email || '',
          role: userData?.role || 'admin',
          createdAt: userData?.created_at || user.created_at
        });
      }
    } catch (error) {
      console.error("Gagal memuat informasi akun:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mendapatkan huruf inisial utama dari nama admin
  const getInitial = (name) => {
    if (!name) return 'A';
    return name.trim().charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-gray-400 gap-2">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
        <span className="text-sm font-barlow">Memuat informasi akun...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 font-barlow">
      {/* Header Halaman */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Informasi detail mengenai akun Administrator utama yang sedang aktif.</p>
      </div>

      {/* Konten Utama Informasi Akun */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Banner Atas / Profil Utama */}
        <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          {/* Avatar Lingkaran Inisial Nama */}
          <div className="w-20 h-20 bg-gradient-to-tr from-indigo-600 to-indigo-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md tracking-wider shrink-0 select-none">
            {getInitial(profile.fullName)}
          </div>
          <div className="space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">{profile.fullName}</h2>
              <span className="inline-block mx-auto sm:mx-0 bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full text-xs font-bold font-mono tracking-wide">
                {profile.role.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-400">{profile.email}</p>
          </div>
        </div>

        {/* Grid Detail Data Akun (Statis / Tampilan Bersih) */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Baris Nama */}
          <div className="flex items-start gap-3.5 bg-gray-50/50 p-4 rounded-xl border border-gray-100/50">
            <div className="p-2 bg-white rounded-lg text-gray-400 border border-gray-100 shadow-2xs">
              <User size={18} />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Nama Lengkap</h4>
              <p className="text-sm font-semibold text-gray-800 mt-1">{profile.fullName}</p>
            </div>
          </div>

          {/* Baris Email */}
          <div className="flex items-start gap-3.5 bg-gray-50/50 p-4 rounded-xl border border-gray-100/50">
            <div className="p-2 bg-white rounded-lg text-gray-400 border border-gray-100 shadow-2xs">
              <Mail size={18} />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Alamat Email</h4>
              <p className="text-sm font-semibold text-gray-800 mt-1">{profile.email}</p>
            </div>
          </div>

          {/* Baris Hak Akses / Role */}
          <div className="flex items-start gap-3.5 bg-gray-50/50 p-4 rounded-xl border border-gray-100/50">
            <div className="p-2 bg-white rounded-lg text-gray-400 border border-gray-100 shadow-2xs">
              <Shield size={18} />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Hak Akses Sistem</h4>
              <p className="text-sm font-semibold text-gray-800 mt-1 capitalize">{profile.role || 'Admin/Staff'}</p>
            </div>
          </div>

          {/* Baris Tanggal Terdaftar */}
          <div className="flex items-start gap-3.5 bg-gray-50/50 p-4 rounded-xl border border-gray-100/50">
            <div className="p-2 bg-white rounded-lg text-gray-400 border border-gray-100 shadow-2xs">
              <Calendar size={18} />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tanggal Terdaftar</h4>
              <p className="text-sm font-semibold text-gray-800 mt-1">
                {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }) : "-"}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}