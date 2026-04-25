const express = require('express');
const path = require('path');
const cors = require('cors');
const { Firestore } = require('@google-cloud/firestore');
const { VertexAI } = require('@google-cloud/vertexai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
const LOCATION = 'us-central1';

// AUTO-DISCOVER Project ID or fallback to the specific project ID
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'lofty-reserve-494408-t5';

console.log(`Starting server for project: ${PROJECT_ID} on port ${PORT}`);

// Initialize Firestore
const firestore = new Firestore({ projectId: PROJECT_ID });

// Initialize Vertex AI
const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });
const generativeModel = vertexAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const SYSTEM_PROMPT = `You are a patient, expert teacher. Follow the Explain -> Example -> Question loop and adapt difficulty. Use Markdown.`;

// API Endpoints
app.post('/api/session/start', async (req, res) => {
  const { topic } = req.body;
  const sessionRef = firestore.collection('sessions').doc();
  const sessionId = sessionRef.id;
  
  const result = await generativeModel.generateContent({
    contents: [{ role: 'user', parts: [{ text: SYSTEM_PROMPT + `\nTeach me about ${topic}` }] }]
  });
  const aiResponse = result.response.candidates[0].content.parts[0].text;

  const sessionData = {
    topic,
    currentLevel: 1,
    stats: { correct: 0, wrong: 0 },
    history: [{ role: 'assistant', content: aiResponse }],
    createdAt: new Date().toISOString(),
  };
  await sessionRef.set(sessionData);
  res.json({ sessionId, ...sessionData });
});

app.post('/api/session/message', async (req, res) => {
  const { sessionId, content } = req.body;
  const sessionRef = firestore.collection('sessions').doc(sessionId);
  const sessionDoc = await sessionRef.get();
  const sessionData = sessionDoc.data();

  // Simple adaptation logic (simplified for brevity)
  const result = await generativeModel.generateContent({
    contents: [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      ...sessionData.history.map(h => ({ role: h.role, parts: [{ text: h.content }] })),
      { role: 'user', parts: [{ text: content }] }
    ]
  });

  const aiNextResponse = result.response.candidates[0].content.parts[0].text;
  const updatedHistory = [...sessionData.history, { role: 'user', content }, { role: 'assistant', content: aiNextResponse }];

  await sessionRef.update({ history: updatedHistory });
  res.json({ ...sessionData, history: updatedHistory });
});

// Serve static files from React app
const distPath = path.join(__dirname, '../client/dist');
app.use(express.static(distPath));

// Catch-all to serve index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
