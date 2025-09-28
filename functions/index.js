const functions = require('firebase-functions');
const { VertexAI } = require('@google-cloud/vertexai');

// Initialize Vertex AI
const vertexAI = new VertexAI({
  project: process.env.GCLOUD_PROJECT, // Firebase automatically sets this
  location: 'us-central1' // Choose a region where Vertex AI is available
});

// The model you want to use
const generativeModel = vertexAI.getGenerativeModel({
  model: 'gemini-1.5-pro' 
});

// An onCall Cloud Function that your Next.js app can securely invoke
exports.getAIResponse = functions.https.onCall(async (data, context) => {
  // Check for authentication if needed
  // if (!context.auth) {
  //   throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  // }

  const { prompt } = data;

  try {
    const response = await generativeModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    const textResponse = response.response.candidates[0].content.parts[0].text;
    return { text: textResponse };
  } catch (error) {
    console.error('Error calling Vertex AI:', error);
    throw new functions.https.HttpsError('internal', 'Failed to get a response from the AI assistant.');
  }
});