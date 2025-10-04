import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Calculator, Target, User, MapPin } from 'lucide-react';

export function Profile() {
  const { state, dispatch } = useApp();
  const [formData, setFormData] = useState({
    name: state.user?.name || '',
    location: state.user?.location || '',
    lifestyle: state.user?.lifestyle || {
      transport: 'mixed',
      diet: 'meat',
      energy: 'mixed',
      water: 'medium',
      waste: 'moderate',
      recycling: 'sometimes',
      shopping: 'mixed',
      digital: 'moderate',
    },
  });

  const calculateFootprint = (lifestyle: any) => {
    // Simplified carbon footprint calculation based on lifestyle choices
    let footprint = 0;
    
    // Transport (biggest impact)
    switch (lifestyle.transport) {
      case 'car': footprint += 15; break;
      case 'public': footprint += 6; break;
      case 'bike': footprint += 2; break;
      case 'walk': footprint += 1; break;
      case 'mixed': footprint += 10; break;
    }
    
    // Diet
    switch (lifestyle.diet) {
      case 'meat': footprint += 12; break;
      case 'pescatarian': footprint += 8; break;
      case 'vegetarian': footprint += 5; break;
      case 'vegan': footprint += 3; break;
      case 'flexitarian': footprint += 7; break;
    }
    
    // Energy
    switch (lifestyle.energy) {
      case 'conventional': footprint += 8; break;
      case 'mixed': footprint += 5; break;
      case 'renewable': footprint += 2; break;
    }
    
    // Water usage
    switch (lifestyle.water) {
      case 'high': footprint += 4; break;
      case 'medium': footprint += 2; break;
      case 'low': footprint += 1; break;
    }
    
    // Waste
    switch (lifestyle.waste) {
      case 'high': footprint += 3; break;
      case 'moderate': footprint += 2; break;
      case 'minimal': footprint += 0.5; break;
    }
    
    // Recycling (negative impact)
    switch (lifestyle.recycling) {
      case 'rarely': footprint += 2; break;
      case 'sometimes': footprint += 1; break;
      case 'always': footprint += 0; break;
    }
    
    // Shopping
    switch (lifestyle.shopping) {
      case 'convenience': footprint += 3; break;
      case 'mixed': footprint += 2; break;
      case 'sustainable': footprint += 1; break;
    }
    
    // Digital usage
    switch (lifestyle.digital) {
      case 'heavy': footprint += 2; break;
      case 'moderate': footprint += 1; break;
      case 'minimal': footprint += 0.5; break;
    }
    
    return Math.round(footprint * 10) / 10;
  };

  const currentFootprint = calculateFootprint(formData.lifestyle);
  const targetFootprint = Math.round(currentFootprint * 0.7 * 10) / 10; // 30% reduction target

  const handleSave = () => {
    const userProfile = {
      id: state.user?.id || Date.now().toString(),
      name: formData.name,
      location: formData.location,
      lifestyle: formData.lifestyle,
      currentFootprint,
      targetFootprint,
      createdAt: state.user?.createdAt || new Date(),
    };
    
    dispatch({ type: 'SET_USER', payload: userProfile });
    dispatch({ type: 'SET_PAGE', payload: 'dashboard' });
  };

  const isFormValid = formData.name && formData.location;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="mb-2">Climate Profile Setup</h1>
        <p className="text-gray-600">
          Help us understand your lifestyle to provide personalized recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Basic Information</span>
              </CardTitle>
              <CardDescription>
                Tell us about yourself to personalize your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, Country"
                />
              </div>
            </CardContent>
          </Card>

          {/* Lifestyle Questionnaire */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Lifestyle Assessment</span>
              </CardTitle>
              <CardDescription>
                Answer honestly to get accurate carbon footprint calculations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Transport */}
                <div>
                  <Label>Primary Transportation</Label>
                  <Select
                    value={formData.lifestyle.transport}
                    onValueChange={(value) => setFormData({
                      ...formData,
                      lifestyle: { ...formData.lifestyle, transport: value as any }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car">Personal Car</SelectItem>
                      <SelectItem value="public">Public Transport</SelectItem>
                      <SelectItem value="bike">Bicycle</SelectItem>
                      <SelectItem value="walk">Walking</SelectItem>
                      <SelectItem value="mixed">Mixed Transport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Diet */}
                <div>
                  <Label>Dietary Preferences</Label>
                  <Select
                    value={formData.lifestyle.diet}
                    onValueChange={(value) => setFormData({
                      ...formData,
                      lifestyle: { ...formData.lifestyle, diet: value as any }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meat">Regular Meat Eater</SelectItem>
                      <SelectItem value="flexitarian">Flexitarian</SelectItem>
                      <SelectItem value="pescatarian">Pescatarian</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Energy */}
                <div>
                  <Label>Home Energy Source</Label>
                  <Select
                    value={formData.lifestyle.energy}
                    onValueChange={(value) => setFormData({
                      ...formData,
                      lifestyle: { ...formData.lifestyle, energy: value as any }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conventional">Conventional Grid</SelectItem>
                      <SelectItem value="mixed">Mixed Sources</SelectItem>
                      <SelectItem value="renewable">Renewable Energy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Water */}
                <div>
                  <Label>Water Usage</Label>
                  <Select
                    value={formData.lifestyle.water}
                    onValueChange={(value) => setFormData({
                      ...formData,
                      lifestyle: { ...formData.lifestyle, water: value as any }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (short showers, efficient appliances)</SelectItem>
                      <SelectItem value="medium">Medium (moderate usage)</SelectItem>
                      <SelectItem value="high">High (long showers, frequent washing)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Waste */}
                <div>
                  <Label>Waste Generation</Label>
                  <Select
                    value={formData.lifestyle.waste}
                    onValueChange={(value) => setFormData({
                      ...formData,
                      lifestyle: { ...formData.lifestyle, waste: value as any }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimal (conscious reduction)</SelectItem>
                      <SelectItem value="moderate">Moderate (average household)</SelectItem>
                      <SelectItem value="high">High (lots of packaging/disposables)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Recycling */}
                <div>
                  <Label>Recycling Habits</Label>
                  <Select
                    value={formData.lifestyle.recycling}
                    onValueChange={(value) => setFormData({
                      ...formData,
                      lifestyle: { ...formData.lifestyle, recycling: value as any }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="always">Always recycle</SelectItem>
                      <SelectItem value="sometimes">Sometimes recycle</SelectItem>
                      <SelectItem value="rarely">Rarely recycle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Shopping */}
                <div>
                  <Label>Shopping Habits</Label>
                  <Select
                    value={formData.lifestyle.shopping}
                    onValueChange={(value) => setFormData({
                      ...formData,
                      lifestyle: { ...formData.lifestyle, shopping: value as any }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sustainable">Sustainable (local, eco-friendly)</SelectItem>
                      <SelectItem value="mixed">Mixed approach</SelectItem>
                      <SelectItem value="convenience">Convenience focused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Digital */}
                <div>
                  <Label>Digital Usage</Label>
                  <Select
                    value={formData.lifestyle.digital}
                    onValueChange={(value) => setFormData({
                      ...formData,
                      lifestyle: { ...formData.lifestyle, digital: value as any }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimal (basic usage)</SelectItem>
                      <SelectItem value="moderate">Moderate (average user)</SelectItem>
                      <SelectItem value="heavy">Heavy (streaming, gaming, cloud)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Sidebar */}
        <div className="space-y-6">
          {/* Carbon Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-5 h-5" />
                <span>AI Carbon Calculator</span>
              </CardTitle>
              <CardDescription>
                Real-time footprint calculation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    {currentFootprint}kg
                  </div>
                  <div className="text-sm text-gray-600">CO₂ per week</div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <div className="text-sm text-gray-700 mb-1">Your Target</div>
                  <div className="text-xl font-bold text-green-600">
                    {targetFootprint}kg CO₂
                  </div>
                  <div className="text-xs text-gray-600">
                    30% reduction goal
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  Global average: 48kg CO₂/week
                  <br />
                  Paris Agreement target: 23kg CO₂/week
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Goals Card */}
          <Card>
            <CardHeader>
              <CardTitle>Your Climate Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-gray-700">Weekly Reduction</span>
                <span className="font-medium text-blue-600">
                  {(currentFootprint - targetFootprint).toFixed(1)}kg CO₂
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-gray-700">Annual Impact</span>
                <span className="font-medium text-green-600">
                  {((currentFootprint - targetFootprint) * 52).toFixed(0)}kg CO₂
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="text-sm text-gray-700">Trees Equivalent</span>
                <span className="font-medium text-purple-600">
                  {Math.round((currentFootprint - targetFootprint) * 52 / 22)} trees/year
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={!isFormValid}
            className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700"
            size="lg"
          >
            Save Profile & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}