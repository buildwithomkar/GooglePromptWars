import React from 'react';
import { LayoutDashboard, Share2, BookOpen, PenTool, ClipboardCheck, Settings, HelpCircle, User } from 'lucide-react';

export default function Sidebar({ activePage, onPageChange }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'map', label: 'Knowledge Map', icon: Share2 },
    { id: 'learning', label: 'Learning Hub', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: PenTool },
    { id: 'assessments', label: 'Assessments', icon: ClipboardCheck },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <h1 className="logo-text">Lumen Learn</h1>
        <p className="logo-subtext">Intellectual Partner</p>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`nav-link w-full ${activePage === item.id ? 'active' : ''}`}
          >
            <item.icon size={20} strokeWidth={activePage === item.id ? 2.5 : 2} />
            <span>{item.label}</span>
            {activePage === item.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600"></div>}
          </button>
        ))}
      </nav>

      <div className="space-y-1 pt-8 border-t border-slate-100">
        <button className="nav-link w-full">
          <Settings size={20} />
          <span>Settings</span>
        </button>
        <button className="nav-link w-full">
          <HelpCircle size={20} />
          <span>Support</span>
        </button>
        
        <div className="user-profile">
          <div className="avatar ring-2 ring-offset-2 ring-indigo-50 overflow-hidden">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-slate-800 truncate">Alex Morgan</p>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">Level 12 Learner</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
