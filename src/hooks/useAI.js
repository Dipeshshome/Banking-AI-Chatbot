import { useState, useCallback } from 'react';
import { generateAIResponse } from '../utils/chatHelpers';

export const useAI = () => {
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiProvider, setAiProvider] = useState('ensemble');

  const simulateAIProcessing = useCallback(async (message) => {
    setAiProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    setAiProcessing(false);
    
    return generateAIResponse(
      'balance_inquiry',
      0.94,
      aiProvider
    );
  }, [aiProvider]);

  const processIntent = useCallback((input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('balance') || lowerInput.includes('account')) {
      return { intent: 'balance_inquiry', confidence: 0.95 };
    } else if (lowerInput.includes('transfer') || lowerInput.includes('send')) {
      return { intent: 'money_transfer', confidence: 0.92 };
    } else if (lowerInput.includes('investment') || lowerInput.includes('invest')) {
      return { intent: 'investment_advice', confidence: 0.89 };
    } else if (lowerInput.includes('credit') || lowerInput.includes('score')) {
      return { intent: 'credit_inquiry', confidence: 0.87 };
    } else if (lowerInput.includes('loan') || lowerInput.includes('mortgage')) {
      return { intent: 'loan_inquiry', confidence: 0.84 };
    }
    
    return { intent: 'general_inquiry', confidence: 0.75 };
  }, []);

  return {
    aiProcessing,
    setAiProcessing,
    aiProvider,
    setAiProvider,
    simulateAIProcessing,
    processIntent
  };
};