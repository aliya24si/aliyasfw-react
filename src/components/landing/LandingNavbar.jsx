import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Fitur", href: "#features" },
  { label: "Tentang", href: "#about" },
  { label: "Kontak", href: "#contact" },
];

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change / link click
  const handleNavClick = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-zinc-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" onClick={handleNavClick}>
          <div className="bg-zinc-950 text-white w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
            <Activity className="w-5 h-5" />
          </div>
          <span className="font-bold text-base tracking-tight text-zinc-950">
            PetTract
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-950 rounded-lg hover:bg-zinc-100 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button
              variant="ghost"
              size="sm"
              className="font-medium text-zinc-600"
            >
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button
              variant="default"
              size="sm"
              className="font-medium bg-zinc-950 text-white hover:bg-zinc-800"
            >
              Register
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-zinc-600 hover:text-zinc-950 rounded-lg hover:bg-zinc-100 transition-colors"
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-zinc-200 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="block px-3 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-950 rounded-lg hover:bg-zinc-100 transition-all"
            >
              {link.label}
            </a>
          ))}
          <hr className="border-zinc-100" />
          <Link to="/login" onClick={handleNavClick}>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start font-medium text-zinc-600"
            >
              Login
            </Button>
          </Link>
          <Link to="/register" onClick={handleNavClick}>
            <Button
              variant="default"
              size="sm"
              className="w-full font-medium bg-zinc-950 text-white hover:bg-zinc-800"
            >
              Register
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
