import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export async function POST(request: NextRequest) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY tidak ditemukan di environment" },
        { status: 500 }
      );
    }

    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt wajib diisi" },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an elite AI Prompt Engineer. Transform the blueprint into a COMPLETE production specification.

## INPUT:
${prompt}

## CREATE A COMPLETE SPECIFICATION WITH THESE SECTIONS:

# 🎯 1. IDENTITY & BRAND
- Project name, industry, contact
- SEO metadata (title, description, OG tags)
- Brand vision statement

# 🎨 2. DESIGN SYSTEM
## Color Palette
- Primary, secondary, accent colors (hex values)
- Background, foreground, muted colors
- Semantic colors (success, error, warning)

## Typography
- Font family, sizes (h1-h6, body, small)
- Font weights and line heights

## Spacing & Radius
- Spacing scale (xs to 5xl in rem)
- Border radius values

## Shadows
- Shadow definitions (sm, md, lg, xl)

# � 3. TECH STACK
- Framework, language, state management
- Required npm packages (list with versions)
- Environment variables needed

# 📁 4. FILE STRUCTURE
\`\`\`
src/
├── components/
│   ├── ui/           # shadcn components
│   ├── layout/       # Header, Footer, MainLayout
│   └── modules/      # Feature sections
├── hooks/            # Custom hooks
├── lib/              # Utils, API clients
├── stores/           # Zustand stores
├── types/            # TypeScript interfaces
└── styles/           # Global CSS
\`\`\`

# 🧩 5. COMPONENT SPECS
For each main component, specify:
- Props interface (TypeScript)
- Key features
- Animation specs (Framer Motion)
- Responsive behavior

## Header Component
[Specs here]

## Hero Section
[Specs here]

## Features/Services Section
[Specs here]

## Contact Section
[Specs here]

## Footer Component
[Specs here]

# ⚡ 6. FUNCTIONAL REQUIREMENTS
- User stories (3-5 main ones)
- API endpoints needed
- Data models (TypeScript interfaces)
- State management flow
- Error handling approach

# � 7. RESPONSIVE DESIGN
- Breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px)
- Mobile navigation pattern
- Grid/flex adjustments per viewport

# 🚀 8. PERFORMANCE
- Code splitting strategy
- Image optimization approach
- Lazy loading components

## RULES:
1. Use Markdown formatting (headers, code blocks, lists)
2. Be SPECIFIC with values (exact hex, exact rem, exact props)
3. Maximum 4500 words - COMPLETE the document fully
4. Write in technical English
5. START DIRECTLY with "# 🎯 1. IDENTITY & BRAND"
6. END with a "---" line followed by "✅ Specification Complete"
7. DO NOT include any intro text like "Here is..." or "As requested..."

NOW GENERATE THE COMPLETE SPECIFICATION:`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: systemPrompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 16384,
          topP: 0.95,
          topK: 40,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_NONE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE",
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      return NextResponse.json(
        { error: "Gagal menghubungi Gemini API" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const enhancedPrompt =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    if (!enhancedPrompt) {
      return NextResponse.json(
        { error: "Tidak ada respons dari AI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ enhanced: enhancedPrompt });
  } catch (error) {
    console.error("Enhance Prompt API Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}


