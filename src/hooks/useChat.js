import { useState, useCallback, useRef, useEffect } from 'react';
import { DEMO_USER, QUICK_REPLIES } from '../utils/constants';

export const useChat = () => {
  const [messages, setMessages] = useState([{
    id: 1,
    type: 'bot',
    text: `🎉 **Welcome to SecureBank AI Assistant Demo!**

I'm an advanced AI banking assistant powered by:
- **OpenAI GPT-4** for intelligent conversation
- **Anthropic Claude** for enhanced reasoning  
- **Voice Recognition** with OpenAI Whisper
- **Real-time Analytics** and insights

🎮 **Try these demo features:**`,
    timestamp: new Date(),
    quickReplies: QUICK_REPLIES.INITIAL
  }]);

  const [isTyping, setIsTyping] = useState(false);
  const [authStep, setAuthStep] = useState('initial');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userSession, setUserSession] = useState(DEMO_USER);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const addMessage = useCallback((type, text, quickReplies = [], data = null) => {
    const newMessage = {
      id: Date.now(),
      type,
      text,
      timestamp: new Date(),
      quickReplies,
      data
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  return {
    messages,
    isTyping,
    setIsTyping,
    authStep,
    setAuthStep,
    isAuthenticated,
    setIsAuthenticated,
    userSession,
    setUserSession,
    messagesEndRef,
    addMessage
  };
};