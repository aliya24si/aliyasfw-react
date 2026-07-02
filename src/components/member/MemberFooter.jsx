import React from "react";
import { Heart } from "lucide-react";

export default function MemberFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-zinc-400">
          &copy; {new Date().getFullYear()} PetTract. All rights reserved.
        </p>
        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
          <Heart className="w-3.5 h-3.5 text-zinc-400" />
          <span>Dedicated for your animal health journey</span>
        </div>
      </div>
    </footer>
  );
}
