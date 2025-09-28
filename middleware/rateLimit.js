// middleware/rateLimit.js
import { NextResponse } from 'next/server';

const requestCounts = new Map();
const RATE_LIMIT = 10; // requests per minute
const WINDOW_MS = 60 * 1000; // 1 minute

export function withRateLimit(handler) {
  return async (request) => {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowStart = now - WINDOW_MS;

    // Clean old entries
    for (const [key, timestamps] of requestCounts.entries()) {
      const validTimestamps = timestamps.filter(t => t > windowStart);
      if (validTimestamps.length === 0) {
        requestCounts.delete(key);
      } else {
        requestCounts.set(key, validTimestamps);
      }
    }

    // Check current IP
    const userRequests = requestCounts.get(ip) || [];
    const recentRequests = userRequests.filter(t => t > windowStart);

    if (recentRequests.length >= RATE_LIMIT) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // Add current request
    recentRequests.push(now);
    requestCounts.set(ip, recentRequests);

    return handler(request);
  };
}

export function validateInput(schema) {
  return (handler) => {
    return async (request) => {
      try {
        const body = await request.json();
        
        // Basic validation example
        for (const [key, rules] of Object.entries(schema)) {
          const value = body[key];
          
          if (rules.required && (!value || value.toString().trim() === '')) {
            return NextResponse.json(
              { error: `${key} is required` },
              { status: 400 }
            );
          }
          
          if (rules.maxLength && value && value.length > rules.maxLength) {
            return NextResponse.json(
              { error: `${key} exceeds maximum length of ${rules.maxLength}` },
              { status: 400 }
            );
          }
          
          if (rules.minLength && value && value.length < rules.minLength) {
            return NextResponse.json(
              { error: `${key} must be at least ${rules.minLength} characters` },
              { status: 400 }
            );
          }
        }
        
        return handler(request);
      } catch (error) {
        return NextResponse.json(
          { error: 'Invalid JSON in request body' },
          { status: 400 }
        );
      }
    };
  };
}