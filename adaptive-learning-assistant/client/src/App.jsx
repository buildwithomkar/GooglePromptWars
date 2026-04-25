import React, { useState, useEffect } from 'react';
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

  // Persistence (optional but helpful)
  useEffect(() => {
    const saved = localStorage.getItem('lumen_active_topic');
    if (saved) setCurrentTopic(saved);
  }, []);

  const startLearning = async (topic) => {
    setIsLoading(true);
    setCurrentTopic(topic);
    localStorage.setItem('lumen_active_topic', topic);
    
    try {
      const response = await fetch('/api/lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      
      if (!response.ok) throw new Error('Generation failed');
      
      const data = await response.json();
      setLessonData(data);
      setActivePage('learning');
    } catch (err) {
      console.error(err);
      alert("Failed to generate lesson. Please try again.");
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
    <div className="layout">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      
      <main className="content-wrapper">
        {isLoading && (
          <div className="fixed inset-0 bg-white/90 backdrop-blur-md z-[100] flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-xl font-bold text-slate-800 animate-pulse">Lumen AI is curating your module...</p>
            <p className="text-slate-400 mt-2">Connecting to Gemini 1.5 Flash</p>
          </div>
        )}

        <div className="animate-fade-in">
          {activePage === 'dashboard' && <Dashboard onStart={startLearning} />}
          {activePage === 'learning' && <LearningHub lesson={lessonData} onPractice={startPractice} />}
          {activePage === 'practice' && <Practice quiz={quizData} onComplete={() => setActivePage('dashboard')} />}
          {activePage === 'map' && <KnowledgeMap currentTopic={currentTopic} />}
        </div>
      </main>
    </div>
  );
}
