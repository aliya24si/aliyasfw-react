import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Award, Sparkles, LogOut, CalendarPlus, History, Heart,
  Plus, Pencil, Trash2, PawPrint, Loader2, AlertCircle
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { Skeleton } from "../components/Skeleton";

export default function MemberPatients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formBirthDate, setFormBirthDate] = useState("");
  const [formGender, setFormGender] = useState("");

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/login"); return; }
      setUserId(user.id);

      const { data, error: fetchError } = await supabase
        .from("patients")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setPatients(data || []);
    } catch (err) {
      console.error("Gagal memuat data hewan:", err);
      setError("Gagal memuat data hewan peliharaan.");
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormName("");
    setFormBirthDate("");
    setFormGender("");
    setShowForm(true);
    setError(null);
  };

  const openEditForm = (patient) => {
    setEditingId(patient.id);
    setFormName(patient.name);
    setFormBirthDate(patient.birth_date);
    setFormGender(patient.gender || "");
    setShowForm(true);
    setError(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formName || !formBirthDate) return;

    setSaving(true);
    setError(null);

    try {
      if (editingId) {
        // Update existing
        const { error: updateError } = await supabase
          .from("patients")
          .update({ name: formName, birth_date: formBirthDate, gender: formGender || null })
          .eq("id", editingId);
        if (updateError) throw updateError;
      } else {
        // Create new
        const { error: insertError } = await supabase
          .from("patients")
          .insert({ user_id: userId, name: formName, birth_date: formBirthDate, gender: formGender || null });
        if (insertError) throw insertError;
      }

      setShowForm(false);
      loadPatients();
    } catch (err) {
      setError("Gagal menyimpan data. Coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data hewan ini?")) return;
    try {
      const { error: delError } = await supabase.from("patients").delete().eq("id", id);
      if (delError) throw delError;
      loadPatients();
    } catch (err) {
      alert("Gagal menghapus data hewan.");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col">
        <nav className="bg-slate-900 text-white px-8 py-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between">
            <Skeleton className="h-10 w-40 bg-slate-700" />
            <Skeleton className="h-10 w-28 bg-slate-700" />
          </div>
        </nav>
        <main className="max-w-5xl mx-auto px-6 py-12 space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased flex flex-col font-sans">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-slate-900 text-white px-8 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link to="/member/home" className="flex items-center gap-3 group">
              <div className="bg-amber-400 text-slate-900 w-10 h-10 rounded-xl flex items-center justify-center font-black shadow-md group-hover:scale-105 transition">
                <Award className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-base tracking-tight">PetTract</span>
            </Link>
            <div className="hidden md:flex items-center gap-1 border-l border-slate-700 pl-6 space-x-2">
              <Link to="/member/home" className="text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-xl flex items-center gap-2 transition">
                <Sparkles className="w-4 h-4" /> Beranda VIP
              </Link>
              <Link to="/member/booking" className="text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-xl flex items-center gap-2 transition">
                <CalendarPlus className="w-4 h-4" /> Buat Appointment
              </Link>
              <Link to="/member/history" className="text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-xl flex items-center gap-2 transition">
                <History className="w-4 h-4" /> Riwayat Medis
              </Link>
            </div>
          </div>
          <button onClick={handleSignOut} className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700 hover:border-slate-600 px-4 py-2.5 rounded-xl transition cursor-pointer">
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="max-w-5xl w-full mx-auto px-6 py-12 flex-1 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Kelola Data Hewan</h1>
            <p className="text-sm text-slate-500 mt-1">Daftar hewan peliharaan terdaftar di akun Anda.</p>
          </div>
          <button
            onClick={openAddForm}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition shadow-md"
          >
            <Plus className="w-4 h-4" /> Tambah Hewan Baru
          </button>
        </div>

        {/* Form Tambah/Edit */}
        {showForm && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-md">
            <h3 className="font-black text-lg text-slate-900 mb-4">
              {editingId ? "Edit Data Hewan" : "Tambah Hewan Baru"}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Nama Hewan</label>
                  <input
                    type="text" required value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Contoh: Milo, Chiko..."
                    className="w-full bg-white px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Tanggal Lahir</label>
                  <input
                    type="date" required value={formBirthDate}
                    onChange={(e) => setFormBirthDate(e.target.value)}
                    className="w-full bg-white px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Jenis Kelamin</label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value)}
                    className="w-full bg-white px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-amber-400 outline-none"
                  >
                    <option value="">-- Pilih --</option>
                    <option value="L">Jantan</option>
                    <option value="P">Betina</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit" disabled={saving}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-3 rounded-xl transition disabled:opacity-50 cursor-pointer"
                >
                  {saving ? "Menyimpan..." : editingId ? "Simpan Perubahan" : "Tambah Hewan"}
                </button>
                <button
                  type="button" onClick={() => setShowForm(false)}
                  className="bg-white border border-slate-200 text-slate-600 text-xs font-bold px-6 py-3 rounded-xl hover:bg-slate-50 transition cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Daftar Hewan */}
        {patients.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center space-y-4">
            <PawPrint className="w-16 h-16 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-600">Belum Ada Data Hewan</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Tambahkan hewan peliharaan Anda terlebih dahulu untuk mulai melakukan booking appointment.
            </p>
            <button onClick={openAddForm} className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold px-5 py-3 rounded-xl transition shadow-md">
              <Plus className="w-4 h-4 inline mr-1" /> Tambah Sekarang
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patients.map((pet) => (
              <div key={pet.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition flex justify-between items-start gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-lg shrink-0">
                    🐾
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900">{pet.name}</h4>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-slate-500 mt-1">
                      <span>{pet.gender === "L" ? "♂ Jantan" : pet.gender === "P" ? "♀ Betina" : "-"}</span>
                      <span>•</span>
                      <span>{calculateAge(pet.birth_date)} thn</span>
                      <span>•</span>
                      <span>Lahir: {new Date(pet.birth_date).toLocaleDateString("id-ID")}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => openEditForm(pet)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Edit">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(pet.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Hapus">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="text-center text-xs font-semibold text-slate-500 py-6 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between px-8 max-w-7xl w-full mx-auto gap-4">
        <p>© 2026 PetTract CRM System.</p>
        <div className="flex items-center gap-1.5 text-blue-600">
          <Heart className="w-4 h-4 fill-blue-600" /> <span>Dedicated for your animal health journey</span>
        </div>
      </footer>
    </div>
  );
}
