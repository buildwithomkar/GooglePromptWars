import React, { useState } from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function TopicEntry({ onStart }) {
  const [topic, setTopic] = useState('');
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950">
      <div className="w-full max-w-md glass p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Adaptive Tutor</h1>
        <input 
          type="text" 
          value={topic} 
          onChange={(e) => setTopic(e.target.value)}
          placeholder="What do you want to learn?"
          className="w-full bg-slate-800 p-4 rounded-lg mb-4 text-white"
        />
        <button 
          onClick={() => onStart(topic)}
          className="w-full bg-indigo-600 p-4 rounded-lg font-bold flex items-center justify-center gap-2"
        >
          Start <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
