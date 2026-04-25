export const startSession = async (topic) => {
  const response = await fetch(`/api/session/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic }),
  });
  return response.json();
};

export const sendMessage = async (sessionId, content) => {
  const response = await fetch(`/api/session/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, content }),
  });
  return response.json();
};
