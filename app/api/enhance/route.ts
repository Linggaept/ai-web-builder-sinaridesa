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

    const prompt = `Kamu adalah ahli copywriting profesional untuk website bisnis Indonesia.

Tugasmu adalah meningkatkan deskripsi bisnis berikut agar lebih menarik, profesional, dan persuasif.

Informasi:
- Nama Bisnis: ${businessName || "Tidak disebutkan"}
- Industri: ${industry || "Umum"}
- Deskripsi asli: ${description}

Aturan:
1. Gunakan bahasa Indonesia yang profesional dan mudah dipahami
2. Maksimal 2-3 kalimat
3. Fokus pada value proposition dan manfaat untuk pelanggan
4. Jangan gunakan jargon berlebihan
5. Buat terdengar modern dan terpercaya
6. JANGAN tambahkan tanda kutip di awal atau akhir
7. LANGSUNG berikan hasil deskripsi yang ditingkatkan saja, tanpa penjelasan tambahan

Hasil deskripsi yang ditingkatkan:`;

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
          temperature: 0.7,
          maxOutputTokens: 256,
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
