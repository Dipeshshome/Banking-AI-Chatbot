import React from 'react';
import { Menu, Bot, Brain, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAI } from '../../context/AIContext';
import { formatCurrency } from '../../utils/formatters';

const Header = ({ onMenuClick }) => {
  const { user, isAuthenticated } = useAuth();
  const { aiMetrics } = useAI();

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button onClick={onMenuClick} className="lg:hidden">
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
              <Zap size={12} className="ml-1 mr-1 text-green-500" />
              <span className="text-green-600">Ready</span>
            </div>
          </div>
        </div>
      </div>
      
      {isAuthenticated && user && (
        <div className="text-right">
          <div className="text-sm font-medium">
            Balance: {formatCurrency(user.balance)}
          </div>
          <div className="text-xs text-gray-500">
            Processed: {aiMetrics.totalProcessed} queries
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;