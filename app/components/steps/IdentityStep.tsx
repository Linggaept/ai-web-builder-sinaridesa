"use client";

import { ChangeEvent } from "react";
import { RefreshCw, Wand2 } from "lucide-react";
import { InputField } from "../InputField";
import { FormData } from "@/app/lib/types";

interface IdentityStepProps {
  formData: FormData;
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onEnhanceDescription: () => void;
  isEnhancing: boolean;
}

export function IdentityStep({
  formData,
  onInputChange,
  onEnhanceDescription,
  isEnhancing,
}: IdentityStepProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header>
        <h2 className="text-3xl font-black text-[#1B5E20] tracking-tight">
          Identitas Produk
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Bangun kredibilitas bisnis Anda sejak langkah pertama.
        </p>
      </header>
      <div className="grid grid-cols-2 gap-5">
        <InputField
          label="Nama Proyek"
          name="businessName"
          value={formData.businessName}
          onChange={onInputChange}
          placeholder="e.g. Sinaridesa Pro"
        />
        <InputField
          label="Sektor Industri"
          name="industry"
          value={formData.industry}
          onChange={onInputChange}
          placeholder="e.g. Agri, UKM"
        />
      </div>
      <InputField
        label="Nomor WhatsApp / Kontak"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={onInputChange}
        placeholder="e.g. 0812-3456-7890"
      />
      <div className="space-y-3">
        <div className="flex justify-between items-center ml-1">
          <label className="text-[10px] font-black text-[#2E7D32] uppercase tracking-widest">
            Visi Strategis
          </label>
          <button
            onClick={onEnhanceDescription}
            disabled={isEnhancing || !formData.description}
            className="flex items-center gap-2 text-[10px] font-bold text-[#1B5E20] bg-[#F1F8E9] px-3.5 py-1.5 rounded-full hover:bg-[#C8E6C9] disabled:opacity-50 transition-all border border-[#C8E6C9]"
          >
            {isEnhancing ? (
              <RefreshCw size={12} className="animate-spin" />
            ) : (
              <Wand2 size={12} />
            )}{" "}
            AI Polish
          </button>
        </div>
        <textarea
          name="description"
          value={formData.description}
          onChange={onInputChange}
          placeholder="Jelaskan visi besar solusi digital Anda..."
          className="w-full px-6 py-5 rounded-[28px] bg-[#FAFCF8] border border-[#C8E6C9] focus:bg-white focus:border-[#2E7D32] focus:ring-8 focus:ring-[#2E7D32]/5 outline-none text-sm font-medium min-h-[160px] resize-none transition-all shadow-inner"
        />
      </div>
    </div>
  );
}
