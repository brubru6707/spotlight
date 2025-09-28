// lib/vertexai.js
import { VertexAI } from '@google-cloud/vertexai';

// Initialize Vertex AI with your project and location
const vertex_ai = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT_ID,
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
});

// Initialize the model
const model = 'gemini-2.5-flash';

// Get the generative model
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    'maxOutputTokens': 8192,
    'temperature': 1,
    'topP': 0.95,
  },
  safetySettings: [
    {
      'category': 'HARM_CATEGORY_HATE_SPEECH',
      'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
      'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
      'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
      'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
      'category': 'HARM_CATEGORY_HARASSMENT',
      'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    }
  ],
});

// Helper function to parse AI response
const parseAIResponse = (text, expectJson = true) => {
  console.log('Raw AI response (parse ai resp):', text);
  
  if (!expectJson) {
    return text.trim();
  }
  
  let jsonText = text.trim();
  
  // Try to extract JSON if it's wrapped in markdown code blocks
  if (jsonText.includes('```')) {
    const match = jsonText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (match) {
      jsonText = match[1].trim();
      console.log('Extracted from markdown:', jsonText);
      return JSON.parse(jsonText);
    }
  }
  
  // If not in markdown blocks, try to find JSON boundaries
  // Prioritize arrays first, then objects
  const arrayStart = jsonText.indexOf('[');
  const objectStart = jsonText.indexOf('{');
  const arrayEnd = jsonText.lastIndexOf(']') + 1;
  const objectEnd = jsonText.lastIndexOf('}') + 1;
  
  let jsonStart, jsonEnd;
  
  if (arrayStart !== -1 && (objectStart === -1 || arrayStart < objectStart)) {
    // Array comes first or object not found
    jsonStart = arrayStart;
    jsonEnd = arrayEnd;
  } else if (objectStart !== -1) {
    // Object comes first
    jsonStart = objectStart;
    jsonEnd = objectEnd;
  } else {
    // No JSON found, return as is and let JSON.parse handle the error
    console.log('No JSON boundaries found, trying to parse as-is');
    return JSON.parse(jsonText);
  }
  
  if (jsonStart !== -1 && jsonEnd > jsonStart) {
    jsonText = jsonText.substring(jsonStart, jsonEnd);
  }
  
  console.log('Extracted JSON text:', jsonText);
  return JSON.parse(jsonText);
};

