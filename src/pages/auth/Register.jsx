import { Link } from 'react-router-dom';
import { EyeOff, ArrowLeft } from 'lucide-react';

export default function Register() {
  return (
    /* fixed inset-0 z-50 memastikan halaman memenuhi layar desktop secara absolut */
    <div className="fixed inset-0 z-50 flex h-screen w-screen overflow-hidden bg-white font-barlow">
      
      {/* SISI KIRI: Image & Branding Section */}
      <div className="relative hidden lg:flex w-[45%] xl:w-[50%] flex-col justify-end p-12 text-white">
        {/* Background Image - Menggunakan foto vet.jpeg kamu */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/vet.jpeg')" }} 
        />
        {/* Overlay gelap agar teks terbaca jelas (Konsisten dengan Login) */}
        <div className="absolute inset-0 z-10 bg-primary/40 backdrop-blur-[1px]" />

        <div className="relative z-20">
          <h1 className="mb-4 text-4xl xl:text-5xl font-bold leading-tight tracking-tight font-poppins">
            Optimize your medicare operations with our intelligent medical admin dashboard
          </h1>
          <p className="mb-6 max-w-md text-base xl:text-lg text-gray-200 leading-relaxed opacity-90">
            This comprehensive digital solution centralizes and streamlines essential tasks, 
            empowering providers to deliver better patient care.
          </p>
          
          {/* Slider Indicators */}
          <div className="flex gap-2">
            <div className="w-2 h-1 rounded-full bg-white/30"></div>
            <div className="w-8 h-1 bg-white rounded-full"></div>
            <div className="w-2 h-1 rounded-full bg-white/30"></div>
          </div>
        </div>
      </div>

      {/* SISI KANAN: Register Form Section */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white p-6 md:p-10 relative overflow-y-auto">
        
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
          <div className="mb-6 mt-12 lg:mt-0">
            <h2 className="text-3xl font-bold text-teks font-poppins">Register</h2>
            <p className="mt-1 text-teks-samping text-base font-barlow">Let's create your MediCare account first</p>
          </div>

          <form className="space-y-4">
            {/* Your Name Field */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-teks-samping ml-1 uppercase tracking-wider">Your Name</label>
              <input 
                type="text" 
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-garis rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-teks"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-teks-samping ml-1 uppercase tracking-wider">Email</label>
              <input 
                type="email" 
                placeholder="yourname@gmail.com"
                className="w-full px-4 py-3 border border-garis rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-teks"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1 relative">
              <label className="text-xs font-medium text-teks-samping ml-1 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="*******"
                  className="w-full px-4 py-3 border border-garis rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-teks"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-teks-samping">
                  <EyeOff size={18} />
                </button>
              </div>
            </div>

            {/* Repeat Password Field */}
            <div className="space-y-1 relative">
              <label className="text-xs font-medium text-teks-samping ml-1 uppercase tracking-wider">Repeat Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="*******"
                  className="w-full px-4 py-3 border border-garis rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-teks"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-teks-samping">
                  <EyeOff size={18} />
                </button>
              </div>
            </div>

            <button className="w-full py-3.5 bg-primary text-white rounded-xl font-bold text-lg hover:opacity-95 transition-all shadow-md mt-4">
              Register
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-teks-samping">
            Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline ml-1">Login Here</Link>
          </p>

          {/* Footer - mt-auto akan mendorong footer ke bawah kontainer */}
          <div className="mt-auto pt-8 flex justify-between text-[11px] text-teks-samping opacity-60">
            <span>© 2023 MediCare. All rights reserved.</span>
            <div className="flex gap-3">
               <Link className="hover:text-primary transition-colors">Term & Condition</Link>
               <Link className="hover:text-primary transition-colors">Privacy & Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}