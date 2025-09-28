'use client';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  BeakerIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const AIAssistantContent = () => {
  const { isDarkMode } = useTheme();
  const [activeFeature, setActiveFeature] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const aiFeatures = [
    {
      id: 'menu-recommendations',
      title: 'Menu Recommendations',
      description: 'AI-powered personalized menu suggestions for customers',
      icon: <ClipboardDocumentListIcon className="h-6 w-6" />,
      color: 'bg-blue-500'
    },
    {
      id: 'feedback-analysis',
      title: 'Feedback Analysis',
      description: 'Analyze customer feedback for sentiment and insights',
      icon: <ChartBarIcon className="h-6 w-6" />,
      color: 'bg-green-500'
    },
    {
      id: 'chat-assistant',
      title: 'AI Chat Assistant',
      description: 'Get instant help with restaurant operations',
      icon: <ChatBubbleLeftRightIcon className="h-6 w-6" />,
      color: 'bg-purple-500'
    },
    {
      id: 'operational-insights',
      title: 'Operational Insights',
      description: 'AI-driven analysis of your restaurant data',
      icon: <BeakerIcon className="h-6 w-6" />,
      color: 'bg-orange-500'
    }
  ];

  const handleFeatureClick = (feature) => {
    setActiveFeature(feature);
    setResults(null);
  };

  const closeModal = () => {
    setActiveFeature(null);
    setResults(null);
  };

  const MenuRecommendationForm = () => {
    const [preferences, setPreferences] = useState('');
    const [restrictions, setRestrictions] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      
      try {
        const response = await fetch('/api/vertex-ai/menu-recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerPreferences: preferences,
            dietaryRestrictions: restrictions.split(',').map(r => r.trim()).filter(r => r)
          })
        });
        
        const data = await response.json();
        setResults(data.recommendations);
      } catch (error) {
        console.error('Error:', error);
        setResults({ error: 'Failed to generate recommendations' });
      } finally {
        setLoading(false);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Customer Preferences
          </label>
          <textarea
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            className={`w-full p-3 rounded-lg border ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            rows="3"
            placeholder="e.g., likes spicy food, vegetarian, prefers Italian cuisine..."
            required
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Dietary Restrictions (comma-separated)
          </label>
          <input
            type="text"
            value={restrictions}
            onChange={(e) => setRestrictions(e.target.value)}
            className={`w-full p-3 rounded-lg border ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            placeholder="e.g., gluten-free, nut allergy, dairy-free..."
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Recommendations'}
        </button>
      </form>
    );
  };

  const FeedbackAnalysisForm = () => {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      
      try {
        const response = await fetch('/api/vertex-ai/feedback-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ feedback })
        });
        
        const data = await response.json();
        setResults(data.analysis);
      } catch (error) {
        console.error('Error:', error);
        setResults({ error: 'Failed to analyze feedback' });
      } finally {
        setLoading(false);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Customer Feedback
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className={`w-full p-3 rounded-lg border ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            rows="4"
            placeholder="Paste customer feedback or review here..."
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Feedback'}
        </button>
      </form>
    );
  };

  const ChatAssistantForm = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!message.trim()) return;

      const userMessage = { type: 'user', content: message };
      setChatHistory(prev => [...prev, userMessage]);
      setLoading(true);
      
      try {
        const response = await fetch('/api/vertex-ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            message,
            context: { restaurantType: 'general', role: 'manager' }
          })
        });
        
        const data = await response.json();
        const aiMessage = { type: 'ai', content: data.response };
        setChatHistory(prev => [...prev, aiMessage]);
        setMessage('');
      } catch (error) {
        console.error('Error:', error);
        const errorMessage = { type: 'ai', content: 'Sorry, I encountered an error. Please try again.' };
        setChatHistory(prev => [...prev, errorMessage]);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="space-y-4">
        <div className={`h-64 overflow-y-auto p-4 rounded-lg border ${
          isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
        }`}>
          {chatHistory.length === 0 ? (
            <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Start a conversation with the AI assistant...
            </p>
          ) : (
            <div className="space-y-3">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-3 rounded-lg max-w-xs ${
                    msg.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : isDarkMode
                        ? 'bg-gray-600 text-gray-100'
                        : 'bg-white text-gray-900 border'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`flex-1 p-3 rounded-lg border ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            placeholder="Ask about menu optimization, customer service, operations..."
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    );
  };

  const renderResults = () => {
    if (!results) return null;

    if (results.error) {
      return (
        <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-700">{results.error}</p>
        </div>
      );
    }

    if (activeFeature?.id === 'menu-recommendations' && Array.isArray(results)) {
      return (
        <div className="mt-6 space-y-4">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Recommended Dishes
          </h3>
          {results.map((item, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {item.name}
              </h4>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {item.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {item.prep_time}
                </span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                  {item.price_category}
                </span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeFeature?.id === 'feedback-analysis') {
      return (
        <div className="mt-6 space-y-4">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Analysis Results
          </h3>
          <div className={`p-4 rounded-lg border ${
            isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Sentiment Score</p>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {results.sentiment_score}/10
                </p>
              </div>
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Category</p>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {results.category}
                </p>
              </div>
            </div>
            {results.actionable_insights && (
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Key Insights:
                </p>
                <p className={`mt-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {results.actionable_insights}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="mt-8">
      <div className="flex items-center space-x-3 mb-6">
        <SparklesIcon className={`h-8 w-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          AI-Powered Features
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {aiFeatures.map((feature) => (
          <div
            key={feature.id}
            onClick={() => handleFeatureClick(feature)}
            className={`p-6 rounded-2xl shadow-sm cursor-pointer transition-transform hover:scale-105 ${
              isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center text-white mb-4`}>
              {feature.icon}
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {feature.title}
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Modal for AI Features */}
      {activeFeature && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl ${activeFeature.color} flex items-center justify-center text-white`}>
                    {activeFeature.icon}
                  </div>
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {activeFeature.title}
                  </h3>
                </div>
                <button
                  onClick={closeModal}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <XMarkIcon className={`h-6 w-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </div>

              {activeFeature.id === 'menu-recommendations' && <MenuRecommendationForm />}
              {activeFeature.id === 'feedback-analysis' && <FeedbackAnalysisForm />}
              {activeFeature.id === 'chat-assistant' && <ChatAssistantForm />}
              
              {renderResults()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistantContent;