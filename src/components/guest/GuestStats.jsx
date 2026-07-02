import React from "react";
import { Quote, Star } from "lucide-react";

const stats = [
  { number: "500+", label: "Pasien Aktif" },
  { number: "50+", label: "Dokter Ahli" },
  { number: "5.000+", label: "Janji Temu" },
  { number: "98%", label: "Kepuasan" },
];

const testimonials = [
  {
    quote: "PetTract benar-benar mengubah cara kami mengelola klinik. Rekam medis digital dan sistem booking-nya sangat membantu.",
    name: "drh. Rian Jombang",
    role: "Kepala Dokter Hewan",
  },
  {
    quote: "Sekarang saya bisa memantau kesehatan kucing saya dari rumah. Booking janji temu jadi sangat mudah!",
    name: "Sarah Wijaya",
    role: "Pemilik Hewan",
  },
];

export default function GuestStats() {
  return (
    <section id="about" className="py-20 md:py-28">
      {/* Stats Band */}
      <div className="bg-gradient-to-br from-[#102A5E] to-[#1D4ED8] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center space-y-2 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}
              >
                <p className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  {stat.number}
                </p>
                <p className="text-sm text-white/70 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#102A5E]">
              Apa Kata Mereka
            </h2>
            <p className="text-slate-500 leading-relaxed">
              Dengarkan pengalaman dari para pengguna dan mitra kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#F8FAFC] border border-[#102A5E]/10 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-[#102A5E]/5 hover:-translate-y-0.5"
              >
                <Quote className="w-8 h-8 text-[#1D4ED8]/30 mb-4" />
                <p className="text-slate-600 leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]"
                    />
                  ))}
                </div>
                <div className="pt-4 border-t border-[#102A5E]/10">
                  <p className="font-bold text-[#102A5E] text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
