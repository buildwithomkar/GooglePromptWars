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
const generativeModel = vertexAI.getGenerativeModel({ 
  model: 'gemini-1.5-flash',
  generationConfig: {
    temperature: 0.7,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 2048,
  }
});

// Helper to clean JSON from Gemini
const parseGeminiJson = (text) => {
  try {
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("JSON Parse Error. Raw text:", text);
    throw new Error("Invalid JSON from AI");
  }
};

// 1. Generate Structured Lesson
app.post('/api/lesson', async (req, res) => {
  const { topic } = req.body;
  
  const prompt = `
    You are an expert tutor for Lumen Learn. Generate a premium educational module about "${topic}".
    The output MUST be a valid JSON object with this exact structure:
    {
      "title": "A sophisticated academic title",
      "sections": [
        {
          "heading": "Conceptual Heading",
          "content": "Deep, insightful lesson content in markdown format. Use analogies.",
          "takeaway": "A short, memorable key takeaway sentence.",
          "code": "Optional technical example or pseudocode (if applicable)"
        }
      ]
    }
    Requirements:
    - Provide exactly 3 sections.
    - Use high-level but clear language.
    - Include at least one code snippet or pseudocode.
    - Ensure markdown is clean.
  `;

  try {
    const result = await generativeModel.generateContent(prompt);
    const text = result.response.candidates[0].content.parts[0].text;
    const lesson = parseGeminiJson(text);
    res.json(lesson);
  } catch (error) {
    console.error('Error generating lesson:', error);
    res.status(500).json({ error: 'Failed to generate curriculum' });
  }
});

// 2. Generate Practice Quiz
app.post('/api/practice', async (req, res) => {
  const { topic, context } = req.body;

  const prompt = `
    You are the Lumen Learn assessment engine. Generate a challenging practice question about "${topic}".
    Context of recent study: ${context}.
    
    The output MUST be a valid JSON object with this exact structure:
    {
      "topic": "${topic}",
      "difficulty": "Hard",
      "question": "A deep conceptual question that tests mental models.",
      "options": ["Sophisticated Option A", "Sophisticated Option B", "Sophisticated Option C", "Sophisticated Option D"],
      "correctIndex": 0,
      "explanation": "A detailed explanation of why the answer is correct."
    }
  `;

  try {
    const result = await generativeModel.generateContent(prompt);
    const text = result.response.candidates[0].content.parts[0].text;
    const quiz = parseGeminiJson(text);
    res.json(quiz);
  } catch (error) {
    console.error('Error generating practice:', error);
    res.status(500).json({ error: 'Failed to generate practice session' });
  }
});

// Serve static files
const distPath = path.join(__dirname, '../client/dist');
app.use(express.static(distPath));
app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));

app.listen(PORT, () => console.log(`Lumen Server active on port ${PORT}`));
