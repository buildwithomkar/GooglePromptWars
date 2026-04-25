import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';

export default function Message({ role, content }) {
  const isBot = role === 'assistant';
  return (
    <div className={`p-6 flex gap-4 ${isBot ? 'bg-slate-800/20' : ''}`}>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isBot ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-700'}`}>
        {isBot ? <Bot size={24} /> : <User size={24} />}
      </div>
      <div className="prose prose-invert flex-1">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
