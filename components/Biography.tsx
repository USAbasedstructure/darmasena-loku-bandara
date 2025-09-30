import React from 'react';

const Biography: React.FC = () => {
  return (
    <section className="my-8 p-6 glass-effect rounded-xl animate-fade-in-up">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src="https://placehold.co/150x150/334155/94a3b8?text=DLB"
          alt="ධර්මසේන ලොකු බණ්ඩාර මහතා"
          className="rounded-full w-32 h-32 md:w-36 md:h-36 object-cover flex-shrink-0 border-2 border-slate-600 shadow-lg"
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-cyan-300 mb-3">
            අපේ ජෝතිෂ්‍යවේදී, ධර්මසේන ලොකු බණ්ඩාර මහතා හඳුනාගන්න
          </h2>
          <p className="text-slate-300 mb-3 leading-relaxed">
            වසර 40කට අධික කාලයක් ජ්‍යොතිෂ්‍ය ක්ෂේත්‍රයේ අත්දැකීම් ඇති ධර්මසේන ලොකු බණ්ඩාර මහතා, පාරම්පරික දැනුම සහ නවීන ලෝකය මනාව අවබෝධ කරමින් ඔබට මග පෙන්වයි. උඩරට ප්‍රදේශයේ ජ්‍යොතිෂ්‍ය පරම්පරාවකින් පැවත එන එතුමා, ග්‍රහ තරු රටා විශ්ලේෂණය කිරීමේ ගැඹුරු හැකියාවක් ඇති අයෙකි.
          </p>
          <p className="text-slate-300 mb-3 leading-relaxed">
            ඔහුගේ දර්ශනය වන්නේ ජ්‍යොතිෂ්‍යය යනු අනාගතය පිළිබඳ බිය උපදවන අනාවැකි කීමක් නොව, ජීවිතයේ අභියෝග ජය ගැනීමට සහ අවස්ථාවන්ගෙන් උපරිම ප්‍රයෝජන ගැනීමට මග පෙන්වන විද්‍යාත්මක උපකරණයක් බවයි. "ග්‍රහයන් පාලනය කරන්නේ අපව නොව, ඔවුන්ගේ ශක්තිය අවබෝධ කර ගැනීමෙන් අපට අපගේ ජීවිත පාලනය කරගත හැකියි," යන්න ඔහුගේ විශ්වාසයයි.
          </p>
          <p className="text-slate-300 leading-relaxed">
            තවද, ඕනෑම පුද්ගලයෙකුට 99%ක් ගැලපෙන දිනපතා පලාපල මෙම ඔන්ලයින් සේවාව ඔස්සේ ලබා දීමටත් එතුමා කැපවී සිටියි.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Biography;
