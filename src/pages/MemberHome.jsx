import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import MemberNavbar from "@/components/member/MemberNavbar";
import MemberWelcome from "@/components/member/MemberWelcome";
import MemberQuickActions from "@/components/member/MemberQuickActions";
import MemberOverview from "@/components/member/MemberOverview";
import MemberFooter from "@/components/member/MemberFooter";

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
      <div className="min-h-screen bg-zinc-50 text-zinc-950 antialiased flex flex-col">
        <div className="bg-white/80 backdrop-blur-md border-b border-zinc-200/60 px-6 h-16 flex items-center justify-between">
          <div className="bg-zinc-200 h-8 w-32 rounded-lg animate-pulse" />
          <div className="bg-zinc-200 h-8 w-20 rounded-lg animate-pulse" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-zinc-400 animate-spin" />
            <p className="text-sm text-zinc-400">Memuat dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="text-center space-y-4 p-8">
          <ShieldCheck className="w-16 h-16 text-zinc-300 mx-auto" />
          <h2 className="text-xl font-bold text-zinc-950">Gagal Memuat Dashboard</h2>
          <p className="text-sm text-zinc-500">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="default"
            className="bg-zinc-950 text-white hover:bg-zinc-800"
          >
            Refresh Halaman
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 antialiased flex flex-col">
      <MemberNavbar onSignOut={handleSignOut} />

      <MemberWelcome
        fullName={fullName}
        tier={tier}
        points={points}
        onBooking={() => navigate("/member/booking")}
      />

      <main className="max-w-7xl mx-auto px-6 py-10 w-full flex-1 space-y-10">
        <MemberQuickActions />
        <MemberOverview
          fullName={fullName}
          tier={tier}
          points={points}
        />

        {/* Info Banner */}
        <section>
          <div className="bg-zinc-950 rounded-2xl p-8 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold tracking-tight">
                  Butuh Bantuan?
                </h3>
                <p className="text-sm text-zinc-400 max-w-lg leading-relaxed">
                  Hubungi tim dukungan kami jika Anda memiliki pertanyaan atau
                  membutuhkan bantuan terkait layanan PetTract.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/member/history")}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Riwayat Saya
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate("/member/booking")}
                  className="bg-white text-zinc-950 hover:bg-zinc-100"
                >
                  Booking Sekarang
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MemberFooter />
    </div>
  );
}
