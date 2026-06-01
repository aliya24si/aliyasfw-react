import React from 'react';

export default function Badge({ status }) {
  const styles = {
    confirmed: "bg-primary text-white",
    active: "bg-green-50 text-accent border border-green-100",
    pending: "bg-amber-50 text-warning border border-amber-100",
    cancelled: "bg-red-50 text-danger border border-red-100",
    "on leave": "bg-amber-50 text-warning border border-amber-100"
  };

  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${styles[status.toLowerCase()] || "bg-gray-100 text-gray-500"}`}>
      {status}
    </span>
  );
}