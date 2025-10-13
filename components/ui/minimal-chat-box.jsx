"use client"

import * as React from "react"
import { motion, MotionConfig } from "framer-motion"
import { Input } from "./input"
import { MessageSquare, X, Send } from "lucide-react"
import { TextShimmer } from "./text-shimmer"

const transition = {
  type: "spring",
  bounce: 0,
  duration: 0.3,
}

export default function MinimalChatBox() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [messages, setMessages] = React.useState([])
  const [input, setInput] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const handleSend = async () => {
    if (input.trim() && !loading) {
      const userMessage = input.trim()
      setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
      setInput("")
      setLoading(true)

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [...messages, { role: 'user', content: userMessage }]
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to get response')
        }

        const data = await response.json()
        setMessages((prev) => [...prev, { role: 'assistant', content: data.message }])
      } catch (error) {
        console.error('Error:', error)
        setMessages((prev) => [...prev, { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again.' 
        }])
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <MotionConfig transition={transition}>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          animate={{
            height: isOpen ? "500px" : "56px",
            width: isOpen ? "380px" : "56px",
          }}
          initial={false}
          className="flex flex-col shadow-lg overflow-hidden
                     bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className={`flex items-center bg-gradient-to-r from-purple-500 to-blue-500 ${
            isOpen ? 'justify-between px-4 py-3' : 'justify-center p-0'
          }`}>
            {isOpen && <span className="font-semibold text-white">AI Assistant</span>}
            <div
              className={`flex items-center justify-center cursor-pointer rounded-full transition-colors ${
                isOpen 
                  ? 'w-10 h-10 hover:bg-white/20' 
                  : 'w-14 h-14 hover:bg-white/10'
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} className="text-white" /> : <MessageSquare size={24} className="text-white" />}
            </div>
          </div>

          {/* Messages */}
          {isOpen && (
            <div className="flex-1 px-4 py-3 overflow-y-auto flex flex-col gap-3 bg-gray-50 dark:bg-gray-900">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <MessageSquare size={48} className="text-gray-300 mb-3" />
                  <span className="text-gray-500 text-sm font-medium">No messages yet</span>
                  <span className="text-gray-400 text-xs mt-1">Ask me anything!</span>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl text-sm max-w-[85%] ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-2xl">
                    <TextShimmer 
                      className="text-sm font-medium [--base-color:theme(colors.purple.600)] [--base-gradient-color:theme(colors.blue.500)] dark:[--base-color:theme(colors.purple.400)] dark:[--base-gradient-color:theme(colors.blue.300)]"
                      duration={1.5}
                    >
                      Generating response...
                    </TextShimmer>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Input */}
          {isOpen && (
            <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <Input
                className="flex-1 h-10 rounded-xl border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={loading}
              />
              <button
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSend}
                disabled={loading || !input.trim()}
              >
                <Send size={18} className="text-white" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </MotionConfig>
  )
}
