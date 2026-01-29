"use client";

import { Copy, Save, Rocket, ArrowRight, Braces } from "lucide-react";

interface OutputStepProps {
  generatedPrompt: string;
  isSaving: boolean;
  onSave: () => void;
  onCopy: () => void;
  onLaunchLovable: () => void;
}

export function OutputStep({
  generatedPrompt,
  isSaving,
  onSave,
  onCopy,
  onLaunchLovable,
}: OutputStepProps) {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-[#1B5E20] tracking-tight">
            Siap Meluncur
          </h2>
        </div>
        <div className="flex gap-3 pb-1">
          <button
            onClick={onSave}
            disabled={isSaving}
            className="p-4 bg-white border border-[#C8E6C9] text-[#2E7D32] hover:bg-[#F1F8E9] rounded-2xl shadow-sm transition-all"
          >
            <Save size={20} />
          </button>
          <button
            onClick={onCopy}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[11px] transition-all bg-[#1B5E20] hover:bg-[#2E7D32] text-white shadow-xl shadow-green-900/10"
          >
            <Copy size={18} /> SALIN PROMPT
          </button>
        </div>
      </header>
      <div className="bg-[#1B5E20] p-10 rounded-[40px] shadow-2xl font-mono text-[11px] leading-relaxed text-[#C8E6C9] max-h-[300px] overflow-y-auto custom-scrollbar whitespace-pre-wrap relative overflow-hidden group">
        <Braces className="absolute -top-10 -right-10 w-48 h-48 opacity-10" />
        {generatedPrompt}
      </div>
      <div className="p-12 rounded-[56px] bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-white shadow-2xl relative overflow-hidden group border border-[#66BB6A]/30">
        <Rocket className="absolute -bottom-12 -right-12 w-56 h-56 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <h3 className="text-3xl font-black tracking-tighter mb-4">
            Wujudkan Sekarang
          </h3>
          <p className="text-[13px] text-[#C8E6C9] mb-10 leading-relaxed font-medium">
            Klik tombol di bawah: sistem akan menyalin kode dan membuka Lovable.
            Anda hanya perlu tekan <b>Paste (Ctrl+V)</b> di sana.
          </p>
          <button
            onClick={onLaunchLovable}
            className="w-full flex items-center justify-center gap-4 px-10 py-5 bg-white text-[#1B5E20] rounded-[28px] font-black text-xs uppercase tracking-[0.2em] hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl group/btn"
          >
            BUKA LOVABLE.DEV{" "}
            <ArrowRight
              size={18}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
