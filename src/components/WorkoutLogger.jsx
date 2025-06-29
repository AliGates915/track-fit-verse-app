
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWorkout } from '@/context/WorkoutContext';
import { toast } from '@/components/ui/use-toast';

const WorkoutLogger = () => {
  const { addWorkout } = useWorkout();
  const [formData, setFormData] = useState({
    exercise: '',
    duration: '',
    calories: '',
    type: ''
  });

  const workoutTypes = [
    'Cardio',
    'Strength',
    'Flexibility',
    'Sports',
    'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.exercise || !formData.duration || !formData.calories || !formData.type) {
      toast({
        title: "Please fill all fields",
        variant: "destructive"
      });
      return;
    }

    const workout = {
      exercise: formData.exercise,
      duration: parseInt(formData.duration),
      calories: parseInt(formData.calories),
      type: formData.type,
      date: new Date().toISOString()
    };

    addWorkout(workout);
    
    toast({
      title: "Workout logged successfully!",
      description: `${workout.exercise} - ${workout.duration}min, ${workout.calories} calories`
    });

    // Reset form
    setFormData({
      exercise: '',
      duration: '',
      calories: '',
      type: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="exercise">Exercise</Label>
          <Input
            id="exercise"
            type="text"
            placeholder="e.g., Running, Push-ups"
            value={formData.exercise}
            onChange={(e) => handleInputChange('exercise', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select workout type" />
            </SelectTrigger>
            <SelectContent>
              {workoutTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            placeholder="30"
            value={formData.duration}
            onChange={(e) => handleInputChange('duration', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="calories">Calories Burned</Label>
          <Input
            id="calories"
            type="number"
            placeholder="200"
            value={formData.calories}
            onChange={(e) => handleInputChange('calories', e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Log Workout
      </Button>
    </form>
  );
};

export default WorkoutLogger;
