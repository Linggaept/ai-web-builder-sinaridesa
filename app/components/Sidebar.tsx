"use client";

import { Target, Palette, Layers, Cpu, Terminal, Check } from "lucide-react";
import { STEPS } from "@/app/lib/constants";

const iconMap = {
  Target,
  Palette,
  Layers,
  Cpu,
  Terminal,
};

interface SidebarProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

export function Sidebar({ currentStep, onStepChange }: SidebarProps) {
  return (
    <aside className="lg:col-span-3 space-y-4 sticky top-32">
      <div className="bg-white border border-green-100 rounded-[32px] p-3 shadow-sm">
        {STEPS.map((step, idx) => {
          const Icon = iconMap[step.iconName as keyof typeof iconMap];
          return (
            <button
              key={step.id}
              onClick={() => onStepChange(idx)}
              className={`w-full group flex items-center gap-4 px-5 py-4 rounded-[22px] transition-all duration-300 ${
                idx === currentStep
                  ? "bg-[#2E7D32] text-white shadow-xl shadow-green-900/10 translate-x-1"
                  : idx < currentStep
                    ? "text-[#1B5E20] bg-green-50/50"
                    : "text-slate-400 hover:text-[#2E7D32]"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  idx === currentStep
                    ? "bg-white/10 text-white"
                    : idx < currentStep
                      ? "bg-[#C8E6C9] text-[#1B5E20]"
                      : "bg-slate-50"
                }`}
              >
                {idx < currentStep ? (
                  <Check size={16} strokeWidth={3} />
                ) : (
                  <Icon size={18} />
                )}
              </div>
              <div className="text-left">
                <div className="text-xs font-black uppercase tracking-wider">
                  {step.label}
                </div>
                <div
                  className={`text-[10px] font-medium opacity-60 ${
                    idx === currentStep ? "text-green-100" : ""
                  }`}
                >
                  {step.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
