export interface UserProfile {
  id: string;
  name: string;
  email: string;
  location?: string;
  lifestyle?: {
    transport: 'car' | 'public' | 'bike' | 'walk' | 'mixed';
    diet: 'meat' | 'vegetarian' | 'vegan' | 'pescatarian' | 'flexitarian';
    energy: 'renewable' | 'mixed' | 'conventional';
    water: 'low' | 'medium' | 'high';
    waste: 'minimal' | 'moderate' | 'high';
    recycling: 'always' | 'sometimes' | 'rarely';
    shopping: 'sustainable' | 'mixed' | 'convenience';
    digital: 'minimal' | 'moderate' | 'heavy';
  };
  currentFootprint?: number; // kg CO2 per week
  targetFootprint?: number; // kg CO2 per week
  totalCarbonSaved: number; // kg CO2 total
  level: number;
  joinedAt: Date;
  preferences: {
    goals: string[];
    notifications: boolean;
    difficulty: 'easy' | 'medium' | 'hard';
  };
}

export interface Activity {
  id: string;
  userId: string;
  action: string;
  category: 'transport' | 'energy' | 'diet' | 'water' | 'waste' | 'recycling' | 'shopping' | 'digital' | 'food';
  carbonSaved: number; // kg CO2
  difficulty: 'easy' | 'medium' | 'hard';
  frequency: 'daily' | 'weekly' | 'monthly' | 'once';
  completedAt: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  badgeIcon: string;
  tier: 'first-step' | 'week-warrior' | 'eco-champion' | 'climate-hero' | 'earth-guardian';
  requirement: number; // kg CO2 saved
  earned: boolean;
  earnedAt?: Date;
}

export interface Recommendation {
  id: string;
  action: string;
  category: 'transport' | 'energy' | 'diet' | 'water' | 'waste' | 'recycling' | 'shopping' | 'digital' | 'food';
  carbonSaving: number; // kg CO2 per week
  difficulty: 'easy' | 'medium' | 'hard';
  frequency: 'daily' | 'weekly' | 'monthly' | 'once';
  timeRequired: string;
  description: string;
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const CATEGORY_COLORS = {
  transport: 'from-blue-400 to-blue-600',
  energy: 'from-yellow-400 to-orange-500',
  diet: 'from-green-400 to-green-600',
  water: 'from-cyan-400 to-blue-500',
  waste: 'from-gray-400 to-gray-600',
  recycling: 'from-emerald-400 to-green-500',
  shopping: 'from-purple-400 to-pink-500',
  digital: 'from-indigo-400 to-purple-600',
};

export const DIFFICULTY_COLORS = {
  easy: 'text-green-600',
  medium: 'text-yellow-600',
  hard: 'text-red-600',
};