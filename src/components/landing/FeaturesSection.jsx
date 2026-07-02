import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  CalendarCheck,
  FileText,
  ShieldCheck,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: CalendarCheck,
    title: "Smart Scheduling",
    description:
      "Book appointments effortlessly with real-time availability. Choose your preferred time slot and receive instant confirmation.",
  },
  {
    icon: FileText,
    title: "Digital Records",
    description:
      "Comprehensive electronic health records that follow your pet. Access history, diagnoses, and prescriptions anytime.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    description:
      "Enterprise-grade encryption protects all medical data. Your privacy and your pet's information stay completely confidential.",
  },
  {
    icon: Clock,
    title: "24/7 Access",
    description:
      "Round-the-clock access to the portal. Book appointments, view records, and communicate with your veterinary team on your schedule.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-zinc-50/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            <CalendarCheck className="w-3.5 h-3.5" />
            Platform Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-950">
            Everything You Need
          </h2>
          <p className="text-zinc-500 leading-relaxed">
            A comprehensive set of tools designed to simplify veterinary care
            management for both clinics and pet owners.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group border-zinc-200/80 bg-white transition-all duration-300 hover:shadow-md hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-200 transition-colors duration-300 mb-3">
                  <feature.icon className="w-6 h-6 text-zinc-700" />
                </div>
                <CardTitle className="font-bold text-zinc-950 text-lg">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
