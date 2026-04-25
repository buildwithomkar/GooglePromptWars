import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import LearningHub from './pages/LearningHub';
import Practice from './pages/Practice';
import KnowledgeMap from './pages/KnowledgeMap';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [currentTopic, setCurrentTopic] = useState('');
  const [lessonData, setLessonData] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const startLearning = async (topic) => {
    setIsLoading(true);
    setCurrentTopic(topic);
    try {
      const response = await fetch('/api/lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      const data = await response.json();
      setLessonData(data);
      setActivePage('learning');
    } catch (err) {
      console.error(err);
      alert("AI failed to generate lesson. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const startPractice = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/practice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          topic: currentTopic,
          context: lessonData?.sections?.map(s => s.heading).join(', ') 
        })
      });
      const data = await response.json();
      setQuizData(data);
      setActivePage('practice');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      
      <main className="main-container">
        {isLoading && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.9)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '50px', height: '50px', border: '4px solid #2D5BFF', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <p style={{ marginTop: '1.5rem', fontWeight: '700', color: '#1E293B' }}>Lumen AI is curating your path...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        <div className="animate-slide-up">
          {activePage === 'dashboard' && <Dashboard onStart={startLearning} />}
          {activePage === 'learning' && <LearningHub lesson={lessonData} onPractice={startPractice} />}
          {activePage === 'practice' && <Practice quiz={quizData} onComplete={() => setActivePage('dashboard')} />}
          {activePage === 'map' && <KnowledgeMap currentTopic={currentTopic} />}
          
          {(activePage === 'assessments') && (
            <div style={{ textAlign: 'center', marginTop: '10rem', opacity: 0.5 }}>
               <h2 className="h-lg">Coming Soon</h2>
               <p>The Assessments module is currently being finalized.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
