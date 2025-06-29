
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Target, TrendingUp, Zap } from 'lucide-react';
import { useWorkout } from '@/context/WorkoutContext';
import WorkoutLogger from '@/components/WorkoutLogger';
import FitnessMotivation from '@/components/FitnessMotivation';

const Dashboard = () => {
  const { workouts, goals, getWeeklyStats } = useWorkout();
  const weeklyStats = getWeeklyStats();

  const todayWorkouts = workouts.filter(workout => {
    const today = new Date().toDateString();
    return new Date(workout.date).toDateString() === today;
  });

  const activeGoals = goals.filter(goal => goal.current < goal.target);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Track your fitness journey</p>
        </div>
        <FitnessMotivation />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Workouts</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayWorkouts.length}</div>
            <p className="text-xs text-muted-foreground">
              {todayWorkouts.length > 0 ? 'Great job!' : 'Start your day!'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Calories</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.totalCalories}</div>
            <p className="text-xs text-muted-foreground">
              Burned this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeGoals.length}</div>
            <p className="text-xs text-muted-foreground">
              Goals in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Duration</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.totalDuration}m</div>
            <p className="text-xs text-muted-foreground">
              Minutes exercised
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Workout Logger */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Workout Logger</CardTitle>
              <CardDescription>Log your workout quickly</CardDescription>
            </CardHeader>
            <CardContent>
              <WorkoutLogger />
            </CardContent>
          </Card>
        </div>

        {/* Recent Workouts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Workouts</CardTitle>
            <CardDescription>Your latest activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workouts.slice(0, 5).map((workout) => (
                <div key={workout.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{workout.exercise}</p>
                    <p className="text-sm text-gray-500">{workout.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{workout.calories} cal</p>
                    <p className="text-sm text-gray-500">{workout.duration}m</p>
                  </div>
                </div>
              ))}
              {workouts.length === 0 && (
                <p className="text-gray-500 text-center py-4">No workouts logged yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Goals */}
      {activeGoals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Active Goals</CardTitle>
            <CardDescription>Your current fitness targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeGoals.map((goal) => (
                <div key={goal.id} className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">{goal.title}</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {goal.current} / {goal.target} {goal.type}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
