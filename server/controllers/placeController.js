const { Place } = require('../models');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { Op } = require('sequelize');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

exports.getAllPlaces = async (req, res) => {
    try {
        const { isHiddenGem, city, category, name } = req.query;
        let whereClause = {};

        if (isHiddenGem !== undefined) whereClause.isHiddenGem = isHiddenGem === 'true';
        if (city) whereClause.city = city;
        if (category) whereClause.category = category;
        if (name) {
            whereClause.name = { [Op.like]: `%${name}%` };
        }

        const places = await Place.findAll({ where: whereClause });
        res.json(places);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPlace = async (req, res) => {
    try {
        const place = await Place.create(req.body);
        res.status(201).json(place);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPlaceById = async (req, res) => {
    try {
        const place = await Place.findByPk(req.params.id);
        if (!place) return res.status(404).json({ message: 'Place not found' });

        // If tips or best time are missing, fetch from Gemini
        if (!place.best_time || !place.travel_tips) {
            console.log(`[Gemini] Generating tips for: ${place.name}`);
            const prompt = `You are an expert Tamil Nadu travel guide. For the place "${place.name}" in "${place.city}", provide:
            1. Best time to visit (short, 1-2 sentences).
            2. Travel tips (3 bullet points, concise).
            
            Format your response exactly as:
            BEST_TIME: [content]
            TIPS: [bullet 1]; [bullet 2]; [bullet 3]`;

            try {
                const result = await model.generateContent(prompt);
                const response = await result.response;
                const text = response.text();

                const bestTimeMatch = text.match(/BEST_TIME:\s*(.*)/i);
                const tipsMatch = text.match(/TIPS:\s*(.*)/is);

                if (bestTimeMatch) place.best_time = bestTimeMatch[1].trim();
                if (tipsMatch) place.travel_tips = tipsMatch[1].trim();

                // Cache it
                await place.save();
            } catch (aiError) {
                console.error("[Gemini Error]:", aiError.message);
                // Don't fail the request, just return what we have
                place.best_time = place.best_time || "Best visited during cooler months (Oct-Mar).";
                place.travel_tips = place.travel_tips || "Wear comfortable shoes; Carry a water bottle; Respect local traditions.";
            }
        }

        // Generate specific explanation for Hidden Gems
        if (place.isHiddenGem && !place.gemini_explanation) {
            console.log(`[Gemini] Explaining hidden gem: ${place.name}`);
            const gemPrompt = `You are a travel storyteller. Explain why "${place.name}" is considered a "Hidden Gem" in Tamil Nadu. What makes it unique, peaceful, or special compared to crowded tourist spots? Keep it to one short, engaging paragraph (3-4 sentences).`;

            try {
                const gemResult = await model.generateContent(gemPrompt);
                const gemResponse = await gemResult.response;
                place.gemini_explanation = gemResponse.text().trim();
                await place.save();
            } catch (aiError) {
                console.error("[Gemini Hidden Gem Error]:", aiError.message);
                place.gemini_explanation = "This serene location offers a peaceful escape from the bustling city, perfect for nature lovers and those seeking tranquility.";
            }
        }

        res.json(place);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
