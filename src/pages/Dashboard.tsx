
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Activity, Target, TrendingUp, Calendar, Plus } from 'lucide-react';
import WorkoutLogger from '@/components/WorkoutLogger';
import GoalSetter from '@/components/GoalSetter';
import ProgressChart from '@/components/ProgressChart';
import FitnessMotivation from '@/components/FitnessMotivation';
import { useWorkout } from '@/context/WorkoutContext';

const Dashboard = () => {
  const [showWorkoutLogger, setShowWorkoutLogger] = useState(false);
  const [showGoalSetter, setShowGoalSetter] = useState(false);
  const { workouts, goals, getWeeklyStats } = useWorkout();
  
  const weeklyStats = getWeeklyStats();
  const todaysWorkouts = workouts.filter(w => 
    new Date(w.date).toDateString() === new Date().toDateString()
  );

  const totalCaloriesBurned = todaysWorkouts.reduce((sum, w) => sum + w.calories, 0);
  const totalWorkoutTime = todaysWorkouts.reduce((sum, w) => sum + w.duration, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to FitTrack! 💪
          </h1>
          <p className="text-gray-600">
            Track your fitness journey and achieve your goals
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-400 to-green-600 text-white transform hover:scale-105 transition-transform">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Calories</CardTitle>
              <Activity className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCaloriesBurned}</div>
              <p className="text-xs opacity-80">kcal burned</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-400 to-blue-600 text-white transform hover:scale-105 transition-transform">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Workout Time</CardTitle>
              <Calendar className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalWorkoutTime}</div>
              <p className="text-xs opacity-80">minutes today</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-400 to-purple-600 text-white transform hover:scale-105 transition-transform">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
              <Target className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{goals.length}</div>
              <p className="text-xs opacity-80">goals set</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-400 to-orange-600 text-white transform hover:scale-105 transition-transform">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
              <TrendingUp className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weeklyStats.totalWorkouts}</div>
              <p className="text-xs opacity-80">workouts this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button 
            onClick={() => setShowWorkoutLogger(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:shadow-lg transition-shadow"
          >
            <Plus className="w-5 h-5" />
            Log Workout
          </Button>
          <Button 
            onClick={() => setShowGoalSetter(true)}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg flex items-center gap-2 hover:shadow-lg transition-shadow"
          >
            <Target className="w-5 h-5" />
            Set Goal
          </Button>
        </div>

        {/* Motivation Section */}
        <div className="mb-8">
          <FitnessMotivation />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Chart */}
          <div className="lg:col-span-2">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ProgressChart />
              </CardContent>
            </Card>
          </div>

          {/* Goals Progress */}
          <div>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Goal Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {goals.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🎯</div>
                    <p className="text-gray-500">
                      No goals set yet. Create your first goal!
                    </p>
                  </div>
                ) : (
                  goals.map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{goal.title}</span>
                        <span className="text-sm text-gray-500">
                          {goal.current}/{goal.target}
                        </span>
                      </div>
                      <Progress 
                        value={(goal.current / goal.target) * 100} 
                        className="h-2"
                      />
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Workouts */}
        <Card className="mt-8 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Recent Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            {workouts.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">💪</div>
                <p className="text-gray-500 mb-4">
                  No workouts logged yet. Start your fitness journey!
                </p>
                <Button onClick={() => setShowWorkoutLogger(true)}>
                  Log Your First Workout
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {workouts.slice(0, 5).map((workout) => (
                  <div key={workout.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <h3 className="font-medium">{workout.exercise}</h3>
                      <p className="text-sm text-gray-600">
                        {workout.duration} min • {workout.calories} kcal
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(workout.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {showWorkoutLogger && (
        <WorkoutLogger onClose={() => setShowWorkoutLogger(false)} />
      )}
      {showGoalSetter && (
        <GoalSetter onClose={() => setShowGoalSetter(false)} />
      )}
    </div>
  );
};

export default Dashboard;
