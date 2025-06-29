import React, { useState, useRef } from 'react';
import { Send, Brain, Zap } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useAI } from '../../context/AIContext';
import { useAuth } from '../../context/AuthContext';
import { MESSAGE_TYPES } from '../../utils/constants';

const InputArea = () => {
  const [inputText, setInputText] = useState('');
  const { addMessage, setTyping, setAiProcessing, updateContext, conversationContext } = useChat();
  const { processMessage } = useAI();
  const { user, isAuthenticated, login } = useAuth();
  const inputRef = useRef(null);

  const authenticateUser = async (input) => {
    const credentials = { username: input.toLowerCase(), password: 'password' };
    const result = await login(credentials);
    return result.success;
  };

  const processUserMessage = async (input) => {
    // Authentication check for sensitive operations
    if (!isAuthenticated && (
      input.toLowerCase().includes('balance') || 
      input.toLowerCase().includes('transaction') || 
      input.toLowerCase().includes('transfer') ||
      input.toLowerCase().includes('account')
    )) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        addMessage(MESSAGE_TYPES.BOT, 
          "For your security, I need to verify your identity first. Please provide your username or account number (Demo: type 'john' or '1234')",
          {
            quickReplies: ['Authenticate with username', 'Use account number', 'Biometric login']
          }
        );
      }, 1000);
      return;
    }

    // Handle authentication
    if (!isAuthenticated) {
      const authenticated = await authenticateUser(input);
      if (authenticated) {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          addMessage(MESSAGE_TYPES.BOT, 
            `Welcome back, ${user?.username || 'valued customer'}! I've authenticated you securely. My AI has analyzed your account and I'm ready to provide personalized assistance.`,
            {
              quickReplies: ["What's my balance?", "Recent spending analysis", "Transfer money", "Financial advice"]
            }
          );
        }, 1000);
        return;
      }
    }

    // Process with AI
    setAiProcessing(true);
    const aiResult = await processMessage(input, conversationContext);
    setAiProcessing(false);
    
    updateContext(aiResult.context);
    
    // Generate response based on AI analysis
    const response = generateAIResponse(aiResult);
    
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      addMessage(MESSAGE_TYPES.BOT, 
        response.text,
        {
          quickReplies: response.quickReplies || [],
          data: response.data,
          aiProcessing: {
            intent: aiResult.intent.name,
            confidence: aiResult.intent.confidence,
            entities: aiResult.entities,
            sentiment: aiResult.sentiment,
            processingTime: aiResult.processingTime
          }
        }
      );
    }, 1200);
  };

  const generateAIResponse = (aiResult) => {
    const { intent, entities, sentiment } = aiResult;
    
    // This is a simplified version - in production, this would be more comprehensive
    switch (intent.name) {
      case 'balance_inquiry':
        const accountType = entities.accountType || 'checking';
        const balance = accountType === 'savings' ? user?.savingsBalance : user?.balance;
        return {
          text: `Your ${accountType} account balance is ${balance?.toLocaleString()}. ${
            sentiment === 'negative' ? 'I notice you seem concerned - is there anything specific about your balance I can help with?' : 
            'Is there anything else you\'d like to know about your accounts?'
          }`,
          quickReplies: ['Recent transactions', 'Transfer to savings', 'Account details', 'Spending analysis']
        };
      
      case 'financial_advice':
        return {
          text: 'Based on your spending patterns and account history, I can provide personalized financial recommendations. What aspect of your finances would you like to improve?',
          quickReplies: ['Reduce spending', 'Increase savings', 'Investment options', 'Budget planning']
        };
      
      default:
        return {
          text: 'I understand you\'re asking about that. Could you provide more details so I can assist you better?',
          quickReplies: ['Account services', 'Transaction help', 'Card services', 'Financial advice']
        };
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    addMessage(MESSAGE_TYPES.USER, inputText);
    processUserMessage(inputText);
    setInputText('');
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex space-x-2">
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about your banking needs..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputText.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg px-4 py-2 transition-colors flex items-center space-x-2"
        >
          <Send size={18} />
        </button>
      </div>
      
      <div className="mt-2 text-xs text-gray-500 text-center flex items-center justify-center space-x-1">
        <Brain size={12} />
        <span>Powered by AI • Natural language understanding • Secure banking</span>
      </div>
    </div>
  );
};

export default InputArea;