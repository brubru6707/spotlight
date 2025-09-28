# Vertex AI Integration Setup Guide

## 📋 Prerequisites

1. **Google Cloud Project** with Vertex AI API enabled
2. **Service Account** with appropriate permissions
3. **Firebase Project** (already configured)

## 🚀 Setup Steps

### 1. Google Cloud Setup

1. **Create or select a Google Cloud Project**
   ```bash
   gcloud projects create your-project-id
   gcloud config set project your-project-id
   ```

2. **Enable Vertex AI API**
   ```bash
   gcloud services enable aiplatform.googleapis.com
   ```

3. **Create Service Account**
   ```bash
   gcloud iam service-accounts create vertex-ai-service \
     --description="Service account for Vertex AI" \
     --display-name="Vertex AI Service Account"
   ```

4. **Grant Permissions**
   ```bash
   gcloud projects add-iam-policy-binding your-project-id \
     --member="serviceAccount:vertex-ai-service@your-project-id.iam.gserviceaccount.com" \
     --role="roles/aiplatform.user"
   ```

5. **Create and Download Service Account Key**
   ```bash
   gcloud iam service-accounts keys create vertex-ai-key.json \
     --iam-account=vertex-ai-service@your-project-id.iam.gserviceaccount.com
   ```

### 2. Environment Configuration

1. **Copy the example environment file**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Update .env.local with your values**
   ```env
   GOOGLE_CLOUD_PROJECT_ID=your-actual-project-id
   GOOGLE_CLOUD_LOCATION=us-central1
   GOOGLE_APPLICATION_CREDENTIALS=./vertex-ai-key.json
   ```

### 3. Security Setup

1. **Add to .gitignore**
   ```
   .env.local
   vertex-ai-key.json
   ```

2. **For production deployment, use environment variables instead of key files**

## 🎯 Available AI Features

### 1. **Menu Recommendations**
- Personalized dish suggestions based on customer preferences
- Dietary restriction handling
- Price category recommendations

### 2. **Feedback Analysis**
- Sentiment analysis of customer reviews
- Key theme extraction
- Actionable insights generation
- Priority level assessment

### 3. **AI Chat Assistant**
- Real-time restaurant operation support
- Menu optimization advice
- Customer service guidance
- Business strategy recommendations

### 4. **Operational Insights**
- Sales data analysis
- Inventory optimization suggestions
- Staff performance insights
- Cost reduction opportunities

## 🔧 API Endpoints

All AI features are accessible through these API routes:

- `POST /api/vertex-ai/menu-recommendations`
- `POST /api/vertex-ai/feedback-analysis`
- `POST /api/vertex-ai/chat`
- `POST /api/vertex-ai/operational-insights`

## 📱 Using the AI Features

1. **Navigate to Dashboard**
2. **Click the AI Assistant tab** (✨ icon)
3. **Select desired AI feature**
4. **Fill in the required information**
5. **Get AI-powered insights**

## 🛠 Customization Options

### Modify AI Prompts
Edit `/lib/vertexai.js` to customize AI behavior:
```javascript
const prompt = `Your customized prompt here...`;
```

### Add New AI Features
1. Create new function in `vertexAIService`
2. Add corresponding API route
3. Update UI components

### Adjust Model Parameters
```javascript
generationConfig: {
  'maxOutputTokens': 8192,  // Adjust output length
  'temperature': 1,         // Creativity level (0-2)
  'topP': 0.95,            // Diversity threshold
}
```

## 🚨 Security Best Practices

1. **Never commit service account keys to version control**
2. **Use IAM roles with minimal required permissions**
3. **Rotate service account keys regularly**
4. **Implement rate limiting for API endpoints**
5. **Validate and sanitize all user inputs**

## 🔍 Troubleshooting

### Common Issues

1. **Authentication Error**
   - Check service account key path
   - Verify project ID matches
   - Ensure Vertex AI API is enabled

2. **Permission Denied**
   - Verify IAM roles are correctly assigned
   - Check service account has aiplatform.user role

3. **API Quota Exceeded**
   - Monitor usage in Google Cloud Console
   - Consider implementing request caching
   - Upgrade quota limits if needed

### Debug Mode
Enable detailed logging by setting:
```env
NODE_ENV=development
```

## 📊 Monitoring and Analytics

- **Google Cloud Console**: Monitor API usage and costs
- **Firebase Analytics**: Track feature usage
- **Custom Logging**: Implement application-specific metrics

## 💰 Cost Optimization

1. **Use appropriate model sizes**
2. **Implement response caching**
3. **Set usage quotas and alerts**
4. **Monitor token usage patterns**

## 🔄 Deployment

### Development
```bash
npm run dev
```

### Production
1. Set environment variables in hosting platform
2. Upload service account key securely
3. Deploy application
```bash
npm run build
npm start
```

## 📞 Support

For issues specific to:
- **Vertex AI**: Check Google Cloud documentation
- **Firebase**: Firebase support channels
- **Application**: Review logs and error messages

## 🎉 Features Completed

✅ Vertex AI Integration
✅ Menu Recommendations
✅ Feedback Analysis  
✅ AI Chat Assistant
✅ Operational Insights
✅ Dark Mode Support
✅ Mobile Responsive Design
✅ Secure API Implementation