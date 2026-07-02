import React, { useState } from 'react';
import { supabaseService } from '../../services/supabaseService';

export default function Forgot({ embedded }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await supabaseService.resetPassword(email);
      setMessage("Link reset password telah dikirim ke email Anda. Silakan cek inbox/spam folder.");
    } catch (err) {
      setError("Gagal mengirim email reset. Pastikan alamat email benar.");
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <div className="w-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-teks font-poppins">Reset password</h2>
        <p className="mt-1 text-sm text-teks-samping font-barlow">Input your email address account to receive a reset link</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-xl">
          {error}
        </div>
      )}

      {message && (
        <div className="mb-4 p-3 bg-emerald-100 border border-emerald-300 text-emerald-700 text-sm rounded-xl">
          {message}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleReset}>
        <div className="space-y-1">
          <label className="text-xs font-medium text-teks-samping ml-1 uppercase tracking-wider">Email Address</label>
          <input
            type="email"
            placeholder="yourname@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-garis rounded-xl outline-none focus:border-primary text-sm text-teks"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary text-white rounded-xl font-bold text-base hover:opacity-95 transition-all shadow-md mt-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Mengirim..." : "Continue"}
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