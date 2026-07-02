import React from "react";
import { Quote } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left: Text content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              <Quote className="w-3.5 h-3.5" />
              About PetTract
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 leading-[1.15]">
              Redefining Veterinary
              <br />
              <span className="text-zinc-400">Care Management</span>
            </h2>

            <div className="space-y-4 text-zinc-500 leading-relaxed">
              <p>
                PetTract was built from the ground up to address the growing
                complexity of modern veterinary practice. We believe that
                technology should enhance — not hinder — the relationship
                between veterinarians, pet owners, and the animals they care
                for.
              </p>
              <p>
                Our platform integrates scheduling, medical records, billing,
                and communication into a single, intuitive interface. By
                eliminating paperwork and streamlining workflows, we help
                clinics focus on what matters most: delivering exceptional care.
              </p>
            </div>
          </div>

          {/* Right: Quote block (asymmetric) */}
          <div className="lg:col-span-5 lg:pt-12">
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8 md:p-10 relative">
              <Quote className="w-8 h-8 text-zinc-300 mb-4" />
              <blockquote className="text-lg md:text-xl text-zinc-700 font-medium leading-relaxed italic">
                &ldquo;The best veterinary software is the one that gets out of
                your way. PetTract does exactly that — it&rsquo;s intuitive,
                fast, and our clients love the portal.&rdquo;
              </blockquote>
              <div className="mt-6 pt-6 border-t border-zinc-200">
                <p className="font-bold text-zinc-950 text-sm">drh. Rian Jombang</p>
                <p className="text-sm text-zinc-400 mt-0.5">
                  Chief Veterinarian, PetTract Clinic
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
