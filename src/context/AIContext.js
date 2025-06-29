import React, { createContext, useContext, useState } from 'react';
import { aiEngine } from '../services/aiEngine';

const AIContext = createContext();

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

export const AIProvider = ({ children }) => {
  const [aiMetrics, setAiMetrics] = useState({
    totalProcessed: 0,
    averageConfidence: 0,
    successRate: 0
  });

  const processMessage = async (message, context) => {
    const startTime = Date.now();
    
    try {
      const result = await aiEngine.processMessage(message, context);
      const processingTime = Date.now() - startTime;
      
      // Update metrics
      setAiMetrics(prev => ({
        totalProcessed: prev.totalProcessed + 1,
        averageConfidence: (prev.averageConfidence + result.intent.confidence) / 2,
        successRate: result.intent.confidence > 0.1 ? 
          (prev.successRate + 1) / prev.totalProcessed : 
          prev.successRate
      }));

      return {
        ...result,
        processingTime: `${processingTime}ms`
      };
    } catch (error) {
      console.error('AI processing error:', error);
      return {
        intent: { name: 'error', confidence: 0 },
        entities: {},
        sentiment: 'neutral',
        error: error.message
      };
    }
  };

  const value = {
    aiMetrics,
    processMessage
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
};