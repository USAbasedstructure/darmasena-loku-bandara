
import React, { useState } from 'react';
import { UserData, HoroscopeReportData } from './types';
import { generateHoroscopeReport } from './services/geminiService';
import Header from './components/Header';
import UserInputForm from './components/UserInputForm';
import HoroscopeReport from './components/HoroscopeReport';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    dob: '',
    tob: '',
    pob: '',
    lagna: 'මේෂ',
  });
  const [report, setReport] = useState<HoroscopeReportData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setReport(null);

    // Basic validation
    if (!userData.name || !userData.dob || !userData.tob || !userData.pob) {
        setError("කරුණාකර සියලුම තොරතුරු ඇතුළත් කරන්න.");
        setIsLoading(false);
        return;
    }

    try {
      const result = await generateHoroscopeReport(userData);
      setReport(result);
    } catch (e) {
      console.error(e);
      setError("වාර්තාව සැකසීමේදී දෝෂයක් ඇතිවිය. කරුණාකර නැවත උත්සාහ කරන්න.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-200 font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <main className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700">
            <h2 className="text-2xl font-bold text-indigo-400 mb-6">ඔබගේ තොරතුරු</h2>
            <UserInputForm userData={userData} setUserData={setUserData} onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
          <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700 flex flex-col items-center justify-center min-h-[300px]">
            {isLoading && <LoadingSpinner />}
            {error && <p className="text-red-400 text-center">{error}</p>}
            {report && !isLoading && <HoroscopeReport report={report} userName={userData.name} />}
            {!isLoading && !error && !report && (
                <div className="text-center text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="mt-4 text-lg">ඔබගේ හෙට දවසේ වාර්තාව මෙතැනින් බලන්න.</p>
                    <p>විස්තර ඇතුළත් කර "හෙට වාර්තාව බලන්න" බොත්තම ඔබන්න.</p>
                </div>
            )}
          </div>
        </main>
        <footer className="text-center text-xs text-slate-500 mt-12 py-4 border-t border-slate-800">
          <p>මෙම ජෝතිෂ්‍ය තොරතුරු සම්පුර්ණයෙන්ම ආධ්‍යාත්මික අදහස් සඳහා පමණක් වන අතර වෛද්‍ය, නීතිමය හෝ මනෝවිද්‍යාත්මක උපදෙස් ලෙස භාවිතා නොකරන්න.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
