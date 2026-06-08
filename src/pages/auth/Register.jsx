import React from 'react';
import { EyeOff } from 'lucide-react';

export default function Register({ embedded }) {
  const content = (
    <div className="w-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-teks font-poppins">Register</h2>
        <p className="mt-1 text-sm text-teks-samping font-barlow">Let's create your MediCare account first</p>
      </div>

      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1">
          <label className="text-xs font-medium text-teks-samping ml-1 uppercase tracking-wider">Your Name</label>
          <input type="text" placeholder="Enter your name" className="w-full px-4 py-2.5 border border-garis rounded-xl outline-none focus:border-primary text-sm text-teks" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-teks-samping ml-1 uppercase tracking-wider">Email</label>
          <input type="email" placeholder="yourname@gmail.com" className="w-full px-4 py-2.5 border border-garis rounded-xl outline-none focus:border-primary text-sm text-teks" />
        </div>
        <div className="space-y-1 relative">
          <label className="text-xs font-medium text-teks-samping ml-1 uppercase tracking-wider">Password</label>
          <div className="relative">
            <input type="password" placeholder="*******" className="w-full px-4 py-2.5 border border-garis rounded-xl outline-none focus:border-primary text-sm text-teks" />
            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-teks-samping"><EyeOff size={16} /></button>
          </div>
        </div>
        <button className="w-full py-3 bg-primary text-white rounded-xl font-bold text-base hover:opacity-95 transition-all shadow-md mt-2">
          Register
        </button>
      </form>
    </div>
  );

  if (embedded) return content;

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen justify-center items-center bg-white">
      <div className="w-full max-w-[400px] p-6">{content}</div>
    </div>
  );
}