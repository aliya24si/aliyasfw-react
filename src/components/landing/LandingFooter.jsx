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
} from "lucide-react";

const contactItems = [
  { icon: MapPin, text: "Pekanbaru, Indonesia" },
  { icon: Phone, text: "+62 812 3456 7890" },
  { icon: Mail, text: "hello@pettract.id" },
];

const socialLinks = [
  { icon: Globe, href: "#", label: "Website" },
  { icon: MessageCircle, href: "#", label: "Chat" },
  { icon: Share2, href: "#", label: "Social" },
];

export default function LandingFooter() {
  return (
    <footer id="contact" className="border-t border-zinc-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-zinc-950 text-white w-9 h-9 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-zinc-950">PetTract</span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
              A modern clinical management platform connecting pet owners with
              veterinary professionals through seamless digital tools.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-zinc-950 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3">
              {contactItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm text-zinc-500"
                >
                  <item.icon className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="font-bold text-zinc-950 text-sm uppercase tracking-wider">
              Hours
            </h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li className="flex justify-between gap-4">
                <span>Mon - Fri</span>
                <span className="font-medium text-zinc-700">08:00 - 20:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Saturday</span>
                <span className="font-medium text-zinc-700">09:00 - 17:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Sunday</span>
                <span className="font-medium text-zinc-700">09:00 - 15:00</span>
              </li>
              <li className="flex justify-between text-zinc-950 font-medium">
                <span>Emergency</span>
                <span>24/7</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400">
            &copy; {new Date().getFullYear()} PetTract. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Heart className="w-3.5 h-3.5 text-zinc-400" />
            <span>Built with care for pets and their people</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
