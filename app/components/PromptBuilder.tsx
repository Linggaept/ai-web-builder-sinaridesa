"use client";

import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Toast } from "./Toast";
import { LivePreview } from "./LivePreview";
import { HistoryDrawer } from "./HistoryDrawer";
import {
  IdentityStep,
  DesignStep,
  FeaturesStep,
  TechStep,
  OutputStep,
} from "./steps";

import { useFormData } from "@/app/hooks/useFormData";
import { useToast } from "@/app/hooks/useToast";
import { STYLES, STEPS } from "@/app/lib/constants";
import { FormData, StyleKey, HistoryItem } from "@/app/lib/types";

export function PromptBuilder() {
  const { formData, handleInputChange, updateFormData, loadFormData } =
    useFormData();
  const { toast, showToast, hideToast } = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Local history (no Firebase)
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sinaridesa_history");
        if (saved) {
          setHistory(JSON.parse(saved));
        }
      } catch (err) {
        console.error("Failed to load history:", err);
      }
    }
  }, []);

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  // Copy to clipboard function
  const copyToClipboard = (text: string): boolean => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  };

  // Generate UUID fallback
  const generateId = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Fallback untuk browser yang tidak support crypto.randomUUID
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  // Save to local history with localStorage persistence
  const saveToHistory = () => {
    if (!formData.businessName) {
      showToast("Nama proyek wajib diisi!", "error");
      return;
    }

    setIsSaving(true);
    try {
      const draftId = generateId();
      const newItem: HistoryItem = {
        ...formData,
        id: draftId,
        timestamp: { seconds: Date.now() / 1000 },
      };

      const updatedHistory = [newItem, ...history];
      setHistory(updatedHistory);

      // Persist to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "sinaridesa_history",
          JSON.stringify(updatedHistory),
        );
      }

      showToast("Proyek berhasil disimpan ke arsip ✅");
    } catch (error) {
      console.error("Save error:", error);
      showToast("Gagal menyimpan proyek", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // AI enhance description using Gemini API
  const enhanceDescription = async () => {
    if (!formData.description) {
      showToast("Masukkan deskripsi terlebih dahulu", "error");
      return;
    }
    setIsEnhancing(true);
    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: formData.description,
          businessName: formData.businessName,
          industry: formData.industry,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal menghubungi AI");
      }

      updateFormData({ description: data.enhanced, isAiEnhanced: true });
      showToast("Deskripsi berhasil ditingkatkan dengan AI! ✨");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Gagal menghubungkan ke AI";
      showToast(message, "error");
    } finally {
      setIsEnhancing(false);
    }
  };

  // Generate prompt
  const generatedPrompt = useMemo(() => {
    const {
      businessName,
      industry,
      phoneNumber,
      description,
      isAiEnhanced,
      style,
      colorPreference,
      features,
      stateManagement,
      useTypescript,
      contentTone,
      heroHeadline,
      heroCta,
    } = formData;

    const aiEnhancedTag = isAiEnhanced ? " ✨ (Enhanced by AI Sinaridesa)" : "";

    return `### **Sinaridesa OS - Web Architecture Blueprint**
Act as a Principal Software Architect. Your mission is to build a professional, scalable web application.

**1. IDENTITY & CONTACT**
- Project Name: ${businessName || "Unnamed"}
- Industry: ${industry || "Tech"}
- Primary Contact: ${phoneNumber || "N/A"} (Must be prominent in Footer/Contact)
- Description: ${description || "No description provided"}${aiEnhancedTag}

**2. VISUAL STRATEGY**
- Style Persona: ${STYLES[style as StyleKey]?.label || "Modern"}
- Primary Brand Color: ${colorPreference}
- UI Kit: shadcn/ui + Tailwind CSS v4
- Design Principles: High border-radius, clean typography, soft elevation.

**3. TECH SPECIFICATIONS**
- Framework: React 19 (Vite)
- Language: ${useTypescript ? "TypeScript (Strict)" : "JavaScript (ESNext)"}
- State: ${stateManagement.toUpperCase()}
- Animations: Framer Motion
- Backend: SUPABASE Integration

**4. FUNCTIONAL MODULES**
${features.map((f) => `- Implement ${f.toUpperCase()} module with clean code.`).join("\n")}

**5. COPYWRITING**
- Tone: ${contentTone}
- Hero: "${heroHeadline || "Transforming the Future"}"
- Call to Action: "${heroCta || "Get Started"}"

**6. OUTPUT GOAL**
Generate a full file structure and the primary App components with responsive design.`;
  }, [formData]);

  const handleLaunchLovable = () => {
    const success = copyToClipboard(generatedPrompt);
    if (success) {
      showToast(
        "PROMPT TERSALIN! Silakan tekan Ctrl+V di Lovable.",
        "success",
        5000,
      );
    } else {
      showToast("Gagal salin otomatis. Mohon salin manual.", "error");
    }
    setTimeout(() => {
      window.open("https://lovable.dev/", "_blank");
    }, 1200);
  };

  const handleSelectHistory = (item: HistoryItem) => {
    loadFormData(item);
    setShowHistory(false);
    setCurrentStep(4);
  };

  const handleDeleteHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FAFCF8] text-slate-900 font-sans selection:bg-[#C8E6C9] relative">
      <Toast toast={toast} onClose={hideToast} />

      <Navbar onShowHistory={() => setShowHistory(true)} />

      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <Sidebar currentStep={currentStep} onStepChange={setCurrentStep} />

        {/* Wizard Form Content */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white border border-green-100 rounded-[48px] shadow-2xl shadow-green-900/5 min-h-[660px] flex flex-col overflow-hidden relative">
            <div className="p-12 flex-1">
              {currentStep === 0 && (
                <IdentityStep
                  formData={formData}
                  onInputChange={handleInputChange}
                  onEnhanceDescription={enhanceDescription}
                  isEnhancing={isEnhancing}
                />
              )}

              {currentStep === 1 && (
                <DesignStep
                  formData={formData}
                  onStyleChange={(style) => updateFormData({ style })}
                />
              )}

              {currentStep === 2 && (
                <FeaturesStep
                  formData={formData}
                  onProjectTypeChange={(projectType) =>
                    updateFormData({ projectType })
                  }
                  onFeatureToggle={(featureId) => {
                    const active = formData.features.includes(featureId);
                    updateFormData({
                      features: active
                        ? formData.features.filter((f) => f !== featureId)
                        : [...formData.features, featureId],
                    });
                  }}
                />
              )}

              {currentStep === 3 && (
                <TechStep
                  formData={formData}
                  onToggleTypescript={() =>
                    updateFormData({ useTypescript: !formData.useTypescript })
                  }
                  onToggleShadcn={() =>
                    updateFormData({ useShadcn: !formData.useShadcn })
                  }
                  onStateManagementChange={(stateManagement) =>
                    updateFormData({ stateManagement })
                  }
                />
              )}

              {currentStep === 4 && (
                <OutputStep
                  generatedPrompt={generatedPrompt}
                  isSaving={isSaving}
                  onSave={saveToHistory}
                  onCopy={() => {
                    copyToClipboard(generatedPrompt);
                    showToast("Prompt disalin!");
                  }}
                  onLaunchLovable={handleLaunchLovable}
                />
              )}
            </div>

            {/* Bottom Nav Wizard */}
            {currentStep < 4 && (
              <div className="px-12 py-9 bg-[#FAFCF8] border-t border-green-50 flex justify-between items-center">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[#2E7D32] transition-all disabled:opacity-0"
                >
                  <ChevronLeft size={18} /> Kembali
                </button>
                <button
                  onClick={nextStep}
                  className="flex items-center gap-5 px-12 py-5 rounded-[24px] text-xs font-black uppercase tracking-widest bg-[#2E7D32] text-white hover:bg-[#1B5E20] transition-all shadow-xl shadow-green-900/10 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Langkah Lanjut <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        <LivePreview formData={formData} />
      </main>

      <HistoryDrawer
        show={showHistory}
        history={history}
        onClose={() => setShowHistory(false)}
        onSelect={handleSelectHistory}
        onDelete={handleDeleteHistory}
      />

      <style>{`
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2E7D32; border-radius: 20px; }
        ::-webkit-scrollbar-thumb:hover { background: #1B5E20; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E8F5E9; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
