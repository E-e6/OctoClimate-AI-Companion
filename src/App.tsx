import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { ChatWidget } from './components/ChatWidget';
import { GetStarted } from './pages/GetStarted';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { Recommendations } from './pages/Recommendations';
import { Achievements } from './pages/Achievements';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const { state } = useApp();

  const renderCurrentPage = () => {
    switch (state.currentPage) {
      case 'get-started':
        return <GetStarted />;
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <Profile />;
      case 'recommendations':
        return <Recommendations />;
      case 'achievements':
        return <Achievements />;
      default:
        return <GetStarted />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderCurrentPage()}
      </main>

      <ChatWidget />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}