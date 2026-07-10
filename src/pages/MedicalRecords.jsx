import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Search, Loader2, FileText, Calendar, Star } from "lucide-react";

export default function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadMedicalRecords();
  }, []);

  const loadMedicalRecords = async () => {
    try {
      setLoading(true);
      // Melakukan join ke tabel appointments untuk menarik data ulasan member sekaligus
      const { data, error } = await supabase
        .from("medical_histories")
        .select(
          `
          id,
          diagnosis,
          treatment,
          created_at,
          patient_id,
          appointment_id,
          patients (
            name,
            species
          ),
          appointments (
            rating,
            review_comment
          )
        `,
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRecords(data || []);
    } catch (err) {
      console.error("Gagal memuat rekam medis:", err);
      alert("Gagal memuat data rekam medis dari database.");
    } finally {
      setLoading(false); // <--- Ubah jadi seperti ini
    }
  };

  const filteredRecords = records.filter((record) => {
    const searchLower = search.toLowerCase();
    return (
      !search ||
      record.patients?.name?.toLowerCase().includes(searchLower) ||
      record.patients?.species?.toLowerCase().includes(searchLower) ||
      record.diagnosis?.toLowerCase().includes(searchLower)
    );
  });

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
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Kumpulan Rekam Medis
          </h1>
          <p className="text-sm text-gray-500">
            Menampilkan seluruh riwayat diagnosa, tindakan pasien, serta
            penilaian dari pelanggan ({filteredRecords.length} riwayat).
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Cari nama hewan, jenis, atau diagnosa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary text-sm"
          />
        </div>
      </div>

      {/* Konten Utama */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-20 text-gray-400 gap-2">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
          <span className="text-sm">
            Sedang mengambil riwayat rekam medis...
          </span>
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-16 text-center text-gray-400 shadow-sm">
          <div className="flex flex-col items-center gap-2">
            <FileText size={48} className="text-gray-300" />
            <p className="font-medium">
              {search
                ? "Hasil pencarian tidak ditemukan."
                : "Belum ada riwayat rekam medis terdaftar."}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRecords.map((record) => {
            const review = record.appointments; // Mengambil alias objek ulasan dari appointments

            return (
              <div
                key={record.id}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Bagian Atas Kartu: Info Pasien & Tanggal */}
                  <div className="flex justify-between items-start gap-4 pb-4 border-b border-gray-50">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        {record.patients?.name || "Pasien Tidak Diketahui"}
                      </h3>
                      <span className="inline-block mt-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                        {speciesLabels[record.patients?.species] ||
                          record.patients?.species ||
                          "-"}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-gray-400 gap-1.5 whitespace-nowrap bg-gray-50 px-2.5 py-1 rounded-lg">
                      <Calendar size={14} />
                      {record.created_at
                        ? new Date(record.created_at).toLocaleDateString(
                            "id-ID",
                            { day: "numeric", month: "short", year: "numeric" },
                          )
                        : "-"}
                    </div>
                  </div>

                  {/* Bagian Tengah Kartu: Diagnosis & Treatment */}
                  <div className="space-y-4 my-4">
                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        Diagnosis / Keluhan
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed bg-amber-50/40 p-3 rounded-xl border border-amber-100/50">
                        {record.diagnosis || "Tidak ada catatan diagnosis."}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        Tindakan / Pengobatan (Treatment)
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed bg-emerald-50/30 p-3 rounded-xl border border-emerald-100/40">
                        {record.treatment || "Tidak ada catatan tindakan."}
                      </p>
                    </div>

                    {/* SEKSI HASIL REVIEW DARI MEMBER */}
                    {review && review.rating ? (
                      <div className="pt-3 border-t border-dashed border-gray-100">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                          <Star
                            size={13}
                            className="text-amber-500 fill-amber-500"
                          />{" "}
                          Feedback Pemilik Hewan
                        </h4>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                          <div className="text-amber-500 font-bold mb-1">
                            {"★".repeat(review.rating)}
                            {"☆".repeat(5 - review.rating)}
                            <span className="text-gray-400 font-normal ml-1">
                              ({review.rating}/5)
                            </span>
                          </div>
                          <p className="text-gray-600 italic">
                            "{review.review_comment}"
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="pt-2 text-[11px] text-gray-400 italic">
                        * Belum ada ulasan yang diberikan oleh pemilik hewan.
                      </div>
                    )}
                  </div>
                </div>

                {/* Bagian Bawah Kartu: ID Referensi */}
                <div className="pt-3 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-400 font-mono">
                  <span>
                    PATIENT ID: {record.patient_id?.substring(0, 8)}...
                  </span>
                  <span>
                    APPOINTMENT: {record.appointment_id?.substring(0, 8)}...
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
