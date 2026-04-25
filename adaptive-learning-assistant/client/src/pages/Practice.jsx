import React, { useState } from 'react';
import { Award, Brain, Target, ArrowRight, Frown, Meh, Smile } from 'lucide-react';

export default function Practice({ quiz, onAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [confidence, setConfidence] = useState(null);

  if (!quiz) return <div className="flex items-center justify-center h-full text-slate-400">Complete a lesson to start practice.</div>;

  return (
    <div className="animate-fade-in max-w-5xl mx-auto flex gap-12 h-full">
      <div className="flex-1">
        <header className="mb-12">
          <h2 className="text-4xl text-slate-900 mb-6">Practice Session</h2>
          <div className="flex items-center gap-6">
            <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full" style={{ width: '66%' }}></div>
            </div>
            <span className="text-xs font-bold text-slate-400">Quest 8 of 12</span>
          </div>
        </header>

        <div className="card p-10 mb-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
              <Brain size={14} className="text-indigo-500" />
              Conceptual Challenge
            </div>
            <span className="bg-slate-100 text-[10px] font-bold text-slate-500 px-3 py-1 rounded-full uppercase tracking-widest">Difficulty: {quiz.difficulty}</span>
          </div>

          <p className="text-2xl leading-relaxed text-slate-800 mb-12">
            {quiz.question}
          </p>

          <div className="space-y-4">
            {quiz.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all flex items-start gap-4 group ${
                  selectedOption === idx 
                    ? 'border-indigo-600 bg-indigo-50' 
                    : 'border-slate-100 hover:border-slate-200 bg-white'
                }`}
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  selectedOption === idx ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className={`flex-1 ${selectedOption === idx ? 'text-indigo-900' : 'text-slate-600'}`}>
                  {option}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <aside className="w-80 pt-20">
        <div className="space-y-6">
          <div className="card p-6 bg-indigo-50 border-indigo-100">
            <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-4">How certain are you?</h4>
            <div className="flex gap-2">
              {[
                { icon: Frown, label: 'Guessing' },
                { icon: Meh, label: 'Unsure' },
                { icon: Smile, label: 'Confident' }
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => setConfidence(i)}
                  className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                    confidence === i ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-400 hover:border-indigo-300'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="text-[10px] font-bold uppercase">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="card p-6 border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <Target size={14} /> Mental Model
            </h4>
            <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center p-4">
               <p className="text-[10px] text-white/40 text-center italic">Visualization of: {quiz.topic}</p>
            </div>
          </div>

          <button
            disabled={selectedOption === null || confidence === null}
            onClick={() => onAnswer(selectedOption, confidence)}
            className="w-full btn-primary flex items-center justify-center gap-2 py-4 disabled:opacity-30 disabled:translate-y-0"
          >
            Submit Answer <ArrowRight size={18} />
          </button>
        </div>
      </aside>
    </div>
  );
}
