import React, { useState } from "react";
import InputField from "../../components/InputField";
import { useNavigate, Link } from "react-router-dom"; 
import { userAPI } from "../../services/userAPI";

export default function Login() {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    const cleanEmail = email.toLowerCase().trim();

    try {
      const userFound = await userAPI.checkLogin(cleanEmail, password);

      if (userFound && userFound.length > 0) {
        const loggedInUser = userFound[0];
        // Simpan data login ke localStorage
        localStorage.setItem("userRole", loggedInUser.role);
        localStorage.setItem("userName", loggedInUser.name);
        localStorage.setItem("userEmail", loggedInUser.email);

        // Pengalihan halaman berdasarkan role database
        if (loggedInUser.role === "admin") {
          navigate("/"); // Admin ke home utama / dashboard pusat
        } else if (loggedInUser.role === "member") {
          navigate("/member/home"); // Member ke member/home
        } else if (loggedInUser.role === "guest") {
          navigate("/guest/home");
        } else {
          navigate("/");
        }
      } else {
        setError("Email atau Password salah. Silakan coba lagi.");
      }
    } catch (err) {
      setError("Terjadi masalah koneksi ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen overflow-hidden bg-white font-barlow">
      {/* SISI KIRI: Background & Teks */}
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
              <h2 className="text-3xl font-bold text-teks">Login</h2>
              <p className="mt-1 text-sm text-teks-samping">Let's login into your PetTrack account first</p>
            </div>

            {error && (
              <div className="p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-xl">
                {error}
              </div>
            )}
            
            <form className="space-y-4" onSubmit={handleLogin}>
              <InputField 
                label="Email" 
                name="email" 
                type="email" 
                placeholder="tempmail@gmail.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField 
                label="Password" 
                name="password" 
                type="password" 
                placeholder="*******" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:opacity-95 transition-all shadow-md mt-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Menghubungkan..." : "Login"}
              </button>
            </form>

            <div className="mt-4 text-center text-sm text-teks-samping">
              Belum punya akun?{" "}
              <Link to="/register" className="text-primary font-bold hover:underline">
                Register di sini
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}