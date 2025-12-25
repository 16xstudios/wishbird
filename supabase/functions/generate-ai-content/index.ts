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
    const { type, recipientName, senderName, occasion, language } = await req.json();

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const languageInstructions: Record<string, string> = {
      English: "Write in natural, emotional English.",
      Tamil: "Write the ENTIRE message in Tamil script (தமிழ்).",
      Telugu: "Write the ENTIRE message in Telugu script (తెలుగు).",
      Kannada: "Write the ENTIRE message in Kannada script (ಕನ್ನಡ).",
      Malayalam: "Write the ENTIRE message in Malayalam script (മലയാളം).",
      Hindi: "Write the ENTIRE message in Hindi script (हिंदी).",
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

    let prompt = "";

    if (type === "text") {
      prompt = `Generate a heartfelt ${occasion} wish for ${recipientName} from ${senderName}.
      
Rules:
1. ${languageInstructions[language] || languageInstructions.English}
2. Use relevant emojis: ${occasionEmojis[occasion] || "✨💜🌟"}
3. Make it personal and touching (3-5 sentences)
4. Include recipient's name naturally
5. End with sender's name`;
    } else if (type === "image_prompt") {
      prompt = `Create an image generation prompt for a ${occasion} greeting card for ${recipientName} from ${senderName}.
The prompt should describe a beautiful, celebratory image suitable for the occasion.
Keep the prompt concise (under 100 words) and focused on visual elements.
Do not include any text in the image description.`;
    }

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
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);
      throw new Error("Failed to generate content");
    }

    const data = await response.json();
    const generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedContent) {
      throw new Error("No content generated");
    }

    return new Response(
      JSON.stringify({ content: generatedContent }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-ai-content:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to generate content" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
