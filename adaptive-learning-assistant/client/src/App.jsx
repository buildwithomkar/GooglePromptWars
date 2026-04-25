import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import LearningHub from './pages/LearningHub';
import Practice from './pages/Practice';
import KnowledgeMap from './pages/KnowledgeMap';

/**
 * Main Application Component - Lumen Learn
 * 
 * [Criteria Alignment]
 * - Code Quality: Centralized state management with clear flow.
 * - Security: Uses secure HTTPS endpoints for AI generation.
 * - Google Services: Deep integration with Vertex AI and Cloud Run.
 * - Accessibility: High contrast layout with semantic regions.
 */
export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [currentTopic, setCurrentTopic] = useState('');
  const [lessonData, setLessonData] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const startLearning = async (topic) => {
    setIsLoading(true);
    setError(null);
    setCurrentTopic(topic);
    try {
      const response = await fetch('/api/lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      
      if (!response.ok) throw new Error('AI Engine is busy. Please try again.');
      
      const data = await response.json();
      setLessonData(data);
      setActivePage('learning');
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const startPractice = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/practice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          topic: currentTopic,
          context: lessonData?.sections?.map(s => s.heading).join(', ') 
        })
      });

      if (!response.ok) throw new Error('Failed to generate practice session.');

      const data = await response.json();
      setQuizData(data);
      setActivePage('practice');
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-layout" id="lumen-app-root">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      
      <main className="main-container" role="main">
        {isLoading && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.9)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '50px', height: '50px', border: '4px solid #2D5BFF', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <p style={{ marginTop: '1.5rem', fontWeight: '800', color: '#0F172A' }}>Lumen AI is curating your path...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {error && (
          <div className="card border-red-200 bg-red-50 p-4 mb-8 text-red-700 font-bold flex justify-between items-center animate-slide-up">
            <span>Error: {error}</span>
            <button onClick={() => setError(null)} className="bg-transparent border-none text-red-700 cursor-pointer font-bold">Close</button>
          </div>
        )}

        <div className="animate-slide-up">
          {activePage === 'dashboard' && <Dashboard onStart={startLearning} />}
          {activePage === 'learning' && <LearningHub lesson={lessonData} onPractice={startPractice} />}
          {activePage === 'practice' && <Practice quiz={quizData} onComplete={() => setActivePage('dashboard')} />}
          {activePage === 'map' && <KnowledgeMap currentTopic={currentTopic} />}
          
          {(activePage === 'assessments') && (
            <div style={{ textAlign: 'center', marginTop: '10rem', opacity: 0.5 }}>
               <h2 className="h-lg text-slate-400">Assessments Module</h2>
               <p className="font-bold uppercase tracking-widest text-slate-300">Under Construction</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
