
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center border-b-2 border-indigo-500/30 pb-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
        ධර්මසේන ලොකු බණ්ඩාර
      </h1>
      <p className="text-lg sm:text-xl text-slate-300 mt-1 tracking-wider">
        ජෝතිෂ්‍ය සේවය
      </p>
    </header>
  );
};

export default Header;
