
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWorkout } from '@/context/WorkoutContext';
import ProgressChart from '@/components/ProgressChart';
import { TrendingUp, Calendar, Activity } from 'lucide-react';

const Progress = () => {
  const { workouts, getWeeklyStats } = useWorkout();
  const weeklyStats = getWeeklyStats();

  const getMonthlyStats = () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    const monthlyWorkouts = workouts.filter(workout => 
      new Date(workout.date) >= oneMonthAgo
    );
    
    return {
      totalWorkouts: monthlyWorkouts.length,
      totalCalories: monthlyWorkouts.reduce((sum, w) => sum + w.calories, 0),
      totalDuration: monthlyWorkouts.reduce((sum, w) => sum + w.duration, 0),
    };
  };

  const monthlyStats = getMonthlyStats();

  const getWorkoutTypeStats = () => {
    const typeStats = {};
    workouts.forEach(workout => {
      typeStats[workout.type] = (typeStats[workout.type] || 0) + 1;
    });
    return typeStats;
  };

  const workoutTypeStats = getWorkoutTypeStats();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Progress</h1>
        <p className="text-gray-600">Track your fitness journey and achievements</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Stats</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.totalWorkouts}</div>
            <p className="text-xs text-muted-foreground">workouts this week</p>
            <div className="mt-2 text-sm">
              <p>{weeklyStats.totalCalories} calories burned</p>
              <p>{weeklyStats.totalDuration} minutes exercised</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Stats</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyStats.totalWorkouts}</div>
            <p className="text-xs text-muted-foreground">workouts this month</p>
            <div className="mt-2 text-sm">
              <p>{monthlyStats.totalCalories} calories burned</p>
              <p>{monthlyStats.totalDuration} minutes exercised</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workouts.length}</div>
            <p className="text-xs text-muted-foreground">all time workouts</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      {workouts.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress Charts</CardTitle>
            <CardDescription>Your workout trends over the past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressChart />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No workout data yet</p>
            <p className="text-sm text-gray-400">Start logging workouts to see your progress charts!</p>
          </CardContent>
        </Card>
      )}

      {/* Workout Type Breakdown */}
      {Object.keys(workoutTypeStats).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Workout Type Breakdown</CardTitle>
            <CardDescription>Distribution of your workout types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.entries(workoutTypeStats).map(([type, count]) => (
                <div key={type} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{count}</div>
                  <p className="text-sm text-gray-600">{type}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Progress;
