// app/api/vertex-ai/feedback-analysis/route.js
import { NextResponse } from 'next/server';
import { vertexAIService } from '../../../../lib/vertexai';

export async function POST(request) {
  try {
    const { feedback } = await request.json();

    if (!feedback) {
      return NextResponse.json(
        { error: 'Feedback text is required' },
        { status: 400 }
      );
    }

    const analysis = await vertexAIService.analyzeCustomerFeedback(feedback);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Error in feedback analysis API:', error);
    return NextResponse.json(
      { error: 'Failed to analyze customer feedback' },
      { status: 500 }
    );
  }
}