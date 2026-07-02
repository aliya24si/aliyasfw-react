import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, LogOut, CalendarPlus, History, PawPrint, LayoutDashboard } from "lucide-react";

const navLinks = [
  { label: "Dashboard", href: "/member/home", icon: LayoutDashboard },
  { label: "Booking", href: "/member/booking", icon: CalendarPlus },
  { label: "Riwayat", href: "/member/history", icon: History },
  { label: "Pasien", href: "/member/patients", icon: PawPrint },
];

export default function MemberNavbar({ onSignOut }) {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200/60">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/member/home" className="flex items-center gap-3 group shrink-0">
          <div className="bg-zinc-950 text-white w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
            <Activity className="w-5 h-5" />
          </div>
          <span className="font-bold text-base tracking-tight text-zinc-950">
            PetTract
          </span>
          <Badge variant="outline" className="hidden sm:inline-flex text-[10px] border-zinc-300 text-zinc-500 ml-1">
            Member
          </Badge>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive
                    ? "bg-zinc-100 text-zinc-950"
                    : "text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Sign Out */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onSignOut}
          className="gap-2 text-zinc-500 hover:text-zinc-950 shrink-0"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Keluar</span>
        </Button>
      </div>
    </header>
  );
}
