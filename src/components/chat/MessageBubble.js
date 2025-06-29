import React from 'react';
import { User, Brain } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import QuickReplies from './QuickReplies';
import { MESSAGE_TYPES } from '../../utils/constants';
import { formatTime } from '../../utils/helpers';

const MessageBubble = ({ message }) => {
  const { addMessage } = useChat();
  const isUser = message.type === MESSAGE_TYPES.USER;

  const handleQuickReply = (reply) => {
    addMessage(MESSAGE_TYPES.USER, reply);
  };

  const renderMessageContent = () => {
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
          
          {message.data.analysis && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-800 mb-2">AI Spending Analysis</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(message.data.analysis).map(([category, amount]) => (
                  <div key={category} className="flex justify-between">
                    <span className="capitalize">{category}:</span>
                    <span className="font-medium">${amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    if (message.data?.type === 'financial_advice') {
      return (
        <div className="mt-2">
          <div className="text-sm text-gray-600 mb-2">{message.text}</div>
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-3">
            <div className="text-sm font-medium text-blue-800 mb-2">AI-Powered Recommendations</div>
            <div className="space-y-2">
              {message.data.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 text-xs text-gray-600">
              Monthly spending: ${message.data.spendingTotal.toFixed(2)} | 
              Savings rate: {message.data.savingsRate.toFixed(1)}%
            </div>
          </div>
        </div>
      );
    }

    return <div className="whitespace-pre-wrap">{message.text}</div>;
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`chat-message flex items-start space-x-2 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-blue-600 text-white' : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
        }`}>
          {isUser ? <User size={16} /> : <Brain size={16} />}
        </div>
        
        {/* Message Content */}
        <div className={`rounded-lg px-4 py-2 ${
          isUser ? 'message-user' : 'message-bot'
        }`}>
          {renderMessageContent()}
          
          {/* AI Processing Info */}
          {message.aiProcessing && !isUser && (
            <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">AI Analysis:</span>
                <span className="text-gray-500">{message.aiProcessing.processingTime}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Intent: <span className="font-medium">{message.aiProcessing.intent}</span></div>
                <div>Confidence: <span className="font-medium">{(message.aiProcessing.confidence * 100).toFixed(0)}%</span></div>
                <div>Sentiment: <span className="font-medium capitalize">{message.aiProcessing.sentiment}</span></div>
                <div>Entities: <span className="font-medium">{Object.keys(message.aiProcessing.entities || {}).length}</span></div>
              </div>
            </div>
          )}
          
          {/* Quick Replies */}
          {message.quickReplies && message.quickReplies.length > 0 && (
            <QuickReplies replies={message.quickReplies} onReply={handleQuickReply} />
          )}
          
          {/* Timestamp */}
          <div className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;