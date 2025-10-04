import React from 'react';
import { useApp } from '../context/AppContext';
import { TrendingDown, Zap, Trophy, Flame } from 'lucide-react';

export function QuickStats() {
  const { state } = useApp();
  
  const totalCarbonSaved = state.activities.reduce((sum, activity) => sum + activity.carbonSaved, 0);
  const earnedAchievements = state.achievements.filter(a => a.earned).length;
  const currentStreak = 7; // Mock data - would calculate based on daily activities
  
  // Calculate this week's savings
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeekSavings = state.activities
    .filter(activity => activity.completedAt >= oneWeekAgo)
    .reduce((sum, activity) => sum + activity.carbonSaved, 0);

  const stats = [
    {
      title: 'Current Footprint',
      value: `${state.user?.currentFootprint || 45.2}kg`,
      subtitle: 'CO₂ per week',
      icon: TrendingDown,
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50',
    },
    {
      title: 'Saved This Week',
      value: `${thisWeekSavings.toFixed(1)}kg`,
      subtitle: 'CO₂ reduced',
      icon: Zap,
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50',
    },
    {
      title: 'Achievements',
      value: `${earnedAchievements}/5`,
      subtitle: 'badges earned',
      icon: Trophy,
      gradient: 'from-yellow-500 to-orange-600',
      bgGradient: 'from-yellow-50 to-orange-50',
    },
    {
      title: 'Daily Streak',
      value: `${currentStreak}`,
      subtitle: 'days active',
      icon: Flame,
      gradient: 'from-red-500 to-pink-600',
      bgGradient: 'from-red-50 to-pink-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div 
          key={stat.title}
          className={`bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-6 border border-white/20 shadow-sm hover:shadow-md transition-shadow`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-sm`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.subtitle}
              </div>
            </div>
          </div>
          <h3 className="text-gray-700 font-medium">{stat.title}</h3>
        </div>
      ))}
    </div>
  );
}