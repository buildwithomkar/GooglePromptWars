import React, { useState } from 'react';
import { Brain, HelpCircle, Smile, Meh, Frown, ChevronRight, Activity, Zap } from 'lucide-react';

export default function Practice({ quiz, onComplete }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  if (!quiz) return <div className="h-[70vh] flex items-center justify-center text-slate-400 font-bold italic">Generating adaptive recall session...</div>;

  const handleAnswer = () => {
    setIsAnswered(true);
    setTimeout(() => {
      // Small delay for feedback before redirecting
      onComplete();
    }, 3000);
  };

  return (
    <div className="animate-fade-in max-w-6xl mx-auto flex gap-16">
      <div className="flex-1">
        <header className="mb-16">
           <h2 className="text-4xl text-slate-900 font-bold mb-8">Practice Session</h2>
           <div className="flex items-center gap-8 bg-white p-4 rounded-2xl border border-slate-100">
             <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[66%] shadow-[0_0_10px_rgba(79,70,229,0.5)]"></div>
             </div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Quest 8 of 12</span>
           </div>
        </header>

        <div className="card p-12 mb-10 shadow-xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:rotate-12 transition-transform">
              <Brain size={120} />
           </div>
           
           <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600"><Brain size={18} /></div>
                 <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Conceptual Challenge</span>
              </div>
              <span className="bg-slate-100 text-[10px] font-black text-slate-500 px-4 py-1.5 rounded-full uppercase tracking-widest border border-slate-200">Difficulty: {quiz.difficulty}</span>
           </div>

           <p className="text-3xl font-serif leading-relaxed text-slate-800 mb-14">
              {quiz.question}
           </p>

           <div className="space-y-4">
              {quiz.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => !isAnswered && setSelectedOption(idx)}
                  className={`practice-option group ${selectedOption === idx ? 'selected' : ''} ${isAnswered && idx === quiz.correctIndex ? 'border-emerald-500 bg-emerald-50' : ''}`}
                >
                  <div className={`option-letter group-hover:scale-110 transition-transform ${isAnswered && idx === quiz.correctIndex ? 'bg-emerald-500 text-white' : ''}`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className={`text-lg font-medium text-left ${selectedOption === idx ? 'text-indigo-900' : 'text-slate-600'}`}>
                    {option}
                  </span>
                </button>
              ))}
           </div>
        </div>
      </div>

      <aside className="w-96 pt-24 space-y-8">
         <div className="card p-8 bg-indigo-50 border-indigo-100 shadow-sm relative overflow-hidden">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-6 flex items-center gap-2">
              <Zap size={14} /> Adaptive Recall
            </h4>
            <p className="text-xs text-slate-500 mb-6 font-medium leading-relaxed">Based on your recent study of {quiz.topic}. This exercise focuses on core conceptual depth.</p>
            
            <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-800 mb-4">How certain are you?</h5>
            <div className="flex gap-3">
               {[
                 { icon: Frown, label: 'Guessing' },
                 { icon: Meh, label: 'Unsure' },
                 { icon: Smile, label: 'Confident' }
               ].map((item, i) => (
                 <button
                   key={i}
                   onClick={() => !isAnswered && setConfidence(i)}
                   className={`flex-1 p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                     confidence === i ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-white border-white text-slate-400 hover:border-indigo-200'
                   }`}
                 >
                   <item.icon size={24} />
                   <span className="text-[9px] font-black uppercase tracking-tighter">{item.label}</span>
                 </button>
               ))}
            </div>
         </div>

         <div className="card p-8 border-slate-100 shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <Activity size={14} /> Mental Model
            </h4>
            <div className="aspect-video bg-indigo-950 rounded-2xl flex items-center justify-center p-6 relative overflow-hidden group cursor-help">
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 animate-pulse"></div>
               <p className="text-xs text-indigo-200 text-center italic font-medium leading-relaxed relative z-10 opacity-60 group-hover:opacity-100 transition-opacity">
                 "Think about what happens to the dot product values as the dimensions grow large..."
               </p>
            </div>
         </div>

         <div className="card p-8 bg-indigo-600 border-none text-white shadow-xl shadow-indigo-200">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-3 flex items-center gap-2">
              <Sparkles size={14} /> Lumen Guide
            </h4>
            <p className="text-sm font-medium leading-relaxed">
               You've answered similar questions on this topic correctly 80% of the time. You're doing great!
            </p>
         </div>

         <button
           disabled={selectedOption === null || confidence === null || isAnswered}
           onClick={handleAnswer}
           className="w-full btn-primary py-6 text-lg shadow-2xl shadow-indigo-200 flex items-center justify-center gap-3"
         >
           Submit Answer <ChevronRight size={20} />
         </button>
      </aside>
    </div>
  );
}
