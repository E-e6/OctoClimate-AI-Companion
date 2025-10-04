import React from 'react';
import { useApp } from '../context/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export function ImpactChart() {
  const { state } = useApp();

  // Generate mock data for the last 7 days
  const generateChartData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Calculate actual savings for this date from activities
      const dayActivities = state.activities.filter(activity => {
        const activityDate = new Date(activity.completedAt);
        return activityDate.toDateString() === date.toDateString();
      });
      
      const actualSavings = dayActivities.reduce((sum, activity) => sum + activity.carbonSaved, 0);
      
      // Add some mock baseline savings if no activities
      const mockSavings = actualSavings > 0 ? actualSavings : Math.random() * 2 + 0.5;
      
      data.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        savings: parseFloat(mockSavings.toFixed(1)),
        target: 2.0, // Daily target savings
      });
    }
    
    return data;
  };

  const chartData = generateChartData();
  const totalWeeklySavings = chartData.reduce((sum, day) => sum + day.savings, 0);
  const weeklyTarget = 14.0; // 7 days * 2kg target per day

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="mb-6">
        <h2 className="mb-1">Weekly Impact</h2>
        <p className="text-gray-600">Your carbon savings over the last 7 days</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-green-600">
              {totalWeeklySavings.toFixed(1)}kg CO₂
            </div>
            <div className="text-sm text-gray-600">saved this week</div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-medium text-gray-700">
              {((totalWeeklySavings / weeklyTarget) * 100).toFixed(0)}%
            </div>
            <div className="text-sm text-gray-600">of weekly goal</div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, (totalWeeklySavings / weeklyTarget) * 100)}%` }}
          />
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `${value}kg`}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [
                `${value}kg CO₂`,
                name === 'savings' ? 'Saved' : 'Target'
              ]}
              labelFormatter={(label) => `${label}`}
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="url(#targetGradient)"
            />
            <Area
              type="monotone"
              dataKey="savings"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#savingsGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-gray-600">Actual Savings</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-1 bg-yellow-500 rounded" />
          <span className="text-gray-600">Daily Target (2kg)</span>
        </div>
      </div>
    </div>
  );
}