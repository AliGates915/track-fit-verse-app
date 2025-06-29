
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Calendar, Award, Activity } from 'lucide-react';
import { useWorkout } from '@/context/WorkoutContext';

const Progress = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const { workouts, goals } = useWorkout();

  const getDateRange = (range: string) => {
    const today = new Date();
    const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - days + 1);
    return { startDate, endDate: today };
  };

  const { startDate, endDate } = getDateRange(timeRange);
  
  const filteredWorkouts = workouts.filter(workout => {
    const workoutDate = new Date(workout.date);
    return workoutDate >= startDate && workoutDate <= endDate;
  });

  // Weekly progress data
  const getWeeklyData = () => {
    const weeks = [];
    const weekCount = timeRange === '7d' ? 1 : timeRange === '30d' ? 4 : 12;
    
    for (let i = weekCount - 1; i >= 0; i--) {
      const weekStart = new Date(endDate);
      weekStart.setDate(weekStart.getDate() - (i + 1) * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      
      const weekWorkouts = workouts.filter(workout => {
        const workoutDate = new Date(workout.date);
        return workoutDate >= weekStart && workoutDate <= weekEnd;
      });
      
      weeks.push({
        week: `Week ${weekCount - i}`,
        workouts: weekWorkouts.length,
        calories: weekWorkouts.reduce((sum, w) => sum + w.calories, 0),
        duration: weekWorkouts.reduce((sum, w) => sum + w.duration, 0),
      });
    }
    
    return weeks;
  };

  // Workout type distribution
  const getWorkoutTypeData = () => {
    const types = {};
    filteredWorkouts.forEach(workout => {
      types[workout.type] = (types[workout.type] || 0) + 1;
    });
    
    return Object.entries(types).map(([type, count]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      value: count,
    }));
  };

  const weeklyData = getWeeklyData();
  const workoutTypeData = getWorkoutTypeData();
  
  const totalWorkouts = filteredWorkouts.length;
  const totalCalories = filteredWorkouts.reduce((sum, w) => sum + w.calories, 0);
  const totalDuration = filteredWorkouts.reduce((sum, w) => sum + w.duration, 0);
  const avgCaloriesPerWorkout = totalWorkouts > 0 ? Math.round(totalCalories / totalWorkouts) : 0;

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Progress Analytics 📊
            </h1>
            <p className="text-gray-600">
              Detailed insights into your fitness journey
            </p>
          </div>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 mt-4 sm:mt-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Workouts</p>
                  <p className="text-2xl font-bold text-blue-600">{totalWorkouts}</p>
                </div>
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Calories</p>
                  <p className="text-2xl font-bold text-red-600">{totalCalories.toLocaleString()}</p>
                </div>
                <div className="text-2xl">🔥</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Duration</p>
                  <p className="text-2xl font-bold text-green-600">{totalDuration}</p>
                  <p className="text-xs text-gray-500">minutes</p>
                </div>
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. per Workout</p>
                  <p className="text-2xl font-bold text-purple-600">{avgCaloriesPerWorkout}</p>
                  <p className="text-xs text-gray-500">calories</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="workouts" fill="#3B82F6" name="Workouts" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Workout Types */}
          <Card>
            <CardHeader>
              <CardTitle>Workout Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {workoutTypeData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={workoutTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {workoutTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-gray-500">
                  No workout data available
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Calories Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Calories Burned Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} kcal`, 'Calories']} />
                <Line 
                  type="monotone" 
                  dataKey="calories" 
                  stroke="#EF4444" 
                  strokeWidth={3}
                  dot={{ fill: '#EF4444', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Progress;
