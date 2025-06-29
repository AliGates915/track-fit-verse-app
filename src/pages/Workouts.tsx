
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Plus, Calendar, Clock, Flame } from 'lucide-react';
import { useWorkout } from '@/context/WorkoutContext';
import WorkoutLogger from '@/components/WorkoutLogger';

const Workouts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showWorkoutLogger, setShowWorkoutLogger] = useState(false);
  const { workouts } = useWorkout();

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.exercise.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || workout.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cardio': return 'bg-red-100 text-red-800';
      case 'strength': return 'bg-blue-100 text-blue-800';
      case 'flexibility': return 'bg-green-100 text-green-800';
      case 'sports': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Workout History 📚
            </h1>
            <p className="text-gray-600">
              Track and review all your workouts
            </p>
          </div>
          <Button 
            onClick={() => setShowWorkoutLogger(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white mt-4 sm:mt-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Log New Workout
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search workouts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 w-4 h-4" />
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="cardio">Cardio</SelectItem>
                    <SelectItem value="strength">Strength</SelectItem>
                    <SelectItem value="flexibility">Flexibility</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workout List */}
        {filteredWorkouts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="text-gray-400 mb-4">
                <Calendar className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No workouts found
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || filterType !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start your fitness journey by logging your first workout!'
                }
              </p>
              <Button onClick={() => setShowWorkoutLogger(true)}>
                Log Your First Workout
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredWorkouts.map((workout) => (
              <Card key={workout.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {workout.exercise}
                        </h3>
                        <Badge className={getTypeColor(workout.type)}>
                          {workout.type}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{workout.duration} minutes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="w-4 h-4" />
                          <span>{workout.calories} calories</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(workout.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 sm:ml-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {workout.calories}
                        </div>
                        <div className="text-sm text-gray-500">kcal</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showWorkoutLogger && (
        <WorkoutLogger onClose={() => setShowWorkoutLogger(false)} />
      )}
    </div>
  );
};

export default Workouts;
