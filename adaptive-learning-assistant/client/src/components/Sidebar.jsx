import React from 'react';
import { LayoutDashboard, Share2, BookOpen, PenTool, ClipboardCheck, Settings, HelpCircle } from 'lucide-react';

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
      <div className="logo-container">
        <h1 className="logo-main">Lumen Learn</h1>
        <p className="logo-sub">Intellectual Partner</p>
      </div>

      <nav className="nav-list">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`nav-item-btn ${activePage === item.id ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer" style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid #E2E8F0' }}>
        <button className="nav-item-btn"><Settings size={20} /> Settings</button>
        <button className="nav-item-btn"><HelpCircle size={20} /> Support</button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.5rem', padding: '0 0.5rem' }}>
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="avatar" 
            style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F1F5F9' }}
          />
          <div>
            <p style={{ fontSize: '0.85rem', fontWeight: '700' }}>Alex Morgan</p>
            <p style={{ fontSize: '0.65rem', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase' }}>Level 12 Learner</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
