export const INTENTS = {
  BALANCE_INQUIRY: 'balance_inquiry',
  TRANSACTION_HISTORY: 'transaction_history',
  MONEY_TRANSFER: 'money_transfer',
  CARD_ISSUE: 'card_issue',
  FRAUD_CONCERN: 'fraud_concern',
  LOCATION_SERVICE: 'location_service',
  BILL_PAYMENT: 'bill_payment',
  LOAN_INQUIRY: 'loan_inquiry',
  FINANCIAL_ADVICE: 'financial_advice',
  CUSTOMER_SUPPORT: 'customer_support',
  UNKNOWN: 'unknown'
};

export const ACCOUNT_TYPES = {
  CHECKING: 'checking',
  SAVINGS: 'savings',
  CREDIT: 'credit'
};

export const SENTIMENT_TYPES = {
  POSITIVE: 'positive',
  NEGATIVE: 'negative',
  NEUTRAL: 'neutral'
};

export const MESSAGE_TYPES = {
  USER: 'user',
  BOT: 'bot',
  SYSTEM: 'system'
};

export const QUICK_ACTIONS = [
  { icon: 'DollarSign', label: 'Check Balance', intent: INTENTS.BALANCE_INQUIRY },
  { icon: 'CreditCard', label: 'Recent Transactions', intent: INTENTS.TRANSACTION_HISTORY },
  { icon: 'MapPin', label: 'Find ATM', intent: INTENTS.LOCATION_SERVICE },
  { icon: 'Phone', label: 'Customer Support', intent: INTENTS.CUSTOMER_SUPPORT },
  { icon: 'AlertCircle', label: 'Block Card', intent: INTENTS.CARD_ISSUE }
];

export const AI_CONFIG = {
  PROCESSING_DELAY: 800,
  TYPING_DELAY: 1200,
  CONFIDENCE_THRESHOLD: 0.1,
  MAX_ENTITIES: 10
};