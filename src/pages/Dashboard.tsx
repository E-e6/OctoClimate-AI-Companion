import React from 'react';
import { useApp } from '../context/AppContext';
import { QuickStats } from '../components/QuickStats';
import { OctopusVisualization } from '../components/OctopusVisualization';
import { TodaysRecommendations } from '../components/TodaysRecommendations';
import { ImpactChart } from '../components/ImpactChart';
import { Trophy, Sparkles } from 'lucide-react';

export function Dashboard() {
  const { state } = useApp();
  
  if (!state.user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🐙</span>
          </div>
          <h2 className="mb-2">Welcome to OctoClimate!</h2>
          <p className="text-gray-600 mb-6">
            Your AI-powered climate companion is ready to help you reduce your carbon footprint. 
            Let's start by setting up your profile.
          </p>
          <button
            onClick={() => state.dispatch({ type: 'SET_PAGE', payload: 'profile' })}
            className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-teal-700 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  const latestAchievement = state.achievements
    .filter(a => a.earned)
    .sort((a, b) => (b.earnedAt?.getTime() || 0) - (a.earnedAt?.getTime() || 0))[0];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {state.user.name}! 🌊
            </h1>
            <p className="text-cyan-100">
              Ready to make a positive impact today? Your climate journey continues.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">🐙</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Octopus Visualization */}
        <div>
          <OctopusVisualization />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Latest Achievement */}
          {latestAchievement && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Latest Achievement</h3>
                  <p className="text-sm text-gray-600">Earned {latestAchievement.earnedAt?.toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{latestAchievement.badgeIcon}</span>
                <div>
                  <div className="font-medium text-gray-900">{latestAchievement.name}</div>
                  <div className="text-sm text-gray-600">{latestAchievement.description}</div>
                </div>
              </div>
            </div>
          )}

          {/* AI Assistant Prompt */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">AI Assistant</h3>
                <p className="text-sm text-gray-600">Get personalized climate advice</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Having trouble with today's recommendations? Need alternatives that fit your lifestyle? 
              Our AI assistant knows your profile and can provide personalized suggestions.
            </p>
            <button
              onClick={() => state.dispatch({ type: 'SET_CHAT_OPEN', payload: true })}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:from-purple-600 hover:to-indigo-700 transition-colors"
            >
              Start Conversation
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Recommendations */}
        <TodaysRecommendations />
        
        {/* Impact Chart */}
        <ImpactChart />
      </div>
    </div>
  );
}