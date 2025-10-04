import React from 'react';
import { useApp } from '../context/AppContext';
import { Play, Home, User, Target, Trophy } from 'lucide-react';

export function Navigation() {
  const { state, dispatch } = useApp();

  const navItems = [
    { id: 'get-started', label: 'Get Started', icon: Play },
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'recommendations', label: 'Actions', icon: Target },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
  ] as const;

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">🐙</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
            OctoClimate
          </h1>
        </div>
        
        <div className="flex items-center space-x-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => dispatch({ type: 'SET_PAGE', payload: id })}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                state.currentPage === id
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden md:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}