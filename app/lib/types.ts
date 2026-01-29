import { COLORS, STYLES } from "./constants";

export type StyleKey = keyof typeof STYLES;

export interface FormData {
  id?: string;
  projectType: "frontend" | "fullstack";
  businessName: string;
  industry: string;
  phoneNumber: string;
  description: string;
  valueProposition: string;
  refWebsites: string;
  targetAudience: string;
  style: StyleKey;
  colorPreference: string;
  features: string[];
  stateManagement: "zustand" | "redux" | "context";
  useTypescript: boolean;
  useFramerMotion: boolean;
  useShadcn: boolean;
  backendProvider: string;
  authMethods: string[];
  contentTone: string;
  heroHeadline: string;
  heroCta: string;
}

export interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error";
  duration: number;
}

export interface HistoryItem extends FormData {
  id: string;
  timestamp?: { seconds: number };
}

export const getDefaultFormData = (): FormData => ({
  projectType: "frontend",
  businessName: "",
  industry: "",
  phoneNumber: "",
  description: "",
  valueProposition: "",
  refWebsites: "",
  targetAudience: "",
  style: "modern",
  colorPreference: COLORS.primary,
  features: ["landing"],
  stateManagement: "zustand",
  useTypescript: true,
  useFramerMotion: true,
  useShadcn: true,
  backendProvider: "supabase",
  authMethods: ["email"],
  contentTone: "professional",
  heroHeadline: "",
  heroCta: "",
});
