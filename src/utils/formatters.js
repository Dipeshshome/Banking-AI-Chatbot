export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatAccountNumber = (accountNumber) => {
  return `****${accountNumber.slice(-4)}`;
};

export const formatCardNumber = (cardNumber) => {
  return `**** **** **** ${cardNumber.slice(-4)}`;
};

export const formatTransactionAmount = (amount, type) => {
  const formattedAmount = Math.abs(amount).toFixed(2);
  const sign = type === 'credit' ? '+' : '-';
  return `${sign}${formattedAmount}`;
};

export const getTransactionIcon = (category) => {
  const icons = {
    groceries: '🛒',
    fuel: '⛽',
    entertainment: '🎬',
    dining: '🍽️',
    cash: '💸',
    income: '💰',
    shopping: '🛍️',
    utilities: '🏠'
  };
  return icons[category] || '💳';
};

export const formatSpendingCategory = (category) => {
  return category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
};