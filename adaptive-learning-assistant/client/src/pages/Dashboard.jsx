import React, { useState } from 'react';
import { Search, Sparkles, BookOpen, Clock, ChevronRight, Zap } from 'lucide-react';

export default function Dashboard({ onStart }) {
  const [topic, setTopic] = useState('');

  const recentSessions = [
    { id: 1, title: 'Neural Architecture', progress: 65, time: '8 mins left', color: 'bg-blue-600' },
    { id: 2, title: 'Micro-Architecture', progress: 100, time: 'Completed', color: 'bg-emerald-500' },
  ];

  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-16">
        <h2 className="text-4xl text-slate-900 font-bold tracking-tight">Dashboard</h2>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search concepts..." 
              className="bg-white border-2 border-slate-100 rounded-full py-3 pl-12 pr-6 w-80 focus:outline-none focus:border-indigo-200 transition-all shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-white border-2 border-slate-100 rounded-full text-slate-400 hover:text-indigo-600 transition-colors"><Zap size={20} /></button>
            <button className="p-3 bg-white border-2 border-slate-100 rounded-full text-slate-400 hover:text-indigo-600 transition-colors"><Search size={20} /></button>
          </div>
        </div>
      </header>

      <section className="mb-20">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative card bg-slate-900 text-white p-14 border-none shadow-2xl overflow-hidden">
            <div className="max-w-2xl relative z-10">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest mb-6">
                <Sparkles size={16} /> AI-Powered Curriculum
              </div>
              <h3 className="text-5xl mb-6 text-white leading-tight">Master any subject with personalized AI modules.</h3>
              <p className="text-slate-400 text-xl mb-10 leading-relaxed">Enter a topic and our system will curate a unique learning path, lessons, and practice sessions tailored to your goals.</p>
              
              <form onSubmit={(e) => { e.preventDefault(); if(topic) onStart(topic); }} className="flex gap-4">
                <input 
                  type="text" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Transformers, Photosynthesis, Game Theory" 
                  className="flex-1 bg-white/10 border border-white/20 rounded-2xl py-5 px-8 text-white text-lg placeholder-white/30 focus:outline-none focus:bg-white/20 transition-all backdrop-blur-md"
                />
                <button type="submit" className="bg-indigo-600 text-white px-10 rounded-2xl font-bold hover:bg-indigo-500 transition-all shadow-xl flex items-center gap-2 text-lg">
                  Explore <ChevronRight size={24} />
                </button>
              </form>
            </div>
            
            {/* Background Decorations */}
            <div className="absolute right-[-100px] top-[-100px] w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]"></div>
            <div className="absolute right-20 bottom-10 opacity-10">
               <BookOpen size={240} className="text-white" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h4 className="text-sm uppercase tracking-widest text-slate-400 font-extrabold mb-2">Continue Learning</h4>
            <p className="text-slate-500 font-medium">Pick up right where you left off</p>
          </div>
          <button className="text-indigo-600 font-bold text-sm hover:underline">View All Sessions</button>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          {recentSessions.map(session => (
            <div key={session.id} className="card p-8 group hover:border-indigo-200 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${session.color} text-white shadow-lg`}>
                  <BookOpen size={28} />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">{session.time}</p>
                  <p className="text-xs font-bold text-slate-600">{session.progress}% Complete</p>
                </div>
              </div>
              <h5 className="text-2xl font-bold mb-6 group-hover:text-indigo-600 transition-colors">{session.title}</h5>
              <div className="progress-bar-container h-1.5">
                <div className={`${session.color} h-full transition-all duration-1000`} style={{ width: `${session.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
