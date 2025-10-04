import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Check, RefreshCw, Car, Zap, Leaf, Droplets, Trash2, RotateCcw, ShoppingBag, Smartphone, Filter } from 'lucide-react';
import { CATEGORY_COLORS, DIFFICULTY_COLORS, Recommendation } from '../types';

export function Recommendations() {
  const { state, dispatch } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Actions', icon: Filter },
    { id: 'transport', label: 'Transport', icon: Car },
    { id: 'energy', label: 'Energy', icon: Zap },
    { id: 'diet', label: 'Diet', icon: Leaf },
    { id: 'water', label: 'Water', icon: Droplets },
    { id: 'waste', label: 'Waste', icon: Trash2 },
    { id: 'recycling', label: 'Recycling', icon: RotateCcw },
    { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
    { id: 'digital', label: 'Digital', icon: Smartphone },
  ];

  // Sample comprehensive recommendations
  const allRecommendations: Recommendation[] = [
    // Transport
    {
      id: 'transport-1',
      action: 'Walk or bike for trips under 2km',
      category: 'transport',
      carbonSaving: 2.1,
      difficulty: 'easy',
      frequency: 'daily',
      description: 'Replace short car trips with walking or cycling to reduce emissions and improve health',
      completed: false,
    },
    {
      id: 'transport-2',
      action: 'Use public transport for commuting',
      category: 'transport',
      carbonSaving: 4.2,
      difficulty: 'medium',
      frequency: 'daily',
      description: 'Take buses, trains, or metro instead of driving to work',
      completed: false,
    },
    {
      id: 'transport-3',
      action: 'Join a carpooling group',
      category: 'transport',
      carbonSaving: 3.5,
      difficulty: 'medium',
      frequency: 'weekly',
      description: 'Share rides with colleagues or neighbors for regular trips',
      completed: false,
    },
    {
      id: 'transport-4',
      action: 'Work from home 2 days per week',
      category: 'transport',
      carbonSaving: 6.8,
      difficulty: 'hard',
      frequency: 'weekly',
      description: 'Negotiate remote work to eliminate commute emissions',
      completed: false,
    },

    // Energy
    {
      id: 'energy-1',
      action: 'Unplug electronics when not in use',
      category: 'energy',
      carbonSaving: 0.8,
      difficulty: 'easy',
      frequency: 'daily',
      description: 'Prevent phantom energy drain from standby devices',
      completed: false,
    },
    {
      id: 'energy-2',
      action: 'Switch to LED bulbs',
      category: 'energy',
      carbonSaving: 1.2,
      difficulty: 'easy',
      frequency: 'one-time',
      description: 'Replace incandescent and CFL bulbs with energy-efficient LEDs',
      completed: false,
    },
    {
      id: 'energy-3',
      action: 'Lower thermostat by 2°C in winter',
      category: 'energy',
      carbonSaving: 3.4,
      difficulty: 'medium',
      frequency: 'daily',
      description: 'Reduce heating energy consumption without sacrificing comfort',
      completed: false,
    },
    {
      id: 'energy-4',
      action: 'Install smart power strips',
      category: 'energy',
      carbonSaving: 1.8,
      difficulty: 'medium',
      frequency: 'one-time',
      description: 'Automatically cut power to devices in standby mode',
      completed: false,
    },

    // Diet
    {
      id: 'diet-1',
      action: 'Choose plant-based meal today',
      category: 'diet',
      carbonSaving: 1.5,
      difficulty: 'medium',
      frequency: 'daily',
      description: 'Replace one meat-based meal with a plant-based alternative',
      completed: false,
    },
    {
      id: 'diet-2',
      action: 'Reduce food waste by meal planning',
      category: 'diet',
      carbonSaving: 2.1,
      difficulty: 'medium',
      frequency: 'weekly',
      description: 'Plan meals in advance to avoid food spoilage and waste',
      completed: false,
    },
    {
      id: 'diet-3',
      action: 'Buy local and seasonal produce',
      category: 'diet',
      carbonSaving: 1.8,
      difficulty: 'easy',
      frequency: 'weekly',
      description: 'Choose locally grown, in-season fruits and vegetables',
      completed: false,
    },
    {
      id: 'diet-4',
      action: 'Start composting food scraps',
      category: 'diet',
      carbonSaving: 1.3,
      difficulty: 'hard',
      frequency: 'daily',
      description: 'Turn food waste into nutrient-rich soil amendment',
      completed: false,
    },

    // Water
    {
      id: 'water-1',
      action: 'Take 5-minute showers',
      category: 'water',
      carbonSaving: 1.2,
      difficulty: 'easy',
      frequency: 'daily',
      description: 'Reduce hot water usage to save energy and water',
      completed: false,
    },
    {
      id: 'water-2',
      action: 'Fix leaky faucets and toilets',
      category: 'water',
      carbonSaving: 0.9,
      difficulty: 'medium',
      frequency: 'one-time',
      description: 'Repair water leaks to prevent waste',
      completed: false,
    },
    {
      id: 'water-3',
      action: 'Install low-flow showerheads',
      category: 'water',
      carbonSaving: 1.6,
      difficulty: 'medium',
      frequency: 'one-time',
      description: 'Reduce water flow without compromising shower experience',
      completed: false,
    },
    {
      id: 'water-4',
      action: 'Use cold water for laundry',
      category: 'water',
      carbonSaving: 2.3,
      difficulty: 'easy',
      frequency: 'weekly',
      description: 'Wash clothes in cold water to reduce energy consumption',
      completed: false,
    },
  ];

  // Initialize recommendations if empty
  useEffect(() => {
    if (state.recommendations.length === 0) {
      dispatch({ type: 'SET_RECOMMENDATIONS', payload: allRecommendations });
    }
  }, [state.recommendations.length, dispatch]);

  const filteredRecommendations = activeCategory === 'all' 
    ? state.recommendations 
    : state.recommendations.filter(rec => rec.category === activeCategory);

  const completedCount = state.recommendations.filter(rec => rec.completed).length;
  const totalSaved = state.recommendations
    .filter(rec => rec.completed)
    .reduce((sum, rec) => sum + rec.carbonSaving, 0);

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData?.icon || Filter;
  };

  const handleComplete = (recommendationId: string) => {
    dispatch({ type: 'COMPLETE_RECOMMENDATION', payload: recommendationId });
  };

  const refreshRecommendations = () => {
    // In a real app, this would fetch new AI-generated recommendations
    const shuffled = [...allRecommendations].sort(() => Math.random() - 0.5);
    dispatch({ type: 'SET_RECOMMENDATIONS', payload: shuffled.slice(0, 12) });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="mb-2">Climate Action Library</h1>
        <p className="text-gray-600">
          Discover personalized actions to reduce your carbon footprint
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {completedCount}
            </div>
            <div className="text-sm text-gray-600">Actions Completed</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {totalSaved.toFixed(1)}kg
            </div>
            <div className="text-sm text-gray-600">CO₂ Saved Total</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {state.recommendations.length}
            </div>
            <div className="text-sm text-gray-600">Available Actions</div>
          </CardContent>
        </Card>
      </div>

      {/* Category Tabs and Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recommended Actions</CardTitle>
              <CardDescription>
                AI-generated suggestions based on your lifestyle profile
              </CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={refreshRecommendations}
              className="flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 mb-6">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center space-x-1 text-xs"
                  >
                    <Icon className="w-3 h-3" />
                    <span className="hidden sm:inline">{category.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value={activeCategory} className="space-y-4">
              {filteredRecommendations.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No recommendations available for this category.</p>
                  <Button
                    onClick={refreshRecommendations}
                    className="mt-4"
                    variant="outline"
                  >
                    Load Recommendations
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRecommendations.map((recommendation) => {
                    const CategoryIcon = getCategoryIcon(recommendation.category);
                    const isCompleted = recommendation.completed;
                    
                    return (
                      <Card
                        key={recommendation.id}
                        className={`transition-all hover:shadow-md ${
                          isCompleted ? 'bg-green-50 border-green-200' : 'hover:border-gray-300'
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${CATEGORY_COLORS[recommendation.category]} flex items-center justify-center flex-shrink-0`}>
                              <CategoryIcon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex space-x-1">
                              <Badge
                                variant="secondary"
                                className={`text-xs ${DIFFICULTY_COLORS[recommendation.difficulty]}`}
                              >
                                {recommendation.difficulty}
                              </Badge>
                            </div>
                          </div>
                          
                          <h4 className={`font-medium mb-2 ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {recommendation.action}
                          </h4>
                          
                          <p className="text-sm text-gray-600 mb-3">
                            {recommendation.description}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <span>💚 {recommendation.carbonSaving}kg CO₂</span>
                            <span>📅 {recommendation.frequency}</span>
                          </div>
                          
                          <Button
                            size="sm"
                            onClick={() => handleComplete(recommendation.id)}
                            disabled={isCompleted}
                            className={`w-full ${
                              isCompleted
                                ? 'bg-green-600 hover:bg-green-600'
                                : 'bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700'
                            }`}
                          >
                            {isCompleted ? (
                              <>
                                <Check className="w-4 h-4 mr-1" />
                                Completed
                              </>
                            ) : (
                              'Mark as Done'
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* AI Chat Prompt */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Need Personalized Alternatives?</h3>
              <p className="text-sm text-gray-600">Our AI assistant can suggest alternatives based on your constraints</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-4">
            Can't complete certain actions? Have specific limitations? Chat with our AI for personalized suggestions 
            that fit your lifestyle, budget, and living situation.
          </p>
          <Button
            onClick={() => dispatch({ type: 'SET_CHAT_OPEN', payload: true })}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
          >
            Get AI Suggestions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}