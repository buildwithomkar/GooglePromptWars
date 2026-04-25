import React, { useState } from 'react';
import TopicEntry from './components/TopicEntry';
import ChatInterface from './components/ChatInterface';
import { startSession, sendMessage } from './api';

export default function App() {
  const [session, setSession] = useState(null);

  const handleStartSession = async (topic) => {
    const data = await startSession(topic);
    setSession(data);
  };

  const handleSendMessage = async (content) => {
    const data = await sendMessage(session.sessionId, content);
    setSession(data);
  };

  if (!session) return <TopicEntry onStart={handleStartSession} />;

  return (
    <ChatInterface 
      session={session} 
      onSendMessage={handleSendMessage} 
      onEndSession={() => setSession(null)} 
    />
  );
}
