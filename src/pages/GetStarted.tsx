import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { CheckCircle, Circle, ArrowRight, Leaf, Target, Zap, Award, User, Home } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export function GetStarted() {
  const { state, dispatch } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    goals: [] as string[],
  });

  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 0,
      title: 'Welcome to OctoClimate!',
      description: 'Let\'s set up your climate action journey',
      completed: false,
    },
    {
      id: 1,
      title: 'Create Your Profile',
      description: 'Tell us a bit about yourself',
      completed: false,
    },
    {
      id: 2,
      title: 'Set Your Goals',
      description: 'Choose what matters most to you',
      completed: false,
    },
    {
      id: 3,
      title: 'Ready to Start!',
      description: 'You\'re all set to begin your climate journey',
      completed: false,
    },
  ]);

  const climateGoals = [
    { id: 'energy', label: 'Reduce Energy Use', icon: '⚡', description: 'Save electricity and reduce utility bills' },
    { id: 'transport', label: 'Sustainable Transport', icon: '🚲', description: 'Walk, bike, or use public transport more' },
    { id: 'food', label: 'Sustainable Eating', icon: '🌱', description: 'Eat more plant-based meals' },
    { id: 'waste', label: 'Reduce Waste', icon: '♻️', description: 'Minimize single-use items and recycle more' },
    { id: 'water', label: 'Water Conservation', icon: '💧', description: 'Use less water in daily activities' },
    { id: 'shopping', label: 'Conscious Shopping', icon: '🛍️', description: 'Buy local and sustainable products' },
  ];

  const totalSteps = steps.length;
  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / totalSteps) * 100;

  const markStepCompleted = (stepId: number) => {
    setSteps(prevSteps => 
      prevSteps.map(step => 
        step.id === stepId ? { ...step, completed: true } : step
      )
    );
  };

  const handleNextStep = () => {
    markStepCompleted(currentStep);
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleGoalToggle = (goalId: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId]
    }));
  };

  const handleComplete = () => {
    if (formData.name && formData.email && formData.goals.length > 0) {
      // Set user profile
      dispatch({
        type: 'SET_USER',
        payload: {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          joinedAt: new Date(),
          totalCarbonSaved: 0,
          level: 1,
          preferences: {
            goals: formData.goals,
            notifications: true,
            difficulty: 'medium'
          }
        }
      });

      // Generate initial recommendations based on selected goals
      const initialRecommendations = formData.goals.flatMap(goalId => {
        switch (goalId) {
          case 'energy':
            return [
              {
                id: 'energy-1',
                action: 'Switch to LED bulbs',
                category: 'energy' as const,
                carbonSaving: 2.5,
                difficulty: 'easy' as const,
                frequency: 'once' as const,
                timeRequired: '30 minutes',
                description: 'Replace 5 regular bulbs with LED bulbs to save energy',
                completed: false
              }
            ];
          case 'transport':
            return [
              {
                id: 'transport-1',
                action: 'Walk or bike for short trips',
                category: 'transport' as const,
                carbonSaving: 3.2,
                difficulty: 'easy' as const,
                frequency: 'daily' as const,
                timeRequired: 'varies',
                description: 'Use walking or cycling for trips under 2km',
                completed: false
              }
            ];
          case 'food':
            return [
              {
                id: 'food-1',
                action: 'Try Meatless Monday',
                category: 'food' as const,
                carbonSaving: 4.1,
                difficulty: 'medium' as const,
                frequency: 'weekly' as const,
                timeRequired: '1 hour',
                description: 'Prepare plant-based meals one day per week',
                completed: false
              }
            ];
          default:
            return [];
        }
      });

      dispatch({
        type: 'SET_RECOMMENDATIONS',
        payload: initialRecommendations
      });

      markStepCompleted(currentStep);
      toast.success('Welcome to OctoClimate! Your journey begins now 🌱');
      
      // Navigate to dashboard after a short delay
      setTimeout(() => {
        dispatch({ type: 'SET_PAGE', payload: 'dashboard' });
      }, 2000);
    } else {
      toast.error('Please fill in all required fields and select at least one goal');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center mx-auto">
              <span className="text-white text-2xl">🐙</span>
            </div>
            <div>
              <h2 className="mb-4 bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Welcome to OctoClimate!
              </h2>
              <p className="text-gray-600 mb-6">
                Your personal climate action companion. Track your impact, get personalized recommendations, 
                and join a community making a real difference for our planet.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-cyan-50 rounded-lg">
                  <Target className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-700">Set Goals</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-700">Take Action</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Leaf className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-700">Track Impact</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-700">Earn Rewards</p>
                </div>
              </div>
            </div>
            <Button onClick={handleNextStep} className="bg-gradient-to-r from-cyan-500 to-teal-600">
              Let's Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
              <h2 className="mb-2">Create Your Profile</h2>
              <p className="text-gray-600">Help us personalize your climate journey</p>
            </div>
            
            <div className="space-y-4 max-w-md mx-auto">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={handleNextStep} 
                disabled={!formData.name || !formData.email}
                className="bg-gradient-to-r from-cyan-500 to-teal-600"
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Target className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
              <h2 className="mb-2">Choose Your Climate Goals</h2>
              <p className="text-gray-600">Select the areas where you'd like to make the biggest impact (choose at least one)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {climateGoals.map((goal) => (
                <Card
                  key={goal.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    formData.goals.includes(goal.id) 
                      ? 'ring-2 ring-cyan-500 bg-cyan-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleGoalToggle(goal.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{goal.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{goal.label}</h3>
                          {formData.goals.includes(goal.id) ? (
                            <CheckCircle className="w-5 h-5 text-cyan-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                {formData.goals.length} goal{formData.goals.length !== 1 ? 's' : ''} selected
              </Badge>
              <div>
                <Button 
                  onClick={handleNextStep} 
                  disabled={formData.goals.length === 0}
                  className="bg-gradient-to-r from-cyan-500 to-teal-600"
                >
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <div>
              <h2 className="mb-4 text-green-600">You're All Set!</h2>
              <p className="text-gray-600 mb-6">
                Welcome aboard, {formData.name}! Your personalized climate action plan is ready.
              </p>
            </div>

            <Card className="max-w-md mx-auto text-left">
              <CardHeader>
                <CardTitle className="text-center">Your Setup Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span>{formData.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Goals:</span>
                  <span>{formData.goals.length} selected</span>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-gray-600 text-center">
                    We've prepared personalized recommendations based on your goals!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={handleComplete}
              className="bg-gradient-to-r from-green-500 to-emerald-600"
            >
              Start My Climate Journey <Home className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Getting Started</CardTitle>
            <Badge variant="outline">
              Step {currentStep + 1} of {totalSteps}
            </Badge>
          </div>
          <Progress value={progress} className="w-full" />
          <CardDescription>
            Complete your setup to start your climate action journey
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent className="p-8">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Steps Overview */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`p-4 rounded-lg text-center transition-all ${
              step.completed 
                ? 'bg-green-50 text-green-700' 
                : index === currentStep 
                  ? 'bg-cyan-50 text-cyan-700 ring-2 ring-cyan-200' 
                  : 'bg-gray-50 text-gray-500'
            }`}
          >
            <div className="flex justify-center mb-2">
              {step.completed ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : index === currentStep ? (
                <Circle className="w-6 h-6 text-cyan-600 fill-current" />
              ) : (
                <Circle className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <h4 className="font-medium text-sm mb-1">{step.title}</h4>
            <p className="text-xs opacity-75">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}