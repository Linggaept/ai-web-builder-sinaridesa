"use client";

import { useState, useCallback, ChangeEvent } from "react";
import { FormData, getDefaultFormData } from "@/app/lib/types";

export function useFormData() {
  const [formData, setFormData] = useState<FormData>(getDefaultFormData());

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const target = e.target as HTMLInputElement;
      const { name, value, type } = target;
      const checked = target.type === "checkbox" ? target.checked : undefined;

      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    },
    []
  );

  const updateFormData = useCallback((updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetFormData = useCallback(() => {
    setFormData(getDefaultFormData());
  }, []);

  const loadFormData = useCallback((data: FormData) => {
    setFormData(data);
  }, []);

  return {
    formData,
    handleInputChange,
    updateFormData,
    resetFormData,
    loadFormData,
  };
}
