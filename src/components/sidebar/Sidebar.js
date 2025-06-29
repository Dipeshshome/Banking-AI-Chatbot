import React from 'react';
import { X, Brain, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import UserProfile from './UserProfile';
import QuickActions from './QuickActions';

const Sidebar = ({ isOpen, onClose }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between h-16 px-4 bg-blue-800">
        <div className="flex items-center space-x-2">
          <Brain className="text-blue-300" size={24} />
          <h1 className="text-xl font-bold">AI Banking</h1>
        </div>
        <button onClick={onClose} className="lg:hidden">
          <X size={24} />
        </button>
      </div>
      
      <div className="p-4">
        {isAuthenticated && <UserProfile />}
        
        <div className="mb-4 p-3 bg-blue-800/50 rounded-lg">
          <div className="text-xs uppercase tracking-wide opacity-75 mb-2">AI Capabilities</div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center"><CheckCircle size={12} className="mr-2" /> Natural Language</div>
            <div className="flex items-center"><CheckCircle size={12} className="mr-2" /> Intent Recognition</div>
            <div className="flex items-center"><CheckCircle size={12} className="mr-2" /> Sentiment Analysis</div>
            <div className="flex items-center"><CheckCircle size={12} className="mr-2" /> Predictive Insights</div>
          </div>
        </div>
        
        <QuickActions />
      </div>
    </div>
  );
};

export default Sidebar;