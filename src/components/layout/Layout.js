import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../sidebar/Sidebar';
import Header from './Header';
import ChatWindow from '../chat/ChatWindow';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <ChatWindow />
      </div>
    </div>
  );
};

export default Layout;