import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  CalendarPlus,
  History,
  PawPrint,
} from "lucide-react";

const guestLinks = [
  { label: "Fitur", href: "#features" },
  { label: "Layanan", href: "#services" },
  { label: "Tentang", href: "#about" },
  { label: "Kontak", href: "#contact" },
];

const memberLinks = [
  { label: "Dashboard", href: "/member/home", icon: LayoutDashboard },
  { label: "Appointment", href: "/member/booking", icon: CalendarPlus },
  { label: "Riwayat", href: "/member/history", icon: History },
  { label: "Pasien", href: "/member/patients", icon: PawPrint },
];

export default function GlobalNavbar({ isLoggedIn = false, onSignOut, memberName, variant = "guest" }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setMobileOpen(false);
  const links = isLoggedIn ? memberLinks : guestLinks;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-[#102A5E]/10 shadow-lg shadow-[#102A5E]/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to={isLoggedIn ? "/member/home" : "/"}
          className="flex items-center gap-3 group shrink-0"
          onClick={handleNavClick}
        >
          <div className="bg-gradient-to-br from-[#102A5E] to-[#1D4ED8] text-white w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-md shadow-[#102A5E]/20">
            <Activity className="w-5 h-5" />
          </div>
          <span className="font-bold text-base tracking-tight text-[#102A5E]">
            PetTract
          </span>
          {isLoggedIn && (
            <Badge
              variant="outline"
              className="hidden sm:inline-flex text-[10px] border-[#1D4ED8]/30 text-[#1D4ED8] bg-[#1D4ED8]/5 ml-1"
            >
              Member
            </Badge>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            if (isLoggedIn) {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? "bg-[#102A5E]/10 text-[#102A5E]"
                      : "text-slate-600 hover:text-[#102A5E] hover:bg-[#102A5E]/5"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            }
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-[#102A5E] rounded-lg hover:bg-[#102A5E]/5 transition-all"
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              {memberName && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#102A5E] to-[#1D4ED8] flex items-center justify-center text-white text-xs font-bold">
                    {memberName.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-[#102A5E]">{memberName}</span>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onSignOut}
                className="gap-2 text-slate-500 hover:text-[#1D4ED8] hover:bg-[#1D4ED8]/5"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar</span>
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-medium text-slate-600 hover:text-[#102A5E]"
                >
                  Masuk
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="default"
                  size="sm"
                  className="font-medium bg-gradient-to-r from-[#102A5E] to-[#1D4ED8] text-white hover:from-[#1D4ED8] hover:to-[#102A5E] shadow-md shadow-[#102A5E]/20"
                >
                  Daftar Sekarang
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-[#102A5E] rounded-lg hover:bg-[#102A5E]/5 transition-colors"
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md border-t border-[#102A5E]/10 px-6 py-4 space-y-3">
          {links.map((link) =>
            isLoggedIn ? (
              <Link
                key={link.href}
                to={link.href}
                onClick={handleNavClick}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  location.pathname === link.href
                    ? "bg-[#102A5E]/10 text-[#102A5E]"
                    : "text-slate-600 hover:text-[#102A5E] hover:bg-[#102A5E]/5"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="block px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-[#102A5E] rounded-lg hover:bg-[#102A5E]/5 transition-all"
              >
                {link.label}
              </a>
            )
          )}

          <hr className="border-[#102A5E]/10" />

          {isLoggedIn ? (
            <>
              {memberName && (
                <div className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#102A5E] to-[#1D4ED8] flex items-center justify-center text-white text-xs font-bold">
                    {memberName.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-[#102A5E]">{memberName}</span>
                </div>
              )}
              <button
                onClick={() => { handleNavClick(); onSignOut?.(); }}
                className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-[#1D4ED8] rounded-lg hover:bg-[#1D4ED8]/5 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={handleNavClick}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start font-medium text-slate-600"
                >
                  Masuk
                </Button>
              </Link>
              <Link to="/register" onClick={handleNavClick}>
                <Button
                  variant="default"
                  size="sm"
                  className="w-full font-medium bg-gradient-to-r from-[#102A5E] to-[#1D4ED8] text-white"
                >
                  Daftar Sekarang
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
