import React from 'react';
import { User, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatAccountNumber } from '../../utils/formatters';

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="mb-6 p-3 bg-blue-800 rounded-lg">
      <div className="flex items-center space-x-3 mb-2">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <User size={20} />
        </div>
        <div>
          <div className="font-semibold">{user.username}</div>
          <div className="text-xs opacity-75">{formatAccountNumber(user.accountNumber)}</div>
        </div>
      </div>
      <div className="text-xs opacity-75 flex items-center">
        <Zap size={12} className="mr-1" />
        AI-Enhanced Experience Active
      </div>
    </div>
  );
};

export default UserProfile;