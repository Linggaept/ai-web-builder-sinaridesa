"use client";

import { MonitorSmartphone, Eye } from "lucide-react";
import { STYLES } from "@/app/lib/constants";
import { FormData, StyleKey } from "@/app/lib/types";

interface LivePreviewProps {
  formData: FormData;
}

export function LivePreview({ formData }: LivePreviewProps) {
  const currentStyle = STYLES[formData.style as StyleKey] || STYLES.modern;

  return (
    <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
      <div className="bg-white rounded-[64px] border border-green-100 shadow-2xl shadow-green-900/5 overflow-hidden group p-2">
        <div className="bg-[#FAFCF8] rounded-[56px] overflow-hidden border border-green-50">
          <div className="px-10 py-6 border-b border-green-50 bg-white flex items-center justify-between">
            <div className="flex gap-2.5">
              <div className="w-3 h-3 rounded-full bg-slate-200" />
              <div className="w-3 h-3 rounded-full bg-slate-200" />
            </div>
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <Eye size={14} className="animate-pulse" /> Live Preview
            </div>
          </div>
          <div
            className={`p-16 min-h-[460px] transition-all duration-1000 flex flex-col items-center justify-center text-center gap-12 ${currentStyle.color} ${currentStyle.text} relative`}
          >
            <div className="space-y-6 relative z-10">
              <div className="inline-block px-5 py-2 rounded-full border border-current opacity-30 text-[10px] font-black uppercase tracking-widest mb-4">
                {formData.industry || "Industri"}
              </div>
              <h3
                className={`font-black tracking-tighter leading-[0.9] transition-all duration-1000 ${
                  formData.style === "luxury"
                    ? "font-serif text-5xl italic"
                    : "text-5xl uppercase"
                }`}
              >
                {formData.businessName || "Proyek Anda"}
              </h3>
              <p className="text-xs font-medium opacity-50 max-w-[280px] leading-relaxed mx-auto italic">
                {formData.description
                  ? `"${formData.description.substring(0, 100)}..."`
                  : "Detail visual akan muncul di sini secara real-time."}
              </p>
            </div>
            <div className="flex flex-col gap-5 w-full max-w-[220px] relative z-10">
              <button
                style={{ backgroundColor: formData.colorPreference }}
                className="w-full py-5 rounded-[26px] text-white text-[11px] font-black uppercase tracking-widest shadow-2xl filter hover:brightness-110 transition-all"
              >
                {formData.heroCta || "Mulai Sekarang"}
              </button>
              <div className="flex justify-center gap-6 mt-4 opacity-20">
                <MonitorSmartphone size={20} />
                <div className="text-[10px] font-black uppercase tracking-[0.3em]">
                  Adaptive UI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white p-10 rounded-[44px] border border-green-100 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="text-[11px] font-black text-slate-300 uppercase mb-3">
            Kesiapan
          </div>
          <div className="text-3xl font-black text-[#2E7D32] tracking-tighter">
            {formData.features.length * 16}%
          </div>
        </div>
        <div className="bg-[#2E7D32] p-10 rounded-[44px] shadow-2xl flex items-center justify-center text-white ring-4 ring-[#C8E6C9]">
          <div className="text-[11px] font-black uppercase tracking-widest">
            Ready
          </div>
        </div>
      </div>
    </aside>
  );
}
