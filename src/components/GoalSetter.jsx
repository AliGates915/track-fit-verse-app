
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWorkout } from '@/context/WorkoutContext';
import { toast } from '@/components/ui/use-toast';

const GoalSetter = () => {
  const { addGoal } = useWorkout();
  const [formData, setFormData] = useState({
    title: '',
    target: '',
    type: '',
    deadline: ''
  });

  const goalTypes = [
    { value: 'calories', label: 'Calories Burned' },
    { value: 'workouts', label: 'Number of Workouts' },
    { value: 'duration', label: 'Exercise Duration (minutes)' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.target || !formData.type || !formData.deadline) {
      toast({
        title: "Please fill all fields",
        variant: "destructive"
      });
      return;
    }

    const goal = {
      title: formData.title,
      target: parseInt(formData.target),
      current: 0,
      type: formData.type,
      deadline: formData.deadline
    };

    addGoal(goal);
    
    toast({
      title: "Goal created successfully!",
      description: `${goal.title} - Target: ${goal.target} ${goal.type}`
    });

    // Reset form
    setFormData({
      title: '',
      target: '',
      type: '',
      deadline: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Goal Title</Label>
          <Input
            id="title"
            type="text"
            placeholder="e.g., Summer Fitness Challenge"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Goal Type</Label>
          <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select goal type" />
            </SelectTrigger>
            <SelectContent>
              {goalTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="target">Target</Label>
          <Input
            id="target"
            type="number"
            placeholder="100"
            value={formData.target}
            onChange={(e) => handleInputChange('target', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="deadline">Deadline</Label>
          <Input
            id="deadline"
            type="date"
            value={formData.deadline}
            onChange={(e) => handleInputChange('deadline', e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Create Goal
      </Button>
    </form>
  );
};

export default GoalSetter;
