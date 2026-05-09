import { useState } from "react";

function InputField({ label, name, value, onChange, error }) {
  return (
    <div className="w-full">
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-1 px-4 py-2 border-b-2 border-gray-300 focus:border-purple-500 outline-none bg-transparent"
      />
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, error }) {
  return (
    <div className="w-full">
      <label className="text-sm text-gray-600">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-1 px-4 py-2 border-b-2 border-gray-300 focus:border-purple-500 outline-none bg-transparent"
      >
        <option value="">-- Pilih --</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
}

export default function App() {
  const [form, setForm] = useState({
    nama: "",
    sekolah: "",
    alamat: "",
    hp: "",
    lomba: "",
    peserta: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const capitalizeWords = (text) => {
    return text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "nama" && !value) error = "Nama wajib diisi";

    if (name === "sekolah" && !value) error = "Asal sekolah wajib diisi";

    if (name === "alamat") {
      if (!value) error = "Alamat wajib diisi";
      else if (value.length < 10) error = "Minimal 10 karakter";
    }

    if (name === "hp") {
      if (!value) error = "Hanya Bisa Angka";
      else if (!/^\d+$/.test(value)) error = "Hanya angka";
    }

    if (name === "lomba" && !value) error = "Pilih lomba";
    if (name === "peserta" && !value) error = "Pilih peserta";

    return error;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "nama") value = capitalizeWords(value);
    if (name === "hp") value = value.replace(/[^0-9]/g, "");

    setForm({ ...form, [name]: value });

    // VALIDASI LANGSUNG SAAT INPUT
    const errorMsg = validateField(name, value);
    setErrors({ ...errors, [name]: errorMsg });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    Object.keys(form).forEach((key) => {
      const err = validateField(key, form[key]);
      if (err) newErrors[key] = err;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const isValid = Object.values(form).every((v) => v !== "") && Object.values(errors).every((e) => e === "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white p-10">
      <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        Form Pendaftaran Lomba
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
        <InputField label="Nama" name="nama" value={form.nama} onChange={handleChange} error={errors.nama} />

        <InputField label="Asal Sekolah" name="sekolah" value={form.sekolah} onChange={handleChange} error={errors.sekolah} />

        <InputField label="Alamat" name="alamat" value={form.alamat} onChange={handleChange} error={errors.alamat} />

        <InputField label="Nomor HP / WA" name="hp" value={form.hp} onChange={handleChange} error={errors.hp} />

        <SelectField label="Kategori Lomba" name="lomba" value={form.lomba} onChange={handleChange} options={["Fotografi", "Desain", "Coding"]} error={errors.lomba} />

        <SelectField label="Kategori Peserta" name="peserta" value={form.peserta} onChange={handleChange} options={["Mahasiswa", "Siswa/Siswi"]} error={errors.peserta} />

        <div className="col-span-2">
          {isValid && (
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-3 rounded-xl hover:bg-purple-600 transition"
            >
              Submit
            </button>
          )}
        </div>
      </form>

      {submitted && (
        <div className="mt-10 max-w-4xl mx-auto p-6 bg-purple-100 rounded-xl">
          <h3 className="font-semibold mb-2">Data Berhasil Dikirim:</h3>
          <p>Nama: {form.nama}</p>
          <p>Sekolah: {form.sekolah}</p>
          <p>Alamat: {form.alamat}</p>
          <p>HP: {form.hp}</p>
          <p>Lomba: {form.lomba}</p>
          <p>Peserta: {form.peserta}</p>
        </div>
      )}
    </div>
  );
}
