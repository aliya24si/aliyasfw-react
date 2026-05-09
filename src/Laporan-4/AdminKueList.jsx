import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dataKue from "./dataKue"; // Pastikan file dataKue berisi 20 data JSON tersebut

export default function AdminKueList() {
  const [search, setSearch] = useState("");
  const [filterKategori, setFilterKategori] = useState("All");
  const [filterHarga, setFilterHarga] = useState("All");

  // Filter Logic
  const filteredData = dataKue.filter((item) => {
    return (
      item.nama.toLowerCase().includes(search.toLowerCase()) &&
      (filterKategori === "All" || item.kategori === filterKategori) &&
      (filterHarga === "All" || item.harga < 50000)
    );
  });

  // Mengambil daftar kategori unik untuk dropdown secara otomatis
  const categories = ["All", ...new Set(dataKue.map((item) => item.kategori))];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-700">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Admin */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">
              Skyland <span className="text-pink-500">Inventory</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Total {dataKue.length} produk terdaftar di sistem
            </p>
          </div>
        
        </div>

        {/* Filter & Search Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-center">
          <div className="relative flex-grow min-w-[250px]">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Cari produk..."
              className="pl-10 pr-4 py-2.5 w-full border border-gray-100 bg-gray-50 rounded-xl focus:ring-2 focus:ring-pink-300 outline-none transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="border border-gray-100 bg-gray-50 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-pink-300 cursor-pointer"
            value={filterKategori}
            onChange={(e) => setFilterKategori(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-100 bg-gray-50 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-pink-300 cursor-pointer"
            onChange={(e) => setFilterHarga(e.target.value)}
          >
            <option value="All">Semua Harga</option>
            <option value="Murah">Di bawah 50rb</option>
          </select>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs uppercase font-bold text-gray-400">
                    Produk & Detail
                  </th>
                  <th className="px-6 py-4 text-xs uppercase font-bold text-gray-400">
                    Info Bisnis
                  </th>
                  <th className="px-6 py-4 text-xs uppercase font-bold text-gray-400">
                    Varian & Tags
                  </th>
                  <th className="px-6 py-4 text-xs uppercase font-bold text-gray-400">
                    Stok
                  </th>
                  <th className="px-6 py-4 text-xs uppercase font-bold text-gray-400">
                    Harga
                  </th>
                  <th className="px-6 py-4 text-xs uppercase font-bold text-gray-400 text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-pink-50/20 transition-colors group"
                  >
                    {/* Produk & Detail (Rasa, Berat, Rating) */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={item.gambar}
                            alt={item.nama}
                            className="w-14 h-14 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform"
                          />
                          <span className="absolute -top-2 -right-2 bg-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded-lg border-2 border-white shadow-sm">
                            ⭐{item.detail.rating}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 leading-tight">
                            {item.nama}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {item.kategori} • {item.detail.rasa} •{" "}
                            {item.detail.berat}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Info Bisnis (Lokasi, Toko, Alamat) */}
                    <td className="px-6 py-5">
                      <p className="text-sm font-semibold text-gray-700">
                        {item.lokasi.toko}
                      </p>
                      <p className="text-[11px] text-gray-400 uppercase tracking-tighter leading-none">
                        {item.lokasi.kota}, {item.lokasi.alamat}
                      </p>
                    </td>

                    {/* Varian & Tags */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap gap-1">
                          {item.varian.map((v, index) => (
                            <span
                              key={index}
                              className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md font-medium"
                            >
                              {v}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((t, index) => (
                            <span
                              key={index}
                              className="text-[10px] bg-pink-50 text-pink-500 px-2 py-0.5 rounded-md font-bold italic"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>

                    {/* Stok */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${item.stok > 10 ? "bg-green-400" : "bg-red-400"}`}
                        ></span>
                        <span className="font-mono font-bold text-gray-700">
                          {item.stok}
                        </span>
                      </div>
                    </td>

                    {/* Harga */}
                    <td className="px-6 py-5">
                      <p className="font-extrabold text-gray-900">
                        Rp {item.harga.toLocaleString("id-ID")}
                      </p>
                    </td>

                    {/* Aksi */}
                    <td className="px-6 py-5 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          className="hover:scale-125 transition-transform"
                          title="Edit Data"
                        >
                          📝
                        </button>
                        <button
                          className="hover:scale-125 transition-transform"
                          title="Hapus Produk"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
            <p className="text-xs text-gray-500 font-medium">
              Menampilkan{" "}
              <span className="text-pink-500">{filteredData.length}</span>{" "}
              produk
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs hover:bg-gray-50">
                Prev
              </button>
              <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