// Restaurant-specific AI functions
export const vertexAIService = {
  // Generate menu recommendations based on preferences
  async generateMenuRecommendations(customerPreferences, dietary_restrictions = []) {
    const prompt = `As a professional restaurant AI assistant, analyze the following customer preferences and dietary restrictions to recommend dishes:

Customer Preferences: ${customerPreferences}
Dietary Restrictions: ${dietary_restrictions.join(', ')}

IMPORTANT: You must respond with ONLY a valid JSON array. Do not include any explanatory text before or after the JSON.

Provide exactly 5 personalized menu recommendations in this exact JSON format:
[
  {
    "name": "Dish Name",
    "description": "Brief description of the dish",
    "match_reason": "Why this matches customer preferences",
    "prep_time": "X minutes",
    "price_category": "Budget|Mid-range|Premium",
  }
]

Return ONLY the JSON array, MAKE SURE IT IS VALID JSON, no other text.`;

    try {
      const result = await generativeModel.generateContent(prompt);
      const response = result.response;
      const text = response.candidates[0].content.parts[0].text;
      
      return parseAIResponse(text, true);
    } catch (error) {
      console.error('Error generating menu recommendations:', error);
      console.error('Raw response text (generate menu rec):', error.message);
      throw error;
    }
  },

  // Analyze customer feedback and sentiment
  async analyzeCustomerFeedback(feedback) {
    const prompt = `Analyze this restaurant customer feedback for sentiment, key themes, and actionable insights:

Feedback: "${feedback}"

Provide analysis in JSON format with:
1. sentiment_score (1-10, where 10 is most positive)
2. sentiment_label (Positive/Neutral/Negative)
3. key_themes (array of main topics mentioned)
4. actionable_insights (suggestions for improvement)
5. priority_level (Low/Medium/High)
6. category (Food/Service/Ambiance/Value/Other)`;

    try {
      const result = await generativeModel.generateContent(prompt);
      const response = result.response;
      const text = response.candidates[0].content.parts[0].text;
      return parseAIResponse(text, true);
    } catch (error) {
      console.error('Error analyzing customer feedback:', error);
      throw error;
    }
  },

  // Generate personalized marketing content
  async generateMarketingContent(campaign_type, target_audience, special_offers = []) {
    const prompt = `Create engaging marketing content for a restaurant:

Campaign Type: ${campaign_type}
Target Audience: ${target_audience}
Special Offers: ${special_offers.join(', ')}

Generate content in JSON format with:
1. headline (catchy main title)
2. description (compelling description, max 150 characters)
3. call_to_action (action-oriented button text)
4. email_subject (if email campaign)
5. social_media_caption (for social posts)
6. hashtags (relevant hashtags array)`;

    try {
      const result = await generativeModel.generateContent(prompt);
      const response = result.response;
      const text = response.candidates[0].content.parts[0].text;
      return parseAIResponse(text, true);
    } catch (error) {
      console.error('Error generating marketing content:', error);
      throw error;
    }
  },

  // Optimize menu pricing based on market analysis
  async optimizeMenuPricing(menu_items, competitor_data, cost_data) {
    const prompt = `As a restaurant pricing consultant, analyze and optimize menu pricing:

Current Menu Items: ${JSON.stringify(menu_items)}
Competitor Data: ${JSON.stringify(competitor_data)}
Cost Data: ${JSON.stringify(cost_data)}

Provide pricing optimization recommendations in JSON format:
1. item_name
2. current_price
3. recommended_price
4. price_change_percentage
5. reasoning
6. expected_impact_on_sales
7. profit_margin_change`;

    try {
      const result = await generativeModel.generateContent(prompt);
      const response = result.response;
      const text = response.candidates[0].content.parts[0].text;
      return parseAIResponse(text, true);
    } catch (error) {
      console.error('Error optimizing menu pricing:', error);
      throw error;
    }
  },

  // Generate operational insights from data
  async generateOperationalInsights(sales_data, inventory_data, staff_data) {
    const prompt = `Analyze restaurant operational data and provide strategic insights:

Sales Data: ${JSON.stringify(sales_data)}
Inventory Data: ${JSON.stringify(inventory_data)}
Staff Data: ${JSON.stringify(staff_data)}

Provide insights in JSON format:
1. key_findings (array of main discoveries)
2. efficiency_recommendations (operational improvements)
3. cost_optimization_opportunities
4. revenue_growth_suggestions
5. risk_alerts (potential issues to address)
6. performance_metrics (suggested KPIs to track)`;

    try {
      const result = await generativeModel.generateContent(prompt);
      const response = result.response;
      const text = response.candidates[0].content.parts[0].text;
      return parseAIResponse(text, true);
    } catch (error) {
      console.error('Error generating operational insights:', error);
      throw error;
    }
  },

  // Chat with AI assistant for general queries
  async chatWithAssistant(message, context = {}) {
    const prompt = `You are an AI assistant for a restaurant management platform called Spotlight. 
Context: ${JSON.stringify(context)}
User Message: ${message}

Provide a helpful, professional response related to restaurant operations, customer service, or business management.`;

    try {
      const result = await generativeModel.generateContent(prompt);
      const response = result.response;
      const text = response.candidates[0].content.parts[0].text;
      return parseAIResponse(text, false);
    } catch (error) {
      console.error('Error in AI chat:', error);
      throw error;
    }
  }
};

export default vertexAIService;