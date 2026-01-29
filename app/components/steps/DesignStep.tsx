"use client";

import { Check } from "lucide-react";
import { STYLES } from "@/app/lib/constants";
import { FormData, StyleKey } from "@/app/lib/types";

interface DesignStepProps {
  formData: FormData;
  onStyleChange: (style: StyleKey) => void;
}

export function DesignStep({ formData, onStyleChange }: DesignStepProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header>
        <h2 className="text-3xl font-black text-[#1B5E20] tracking-tight">
          Karakter Visual
        </h2>
      </header>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(STYLES).map(([key, val]) => (
          <button
            key={key}
            onClick={() => onStyleChange(key as StyleKey)}
            className={`group p-6 rounded-[32px] border-2 text-left transition-all ${
              formData.style === key
                ? "border-[#2E7D32] bg-[#F1F8E9] shadow-lg"
                : "border-slate-100 hover:border-[#C8E6C9] bg-white"
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="font-black text-sm text-[#1B5E20]">
                {val.label}
              </div>
              {formData.style === key && (
                <Check size={16} className="text-[#2E7D32]" />
              )}
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              {val.desc}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
