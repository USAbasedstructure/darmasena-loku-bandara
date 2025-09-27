
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

const renderList = (items: string[]) => (
    <ul className="list-disc list-inside space-y-1">
        {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
);

const HoroscopeReport: React.FC<HoroscopeReportProps> = ({ report, userName }) => {
    
  function getTodayDateFormatted(): string {
    const today = new Date();
    return new Intl.DateTimeFormat('si-LK', { dateStyle: 'full' }).format(today);
  }

  return (
    <div className="w-full h-full overflow-y-auto pr-2 animate-fade-in">
        <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-cyan-300">{`${userName} සඳහා අද දවසේ පලාපල`}</h2>
            <p className="text-slate-400">{getTodayDateFormatted()}</p>
        </div>

        <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-lg p-4 text-center mb-6 shadow-lg">
            <p className="text-lg font-medium text-yellow-300">"{report.punchline}"</p>
        </div>

        <div className="space-y-4">
            <ReportItem title="රැකියාව" icon={<IconBriefcase />}>{renderList(report.career)}</ReportItem>
            <ReportItem title="මුදල්/ආර්ථිකය" icon={<IconCash />}>{renderList(report.finance)}</ReportItem>
            <ReportItem title="ආදරය සහ සබඳතා" icon={<IconHeart />}>{renderList(report.loveAndRelationships)}</ReportItem>
            <ReportItem title="සෞඛ්‍යය සහ යහපැවැත්ම" icon={<IconHealth />}>{renderList(report.healthAndWellness)}</ReportItem>
            <ReportItem title="අවශ්‍ය සැලකිලිමත් කරුණු" icon={<IconAlert />}>{renderList(report.caution)}</ReportItem>
            <ReportItem title="ලග්නය මත පදනම් වූ අදහස්" icon={<IconLagna />}>{renderList(report.lagnaBased)}</ReportItem>
            <ReportItem title="ග්‍රහ බලපෑම්" icon={<IconPlanet />}>{renderList(report.planetaryInfluence)}</ReportItem>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <ReportItem title="ශක්තීන්" icon={<IconStrengths />}>
                    {renderList(report.strengthsAndWeaknesses.strengths)}
                </ReportItem>
                <ReportItem title="දුර්වලතා" icon={<IconWeaknesses />}>
                    {renderList(report.strengthsAndWeaknesses.weaknesses)}
                </ReportItem>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 flex flex-col justify-center items-center">
                    <IconTravel />
                    <h4 className="font-semibold text-xs text-indigo-300 mt-1">සුදුසු දිශාව</h4>
                    <p className="text-lg font-bold text-white">{report.travelDirection}</p>
                </div>
                 <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 flex flex-col justify-center items-center">
                    <IconColor />
                    <h4 className="font-semibold text-xs text-indigo-300 mt-1">ඇඳුමේ වර්ණය</h4>
                    <p className="text-lg font-bold text-white">{report.clothingColor}</p>
                </div>
                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 col-span-2 sm:col-span-1 flex flex-col justify-center items-center">
                    <IconLuckyNumber />
                    <h4 className="font-semibold text-xs text-indigo-300 mt-1">වාසනාවන්ත අංකය</h4>
                    <p className="text-2xl font-bold text-white">{report.luckyNumber.number}</p>
                    <p className="text-xs text-slate-400">{report.luckyNumber.reason}</p>
                </div>
                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 col-span-2 sm:col-span-1 flex flex-col justify-center items-center">
                    <IconAffirmation />
                    <h4 className="font-semibold text-xs text-indigo-300 mt-1">Positive Affirmation</h4>
                    <p className="text-lg font-bold text-white">{report.affirmation}</p>
                </div>
            </div>

            <ReportItem title="අමතර උපදෙස්" icon={<IconSparkle />}>{renderList(report.additionalInsights)}</ReportItem>
        </div>
    </div>
  );
};


// SVG Icons defined outside the main component to prevent re-creation on re-renders.
const IconBriefcase = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const IconCash = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const IconHeart = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>;
const IconHealth = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M7.86 8.26L12 4.12l4.14 4.14M12 20.38l-4.14-4.14M16.14 16.24L12 20.38" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.12v16.26" /></svg>;
const IconAlert = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const IconLagna = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const IconPlanet = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.293l.001-.001M16.293 4.293l-.001-.001M12 21a9 9 0 110-18 9 9 0 010 18z" /></svg>;
const IconStrengths = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.417l4.162-.352a11.955 11.955 0 014.24-5.322m0 0l4.24 5.322-4.162.352a12.02 12.02 0 00-4.24-5.322z" /></svg>;
const IconWeaknesses = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
const IconSparkle = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;

// Grid Icons
const IconTravel = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
const IconColor = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>;
const IconLuckyNumber = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>;
const IconAffirmation = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>;


export default HoroscopeReport;