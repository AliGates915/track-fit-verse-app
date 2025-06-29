
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useWorkout } from '@/context/WorkoutContext';

const ProgressChart = () => {
  const { workouts } = useWorkout();

  // Generate last 7 days data
  const getLast7DaysData = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dayWorkouts = workouts.filter(workout => {
        const workoutDate = new Date(workout.date);
        return workoutDate.toDateString() === date.toDateString();
      });
      
      const totalCalories = dayWorkouts.reduce((sum, w) => sum + w.calories, 0);
      const totalDuration = dayWorkouts.reduce((sum, w) => sum + w.duration, 0);
      
      days.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        calories: totalCalories,
        duration: totalDuration,
        workouts: dayWorkouts.length
      });
    }
    
    return days;
  };

  const chartData = getLast7DaysData();

  return (
    <div className="space-y-6">
      {/* Calories Chart */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Daily Calories Burned</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`${value} kcal`, 'Calories']}
              labelStyle={{ color: '#374151' }}
            />
            <Bar dataKey="calories" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Duration Chart */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Daily Workout Duration</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`${value} min`, 'Duration']}
              labelStyle={{ color: '#374151' }}
            />
            <Line 
              type="monotone" 
              dataKey="duration" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;
