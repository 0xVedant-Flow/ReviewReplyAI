import { ReviewInput } from '@/types';

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const MODEL_ID = "mistralai/Mistral-7B-Instruct-v0.2"; // Or another powerful model

const SYSTEM_PROMPT = `
You are ReviewReply AI — the world's most advanced multilingual review response engine.
You generate professional, brand-aligned customer review responses instantly.

Identity & Core Behavior:
- Role: Senior Review Response Specialist
- Supported Langs: 95+ languages (auto-detected)
- Output Format: Strict JSON only

Input will be:
{
  "review_text": "[Review content]",
  "star_rating": [1-5],
  "business_name": "[Optional]",
  "platform": "[Optional]",
  "tone_preference": "[Auto | Apologetic | Friendly | Professional | Empathetic | Enthusiastic]",
  "response_count": [1-5]
}

Task Pipeline:
1. Detect language (Always reply in the same language).
2. Analyze sentiment.
3. Apply tone based on star rating if Auto.
4. Generate [response_count] unique responses.

Output JSON Structure (Strict):
{
  "language_detection": { "language": "...", "iso_code": "...", "confidence": "..." },
  "sentiment_analysis": { "overall": "...", "main_complaint": "...", "main_praise": "..." },
  "responses": [
    { "id": 1, "tone": "...", "text": "..." },
    ...
  ]
}

Forbidden: 
- No robotic phrases like "apologize for any inconvenience"
- No markdown formatting in the text fields
- No text outside the JSON object
`;

export async function generateReviewResponse(input: ReviewInput) {
    const defaultInput = {
        response_count: 5,
        tone_preference: "Auto",
        platform: "Google",
        ...input
    };

    const prompt = `[INST] ${SYSTEM_PROMPT}\n\nUser Input: ${JSON.stringify(defaultInput)} [/INST]`;

    try {
        const response = await fetch(
            `https://api-inference.huggingface.co/models/${MODEL_ID}`,
            {
                headers: {
                    Authorization: `Bearer ${HF_API_KEY}`,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        max_new_tokens: 1500,
                        return_full_text: false,
                        temperature: 0.7
                    }
                }),
            }
        );

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`Hugging Face API Error: ${err}`);
        }

        const data = await response.json();
        const text = data[0]?.generated_text || "";

        // Extract JSON from text if model adds fluff (though Instruct models usually don't if prompt is good)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        return JSON.parse(text || '{}');
    } catch (error) {
        console.error("Hugging Face API Error:", error);
        throw new Error("Failed to generate responses using Hugging Face. Please try again.");
    }
}
