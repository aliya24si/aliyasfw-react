import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Search, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    loadPatients();
  }, [currentPage, search]);

  const loadPatients = async () => {
    try {
      setLoading(true);
      // Fase 1: sementara fetch semua pasien (tanpa filter user)
      // TODO: Fase 3 akan implementasi CRUD pasien dengan pagination & search
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      const result = { data: data || [], total: data?.length || 0 };
      setPatients(result.data);
      setTotalData(result.total);
    } catch (err) {
      console.error("Gagal memuat data pelanggan CRM:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalData / itemsPerPage);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset ke halaman 1 setiap kali mengetik pencarian
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(number);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-barlow">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Pasien / Pelanggan CRM</h1>
          <p className="text-sm text-gray-500">Menampilkan basis data pelanggan kelompok untuk analisis Model IDIC ({totalData} entri).</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Cari nama pelanggan..."
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary text-sm"
          />
        </div>
      </div>

      {/* Tabel Data */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold whitespace-nowrap">
                <th className="p-4">ID</th>
                <th className="p-4">Nama</th>
                <th className="p-4 text-center">JK</th>
                <th className="p-4 text-center">Usia</th>
                <th className="p-4">Kota</th>
                <th className="p-4 text-center">Freq</th>
                <th className="p-4">Total Belanja</th>
                <th className="p-4">Produk Favorit</th>
                <th className="p-4">Channel</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="10" className="p-8 text-center text-gray-400">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin text-primary" size={20} />
                      <span>Sedang memuat data dari kelompok...</span>
                    </div>
                  </td>
                </tr>
              ) : patients.length === 0 ? (
                <tr>
                  <td colSpan="10" className="p-8 text-center text-gray-400">
                    Data tidak ditemukan.
                  </td>
                </tr>
              ) : (
                patients.map((item) => (
                  <tr key={item.Customer_ID} className="hover:bg-gray-50/70 transition-colors whitespace-nowrap">
                    <td className="p-4 font-mono font-bold text-gray-500">{item.Customer_ID}</td>
                    <td className="p-4 font-medium text-gray-900">{item.Nama}</td>
                    <td className="p-4 text-center">{item.Jenis_Kelamin}</td>
                    <td className="p-4 text-center">{item.Usia} thn</td>
                    <td className="p-4">{item.Kota}</td>
                    <td className="p-4 text-center font-semibold">{item.Frekuensi_Transaksi}x</td>
                    <td className="p-4 text-emerald-600 font-medium">{formatRupiah(item.Total_Belanja)}</td>
                    <td className="p-4"><span className="bg-gray-100 px-2 py-1 rounded text-gray-600 text-xs">{item.Produk_Favorit}</span></td>
                    <td className="p-4 text-gray-500">{item.Channel_Pembelian}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        item.Status_Pelanggan === 'VIP' ? 'bg-purple-100 text-purple-700' :
                        item.Status_Pelanggan === 'Aktif' ? 'bg-blue-100 text-blue-700' :
                        item.Status_Pelanggan === 'Baru' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {item.Status_Pelanggan}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs md:text-sm text-gray-600">
            <div>
              Menampilkan <span className="font-semibold">{Math.min((currentPage - 1) * itemsPerPage + 1, totalData)}</span> sampai{" "}
              <span className="font-semibold">{Math.min(currentPage * itemsPerPage, totalData)}</span> dari{" "}
              <span className="font-semibold">{totalData}</span> pelanggan
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="font-medium text-gray-700">
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}