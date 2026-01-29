"use client";

import { History, Trash2, Leaf } from "lucide-react";
import { FormData, HistoryItem } from "@/app/lib/types";

interface HistoryDrawerProps {
  show: boolean;
  history: HistoryItem[];
  onClose: () => void;
  onSelect: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
}

export function HistoryDrawer({
  show,
  history,
  onClose,
  onSelect,
  onDelete,
}: HistoryDrawerProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div
        className="absolute inset-0 bg-[#1B5E20]/20 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col relative z-10 animate-in slide-in-from-right duration-500 rounded-l-[56px] border-l border-green-50">
        <div className="p-14 border-b border-green-50 flex justify-between items-center bg-[#FAFCF8]">
          <h2 className="text-2xl font-black flex items-center gap-4 text-[#1B5E20]">
            <History className="text-[#2E7D32]" size={36} /> Arsip
          </h2>
          <button
            onClick={onClose}
            className="w-14 h-14 flex items-center justify-center hover:bg-slate-50 rounded-full transition-all text-slate-300"
          >
            <Trash2 size={28} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-12 space-y-8 custom-scrollbar">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-10 text-center px-16">
              <Leaf size={100} className="mb-10 text-[#2E7D32]" />
              <p className="text-[11px] font-black uppercase tracking-[0.4em] leading-loose">
                Belum Ada Data
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelect(item)}
                className="group p-10 rounded-[40px] border border-green-50 hover:border-[#2E7D32] hover:bg-green-50/50 cursor-pointer transition-all shadow-sm"
              >
                <div className="flex justify-between items-start mb-5">
                  <h4 className="font-bold text-[#1B5E20] text-lg leading-tight">
                    {item.businessName || "Proyek Tanpa Nama"}
                  </h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2.5 text-red-400 hover:bg-red-50 rounded-2xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex gap-3">
                  <span className="text-[10px] font-black px-4 py-1.5 bg-white rounded-xl border border-green-100 text-slate-400 uppercase">
                    {item.projectType}
                  </span>
                  <span className="text-[10px] font-black px-4 py-1.5 bg-white rounded-xl border border-green-100 text-slate-400 uppercase">
                    {item.style}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
