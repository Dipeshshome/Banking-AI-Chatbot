export const INVESTMENT_DATA = {
    portfolioTypes: [
      { name: 'Conservative', risk: 'Low', expectedReturn: '4-6%' },
      { name: 'Moderate', risk: 'Medium', expectedReturn: '7-10%' },
      { name: 'Aggressive', risk: 'High', expectedReturn: '10-15%' }
    ],
    recommendations: {
      emergency: { target: 6, current: 3.3 },
      retirement: { contribution: 15, current: 8 },
      investment: { monthly: 500, recommended: 800 }
    }
  };
  
  export const LOAN_PRODUCTS = [
    { type: 'Personal Loan', range: '$2,000-$50,000', apr: '5.99-12.99%' },
    { type: 'Auto Loan', range: 'Up to $75,000', apr: '3.49-7.99%' },
    { type: 'Mortgage', range: 'Up to $450,000', apr: '6.25%' },
    { type: 'HELOC', range: 'Up to $85,000', apr: '7.15%' }
  ];
  
  export const SAMPLE_TRANSACTIONS = [
    { id: 1, date: '2025-01-02', description: 'Whole Foods Market', amount: -85.30, type: 'debit', category: 'groceries' },
    { id: 2, date: '2025-01-01', description: 'Salary Credit', amount: 5000.00, type: 'credit', category: 'income' },
    { id: 3, date: '2024-12-31', description: 'Shell Gas Station', amount: -42.50, type: 'debit', category: 'fuel' },
    { id: 4, date: '2024-12-30', description: 'Netflix Subscription', amount: -15.99, type: 'debit', category: 'entertainment' }
  ];