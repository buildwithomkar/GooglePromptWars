import React from 'react';
import { Share2, Lock, CheckCircle2, Circle } from 'lucide-react';

export default function KnowledgeMap({ currentTopic }) {
  const nodes = [
    { id: 1, label: 'Foundations', status: 'mastered', x: '20%', y: '50%' },
    { id: 2, label: 'Structural Patterns', status: 'in-progress', x: '50%', y: '30%' },
    { id: 3, label: 'Advanced Logic', status: 'locked', x: '80%', y: '50%' },
  ];

  return (
    <div className="h-[calc(100vh-10rem)] relative bg-[#F8FAFC] rounded-3xl border border-slate-200 overflow-hidden shadow-inner">
      {/* Background Dots */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
        backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
        backgroundSize: '24px 24px' 
      }}></div>

      <header className="absolute top-8 left-8 z-10">
        <h2 className="text-4xl text-slate-900 mb-2">Knowledge Map</h2>
        <p className="text-slate-400 font-medium">Visualizing your path to mastery in {currentTopic || 'General Concepts'}</p>
      </header>

      {/* SVG Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <line x1="20%" y1="50%" x2="50%" y2="30%" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="8 8" />
        <line x1="50%" y1="30%" x2="80%" y2="50%" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="8 8" />
      </svg>

      {/* Nodes */}
      {nodes.map(node => (
        <div 
          key={node.id} 
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 transition-all hover:scale-110 cursor-pointer"
          style={{ left: node.x, top: node.y }}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 ${
            node.status === 'mastered' ? 'bg-indigo-600 border-indigo-100 text-white' :
            node.status === 'in-progress' ? 'bg-white border-indigo-200 text-indigo-600' :
            'bg-slate-50 border-slate-200 text-slate-300'
          }`}>
            {node.status === 'mastered' ? <CheckCircle2 size={24} /> : 
             node.status === 'in-progress' ? <Share2 size={24} /> : 
             <Lock size={24} />}
          </div>
          <div className="text-center">
            <p className="font-bold text-slate-800">{node.label}</p>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
              {node.status.replace('-', ' ')}
            </p>
          </div>
        </div>
      ))}

      {/* Node Detail Side Panel (as seen in design) */}
      <aside className="absolute top-8 right-8 w-80 card p-8 bg-white/90 backdrop-blur-md shadow-2xl animate-fade-in">
        <div className="mb-6">
          <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded uppercase mb-2 block w-max">Selected Node</span>
          <h3 className="text-2xl mb-2">Advanced Logic</h3>
          <p className="text-sm text-slate-500 leading-relaxed">Understanding the underlying principles of symbolic reasoning and predicate calculus.</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-xs font-bold mb-2">
            <span className="text-slate-400 uppercase">Current Progress</span>
            <span className="text-indigo-600">100%</span>
          </div>
          <div className="progress-bar-container h-2 mt-0">
            <div className="progress-bar-fill w-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
            <p className="text-xl font-bold">12/12</p>
            <p className="text-[9px] uppercase font-bold text-slate-400">Modules</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
            <p className="text-xl font-bold">4/4</p>
            <p className="text-[9px] uppercase font-bold text-slate-400">Quizzes</p>
          </div>
        </div>

        <button className="w-full btn-primary flex items-center justify-center gap-2">
          <CheckCircle2 size={18} /> Review Concepts
        </button>
      </aside>
    </div>
  );
}
