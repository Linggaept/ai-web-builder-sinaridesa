"use client";

import {
  Monitor,
  Lock,
  Layout,
  ShoppingBag,
  Sparkles,
  Globe,
} from "lucide-react";
import { FEATURE_MODULES } from "@/app/lib/constants";
import { FormData } from "@/app/lib/types";

const iconMap = {
  Monitor,
  Lock,
  Layout,
  ShoppingBag,
  Sparkles,
  Globe,
};

interface FeaturesStepProps {
  formData: FormData;
  onProjectTypeChange: (type: "frontend" | "fullstack") => void;
  onFeatureToggle: (featureId: string) => void;
}

export function FeaturesStep({
  formData,
  onProjectTypeChange,
  onFeatureToggle,
}: FeaturesStepProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header>
        <h2 className="text-3xl font-black text-[#1B5E20] tracking-tight">
          Modul Fungsional
        </h2>
      </header>
      <div className="flex p-1.5 bg-[#F1F8E9] border border-[#C8E6C9] rounded-[22px]">
        <button
          onClick={() => onProjectTypeChange("frontend")}
          className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-[16px] transition-all ${
            formData.projectType === "frontend"
              ? "bg-white shadow-md text-[#1B5E20]"
              : "text-slate-400 hover:text-[#2E7D32]"
          }`}
        >
          Website
        </button>
        <button
          onClick={() => onProjectTypeChange("fullstack")}
          className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-[16px] transition-all ${
            formData.projectType === "fullstack"
              ? "bg-white shadow-md text-[#1B5E20]"
              : "text-slate-400 hover:text-[#2E7D32]"
          }`}
        >
          SaaS / App
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {FEATURE_MODULES.map((item) => {
          if ("pro" in item && item.pro && formData.projectType === "frontend")
            return null;
          const Icon = iconMap[item.iconName as keyof typeof iconMap];
          const active = formData.features.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => onFeatureToggle(item.id)}
              className={`flex items-center gap-4 p-5 rounded-[28px] border-2 transition-all ${
                active
                  ? "border-[#2E7D32] bg-[#2E7D32] text-white shadow-xl shadow-green-900/10"
                  : "border-slate-100 bg-white text-slate-500 hover:border-[#C8E6C9]"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  active
                    ? "bg-white/20 text-white"
                    : "bg-[#F1F8E9] text-[#2E7D32]"
                }`}
              >
                <Icon size={18} />
              </div>
              <span className="text-[11px] font-black uppercase tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
