import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, CreditCard, DollarSign, Phone, MapPin, AlertCircle, Menu, X, Brain, Zap } from 'lucide-react';
import './index.css';

const BankingAIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hello! I'm your AI-powered banking assistant. I can help you with account inquiries, transactions, financial advice, and more. What can I help you with today?",
      timestamp: new Date(),
      quickReplies: [
        "What's my balance?",
        "Show recent transactions",
        "I need to transfer money",
        "Find ATM near me",
        "My card isn't working"
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [balance, setBalance] = useState(15750.50);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const authenticateUser = (input) => {
    const credentials = input.toLowerCase();
    if (credentials.includes('john') || credentials.includes('1234') || credentials.includes('password')) {
      setIsAuthenticated(true);
      setUserName('John Doe');
      return true;
    }
    return false;
  };

  const processAI = async (input) => {
    setAiProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const lowerInput = input.toLowerCase();
    let intent = 'unknown';
    let confidence = 0;
    let sentiment = 'neutral';
    
    // Simple AI logic for intent classification
    if (lowerInput.includes('balance')) {
      intent = 'balance_inquiry';
      confidence = 0.95;
    } else if (lowerInput.includes('transaction') || lowerInput.includes('history')) {
      intent = 'transaction_history';
      confidence = 0.90;
    } else if (lowerInput.includes('transfer') || lowerInput.includes('send')) {
      intent = 'money_transfer';
      confidence = 0.88;
    } else if (lowerInput.includes('card') || lowerInput.includes('block')) {
      intent = 'card_issue';
      confidence = 0.85;
    } else if (lowerInput.includes('atm') || lowerInput.includes('location')) {
      intent = 'location_service';
      confidence = 0.80;
    } else if (lowerInput.includes('help') || lowerInput.includes('support')) {
      intent = 'customer_support';
      confidence = 0.75;
    }
    
    // Sentiment analysis
    if (lowerInput.includes('frustrated') || lowerInput.includes('angry') || lowerInput.includes('problem')) {
      sentiment = 'negative';
    } else if (lowerInput.includes('thank') || lowerInput.includes('great') || lowerInput.includes('good')) {
      sentiment = 'positive';
    }
    
    setAiProcessing(false);
    return { intent, confidence, sentiment };
  };

  const processUserMessage = async (input) => {
    // Authentication check
    if (!isAuthenticated && (
      input.toLowerCase().includes('balance') || 
      input.toLowerCase().includes('transaction') || 
      input.toLowerCase().includes('transfer')
    )) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('bot', 
          "For security, I need to verify your identity. Please provide your username or account number (Demo: type 'john' or '1234')",
          ['john', '1234', 'password']
        );
      }, 1000);
      return;
    }

    // Handle authentication
    if (!isAuthenticated && authenticateUser(input)) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('bot', 
          `Welcome back, ${userName}! I've authenticated you securely. How can I help you today?`,
          ["Check my balance", "Recent transactions", "Transfer money", "Find ATM"]
        );
      }, 1000);
      return;
    }

    // Process with AI
    const aiResult = await processAI(input);
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      let response = '';
      let quickReplies = [];
      
      switch (aiResult.intent) {
        case 'balance_inquiry':
          response = `Your current account balance is $${balance.toLocaleString()}. ${aiResult.sentiment === 'negative' ? 'I notice you seem concerned. Is there anything specific I can help with?' : ''}`;
          quickReplies = ['Recent transactions', 'Transfer money', 'Account details'];
          break;
          
        case 'transaction_history':
          response = 'Here are your recent transactions:';
          addMessage('bot', response, ['Download statement', 'Dispute transaction', 'More details'], {
            type: 'transactions',
            transactions: [
              { id: 1, date: '2025-06-28', description: 'Whole Foods Market', amount: -85.30, type: 'debit' },
              { id: 2, date: '2025-06-27', description: 'Salary Credit', amount: 5000.00, type: 'credit' },
              { id: 3, date: '2025-06-26', description: 'Shell Gas Station', amount: -42.50, type: 'debit' },
              { id: 4, date: '2025-06-25', description: 'Netflix Subscription', amount: -15.99, type: 'debit' },
              { id: 5, date: '2025-06-24', description: 'ATM Withdrawal', amount: -200.00, type: 'debit' }
            ]
          });
          return;
          
        case 'money_transfer':
          response = 'I can help you transfer money. Please tell me:\n1. Amount to transfer\n2. Recipient account or name\n\nExample: "Transfer $500 to John Smith"';
          quickReplies = ['Transfer to savings', 'Pay friend', 'View beneficiaries'];
          break;
          
        case 'card_issue':
          response = `I understand you're having card issues. ${aiResult.sentiment === 'negative' ? 'This seems urgent - let me help immediately.' : ''} What specific problem are you experiencing?`;
          quickReplies = ['Card declined', 'Lost/stolen card', 'Block my card', 'Order replacement'];
          break;
          
        case 'location_service':
          response = 'I found ATMs near you:';
          addMessage('bot', response, ['Get directions', 'Check status', 'Find more'], {
            type: 'locations',
            locations: [
              { name: 'Main Street ATM', distance: '0.2 miles', status: 'Available', address: '123 Main St' },
              { name: 'Shopping Mall Branch', distance: '0.5 miles', status: 'Available', address: '456 Mall Ave' },
              { name: 'University ATM', distance: '0.8 miles', status: 'Out of Service', address: '789 College Rd' }
            ]
          });
          return;
          
        case 'customer_support':
          response = 'I\'m here to help! You can:\n\n• Chat with me for instant assistance\n• Call our 24/7 helpline: 1-800-BANK-HELP\n• Visit any branch during business hours\n• File a complaint through our app\n\nWhat specific issue can I help you with?';
          quickReplies = ['File complaint', 'Speak to agent', 'Branch hours', 'Contact details'];
          break;
          
        default:
          response = 'I understand you need help. Could you be more specific? I can assist with account inquiries, transactions, transfers, and more.';
          quickReplies = ['Check balance', 'Recent transactions', 'Transfer money', 'Customer support'];
      }
      
      addMessage('bot', response, quickReplies, {
        aiAnalysis: {
          intent: aiResult.intent,
          confidence: Math.round(aiResult.confidence * 100),
          sentiment: aiResult.sentiment
        }
      });
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
    if (message.data?.type === 'transactions') {
      return (
        <div className="mt-2">
          <div className="text-sm text-gray-600 mb-2">{message.text}</div>
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            {message.data.transactions.map(tx => (
              <div key={tx.id} className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-sm">{tx.description}</div>
                  <div className="text-xs text-gray-500">{tx.date}</div>
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

    if (message.data?.type === 'locations') {
      return (
        <div className="mt-2">
          <div className="text-sm text-gray-600 mb-2">{message.text}</div>
          <div className="space-y-2">
            {message.data.locations.map((location, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
                <div>
                  <div className="font-medium text-sm">{location.name}</div>
                  <div className="text-xs text-gray-500">{location.address}</div>
                  <div className="text-xs text-blue-600">{location.distance} away</div>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  location.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {location.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return <div className="whitespace-pre-wrap">{message.text}</div>;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 bg-blue-800">
          <div className="flex items-center space-x-2">
            <Brain className="text-blue-300" size={24} />
            <h1 className="text-xl font-bold">AI Banking</h1>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4">
          {isAuthenticated && (
            <div className="mb-6 p-3 bg-blue-800 rounded-lg">
              <div className="text-sm opacity-75">Welcome back</div>
              <div className="font-semibold">{userName}</div>
              <div className="text-xs opacity-75">Account: ****1234</div>
              <div className="text-xs opacity-75 mt-1 flex items-center">
                <Zap size={12} className="mr-1" />
                AI-Enhanced Experience
              </div>
            </div>
          )}
          
          <div className="mb-4 p-3 bg-blue-800/50 rounded-lg">
            <div className="text-xs uppercase tracking-wide opacity-75 mb-2">AI Status</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span>Natural Language</span>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Intent Recognition</span>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Sentiment Analysis</span>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <nav className="space-y-2">
            <div className="text-xs uppercase tracking-wide opacity-75 mb-2">Quick Actions</div>
            {[
              { icon: DollarSign, label: 'Check Balance' },
              { icon: CreditCard, label: 'Recent Transactions' },
              { icon: MapPin, label: 'Find ATM' },
              { icon: Phone, label: 'Customer Support' },
              { icon: AlertCircle, label: 'Block Card' }
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
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <h2 className="font-semibold flex items-center">
                  AI Banking Assistant
                  <Brain size={16} className="ml-2 text-blue-600" />
                </h2>
                <div className="text-xs text-gray-500 flex items-center">
                  <span>AI-Powered • Secure • </span>
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
              <div className="text-sm font-medium">Balance: ${balance.toLocaleString()}</div>
              <div className="text-xs text-gray-500">AI-monitored • Secure</div>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md xl:max-w-lg flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                }`}>
                  {message.type === 'user' ? <User size={16} /> : <Brain size={16} />}
                </div>
                
                {/* Message Content */}
                <div className={`rounded-lg px-4 py-2 ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}>
                  {renderMessageContent(message)}
                  
                  {/* AI Analysis */}
                  {message.data?.aiAnalysis && message.type === 'bot' && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                      <div className="grid grid-cols-3 gap-2">
                        <div>Intent: <span className="font-medium">{message.data.aiAnalysis.intent}</span></div>
                        <div>Confidence: <span className="font-medium">{message.data.aiAnalysis.confidence}%</span></div>
                        <div>Sentiment: <span className="font-medium capitalize">{message.data.aiAnalysis.sentiment}</span></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Quick Replies */}
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
                  
                  {/* Timestamp */}
                  <div className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* AI Processing Indicator */}
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
          
          {/* Typing Indicator */}
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
              placeholder="Ask me anything about your banking needs..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={aiProcessing}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || aiProcessing}
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
            <Brain size={12} />
            <span>Powered by AI • Natural language understanding • Secure banking</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return <BankingAIChatbot />;
}

export default App;