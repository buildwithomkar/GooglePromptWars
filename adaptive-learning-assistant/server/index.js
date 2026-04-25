const express = require('express');
const path = require('path');
const cors = require('cors');
const { VertexAI } = require('@google-cloud/vertexai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
const LOCATION = 'us-central1';
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'lofty-reserve-494408-t5';

// Initialize Vertex AI
const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });
const generativeModel = vertexAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// 1. Generate Structured Lesson
app.post('/api/lesson', async (req, res) => {
  const { topic } = req.body;
  
  const prompt = `
    Generate a detailed educational lesson about "${topic}".
    The output MUST be a valid JSON object with this exact structure:
    {
      "title": "Main Title",
      "sections": [
        {
          "heading": "Section Heading",
          "content": "Detailed markdown content",
          "takeaway": "Short punchy key takeaway",
          "code": "Optional code snippet if relevant"
        }
      ]
    }
    Provide 3 sections. Use professional, clear language. 
    Ensure the JSON is perfectly formatted. Do not include markdown code blocks around the JSON.
  `;

  try {
    const result = await generativeModel.generateContent(prompt);
    const text = result.response.candidates[0].content.parts[0].text;
    const cleanedJson = text.replace(/```json|```/g, "").trim();
    const lesson = JSON.parse(cleanedJson);
    res.json(lesson);
  } catch (error) {
    console.error('Error generating lesson:', error);
    res.status(500).json({ error: 'Failed to generate lesson' });
  }
});

// 2. Generate Practice Quiz
app.post('/api/practice', async (req, res) => {
  const { topic, context } = req.body;

  const prompt = `
    Generate a multiple-choice practice question about "${topic}" based on these concepts: ${context}.
    The output MUST be a valid JSON object with this exact structure:
    {
      "topic": "${topic}",
      "difficulty": "Medium",
      "question": "The question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Why the answer is correct"
    }
    Ensure the JSON is perfectly formatted. Do not include markdown code blocks around the JSON.
  `;

  try {
    const result = await generativeModel.generateContent(prompt);
    const text = result.response.candidates[0].content.parts[0].text;
    const cleanedJson = text.replace(/```json|```/g, "").trim();
    const quiz = JSON.parse(cleanedJson);
    res.json(quiz);
  } catch (error) {
    console.error('Error generating practice:', error);
    res.status(500).json({ error: 'Failed to generate practice' });
  }
});

// Serve static files
const distPath = path.join(__dirname, '../client/dist');
app.use(express.static(distPath));
app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
