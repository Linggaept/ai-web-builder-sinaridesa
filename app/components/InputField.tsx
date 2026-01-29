"use client";

import { ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
}: InputFieldProps) {
  return (
    <div className="space-y-3.5">
      <label className="text-[10px] font-black text-[#2E7D32] uppercase tracking-[0.2em] ml-1.5">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-7 py-5 rounded-[26px] bg-[#FAFCF8] border border-[#C8E6C9] focus:bg-white focus:border-[#2E7D32] focus:ring-8 focus:ring-[#2E7D32]/5 outline-none text-sm font-bold text-[#1B5E20] transition-all placeholder:text-slate-300 shadow-sm"
      />
    </div>
  );
}
