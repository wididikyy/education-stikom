# English Learning API Documentation

API documentation for English Learning features powered by Google Gemini AI.

## Table of Contents

- [Setup](#setup)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [1. Generate Text](#1-generate-text)
  - [2. Chat with Gemini](#2-chat-with-gemini)
  - [3. Generate Debate Topic](#3-generate-debate-topic)
  - [4. Generate Pronunciation Text](#4-generate-pronunciation-text)
  - [5. Analyze Pronunciation](#5-analyze-pronunciation)
  - [6. Analyze Grammar](#6-analyze-grammar)
- [Error Handling](#error-handling)
- [Rate Limits](#rate-limits)
- [Examples](#examples)

---

## Setup

### Prerequisites

- Node.js 18+
- Next.js 14+
- Google Gemini API Key

### Installation

```bash
npm install @google/generative-ai
```

### Environment Variables

Create a `.env.local` file:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your API key from: [Google AI Studio](https://makersuite.google.com/app/apikey)

---

## Base URL

```
http://localhost:3000/api/gemini
```

For production:
```
https://your-domain.com/api/gemini
```

---

## Authentication

All API endpoints are server-side protected. The Gemini API key is stored securely in environment variables and never exposed to the client.

---

## API Endpoints

### 1. Generate Text

Generate text from a prompt using Gemini AI.

**Endpoint:** `POST /api/gemini/generate-text`

**Request Body:**

```json
{
  "prompt": "Write a short story about learning English"
}
```

**Response:**

```json
{
  "success": true,
  "data": "Once upon a time, there was a student who loved learning English..."
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "Prompt is required and must be a string"
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3000/api/gemini/generate-text \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a poem about coding"
  }'
```

**JavaScript Example:**

```javascript
const response = await fetch('/api/gemini/generate-text', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Explain photosynthesis in simple terms'
  })
});

const data = await response.json();
console.log(data.data);
```

---

### 2. Chat with Gemini

Have a conversation with Gemini AI with context history.

**Endpoint:** `POST /api/gemini/chat`

**Request Body:**

```json
{
  "history": [
    {
      "role": "user",
      "content": "Hello, I want to learn English"
    },
    {
      "role": "assistant",
      "content": "Great! I'm here to help you learn English."
    }
  ],
  "message": "Can you help me with grammar?",
  "systemInstruction": "You are a helpful English learning assistant." // Optional
}
```

**Response:**

```json
{
  "success": true,
  "data": "Of course! I'd be happy to help you with English grammar. What specific grammar topic would you like to learn about?"
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "Message is required"
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3000/api/gemini/chat \
  -H "Content-Type: application/json" \
  -d '{
    "history": [],
    "message": "Teach me about present perfect tense",
    "systemInstruction": "You are an English teacher"
  }'
```

**JavaScript Example:**

```javascript
const chatHistory = [
  { role: 'user', content: 'Hi!' },
  { role: 'assistant', content: 'Hello! How can I help you?' }
];

const response = await fetch('/api/gemini/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    history: chatHistory,
    message: 'Explain past tense',
    systemInstruction: 'You are an English tutor'
  })
});

const data = await response.json();
console.log(data.data);
```

**Notes:**
- `history` must be an array of messages
- `role` can be `"user"` or `"assistant"`
- `systemInstruction` is optional (default: "You are a helpful English learning assistant.")

---

### 3. Generate Debate Topic

Generate a random debate topic suitable for English learners.

**Endpoint:** `GET /api/gemini/debate-topic`

**Request:** No body required

**Response:**

```json
{
  "success": true,
  "data": "Topic: Should schools require students to learn a second language?"
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "Failed to generate topic"
}
```

**cURL Example:**

```bash
curl http://localhost:3000/api/gemini/debate-topic
```

**JavaScript Example:**

```javascript
const response = await fetch('/api/gemini/debate-topic');
const data = await response.json();
console.log(data.data);
```

**Topic Criteria:**
- Suitable for intermediate to advanced learners
- Engaging and thought-provoking
- Not too controversial or sensitive
- Can be discussed in 5-10 minutes

---

### 4. Generate Pronunciation Text

Generate a short text for pronunciation practice.

**Endpoint:** `GET /api/gemini/pronunciation/generate`

**Request:** No body required

**Response:**

```json
{
  "success": true,
  "data": "The thoughtful author thoroughly examined the statistical analysis before presenting the hypothesis to colleagues."
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "Failed to generate text"
}
```

**cURL Example:**

```bash
curl http://localhost:3000/api/gemini/pronunciation/generate
```

**JavaScript Example:**

```javascript
const response = await fetch('/api/gemini/pronunciation/generate');
const data = await response.json();
console.log(data.data);
```

**Text Characteristics:**
- 2-3 sentences long
- Includes commonly mispronounced words
- Mix of different sounds and phonemes
- Suitable for intermediate learners

---

### 5. Analyze Pronunciation

Analyze pronunciation from audio recording.

**Endpoint:** `POST /api/gemini/pronunciation/analyze`

**Request Body:**

```json
{
  "originalText": "The quick brown fox jumps over the lazy dog",
  "audioBase64": "base64_encoded_audio_data_here"
}
```

**Response:**

```json
{
  "success": true,
  "data": "**Pronunciation Analysis**\n\n1. **Overall Score: 85/100**\n\n2. **Mispronounced Words:**\n   - 'quick' - pronounced as 'kwick' instead of 'kwɪk'\n   - 'lazy' - stress on wrong syllable\n\n3. **Common Errors:**\n   - Vowel sounds need improvement\n   - Word stress patterns\n\n4. **Tips for Improvement:**\n   - Practice the 'qu' sound\n   - Focus on stress patterns\n   - Record yourself and compare\n\n5. **Encouragement:**\n   Great job overall! Keep practicing and you'll improve quickly!"
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "originalText and audioBase64 are required"
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3000/api/gemini/pronunciation/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "originalText": "Hello world",
    "audioBase64": "//uQx...[base64 audio data]"
  }'
```

**JavaScript Example (with File Upload):**

```javascript
// Convert audio file to base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
  });
}

// Usage
const audioFile = document.getElementById('audioInput').files[0];
const audioBase64 = await fileToBase64(audioFile);

const response = await fetch('/api/gemini/pronunciation/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    originalText: 'The quick brown fox',
    audioBase64: audioBase64
  })
});

const data = await response.json();
console.log(data.data);
```

**Supported Audio Formats:**
- MP3 (recommended)
- WAV
- M4A
- OGG

**Audio Requirements:**
- Max file size: 10MB
- Clear audio quality
- Minimal background noise

**Analysis Includes:**
- Overall pronunciation score (0-100)
- List of mispronounced words
- Common pronunciation errors
- Improvement tips
- Encouraging feedback

---

### 6. Analyze Grammar

Analyze grammar and provide feedback.

**Endpoint:** `POST /api/gemini/grammar`

**Request Body:**

```json
{
  "userMessage": "I goes to school everyday and learning English",
  "context": "Student is practicing present tense" // Optional
}
```

**Response:**

```json
{
  "success": true,
  "data": "**Grammar Analysis**\n\n1. **Grammar Score: 65/100**\n\n2. **Errors & Corrections:**\n   - 'I goes' → 'I go' (subject-verb agreement)\n   - 'everyday' → 'every day' (two separate words)\n   - 'learning' → 'learn' or 'am learning' (tense consistency)\n\n3. **Sentence Structure:**\n   Better: 'I go to school every day and learn English.'\n   Or: 'I go to school every day and I am learning English.'\n\n4. **Vocabulary Feedback:**\n   Good use of basic vocabulary. Consider using 'attend school' for variety.\n\n5. **Encouragement:**\n   You're on the right track! Keep practicing verb conjugations."
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "userMessage is required"
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3000/api/gemini/grammar \
  -H "Content-Type: application/json" \
  -d '{
    "userMessage": "She don'\''t likes pizza",
    "context": "Practicing negative sentences"
  }'
```

**JavaScript Example:**

```javascript
const response = await fetch('/api/gemini/grammar', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userMessage: 'He have been studying since 3 hours',
    context: 'Present perfect continuous practice'
  })
});

const data = await response.json();
console.log(data.data);
```

**Analysis Includes:**
1. Grammar score (0-100)
2. Grammatical errors with corrections
3. Sentence structure suggestions
4. Vocabulary usage feedback
5. Encouraging message

**Context Parameter:**
- Optional field
- Helps AI provide more targeted feedback
- Example contexts:
  - "Writing an email"
  - "Practicing past tense"
  - "Debate preparation"
  - "Academic writing"

---

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**Common HTTP Status Codes:**

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 400 | Bad Request (invalid parameters) |
| 500 | Internal Server Error |

**Error Examples:**

```javascript
try {
  const response = await fetch('/api/gemini/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Hello' })
  });
  
  const data = await response.json();
  
  if (!data.success) {
    console.error('Error:', data.error);
    // Handle error appropriately
  } else {
    console.log('Success:', data.data);
  }
} catch (error) {
  console.error('Network error:', error);
}
```

---

## Rate Limits

- No rate limits currently implemented
- Recommended: Implement rate limiting in production
- Consider using libraries like `express-rate-limit`

**Example Rate Limit Implementation:**

```javascript
// middleware/rate-limit.ts
import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});
```

---

## Examples

### Complete React Component Example

```typescript
'use client';

import { useState } from 'react';

export default function EnglishLearningDemo() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  // Example 1: Generate Text
  const handleGenerateText = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gemini/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: 'Write a motivational quote about learning'
        })
      });
      const data = await response.json();
      setResult(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Example 2: Chat
  const [chatHistory, setChatHistory] = useState([]);
  const handleChat = async (message: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: chatHistory,
          message: message
        })
      });
      const data = await response.json();
      
      setChatHistory([
        ...chatHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: data.data }
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Example 3: Generate Debate Topic
  const handleDebateTopic = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gemini/debate-topic');
      const data = await response.json();
      setResult(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Example 4: Generate Pronunciation Text
  const handlePronunciationText = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gemini/pronunciation/generate');
      const data = await response.json();
      setResult(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Example 5: Analyze Pronunciation
  const handleAnalyzePronunciation = async (file: File) => {
    setLoading(true);
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        
        const response = await fetch('/api/gemini/pronunciation/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            originalText: 'The quick brown fox jumps over the lazy dog',
            audioBase64: base64
          })
        });
        const data = await response.json();
        setResult(data.data);
      };
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Example 6: Analyze Grammar
  const handleAnalyzeGrammar = async (text: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/gemini/grammar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: text,
          context: 'General grammar practice'
        })
      });
      const data = await response.json();
      setResult(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">English Learning API Demo</h1>
      
      {loading && <div className="mb-4 text-blue-600">Loading...</div>}
      
      <div className="space-y-4 mb-8">
        <button 
          onClick={handleGenerateText}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generate Text
        </button>
        
        <button 
          onClick={handleDebateTopic}
          className="bg-green-500 text-white px-4 py-2 rounded ml-2"
        >
          Get Debate Topic
        </button>
        
        <button 
          onClick={handlePronunciationText}
          className="bg-purple-500 text-white px-4 py-2 rounded ml-2"
        >
          Get Pronunciation Text
        </button>
      </div>

      {result && (
        <div className="bg-gray-100 p-4 rounded mt-4">
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}
```

---

## Best Practices

1. **Error Handling:** Always wrap API calls in try-catch blocks
2. **Loading States:** Show loading indicators during API calls
3. **Input Validation:** Validate user input before sending to API
4. **Rate Limiting:** Implement rate limiting in production
5. **Caching:** Consider caching responses for repeated queries
6. **User Feedback:** Provide clear feedback on success/error states
7. **Audio Quality:** Ensure good audio quality for pronunciation analysis
8. **Context:** Provide context when using chat or grammar analysis for better results

---

## Support

For issues or questions:
- GitHub Issues: [your-repo/issues](https://github.com/your-repo/issues)
- Email: support@yourdomain.com
- Documentation: [Full API Docs](https://docs.yourdomain.com)

---

## License

MIT License - see LICENSE file for details

---

**Last Updated:** November 2024  
**Version:** 1.0.0  
**Powered by:** Google Gemini AI