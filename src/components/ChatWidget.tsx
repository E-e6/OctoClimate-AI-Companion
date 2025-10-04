import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, Send, X, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'motion/react';

export function ChatWidget() {
  const { state, dispatch } = useApp();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickStartQuestions = [
    "I can't use public transport, what alternatives do you suggest?",
    "What are some budget-friendly ways to reduce my carbon footprint?",
    "I live in an apartment. How can I save energy?",
    "What's the easiest way to start eating more sustainably?",
    "How can I reduce waste when I have limited recycling options?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.chatMessages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: message.trim(),
      timestamp: new Date(),
    };

    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: userMessage });
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response based on user profile and message
    setTimeout(() => {
      const aiResponse = generateAIResponse(message, state.user);
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: aiResponse,
        timestamp: new Date(),
      };

      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: assistantMessage });
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string, userProfile: any) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('transport') || message.includes('car') || message.includes('public')) {
      return "🚗 I understand transportation can be challenging! Based on your profile, here are some alternatives:\n\n• Try carpooling apps like BlaBlaCar or local Facebook groups\n• Consider bike-sharing services for short trips\n• Work from home 1-2 days per week if possible\n• Combine errands into one trip to reduce overall driving\n\nEach of these could save you 1-3kg CO₂ per week. Would you like specific apps or services in your area?";
    }
    
    if (message.includes('budget') || message.includes('money') || message.includes('cheap')) {
      return "💰 Great question! Here are free and low-cost climate actions:\n\n• Walk/bike instead of driving (saves money + 2kg CO₂/week)\n• Unplug devices when not in use (saves $50/year + 0.8kg CO₂/week)\n• Take shorter showers (saves $30/month + 1.2kg CO₂/week)\n• Use cold water for laundry (saves $25/year + 2.3kg CO₂/week)\n• Air-dry clothes instead of dryer\n\nThese changes cost nothing but can save you $100+ per year! Which would you like to try first?";
    }
    
    if (message.includes('apartment') || message.includes('rental') || message.includes('energy')) {
      return "🏠 Living in an apartment? No problem! Here's what you can control:\n\n• Switch to LED bulbs (landlord usually allows this)\n• Use smart power strips to eliminate phantom loads\n• Optimize heating/cooling: 68°F winter, 78°F summer\n• Use natural light during the day\n• Seal air leaks with removable weatherstripping\n\nYou could save 3-5kg CO₂ per week with these changes. Want specific product recommendations?";
    }
    
    if (message.includes('food') || message.includes('diet') || message.includes('eating')) {
      return "🌱 Sustainable eating doesn't have to be all-or-nothing! Try these approaches:\n\n• Start with 'Meatless Monday' (saves 1.5kg CO₂/week)\n• Choose chicken/fish over beef when eating meat\n• Buy seasonal, local produce when possible\n• Reduce food waste by meal planning\n• Try plant-based alternatives for familiar dishes\n\nEven small changes make a big difference. Which approach feels most doable for you?";
    }
    
    if (message.includes('waste') || message.includes('recycling') || message.includes('plastic')) {
      return "♻️ Waste reduction is impactful even with limited recycling! Here's how:\n\n• Focus on refusing/reducing before recycling\n• Bring reusable bags, water bottles, coffee cups\n• Buy in bulk to reduce packaging\n• Compost food scraps (even in small containers)\n• Choose products with minimal packaging\n\nThese prevent waste from being created in the first place. Would you like tips for starting a small compost system?";
    }
    
    // Default response
    return `🤖 Thanks for your question! Based on your current footprint of ${state.user?.currentFootprint || 45.2}kg CO₂/week, I'd recommend focusing on your highest-impact areas.\n\nFrom your profile, I can see opportunities in:\n• Transportation (typically 25% of footprint)\n• Energy use (20% of footprint)\n• Diet choices (18% of footprint)\n\nWould you like specific suggestions for any of these areas? I can provide personalized recommendations based on your lifestyle!`;
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!state.chatOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => dispatch({ type: 'SET_CHAT_OPEN', payload: true })}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow z-50"
          >
            <MessageCircle className="w-6 h-6 text-white" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {state.chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-96 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-cyan-500 to-teal-600 text-white rounded-t-2xl">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-medium">Climate AI Assistant</h3>
                  <p className="text-xs opacity-90">Here to help you reduce your footprint</p>
                </div>
              </div>
              <button
                onClick={() => dispatch({ type: 'SET_CHAT_OPEN', payload: false })}
                className="text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {state.chatMessages.length === 0 ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700 mb-3">
                      👋 Hi! I'm your AI climate companion. I know about your lifestyle and can provide personalized advice. Try asking:
                    </p>
                    <div className="space-y-2">
                      {quickStartQuestions.slice(0, 3).map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickQuestion(question)}
                          className="block w-full text-left p-2 text-xs bg-white/80 hover:bg-white rounded border border-gray-200 hover:border-cyan-300 transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                state.chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-cyan-500 to-teal-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))
              )}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about climate actions..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  size="sm"
                  className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}