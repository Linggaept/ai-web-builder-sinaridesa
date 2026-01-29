import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://sinaridesa.com";
const siteName = "Sinari Desa";

export const metadata: Metadata = {
  title: {
    default: "Sinari Desa - Dari Desa Untuk Dunia! | Platform TIK Desa Digital",
    template: "%s | Sinari Desa",
  },
  description:
    "Sinari Desa adalah platform TIK inovatif yang memberdayakan generasi muda desa dengan keterampilan digital, teknologi AI, blockchain, dan internet offline untuk membangun desa modern yang berdaya saing global.",
  keywords: [
    "sinari desa",
    "platform desa digital",
    "teknologi desa",
    "pendidikan digital desa",
    "pelatihan TIK desa",
    "smart village Indonesia",
    "desa modern",
    "transformasi digital desa",
    "pemberdayaan pemuda desa",
    "internet desa",
    "AI untuk desa",
    "blockchain desa",
    "keterampilan digital",
    "pengembangan desa",
    "inovasi desa",
  ],
  authors: [{ name: "Sinari Desa Team", url: siteUrl }],
  creator: "Sinari Desa",
  publisher: "Sinari Desa",
  category: "Technology",

  icons: {
    icon: [
      { url: "/logo.png", sizes: "any" },
      { url: "/logo.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/logo.png", sizes: "180x180" }],
  },

  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      "id-ID": "/",
      "en-US": "/en",
    },
  },

  // ===== OPEN GRAPH (Facebook, LinkedIn, WhatsApp) =====
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: siteName,
    title: "Sinari Desa - Dari Desa Untuk Dunia!",
    description:
      "Platform TIK inovatif untuk memberdayakan generasi muda desa dengan keterampilan digital, AI, dan teknologi modern.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sinari Desa - Platform Desa Digital Indonesia",
        type: "image/png",
      },
    ],
  },

  // ===== ROBOTS & INDEXING =====
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ===== OTHER =====
  applicationName: siteName,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2E7D32" },
    { media: "(prefers-color-scheme: dark)", color: "#1B5E20" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Sinari Desa",
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              description:
                "Platform TIK inovatif yang memberdayakan generasi muda desa dengan keterampilan digital untuk membangun desa modern.",
              sameAs: [
                "https://twitter.com/sinaridesa",
                "https://facebook.com/sinaridesa",
                "https://instagram.com/sinaridesa",
                "https://linkedin.com/company/sinaridesa",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: ["Indonesian", "English"],
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
