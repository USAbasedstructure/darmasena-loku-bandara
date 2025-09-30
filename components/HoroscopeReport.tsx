
import React, { useState, useEffect } from 'react';
import { HoroscopeReportData } from '../types';

interface HoroscopeReportProps {
  report: HoroscopeReportData;
  userName: string;
}

// FIX: Replaced JSX.Element with React.ReactNode to resolve namespace error.
const ReportItem: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ title, children, icon, className, style }) => (
    <div className={`glass-effect p-4 rounded-lg flex items-start space-x-4 ${className || ''}`} style={style}>
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-500/20 text-indigo-400 rounded-full">{icon}</div>
        <div>
            <h3 className="font-semibold text-indigo-300">{title}</h3>
            <div className="text-slate-300 text-sm leading-relaxed">{children}</div>
        </div>
    </div>
);

// FIX: Replaced JSX.Element with React.ReactNode to resolve namespace error.
const ManifestationCategory: React.FC<{ title: string; items: string[]; icon: React.ReactNode; }> = ({ title, items, icon }) => (
    <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 text-cyan-400 mt-1">{icon}</div>
        <div>
            <h4 className="font-semibold text-slate-300">{title}</h4>
            <ul className="list-none space-y-1 text-sm text-slate-400">
                {items.map((item, index) => <li key={index} className="flex items-start"><span className="mr-2 mt-1">✨</span><span>{item}</span></li>)}
            </ul>
        </div>
    </div>
);

