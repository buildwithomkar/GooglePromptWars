import React from 'react';
import { Clock, CheckCircle2, ChevronRight, BookOpen, Sparkles, Share2, Bookmark } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function LearningHub({ lesson, onPractice }) {
  if (!lesson) return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center opacity-50">
       <BookOpen size={64} className="mb-4 text-slate-300" />
       <h3 className="text-xl">Your curriculum will appear here.</h3>
       <p className="text-slate-400">Return to the dashboard and enter a topic to start.</p>
    </div>
  );

  return (
    <div className="animate-fade-in max-w-5xl mx-auto pb-32">
      <header className="flex justify-between items-start mb-12">
        <div className="flex-1">
           <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-widest mb-6">
              <BookOpen size={14} /> Module 4: Logical Layers
           </div>
           <h2 className="text-6xl text-slate-900 font-bold mb-8 leading-tight">{lesson.title}</h2>
        </div>
        <div className="flex gap-3">
          <button className="p-3 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-indigo-600 transition-all shadow-sm"><Share2 size={20} /></button>
          <button className="p-3 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-indigo-600 transition-all shadow-sm"><Bookmark size={20} /></button>
        </div>
      </header>

      <div className="card p-4 bg-white/50 backdrop-blur-sm border-slate-100 mb-16 flex items-center gap-8">
        <div className="flex-1 px-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lesson Progress</span>
            <span className="text-xs font-bold text-slate-900">65%</span>
          </div>
          <div className="progress-bar-container h-1.5 mt-0 bg-slate-200/50">
            <div className="progress-bar-fill w-[65%] shadow-[0_0_15px_rgba(45,91,255,0.3)]"></div>
          </div>
        </div>
        <div className="w-[1px] h-10 bg-slate-200"></div>
        <div className="flex items-center gap-2 px-6 py-2 bg-slate-50 rounded-xl text-slate-600 font-bold text-xs">
          <Clock size={16} /> 8 mins left
        </div>
      </div>

      <div className="grid grid-cols-12 gap-16">
        <div className="col-span-8 space-y-16">
          {lesson.sections.map((section, idx) => (
            <section key={idx} className="prose prose-slate max-w-none prose-headings:font-serif prose-p:text-slate-600 prose-p:text-lg prose-p:leading-relaxed">
              <h3 className="text-3xl font-bold mb-8 text-slate-800">{section.heading}</h3>
              <ReactMarkdown>{section.content}</ReactMarkdown>
              
              {section.code && (
                <div className="code-window">
                  <div className="code-header">
                    <div className="code-dot bg-rose-500"></div>
                    <div className="code-dot bg-amber-500"></div>
                    <div className="code-dot bg-emerald-500"></div>
                    <span className="text-[10px] text-slate-500 font-mono ml-4 uppercase tracking-widest">{lesson.title.toLowerCase().replace(' ', '_')}.asm</span>
                  </div>
                  <div className="code-content">
                    <pre className="overflow-x-auto">
                      <code>{section.code}</code>
                    </pre>
                  </div>
                </div>
              )}

              {section.takeaway && (
                <div className="key-takeaway-box">
                  <div className="takeaway-label">Key Takeaway</div>
                  <div className="takeaway-text">"{section.takeaway}"</div>
                </div>
              )}
            </section>
          ))}

          <div className="card bg-indigo-50 border-indigo-100 p-10 flex gap-8 items-start relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                <Sparkles size={120} className="text-indigo-900" />
             </div>
             <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-xl shadow-indigo-200 relative z-10">
                <Sparkles size={24} />
             </div>
             <div className="relative z-10">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-4">Lumen Assistant</h4>
                <p className="text-indigo-900 text-lg italic leading-relaxed font-medium">"Think of this architectural limit like a narrow bridge connecting two major cities. No matter how fast the traffic flows within each city, the bridge limits the total volume that can pass between them."</p>
             </div>
          </div>
        </div>

        <aside className="col-span-4 space-y-8">
           <div className="card p-8 border-slate-100 shadow-sm sticky top-12">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Module Content</h4>
              <nav className="space-y-2">
                {lesson.sections.map((s, i) => (
                  <div key={i} className={`p-4 rounded-xl flex items-center gap-3 text-sm font-bold ${i === 0 ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'} transition-all cursor-pointer`}>
                    <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
                    {s.heading}
                  </div>
                ))}
              </nav>
              
              <button 
                onClick={onPractice}
                className="w-full btn-primary mt-12 py-5 shadow-2xl shadow-indigo-200 flex items-center justify-center gap-3 text-lg"
              >
                Check Understanding <ChevronRight size={20} />
              </button>
           </div>
        </aside>
      </div>
    </div>
  );
}
