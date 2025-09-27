
import React from 'react';
import { HoroscopeReportData } from '../types';

interface HoroscopeReportProps {
  report: HoroscopeReportData;
  userName: string;
}

const ReportItem: React.FC<{ title: string; children: React.ReactNode; icon: JSX.Element; }> = ({ title, children, icon }) => (
    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 flex items-start space-x-4">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-500/20 text-indigo-400 rounded-full">{icon}</div>
        <div>
            <h3 className="font-semibold text-indigo-300">{title}</h3>
            <div className="text-slate-300 text-sm leading-relaxed">{children}</div>
        </div>
    </div>
);

const HoroscopeReport: React.FC<HoroscopeReportProps> = ({ report, userName }) => {
    
  function getTomorrowDateFormatted(): string {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return new Intl.DateTimeFormat('si-LK', { dateStyle: 'full' }).format(tomorrow);
  }

  return (
    <div className="w-full h-full overflow-y-auto pr-2 animate-fade-in">
        <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-cyan-300">{`${userName} සඳහා හෙට දවසේ පලාපල`}</h2>
            <p className="text-slate-400">{getTomorrowDateFormatted()}</p>
        </div>

        <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-lg p-4 text-center mb-6 shadow-lg">
            <p className="text-lg font-medium text-yellow-300">"{report.punchline}"</p>
        </div>

        <div className="space-y-4">
            <ReportItem title="රැකියාව" icon={<IconBriefcase />}>{report.career}</ReportItem>
            <ReportItem title="මුදල්/ආර්ථිකය" icon={<IconCash />}>{report.finance}</ReportItem>
            <ReportItem title="ආදරය සහ සබඳතා" icon={<IconHeart />}>{report.loveAndRelationships}</ReportItem>
            <ReportItem title="සෞඛ්‍යය සහ යහපැවැත්ම" icon={<IconHealth />}>{report.healthAndWellness}</ReportItem>
            <ReportItem title="අවශ්‍ය සැලකිලිමත් කරුණු" icon={<IconAlert />}>{report.caution}</ReportItem>
            <ReportItem title="ලග්නය මත පදනම් වූ අදහස්" icon={<IconZodiac />}>{report.lagnaBased}</ReportItem>
            <ReportItem title="ග්‍රහ බලපෑම්" icon={<IconPlanet />}>{report.planetaryInfluence}</ReportItem>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <ReportItem title="ශක්තීන්" icon={<IconUp />}>
                    <ul className="list-disc list-inside">
                        {report.strengthsAndWeaknesses.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                </ReportItem>
                <ReportItem title="දුර්වලතා" icon={<IconDown />}>
                    <ul className="list-disc list-inside">
                        {report.strengthsAndWeaknesses.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
                </ReportItem>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                    <h4 className="font-semibold text-xs text-indigo-300">සුදුසු දිශාව</h4>
                    <p className="text-lg font-bold text-white">{report.travelDirection}</p>
                </div>
                 <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                    <h4 className="font-semibold text-xs text-indigo-300">ඇඳුමේ වර්ණය</h4>
                    <p className="text-lg font-bold text-white">{report.clothingColor}</p>
                </div>
                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 col-span-2 sm:col-span-1">
                    <h4 className="font-semibold text-xs text-indigo-300">වාසනාවන්ත අංකය</h4>
                    <p className="text-2xl font-bold text-white">{report.luckyNumber.number}</p>
                    <p className="text-xs text-slate-400">{report.luckyNumber.reason}</p>
                </div>
                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 col-span-2 sm:col-span-1">
                    <h4 className="font-semibold text-xs text-indigo-300">Positive Affirmation</h4>
                    <p className="text-lg font-bold text-white">{report.affirmation}</p>
                </div>
            </div>

            <ReportItem title="අමතර උපදෙස්" icon={<IconSparkle />}>{report.additionalInsights}</ReportItem>
        </div>
    </div>
  );
};


// SVG Icons defined outside the main component to prevent re-creation on re-renders.
const IconBriefcase = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const IconCash = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const IconHeart = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>;
const IconHealth = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l.293.293a1 1 0 001.414-1.414l-3-3z" clipRule="evenodd" /></svg>;
const IconAlert = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const IconZodiac = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const IconPlanet = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.293l.001-.001M16.293 4.293l-.001-.001M12 21a9 9 0 110-18 9 9 0 010 18z" /></svg>;
const IconUp = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>;
const IconDown = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>;
const IconSparkle = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;


export default HoroscopeReport;
