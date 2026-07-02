import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Loader2, FileText, AlertCircle } from 'lucide-react';
import TopHeader from '../components/TopHeader';
import Modal from '../components/Modal';
import { supabase } from '../lib/supabase';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedApt, setSelectedApt] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('appointments')
        .select('*, patients(name), users(full_name)')
        .order('created_at', { ascending: false });
      if (fetchError) throw fetchError;
      setAppointments(data || []);
    } catch (err) {
      console.error("Gagal memuat appointment:", err);
      setError("Gagal memuat data appointment.");
    } finally {
      setLoading(false);
    }
  };

  const openCompleteModal = (apt) => {
    setSelectedApt(apt);
    setDiagnosis("");
    setTreatment("");
    setError(null);
    setModalOpen(true);
  };

  const handleComplete = async (e) => {
    e.preventDefault();
    if (!diagnosis || !treatment) return;

    setSaving(true);
    setError(null);

    try {
      // 1. Update appointment status ke 'completed'
      const { error: updateError } = await supabase
        .from('appointments')
        .update({ status: 'completed' })
        .eq('id', selectedApt.id);
      if (updateError) throw updateError;

      // 2. Buat rekam medis (medical_history)
      const { error: historyError } = await supabase
        .from('medical_histories')
        .insert({
          appointment_id: selectedApt.id,
          patient_id: selectedApt.patient_id,
          diagnosis,
          treatment
        });
      if (historyError) throw historyError;

      // 3. Poin member otomatis diupdate oleh PostgreSQL Trigger
      setModalOpen(false);
      loadAppointments();
    } catch (err) {
      setError("Gagal menyimpan rekam medis. Coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = async (id) => {
    if (!confirm("Batalkan appointment ini?")) return;
    setUpdating(id);
    try {
      await supabase.from('appointments').update({ status: 'cancelled' }).eq('id', id);
      loadAppointments();
    } catch (err) {
      alert("Gagal membatalkan appointment.");
    } finally {
      setUpdating(null);
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      scheduled: { color: "bg-amber-100 text-amber-800 border-amber-200", label: "Terjadwal" },
      completed: { color: "bg-emerald-100 text-emerald-800 border-emerald-200", label: "Selesai" },
      cancelled: { color: "bg-red-100 text-red-800 border-red-200", label: "Dibatalkan" },
    };
    return map[status] || { color: "bg-gray-100 text-gray-500", label: status };
  };

  const filtered = appointments.filter(a =>
    !search ||
    a.patients?.name?.toLowerCase().includes(search.toLowerCase()) ||
    a.users?.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 bg-latar min-h-screen">
      <TopHeader title="Appointments" subtitle="Manage all patient appointments" />

      <div className="p-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h2 className="text-2xl font-poppins font-bold text-teks">Appointment Management</h2>
            <p className="text-sm text-teks-samping">View, complete, and manage all appointments. Trigger otomatis akan menambah poin member saat status 'completed'.</p>
          </div>
          <input
            type="text"
            placeholder="Cari pasien atau pemilik..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72 px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-primary text-sm bg-white"
          />
        </div>

        {loading ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">
            <Loader2 className="animate-spin text-primary mx-auto mb-4" size={32} />
            <p className="text-sm text-gray-400">Memuat data appointment...</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold">
                    <th className="p-4">Pasien</th>
                    <th className="p-4">Pemilik</th>
                    <th className="p-4">Tanggal</th>
                    <th className="p-4">Jam</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-gray-400">
                        {appointments.length === 0 ? "Belum ada appointment." : "Tidak ditemukan."}
                      </td>
                    </tr>
                  ) : (
                    filtered.map((apt) => {
                      const badge = getStatusBadge(apt.status);
                      return (
                        <tr key={apt.id} className="hover:bg-gray-50/70 transition-colors">
                          <td className="p-4 font-medium text-gray-900">{apt.patients?.name || "-"}</td>
                          <td className="p-4 text-gray-600">{apt.users?.full_name || "-"}</td>
                          <td className="p-4">
                            <span className="flex items-center gap-1.5 text-gray-700">
                              <Clock size={14} className="text-gray-400" />
                              {new Date(apt.appointment_date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                            </span>
                          </td>
                          <td className="p-4 font-mono text-xs text-gray-500">{apt.appointment_time}</td>
                          <td className="p-4">
                            <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${badge.color}`}>
                              {badge.label}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center gap-2">
                              {apt.status === 'scheduled' && (
                                <>
                                  <button
                                    onClick={() => openCompleteModal(apt)}
                                    className="text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
                                  >
                                    <CheckCircle size={14} /> Selesai
                                  </button>
                                  <button
                                    onClick={() => handleCancel(apt.id)}
                                    disabled={updating === apt.id}
                                    className="text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-lg flex items-center gap-1 transition disabled:opacity-50"
                                  >
                                    {updating === apt.id ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
                                    Batal
                                  </button>
                                </>
                              )}
                              {apt.status === 'completed' && (
                                <span className="text-xs text-emerald-600 flex items-center gap-1">
                                  <FileText size={14} /> Rekam medis tersimpan
                                </span>
                              )}
                              {apt.status === 'cancelled' && (
                                <span className="text-xs text-red-400">—</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal Rekam Medis */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Input Rekam Medis">
        {selectedApt && (
          <form onSubmit={handleComplete} className="space-y-5">
            <div className="bg-slate-50 rounded-xl p-4 space-y-1 text-sm">
              <p><span className="font-bold text-slate-700">Pasien:</span> {selectedApt.patients?.name}</p>
              <p><span className="font-bold text-slate-700">Pemilik:</span> {selectedApt.users?.full_name}</p>
              <p><span className="font-bold text-slate-700">Tanggal:</span> {new Date(selectedApt.appointment_date).toLocaleDateString("id-ID")} • {selectedApt.appointment_time}</p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center gap-2">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Diagnosis</label>
              <textarea
                required
                rows="3"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Contoh: Dermatitis alergi, Gigi berlubang..."
                className="w-full bg-white px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-amber-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Tindakan / Treatment</label>
              <textarea
                required
                rows="3"
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                placeholder="Contoh: Resep antihistamin, Scaling gigi..."
                className="w-full bg-white px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-amber-400 outline-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-3 rounded-xl transition cursor-pointer shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                {saving ? "Menyimpan..." : "Konfirmasi & Simpan Rekam Medis"}
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                disabled={saving}
                className="px-6 bg-white border border-slate-200 text-slate-600 text-sm font-bold py-3 rounded-xl hover:bg-slate-50 transition cursor-pointer"
              >
                Batal
              </button>
            </div>

            <p className="text-[11px] text-slate-400 italic text-center">
              Poin member akan otomatis bertambah +100 dan tier diupdate oleh sistem saat appointment diselesaikan.
            </p>
          </form>
        )}
      </Modal>
    </div>
  );
}