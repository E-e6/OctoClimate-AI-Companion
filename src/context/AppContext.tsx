import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { UserProfile, Activity, Achievement, Recommendation, ChatMessage } from '../types';

interface AppState {
  user: UserProfile | null;
  activities: Activity[];
  achievements: Achievement[];
  recommendations: Recommendation[];
  chatMessages: ChatMessage[];
  currentPage: 'get-started' | 'dashboard' | 'profile' | 'recommendations' | 'achievements';
  chatOpen: boolean;
}

type AppAction = 
  | { type: 'SET_USER'; payload: UserProfile }
  | { type: 'ADD_ACTIVITY'; payload: Activity }
  | { type: 'SET_ACHIEVEMENTS'; payload: Achievement[] }
  | { type: 'SET_RECOMMENDATIONS'; payload: Recommendation[] }
  | { type: 'COMPLETE_RECOMMENDATION'; payload: string }
  | { type: 'ADD_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_PAGE'; payload: 'get-started' | 'dashboard' | 'profile' | 'recommendations' | 'achievements' }
  | { type: 'TOGGLE_CHAT' }
  | { type: 'SET_CHAT_OPEN'; payload: boolean };

const initialState: AppState = {
  user: null,
  activities: [],
  achievements: [
    {
      id: '1',
      name: 'First Step',
      description: 'Complete your first climate action',
      badgeIcon: '🌱',
      tier: 'first-step',
      requirement: 0,
      earned: false,
    },
    {
      id: '2', 
      name: 'Week Warrior',
      description: 'Save 5kg CO₂ in total',
      badgeIcon: '⚡',
      tier: 'week-warrior',
      requirement: 5,
      earned: false,
    },
    {
      id: '3',
      name: 'Eco Champion', 
      description: 'Save 20kg CO₂ in total',
      badgeIcon: '🏆',
      tier: 'eco-champion',
      requirement: 20,
      earned: false,
    },
    {
      id: '4',
      name: 'Climate Hero',
      description: 'Save 50kg CO₂ in total',
      badgeIcon: '🦸',
      tier: 'climate-hero',
      requirement: 50,
      earned: false,
    },
    {
      id: '5',
      name: 'Earth Guardian',
      description: 'Save 100kg CO₂ in total',
      badgeIcon: '🌍',
      tier: 'earth-guardian',
      requirement: 100,
      earned: false,
    },
  ],
  recommendations: [],
  chatMessages: [],
  currentPage: 'get-started',
  chatOpen: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'ADD_ACTIVITY':
      const newActivities = [...state.activities, action.payload];
      const totalSaved = newActivities.reduce((sum, activity) => sum + activity.carbonSaved, 0);
      
      // Update achievements
      const updatedAchievements = state.achievements.map(achievement => {
        if (!achievement.earned && totalSaved >= achievement.requirement) {
          return { ...achievement, earned: true, earnedAt: new Date() };
        }
        return achievement;
      });
      
      return { 
        ...state, 
        activities: newActivities,
        achievements: updatedAchievements,
      };
    
    case 'SET_ACHIEVEMENTS':
      return { ...state, achievements: action.payload };
    
    case 'SET_RECOMMENDATIONS':
      return { ...state, recommendations: action.payload };
    
    case 'COMPLETE_RECOMMENDATION':
      const completedRec = state.recommendations.find(r => r.id === action.payload);
      if (completedRec && !completedRec.completed) {
        const activity: Activity = {
          id: Date.now().toString(),
          userId: state.user?.id || '',
          action: completedRec.action,
          category: completedRec.category,
          carbonSaved: completedRec.carbonSaving,
          difficulty: completedRec.difficulty,
          frequency: completedRec.frequency,
          completedAt: new Date(),
        };
        
        const updatedRecommendations = state.recommendations.map(r =>
          r.id === action.payload ? { ...r, completed: true } : r
        );
        
        // Add activity and update achievements
        const newActivities = [...state.activities, activity];
        const totalSaved = newActivities.reduce((sum, activity) => sum + activity.carbonSaved, 0);
        
        const updatedAchievements = state.achievements.map(achievement => {
          if (!achievement.earned && totalSaved >= achievement.requirement) {
            return { ...achievement, earned: true, earnedAt: new Date() };
          }
          return achievement;
        });
        
        return {
          ...state,
          activities: newActivities,
          recommendations: updatedRecommendations,
          achievements: updatedAchievements,
        };
      }
      return state;
    
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    
    case 'TOGGLE_CHAT':
      return { ...state, chatOpen: !state.chatOpen };
    
    case 'SET_CHAT_OPEN':
      return { ...state, chatOpen: action.payload };
    
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}