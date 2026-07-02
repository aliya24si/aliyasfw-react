import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus, Pencil, Trash2, PawPrint, Loader2, AlertCircle
} from "lucide-react";
import { supabase } from "../lib/supabase";
import GlobalNavbar from "@/components/layout/GlobalNavbar";
import GlobalFooter from "@/components/layout/GlobalFooter";

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
  const [formSpecies, setFormSpecies] = useState("");
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
    setFormSpecies("");
    setFormBirthDate("");
    setFormGender("");
    setShowForm(true);
    setError(null);
  };

  const openEditForm = (patient) => {
    setEditingId(patient.id);
    setFormName(patient.name);
    setFormSpecies(patient.species || "");
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
          .update({ name: formName, species: formSpecies || null, birth_date: formBirthDate, gender: formGender || null })
          .eq("id", editingId);
        if (updateError) throw updateError;
      } else {
        // Create new
        const { error: insertError } = await supabase
          .from("patients")
          .insert({ user_id: userId, name: formName, species: formSpecies || null, birth_date: formBirthDate, gender: formGender || null });
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
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <div className="bg-white/80 backdrop-blur-md border-b border-[#102A5E]/10 px-6 h-16 flex items-center justify-between">
          <div className="bg-[#102A5E]/10 h-8 w-40 rounded-lg animate-pulse" />
          <div className="bg-[#102A5E]/10 h-8 w-28 rounded-lg animate-pulse" />
        </div>
        <main className="max-w-5xl mx-auto px-6 py-12 w-full space-y-6">
          <div className="bg-[#102A5E]/5 h-8 w-64 rounded-lg animate-pulse" />
          <div className="bg-[#102A5E]/5 h-4 w-96 rounded-lg animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3].map(i => <div key={i} className="bg-[#102A5E]/5 h-32 w-full rounded-2xl animate-pulse" />)}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#102A5E] antialiased flex flex-col">
      <GlobalNavbar
        isLoggedIn={true}
        onSignOut={handleSignOut}
        variant="member"
      />

      <main className="max-w-5xl w-full mx-auto px-6 pt-28 pb-12 flex-1 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#102A5E] tracking-tight">Kelola Data Hewan</h1>
            <p className="text-sm text-slate-500 mt-1">Daftar hewan peliharaan terdaftar di akun Anda.</p>
          </div>
          <button
            onClick={openAddForm}
            className="bg-gradient-to-r from-[#102A5E] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#102A5E] text-white text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition shadow-md"
          >
            <Plus className="w-4 h-4" /> Tambah Hewan Baru
          </button>
        </div>

        {/* Form Tambah/Edit */}
        {showForm && (
          <div className="bg-white border border-[#102A5E]/10 rounded-3xl p-6 shadow-lg shadow-[#102A5E]/5">
            <h3 className="font-bold text-lg text-[#102A5E] mb-4">
              {editingId ? "Edit Data Hewan" : "Tambah Hewan Baru"}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Nama Hewan</label>
                  <input
                    type="text" required value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Contoh: Milo, Chiko..."
                    className="w-full bg-white px-4 py-3 rounded-xl border border-[#102A5E]/10 text-sm font-medium focus:ring-2 focus:ring-[#1D4ED8]/30 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Jenis Hewan</label>
                  <select
                    value={formSpecies}
                    onChange={(e) => setFormSpecies(e.target.value)}
                    className="w-full bg-white px-4 py-3 rounded-xl border border-[#102A5E]/10 text-sm font-medium focus:ring-2 focus:ring-[#1D4ED8]/30 outline-none"
                  >
                    <option value="">-- Pilih Jenis --</option>
                    <option value="anjing">Anjing</option>
                    <option value="kucing">Kucing</option>
                    <option value="kelinci">Kelinci</option>
                    <option value="hamster">Hamster</option>
                    <option value="burung">Burung</option>
                    <option value="reptil">Reptil</option>
                    <option value="ikan">Ikan</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Tanggal Lahir</label>
                  <input
                    type="date" required value={formBirthDate}
                    onChange={(e) => setFormBirthDate(e.target.value)}
                    className="w-full bg-white px-4 py-3 rounded-xl border border-[#102A5E]/10 text-sm font-medium focus:ring-2 focus:ring-[#1D4ED8]/30 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Jenis Kelamin</label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value)}
                    className="w-full bg-white px-4 py-3 rounded-xl border border-[#102A5E]/10 text-sm font-medium focus:ring-2 focus:ring-[#1D4ED8]/30 outline-none"
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
                  className="bg-gradient-to-r from-[#102A5E] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#102A5E] text-white text-xs font-bold px-6 py-3 rounded-xl transition disabled:opacity-50 cursor-pointer"
                >
                  {saving ? "Menyimpan..." : editingId ? "Simpan Perubahan" : "Tambah Hewan"}
                </button>
                <button
                  type="button" onClick={() => setShowForm(false)}
                  className="bg-white border border-[#102A5E]/10 text-slate-600 text-xs font-bold px-6 py-3 rounded-xl hover:bg-[#102A5E]/5 transition cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Daftar Hewan */}
        {patients.length === 0 ? (
          <div className="bg-white border border-[#102A5E]/10 rounded-3xl p-12 text-center space-y-4 shadow-sm">
            <PawPrint className="w-16 h-16 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-[#102A5E]">Belum Ada Data Hewan</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Tambahkan hewan peliharaan Anda terlebih dahulu untuk mulai melakukan booking appointment.
            </p>
            <button onClick={openAddForm} className="bg-gradient-to-r from-[#102A5E] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#102A5E] text-white text-xs font-bold px-5 py-3 rounded-xl transition shadow-md">
              <Plus className="w-4 h-4 inline mr-1" /> Tambah Sekarang
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patients.map((pet) => (
              <div key={pet.id} className="bg-white border border-[#102A5E]/10 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#1D4ED8]/20 transition-all flex justify-between items-start gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#102A5E]/10 to-[#1D4ED8]/10 flex items-center justify-center text-lg shrink-0">
                    🐾
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-[#102A5E]">{pet.name}</h4>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-slate-500 mt-1">
                      {pet.species && (
                        <>
                          <span className="bg-[#1D4ED8]/10 text-[#1D4ED8] px-2 py-0.5 rounded text-[10px] font-bold">{speciesLabels[pet.species] || pet.species}</span>
                          <span>•</span>
                        </>
                      )}
                      <span>{pet.gender === "L" ? "♂ Jantan" : pet.gender === "P" ? "♀ Betina" : "-"}</span>
                      <span>•</span>
                      <span>{calculateAge(pet.birth_date)} thn</span>
                      <span>•</span>
                      <span>Lahir: {new Date(pet.birth_date).toLocaleDateString("id-ID")}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => openEditForm(pet)} className="p-2 text-slate-400 hover:text-[#1D4ED8] hover:bg-[#1D4ED8]/5 rounded-lg transition" title="Edit">
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

      <GlobalFooter variant="member" />
    </div>
  );
}
