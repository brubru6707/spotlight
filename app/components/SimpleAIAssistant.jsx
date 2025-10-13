'use client';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  SparklesIcon,
  PaperAirplaneIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { TextShimmer } from '../../components/ui/text-shimmer';

const SimpleAIAssistant = () => {
  const { isDarkMode } = useTheme();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      // Call the OpenAI API through our Next.js API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      
      // Add assistant response
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Error calling AI:', error);
      
      // Add error message
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Sorry, I encountered an error: ${error.message}. Please try again.`
      }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      { role: 'assistant', content: 'Hello! I\'m your AI assistant. How can I help you today?' }
    ]);
  };

  return (
    <div className={`h-full flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl shadow-lg`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${
        isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
      } rounded-t-xl`}>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
            <SparklesIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              AI Assistant
            </h2>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Always here to help
            </p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className={`p-2 rounded-lg transition-colors ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
              : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
          }`}
          title="Clear chat"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : isDarkMode
                  ? 'bg-gray-800 text-gray-100 border border-gray-700'
                  : 'bg-gray-100 text-gray-900 border border-gray-200'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className={`rounded-2xl px-4 py-3 ${
              isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-200'
            }`}>
              <TextShimmer 
                className={`text-sm font-medium ${
                  isDarkMode 
                    ? '[--base-color:theme(colors.purple.400)] [--base-gradient-color:theme(colors.blue.300)]' 
                    : '[--base-color:theme(colors.purple.600)] [--base-gradient-color:theme(colors.blue.500)]'
                }`}
                duration={1.5}
              >
                Generating response...
              </TextShimmer>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className={`p-4 border-t ${
        isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
      } rounded-b-xl`}>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className={`flex-1 px-4 py-3 rounded-xl border ${
              isDarkMode
                ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500'
            } focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all`}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className={`px-4 py-3 rounded-xl transition-all ${
              !input.trim() || loading
                ? isDarkMode
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:scale-105'
            }`}
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </form>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-3">
          {[
            'Show sales summary',
            'Analyze trends',
            'Customer insights',
            'Performance tips'
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInput(suggestion)}
              className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleAIAssistant;
