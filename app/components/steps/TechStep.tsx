"use client";

import { ToggleBox } from "../ToggleBox";
import { FormData } from "@/app/lib/types";

interface TechStepProps {
  formData: FormData;
  onToggleTypescript: () => void;
  onToggleShadcn: () => void;
  onStateManagementChange: (value: "zustand" | "redux" | "context") => void;
}

export function TechStep({
  formData,
  onToggleTypescript,
  onToggleShadcn,
  onStateManagementChange,
}: TechStepProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header>
        <h2 className="text-3xl font-black text-[#1B5E20] tracking-tight">
          Engineering Stack
        </h2>
      </header>
      <div className="grid grid-cols-2 gap-5">
        <ToggleBox
          label="TypeScript"
          desc="Tipe Data Aman"
          checked={formData.useTypescript}
          onChange={onToggleTypescript}
        />
        <ToggleBox
          label="Shadcn UI"
          desc="High-End Components"
          checked={formData.useShadcn}
          onChange={onToggleShadcn}
        />
      </div>
      <div className="p-8 rounded-[32px] bg-[#FAFCF8] border border-[#C8E6C9] shadow-inner">
        <label className="text-[10px] font-black text-[#1B5E20] uppercase tracking-widest block mb-4">
          State Store
        </label>
        <div className="grid grid-cols-3 gap-3 p-1.5 bg-white rounded-[20px] shadow-sm">
          {(["zustand", "redux", "context"] as const).map((tech) => (
            <button
              key={tech}
              onClick={() => onStateManagementChange(tech)}
              className={`py-3 rounded-[14px] text-[10px] font-black uppercase transition-all ${
                formData.stateManagement === tech
                  ? "bg-[#2E7D32] text-white shadow-lg"
                  : "text-slate-400 hover:text-[#2E7D32]"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
