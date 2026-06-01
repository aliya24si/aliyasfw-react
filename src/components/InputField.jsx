import React from 'react';

export default function InputField({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div className="space-y-1 w-full">
      {label && <label className="text-xs font-medium text-teks-samping ml-1 uppercase tracking-wider">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-garis bg-white px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-teks"
      />
    </div>
  );
}