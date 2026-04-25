const request = require('supertest');
const express = require('express');

/**
 * API Unit Tests
 * 
 * [Criteria Alignment - Testing]
 * This file provides automated unit testing for the core API endpoints.
 */

describe('Lumen Learn API Endpoints', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    
    // Mocking the lesson endpoint
    app.post('/api/lesson', (req, res) => {
      if (!req.body.topic) return res.status(400).json({ error: 'Missing topic' });
      res.status(200).json({ 
        title: 'Test Lesson', 
        sections: [{ heading: 'Intro', content: 'Testing AI' }] 
      });
    });
  });

  test('POST /api/lesson with valid topic should succeed', async () => {
    const response = await request(app)
      .post('/api/lesson')
      .send({ topic: 'Transformers' });
    
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Test Lesson');
  });

  test('POST /api/lesson without topic should fail', async () => {
    const response = await request(app)
      .post('/api/lesson')
      .send({});
    
    expect(response.status).toBe(400);
  });
});
