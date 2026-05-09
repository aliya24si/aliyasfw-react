import React, { useState } from "react";
import dataKue from "./dataKue";
import { useNavigate } from "react-router-dom";

export default function KueList() {
  const [search, setSearch] = useState("");
  const [filterKategori, setFilterKategori] = useState("All");
  const [filterHarga, setFilterHarga] = useState("All");

  // Logic filter
  const filteredData = dataKue.filter((item) => {
    return (
      item.nama.toLowerCase().includes(search.toLowerCase()) &&
      (filterKategori === "All" || item.kategori === filterKategori) &&
      (filterHarga === "All" || item.harga < 50000)
    );
  });

  // Mengambil kategori unik dari 20 data secara otomatis
  const categories = ["All", ...new Set(dataKue.map((item) => item.kategori))];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2 tracking-tight">
            Toko Kue <span className="text-pink-500">Skyland</span>
          </h1>
          <p className="text-gray-500">
            Manisnya kebahagiaan di setiap gigitan
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="relative flex-grow">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Cari kue favoritmu..."
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-pink-400 outline-none transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="border border-gray-200 p-2 rounded-xl outline-none focus:ring-2 focus:ring-pink-300 bg-white cursor-pointer"
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
            className="border border-gray-200 p-2 rounded-xl outline-none focus:ring-2 focus:ring-pink-300 bg-white cursor-pointer"
            onChange={(e) => setFilterHarga(e.target.value)}
          >
            <option value="All">Semua Harga</option>
            <option value="Murah">Dibawah 50rb</option>
          </select>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-52">
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Kategori Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm text-pink-600 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
                    {item.kategori}
                  </span>
                </div>

                {/* Stok Badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm ${item.stok > 0 ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"}`}
                  >
                    Stok: {item.stok}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Lokasi & Toko */}
                <p className="text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-1">
                  {item.lokasi.toko} • {item.lokasi.kota}
                </p>

                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors leading-tight">
                    {item.nama}
                  </h2>
                  <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-lg shrink-0">
                    <span className="text-yellow-600 text-xs font-bold">
                      ⭐ {item.detail.rating}
                    </span>
                  </div>
                </div>

                {/* Deskripsi & Detail */}
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                  Nikmati sensasi rasa {item.detail.rasa} ({item.detail.berat})
                  yang autentik dari {item.lokasi.alamat}.
                </p>

                {/* Varian & Tags (New Data) */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[9px] bg-gray-100 text-gray-400 px-2 py-0.5 rounded-md italic"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mb-4">
                  <p className="text-[10px] font-semibold text-gray-400 mb-1">
                    PILIHAN VARIAN:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.varian.map((v, i) => (
                      <span
                        key={i}
                        className="text-[10px] border border-pink-100 text-pink-500 px-2 py-0.5 rounded-full bg-pink-50/50"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold">
                      Harga
                    </p>
                    <p className="text-lg font-extrabold text-gray-900">
                      Rp {item.harga.toLocaleString("id-ID")}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-xl transition-all shadow-lg shadow-pink-200 active:scale-90">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">
              Yah, kue yang kamu cari tidak ada... 🍰
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
