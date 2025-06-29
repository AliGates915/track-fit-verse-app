
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useWorkout } from '@/context/WorkoutContext';
import GoalSetter from '@/components/GoalSetter';
import { Target, Calendar, TrendingUp } from 'lucide-react';

const Goals = () => {
  const { goals } = useWorkout();

  const getStatusColor = (current, target) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return 'bg-green-100 text-green-800';
    if (percentage >= 75) return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

  const getStatusText = (current, target) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return 'Completed';
    if (percentage >= 75) return 'Almost There';
    return 'In Progress';
  };

  const formatDeadline = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Goals</h1>
        <p className="text-gray-600">Set and track your fitness goals</p>
      </div>

      {/* Goal Setter */}
      <Card>
        <CardHeader>
          <CardTitle>Set New Goal</CardTitle>
          <CardDescription>Create a new fitness goal to work towards</CardDescription>
        </CardHeader>
        <CardContent>
          <GoalSetter />
        </CardContent>
      </Card>

      {/* Goals List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Goals</CardTitle>
          <CardDescription>Track your progress towards your goals</CardDescription>
        </CardHeader>
        <CardContent>
          {goals.length === 0 ? (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No goals set yet</p>
              <p className="text-sm text-gray-400">Create your first goal above to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map((goal) => {
                const progressPercentage = Math.min((goal.current / goal.target) * 100, 100);
                
                return (
                  <div key={goal.id} className="p-6 border rounded-lg space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{goal.title}</h3>
                        <Badge className={getStatusColor(goal.current, goal.target)}>
                          {getStatusText(goal.current, goal.target)}
                        </Badge>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDeadline(goal.deadline)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{goal.current} / {goal.target} {goal.type}</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                      <div className="text-xs text-gray-500 text-right">
                        {progressPercentage.toFixed(1)}% complete
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>Target: {goal.target} {goal.type}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Goals;
