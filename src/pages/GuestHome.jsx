import React from "react";
import GlobalNavbar from "@/components/layout/GlobalNavbar";
import GlobalFooter from "@/components/layout/GlobalFooter";
import GuestHero from "@/components/guest/GuestHero";
import GuestFeatures from "@/components/guest/GuestFeatures";
import GuestServices from "@/components/guest/GuestServices";
import GuestStats from "@/components/guest/GuestStats";
import GuestReviews from "@/components/guest/GuestReviews";

export default function GuestHome() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#102A5E] antialiased flex flex-col">
      <GlobalNavbar isLoggedIn={false} variant="guest" />
      <main className="flex-1">
        <GuestHero />
        <GuestFeatures />
        <GuestServices />
        <GuestReviews />
      </main>
      <GlobalFooter variant="guest" />
    </div>
  );
}
