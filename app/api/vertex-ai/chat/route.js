// app/api/vertex-ai/chat/route.js
import { NextResponse } from 'next/server';
import { vertexAIService } from '../../../../lib/vertexai';
import { withRateLimit, validateInput } from '../../../../middleware/rateLimit';

const inputSchema = {
  message: {
    required: true,
    minLength: 1,
    maxLength: 1000
  }
};

const handler = async (request) => {
  try {
    const { message, context } = await request.json();

    const response = await vertexAIService.chatWithAssistant(message, context || {});

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error in AI chat API:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    );
  }
};

export const POST = withRateLimit(validateInput(inputSchema)(handler));