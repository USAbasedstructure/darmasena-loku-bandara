import { GoogleGenAI, Type } from "@google/genai";
import { UserData, HoroscopeReportData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

export const generateDailyPrediction = async (): Promise<string> => {
    const today = new Date();
    const todayDate = new Intl.DateTimeFormat('si-LK', { dateStyle: 'long' }).format(today);

    const prompt = `
    As an expert Sinhala astrologer named "Dharmasena Loku Bandara", provide a short (2-3 sentences) general astrological prediction for today, ${todayDate}. 
    
    The prediction should be suitable for everyone, focusing on the day's general energy, opportunities, and cautions based on planetary alignments.
    
    Your tone must be:
    - Exclusively in Sinhala.
    - Simple, popular, and inspiring.
    - Not tied to any specific zodiac sign.
    
    Your entire output must be just the prediction text, without any labels or JSON formatting.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error calling Gemini API for daily prediction:", error);
        return "දවසේ පොදු පලාපල ලබාගැනීමේදී දෝෂයක් ඇතිවිය.";
    }
};

export const generateHoroscopeReport = async (userData: UserData): Promise<HoroscopeReportData> => {
    const todayDate = getTodayDate();

    // This is a simulated ephemeris for context, not a real calculation.
    const mockEphemeris = {
        date: `${todayDate}T12:00:00Z`,
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
    You are an expert Sinhala astrologer named "Dharmasena Loku Bandara". Your task is to generate a personalized horoscope report for today, ${todayDate}.

    Your tone must be:
    - Exclusively in Sinhala.
    - Simple, popular, and friendly.
    - **Balanced and realistic. Your goal is to provide a complete picture, including both positive/happy aspects (සතුටුදායක දේවල්) and potential challenges/sad aspects (දුක්බර දේවල්). While you should be honest about difficulties, avoid being overly frightening. For every challenge mentioned, provide gentle and constructive advice on how to navigate it.**
    - Avoid complex technical jargon.

    Here is the user's data:
    - Name: ${userData.name}
    - Date of Birth: ${userData.dob}
    - Time of Birth: ${userData.tob} at Asia/Colombo
    - Place of Birth: ${userData.pob}
    - Lagna (Ascendant): ${userData.lagna}
    - House System: Placidus

    Here is the ephemeris data for today (${todayDate} UTC):
    ${JSON.stringify(mockEphemeris, null, 2)}

    Based on all this information, create a full horoscope report. Your entire output MUST be a single, valid JSON object, with no text before or after it. Use the following structure and content guidelines.

    Guidelines for each JSON field:
    1.  punchline: A catchy, **balanced** one-sentence summary for the day. This should capture the day's core emotional feeling, acknowledging both the potential for joy and the need for caution.
    2.  career: An array of 3-5 short, distinct Sinhala points. **Include a mix of potential opportunities (සතුටුදායක) and possible challenges (අභියෝගාත්මක).**
    3.  finance: An array of 3-5 short, distinct Sinhala points. **Include a mix of potential gains (ලාභ) and risks (අවදානම්).**
    4.  caution: An array of 2-3 short, distinct Sinhala points. Be very clear about potential "sad" or difficult situations (දුක්බර හෝ අපහසු). Include clear, gentle advice on what to *do* and what *not to do* (කරන්න/කරන්න එපා). Warn against impulsive (ආවේගශීලී) behavior if astrologically relevant.
    5.  travelDirection: The most suitable direction for leaving the house (e.g., "උතුර" or "නැගෙනහිර").
    6.  clothingColor: The recommended color to wear (e.g., "ලා නිල්" or "රන්වන් පැහැය").
    7.  planetaryInfluence: An array of 2-3 short, simple Sinhala points summarizing the general planetary effects for the day, covering both helpful and challenging influences.
    8.  lagnaBased: An array of 2-3 short, specific Sinhala points of advice or insights based on the user's Lagna (${userData.lagna}).
    9.  strengthsAndWeaknesses: An object containing two arrays: 'strengths' and 'weaknesses', each with 2-3 short Sinhala points about personal traits for the day.
    10. loveAndRelationships: An array of 3-5 short, distinct Sinhala points that touch on the emotional undertones of interactions. **Include both harmonious possibilities that could lead to happiness (සතුටුදායක) and potential points of conflict or misunderstanding that might cause sadness (දුක්බර).**
    11. healthAndWellness: An array of 3-5 short, distinct Sinhala points with health tips. CRUCIALLY, include specific dietary advice, such as a vegetable/fruit to eat (e.g., "මෙම එළවළුව අද දිනට සුදුසුයි") and one to avoid (e.g., "මෙම ආහාරය අදට සුදුසු නැත"). Be very specific.
    12. luckyNumber: An object with a 'number' (a single digit) and a 'reason' (a short Sinhala phrase explaining why).
    13. affirmation: A short, positive affirmation of 2-5 Sinhala words.
    14. additionalInsights: An array of 2-3 short, distinct Sinhala points with extra actionable advice. For example, include a specific 'action to perform' (කළ යුතු දෙයක්) and an 'action to avoid' (වැළකිය යුතු දෙයක්) for the day.
    `;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            punchline: { type: Type.STRING },
            career: { type: Type.ARRAY, items: { type: Type.STRING } },
            finance: { type: Type.ARRAY, items: { type: Type.STRING } },
            caution: { type: Type.ARRAY, items: { type: Type.STRING } },
            travelDirection: { type: Type.STRING },
            clothingColor: { type: Type.STRING },
            planetaryInfluence: { type: Type.ARRAY, items: { type: Type.STRING } },
            lagnaBased: { type: Type.ARRAY, items: { type: Type.STRING } },
            strengthsAndWeaknesses: {
                type: Type.OBJECT,
                properties: {
                    strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                    weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ['strengths', 'weaknesses']
            },
            loveAndRelationships: { type: Type.ARRAY, items: { type: Type.STRING } },
            healthAndWellness: { type: Type.ARRAY, items: { type: Type.STRING } },
            luckyNumber: {
                type: Type.OBJECT,
                properties: {
                    number: { type: Type.INTEGER },
                    reason: { type: Type.STRING },
                },
                required: ['number', 'reason']
            },
            affirmation: { type: Type.STRING },
            additionalInsights: { type: Type.ARRAY, items: { type: Type.STRING } },
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