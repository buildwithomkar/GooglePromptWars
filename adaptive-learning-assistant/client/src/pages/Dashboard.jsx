import React, { useState } from 'react';
import { Search, Sparkles, BookOpen, Clock, TrendingUp } from 'lucide-react';

export default function Dashboard({ onStartLearning }) {
  const [topic, setTopic] = useState('');

  const recentTopics = [
    { name: 'Neural Architecture', progress: 65, time: '8 mins left' },
    { name: 'Micro-Architecture', progress: 100, time: 'Completed' },
    { name: 'Quantum Logic', progress: 20, time: '2h left' }
  ];

  return (
    <div className="animate-fade-in">
      <header className="flex justify-between items-center mb-12">
        <h2 className="text-3xl text-slate-900">Dashboard</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search concepts..." 
            className="bg-white border border-slate-200 rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-slate-100"
          />
        </div>
      </header>

      <section className="mb-12">
        <div className="card bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-10 relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <h3 className="text-4xl mb-4 text-white">What would you like to master today?</h3>
            <p className="text-slate-400 mb-8 text-lg">Your AI-powered tutor is ready to generate a personalized learning path for any topic.</p>
            
            <form onSubmit={(e) => { e.preventDefault(); if(topic) onStartLearning(topic); }} className="flex gap-4">
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic (e.g. Transformers, Photosynthesis, Game Theory)" 
                className="flex-1 bg-white/10 border border-white/20 rounded-xl py-4 px-6 text-white placeholder-white/40 focus:outline-none focus:bg-white/20 transition-all"
              />
              <button type="submit" className="bg-white text-slate-900 px-8 rounded-xl font-bold hover:bg-slate-100 transition-colors flex items-center gap-2">
                Generate <Sparkles size={18} />
              </button>
            </form>
          </div>
          <Sparkles className="absolute right-[-20px] top-[-20px] w-64 h-64 text-white/5" />
        </div>
      </section>

      <section>
        <h4 className="text-sm uppercase tracking-widest text-slate-400 font-bold mb-6">Recent Sessions</h4>
        <div className="grid grid-cols-3 gap-6">
          {recentTopics.map((item, idx) => (
            <div key={idx} className="card p-6 hover:border-slate-300 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-indigo-50 transition-colors">
                  <BookOpen size={20} className="text-slate-600 group-hover:text-indigo-600" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{item.time}</span>
              </div>
              <h5 className="text-xl mb-4">{item.name}</h5>
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full" style={{ width: `${item.progress}%` }}></div>
              </div>
              <p className="text-right text-[10px] mt-2 font-bold text-slate-400">{item.progress}% COMPLETE</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
