import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Search, ChevronLeft, ChevronRight, Loader2, PawPrint } from 'lucide-react';

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadPatients();
  }, [search]);

  const loadPatients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('patients')
        .select('*, users(full_name)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPatients(data || []);
    } catch (err) {
      console.error("Gagal memuat data pasien:", err);
      alert("Gagal memuat data pasien dari database.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = patients.filter(p =>
    !search ||
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.users?.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const speciesLabels = {
    anjing: "Anjing",
    kucing: "Kucing",
    kelinci: "Kelinci",
    hamster: "Hamster",
    burung: "Burung",
    reptil: "Reptil",
    ikan: "Ikan",
    lainnya: "Lainnya",
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-barlow">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Pasien</h1>
          <p className="text-sm text-gray-500">Menampilkan data pasien/hewan yang telah didaftarkan oleh member ({patients.length} entri).</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Cari nama hewan atau pemilik..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary text-sm"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold whitespace-nowrap">
                <th className="p-4">Nama Hewan</th>
                <th className="p-4">Jenis</th>
                <th className="p-4">JK</th>
                <th className="p-4 text-center">Usia</th>
                <th className="p-4">Pemilik</th>
                <th className="p-4">Tgl Daftar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin text-primary" size={20} />
                      <span>Memuat data pasien...</span>
                    </div>
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <PawPrint size={32} className="text-gray-300" />
                      <span>{patients.length === 0 ? "Belum ada data pasien." : "Pencarian tidak ditemukan."}</span>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition-colors whitespace-nowrap">
                    <td className="p-4 font-medium text-gray-900">{item.name}</td>
                    <td className="p-4"><span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">{speciesLabels[item.species] || item.species || "-"}</span></td>
                    <td className="p-4 text-center">{item.gender === "L" ? "♂" : item.gender === "P" ? "♀" : "-"}</td>
                    <td className="p-4 text-center">{item.birth_date ? calculateAge(item.birth_date) + " thn" : "-"}</td>
                    <td className="p-4 font-medium text-gray-900">{item.users?.full_name || "-"}</td>
                    <td className="p-4 text-gray-400">{item.created_at ? new Date(item.created_at).toLocaleDateString("id-ID") : "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && totalPages > 1 && (
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs md:text-sm text-gray-600">
            <div>
              Menampilkan {(currentPage - 1) * itemsPerPage + 1} sampai {Math.min(currentPage * itemsPerPage, filtered.length)} dari {filtered.length} pasien
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40">
                <ChevronLeft size={18} />
              </button>
              <span className="font-medium text-gray-700">Halaman {currentPage} dari {totalPages}</span>
              <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}