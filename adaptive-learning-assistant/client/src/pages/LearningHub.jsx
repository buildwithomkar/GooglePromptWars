import React from 'react';
import { Clock, CheckCircle2, ChevronRight, BookOpen, Sparkles, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function LearningHub({ lesson, onCheckUnderstanding }) {
  if (!lesson) return <div className="flex items-center justify-center h-full text-slate-400">Select a topic to start learning.</div>;

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <header className="mb-12">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">
          <BookOpen size={14} />
          Module 1: Foundations
        </div>
        <h2 className="text-5xl text-slate-900 mb-6">{lesson.title}</h2>
        <div className="flex items-center gap-6">
          <div className="flex-1 bg-slate-100 h-1 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full" style={{ width: '65%' }}></div>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
            <span>65% PROGRESS</span>
            <span className="flex items-center gap-1"><Clock size={12} /> 8 mins left</span>
          </div>
        </div>
      </header>

      <div className="space-y-12 pb-24">
        {lesson.sections.map((section, idx) => (
          <section key={idx} className="prose max-w-none">
            <h3 className="text-2xl mb-4 text-slate-800">{section.heading}</h3>
            <ReactMarkdown>{section.content}</ReactMarkdown>
            
            {section.takeaway && (
              <div className="key-takeaway my-8">
                <p className="text-xs font-bold text-sky-600 uppercase mb-2">Key Takeaway</p>
                <p className="text-slate-800 font-medium italic">"{section.takeaway}"</p>
              </div>
            )}

            {section.code && (
              <div className="bg-slate-900 rounded-xl p-6 my-8 font-mono text-sm overflow-x-auto shadow-2xl">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                </div>
                <pre className="text-indigo-300">
                  <code>{section.code}</code>
                </pre>
              </div>
            )}
          </section>
        ))}

        <div className="card bg-slate-50 border-slate-200 p-8 flex gap-6 items-start">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <Sparkles size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-2">Lumen Assistant</h4>
            <p className="text-slate-700 italic">"Think of this concept like a relay race where each runner represents a layer of the architecture, passing information with precision."</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-12 border-t border-slate-100">
          <button className="btn-secondary flex items-center gap-2">
            <ChevronRight size={18} className="rotate-180" /> Previous Section
          </button>
          <button 
            onClick={onCheckUnderstanding}
            className="btn-primary flex items-center gap-2 shadow-xl shadow-indigo-200"
          >
            Check Understanding <CheckCircle2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
