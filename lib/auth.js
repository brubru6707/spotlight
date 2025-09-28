// lib/auth.js - Authentication utilities for Vertex AI
import { GoogleAuth } from 'google-auth-library';

export class VertexAIAuth {
  constructor() {
    this.auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    });
  }

  async getAccessToken() {
    try {
      const client = await this.auth.getClient();
      const accessToken = await client.getAccessToken();
      return accessToken.token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }

  async validateRequest(req) {
    // Add your authentication validation logic here
    // For example, verify Firebase auth token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Unauthorized: Missing or invalid authorization header');
    }
    
    // Verify the token with Firebase Admin SDK
    // Implementation depends on your auth strategy
    return true;
  }
}

export const vertexAIAuth = new VertexAIAuth();