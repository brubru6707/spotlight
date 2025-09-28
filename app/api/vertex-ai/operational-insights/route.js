// app/api/vertex-ai/operational-insights/route.js
import { NextResponse } from 'next/server';
import { vertexAIService } from '../../../../lib/vertexai';

export async function POST(request) {
  try {
    const { salesData, inventoryData, staffData } = await request.json();

    if (!salesData && !inventoryData && !staffData) {
      return NextResponse.json(
        { error: 'At least one data type (sales, inventory, or staff) is required' },
        { status: 400 }
      );
    }

    const insights = await vertexAIService.generateOperationalInsights(
      salesData || {},
      inventoryData || {},
      staffData || {}
    );

    return NextResponse.json({ insights });
  } catch (error) {
    console.error('Error in operational insights API:', error);
    return NextResponse.json(
      { error: 'Failed to generate operational insights' },
      { status: 500 }
    );
  }
}