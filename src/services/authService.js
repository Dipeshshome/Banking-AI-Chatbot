import { delay } from '../utils/helpers';

class AuthService {
  constructor() {
    this.currentUser = null;
  }

  async authenticate(credentials) {
    // Simulate API call
    await delay(1000);

    const { username, password } = credentials;
    
    // Demo authentication logic
    if (username.toLowerCase().includes('john') || 
        username.includes('1234') || 
        password === 'password') {
      
      const userData = {
        id: '1',
        username: 'John Doe',
        email: 'john.doe@email.com',
        accountNumber: '****1234',
        balance: 15750.50,
        savingsBalance: 5230.25,
        creditLimit: 8000,
        creditUsed: 1250.75,
        profileImage: null,
        lastLogin: new Date()
      };

      this.currentUser = userData;
      localStorage.setItem('bankingUser', JSON.stringify(userData));
      return userData;
    }

    throw new Error('Invalid credentials');
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('bankingUser');
  }

  getCurrentUser() {
    if (this.currentUser) return this.currentUser;
    
    const stored = localStorage.getItem('bankingUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      return this.currentUser;
    }
    
    return null;
  }

  isAuthenticated() {
    return !!this.getCurrentUser();
  }
}

export const authService = new AuthService();