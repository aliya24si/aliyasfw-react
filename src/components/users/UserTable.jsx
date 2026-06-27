import React from 'react';
import { Trash2 } from 'lucide-react';

export default function UserTable({ users, onDelete, loading }) {
  if (users.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-gray-400 bg-white border rounded-2xl">
        Belum ada data user terdaftar di Supabase.
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold">
              <th className="p-4">Nama</th>
              <th className="p-4">Email</th>
              <th className="p-4">Password</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/70 transition-colors">
                <td className="p-4 font-medium text-gray-900">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4 font-mono text-xs text-gray-400">{user.password}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                    user.role === 'guest' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-3">
                    {/* Tombol edit dihapus karena form registrasi/edit sudah ditiadakan di halaman ini */}
                    <button 
                      onClick={() => onDelete(user.id)}
                      disabled={loading}
                      className="text-gray-500 hover:text-red-600 transition-colors disabled:opacity-40"
                      title="Hapus User"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}