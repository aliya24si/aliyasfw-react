import React from 'react';

export default function Forgot({ embedded }) {
  const content = (
    <div className="w-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-teks font-poppins">Reset password</h2>
        <p className="mt-1 text-sm text-teks-samping font-barlow">Input your email address account to receive a reset link</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1">
          <label className="text-xs font-medium text-teks-samping ml-1 uppercase tracking-wider">Email Address</label>
          <input type="email" placeholder="yourname@gmail.com" className="w-full px-4 py-3 border border-garis rounded-xl outline-none focus:border-primary text-sm text-teks" />
        </div>
        <button className="w-full py-3 bg-primary text-white rounded-xl font-bold text-base hover:opacity-95 transition-all shadow-md mt-2">
          Continue
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