import React, { useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import InputArea from './InputArea';
import { MESSAGE_TYPES } from '../../utils/constants';

const ChatWindow = () => {
  const { messages, isTyping, addMessage } = useChat();
  const { isAuthenticated } = useAuth();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Add initial welcome message
    if (messages.length === 0) {
      addMessage(MESSAGE_TYPES.BOT, 
        "Hello! I'm your AI-powered banking assistant with advanced natural language understanding. I can help you with account inquiries, transactions, financial advice, and more. What can I help you with today?",
        {
          quickReplies: [
            "What's my balance?",
            "Show recent spending", 
            "I need to transfer money",
            "Find ATM near me",
            "My card isn't working"
          ],
          aiProcessing: {
            intent: 'greeting',
            entities: [],
            sentiment: 'neutral',
            confidence: 1.0
          }
        }
      );
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <InputArea />
    </div>
  );
};

export default ChatWindow;