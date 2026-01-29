"use client";

import { Sun, History, Shield } from "lucide-react";

interface NavbarProps {
  onShowHistory: () => void;
}

export function Navbar({ onShowHistory }: NavbarProps) {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-green-900/10 group hover:scale-105 transition-transform">
            <Sun size={24} className="text-[#F9A825] fill-[#F9A825]" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-[#1B5E20]">
              SINARI DESA
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#66BB6A] animate-pulse" />
              <p className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase">
                Promt generate web builder
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onShowHistory}
            className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-[#2E7D32] flex items-center gap-2 rounded-xl transition-all hover:bg-green-50"
          >
            <History size={18} /> Arsip
          </button>
          <div className="h-8 w-px bg-green-100" />
          <div className="bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9] px-5 py-2 rounded-2xl text-[11px] font-bold flex items-center gap-2">
            <Shield size={14} /> Enterprise Ready
          </div>
        </div>
      </div>
    </nav>
  );
}