const renderList = (items: string[]) => (
    <ul className="list-disc list-inside space-y-1">
        {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
);

const HoroscopeReport: React.FC<HoroscopeReportProps> = ({ report, userName }) => {
    
  const getFeedbackKey = () => {
    const today = new Date().toISOString().split('T')[0];
    return `horoscope-feedback-${today}`;
  };

  const [feedbackSubmitted, setFeedbackSubmitted] = useState(!!localStorage.getItem(getFeedbackKey()));

  useEffect(() => {
    const key = getFeedbackKey();
    if (localStorage.getItem(key)) {
        setFeedbackSubmitted(true);
    }
  }, []);

  const handleFeedback = (wasHelpful: boolean) => {
    const key = getFeedbackKey();
    localStorage.setItem(key, wasHelpful ? 'yes' : 'no');
    setFeedbackSubmitted(true);
  };
    
  function getTodayDateFormatted(): string {
    const today = new Date();
    return new Intl.DateTimeFormat('si-LK', { dateStyle: 'full' }).format(today);
  }

  return (
    <div className="w-full h-full overflow-y-auto pr-2">
        <div className="text-center mb-6 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
            <h2 className="text-2xl font-bold text-cyan-300">{`${userName} සඳහා අද දවසේ පලාපල`}</h2>
            <p className="text-slate-400">{getTodayDateFormatted()}</p>
        </div>

        <div className="glass-effect rounded-lg p-4 text-center mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <p className="text-lg font-medium text-yellow-300">"{report.punchline}"</p>
        </div>

        <div className="space-y-4">
            <ReportItem className="animate-fade-in-up" style={{ animationDelay: '200ms' }} title="රැකියාව" icon={<IconBriefcase />}>{renderList(report.career)}</ReportItem>
            <ReportItem className="animate-fade-in-up" style={{ animationDelay: '300ms' }} title="මුදල්/ආර්ථිකය" icon={<IconCash />}>{renderList(report.finance)}</ReportItem>
            <ReportItem className="animate-fade-in-up" style={{ animationDelay: '400ms' }} title="ආදරය සහ සබඳතා" icon={<IconHeart />}>{renderList(report.loveAndRelationships)}</ReportItem>
            <ReportItem className="animate-fade-in-up" style={{ animationDelay: '500ms' }} title="සෞඛ්‍යය සහ යහපැවැත්ම" icon={<IconHealth />}>{renderList(report.healthAndWellness)}</ReportItem>
            <ReportItem className="animate-fade-in-up" style={{ animationDelay: '600ms' }} title="අවශ්‍ය සැලකිලිමත් කරුණු" icon={<IconAlert />}>{renderList(report.caution)}</ReportItem>
            
            {report.localEventsInfluence && report.localEventsInfluence.length > 0 && (
                <ReportItem className="animate-fade-in-up" style={{ animationDelay: '700ms' }} title="ප්‍රාදේශීය ශක්ති කම්පන" icon={<IconLocalVibes />}>{renderList(report.localEventsInfluence)}</ReportItem>
            )}

            {report.negativeAspects && report.negativeAspects.length > 0 && (
                <ReportItem className="animate-fade-in-up" style={{ animationDelay: '800ms' }} title="සෘණාත්මක (අවාසි) දේවල්" icon={<IconXCircle />}>{renderList(report.negativeAspects)}</ReportItem>
            )}
            <ReportItem className="animate-fade-in-up" style={{ animationDelay: '900ms' }} title="ලග්නය මත පදනම් වූ අදහස්" icon={<IconLagna />}>{renderList(report.lagnaBased)}</ReportItem>
            <ReportItem className="animate-fade-in-up" style={{ animationDelay: '1000ms' }} title="ග්‍රහ බලපෑම්" icon={<IconPlanet />}>{renderList(report.planetaryInfluence)}</ReportItem>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: '1100ms' }}>
                 <ReportItem title="ශක්තීන්" icon={<IconStrengths />}>
                    {renderList(report.strengthsAndWeaknesses?.strengths ?? [])}
                </ReportItem>
                <ReportItem title="දුර්වලතා" icon={<IconWeaknesses />}>
                    {renderList(report.strengthsAndWeaknesses?.weaknesses ?? [])}
                </ReportItem>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center animate-fade-in-up" style={{ animationDelay: '1200ms' }}>
                <div className="glass-effect p-3 rounded-lg flex flex-col justify-center items-center">
                    <IconTravel />
                    <h4 className="font-semibold text-xs text-indigo-300 mt-1">සුදුසු දිශාව</h4>
                    <p className="text-lg font-bold text-white">{report.travelDirection}</p>
                </div>
                 <div className="glass-effect p-3 rounded-lg flex flex-col justify-center items-center">
                    <IconColor />
                    <h4 className="font-semibold text-xs text-indigo-300 mt-1">ඇඳුමේ වර්ණය</h4>
                    <p className="text-lg font-bold text-white">{report.clothingColor}</p>
                </div>
                <div className="glass-effect p-3 rounded-lg col-span-2 sm:col-span-1 flex flex-col justify-center items-center">
                    <IconLuckyNumber />
                    <h4 className="font-semibold text-xs text-indigo-300 mt-1">වාසනාවන්ත අංකය</h4>
                    <p className="text-2xl font-bold text-white">{report.luckyNumber?.number ?? 'N/A'}</p>
                    <p className="text-xs text-slate-400">{report.luckyNumber?.reason ?? ''}</p>
                </div>
                <div className="glass-effect p-3 rounded-lg col-span-2 sm:col-span-1 flex flex-col justify-center items-center">
                    <IconAffirmation />
                    <h4 className="font-semibold text-xs text-indigo-300 mt-1">Positive Affirmation</h4>
                    <p className="text-lg font-bold text-white">{report.affirmation}</p>
                </div>
            </div>

            <ReportItem className="animate-fade-in-up" style={{ animationDelay: '1300ms' }} title="අමතර උපදෙස්" icon={<IconSparkle />}>{renderList(report.additionalInsights)}</ReportItem>
            
            {report.manifestations && (
                 <ReportItem className="animate-fade-in-up" style={{ animationDelay: '1400ms' }} title="අද දවසේ බලගතු ප්‍රාර්ථනා" icon={<IconMagicWand />}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-2">
                        {report.manifestations?.wealth?.length > 0 && <ManifestationCategory title="ධනය සහ සම්පත්" items={report.manifestations.wealth} icon={<IconCash className="h-5 w-5" />} />}
                        {report.manifestations?.love?.length > 0 && <ManifestationCategory title="ආදරය සහ සබඳතා" items={report.manifestations.love} icon={<IconHeart className="h-5 w-5" />} />}
                        {report.manifestations?.family?.length > 0 && <ManifestationCategory title="පවුලේ සතුට" items={report.manifestations.family} icon={<IconFamily className="h-5 w-5" />} />}
                        {report.manifestations?.success?.length > 0 && <ManifestationCategory title="සාර්ථකත්වය" items={report.manifestations.success} icon={<IconSuccess className="h-5 w-5" />} />}
                        {report.manifestations?.travel?.length > 0 && <ManifestationCategory title="සංචාර සහ විවේකය" items={report.manifestations.travel} icon={<IconPlane className="h-5 w-5" />} />}
                        {report.manifestations?.health?.length > 0 && <ManifestationCategory title="සෞඛ්‍යය" items={report.manifestations.health} icon={<IconHealth className="h-5 w-5" />} />}
                    </div>
                </ReportItem>
            )}
        </div>

        <div className="mt-6 text-center animate-fade-in-up" style={{ animationDelay: '1500ms' }}>
            <hr className="border-slate-700 my-4" />
            {feedbackSubmitted ? (
                <p className="text-green-400">ඔබගේ අදහසට ස්තූතියි!</p>
            ) : (
                <>
                <p className="text-slate-300 mb-3">මෙම වාර්තාව ප්‍රයෝජනවත් වූවාද?</p>
                <div className="flex justify-center gap-4">
                    <button
                    onClick={() => handleFeedback(true)}
                    className="px-6 py-2 bg-green-600/50 hover:bg-green-600/80 border border-green-500 rounded-md transition-colors"
                    >
                    ඔව්
                    </button>
                    <button
                    onClick={() => handleFeedback(false)}
                    className="px-6 py-2 bg-red-600/50 hover:bg-red-600/80 border border-red-500 rounded-md transition-colors"
                    >
                    නැත
                    </button>
                </div>
                </>
            )}
        </div>
    </div>
  );
};


