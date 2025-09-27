
export interface UserData {
  name: string;
  dob: string;
  tob: string;
  pob: string;
  lagna: string;
}

export interface HoroscopeReportData {
  punchline: string;
  career: string;
  finance: string;
  caution: string;
  travelDirection: string;
  clothingColor: string;
  planetaryInfluence: string;
  lagnaBased: string;
  strengthsAndWeaknesses: {
    strengths: string[];
    weaknesses: string[];
  };
  loveAndRelationships: string;
  healthAndWellness: string;
  luckyNumber: {
    number: number;
    reason: string;
  };
  affirmation: string;
  additionalInsights: string;
}
