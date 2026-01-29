"use client";

import { X, Info, ClipboardPaste } from "lucide-react";
import { ToastState } from "@/app/lib/types";

interface ToastProps {
  toast: ToastState;
  onClose: () => void;
}

export function Toast({ toast, onClose }: ToastProps) {
  if (!toast.show) return null;

  return (
    <div className="fixed top-24 right-6 z-[100] animate-in slide-in-from-right fade-in duration-300">
      <div
        className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl border-l-4 ${
          toast.type === "error"
            ? "bg-white border-l-red-500"
            : "bg-white border-l-[#2E7D32]"
        }`}
      >
        {toast.type === "error" ? (
          <Info size={20} className="text-red-500" />
        ) : (
          <ClipboardPaste size={20} className="text-[#2E7D32]" />
        )}
        <div className="flex flex-col">
          <span className="text-sm font-black uppercase tracking-wider text-[#1B5E20]">
            {toast.type === "error" ? "Gagal" : "Berhasil"}
          </span>
          <span className="text-xs font-medium text-slate-500">
            {toast.message}
          </span>
        </div>
        <button
          onClick={onClose}
          className="ml-4 hover:bg-black/5 rounded-full p-1"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
