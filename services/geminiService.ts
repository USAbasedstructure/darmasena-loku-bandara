
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
    As the esteemed Sinhala astrologer, "Dharmasena Loku Bandara", your task is to compose a general astrological forecast for today, ${todayDate}.

    Your response must be a single, cohesive paragraph of 2 to 3 detailed sentences in Sinhala.

    The tone should be simple, popular, and inspiring.

    In this forecast, you must weave together the day's themes:
    - How will communication flow today? (අදහස් හුවමාරුව)
    - What is the overall emotional feeling for the day? (දවසේ පොදු මානසික ස්වභාවය)
    - What are the potential small opportunities and what requires a bit of caution? (අවස්ථා සහ සැලකිලිමත් විය යුතු කරුණු)

    Do not list these points separately. Instead, integrate them into a smooth, narrative-style prediction. Your entire output must be ONLY the Sinhala prediction text, with no titles or other text.
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
    - Current Residence: ${userData.currentResidence}
    - Lagna (Ascendant): ${userData.lagna}
    - House System: Placidus

    Here is the ephemeris data for today (${todayDate} UTC):
    ${JSON.stringify(mockEphemeris, null, 2)}

    Based on all this information, create a full horoscope report. Your entire output MUST be a single, valid JSON object, with no text before or after it. Use the following structure and content guidelines.

    Guidelines for each JSON field:
    1.  punchline: A catchy, **balanced** one-sentence summary for the day. This should capture the day's core emotional feeling, acknowledging both the potential for joy and the need for caution.
    2.  career: An array of 3-5 short, distinct Sinhala points. Include specific, potential events. For example, "receiving praise from a superior" (ඉහළ නිලධාරියෙකුගෙන් ප්‍රශංසාවක් හිමිවිය හැක), "facing a new challenge on a project" (ව්‍යාපෘතියක නව අභියෝගයකට මුහුණ දීමට සිදුවේ), or "opportunities for collaboration" (සම-සේවකයන් සමග සහයෝගයෙන් වැඩ කිරීමට අවස්ථා උදාවේ). Include a mix of potential opportunities (සතුටුදායක) and possible challenges (අභියෝගාත්මක).
    3.  finance: An array of 3-5 short, distinct Sinhala points. Be specific. For instance, mention "unexpected small financial gains" (බලාපොරොත්තු නොවූ සුළු මුදල් ලාභයක්), "need to be cautious with spending on luxury items" (සුඛෝපභෝගී භාණ්ඩ සඳහා වියදම් කිරීමේදී සැලකිලිමත් වන්න), or "a good day for settling old debts" (පැරනි ණය ගනුදෙනුවක් විසඳීමට සුබ දිනයකි). Include a mix of potential gains (ලාභ) and risks (අවදානම්).
    4.  caution: An array of 2-3 short, distinct Sinhala points about potential "sad" or difficult situations (දුක්බර හෝ අපහසු). For **each** point, you **must** provide a specific and actionable counter-measure or mitigating behavior (ප්‍රතිකර්මයක් හෝ අවම කරගැනීමේ ක්‍රියාවක්).
        - **Example 1:** If you warn about potential conflicts (මත ගැටුම්), suggest a specific communication technique to de-escalate (e.g., "ඉවසීමෙන් සවන් දී පිළිතුරු දෙන්න").
        - **Example 2:** If you warn about minor accidents (සුළු අනතුරු), suggest a specific precaution (e.g., "ගමන් බිමන් වලදී වඩාත් සැලකිලිමත් වන්න").
        - **Example 3:** If you warn that a past misdeed might be exposed (පැරණි වරදක් හෙළිවීම), suggest how to handle it gracefully (e.g., "සත්‍යය පිළිගෙන සමාව අයදින්න").
    Your advice must be practical and helpful, moving beyond generic warnings. Warn against impulsive (ආවේගශීලී) behavior if astrologically relevant.
    5.  travelDirection: The most suitable direction for leaving the house (e.g., "උතුර" or "නැගෙනහිර").
    6.  clothingColor: The recommended color to wear (e.g., "ලා නිල්" or "රන්වන් පැහැය").
    7.  planetaryInfluence: An array of 2-3 short, simple Sinhala points summarizing the general planetary effects for the day, covering both helpful and challenging influences.
    8.  lagnaBased: An array of 2-3 short, specific Sinhala points of advice or insights based on the user's Lagna (${userData.lagna}).
    9.  strengthsAndWeaknesses: An object containing two arrays: 'strengths' and 'weaknesses', each with 2-3 short Sinhala points about personal traits for the day.
    10. loveAndRelationships: An array of 3-5 short, distinct Sinhala points. This section MUST include specific, potential life events. For example, mention possibilities like "meeting a new friend" (අලුත් මිතුරෙකු හමුවිය හැක), "starting a new romance" (නව ආදර සම්බන්ධයක් ඇරඹීමට ඉඩ ඇත), "spending quality time with family" (පවුලේ අය සමග සතුටින් කාලය ගත කිරීමට අවස්ථාව උදාවේ), or "potential disagreements with a partner" (සහකරු/සහකාරිය සමග මත ගැටුම් ඇතිවිය හැක). The goal is to provide actionable and relatable insights, touching on both harmonious possibilities that could lead to happiness (සතුටුදායක) and potential points of conflict or misunderstanding that might cause sadness (දුක්බර).
    11. healthAndWellness: An array of 3-5 short, distinct Sinhala points with health tips. This section MUST include predictions about potential physical feelings or minor issues. For example, "you might experience some fatigue" (ශරීරයට මද වෙහෙසක් දැනෙන්නට පුළුවන) or "be mindful of minor scrapes or cuts" (සුළු සීරීම් හෝ කැපීම් ගැන සැලකිලිමත් වන්න).
    12. luckyNumber: An object with a 'number' (a single digit) and a 'reason' (a short Sinhala phrase explaining why).
    13. affirmation: A short, positive affirmation of 2-5 Sinhala words.
    14. additionalInsights: An array of 2-4 short, distinct Sinhala points with extra actionable advice.
        - **Crucially, you must consider the user's Current Residence: ${userData.currentResidence}. Use this location for weather-based advice, NOT the place of birth.**
        - **Infer the likely weather for this location today (e.g., is it likely to be rainy, very hot, or cool?).**
        - **IMPORTANT: When generating your response for this section, you MUST NOT mention the name of the user's current residence (${userData.currentResidence}) anywhere in the output. The advice should be framed generally, assuming the user knows their local weather conditions.**
        - **Based on this inferred weather, you MUST provide:**
          - **1. A specific 'action to perform' (කළ යුතු දෙයක්):** E.g., for heat, "උණුසුම් කාලගුණය නිසා දවස පුරාම හොඳින් ජලය පානය කරන්න" (Drink plenty of water).
          - **2. A specific 'action to avoid' (වැළකිය යුතු දෙයක්):** E.g., for rain, "වැසි සහිත කාලගුණය නිසා අද දින එළිමහන් ගමන් සීමා කරන්න" (Limit outdoor travel).
          - **3. A warning about potential natural disasters (ස්වාභාවික ආපදා):** E.g., for heavy rain, "ගංවතුර හෝ නායයෑම් අවදානමක් ඇතිවිය හැක, අවධානයෙන් සිටින්න" (Risk of floods or landslides, be aware). For high heat, "අධික උණුසුම නිසා විජලනයෙන් ආරක්ෂා වන්න" (Protect yourself from dehydration due to high heat).
          - **4. Specific dietary recommendations (ආහාරයට ගතයුතු දේවල්):** E.g., for hot weather, "පිපිඤ්ඤා, කොමඩු වැනි සිසිල් ගුණැති ආහාර ගන්න" (Eat cooling foods like cucumber, watermelon). For rainy/cold weather, "ඉඟුරු තේ වැනි උණුසුම් පානයක් ගැනීම සුදුසුයි" (It's good to have a warm drink like ginger tea).
    15. manifestations: An object containing six arrays of strings: 'wealth', 'love', 'family', 'success', 'travel', and 'health'. For each category, provide 2-3 powerful, specific, and positive affirmations in Sinhala. These should be written as if they are guaranteed to happen TODAY. They must be extremely positive, aspirational, and create a feeling of certainty. Use the following as a strict style guide, providing similar examples:
        - For 'wealth': "අද දින ඔබට අලුත්ම වාහනයක් අනිවාරයෙන් ලැබෙනවා 🚗", "ඔබට අද මුදල් සපුරා ගන්න ලොතරැයි එක වැටෙනවා 💵", "ඔබට අද දින අනපේක්ෂිත ලෙස විශාල මුදලක් ලැබෙනවා 💰"
        - For 'love': "අද දින ඔබට ඇත්ත ආදරය දෙන පෙම්වතෙක්/පෙම්වතියක් ලැබෙනවා ❤️", "ඔබේ ආදර සම්බන්ධතාවය අද දින වඩාත් ශක්තිමත් වෙනවා 👩‍❤️‍👨"
        - For 'family': "ඔබේ පවුලේ සියලු අය අද සිට සෞඛ්‍යවත් සහ සතුටින් ඉන්නවා 🏡", "ඔබේ පවුලට අද දින සාමය සහ සමගිය උදාවෙනවා 👨‍👩‍👧‍👦"
        - For 'success': "අද සිට ඔබ ව්‍යාපාරික ජයග්‍රහණයකට පියමන් කරනවා 📈", "ඔබට අද ඔයා කැමති රැකියාව ලැබෙනවා 💼", "ඔබ අතගසන සෑම කාර්යයක්ම අද දිනයේදී සාර්ථක වෙනවා 🏆"
        - For 'travel': "අද ඔබට විදේශ සංචාරයක් ලැබෙනවා ✈️", "ඔබේ සිහින ගමනාන්තයට යෑමට අද ඔබට අවස්ථාව උදාවෙනවා 🏝️"
        - For 'health': "අද සිට ඔබේ ශරීරය සෞඛ්‍යවත් සහ ශක්තිමත් වෙනවා 💪", "ඔබේ මනස අද දින පුරාම නිරවුල්ව සහ සන්සුන්ව පවතිනවා 🧘"
    16. negativeAspects: An array of 3-4 short, distinct Sinhala points about general negative aspects or disadvantages one might face. These are not tied only to today but are general challenges. Use the user's provided examples as a strict style guide: "සමහර වෙලාවට ඔබට ඉතා ප්‍රිය මනුෂ්‍යයන්ගෙන් පිරිහීම ඇතිවෙනවා.", "ඔබේ ආරම්භක ව්‍යාපාර කිහිපයක් අසාර්ථක වීමේ අවදානම තියෙනවා.", "ඔබේ මතභේද හේතුවෙන් පවුලේ ගැටළු ඇතිවෙන්න පුළුවන්.". The tone should be realistic and cautionary.
    17. localEventsInfluence: An array of 2-3 short, distinct Sinhala points. This is a special section. **You must use your access to recent information to find out about significant public events (like natural disasters, accidents, festivals, political issues, or social unrest) that happened in the user's current residence (${userData.currentResidence}) yesterday.** Based on the general *feeling* or *energy* of those events, provide astrological advice on how that local atmosphere might influence the user's day. **CRITICAL RULE: You must NOT mention the specific news event, the user's location, or any other real-world details.** The advice must be abstract and metaphorical.
        - **Example 1:** If a major traffic accident occurred, you could say: 'ඔබේ ප්‍රදේශයේ මෑතකදී ඇති වූ යම් නොසන්සුන්කාරී සිදුවීමක් නිසා, අද දින ගමන් බිමන් වලදී වෙනදාට වඩා සැලකිලිමත් වීම නුවණට හුරුය.' (Due to a recent unsettling event in your area, it is wise to be more careful than usual when traveling today.)
        - **Example 2:** If a large public festival occurred, you could say: 'ප්‍රදේශයේ පවතින උත්සවශ්‍රීයේ ශක්තිය, අද දින සමාජ සබඳතා සඳහා ඔබට නව උනන්දුවක් ඇති කරවනු ඇත.' (The energy from the festive atmosphere in your area will create new enthusiasm for social connections today.)
        - **Example 3:** If there was a political conflict, you could say: 'ප්‍රජා මට්ටමේ ඇති වූ මතභේදාත්මක තත්වයක කම්පනයන් නිසා අදහස් හුවමාරුවේදී ඉවසීමෙන් කටයුතු කරන්න.' (Due to vibrations from a controversial situation at the community level, act with patience when exchanging ideas.)
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
            manifestations: {
                type: Type.OBJECT,
                properties: {
                    wealth: { type: Type.ARRAY, items: { type: Type.STRING } },
                    love: { type: Type.ARRAY, items: { type: Type.STRING } },
                    family: { type: Type.ARRAY, items: { type: Type.STRING } },
                    success: { type: Type.ARRAY, items: { type: Type.STRING } },
                    travel: { type: Type.ARRAY, items: { type: Type.STRING } },
                    health: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ['wealth', 'love', 'family', 'success', 'travel', 'health']
            },
            negativeAspects: { type: Type.ARRAY, items: { type: Type.STRING } },
            localEventsInfluence: { type: Type.ARRAY, items: { type: Type.STRING } },
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