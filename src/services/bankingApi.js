import { delay } from '../utils/helpers';

class BankingAPI {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
  }

  async getAccountBalance(accountId) {
    await delay(500);
    return {
      checking: 15750.50,
      savings: 5230.25,
      credit: { limit: 8000, used: 1250.75 }
    };
  }

  async getTransactionHistory(accountId, options = {}) {
    await delay(700);
    return [
      { id: 1, date: '2025-06-28', description: 'Whole Foods Market', amount: -85.30, type: 'debit', category: 'groceries' },
      { id: 2, date: '2025-06-27', description: 'Salary - TechCorp Inc', amount: 5000.00, type: 'credit', category: 'income' },
      { id: 3, date: '2025-06-26', description: 'Shell Gas Station', amount: -42.50, type: 'debit', category: 'fuel' },
      { id: 4, date: '2025-06-25', description: 'Netflix Subscription', amount: -15.99, type: 'debit', category: 'entertainment' },
      { id: 5, date: '2025-06-24', description: 'ATM Withdrawal', amount: -200.00, type: 'debit', category: 'cash' }
    ];
  }

  async transferMoney(fromAccount, toAccount, amount) {
    await delay(1000);
    return {
      transactionId: 'TXN-' + Date.now(),
      status: 'completed',
      amount,
      fee: 0,
      estimatedArrival: '2-3 business days'
    };
  }

  async findNearbyATMs(location) {
    await delay(500);
    return [
      { name: 'Main Street ATM', distance: '0.2 miles', status: 'Available', address: '123 Main St' },
      { name: 'Shopping Mall Branch', distance: '0.5 miles', status: 'Available', address: '456 Mall Ave' },
      { name: 'University ATM', distance: '0.8 miles', status: 'Out of Service', address: '789 College Rd' }
    ];
  }

  async blockCard(cardId, reason) {
    await delay(800);
    return {
      success: true,
      cardId,
      blockedAt: new Date(),
      replacementETA: '3-5 business days'
    };
  }
}

export const bankingAPI = new BankingAPI();