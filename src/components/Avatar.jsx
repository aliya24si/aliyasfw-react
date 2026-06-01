import React from 'react';

export default function Avatar({ src, name, size = "md" }) {
  const sizeStyles = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-xl"
  };

  const initials = name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : "??";

  return src ? (
    <img src={src} alt={name} className={`${sizeStyles[size]} rounded-full object-cover border border-gray-200`} />
  ) : (
    <div className={`${sizeStyles[size]} bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center font-bold text-teks-samping`}>
      {initials}
    </div>
  );
}