import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

export const generateId = () => uuidv4();

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatDate = (date, formatString = 'MMM dd, yyyy') => {
  return format(new Date(date), formatString);
};

export const formatTime = (date) => {
  return format(new Date(date), 'HH:mm');
};

export const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));