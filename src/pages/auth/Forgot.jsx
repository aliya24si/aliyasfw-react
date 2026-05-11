import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Forgot() {
  return (
    /* fixed inset-0 z-50 memaksa halaman memenuhi seluruh layar desktop */
    <div className="fixed inset-0 z-50 flex h-screen w-screen overflow-hidden bg-white font-barlow">
      
      {/* SISI KIRI: Image & Branding Section */}
      <div className="relative hidden lg:flex w-[45%] xl:w-[50%] flex-col justify-end p-12 text-white">
        {/* Background Image - Menggunakan foto vet.jpeg kamu */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/vet.jpeg')" }} 
        />
        {/* Overlay gelap agar teks terbaca jelas */}
        <div className="absolute inset-0 z-10 bg-primary/40 backdrop-blur-[1px]" />

        <div className="relative z-20">
          <h1 className="mb-4 text-4xl xl:text-5xl font-bold leading-tight tracking-tight font-poppins">
            Optimize your medicare operations with our intelligent medical admin dashboard
          </h1>
          <p className="mb-6 max-w-md text-base xl:text-lg text-gray-200 leading-relaxed opacity-90">
            This comprehensive digital solution centralizes and streamlines essential tasks, 
            empowering providers to deliver better patient care.
          </p>
          
          {/* Slider Indicators - Indikator ke-3 aktif untuk Forgot Password */}
          <div className="flex gap-2">
            <div className="w-2 h-1 rounded-full bg-white/30"></div>
            <div className="w-2 h-1 rounded-full bg-white/30"></div>
            <div className="w-8 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* SISI KANAN: Reset Password Form Section */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white p-6 md:p-10 relative">
        
        {/* Back Button & Logo Container */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
          <Link to="/login" className="flex items-center text-teks-samping hover:text-primary transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-primary">
            <span className="text-lg font-bold text-primary">M</span>
          </div>
        </div>

        <div className="w-full max-w-[400px] flex flex-col">
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-teks font-poppins">Reset password</h2>
            <p className="mt-2 text-teks-samping text-lg font-barlow">
              Input your email address account to receive a reset link
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-teks-samping ml-1 uppercase tracking-wider">Email Address</label>
              <input 
                type="email" 
                placeholder="yourname@gmail.com"
                className="w-full px-4 py-4 border border-garis rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-teks"
              />
            </div>

            <button className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:opacity-95 transition-all shadow-md mt-4">
              Continue
            </button>
          </form>

          {/* Footer - Didorong ke paling bawah menggunakan mt-auto */}
          <div className="mt-auto pt-20 flex justify-between text-[11px] text-teks-samping opacity-60">
            <span>© 2023 MediCare. All rights reserved.</span>
            <div className="flex gap-4">
               <Link className="hover:text-primary transition-colors">Term & Condition</Link>
               <Link className="hover:text-primary transition-colors">Privacy & Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}