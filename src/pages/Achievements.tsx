import React from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Trophy, Target, Zap, Star, Crown } from 'lucide-react';

export function Achievements() {
  const { state } = useApp();

  const totalCarbonSaved = state.activities.reduce((sum, activity) => sum + activity.carbonSaved, 0);
  const completedActions = state.activities.length;
  const earnedBadges = state.achievements.filter(a => a.earned).length;

  const tierColors = {
    'first-step': 'from-green-400 to-green-600',
    'week-warrior': 'from-blue-400 to-blue-600',
    'eco-champion': 'from-purple-400 to-purple-600',
    'climate-hero': 'from-orange-400 to-orange-600',
    'earth-guardian': 'from-yellow-400 to-yellow-600',
  };

  const tierIcons = {
    'first-step': Target,
    'week-warrior': Zap,
    'eco-champion': Trophy,
    'climate-hero': Star,
    'earth-guardian': Crown,
  };

  const getBadgeProgress = (achievement: any) => {
    if (achievement.earned) return 100;
    return Math.min(100, (totalCarbonSaved / achievement.requirement) * 100);
  };

  const getNextBadge = () => {
    return state.achievements.find(a => !a.earned);
  };

  const nextBadge = getNextBadge();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="mb-2">Your Climate Achievements</h1>
        <p className="text-gray-600">
          Track your progress and earn badges for your climate actions
        </p>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">
              {totalCarbonSaved.toFixed(1)}kg
            </div>
            <div className="text-sm text-gray-600">Total CO₂ Saved</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {earnedBadges}/5
            </div>
            <div className="text-sm text-gray-600">Badges Earned</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {completedActions}
            </div>
            <div className="text-sm text-gray-600">Actions Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Next Badge Progress */}
      {nextBadge && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <span>Next Achievement</span>
            </CardTitle>
            <CardDescription>You're making great progress!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{nextBadge.badgeIcon}</div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">{nextBadge.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{nextBadge.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{totalCarbonSaved.toFixed(1)}kg of {nextBadge.requirement}kg saved</span>
                    <span>{getBadgeProgress(nextBadge).toFixed(0)}%</span>
                  </div>
                  <Progress value={getBadgeProgress(nextBadge)} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Achievement Badges</CardTitle>
          <CardDescription>
            Unlock badges by saving CO₂ through your climate actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.achievements.map((achievement) => {
              const TierIcon = tierIcons[achievement.tier];
              const isEarned = achievement.earned;
              const progress = getBadgeProgress(achievement);
              
              return (
                <Card
                  key={achievement.id}
                  className={`transition-all ${
                    isEarned 
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-md' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    {/* Badge Icon */}
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                      isEarned 
                        ? `bg-gradient-to-r ${tierColors[achievement.tier]} shadow-lg transform scale-110` 
                        : 'bg-gray-300'
                    }`}>
                      {isEarned ? (
                        <div className="text-2xl">{achievement.badgeIcon}</div>
                      ) : (
                        <TierIcon className="w-8 h-8 text-gray-500" />
                      )}
                    </div>

                    {/* Badge Info */}
                    <h3 className={`font-medium mb-2 ${isEarned ? 'text-gray-900' : 'text-gray-500'}`}>
                      {achievement.name}
                    </h3>
                    <p className={`text-sm mb-4 ${isEarned ? 'text-gray-600' : 'text-gray-400'}`}>
                      {achievement.description}
                    </p>

                    {/* Progress or Earned Date */}
                    {isEarned ? (
                      <div className="space-y-2">
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          ✨ Earned
                        </Badge>
                        {achievement.earnedAt && (
                          <p className="text-xs text-gray-500">
                            {achievement.earnedAt.toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-xs text-gray-500">
                          {totalCarbonSaved.toFixed(1)}kg / {achievement.requirement}kg CO₂
                        </div>
                        <Progress value={progress} className="h-2" />
                        <div className="text-xs text-gray-500">
                          {progress.toFixed(0)}% complete
                        </div>
                      </div>
                    )}

                    {/* Requirement */}
                    <div className="mt-4 p-2 bg-white/50 rounded-lg">
                      <div className="text-xs text-gray-600">
                        Requirement: {achievement.requirement}kg CO₂ saved
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Impact Summary */}
      <Card className="bg-gradient-to-r from-cyan-50 to-teal-50 border-cyan-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Crown className="w-5 h-5 text-cyan-600" />
            <span>Your Climate Impact</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-600 mb-1">
                {(totalCarbonSaved * 52).toFixed(0)}kg
              </div>
              <div className="text-sm text-gray-600">Annual CO₂ savings</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600 mb-1">
                {Math.round(totalCarbonSaved * 52 / 22)}
              </div>
              <div className="text-sm text-gray-600">Trees equivalent/year</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {Math.round(totalCarbonSaved * 52 / 2300)}
              </div>
              <div className="text-sm text-gray-600">Cars off road/year</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white/60 rounded-lg text-center">
            <p className="text-sm text-gray-700">
              🌱 Keep up the amazing work! Every action you take helps create a more sustainable future. 
              Share your achievements with friends to inspire them to start their climate journey too!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Achievement Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Achievement Tips</CardTitle>
          <CardDescription>How to earn badges faster</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">🎯 Focus on High-Impact Actions</h4>
              <p className="text-sm text-blue-700">
                Transportation and energy actions typically save the most CO₂. 
                Prioritize these for faster badge progress.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">🔄 Build Daily Habits</h4>
              <p className="text-sm text-green-700">
                Small daily actions add up quickly. Complete 2-3 easy actions 
                every day to maintain momentum.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">🤖 Use AI Assistance</h4>
              <p className="text-sm text-purple-700">
                Ask our AI assistant for personalized suggestions when you're 
                stuck or need alternatives to recommended actions.
              </p>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-900 mb-2">📈 Track Progress</h4>
              <p className="text-sm text-orange-700">
                Check your dashboard regularly to see progress and stay motivated. 
                Celebrate small wins along the way!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}