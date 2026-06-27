import React, { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { userAPI } from '../../services/userAPI';
import InputField from '../../components/InputField';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setLoading(true);
    setError("");

    const cleanEmail = email.toLowerCase().trim();

    try {
      // 1. Simpan data registrasi baru ke Supabase
      await userAPI.createUser({
        name,
        email: cleanEmail,
        password,
        role: "member" // Default role sesuai rancangan database
      });

      // 2. Langsung set data login di localStorage agar tersambung untuk login berikutnya
      localStorage.setItem("userRole", "member");
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", cleanEmail);

      // 3. Karena role otomatis member, arahkan langsung ke /member/home
      navigate("/member/home");
    } catch (err) {
      setError("Gagal mendaftar. Email mungkin sudah terpakai atau koneksi bermasalah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen overflow-hidden bg-white font-barlow">
      {/* SISI KIRI: Background & Teks (Sama persis seperti Login) */}
      <div className="relative hidden lg:flex w-[45%] xl:w-[50%] flex-col justify-end p-12 text-white">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/vet.jpeg')" }}
        />
        <div className="absolute inset-0 z-10 bg-primary/50 backdrop-blur-[1px]" />
        <div className="relative z-20">
          <h1 className="mb-4 text-4xl xl:text-5xl font-bold leading-tight tracking-tight">
            Optimize your medicare operations with our intelligent medical admin dashboard
          </h1>
        </div>
      </div>

      {/* SISI KANAN */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white p-6 md:p-10 overflow-y-auto">
        <div className="w-full max-w-[420px] flex flex-col">
          
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-teks">Register</h2>
              <p className="mt-1 text-sm text-teks-samping">Let's create your MediCare account first</p>
            </div>

            {error && (
              <div className="p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-xl">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleRegister}>
              <InputField 
                label="Your Name" 
                name="name" 
                type="text" 
                placeholder="Enter your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              
              <InputField 
                label="Email" 
                name="email" 
                type="email" 
                placeholder="yourname@gmail.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="relative">
                <InputField 
                  label="Password" 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="*******" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 bottom-3.5 text-teks-samping"
                >
                  {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary text-white rounded-xl font-bold text-base hover:opacity-95 transition-all shadow-md mt-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Memproses..." : "Register"}
              </button>
            </form>

            <div className="mt-4 text-center text-sm text-teks-samping">
              Sudah punya akun?{" "}
              <Link to="/login" className="text-primary font-bold hover:underline">
                Login di sini
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}