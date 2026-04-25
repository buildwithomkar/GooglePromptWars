import React, { useState } from 'react';
import { Send, LogOut } from 'lucide-react';
import Message from './Message';

export default function ChatInterface({ session, onSendMessage, onEndSession }) {
  const [input, setInput] = useState('');
  return (
    <div className="flex flex-col h-screen bg-slate-950">
      <header className="glass m-4 p-4 flex justify-between items-center">
        <h2 className="font-bold">{session.topic}</h2>
        <button onClick={onEndSession}><LogOut size={20} /></button>
      </header>
      <div className="flex-1 overflow-y-auto">
        {session.history.map((msg, idx) => <Message key={idx} {...msg} />)}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); if(input) { onSendMessage(input); setInput(''); } }} className="p-6">
        <div className="relative max-w-4xl mx-auto">
          <input 
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your response..."
          />
          <button className="absolute right-2 top-2 p-2 bg-indigo-600 rounded-lg"><Send size={20} /></button>
        </div>
      </form>
    </div>
  );
}
