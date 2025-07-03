export const generateMessageId = () => Date.now() + Math.random();

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const simulateTyping = async (duration = 1500) => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

export const calculateCreditScoreImprovement = (currentScore, actions) => {
  const improvements = {
    reduce_utilization: 23,
    add_tradeline: 15,
    pay_on_time: 10,
    credit_mix: 8
  };
  
  return actions.reduce((total, action) => total + (improvements[action] || 0), 0);
};

export const generateAIResponse = (intent, confidence, provider = 'ensemble') => {
  return {
    intent,
    confidence,
    provider,
    timestamp: new Date(),
    processingTime: Math.floor(Math.random() * 500) + 200 + 'ms'
  };
};