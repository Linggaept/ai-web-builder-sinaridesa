"use client";

import { Check } from "lucide-react";

interface ToggleBoxProps {
  label: string;
  desc: string;
  checked: boolean;
  onChange: () => void;
}

export function ToggleBox({ label, desc, checked, onChange }: ToggleBoxProps) {
  return (
    <button
      onClick={onChange}
      className={`p-8 rounded-[36px] border-2 text-left transition-all flex flex-col group relative ${
        checked
          ? "border-[#2E7D32] bg-[#2E7D32] text-white shadow-2xl shadow-green-900/10"
          : "border-slate-100 bg-white text-[#2E7D32] hover:border-[#C8E6C9] shadow-sm hover:bg-[#FAFCF8]"
      }`}
    >
      <div className="flex justify-between items-center w-full mb-4">
        <span
          className={`text-[12px] font-black uppercase tracking-widest ${
            checked ? "text-white" : "text-[#1B5E20]"
          }`}
        >
          {label}
        </span>
        <div
          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
            checked
              ? "bg-[#66BB6A] border-[#66BB6A]"
              : "border-slate-200 bg-white"
          }`}
        >
          {checked && (
            <Check size={16} className="text-white" strokeWidth={3} />
          )}
        </div>
      </div>
      <p
        className={`text-[11px] font-medium leading-relaxed ${
          checked ? "text-green-100 opacity-80" : "text-slate-400"
        }`}
      >
        {desc}
      </p>
    </button>
  );
}
