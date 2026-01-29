"use client";

import { useState, useEffect, useCallback } from "react";
import { ToastState } from "@/app/lib/types";

export function useToast() {
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "success",
    duration: 3000,
  });

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(
        () => setToast((prev) => ({ ...prev, show: false })),
        toast.duration || 3000
      );
      return () => clearTimeout(timer);
    }
  }, [toast.show, toast.duration]);

  const showToast = useCallback(
    (message: string, type: "success" | "error" = "success", duration = 3000) => {
      setToast({ show: true, message, type, duration });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, show: false }));
  }, []);

  return { toast, showToast, hideToast };
}
