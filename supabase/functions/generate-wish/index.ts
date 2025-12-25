import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { recipientName, senderName, occasion, language } = await req.json();

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const languageInstructions: Record<string, string> = {
      English: "Write the entire message in natural, emotional English.",
      Tamil: "Write the ENTIRE message in Tamil script (தமிழ்). Use ONLY Tamil characters. Do NOT use any English words or transliteration.",
      Telugu: "Write the ENTIRE message in Telugu script (తెలుగు). Use ONLY Telugu characters. Do NOT use any English words or transliteration.",
      Kannada: "Write the ENTIRE message in Kannada script (ಕನ್ನಡ). Use ONLY Kannada characters. Do NOT use any English words or transliteration.",
      Malayalam: "Write the ENTIRE message in Malayalam script (മലയാളം). Use ONLY Malayalam characters. Do NOT use any English words or transliteration.",
      Hindi: "Write the ENTIRE message in Hindi script (हिंदी). Use ONLY Hindi/Devanagari characters. Do NOT use any English words or transliteration.",
    };

    const occasionEmojis: Record<string, string> = {
      Birthday: "🎂🎉✨🎁💜",
      Anniversary: "💍💜✨🌹💕",
      Festival: "🎉✨🪔🎊💫",
      Apology: "💛🙏💜🌸",
      Appreciation: "🌟💜✨🙏💖",
      Congratulations: "🎊🏆✨🎉💫",
      "Get Well Soon": "💐🌸💜🙏✨",
      "Just Because": "💜✨🌟💕🌈",
    };

    const prompt = `You are a creative, emotional wish-writing assistant for WishBot. Your task is to generate heartfelt, unique greetings.

CRITICAL RULES:
1. ${languageInstructions[language] || languageInstructions.English}
2. Every wish must be COMPLETELY UNIQUE - never repeat patterns, openings, or structures
3. Vary emotional tones: sometimes poetic, sometimes playful, sometimes warm, sometimes inspirational
4. Use relevant emojis naturally: ${occasionEmojis[occasion] || "✨💜🌟"}
5. Include the recipient's name naturally in the message
6. Keep the message between 3-5 sentences
7. End with the sender's name
8. Make it personal and touching, not generic or template-like

UNIQUENESS REQUIREMENTS:
- Use different opening lines every time
- Vary sentence structures
- Change metaphors and expressions
- Alternate between different emotional approaches

Generate a unique ${occasion} wish for ${recipientName} from ${senderName}. 
Language: ${language}
Make it heartfelt, personal, and completely different from any previous message.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);
      throw new Error("Failed to generate wish");
    }

    const data = await response.json();
    const generatedWish = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedWish) {
      throw new Error("No wish generated");
    }

    return new Response(
      JSON.stringify({ wish: generatedWish }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-wish:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to generate wish" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
