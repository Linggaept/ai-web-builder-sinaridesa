"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Copy,
  Save,
  Rocket,
  ArrowRight,
  Braces,
  Sparkles,
  Loader2,
  CheckCircle2,
} from "lucide-react";

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
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedPrompt, setEnhancedPrompt] = useState<string | null>(null);
  const [enhanceError, setEnhanceError] = useState<string | null>(null);

  const handleEnhancePrompt = async () => {
    setIsEnhancing(true);
    setEnhanceError(null);
    try {
      const response = await fetch("/api/enhance-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: generatedPrompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal meng-enhance prompt");
      }

      setEnhancedPrompt(data.enhanced);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Terjadi kesalahan";
      setEnhanceError(message);
    } finally {
      setIsEnhancing(false);
    }
  };

  const copyEnhancedPrompt = () => {
    if (enhancedPrompt) {
      const textArea = document.createElement("textarea");
      textArea.value = enhancedPrompt;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  };

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

      {/* Original Prompt */}
      <div className="bg-[#1B5E20] p-10 rounded-[40px] shadow-2xl font-mono text-[11px] leading-relaxed text-[#C8E6C9] max-h-[300px] overflow-y-auto custom-scrollbar whitespace-pre-wrap relative overflow-hidden group">
        <Braces className="absolute -top-10 -right-10 w-48 h-48 opacity-10" />
        {generatedPrompt}
      </div>

      {/* Enhance with AI Section */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-[32px] p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Sparkles className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black text-purple-900">
                Tingkatkan dengan AI
              </h3>
              <p className="text-xs text-purple-600">
                Gemini AI akan meng-enhance prompt menjadi lebih detail
              </p>
            </div>
          </div>
          <button
            onClick={handleEnhancePrompt}
            disabled={isEnhancing}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[11px] transition-all bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-xl shadow-purple-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEnhancing ? (
              <>
                <Loader2 size={18} className="animate-spin" /> ENHANCING...
              </>
            ) : (
              <>
                <Sparkles size={18} /> ENHANCE PROMPT
              </>
            )}
          </button>
        </div>

        {/* Error Display */}
        {enhanceError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
            ⚠️ {enhanceError}
          </div>
        )}

        {/* Enhanced Result */}
        {enhancedPrompt && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle2 size={20} />
                <span className="font-bold text-sm">
                  Hasil Enhanced by Gemini AI
                </span>
              </div>
              <button
                onClick={copyEnhancedPrompt}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-[10px] transition-all bg-green-600 hover:bg-green-700 text-white shadow-lg"
              >
                <Copy size={14} /> SALIN HASIL
              </button>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-[28px] shadow-xl border border-slate-200 max-h-[600px] overflow-y-auto custom-scrollbar">
              <div
                className="prose prose-sm max-w-none
                prose-headings:text-[#1B5E20] prose-headings:font-black prose-headings:text-base prose-headings:mt-6 prose-headings:mb-3
                prose-h1:text-xl prose-h1:border-b prose-h1:border-green-200 prose-h1:pb-2
                prose-h2:text-lg prose-h2:text-[#2E7D32]
                prose-p:text-slate-700 prose-p:text-sm prose-p:leading-relaxed prose-p:my-2
                prose-strong:text-[#1B5E20] prose-strong:font-bold
                prose-ul:my-3 prose-li:text-sm prose-li:text-slate-600 prose-li:my-1
                prose-code:text-purple-700 prose-code:bg-purple-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono
                prose-pre:bg-slate-900 prose-pre:text-emerald-300 prose-pre:border prose-pre:border-slate-300 prose-pre:rounded-xl prose-pre:text-xs prose-pre:overflow-x-auto
                prose-a:text-blue-600 prose-a:underline
              "
              >
                <ReactMarkdown>{enhancedPrompt}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Launch Section */}
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
