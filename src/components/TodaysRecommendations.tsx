import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Check, RefreshCw, Leaf, Car, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { CATEGORY_COLORS, DIFFICULTY_COLORS, Recommendation } from '../types';

export function TodaysRecommendations() {
  const { state, dispatch } = useApp();

  // Sample recommendations - would be AI-generated based on user profile
  const sampleRecommendations: Recommendation[] = [
    {
      id: '1',
      action: 'Walk or bike for trips under 2km',
      category: 'transport',
      carbonSaving: 2.1,
      difficulty: 'easy',
      frequency: 'daily',
      description: 'Replace short car trips with walking or cycling',
      completed: false,
    },
    {
      id: '2', 
      action: 'Unplug electronics when not in use',
      category: 'energy',
      carbonSaving: 0.8,
      difficulty: 'easy',
      frequency: 'daily',
      description: 'Prevent phantom energy drain from standby devices',
      completed: false,
    },
    {
      id: '3',
      action: 'Choose plant-based meal today',
      category: 'diet',
      carbonSaving: 1.5,
      difficulty: 'medium',
      frequency: 'daily',
      description: 'Replace one meat-based meal with a plant-based alternative',
      completed: false,
    },
  ];

  // Initialize recommendations if empty
  useEffect(() => {
    if (state.recommendations.length === 0) {
      dispatch({ type: 'SET_RECOMMENDATIONS', payload: sampleRecommendations });
    }
  }, [state.recommendations.length, dispatch]);

  const todaysRecommendations = state.recommendations.slice(0, 3);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transport': return Car;
      case 'energy': return Zap;
      case 'diet': return Leaf;
      default: return Leaf;
    }
  };

  const handleComplete = (recommendationId: string) => {
    dispatch({ type: 'COMPLETE_RECOMMENDATION', payload: recommendationId });
  };

  const refreshRecommendations = () => {
    // In a real app, this would fetch new AI-generated recommendations
    const newRecommendations = [
      {
        id: Date.now().toString(),
        action: 'Take shorter showers (5 minutes max)',
        category: 'water' as const,
        carbonSaving: 1.2,
        difficulty: 'easy' as const,
        frequency: 'daily' as const,
        description: 'Reduce hot water usage to save energy and water',
        completed: false,
      },
      {
        id: (Date.now() + 1).toString(),
        action: 'Use reusable bags for shopping',
        category: 'shopping' as const,
        carbonSaving: 0.5,
        difficulty: 'easy' as const,
        frequency: 'weekly' as const,
        description: 'Avoid single-use plastic bags',
        completed: false,
      },
      {
        id: (Date.now() + 2).toString(),
        action: 'Switch to cold water washing',
        category: 'energy' as const,
        carbonSaving: 2.3,
        difficulty: 'medium' as const,
        frequency: 'weekly' as const,
        description: 'Use cold water for laundry to reduce energy consumption',
        completed: false,
      },
    ];
    
    dispatch({ type: 'SET_RECOMMENDATIONS', payload: newRecommendations });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="mb-1">Today's AI Recommendations</h2>
          <p className="text-gray-600">Personalized actions to reduce your footprint</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={refreshRecommendations}
          className="flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </Button>
      </div>

      <div className="space-y-4">
        {todaysRecommendations.map((recommendation) => {
          const CategoryIcon = getCategoryIcon(recommendation.category);
          const isCompleted = recommendation.completed;
          
          return (
            <div
              key={recommendation.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                isCompleted
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${CATEGORY_COLORS[recommendation.category]} flex items-center justify-center flex-shrink-0`}>
                    <CategoryIcon className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`font-medium ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {recommendation.action}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${DIFFICULTY_COLORS[recommendation.difficulty]} bg-gray-100`}>
                        {recommendation.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      {recommendation.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>💚 {recommendation.carbonSaving}kg CO₂ saved</span>
                      <span>📅 {recommendation.frequency}</span>
                    </div>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  onClick={() => handleComplete(recommendation.id)}
                  disabled={isCompleted}
                  className={`ml-4 ${
                    isCompleted
                      ? 'bg-green-600 hover:bg-green-600'
                      : 'bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Done
                    </>
                  ) : (
                    'Complete'
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl">
        <p className="text-sm text-gray-700">
          💡 Need help with these actions? Chat with our AI assistant for personalized alternatives and tips!
        </p>
      </div>
    </div>
  );
}