
import { GoogleGenAI, Type } from "@google/genai";
import { UserData, HoroscopeReportData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function getTomorrowDate(): string {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
}

export const generateHoroscopeReport = async (userData: UserData): Promise<HoroscopeReportData> => {
    const tomorrowDate = getTomorrowDate();

    // This is a simulated ephemeris for context, not a real calculation.
    const mockEphemeris = {
        date: `${tomorrowDate}T12:00:00Z`,
        planets: {
            "Sun": { sign: "Leo", position: "15°23'" },
            "Moon": { sign: "Scorpio", position: "2°45'" },
            "Mercury": { sign: "Virgo", position: "11°01'" },
            "Venus": { sign: "Cancer", position: "28°19'" },
            "Mars": { sign: "Taurus", position: "5°55'" },
            "Jupiter": { sign: "Aries", position: "19°30' R" },
            "Saturn": { sign: "Aquarius", position: "25°12' R" },
        },
        ascendant: { sign: userData.lagna, degree: "18°44'" },
        houseCusps: {
            "1": `${userData.lagna} 18°44'`,
            "2": "...",
            "10": "..."
        }
    };
    
    const prompt = `
    You are an expert Sinhala astrologer named "Dharmasena Loku Bandara". Your task is to generate a personalized horoscope report for tomorrow, ${tomorrowDate}.

    Your tone must be:
    - Exclusively in Sinhala.
    - Simple, popular, and friendly.
    - Encouraging and inspiring, not frightening.
    - Avoid complex technical jargon.

    Here is the user's data:
    - Name: ${userData.name}
    - Date of Birth: ${userData.dob}
    - Time of Birth: ${userData.tob} at Asia/Colombo
    - Place of Birth: ${userData.pob}
    - Lagna (Ascendant): ${userData.lagna}
    - House System: Placidus

    Here is the ephemeris data for tomorrow (${tomorrowDate} UTC):
    ${JSON.stringify(mockEphemeris, null, 2)}

    Based on all this information, create a full horoscope report. Your entire output MUST be a single, valid JSON object, with no text before or after it. Use the following structure and content guidelines.

    Guidelines for each JSON field:
    1.  punchline: A catchy, inspiring one-sentence summary for the day.
    2.  career: 1-2 sentences about work, career, and professional life.
    3.  finance: 1-2 sentences about money and financial matters.
    4.  caution: 1-2 sentences about potential challenges or things to be careful about, presented gently.
    5.  travelDirection: The most suitable direction for leaving the house (e.g., "උතුර" or "නැගෙනහිර").
    6.  clothingColor: The recommended color to wear (e.g., "ලා නිල්" or "රන්වන් පැහැය").
    7.  planetaryInfluence: A brief, simple summary of the general planetary effects for the day.
    8.  lagnaBased: Specific advice or insights based on the user's Lagna (${userData.lagna}).
    9.  strengthsAndWeaknesses: An object containing two arrays: 'strengths' and 'weaknesses', each with 1-2 short points about personal traits for the day.
    10. loveAndRelationships: Brief advice on love, family, and social relationships.
    11. healthAndWellness: Tips for health and well-being.
    12. luckyNumber: An object with a 'number' (a single digit) and a 'reason' (a short Sinhala phrase explaining why).
    13. affirmation: A short, positive affirmation of 2-5 Sinhala words.
    14. additionalInsights: One extra piece of advice based on web knowledge, such as a good time of day, a spiritual activity, or a specific task to focus on.
    `;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            punchline: { type: Type.STRING },
            career: { type: Type.STRING },
            finance: { type: Type.STRING },
            caution: { type: Type.STRING },
            travelDirection: { type: Type.STRING },
            clothingColor: { type: Type.STRING },
            planetaryInfluence: { type: Type.STRING },
            lagnaBased: { type: Type.STRING },
            strengthsAndWeaknesses: {
                type: Type.OBJECT,
                properties: {
                    strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                    weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ['strengths', 'weaknesses']
            },
            loveAndRelationships: { type: Type.STRING },
            healthAndWellness: { type: Type.STRING },
            luckyNumber: {
                type: Type.OBJECT,
                properties: {
                    number: { type: Type.INTEGER },
                    reason: { type: Type.STRING },
                },
                required: ['number', 'reason']
            },
            affirmation: { type: Type.STRING },
            additionalInsights: { type: Type.STRING },
        },
    };
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonText = response.text.trim();
        // The Gemini API with responseSchema guarantees valid JSON.
        return JSON.parse(jsonText) as HoroscopeReportData;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate horoscope report from Gemini.");
    }
};
