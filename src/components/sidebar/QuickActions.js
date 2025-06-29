import React from 'react';
import { DollarSign, CreditCard, MapPin, Phone, AlertCircle } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

const QuickActions = () => {
  const { addMessage } = useChat();

  const actions = [
    { icon: DollarSign, label: 'Check Balance' },
    { icon: CreditCard, label: 'Recent Transactions' },
    { icon: MapPin, label: 'Find ATM' },
    { icon: Phone, label: 'Customer Support' },
    { icon: AlertCircle, label: 'Block Card' }
  ];

  const handleQuickAction = (label) => {
    addMessage('user', label);
  };

  return (
    <nav className="space-y-2">
      <div className="text-xs uppercase tracking-wide opacity-75 mb-2">Quick Actions</div>
      {actions.map((action, idx) => (
        <button
          key={idx}
          onClick={() => handleQuickAction(action.label)}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-blue-800/50 transition-colors"
        >
          <action.icon size={18} />
          <span className="text-sm">{action.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default QuickActions;