
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, Plus, Calendar, TrendingUp, Award } from 'lucide-react';
import { useWorkout } from '@/context/WorkoutContext';
import GoalSetter from '@/components/GoalSetter';

const Goals = () => {
  const [showGoalSetter, setShowGoalSetter] = useState(false);
  const { goals } = useWorkout();

  const getGoalStatus = (goal: any) => {
    const percentage = (goal.current / goal.target) * 100;
    const isExpired = new Date(goal.deadline) < new Date();
    
    if (percentage >= 100) return { status: 'completed', color: 'bg-green-100 text-green-800' };
    if (isExpired) return { status: 'expired', color: 'bg-red-100 text-red-800' };
    if (percentage >= 75) return { status: 'on-track', color: 'bg-blue-100 text-blue-800' };
    return { status: 'in-progress', color: 'bg-yellow-100 text-yellow-800' };
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'calories': return '🔥';
      case 'workouts': return '💪';
      case 'duration': return '⏱️';
      default: return '🎯';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'calories': return 'Calories';
      case 'workouts': return 'Workouts';
      case 'duration': return 'Minutes';
      default: return 'Goal';
    }
  };

  const activeGoals = goals.filter(goal => (goal.current / goal.target) * 100 < 100);
  const completedGoals = goals.filter(goal => (goal.current / goal.target) * 100 >= 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Fitness Goals 🎯
            </h1>
            <p className="text-gray-600">
              Set and track your fitness objectives
            </p>
          </div>
          <Button 
            onClick={() => setShowGoalSetter(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white mt-4 sm:mt-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Set New Goal
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Goals</p>
                  <p className="text-2xl font-bold text-gray-900">{goals.length}</p>
                </div>
                <Target className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedGoals.length}</p>
                </div>
                <Award className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-yellow-600">{activeGoals.length}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Goals */}
        {activeGoals.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Goals</h2>
            <div className="grid gap-6">
              {activeGoals.map((goal) => {
                const percentage = Math.min((goal.current / goal.target) * 100, 100);
                const { status, color } = getGoalStatus(goal);
                const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <Card key={goal.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{getTypeIcon(goal.type)}</span>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {goal.title}
                            </h3>
                            <Badge className={color}>
                              {status.replace('-', ' ')}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-gray-600">
                            <span>
                              {goal.current} / {goal.target} {getTypeLabel(goal.type).toLowerCase()}
                            </span>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 sm:mt-0 sm:ml-6 text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {percentage.toFixed(1)}%
                          </div>
                          <div className="text-sm text-gray-500">Complete</div>
                        </div>
                      </div>
                      
                      <Progress value={percentage} className="h-3" />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Completed Goals 🏆</h2>
            <div className="grid gap-4">
              {completedGoals.map((goal) => (
                <Card key={goal.id} className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getTypeIcon(goal.type)}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {goal.title}
                          </h3>
                          <p className="text-green-600">
                            Completed: {goal.current} / {goal.target} {getTypeLabel(goal.type).toLowerCase()}
                          </p>
                        </div>
                      </div>
                      <Award className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {goals.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="text-gray-400 mb-4">
                <Target className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No goals set yet
              </h3>
              <p className="text-gray-500 mb-6">
                Set your first fitness goal and start tracking your progress!
              </p>
              <Button onClick={() => setShowGoalSetter(true)}>
                Set Your First Goal
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal */}
      {showGoalSetter && (
        <GoalSetter onClose={() => setShowGoalSetter(false)} />
      )}
    </div>
  );
};

export default Goals;
