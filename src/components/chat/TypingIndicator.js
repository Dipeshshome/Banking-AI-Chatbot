import React from 'react';
import { Brain } from 'lucide-react';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="flex items-start space-x-2">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center">
          <Brain size={16} />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot" style={{ animationDelay: '0.1s' }}></div>
            <div className="typing-dot" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;