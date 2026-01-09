const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        // For earlier versions of the SDK, listModels might be on the client or missing.
        // But verify if it exists.
        // Actually, typically we can try to get a model and if it fails, valid ones are listed in error.
        // But let's try to find a list method if possible or just test a known working one.
        // The error message from user said: "Call ListModels to see the list of available models".
        // This implies there is an API endpoint or method.

        // Since SDK specific methods can vary, let's try a direct REST call if SDK method isn't obvious,
        // BUT, the SDK usually exposes it via the model manager or similar.
        // Let's check if the SDK has a way. simpler: just print the versions.

        console.log("Checking available models...");
        // There isn't a direct listModels on the `genAI` instance in all versions.
        // Let's try to just use 'gemini-1.5-flash' again but maybe with a slightly different string?
        // Actually, let's force a call to a model that DEFINITELY exists like 'gemini-pro' (which failed)
        // or 'gemini-1.0-pro'.

        // Wait, the error explicitly says: "Call ListModels".
        // Let's try to use the raw API via fetch if the SDK doesn't make it easy?
        // No, let's look at the SDK docs or just try to instantiate a few and see if they throw immediately?
        // Instantiation doesn't throw, generateContent throws.

        // Let's try a simple fetch to the list models endpoint.
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("No API Key found in .env");
            return;
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        const fs = require('fs');
        let output = "Available Models:\n";
        if (data.models) {
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    output += `- ${m.name}\n`;
                }
            });
        } else {
            output += "No models returned or error: " + JSON.stringify(data);
        }
        fs.writeFileSync('models.txt', output);
        console.log("Written to models.txt");

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
