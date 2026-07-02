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
              <th className="p-4">Full Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Tier</th>
              <th className="p-4 text-right">Points</th>
              <th className="p-4">Tgl Daftar</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/70 transition-colors">
                <td className="p-4 font-medium text-gray-900">{user.full_name || user.name || "-"}</td>
                <td className="p-4 text-gray-500">{user.email || "-"}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                    user.role === 'guest' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    user.tier === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                    user.tier === 'Silver' ? 'bg-gray-100 text-gray-600' :
                    'bg-amber-50 text-amber-700'
                  }`}>
                    {user.tier || 'Bronze'}
                  </span>
                </td>
                <td className="p-4 text-right font-semibold text-gray-900">{(user.points || 0).toLocaleString()}</td>
                <td className="p-4 text-gray-400 text-xs">{user.created_at ? new Date(user.created_at).toLocaleDateString("id-ID") : "-"}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-3">
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