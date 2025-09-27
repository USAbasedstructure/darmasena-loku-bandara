
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

const UserInputForm: React.FC<UserInputFormProps> = ({ userData, setUserData, onSubmit, isLoading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
            <label htmlFor="dob" className="block text-sm font-medium text-slate-300 mb-1">උපන් දිනය</label>
            <input
            type="date"
            id="dob"
            name="dob"
            value={userData.dob}
            onChange={handleChange}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            />
        </div>
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
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isLoading ? 'සකසමින් පවතී...' : 'හෙට වාර්තාව බලන්න'}
      </button>
    </form>
  );
};

export default UserInputForm;
