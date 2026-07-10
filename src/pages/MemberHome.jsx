import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import GlobalNavbar from "@/components/layout/GlobalNavbar";
import GlobalFooter from "@/components/layout/GlobalFooter";
import MemberHeroCard from "@/components/member/MemberHeroCard";
import MemberShortcuts from "@/components/member/MemberShortcuts";
import MemberPromos from "@/components/member/MemberPromos";
import MemberOnDuty from "@/components/member/MemberOnDuty";
import MemberTierInfo from "@/components/member/MemberTierInfo"; // <-- 1. IMPORT DISINI

export default function MemberHome() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/login");
          return;
        }

        const { data, error: profileError } = await supabase
          .from("users")
          .select("full_name, role, points, tier")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) throw profileError;
        if (!cancelled) setProfile(data);
      } catch (err) {
        console.error("Gagal memuat profil member:", err);
        if (!cancelled) setError("Gagal memuat data profil. Silakan refresh halaman.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProfile();
    return () => { cancelled = true; };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const fullName = profile?.full_name || "Member";
  const tier = profile?.tier || "Bronze";
  const points = profile?.points || 0;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#102A5E] antialiased flex flex-col">
        <div className="bg-white/80 backdrop-blur-md border-b border-[#102A5E]/10 px-6 h-16 flex items-center justify-between">
          <div className="bg-[#102A5E]/10 h-8 w-32 rounded-lg animate-pulse" />
          <div className="bg-[#102A5E]/10 h-8 w-20 rounded-lg animate-pulse" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-[#1D4ED8] animate-spin" />
            <p className="text-sm text-slate-500">Memuat dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center space-y-4 p-8">
          <ShieldCheck className="w-16 h-16 text-slate-300 mx-auto" />
          <h2 className="text-xl font-bold text-[#102A5E]">Gagal Memuat Dashboard</h2>
          <p className="text-sm text-slate-500">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="default"
            className="bg-[#102A5E] text-white hover:bg-[#1D4ED8]"
          >
            Refresh Halaman
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#102A5E] antialiased flex flex-col">
      <GlobalNavbar
        isLoggedIn={true}
        onSignOut={handleSignOut}
        memberName={fullName}
        variant="member"
      />

      <MemberHeroCard
        fullName={fullName}
        tier={tier}
        points={points}
        onBooking={() => navigate("/member/patients")}
      />

      <main className="max-w-7xl mx-auto px-6 py-10 w-full flex-1 space-y-12">
        {/* 2. MASUKKAN KOMPONEN DISINI */}
        <MemberTierInfo currentPoints={points} currentTier={tier} /> 
        
        <MemberShortcuts />
        <MemberPromos />
        <MemberOnDuty />
      </main>

      <GlobalFooter variant="member" />
    </div>
  );
}