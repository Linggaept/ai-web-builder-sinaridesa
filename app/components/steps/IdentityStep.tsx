"use client";

import { ChangeEvent, useState } from "react";
import { RefreshCw, Wand2, Eye, Edit3, CheckCircle2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
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
  const [showPreview, setShowPreview] = useState(false);

  // Check if description looks like it was AI enhanced (has markdown headers)
  const isEnhancedContent =
    formData.description.includes("###") || formData.description.includes("**");

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
          <div className="flex items-center gap-2">
            <label className="text-[10px] font-black text-[#2E7D32] uppercase tracking-widest">
              Visi Strategis
            </label>
            {formData.isAiEnhanced && (
              <span className="flex items-center gap-1 text-[9px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                <CheckCircle2 size={10} /> AI Enhanced
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isEnhancedContent && (
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-slate-200 transition-all border border-slate-200"
              >
                {showPreview ? <Edit3 size={12} /> : <Eye size={12} />}
                {showPreview ? "Edit" : "Preview"}
              </button>
            )}
            <button
              onClick={onEnhanceDescription}
              disabled={isEnhancing || !formData.description}
              className="flex items-center gap-2 text-[10px] font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-1.5 rounded-full hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 transition-all shadow-md"
            >
              {isEnhancing ? (
                <RefreshCw size={12} className="animate-spin" />
              ) : (
                <Wand2 size={12} />
              )}{" "}
              {isEnhancing ? "Polishing..." : "AI Polish"}
            </button>
          </div>
        </div>

        {showPreview && isEnhancedContent ? (
          <div className="w-full px-6 py-5 rounded-[28px] bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 min-h-[300px] max-h-[400px] overflow-y-auto custom-scrollbar">
            <div
              className="prose prose-sm prose-slate max-w-none
              prose-headings:text-[#1B5E20] prose-headings:font-black prose-headings:text-base prose-headings:mt-4 prose-headings:mb-2
              prose-p:text-slate-700 prose-p:text-sm prose-p:leading-relaxed
              prose-strong:text-[#2E7D32] prose-strong:font-bold
              prose-ul:my-2 prose-li:text-sm prose-li:text-slate-600 prose-li:my-0.5
              prose-h3:flex prose-h3:items-center prose-h3:gap-2
            "
            >
              <ReactMarkdown>{formData.description}</ReactMarkdown>
            </div>
          </div>
        ) : (
          <textarea
            name="description"
            value={formData.description}
            onChange={onInputChange}
            placeholder="Jelaskan visi besar solusi digital Anda... (ketik singkat lalu klik AI Polish untuk hasil optimal)"
            className="w-full px-6 py-5 rounded-[28px] bg-[#FAFCF8] border border-[#C8E6C9] focus:bg-white focus:border-[#2E7D32] focus:ring-8 focus:ring-[#2E7D32]/5 outline-none text-sm font-medium min-h-[160px] resize-none transition-all shadow-inner"
          />
        )}

        {formData.isAiEnhanced && !showPreview && isEnhancedContent && (
          <p className="text-[10px] text-purple-500 ml-2 flex items-center gap-1">
            💡 Klik &quot;Preview&quot; untuk melihat hasil AI dalam format yang
            rapi
          </p>
        )}
      </div>
    </div>
  );
}
