import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORY_COLORS } from '../types';

export function OctopusVisualization() {
  const { state } = useApp();
  
  const categories = [
    { name: 'Transport', value: 25, category: 'transport' },
    { name: 'Energy', value: 20, category: 'energy' },
    { name: 'Diet', value: 18, category: 'diet' },
    { name: 'Water', value: 8, category: 'water' },
    { name: 'Waste', value: 10, category: 'waste' },
    { name: 'Recycling', value: 5, category: 'recycling' },
    { name: 'Shopping', value: 9, category: 'shopping' },
    { name: 'Digital', value: 5, category: 'digital' },
  ];

  const totalFootprint = state.user?.currentFootprint || 45.2;
  const targetFootprint = state.user?.targetFootprint || 32.0;
  
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="mb-2">Your Carbon Footprint</h2>
        <div className="text-4xl font-bold text-gray-900 mb-1">
          {totalFootprint}kg CO₂
        </div>
        <p className="text-gray-600">per week</p>
        <div className="mt-4 p-3 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-lg">
          <p className="text-sm text-gray-700">
            Target: <span className="font-medium text-teal-600">{targetFootprint}kg CO₂/week</span>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-teal-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (targetFootprint / totalFootprint) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Octopus Visualization */}
      <div className="relative mx-auto w-80 h-80">
        {/* Octopus Body */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-cyan-400 via-teal-500 to-cyan-600 rounded-full shadow-lg flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-2xl mb-1">🐙</div>
            <div className="text-xs font-medium">Climate</div>
            <div className="text-xs font-medium">Guardian</div>
          </div>
        </div>

        {/* Tentacles */}
        {categories.map((category, index) => {
          const angle = (index * 45) - 90; // Start from top and go clockwise
          const radius = 120;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          
          return (
            <div
              key={category.name}
              className="absolute group cursor-pointer"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Tentacle */}
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${CATEGORY_COLORS[category.category as keyof typeof CATEGORY_COLORS]} shadow-md flex items-center justify-center transform transition-transform group-hover:scale-110`}
              >
                <div className="text-white text-center">
                  <div className="text-xs font-medium">{category.value}%</div>
                </div>
              </div>
              
              {/* Category Label */}
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {category.name}: {category.value}%
                </div>
              </div>
              
              {/* Connection Line */}
              <svg 
                className="absolute top-1/2 left-1/2 pointer-events-none"
                style={{
                  width: `${Math.abs(x) + 50}px`,
                  height: `${Math.abs(y) + 50}px`,
                  transform: `translate(-50%, -50%) rotate(${angle + 180}deg)`,
                  transformOrigin: 'center center',
                }}
              >
                <line
                  x1="0"
                  y1="50%"
                  x2="80%"
                  y2="50%"
                  stroke="url(#tentacleGradient)"
                  strokeWidth="3"
                  opacity="0.6"
                />
                <defs>
                  <linearGradient id="tentacleGradient">
                    <stop offset="0%" stopColor="#0891b2" />
                    <stop offset="100%" stopColor="#0d9488" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-4 gap-4 text-center">
        {categories.slice(0, 4).map((category) => (
          <div key={category.name} className="text-xs">
            <div className={`w-4 h-4 mx-auto mb-1 rounded bg-gradient-to-br ${CATEGORY_COLORS[category.category as keyof typeof CATEGORY_COLORS]}`} />
            <div className="text-gray-600">{category.name}</div>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-4 gap-4 text-center">
        {categories.slice(4).map((category) => (
          <div key={category.name} className="text-xs">
            <div className={`w-4 h-4 mx-auto mb-1 rounded bg-gradient-to-br ${CATEGORY_COLORS[category.category as keyof typeof CATEGORY_COLORS]}`} />
            <div className="text-gray-600">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}