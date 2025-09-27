
import React from 'react';
import { UserData } from '../types';

interface UserInputFormProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const lagnaOptions = [
    "මේෂ", "වෘෂභ", "මිථුන", "කටක", "සිංහ", "කන්‍යා",
    "තුලා", "වෘශ්චික", "ධනු", "මකර", "කුම්භ", "මීන"
];

const sinhalaMonths = [
    { value: 1, name: "ජනවාරි" }, { value: 2, name: "පෙබරවාරි" },
    { value: 3, name: "මාර්තු" }, { value: 4, name: "අප්‍රේල්" },
    { value: 5, name: "මැයි" }, { value: 6, name: "ජූනි" },
    { value: 7, name: "ජූලි" }, { value: 8, name: "අගෝස්තු" },
    { value: 9, name: "සැප්තැම්බර්" }, { value: 10, name: "ඔක්තෝබර්" },
    { value: 11, name: "නොවැම්බර්" }, { value: 12, name: "දෙසැම්බර්" }
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 101 }, (_, i) => currentYear - i);
const days = Array.from({ length: 31 }, (_, i) => i + 1);


const UserInputForm: React.FC<UserInputFormProps> = ({ userData, setUserData, onSubmit, isLoading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };
  
  // Get date parts from userData.dob, with defaults if empty
  const [year, month, day] = userData.dob ? userData.dob.split('-').map(s => parseInt(s, 10)) : [currentYear - 25, 1, 1];

  const handleDateChange = (part: 'year' | 'month' | 'day', valueStr: string) => {
    const value = parseInt(valueStr, 10);
    let newYear = year;
    let newMonth = month;
    let newDay = day;

    if (part === 'year') newYear = value;
    if (part === 'month') newMonth = value;
    if (part === 'day') newDay = value;
    
    // Adjust day if it's invalid for the selected month/year
    const daysInMonth = new Date(newYear, newMonth, 0).getDate();
    if (newDay > daysInMonth) {
        newDay = daysInMonth;
    }

    const formattedMonth = String(newMonth).padStart(2, '0');
    const formattedDay = String(newDay).padStart(2, '0');
    
    setUserData(prev => ({ ...prev, dob: `${newYear}-${formattedMonth}-${formattedDay}` }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">ඔබගේ නම ඇතුළත් කරන්න</label>
        <input
          type="text"
          id="name"
          name="name"
          value={userData.name}
          onChange={handleChange}
          className="w-full bg-slate-700/50 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="උදා: ඒ.බී.සී. පෙරේරා"
          required
        />
      </div>

      {/* Date of Birth Section */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">උපන් දිනය</label>
        <div className="grid grid-cols-3 gap-2">
            <select
                name="year"
                aria-label="Year of Birth"
                value={year}
                onChange={(e) => handleDateChange('year', e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
            >
                {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <select
                name="month"
                aria-label="Month of Birth"
                value={month}
                onChange={(e) => handleDateChange('month', e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
            >
                {sinhalaMonths.map(m => <option key={m.value} value={m.value}>{m.name}</option>)}
            </select>
            <select
                name="day"
                aria-label="Day of Birth"
                value={day}
                onChange={(e) => handleDateChange('day', e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
            >
                {days.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
            <label htmlFor="tob" className="block text-sm font-medium text-slate-300 mb-1">උපන් වේලාව</label>
            <input
            type="time"
            id="tob"
            name="tob"
            value={userData.tob}
            onChange={handleChange}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            />
        </div>
        <div>
            <label htmlFor="lagna" className="block text-sm font-medium text-slate-300 mb-1">ඔබගේ ලග්නය</label>
            <select
            id="lagna"
            name="lagna"
            value={userData.lagna}
            onChange={handleChange}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            >
                {lagnaOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
      </div>

      <div>
        <label htmlFor="pob" className="block text-sm font-medium text-slate-300 mb-1">උපන් ස්ථානය</label>
        <input
          type="text"
          id="pob"
          name="pob"
          value={userData.pob}
          onChange={handleChange}
          className="w-full bg-slate-700/50 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="උදා: කොළඹ, ශ්‍රී ලංකාව"
          required
        />
      </div>
       
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isLoading ? 'සකසමින් පවතී...' : 'අද වාර්තාව බලන්න'}
      </button>
    </form>
  );
};

export default UserInputForm;