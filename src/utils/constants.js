export const BANK_CONFIG = {
  name: 'SecureBank',
  theme: {
    primary: 'blue',
    secondary: 'gray'
  },
  features: {
    voice: true,
    analytics: true,
    investments: true,
    loans: true,
    insurance: true
  }
};

export const AI_PROVIDERS = {
  OPENAI: 'openai',
  ANTHROPIC: 'anthropic',
  ENSEMBLE: 'ensemble'
};

export const DEMO_USER = {
  username: 'John Doe',
  email: 'john.doe@email.com',
  accountNumber: '****1234',
  balance: 15750.50,
  savingsBalance: 5230.25,
  creditScore: 742
};

export const QUICK_REPLIES = {
  INITIAL: [
    "🔐 Login Demo (john.doe)",
    "💰 Check Balance",
    "💼 Investment Options",
    "📊 Financial Planning", 
    "📈 Credit Score Tips",
    "🏠 Loan Options",
    "🎤 Voice Demo"
  ],
  AUTHENTICATED: [
    'Show Account Summary',
    'Investment Options',
    'Financial Planning',
    'Credit Score Tips',
    'Loan Options',
    'Recent Transactions',
    'AI Recommendations'
  ]
};