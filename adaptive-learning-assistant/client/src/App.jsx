import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import LearningHub from './pages/LearningHub';
import Practice from './pages/Practice';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartLearning = async (topic) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/lesson`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      const data = await response.json();
      setCurrentLesson(data);
      setActivePage('learning');
    } catch (err) {
      console.error("Error generating lesson:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckUnderstanding = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/practice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          topic: currentLesson.title,
          context: currentLesson.sections.map(s => s.heading).join(', ')
        })
      });
      const data = await response.json();
      setCurrentQuiz(data);
      setActivePage('practice');
    } catch (err) {
      console.error("Error generating practice:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = async (selectedOption, confidence) => {
    // Logic for answering
    setActivePage('dashboard');
    alert("Evaluation complete. Returning to dashboard.");
  };

  return (
    <div className="app-container">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      
      <main className="main-content">
        {isLoading && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-bold text-slate-900 animate-pulse">Lumen AI is generating your path...</p>
          </div>
        )}

        {activePage === 'dashboard' && <Dashboard onStartLearning={handleStartLearning} />}
        {activePage === 'learning' && <LearningHub lesson={currentLesson} onCheckUnderstanding={handleCheckUnderstanding} />}
        {activePage === 'practice' && <Practice quiz={currentQuiz} onAnswer={handleAnswer} />}
        
        {(activePage === 'map' || activePage === 'assessments') && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-2xl mb-2">Coming Soon</h2>
            <p className="text-slate-400">The {activePage} feature is currently being developed.</p>
          </div>
        )}
      </main>
    </div>
  );
}
