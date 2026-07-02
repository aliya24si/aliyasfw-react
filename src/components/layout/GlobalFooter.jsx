import React from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  Heart,
  Mail,
  Phone,
  MapPin,
  Globe,
  MessageCircle,
  Share2,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";

const contactItems = [
  { icon: MapPin, text: "Pekanbaru, Indonesia" },
  { icon: Phone, text: "+62 812 3456 7890" },
  { icon: Mail, text: "hello@pettract.id" },
];

const waNumber = "6281234567890";
const waTemplate = encodeURIComponent(
  "Halo PetTract! Saya butuh bantuan darurat untuk hewan kesayangan saya.%0A%0ANama:%0AJenis Hewan:%0AKondisi:%0ALokasi:"
);
const waUrl = `https://wa.me/${waNumber}?text=${waTemplate}`;

const socialLinks = [
  { icon: Globe, href: "#", label: "Website" },
  { icon: MessageCircle, href: "#", label: "Chat" },
  { icon: Share2, href: "#", label: "Social" },
];

const quickLinks = [
  { label: "Beranda", href: "/" },
  { label: "Fitur", href: "#features" },
  { label: "Layanan", href: "#services" },
  { label: "Tentang", href: "#about" },
  { label: "Kontak", href: "#contact" },
];

const serviceLinks = [
  { label: "Vaksinasi", href: "#" },
  { label: "Grooming", href: "#" },
  { label: "Konsultasi", href: "#" },
  { label: "Rawat Inap", href: "#" },
  { label: "Laboratorium", href: "#" },
];

export default function GlobalFooter({ variant = "guest" }) {
  return (
    <footer className="bg-[#102A5E] text-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm text-white w-10 h-10 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl text-white">PetTract</span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Platform manajemen klinik modern yang menghubungkan pemilik hewan
              dengan profesional veteriner melalui alat digital yang mulus.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/80">
              Menu
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/80">
              Layanan
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/80">
              Kontak
            </h4>
            <ul className="space-y-3">
              {contactItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm text-white/60"
                >
                  <item.icon className="w-4 h-4 text-white/40 shrink-0" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>

            {/* Hours */}
            <div className="pt-4 space-y-2">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-white/60">
                Jam Operasional
              </h5>
              <ul className="space-y-1.5 text-sm text-white/60">
                <li className="flex justify-between gap-4">
                  <span>Sen - Jum</span>
                  <span className="font-medium text-white/80">08:00 - 20:00</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Sabtu</span>
                  <span className="font-medium text-white/80">09:00 - 17:00</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Minggu</span>
                  <span className="font-medium text-white/80">09:00 - 15:00</span>
                </li>
                <li className="flex justify-between text-white font-medium pt-1">
                  <span>UGD Hotline</span>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#FBBF24] hover:text-[#FCD34D] transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    WhatsApp 24/7
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} PetTract. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <Heart className="w-3.5 h-3.5 text-white/40" />
            <span>Dibuat dengan penuh perhatian untuk hewan kesayangan Anda</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
