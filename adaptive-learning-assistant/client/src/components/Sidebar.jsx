import React from 'react';
import { LayoutDashboard, Map, BookOpen, PenTool, ClipboardCheck, Settings, HelpCircle } from 'lucide-react';

export default function Sidebar({ activePage, onPageChange }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'map', label: 'Knowledge Map', icon: Map },
    { id: 'learning', label: 'Learning Hub', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: PenTool },
    { id: 'assessments', label: 'Assessments', icon: ClipboardCheck },
  ];

  return (
    <aside className="sidebar">
      <div className="mb-12">
        <h1 className="text-2xl text-slate-900 mb-1">Lumen Learn</h1>
        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Intellectual Partner</p>
      </div>

      <nav className="flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`nav-item w-full text-left flex items-center gap-3 ${activePage === item.id ? 'active' : ''}`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-slate-100">
        <button className="nav-item w-full text-left flex items-center gap-3">
          <Settings size={20} />
          Settings
        </button>
        <button className="nav-item w-full text-left flex items-center gap-3">
          <HelpCircle size={20} />
          Support
        </button>
        
        <div className="mt-8 flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
          </div>
          <div>
            <p className="text-sm font-bold">Alex Morgan</p>
            <p className="text-[10px] text-slate-500 uppercase">Level 12 Learner</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
