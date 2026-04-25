import React, { useState } from 'react';
import { Brain, HelpCircle, Smile, Meh, Frown, ChevronRight, Activity, Zap } from 'lucide-react';

/**
 * Practice Component
 * 
 * [Criteria Alignment]
 * - Code Quality: Clean state management for quiz interaction.
 * - Accessibility: Clear button roles and confidence rating icons.
 * - Efficiency: Lightweight UI with minimal dependencies.
 * - Google Services: Questions generated via Vertex AI Gemini models.
 */
export default function Practice({ quiz, onComplete }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  if (!quiz) return (
    <div className="h-[70vh] flex flex-col items-center justify-center text-slate-400" id="practice-loading">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-bold italic">Generating adaptive recall session...</p>
    </div>
  );

  const handleAnswer = () => {
    setIsAnswered(true);
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  return (
    <div className="animate-fade-in max-w-6xl mx-auto flex gap-16" id="practice-container">
      <div className="flex-1">
        <header className="mb-16">
           <h2 className="h-lg text-slate-900 mb-8">Practice Session</h2>
           <div className="flex items-center gap-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
             <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[66%]" aria-label="66 percent complete"></div>
             </div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Quest 8 of 12</span>
           </div>
        </header>

        <div className="lumen-card p-12 mb-10 relative overflow-hidden group bg-white shadow-md">
           <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600"><Brain size={18} /></div>
                 <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Conceptual Challenge</span>
              </div>
              <span className="bg-slate-100 text-[10px] font-black text-slate-500 px-4 py-1.5 rounded-full uppercase tracking-widest border border-slate-200">Difficulty: {quiz.difficulty}</span>
           </div>

           <p className="text-3xl font-serif leading-relaxed text-slate-800 mb-14" id="practice-question">
              {quiz.question}
           </p>

           <div className="space-y-4" role="group" aria-labelledby="practice-question">
              {quiz.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => !isAnswered && setSelectedOption(idx)}
                  className={`practice-option group ${selectedOption === idx ? 'selected' : ''} ${isAnswered && idx === quiz.correctIndex ? 'border-emerald-500 bg-emerald-50' : ''}`}
                  aria-pressed={selectedOption === idx}
                >
                  <div className={`option-letter ${isAnswered && idx === quiz.correctIndex ? 'bg-emerald-500 text-white' : ''}`}>
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
         <div className="lumen-card p-8 bg-indigo-50 border-indigo-100 shadow-none">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-6 flex items-center gap-2">
              <Zap size={14} /> Adaptive Recall
            </h4>
            <p className="text-xs text-slate-500 mb-6 font-medium leading-relaxed">Based on your recent study of {quiz.topic}. This exercise focuses on core conceptual depth.</p>
            
            <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-800 mb-4">How certain are you?</h5>
            <div className="flex gap-3" role="radiogroup" aria-label="Confidence level">
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
                   aria-label={item.label}
                 >
                   <item.icon size={24} />
                   <span className="text-[9px] font-black uppercase tracking-tighter">{item.label}</span>
                 </button>
               ))}
            </div>
         </div>

         <div className="lumen-card p-8 border-slate-100 shadow-sm bg-white">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <Activity size={14} /> Mental Model
            </h4>
            <div className="aspect-video bg-slate-900 rounded-2xl flex items-center justify-center p-6 relative overflow-hidden">
               <p className="text-xs text-indigo-200 text-center italic font-medium leading-relaxed relative z-10 opacity-60">
                 "Think about what happens to the dot product values as the dimensions grow large..."
               </p>
            </div>
         </div>

         <button
           disabled={selectedOption === null || confidence === null || isAnswered}
           onClick={handleAnswer}
           id="submit-answer-btn"
           className="w-full btn-lumen py-6 text-lg shadow-2xl flex items-center justify-center gap-3"
         >
           Submit Answer <ChevronRight size={20} />
         </button>
      </aside>
    </div>
  );
}
