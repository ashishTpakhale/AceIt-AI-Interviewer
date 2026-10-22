import axios from "axios";

export const askAi = async (messages) => {
    try {
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            throw new Error("Messages array is empty.");
        }

        const apiKey = process.env.SARVAM_API_KEY || process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            throw new Error("AI API Key is missing. Please set SARVAM_API_KEY in your .env file.");
        }

        // Sarvam AI Chat Completions
        const isSarvam = Boolean(process.env.SARVAM_API_KEY);
        const endpoint = isSarvam
            ? "https://api.sarvam.ai/v1/chat/completions"
            : "https://openrouter.ai/api/v1/chat/completions";

        const model = isSarvam
            ? (process.env.SARVAM_MODEL || "sarvam-105b")
            : "openai/gpt-4o-mini";

        const headers = isSarvam
            ? {
                "api-subscription-key": apiKey,
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            }
            : {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            };

        const response = await axios.post(
            endpoint,
            {
                model,
                messages,
            },
            { headers }
        );

        const content = response?.data?.choices?.[0]?.message?.content;

        if (!content || !content.trim()) {
            throw new Error("AI returned empty response.");
        }

        return content;
    } catch (error) {
        console.error("AI Service Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "AI Service API Error");
    }
};