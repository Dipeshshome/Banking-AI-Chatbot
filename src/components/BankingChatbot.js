import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, CreditCard, DollarSign, Phone, MapPin, AlertCircle, Menu, X, Brain, Zap, Lock, Mail, Shield, Bell, Briefcase, Settings, BarChart3, Mic, MicOff, Volume2, Play, Pause, TrendingUp, PieChart, Activity } from 'lucide-react';

const BankingChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: `🎉 **Welcome to SecureBank AI Assistant Demo!**

I'm an advanced AI banking assistant powered by:
• **OpenAI GPT-4** for intelligent conversation
• **Anthropic Claude** for enhanced reasoning  
• **Voice Recognition** with OpenAI Whisper
• **Real-time Analytics** and insights

🎮 **Try these demo features:**`,
      timestamp: new Date(),
      quickReplies: [
        "🔐 Login Demo (john.doe)",
        "💰 Check Balance",
        "💼 Investment Options",
        "📊 Financial Planning", 
        "📈 Credit Score Tips",
        "🏠 Loan Options",
        "🎤 Voice Demo"
      ]
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [demoMode, setDemoMode] = useState('live');
  
  // Demo authentication state
  const [authStep, setAuthStep] = useState('initial');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userSession, setUserSession] = useState({
    username: 'John Doe',
    email: 'john.doe@email.com',
    accountNumber: '****1234',
    balance: 15750.50,
    savingsBalance: 5230.25
  });
  
  // Demo voice state
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Demo analytics state
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showAISettings, setShowAISettings] = useState(false);
  
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

  const simulateAIProcessing = async (message) => {
    setAiProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    setAiProcessing(false);
    return {
      intent: 'balance_inquiry',
      confidence: 0.94,
      sentiment: 'neutral',
      provider: 'ensemble'
    };
  };

  const handleDemoLogin = () => {
    setAuthStep('username');
    addMessage('bot', `🔐 **Demo Login Process**

**Step 1 of 3: Username**

For demo purposes, I'll authenticate you as John Doe.

Please type: **john.doe**`, [], {
      type: 'demo_auth'
    });
  };

  const handleVoiceDemo = () => {
    setVoiceEnabled(true);
    addMessage('bot', `🎤 **Voice Demo Activated!**

**Voice Features:**
• Speech-to-Text with OpenAI Whisper
• Natural voice responses with AI TTS
• Real-time audio processing
• Banking-optimized speech patterns

🎯 **Try saying:** "What's my account balance?" or "Show recent transactions"

*Note: This is a demo - voice features are simulated*`, [
      'Simulate "Check Balance"',
      'Simulate "Transfer Money"',
      'Voice Settings'
    ]);
  };

  const handleAnalyticsDemo = () => {
    setShowAnalytics(true);
  };

  const handleAIFeaturesDemo = () => {
    addMessage('bot', `🤖 **Advanced AI Features Demo**

**Multi-Provider AI:**
• OpenAI GPT-4 for conversation
• Anthropic Claude for reasoning
• Ensemble mode for best results

**Banking Intelligence:**
• Intent recognition: 94.5% accuracy
• Entity extraction: Amounts, accounts, dates
• Sentiment analysis: Emotion detection
• Context memory: Conversation flow

**Real Examples:**`, [
      'Demo: Complex Query',
      'Demo: Sentiment Detection', 
      'Demo: Multi-step Transaction',
      'View AI Settings'
    ]);
  };

  const processUserMessage = async (input) => {
    const lowerInput = input.toLowerCase();
    
    // Demo authentication flow
    if (authStep === 'username' && lowerInput.includes('john')) {
      setAuthStep('password');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('bot', `✅ Username confirmed: **john.doe**

**Step 2 of 3: Password**

Please enter password: **demo123**`, [], {
          type: 'demo_auth'
        });
      }, 800);
      return;
    }
    
    if (authStep === 'password' && lowerInput.includes('demo')) {
      setAuthStep('otp');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('bot', `🔐 **Step 3 of 3: OTP Verification**

Demo OTP sent to: jo***@email.com

Please enter: **123456**`, [], {
          type: 'demo_otp',
          otp: '123456'
        });
      }, 1000);
      return;
    }
    
    if (authStep === 'otp' && input.includes('123456')) {
      setIsAuthenticated(true);
      setAuthStep('authenticated');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('bot', `🎉 **Authentication Successful!**

Welcome back, ${userSession.username}!

✅ Secure login completed
🏦 Account: ${userSession.accountNumber}  
💰 Available Balance: $${userSession.balance.toLocaleString()}
🤖 AI assistant is now personalized

How can I assist you today?`, [
          'Show Account Summary',
          'Investment Options',
          'Financial Planning',
          'Credit Score Tips',
          'Loan Options',
          'Recent Transactions',
          'AI Recommendations'
        ]);
      }, 1200);
      return;
    }
    
    // Simulate AI processing for authenticated users
    if (isAuthenticated) {
      const aiResult = await simulateAIProcessing(input);
      
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        
        if (lowerInput.includes('balance') || lowerInput.includes('account')) {
          addMessage('bot', `💰 **Account Summary**

**Checking Account:** $${userSession.balance.toLocaleString()}
**Savings Account:** $${userSession.savingsBalance.toLocaleString()}
**Total Balance:** $${(userSession.balance + userSession.savingsBalance).toLocaleString()}

Last updated: ${new Date().toLocaleString()}

🤖 **AI Analysis:** Your spending is well-managed with consistent savings habits.`, [
            'Recent Transactions',
            'Transfer to Savings', 
            'Financial Advice',
            'Download Statement'
          ], {
            type: 'ai_analysis',
            intent: aiResult.intent,
            confidence: aiResult.confidence,
            provider: aiResult.provider
          });
        } else if (lowerInput.includes('transaction')) {
          addMessage('bot', `📊 **Recent Transactions**`, [
            'Analyze Spending',
            'Export Data',
            'Dispute Transaction'
          ], {
            type: 'transactions',
            transactions: [
              { id: 1, date: '2025-01-02', description: 'Whole Foods Market', amount: -85.30, type: 'debit', category: 'groceries' },
              { id: 2, date: '2025-01-01', description: 'Salary Credit', amount: 5000.00, type: 'credit', category: 'income' },
              { id: 3, date: '2024-12-31', description: 'Shell Gas Station', amount: -42.50, type: 'debit', category: 'fuel' },
              { id: 4, date: '2024-12-30', description: 'Netflix Subscription', amount: -15.99, type: 'debit', category: 'entertainment' }
            ],
            aiAnalysis: {
              intent: 'transaction_history',
              confidence: 0.96,
              insights: ['Grocery spending within budget', 'Regular income pattern', 'Entertainment expenses optimized']
            }
          });
        } else if (lowerInput.includes('transfer')) {
          addMessage('bot', `💸 **Money Transfer**

I can help you transfer money securely. 

**Available Accounts:**
• Checking: $${userSession.balance.toLocaleString()}
• Savings: $${userSession.savingsBalance.toLocaleString()}

What would you like to do?`, [
            'Transfer $500 to Savings',
            'External Transfer',
            'Pay Bills',
            'View Transfer History'
          ], {
            type: 'transfer_options',
            aiAnalysis: {
              intent: 'money_transfer',
              confidence: 0.92,
              suggestions: ['Consider automatic savings transfers', 'High-yield savings available']
            }
          });
        } else if (lowerInput.includes('investment') || lowerInput.includes('invest')) {
          addMessage('bot', `💼 **Investment Options & Portfolio Analysis**

**Based on your profile: Conservative-Moderate Investor**

**Recommended Investment Mix:**
• **Emergency Fund (3-6 months):** High-yield savings @ 4.2% APY
• **Conservative (40%):** Treasury bonds, CDs (3.8-4.5% return)
• **Moderate (45%):** Index funds, ETFs (7-10% historical return)
• **Growth (15%):** Individual stocks, REITs (10-15% potential)

**Personalized Recommendations:**
1. **Start with $500/month** systematic investment plan
2. **Target allocation:** 60% stocks, 40% bonds (age-appropriate)
3. **Tax-advantaged accounts:** Max out 401(k) match first
4. **Dollar-cost averaging** to reduce market timing risk

**Available Products:**
• SecureBank Investment Portfolio (0.25% fee)
• Robo-advisor with auto-rebalancing
• Self-directed trading platform
• ESG/Sustainable investment options

🤖 **AI Risk Assessment:** Moderate risk tolerance based on spending patterns and age demographics`, [
            'Start Investment Plan',
            'View Portfolio Options',
            'Risk Assessment Quiz',
            'Tax-Advantaged Accounts',
            'Market Analysis'
          ], {
            type: 'investment_analysis',
            aiAnalysis: {
              intent: 'investment_advice',
              confidence: 0.93,
              provider: 'ensemble',
              riskProfile: 'moderate',
              recommendedAllocation: {
                stocks: 60,
                bonds: 30,
                alternatives: 10
              }
            }
          });
        } else if (lowerInput.includes('financial planning') || lowerInput.includes('plan')) {
          addMessage('bot', `📊 **Comprehensive Financial Planning Analysis**

**Your Financial Health Score: 8.2/10**

**Current Position:**
• **Assets:** $21,000 (Checking: $15,750 + Savings: $5,230)
• **Monthly Income:** ~$5,000 (estimated from deposits)
• **Expense Ratio:** 82% (Good - target <80%)
• **Savings Rate:** 18% (Excellent - above 15% target)

**Short-term Goals (1-2 years):**
1. **Emergency Fund:** $15,000 target (currently $5,230)
2. **High-yield Savings:** Move to 4.2% APY account
3. **Debt Optimization:** Consolidate high-interest debt

**Medium-term Goals (3-7 years):**
1. **Home Down Payment:** $40,000-60,000 fund
2. **Investment Portfolio:** $25,000 diversified investments
3. **Career Development:** Professional certification funding

**Long-term Goals (7+ years):**
1. **Retirement Planning:** 401(k) maximization + IRA
2. **Wealth Building:** $500K net worth by age 40
3. **Education Fund:** If applicable for future family

**AI-Powered Action Plan:**
• **Month 1-3:** Build emergency fund to $10,000
• **Month 4-6:** Start $300/month investment plan
• **Year 1:** Optimize all banking products and rates
• **Year 2+:** Increase investment contributions by 10% annually

🤖 **Personalized Insights:** Your financial discipline is above average. Focus on investment growth for wealth building.`, [
            'Create Budget Plan',
            'Retirement Calculator',
            'Goal Setting Wizard',
            'Investment Roadmap',
            'Insurance Review'
          ], {
            type: 'financial_planning',
            aiAnalysis: {
              intent: 'comprehensive_planning',
              confidence: 0.94,
              provider: 'ensemble',
              financialScore: 8.2,
              nextSteps: ['Emergency fund completion', 'Investment diversification', 'Tax optimization']
            }
          });
        } else if (lowerInput.includes('credit') || lowerInput.includes('score')) {
          addMessage('bot', `📈 **Credit Score Optimization & Tips**

**Estimated Credit Score: 742 (Good)**
*Based on banking behavior analysis*

**Score Breakdown:**
• **Payment History (35%):** Excellent ✅
• **Credit Utilization (30%):** Good (22% - target <10%)
• **Credit History Length (15%):** Good (4.2 years average)
• **Credit Mix (10%):** Fair (2 types - add installment loan)
• **New Credit (10%):** Excellent (no recent inquiries)

**Immediate Actions (Next 30 days):**
1. **Pay down credit cards** to under 10% utilization
2. **Request credit limit increase** on existing cards
3. **Set up autopay** for all bills to ensure on-time payments
4. **Check credit report** for errors (free annual check)

**Medium-term Strategy (3-6 months):**
1. **Add authorized user** on family member's old account
2. **Consider secured credit card** if needed for mix
3. **Pay off highest interest debt** first (avalanche method)
4. **Keep old accounts open** to maintain credit history

**Advanced Optimization (6-12 months):**
1. **Apply for rewards credit card** (only if utilization <10%)
2. **Consider personal loan** for credit mix (if beneficial rate)
3. **Negotiate with creditors** for better terms on existing debt
4. **Build business credit** if self-employed

**AI-Predicted Score Improvement:**
• **+23 points** by reducing utilization to 5%
• **+15 points** by adding positive trade line
• **Target Score: 780+** within 12 months

**Credit Monitoring:**
• Free monthly FICO score updates
• Real-time alerts for credit changes
• Identity theft protection included

🤖 **Smart Recommendations:** Focus on utilization reduction for fastest score improvement`, [
            'Credit Report Analysis',
            'Debt Payoff Calculator',
            'Credit Card Recommendations',
            'Dispute Credit Errors',
            'Score Simulator'
          ], {
            type: 'credit_analysis',
            aiAnalysis: {
              intent: 'credit_improvement',
              confidence: 0.91,
              provider: 'ensemble',
              currentScore: 742,
              targetScore: 780,
              improvementPlan: ['Reduce utilization', 'Increase credit history', 'Optimize credit mix']
            }
          });
        } else if (lowerInput.includes('loan') || lowerInput.includes('mortgage') || lowerInput.includes('auto')) {
          addMessage('bot', `🏠 **Loan & Financing Options**

**Pre-qualification Status: Excellent**

**Available Loan Products:**
• **Personal Loan:** $2,000-$50,000 @ 5.99-12.99% APR
• **Auto Loan:** Up to $75,000 @ 3.49-7.99% APR
• **Home Mortgage:** Pre-approved up to $450,000 @ 6.25% APR
• **Home Equity Line:** Up to $85,000 @ 7.15% APR

**Based on your profile:**
• **Debt-to-Income Ratio:** 28% (Excellent - under 36%)
• **Credit Score Estimate:** 742 (Good tier rates)
• **Income Stability:** Strong (regular deposits)
• **Pre-approval Amount:** $450,000 mortgage potential

**Smart Recommendations:**
1. **Auto Loan:** 36-month term saves $2,100 vs 60-month
2. **Personal Loan:** Consolidate high-interest debt first
3. **Mortgage:** Lock rate now - rates trending up
4. **HELOC:** Tax-deductible for home improvements

**Next Steps:**
• Complete full application in 10 minutes
• Get pre-approval letter same day
• Rate lock available for 60 days

🤖 **AI Assessment:** Your strong financial profile qualifies for premium rates across all products`, [
            'Mortgage Pre-approval',
            'Auto Loan Calculator',
            'Personal Loan Options',
            'Rate Comparison Tool'
          ], {
            type: 'loan_analysis',
            aiAnalysis: {
              intent: 'loan_inquiry',
              confidence: 0.89,
              provider: 'ensemble',
              preApprovalAmount: 450000,
              recommendedProducts: ['mortgage', 'auto_loan']
            }
          });
        } else if (lowerInput.includes('advice') || lowerInput.includes('recommend')) {
          addMessage('bot', `📈 **AI Financial Recommendations**

Based on your spending patterns and account history:

**Personalized Insights:**
• Your savings rate is above average (18%)
• Consider high-yield savings (current: 4.2% APY)
• Recurring subscriptions: $45.97/month optimized

**Smart Suggestions:**
1. Automate $200 monthly to emergency fund
2. Credit card rewards optimization available
3. Investment opportunities in low-risk portfolios

🤖 **AI Confidence:** 96.2% accuracy based on 6 months data`, [
            'Setup Auto-Save',
            'Investment Options',
            'Subscription Analysis',
            'Credit Score Tips'
          ], {
            type: 'ai_recommendations',
            aiAnalysis: {
              intent: 'financial_advice',
              confidence: 0.96,
              provider: 'ensemble',
              recommendations: [
                'Emergency fund target: $3,150 (20% of income)',
                'Debt optimization: Save $127/month on credit cards',
                'Investment readiness: High (score: 8.5/10)'
              ]
            }
          });
        } else if (lowerInput.includes('complex') || lowerInput.includes('sentiment')) {
          addMessage('bot', `🧠 **Advanced AI Processing Demo**

**Query Analysis:**
• Natural Language Understanding: ✅
• Context Awareness: ✅  
• Multi-intent Detection: ✅
• Sentiment Analysis: Positive (0.82)

**AI Processing Pipeline:**
1. Speech/Text → OpenAI Whisper
2. Intent Recognition → Ensemble AI
3. Context Memory → Vector Database
4. Response Generation → GPT-4 + Claude
5. Voice Output → Neural TTS

**Demo Results:**
Your query shows sophisticated banking needs with positive sentiment and high confidence intent recognition.`, [
            'Test Voice Processing',
            'Complex Transaction Demo',
            'Multi-step Planning',
            'Technical Details'
          ], {
            type: 'ai_analysis',
            intent: 'complex_query_demo',
            confidence: 0.95,
            provider: 'ensemble',
            technicalDetails: {
              processingTime: '247ms',
              modelAccuracy: '94.7%',
              voiceQuality: '96.1%'
            }
          });
        } else {
          addMessage('bot', `🤖 **AI Response**

I understand you're asking about "${input}". 

As an AI banking assistant, I can help with:
• Account management and balances
• Transaction history and analysis  
• Money transfers and payments
• Financial advice and insights
• Product recommendations

What specific banking task can I assist with?`, [
            'Account Services',
            'Transaction Help', 
            'Financial Planning',
            'Customer Support'
          ], {
            type: 'ai_analysis',
            intent: 'general_inquiry',
            confidence: 0.75,
            provider: 'ensemble'
          });
        }
      }, 1500);
    } else {
      // Handle pre-authentication queries
      addMessage('bot', `🔐 **Authentication Required**

To access your banking information, please authenticate first.

For this demo, try: "Login to my account"`, [
        'Login Demo',
        'Learn About Security',
        'Contact Support'
      ]);
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    addMessage('user', inputText);
    processUserMessage(inputText);
    setInputText('');
    inputRef.current?.focus();
  };

  const handleQuickReply = (reply) => {
    if (reply.includes('Login Demo')) {
      addMessage('user', reply);
      handleDemoLogin();
    } else if (reply.includes('Voice Demo')) {
      addMessage('user', reply);
      handleVoiceDemo();
    } else if (reply.includes('Analytics')) {
      addMessage('user', reply);
      handleAnalyticsDemo();
    } else if (reply.includes('AI Features')) {
      addMessage('user', reply);
      handleAIFeaturesDemo();
    } else if (reply.includes('Investment Options')) {
      addMessage('user', reply);
      processUserMessage('investment options');
    } else if (reply.includes('Financial Planning')) {
      addMessage('user', reply);
      processUserMessage('financial planning');
    } else if (reply.includes('Credit Score Tips')) {
      addMessage('user', reply);
      processUserMessage('credit score tips');
    } else if (reply.includes('Loan Options')) {
      addMessage('user', reply);
      processUserMessage('loan options');
    } else if (reply.includes('Check Balance')) {
      addMessage('user', reply);
      processUserMessage('check balance');
    } else if (reply.includes('Simulate')) {
      addMessage('user', reply);
      const query = reply.includes('Balance') ? 'What is my account balance?' : 'Transfer $200 to savings';
      processUserMessage(query);
    } else if (reply.includes('Settings')) {
      setShowAISettings(true);
    } else {
      addMessage('user', reply);
      processUserMessage(reply);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const simulateVoiceRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      addMessage('user', '🎤 "What\'s my account balance?" (Voice Input)');
      processUserMessage('What is my account balance?');
    }, 2000);
  };

  const renderMessageContent = (message) => {
    if (message.data?.type === 'demo_auth') {
      return (
        <div className="mt-2">
          <div className="text-sm text-gray-600 mb-3 whitespace-pre-line">{message.text}</div>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
            <div className="flex items-center mb-2">
              <Lock className="text-blue-600 mr-2" size={16} />
              <span className="font-medium text-blue-800">Demo Authentication</span>
            </div>
            <div className="text-sm text-blue-700">
              This is a simulated authentication process for demo purposes
            </div>
          </div>
        </div>
      );
    }

    if (message.data?.type === 'demo_otp') {
      return (
        <div className="mt-2">
          <div className="text-sm text-gray-600 mb-3 whitespace-pre-line">{message.text}</div>
          <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
            <div className="flex items-center mb-2">
              <Mail className="text-green-600 mr-2" size={16} />
              <span className="font-medium text-green-800">Demo OTP</span>
            </div>
            <div className="text-sm text-green-700">
              Demo OTP: <span className="font-mono bg-green-100 px-2 py-1 rounded">{message.data.otp}</span>
            </div>
          </div>
        </div>
      );
    }

    if (message.data?.type === 'transactions') {
      return (
        <div className="mt-2">
          <div className="text-sm text-gray-600 mb-2 whitespace-pre-line">{message.text}</div>
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
          {message.data.aiAnalysis && (
            <div className="mt-3 p-2 bg-purple-50 rounded">
              <div className="text-xs font-medium text-purple-800 mb-1">🤖 AI Insights:</div>
              {message.data.aiAnalysis.insights.map((insight, idx) => (
                <div key={idx} className="text-xs text-purple-700">• {insight}</div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (message.data?.aiAnalysis || message.data?.type === 'ai_analysis') {
      const analysis = message.data.aiAnalysis || message.data;
      return (
        <div className="mt-2">
          <div className="text-sm text-gray-600 mb-3 whitespace-pre-line">{message.text}</div>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-purple-800">🤖 AI Analysis</span>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                {Math.round((analysis.confidence || 0.85) * 100)}% confidence
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>Intent: <span className="font-medium">{analysis.intent || 'general_inquiry'}</span></div>
              <div>Provider: <span className="font-medium">{analysis.provider || 'ensemble'}</span></div>
            </div>
            {analysis.technicalDetails && (
              <div className="mt-2 pt-2 border-t border-purple-200">
                <div className="text-xs text-purple-700">
                  Processing: {analysis.technicalDetails.processingTime} • 
                  Accuracy: {analysis.technicalDetails.modelAccuracy}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return <div className="whitespace-pre-line">{message.text}</div>;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Demo Analytics Modal */}
      {showAnalytics && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center">
                <BarChart3 className="mr-2 text-blue-600" size={20} />
                AI Conversation Analytics Demo
              </h3>
              <button onClick={() => setShowAnalytics(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">1,250</div>
                  <div className="text-sm text-gray-600">Total Interactions</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">4.7</div>
                  <div className="text-sm text-gray-600">Satisfaction Score</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">94.5%</div>
                  <div className="text-sm text-gray-600">AI Accuracy</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">62%</div>
                  <div className="text-sm text-gray-600">Voice Usage</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <TrendingUp className="mr-2 text-blue-600" size={16} />
                    AI Performance Metrics
                  </h4>
                  <div className="space-y-3">
                    {[
                      { label: 'Intent Recognition', value: 94.5, color: 'bg-blue-600' },
                      { label: 'Response Relevance', value: 91.2, color: 'bg-green-600' },
                      { label: 'Voice Recognition', value: 96.8, color: 'bg-purple-600' },
                      { label: 'Context Retention', value: 89.3, color: 'bg-orange-600' }
                    ].map((metric, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-sm">{metric.label}</span>
                        <div className="flex items-center">
                          <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className={`${metric.color} h-2 rounded-full`}
                              style={{ width: `${metric.value}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-12">{metric.value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <PieChart className="mr-2 text-green-600" size={16} />
                    Top Customer Intents
                  </h4>
                  <div className="space-y-2">
                    {[
                      { intent: 'Balance Inquiry', count: 450, success: 98 },
                      { intent: 'Money Transfer', count: 320, success: 95 },
                      { intent: 'Transaction History', count: 180, success: 97 },
                      { intent: 'Card Issues', count: 150, success: 92 },
                      { intent: 'Financial Advice', count: 125, success: 89 }
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-sm">{item.intent}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-600">{item.count}</span>
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                            {item.success}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center">
                  <Activity className="mr-2 text-purple-600" size={16} />
                  Real-time AI Insights
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-blue-800">Current Load</div>
                    <div className="text-blue-600">127 active sessions</div>
                    <div className="text-xs text-gray-600">Peak efficiency: 94.2%</div>
                  </div>
                  <div>
                    <div className="font-medium text-green-800">Response Time</div>
                    <div className="text-green-600">247ms average</div>
                    <div className="text-xs text-gray-600">Target: &lt;300ms</div>
                  </div>
                  <div>
                    <div className="font-medium text-purple-800">Model Health</div>
                    <div className="text-purple-600">All systems optimal</div>
                    <div className="text-xs text-gray-600">GPT-4 + Claude ensemble</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowAnalytics(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close Demo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Settings Modal */}
      {showAISettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Brain className="mr-2 text-purple-600" size={20} />
                AI Configuration Demo
              </h3>
              <button onClick={() => setShowAISettings(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">AI Provider</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>Ensemble (OpenAI + Anthropic)</option>
                  <option>OpenAI GPT-4</option>
                  <option>Anthropic Claude</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Voice Recognition</span>
                <input type="checkbox" checked={voiceEnabled} onChange={(e) => setVoiceEnabled(e.target.checked)} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Voice Model</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>Nova (Female)</option>
                  <option>Alloy (Neutral)</option>
                  <option>Echo (Male)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Response Style</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>Professional Banking</option>
                  <option>Friendly Assistant</option>
                  <option>Technical Expert</option>
                </select>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Demo Features Active:</h4>
                <div className="text-xs text-blue-700 space-y-1">
                  <div>✓ Multi-provider AI ensemble</div>
                  <div>✓ Real-time intent recognition</div>
                  <div>✓ Voice synthesis simulation</div>
                  <div>✓ Banking-optimized responses</div>
                  <div>✓ Context-aware conversations</div>
                  <div>✓ Sentiment analysis</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowAISettings(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 bg-blue-800">
          <div className="flex items-center space-x-2">
            <Shield className="text-blue-300" size={24} />
            <h1 className="text-xl font-bold">SecureBank AI</h1>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4">
          {isAuthenticated ? (
            <div className="mb-6 p-3 bg-blue-800 rounded-lg">
              <div className="text-sm opacity-75">Demo User</div>
              <div className="font-semibold">{userSession.username}</div>
              <div className="text-xs opacity-75">{userSession.email}</div>
              <div className="text-xs opacity-75">Account: {userSession.accountNumber}</div>
              <div className="text-xs opacity-75 mt-1 flex items-center">
                <Shield size={12} className="mr-1" />
                AI-Enhanced Demo Session
              </div>
            </div>
          ) : (
            <div className="mb-6 p-3 bg-red-800/50 rounded-lg">
              <div className="text-sm opacity-75">Demo Status</div>
              <div className="font-semibold text-red-200">Ready to Demonstrate</div>
              <div className="text-xs opacity-75 flex items-center mt-1">
                <Lock size={12} className="mr-1" />
                Try login demo
              </div>
            </div>
          )}
          
          <div className="mb-4 p-3 bg-blue-800/50 rounded-lg">
            <div className="text-xs uppercase tracking-wide opacity-75 mb-2">Demo Features</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span>AI Processing</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Voice Demo</span>
                <div className={`w-2 h-2 ${voiceEnabled ? 'bg-green-400' : 'bg-gray-400'} rounded-full`}></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Analytics</span>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Authentication</span>
                <div className={`w-2 h-2 ${isAuthenticated ? 'bg-green-400' : 'bg-yellow-400'} rounded-full`}></div>
              </div>
            </div>
          </div>
          
          <nav className="space-y-2">
            <div className="text-xs uppercase tracking-wide opacity-75 mb-2">Demo Actions</div>
            {[
              { icon: Lock, label: 'Login Demo' },
              { icon: DollarSign, label: 'Check Balance' },
              { icon: Briefcase, label: 'Investment Options' },
              { icon: TrendingUp, label: 'Financial Planning' },
              { icon: CreditCard, label: 'Credit Score Tips' },
              { icon: Mic, label: 'Voice Demo' },
              { icon: BarChart3, label: 'View Analytics' },
              { icon: Settings, label: 'AI Settings' }
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickReply(item.label + ' Demo')}
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
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h2 className="font-semibold flex items-center">
                  AI Banking Assistant
                  <Brain size={16} className="ml-2 text-purple-600" />
                  <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">DEMO</span>
                </h2>
                <div className="text-xs text-gray-500 flex items-center">
                  <span className="mr-2">
                    {isAuthenticated ? `Connected as ${userSession.username}` : 'Demo Mode'}
                  </span>
                  {aiProcessing && (
                    <>
                      <Zap size={12} className="mr-1 text-orange-500" />
                      <span className="text-orange-600">AI Processing...</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {voiceEnabled && (
              <button
                onClick={simulateVoiceRecording}
                disabled={isRecording}
                className={`p-2 rounded-lg transition-colors ${
                  isRecording 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
              >
                {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
            )}
            <div className="flex items-center space-x-1 text-xs bg-gray-100 px-3 py-2 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>GPT-4 + Claude</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                message.type === 'user' ? 'order-2' : 'order-1'
              }`}>
                <div className={`flex items-start space-x-2 ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  
                  <div className={`rounded-lg px-4 py-2 ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white border border-gray-200'
                  }`}>
                    {renderMessageContent(message)}
                    
                    <div className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                {/* Quick Replies */}
                {message.quickReplies && message.quickReplies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Bot size={16} className="text-gray-600" />
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isAuthenticated ? "Type your banking question..." : "Try 'Login Demo' to start"}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {voiceEnabled && (
                <button
                  onClick={simulateVoiceRecording}
                  disabled={isRecording}
                  className={`absolute right-2 top-2 p-1 rounded ${
                    isRecording 
                      ? 'text-red-600' 
                      : 'text-gray-400 hover:text-blue-600'
                  }`}
                >
                  <Mic size={16} />
                </button>
              )}
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <div className="flex items-center space-x-3">
              <span>🤖 AI Demo Mode</span>
              {aiProcessing && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span>Processing with {demoMode === 'live' ? 'Ensemble AI' : 'GPT-4'}</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span>Press Enter to send</span>
              {voiceEnabled && <span>• Voice enabled</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankingChatbot;