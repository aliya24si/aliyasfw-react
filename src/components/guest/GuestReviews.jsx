import React from "react";
import { Star, Sparkles, Quote } from "lucide-react";

const reviews = [
  {
    image: "/img/review1.jpg",
    name: "Andi Pratama",
    role: "Pemilik Anjing Golden Retriever",
    rating: 5,
    quote: "Pelayanan sangat memuaskan! Dokter ramah dan menjelaskan dengan detail. Klinik bersih dan modern.",
  },
  {
    image: "/img/review2.jpg",
    name: "Siti Nurhaliza",
    role: "Pemilik Kucing Persia",
    rating: 5,
    quote: "Booking online sangat mudah. Tidak perlu antri lama. Rekam medis digital sangat membantu!",
  },
  {
    image: "/img/review3.jpg",
    name: "Budi Santoso",
    role: "Pemilik Hamster",
    rating: 5,
    quote: "Anak saya senang karena hamster kami sembuh setelah dirawat di sini. Terima kasih PetTract!",
  },
  {
    image: "/img/review4.jpg",
    name: "Dewi Larasati",
    role: "Pemilik Kucing Anggora",
    rating: 5,
    quote: "Fasilitas grooming terbaik di kota! Kucing saya pulang dengan bulu yang indah dan wangi.",
  },
  {
    image: "/img/review5.jpg",
    name: "Rudi Hermawan",
    role: "Pemilik Anjing Siberian Husky",
    rating: 5,
    quote: "Layanan emergensi 24 jam sangat membantu saat anjing saya sakit tengah malam. Cepat dan tanggap!",
  },
  {
    image: "/img/review6.jpg",
    name: "Maya Anggraini",
    role: "Pemilik Kelinci",
    rating: 5,
    quote: "Vaksinasi lengkap dengan harga terjangkau. Dokter memberikan edukasi perawatan yang sangat berguna.",
  },
];

export default function GuestReviews() {
  return (
    <section id="reviews" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-[#102A5E]/10 border border-[#1D4ED8]/20 text-[#102A5E] text-xs font-semibold px-4 py-2 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#1D4ED8]" />
            Testimoni & Review
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#102A5E]">
            Apa Kata Pelanggan Kami
          </h2>
          <p className="text-slate-500 leading-relaxed">
            Dengarkan pengalaman langsung dari para pemilik hewan yang telah
            menggunakan layanan PetTract.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="group bg-[#F8FAFC] border border-[#102A5E]/10 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#102A5E]/10 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 80}ms`, animationFillMode: "backwards" }}
            >
              {/* Review Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={review.image}
                  alt={`Review by ${review.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102A5E]/60 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24] drop-shadow-sm"
                    />
                  ))}
                </div>
              </div>

              {/* Review Content */}
              <div className="p-5">
                <Quote className="w-6 h-6 text-[#1D4ED8]/20 mb-2" />
                <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  &ldquo;{review.quote}&rdquo;
                </p>

                {/* Reviewer Info */}
                <div className="pt-3 border-t border-[#102A5E]/10">
                  <p className="font-bold text-[#102A5E] text-sm truncate">
                    {review.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-sm text-slate-400">
            <div className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
            <span>Rating rata-rata 5.0 dari 100+ ulasan</span>
            <div className="flex items-center gap-0.5 ml-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#FBBF24] text-[#FBBF24]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
