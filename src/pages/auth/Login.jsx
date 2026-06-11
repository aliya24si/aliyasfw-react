import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InputField from "../../components/InputField";
import Register from "./Register";
import Forgot from "./Forgot";
import { useNavigate } from "react-router-dom"; 

export default function AuthContainer() {
  const navigate = useNavigate(); 
  
  // Menggunakan state untuk menjamin nilai input terbaca dengan akurat
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fungsi untuk menangani login multi-akun
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Normalisasi teks email yang diinput
    const cleanEmail = email.toLowerCase().trim();

    // Jalur pengkondisian akun berdasarkan state yang terisi
    if (cleanEmail === "guest@gmail.com" || cleanEmail === "guest") {
      // Jika login pakai akun guest, arahkan ke halaman guest baru
      navigate("/guest/home");
    } else {
      // Jika menggunakan akun utama (Emily/Admin), arahkan ke dashboard utama
      navigate("/"); 
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen overflow-hidden bg-white font-barlow">
      {/* SISI KIRI: Background & Teks (Hanya Desktop) */}
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
          <p className="mb-6 max-w-md text-base xl:text-lg text-gray-200 leading-relaxed opacity-90">
            This comprehensive digital solution centralizes and streamlines essential tasks, 
            empowering providers to deliver better patient care.
          </p>
        </div>
      </div>

      {/* SISI KANAN: Manajemen Tab Arah (Login - Register - Forgot) */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white p-6 md:p-10 overflow-y-auto">
        <div className="w-full max-w-[420px] flex flex-col">
          
          {/* Logo */}
          <div className="mb-6 flex justify-center lg:justify-start">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-primary">
              <span className="text-lg font-bold text-primary">M</span>
            </div>
          </div>

          {/* Shadcn UI Tabs Component */}
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-100 p-1 rounded-xl">
              <TabsTrigger value="login" className="rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm">Login</TabsTrigger>
              <TabsTrigger value="register" className="rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm">Register</TabsTrigger>
              <TabsTrigger value="forgot" className="rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm">Forgot</TabsTrigger>
            </TabsList>

            {/* Konten Login */}
            <TabsContent value="login" className="space-y-4 animate-in fade-in-50 duration-200">
              <div>
                <h2 className="text-3xl font-bold text-teks">Login</h2>
                <p className="mt-1 text-sm text-teks-samping">Let's login into your PetTrack account first</p>
              </div>
              
              <form className="space-y-4" onSubmit={handleLogin}>
                {/* Menambahkan value dan onChange agar state terikat dengan sempurna */}
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
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:opacity-95 transition-all shadow-md mt-2 cursor-pointer">
                  Login
                </button>
              </form>
            </TabsContent>

            {/* Konten Register */}
            <TabsContent value="register" className="animate-in fade-in-50 duration-200">
              <Register embedded={true} />
            </TabsContent>

            {/* Konten Forgot */}
            <TabsContent value="forgot" className="animate-in fade-in-50 duration-200">
              <Forgot embedded={true} />
            </TabsContent>
          </Tabs>

          {/* Footer Info */}
          <div className="mt-12 pt-6 flex justify-between text-[11px] text-teks-samping opacity-60 border-t border-gray-100">
            <p>© 2023 MediCare. All rights reserved.</p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-primary">Terms</a>
              <a href="#" className="hover:text-primary">Privacy</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}