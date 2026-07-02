import React from "react";
import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import AboutSection from "@/components/landing/AboutSection";
import CTASection from "@/components/landing/CTASection";
import LandingFooter from "@/components/landing/LandingFooter";

export default function GuestHome() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 antialiased flex flex-col">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  );
}
