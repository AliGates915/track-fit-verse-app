
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWorkout } from '@/context/WorkoutContext';
import WorkoutLogger from '@/components/WorkoutLogger';
import { Calendar, Clock, Flame } from 'lucide-react';

const Workouts = () => {
  const { workouts } = useWorkout();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTypeColor = (type) => {
    const colors = {
      'Cardio': 'bg-red-100 text-red-800',
      'Strength': 'bg-blue-100 text-blue-800',
      'Flexibility': 'bg-green-100 text-green-800',
      'Sports': 'bg-yellow-100 text-yellow-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || colors['Other'];
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Workouts</h1>
        <p className="text-gray-600">Log and track all your workouts</p>
      </div>

      {/* Workout Logger */}
      <Card>
        <CardHeader>
          <CardTitle>Log New Workout</CardTitle>
          <CardDescription>Add your latest workout session</CardDescription>
        </CardHeader>
        <CardContent>
          <WorkoutLogger />
        </CardContent>
      </Card>

      {/* Workouts List */}
      <Card>
        <CardHeader>
          <CardTitle>Workout History</CardTitle>
          <CardDescription>All your logged workouts</CardDescription>
        </CardHeader>
        <CardContent>
          {workouts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No workouts logged yet</p>
              <p className="text-sm text-gray-400">Start by logging your first workout above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {workouts.map((workout) => (
                <div key={workout.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-lg">{workout.exercise}</h3>
                      <Badge className={getTypeColor(workout.type)}>
                        {workout.type}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(workout.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{workout.duration} minutes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Flame className="h-4 w-4" />
                        <span>{workout.calories} calories</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Workouts;
