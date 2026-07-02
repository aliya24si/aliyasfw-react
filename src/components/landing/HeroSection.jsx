import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor } from "lucide-react";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/50 to-white" />
      <div className="absolute top-40 right-0 w-96 h-96 bg-zinc-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-zinc-50/80 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Text */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Monitor className="w-3.5 h-3.5" />
                Clinical Management System
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 leading-[1.08]">
                Modern Healthcare
                <br />
                <span className="text-zinc-500">for Your </span>
                <span className="underline decoration-zinc-300 underline-offset-8 decoration-2">
                  Beloved Pets
                </span>
              </h1>
              <p className="text-lg text-zinc-500 leading-relaxed max-w-xl">
                A streamlined digital platform connecting pet owners with
                veterinary professionals. Manage appointments, access medical
                records, and track health — all in one place.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/register")}
                className="gap-2 font-semibold text-base h-12 px-8 bg-zinc-950 text-white hover:bg-zinc-800"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/login")}
                className="font-semibold text-base h-12 px-8 border-zinc-300 text-zinc-700 hover:bg-zinc-100"
              >
                Learn More
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span>Paperless Records</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span>24/7 Online Booking</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span>Secure & Encrypted</span>
              </div>
            </div>
          </div>

          {/* Right: Placeholder Illustration */}
          <div className="relative">
            <div className="aspect-[4/3] bg-zinc-100 rounded-2xl border border-zinc-200 flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-zinc-200 flex items-center justify-center mb-4">
                  <Monitor className="w-10 h-10 text-zinc-400" />
                </div>
                <p className="text-sm font-medium text-zinc-400">
                  Monochrome Illustration
                </p>
                <p className="text-xs text-zinc-300 mt-1">
                  Modern veterinary dashboard preview
                </p>
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-zinc-200 p-4 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-zinc-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-950">500+</p>
                  <p className="text-xs text-zinc-400">Active Patients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
