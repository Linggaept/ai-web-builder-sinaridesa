// Sinaridesa Authentic Color Palette
export const COLORS = {
  primary: "#2E7D32", // Forest Green (Alam Desa)
  dark: "#1B5E20", // Deep Green
  secondary: "#66BB6A", // Fresh Green
  accent: "#F9A825", // Golden Ray (Sinar)
  bg: "#F1F8E9", // Light Green Tint
  surface: "#ffffff",
} as const;

export const STYLES = {
  modern: {
    label: "Modern Sinaridesa",
    color: "bg-[#2E7D32]",
    text: "text-white",
    desc: "Desain bersih, natural, profesional.",
  },
  minimal: {
    label: "Pure Minimalist",
    color: "bg-white",
    text: "text-slate-900",
    desc: "Whitespace luas, fokus konten.",
  },
  corporate: {
    label: "Executive Trust",
    color: "bg-[#1B5E20]",
    text: "text-white",
    desc: "Kaku, resmi, berwibawa.",
  },
  playful: {
    label: "Dynamic Creative",
    color: "bg-[#F9A825]",
    text: "text-[#1B5E20]",
    desc: "Ceria dengan aksen emas.",
  },
  dark: {
    label: "Midnight Leaf",
    color: "bg-slate-950",
    text: "text-[#66BB6A]",
    desc: "Mode gelap dengan hijau neon.",
  },
  luxury: {
    label: "Golden Harvest",
    color: "bg-[#1B5E20]",
    text: "text-[#F9A825]",
    desc: "Elegan dengan sentuhan emas.",
  },
} as const;

export const STEPS = [
  {
    id: "identity",
    label: "Identitas",
    desc: "Visi & Kontak",
    iconName: "Target",
  },
  {
    id: "design",
    label: "Desain",
    desc: "Estetika Visual",
    iconName: "Palette",
  },
  {
    id: "features",
    label: "Fitur",
    desc: "Modul Sistem",
    iconName: "Layers",
  },
  {
    id: "tech",
    label: "Teknologi",
    desc: "Engineering Stack",
    iconName: "Cpu",
  },
  {
    id: "output",
    label: "Hasil",
    desc: "Ready to Build",
    iconName: "Terminal",
  },
] as const;

export const FEATURE_MODULES = [
  { id: "landing", label: "Landing UI", iconName: "Monitor" },
  { id: "auth", label: "User Auth", iconName: "Lock", pro: true },
  { id: "dashboard", label: "Admin Panel", iconName: "Layout", pro: true },
  { id: "ecommerce", label: "E-Commerce", iconName: "ShoppingBag" },
  { id: "ai", label: "AI Intel", iconName: "Sparkles", pro: true },
  { id: "map", label: "GIS / Peta", iconName: "Globe", pro: true },
] as const;
