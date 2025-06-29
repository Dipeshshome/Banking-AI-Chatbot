import { INTENTS, SENTIMENT_TYPES, AI_CONFIG } from '../utils/constants';
import { delay } from '../utils/helpers';

class AIEngine {
  constructor() {
    this.intentPatterns = {
      [INTENTS.BALANCE_INQUIRY]: ['balance', 'money', 'account', 'how much', 'current balance', 'available funds'],
      [INTENTS.TRANSACTION_HISTORY]: ['transaction', 'history', 'spending', 'purchases', 'recent', 'statement'],
      [INTENTS.MONEY_TRANSFER]: ['transfer', 'send money', 'pay', 'move money', 'wire', 'remit'],
      [INTENTS.CARD_ISSUE]: ['card', 'not working', 'declined', 'blocked', 'stolen', 'lost'],
      [INTENTS.FRAUD_CONCERN]: ['fraud', 'unauthorized', 'suspicious', 'not me', 'didn\'t make', 'strange'],
      [INTENTS.LOCATION_SERVICE]: ['atm', 'branch', 'near', 'location', 'address', 'find'],
      [INTENTS.BILL_PAYMENT]: ['bill', 'pay', 'utility', 'electricity', 'water', 'internet'],
      [INTENTS.LOAN_INQUIRY]: ['loan', 'borrow', 'credit', 'mortgage', 'emi', 'interest'],
      [INTENTS.FINANCIAL_ADVICE]: ['advice', 'save', 'invest', 'budget', 'plan', 'recommend'],
      [INTENTS.CUSTOMER_SUPPORT]: ['help', 'support', 'problem', 'issue', 'complaint', 'escalate']
    };

    this.positiveWords = ['good', 'great', 'excellent', 'happy', 'satisfied', 'thank', 'perfect'];
    this.negativeWords = ['bad', 'terrible', 'frustrated', 'angry', 'disappointed', 'problem', 'issue', 'wrong'];
  }

  async processMessage(message, context = {}) {
    // Simulate AI processing delay
    await delay(AI_CONFIG.PROCESSING_DELAY);

    const intent = this.classifyIntent(message);
    const entities = this.extractEntities(message, intent);
    const sentiment = this.analyzeSentiment(message);

    return {
      intent,
      entities,
      sentiment,
      context: {
        ...context,
        lastIntent: intent.name,
        entities: { ...context.entities, ...entities },
        sentiment,
        conversationFlow: [...(context.conversationFlow || []), intent.name]
      }
    };
  }

  classifyIntent(text) {
    const lowerText = text.toLowerCase();
    let bestIntent = { name: INTENTS.UNKNOWN, confidence: 0 };

    for (const [intentName, patterns] of Object.entries(this.intentPatterns)) {
      let score = 0;
      patterns.forEach(pattern => {
        if (lowerText.includes(pattern)) {
          score += pattern.length / lowerText.length;
        }
      });

      const confidence = Math.min(score, 1.0);
      if (confidence > bestIntent.confidence) {
        bestIntent = { name: intentName, confidence };
      }
    }

    return bestIntent.confidence > AI_CONFIG.CONFIDENCE_THRESHOLD ? bestIntent : { name: INTENTS.UNKNOWN, confidence: 0 };
  }

  extractEntities(text, intent) {
    const entities = {};
    const lowerText = text.toLowerCase();

    // Extract amounts
    const amountRegex = /\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/g;
    const amounts = [...text.matchAll(amountRegex)];
    if (amounts.length > 0) {
      entities.amount = parseFloat(amounts[0][1].replace(',', ''));
    }

    // Extract account types
    if (lowerText.includes('checking')) entities.accountType = 'checking';
    if (lowerText.includes('savings')) entities.accountType = 'savings';
    if (lowerText.includes('credit')) entities.accountType = 'credit';

    // Extract time references
    if (lowerText.includes('today')) entities.timeframe = 'today';
    if (lowerText.includes('yesterday')) entities.timeframe = 'yesterday';
    if (lowerText.includes('week')) entities.timeframe = 'week';
    if (lowerText.includes('month')) entities.timeframe = 'month';

    // Extract card references
    if (lowerText.includes('debit')) entities.cardType = 'debit';
    if (lowerText.includes('credit')) entities.cardType = 'credit';

    return entities;
  }

  analyzeSentiment(text) {
    const lowerText = text.toLowerCase();
    let score = 0;

    this.positiveWords.forEach(word => {
      if (lowerText.includes(word)) score += 1;
    });

    this.negativeWords.forEach(word => {
      if (lowerText.includes(word)) score -= 1;
    });

    if (score > 0) return SENTIMENT_TYPES.POSITIVE;
    if (score < 0) return SENTIMENT_TYPES.NEGATIVE;
    return SENTIMENT_TYPES.NEUTRAL;
  }

  generateResponse(intent, entities, sentiment, userSession) {
    // This would contain the response generation logic
    // Similar to what we had in the original component
    return {
      text: "AI response based on intent and entities",
      quickReplies: [],
      data: null
    };
  }
}

export const aiEngine = new AIEngine();