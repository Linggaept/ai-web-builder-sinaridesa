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

    const { description, businessName, industry } = await request.json();

    if (!description) {
      return NextResponse.json(
        { error: "Deskripsi wajib diisi" },
        { status: 400 }
      );
    }

    const prompt = `You are a world-class Strategic Brand Consultant and Copywriting Expert specializing in digital business transformation.

## YOUR MISSION
Transform the following basic business description into a POWERFUL, COMPREHENSIVE strategic vision document.

## INPUT:
- **Business Name:** ${businessName || "Not specified"}
- **Industry:** ${industry || "General"}
- **Original Description:** ${description}

## OUTPUT REQUIREMENTS:

Create a strategic vision document in **Markdown format** with the following sections:

### 🎯 Visi Utama
Write 2-3 compelling sentences about the core vision. Make it inspiring and ambitious.

### 💡 Value Proposition
List 3-4 unique value propositions using bullet points. Each should be specific and customer-focused.

### 🎪 Target Audience
Identify 2-3 primary audience segments with brief descriptions.

### 🚀 Competitive Advantage
List 2-3 key differentiators that set this business apart.

### 📈 Growth Potential
Write 1-2 sentences about scalability and future opportunities.

## FORMATTING RULES:
1. Use Indonesian language with professional tone
2. Use Markdown headers (###), bold (**text**), and bullet points (-)
3. Be specific and actionable, avoid generic statements
4. Total length: 200-350 words
5. Make it sound visionary yet achievable
6. DO NOT include any meta-commentary like "Here is..." or "This is..."
7. START DIRECTLY with the ### Visi Utama header

## OUTPUT:`;

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
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.85,
          maxOutputTokens: 1024,
          topP: 0.9,
          topK: 40,
        },
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
    const enhancedText =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    if (!enhancedText) {
      return NextResponse.json(
        { error: "Tidak ada respons dari AI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ enhanced: enhancedText });
  } catch (error) {
    console.error("Enhance API Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

