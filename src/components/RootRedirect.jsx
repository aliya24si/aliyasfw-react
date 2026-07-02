import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Loading from "./Loading";

export default function RootRedirect() {
  const [state, setState] = useState("loading"); // loading | guest | member | admin

  useEffect(() => {
    let cancelled = false;

    async function checkAuth() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (cancelled) return;

        if (!session) {
          setState("guest");
          return;
        }

        // Ambil role dari public.users
        const { data } = await supabase
          .from("users")
          .select("role")
          .eq("id", session.user.id)
          .maybeSingle();

        if (cancelled) return;

        if (data?.role === "admin") {
          setState("admin");
        } else {
          // Default: member (termasuk jika role tidak ditemukan)
          setState("member");
        }
      } catch (err) {
        console.error("RootRedirect error:", err);
        if (!cancelled) setState("guest");
      }
    }

    checkAuth();

    return () => {
      cancelled = true;
    };
  }, []);

  if (state === "loading") return <Loading />;

  if (state === "guest") {
    const GuestHome = React.lazy(() => import("../pages/GuestHome"));
    return (
      <React.Suspense fallback={<Loading />}>
        <GuestHome />
      </React.Suspense>
    );
  }

  if (state === "member") {
    const MemberHome = React.lazy(() => import("../pages/MemberHome"));
    return (
      <React.Suspense fallback={<Loading />}>
        <MemberHome />
      </React.Suspense>
    );
  }

  // Admin → redirect ke dashboard admin
  if (state === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/login" replace />;
}
