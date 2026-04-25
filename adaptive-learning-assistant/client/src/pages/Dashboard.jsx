import React, { useState } from 'react';
import { Search, Sparkles, BookOpen, Clock, ChevronRight, Bell, Zap } from 'lucide-react';

export default function Dashboard({ onStart }) {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim()) onStart(topic);
  };

  return (
    <div className="animate-slide-up">
      {/* Top Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h2 className="h-md">Dashboard</h2>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={18} />
            <input 
              type="text" 
              placeholder="Search knowledge..." 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
              style={{ background: 'white', border: '1px solid #E2E8F0', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: '999px', width: '300px' }}
            />
          </div>
          <Bell size={20} color="#64748B" />
          <Zap size={20} color="#64748B" />
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" style={{ width: '32px', height: '32px', borderRadius: '50%' }} alt="user" />
        </div>
      </header>

      {/* Hero Card */}
      <section className="lumen-card hero-card" style={{ marginBottom: '4rem' }}>
        <div style={{ maxWidth: '600px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6366F1', fontWeight: '800', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
            <Sparkles size={16} /> AI-Powered Curriculum
          </div>
          <h3 className="h-lg" style={{ color: 'white', marginBottom: '1.5rem' }}>Master any subject with personalized AI modules.</h3>
          <p style={{ color: '#94A3B8', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: '1.6' }}>Enter a topic and our system will curate a unique learning path, lessons, and practice sessions tailored to your goals.</p>
          
          <form onSubmit={handleSubmit} className="search-input-group">
            <Search className="search-icon-float" size={22} />
            <input 
              type="text" 
              className="search-input"
              placeholder="What do you want to learn?"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <button type="submit" className="btn-lumen" style={{ position: 'absolute', right: '8px', top: '8px', padding: '0.75rem 1.5rem' }}>
              Explore <ChevronRight size={18} />
            </button>
          </form>
        </div>
        
        {/* Decorative Graphic */}
        <div style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', opacity: 0.1 }}>
           <BookOpen size={300} color="white" />
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: '900', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Continue Learning</h4>
            <p style={{ color: '#64748B', fontWeight: '500' }}>Pick up right where you left off</p>
          </div>
          <button style={{ background: 'transparent', border: 'none', color: '#2D5BFF', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer' }}>View All Sessions</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="lumen-card" style={{ cursor: 'pointer' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ background: '#EFF6FF', padding: '0.75rem', borderRadius: '1rem', color: '#2D5BFF' }}>
                   <BookOpen size={24} />
                </div>
                <div style={{ textAlign: 'right' }}>
                   <p style={{ fontSize: '0.65rem', fontWeight: '900', color: '#94A3B8', textTransform: 'uppercase' }}>8 mins left</p>
                   <p style={{ fontSize: '0.85rem', fontWeight: '700' }}>65% Complete</p>
                </div>
             </div>
             <h5 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Neural Architecture</h5>
             <div className="progress-track">
                <div className="progress-fill" style={{ width: '65%' }}></div>
             </div>
          </div>

          <div className="lumen-card" style={{ opacity: 0.6 }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ background: '#F1F5F9', padding: '0.75rem', borderRadius: '1rem', color: '#64748B' }}>
                   <BookOpen size={24} />
                </div>
                <div style={{ textAlign: 'right' }}>
                   <p style={{ fontSize: '0.65rem', fontWeight: '900', color: '#94A3B8', textTransform: 'uppercase' }}>Completed</p>
                   <p style={{ fontSize: '0.85rem', fontWeight: '700' }}>100% Complete</p>
                </div>
             </div>
             <h5 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Micro-Architecture</h5>
             <div className="progress-track">
                <div className="progress-fill" style={{ width: '100%', background: '#10B981' }}></div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
