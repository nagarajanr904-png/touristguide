const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.chatWithAI = async (req, res) => {
    try {
        const { message, tripDetails } = req.body;

        // Log request for debugging
        console.log("AI Request received:", { message, tripDetails });

        let prompt = "";

        if (tripDetails) {
            // Detailed Trip Planning Prompt
            prompt = `Plan a ${tripDetails.duration}-day trip to ${tripDetails.destination} for ${tripDetails.travelers} people. 
            Budget: ${tripDetails.budget}. 
            Provide a day-by-day itinerary with specific places to visit, food recommendations, and estimated time.
            
            CRITICAL INSTRUCTION: Return ONLY valid JSON. Do not include any markdown formatting, backticks, or explanatory text outside the JSON.
            Structure:
            {
                "title": "Trip Title",
                "summary": "Brief summary",
                "days": [
                    {
                        "day": 1,
                        "activities": ["Activity 1", "Activity 2"]
                    }
                ]
            }`;
        } else {
            // General Chat
            prompt = `You are a helpful tourist guide. Answer this query concisely: ${message}`;
        }

        // Helper function for retry strategy
        const generateContentWithRetry = async (model, prompt, retries = 5, initialDelay = 2000) => {
            for (let i = 0; i < retries; i++) {
                try {
                    return await model.generateContent(prompt);
                } catch (error) {
                    if (error.status === 429 || error.message.includes('429')) {
                        const waitTime = initialDelay * Math.pow(2, i);
                        console.warn(`[Gemini] Rate limit hit. Retrying in ${waitTime}ms... (Attempt ${i + 1}/${retries})`);
                        if (i === retries - 1) throw error;
                        await new Promise(resolve => setTimeout(resolve, waitTime));
                    } else {
                        throw error;
                    }
                }
            }
        };

        const result = await generateContentWithRetry(model, prompt);
        const response = await result.response;
        const text = response.text();

        // If asking for JSON, try to parse it to ensure it's clean, handling potential markdown code blocks
        if (tripDetails) {
            try {
                // improved JSON extraction
                const jsonMatch = text.match(/\{[\s\S]*\}/);
                const jsonString = jsonMatch ? jsonMatch[0] : text;
                const jsonResponse = JSON.parse(jsonString);
                return res.json(jsonResponse);
            } catch (e) {
                console.error("JSON Parse Error:", e);
                try {
                    const logPath = path.join(__dirname, '../error.log');
                    fs.appendFileSync(logPath, `JSON Parse Error: ${e.message}\nRaw Text: ${text}\n\n`);
                } catch (logErr) {
                    console.error("Could not write to log file (likely read-only environment)");
                }

                // Fallback if JSON parsing fails
                return res.json({ title: "Itinerary (Parse Error)", summary: text, days: [] });
            }
        }

        res.json({ reply: text });

    } catch (error) {
        const logPath = path.join(__dirname, '../error.log');
        const timestamp = new Date().toISOString();
        const errorLog = `[${timestamp}] Error: ${error.message}\nStack: ${error.stack}\nDetails: ${JSON.stringify(error)}\nAPI Key Present: ${!!process.env.GEMINI_API_KEY}\n\n`;

        try {
            fs.appendFileSync(logPath, errorLog);
        } catch (fsError) {
            console.error("Failed to write to log file:", fsError);
        }

        console.error("AI Service Error Detailed:", error);
        res.status(500).json({
            message: 'AI Service Error',
            error: error.message,
            details: error.toString()
        });
    }
};
