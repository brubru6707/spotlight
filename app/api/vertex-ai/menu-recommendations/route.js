// app/api/vertex-ai/menu-recommendations/route.js
import { NextResponse } from 'next/server';
import { vertexAIService } from '../../../../lib/vertexai';

export async function POST(request) {
  try {
    const { customerPreferences, dietaryRestrictions } = await request.json();

    if (!customerPreferences) {
      return NextResponse.json(
        { error: 'Customer preferences are required' },
        { status: 400 }
      );
    }

    const recommendations = await vertexAIService.generateMenuRecommendations(
      customerPreferences,
      dietaryRestrictions || []
    );

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error('Error in menu recommendations API:', error);
    return NextResponse.json(
      { error: 'Failed to generate menu recommendations' },
      { status: 500 }
    );
  }
}