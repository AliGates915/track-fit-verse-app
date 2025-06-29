
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useWorkout } from '@/context/WorkoutContext';

const ProgressChart = () => {
  const { workouts } = useWorkout();

  // Get last 7 days of data
  const getLast7DaysData = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const dayWorkouts = workouts.filter(workout => 
        workout.date.split('T')[0] === dateString
      );
      
      const totalCalories = dayWorkouts.reduce((sum, workout) => sum + workout.calories, 0);
      const totalDuration = dayWorkouts.reduce((sum, workout) => sum + workout.duration, 0);
      
      days.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        calories: totalCalories,
        duration: totalDuration,
        workouts: dayWorkouts.length
      });
    }
    
    return days;
  };

  const data = getLast7DaysData();

  if (workouts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No workout data to display</p>
        <p className="text-sm text-gray-400">Start logging workouts to see your progress!</p>
      </div>
    );
  }

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => [value, name === 'calories' ? 'Calories' : 'Duration (min)']}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Bar dataKey="calories" fill="#3B82F6" name="calories" />
          <Bar dataKey="duration" fill="#10B981" name="duration" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
