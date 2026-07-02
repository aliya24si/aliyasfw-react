import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-zinc-950 rounded-2xl p-10 md:p-16 text-white relative overflow-hidden">
          {/* Subtle decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-20 w-48 h-48 bg-white/[0.02] rounded-full blur-3xl" />

          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              Get Started Today
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.15]">
              Ready to Transform Your
              <br />
              Pet Care Experience?
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-lg mx-auto">
              Join thousands of pet owners who trust PetTract for their
              veterinary care management. Sign up free — no credit card
              required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => navigate("/register")}
                className="bg-white text-zinc-950 hover:bg-zinc-100 font-semibold gap-2 h-12 px-8 shadow-lg"
              >
                Register Now
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/login")}
                className="border-white/20 text-white hover:bg-white/10 font-semibold h-12 px-8"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
