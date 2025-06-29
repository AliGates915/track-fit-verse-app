
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Dumbbell } from 'lucide-react';
import { useWorkout } from '@/context/WorkoutContext';
import { toast } from '@/hooks/use-toast';

interface WorkoutLoggerProps {
  onClose: () => void;
}

const WorkoutLogger: React.FC<WorkoutLoggerProps> = ({ onClose }) => {
  const [exercise, setExercise] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [type, setType] = useState('');
  const { addWorkout } = useWorkout();

  const exerciseOptions = [
    'Running', 'Cycling', 'Swimming', 'Weight Training', 'Yoga', 
    'Push-ups', 'Pull-ups', 'Squats', 'Planks', 'Burpees',
    'Jumping Jacks', 'Mountain Climbers', 'Lunges', 'Deadlifts'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!exercise || !duration || !calories || !type) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    addWorkout({
      exercise,
      duration: parseInt(duration),
      calories: parseInt(calories),
      type,
      date: new Date().toISOString(),
    });

    toast({
      title: "Workout Logged! 🎉",
      description: `Great job! You burned ${calories} calories in ${duration} minutes.`,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5" />
            Log Workout
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="exercise">Exercise</Label>
              <Select value={exercise} onValueChange={setExercise}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an exercise" />
                </SelectTrigger>
                <SelectContent>
                  {exerciseOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Workout Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select workout type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="strength">Strength Training</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (min)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="30"
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  placeholder="200"
                  min="1"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                Log Workout
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutLogger;
