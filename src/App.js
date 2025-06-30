import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, CreditCard, DollarSign, Phone, MapPin, AlertCircle, Menu, X, Brain, Zap, Lock, Mail, Shield } from 'lucide-react';
import './index.css';

const ConversationalBankingChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Welcome to SecureBank AI Assistant! 🏦\n\nFor your security, please authenticate yourself to access banking services. I can help you with account inquiries, transactions, and more once you're logged in.",
      timestamp: new Date(),
      quickReplies: [
        "Login to my account",
        "I forgot my password", 
        "Need help with login",
        "What can you do?"
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Authentication states
  const [authStep, setAuthStep] = useState('initial'); // initial, username, password, otp, authenticated
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  
  // User session
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userSession, setUserSession] = useState({
    username: '',
    email: '',
    accountNumber: '',
    balance: 0,
    lastLogin: null
  });
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Demo user database
  const demoUsers = {
    'john.doe': {
      password: 'SecurePass123!',
      email: 'john.doe@email.com',
      accountNumber: '****1234',
      balance: 15750.50,
      name: 'John Doe'
    },
    'jane.smith': {
      password: 'MyPassword456@',
      email: 'jane.smith@email.com', 
      accountNumber: '****5678',
      balance: 25300.75,
      name: 'Jane Smith'
    },
    'demo.user': {
      password: 'Demo123!',
      email: 'demo.user@email.com',
      accountNumber: '****9999',
      balance: 5000.00,
      name: 'Demo User'
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Lock countdown timer
  useEffect(() => {
    if (isLocked && lockTimer > 0) {
      const timer = setTimeout(() => {
        setLockTimer(lockTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isLocked && lockTimer === 0) {
      setIsLocked(false);
      setLoginAttempts(0);
      addMessage('bot', 'Account unlock period has expired. You can now try logging in again.', ['Login to my account']);
    }
  }, [isLocked, lockTimer]);

  const addMessage = (type, text, quickReplies = [], data = null) => {
    const newMessage = {
      id: Date.now(),
      type,
      text,
      timestamp: new Date(),
      quickReplies,
      data
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const simulateEmailSend = async (email, otp) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(`📧 Email sent to ${email}: Your OTP is ${otp}`);
    return true;
  };

  const validateCredentials = (username, password) => {
    const user = demoUsers[username.toLowerCase()];
    return user && user.password === password ? user : null;
  };

  const handleCredentialsSubmission = async (username, password) => {
    if (isLocked) {
      addMessage('bot', `⚠️ Account temporarily locked due to multiple failed attempts. Please try again in ${Math.floor(lockTimer / 60)}:${(lockTimer % 60).toString().padStart(2, '0')} minutes.`, []);
      return;
    }

    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const user = validateCredentials(username, password);
    
    if (user) {
      // Valid credentials - proceed to OTP
      const newOtp = generateOTP();
      setGeneratedOtp(newOtp);
      setUserEmail(user.email);
      setAuthStep('otp');
      setLoginAttempts(0);
      
      setIsTyping(false);
      addMessage('bot', `✅ Credentials verified successfully!

🔐 For additional security, we've sent a 6-digit OTP to your registered email: ${user.email.replace(/(.{2})(.*)(@.*)/, '$1***$3')}

Please enter the OTP to complete authentication.`, [], {
        type: 'otp_form',
        email: user.email
      });
      
      // Simulate email sending
      simulateEmailSend(user.email, newOtp);
      
    } else {
      // Invalid credentials - restart the process
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        setIsLocked(true);
        setLockTimer(300); // 5 minutes lockout
        setAuthStep('initial');
        setCredentials({ username: '', password: '' });
        setIsTyping(false);
        addMessage('bot', '🚨 Too many failed login attempts. Your account has been temporarily locked for 5 minutes for security purposes.', []);
      } else {
        setAuthStep('username'); // Restart the login process
        setCredentials({ username: '', password: '' });
        setIsTyping(false);
        addMessage('bot', `❌ Invalid credentials. You have ${3 - newAttempts} attempts remaining.

Let's try again. Please enter your username:`, []);
      }
    }
  };

  const handleOtpSubmission = async (otpValue) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (otpValue === generatedOtp) {
      // OTP verified - complete authentication
      const user = Object.values(demoUsers).find(u => u.email === userEmail);
      setUserSession({
        username: user.name,
        email: user.email,
        accountNumber: user.accountNumber,
        balance: user.balance,
        lastLogin: new Date()
      });
      setIsAuthenticated(true);
      setAuthStep('authenticated');
      
      setIsTyping(false);
      addMessage('bot', `🎉 Authentication successful! Welcome back, ${user.name}!

✅ Login completed at ${new Date().toLocaleString()}
🏦 Account: ${user.accountNumber}
💰 Available Balance: ${user.balance.toLocaleString()}

How can I assist you with your banking needs today?`, [
        "Check my balance",
        "Recent transactions", 
        "Transfer money",
        "Find ATM",
        "Account summary"
      ]);
    } else {
      setIsTyping(false);
      addMessage('bot', `❌ Invalid OTP. Please check the code sent to your email and try again.

Note: OTP expires in 10 minutes.`, ['Resend OTP', 'Try different OTP', 'Contact support']);
    }
  };

  const processUserMessage = async (input) => {
    const lowerInput = input.toLowerCase();
    
    // Handle different authentication steps
    switch (authStep) {
      case 'initial':
        if (lowerInput.includes('login') || lowerInput.includes('sign in') || lowerInput.includes('authenticate')) {
          setAuthStep('username');
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            addMessage('bot', `🔐 **Welcome to Secure Login**

Let's authenticate you step by step for security.

**Step 1 of 3: Username**

Please enter your username:

💡 Demo usernames: john.doe, jane.smith, demo.user`, [], {
              type: 'username_input'
            });
          }, 1000);
        } else if (lowerInput.includes('forgot') || lowerInput.includes('reset')) {
          addMessage('bot', `🔒 **Password Reset**

For security reasons, password reset requires identity verification. Please:

1. Visit our nearest branch with ID
2. Call customer service: 1-800-BANK-HELP
3. Use our mobile app's "Forgot Password" feature`, ['Login to my account', 'Contact support']);
        } else if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
          addMessage('bot', `🤖 **AI Banking Assistant Capabilities**

**Once authenticated, I can help you with:**
- Account balance and statements
- Transaction history and analysis
- Money transfers and payments
- ATM/Branch locator
- Financial advice and insights
- Card management
- Customer support

**Security Features:**
- Multi-factor authentication
- Real-time fraud monitoring
- Encrypted communications`, ['Login to my account', 'Security information']);
        } else {
          addMessage('bot', 'I understand you need assistance. However, I require authentication before I can help with banking services. Please login to continue.', ['Login to my account', 'Need help with login']);
        }
        break;
        
      case 'username':
        if (input.trim()) {
          setCredentials(prev => ({ ...prev, username: input.trim() }));
          setAuthStep('password');
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            addMessage('bot', `✅ Username received: **${input.trim()}**

🔐 **Step 2 of 3: Password**

Please enter your password:

💡 Demo passwords:
- john.doe → SecurePass123!
- jane.smith → MyPassword456@
- demo.user → Demo123!`, [], {
              type: 'password_input'
            });
          }, 800);
        } else {
          addMessage('bot', '⚠️ Please enter a valid username.', []);
        }
        break;
        
      case 'password':
        if (input.trim()) {
          const enteredPassword = input.trim();
          setCredentials(prev => ({ ...prev, password: enteredPassword }));
          // Process the complete credentials
          await handleCredentialsSubmission(credentials.username, enteredPassword);
        } else {
          addMessage('bot', '⚠️ Please enter your password.', []);
        }
        break;
        
      case 'otp':
        if (/^\d{6}$/.test(input)) {
          setOtp(input);
          await handleOtpSubmission(input);
        } else if (lowerInput.includes('resend')) {
          const newOtp = generateOTP();
          setGeneratedOtp(newOtp);
          simulateEmailSend(userEmail, newOtp);
          addMessage('bot', `📧 New OTP has been sent to ${userEmail.replace(/(.{2})(.*)(@.*)/, '$1***$3')}

Please check your email and enter the 6-digit code.`, []);
        } else {
          addMessage('bot', `⚠️ Please enter a valid 6-digit OTP code.

Check your email for the verification code.`, ['Resend OTP']);
        }
        break;
        
      case 'authenticated':
        // Handle authenticated user queries with AI processing
        await processAuthenticatedQuery(input);
        break;
    }
  };

  const processAuthenticatedQuery = async (input) => {
    setAiProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const lowerInput = input.toLowerCase();
    let intent = 'unknown';
    let confidence = 0;
    let sentiment = 'neutral';
    
    // AI intent classification
    if (lowerInput.includes('balance')) {
      intent = 'balance_inquiry';
      confidence = 0.95;
    } else if (lowerInput.includes('transaction') || lowerInput.includes('history')) {
      intent = 'transaction_history';
      confidence = 0.90;
    } else if (lowerInput.includes('transfer') || lowerInput.includes('send')) {
      intent = 'money_transfer';
      confidence = 0.88;
    } else if (lowerInput.includes('logout') || lowerInput.includes('sign out')) {
      intent = 'logout';
      confidence = 0.95;
    }
    
    // Sentiment analysis
    if (lowerInput.includes('frustrated') || lowerInput.includes('angry')) {
      sentiment = 'negative';
    } else if (lowerInput.includes('thank') || lowerInput.includes('great')) {
      sentiment = 'positive';
    }
    
    setAiProcessing(false);
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      switch (intent) {
        case 'balance_inquiry':
          addMessage('bot', `💰 **Account Balance**

Current Balance: ${userSession.balance.toLocaleString()}
Account: ${userSession.accountNumber}
Last Updated: ${new Date().toLocaleString()}

${sentiment === 'negative' ? '😟 I notice you seem concerned. Is there anything specific about your balance I can help with?' : ''}`, [
            'Recent transactions', 'Transfer money', 'Account details', 'Download statement'
          ]);
          break;
          
        case 'transaction_history':
          addMessage('bot', '📊 **Recent Transaction History**', ['Download statement', 'Dispute transaction', 'More details'], {
            type: 'transactions',
            transactions: [
              { id: 1, date: '2025-06-28', description: 'Whole Foods Market', amount: -85.30, type: 'debit', category: 'groceries' },
              { id: 2, date: '2025-06-27', description: 'Salary Credit', amount: 5000.00, type: 'credit', category: 'income' },
              { id: 3, date: '2025-06-26', description: 'Shell Gas Station', amount: -42.50, type: 'debit', category: 'fuel' },
              { id: 4, date: '2025-06-25', description: 'Netflix Subscription', amount: -15.99, type: 'debit', category: 'entertainment' }
            ]
          });
          break;
          
        case 'logout':
          setIsAuthenticated(false);
          setAuthStep('initial');
          setUserSession({});
          setCredentials({ username: '', password: '' });
          setOtp('');
          addMessage('bot', `👋 You have been securely logged out.

Thank you for using SecureBank AI Assistant. Your session has been terminated for security.`, ['Login again', 'Contact support']);
          break;
          
        default:
          addMessage('bot', `Hello ${userSession.username}! I can help you with various banking services. What would you like to do?`, [
            'Check balance', 'Recent transactions', 'Transfer money', 'Find ATM', 'Customer support'
          ]);
      }
    }, 1200);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    addMessage('user', inputText);
    processUserMessage(inputText);
    setInputText('');
    inputRef.current?.focus();
  };

  const handleQuickReply = (reply) => {
    addMessage('user', reply);
    processUserMessage(reply);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessageContent = (message) => {
    if (message.data?.type === 'username_input') {
  return (
    <div className="mt-2">
      <div className="text-sm text-gray-600 mb-3 whitespace-pre-line">{message.text}</div>
      <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
        <div className="flex items-center mb-2">
          <User className="text-blue-600 mr-2" size={16} />
          <span className="font-medium text-blue-800">Username Required</span>
        </div>
        <div className="text-sm text-blue-700">
          Type your username in the chat input below 👇
        </div>
      </div>
    </div>
  );
}

if (message.data?.type === 'password_input') {
  return (
    <div className="mt-2">
      <div className="text-sm text-gray-600 mb-3 whitespace-pre-line">{message.text}</div>
      <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
        <div className="flex items-center mb-2">
          <Lock className="text-green-600 mr-2" size={16} />
          <span className="font-medium text-green-800">Password Required</span>
        </div>
        <div className="text-sm text-green-700">
          Type your password in the chat input below 👇
        </div>
        <div className="text-xs text-green-600 mt-1">
          🔒 Your password will be processed securely
        </div>
      </div>
    </div>
  );
}

if (message.data?.type === 'otp_form') {
  return (
    <div className="mt-2">
      <div className="text-sm text-gray-600 mb-3 whitespace-pre-line">{message.text}</div>
      <div className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded">
        <div className="flex items-center mb-2">
          <Mail className="text-purple-600 mr-2" size={16} />
          <span className="font-medium text-purple-800">OTP Verification</span>
        </div>
        <div className="text-sm text-purple-700">
          📧 Check your email: <code className="bg-purple-100 px-1 rounded">{message.data.email}</code>
        </div>
        <div className="text-xs text-purple-600 mt-1">
          💡 Demo OTP: {generatedOtp} (for testing purposes)
        </div>
      </div>
    </div>
  );
}

    if (message.data?.type === 'transactions') {
      return (
        <div className="mt-2">
          <div className="text-sm text-gray-600 mb-2">{message.text}</div>
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            {message.data.transactions.map(tx => (
              <div key={tx.id} className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-sm">{tx.description}</div>
                  <div className="text-xs text-gray-500">{tx.date} • {tx.category}</div>
                </div>
                <div className={`font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.type === 'credit' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return <div className="whitespace-pre-line">{message.text}</div>;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 bg-blue-800">
          <div className="flex items-center space-x-2">
            <Shield className="text-blue-300" size={24} />
            <h1 className="text-xl font-bold">SecureBank</h1>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4">
          {isAuthenticated ? (
            <div className="mb-6 p-3 bg-blue-800 rounded-lg">
              <div className="text-sm opacity-75">Authenticated User</div>
              <div className="font-semibold">{userSession.username}</div>
              <div className="text-xs opacity-75">{userSession.email}</div>
              <div className="text-xs opacity-75">Account: {userSession.accountNumber}</div>
              <div className="text-xs opacity-75 mt-1 flex items-center">
                <Shield size={12} className="mr-1" />
                Secure Session Active
              </div>
            </div>
          ) : (
            <div className="mb-6 p-3 bg-red-800/50 rounded-lg">
              <div className="text-sm opacity-75">Authentication Status</div>
              <div className="font-semibold text-red-200">
                {authStep === 'initial' && 'Not Authenticated'}
                {authStep === 'username' && 'Username Required'}
                {authStep === 'password' && 'Password Required'}
                {authStep === 'otp' && 'OTP Verification'}
              </div>
              <div className="text-xs opacity-75 flex items-center mt-1">
                <Lock size={12} className="mr-1" />
                {authStep === 'initial' && 'Login Required'}
                {authStep === 'username' && 'Step 1 of 3'}
                {authStep === 'password' && 'Step 2 of 3'}
                {authStep === 'otp' && 'Step 3 of 3'}
              </div>
            </div>
          )}
          
          <div className="mb-4 p-3 bg-blue-800/50 rounded-lg">
            <div className="text-xs uppercase tracking-wide opacity-75 mb-2">Security Status</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span>Encryption</span>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <span>2FA Active</span>
                <div className={`w-2 h-2 ${authStep === 'authenticated' ? 'bg-green-400' : 'bg-yellow-400'} rounded-full`}></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Session Monitor</span>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </div>
          
          {isAuthenticated && (
            <nav className="space-y-2">
              <div className="text-xs uppercase tracking-wide opacity-75 mb-2">Banking Services</div>
              {[
                { icon: DollarSign, label: 'Check Balance' },
                { icon: CreditCard, label: 'Recent Transactions' },
                { icon: MapPin, label: 'Find ATM' },
                { icon: Phone, label: 'Customer Support' },
                { icon: AlertCircle, label: 'Logout' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickReply(item.label)}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-blue-800/50 transition-colors"
                >
                  <item.icon size={18} />
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </nav>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Bot className="text-blue-600" size={24} />
                <div className={`absolute -top-1 -right-1 w-3 h-3 ${isAuthenticated ? 'bg-green-500' : 'bg-yellow-500'} rounded-full`}></div>
              </div>
              <div>
                <h2 className="font-semibold flex items-center">
                  SecureBank AI Assistant
                  <Brain size={16} className="ml-2 text-blue-600" />
                </h2>
                <div className="text-xs text-gray-500 flex items-center">
                  <span>{isAuthenticated ? 'Authenticated' : 'Authentication Required'} • </span>
                  {aiProcessing ? (
                    <>
                      <Zap size={12} className="ml-1 mr-1 text-yellow-500 animate-pulse" />
                      <span className="text-yellow-600">Processing...</span>
                    </>
                  ) : (
                    <span className="text-green-600">Ready</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {isAuthenticated && (
            <div className="text-right">
              <div className="text-sm font-medium">Balance: ${userSession.balance?.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Last Login: {userSession.lastLogin?.toLocaleTimeString()}</div>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md xl:max-w-lg flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                }`}>
                  {message.type === 'user' ? <User size={16} /> : <Brain size={16} />}
                </div>
                
                <div className={`rounded-lg px-4 py-2 ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}>
                  {renderMessageContent(message)}
                  
                  {message.quickReplies && message.quickReplies.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.quickReplies.map((reply, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickReply(reply)}
                          className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full transition-colors transform hover:scale-105"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <div className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {aiProcessing && (
            <div className="flex justify-center">
              <div className="bg-yellow-100 border border-yellow-200 rounded-lg px-4 py-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Zap className="text-yellow-600 animate-pulse" size={16} />
                  <span className="text-yellow-800">AI is analyzing your request...</span>
                </div>
              </div>
            </div>
          )}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center">
                  <Brain size={16} />
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                authStep === 'username' ? "Enter your username..." :
                authStep === 'password' ? "Enter your password..." :
                authStep === 'otp' ? "Enter 6-digit OTP..." :
                isAuthenticated ? "Ask me anything about your banking needs..." : 
                "Type 'Login to my account' to start..."
              }
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={aiProcessing || isLocked}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || aiProcessing || isLocked}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg px-4 py-2 transition-colors flex items-center space-x-2"
            >
              {aiProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>AI</span>
                </div>
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>
          
          <div className="mt-2 text-xs text-gray-500 text-center flex items-center justify-center space-x-1">
            <Shield size={12} />
            <span>Secure Banking • Multi-Factor Authentication • AI-Powered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return <ConversationalBankingChatbot />;
}

export default App;