// SVG Icons defined outside the main component to prevent re-creation on re-renders.
const IconBriefcase = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const IconCash: React.FC<{className?: string}> = ({className = "h-5 w-5"}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const IconHeart: React.FC<{className?: string}> = ({className = "h-5 w-5"}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>;
const IconHealth: React.FC<{className?: string}> = ({className = "h-5 w-5"}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M7.86 8.26L12 4.12l4.14 4.14M12 20.38l-4.14-4.14M16.14 16.24L12 20.38" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.12v16.26" /></svg>;
const IconAlert = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const IconLagna = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const IconPlanet = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.293l.001-.001M16.293 4.293l-.001-.001M12 21a9 9 0 110-18 9 9 0 010 18z" /></svg>;
const IconStrengths = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.417l4.162-.352a11.955 11.955 0 014.24-5.322m0 0l4.24 5.322-4.162.352a12.02 12.02 0 00-4.24-5.322z" /></svg>;
const IconWeaknesses = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
const IconSparkle = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
const IconXCircle = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconLocalVibes = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h.01M4 10h.01M4 14h.01M20 6h-.01M20 10h-.01M20 14h-.01" /></svg>;


// Grid Icons
const IconTravel = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
const IconColor = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>;
const IconLuckyNumber = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>;
const IconAffirmation = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>;

// Manifestation Icons
const IconMagicWand = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>;
const IconFamily: React.FC<{className?: string}> = ({className = "h-5 w-5"}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const IconSuccess: React.FC<{className?: string}> = ({className = "h-5 w-5"}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>;
const IconPlane: React.FC<{className?: string}> = ({className = "h-5 w-5"}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;


export default HoroscopeReport;