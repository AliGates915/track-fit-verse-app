
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Target } from 'lucide-react';
import { useWorkout } from '@/context/WorkoutContext';
import { toast } from '@/hooks/use-toast';

interface GoalSetterProps {
  onClose: () => void;
}

const GoalSetter: React.FC<GoalSetterProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [type, setType] = useState<'calories' | 'workouts' | 'duration'>('workouts');
  const [deadline, setDeadline] = useState('');
  const { addGoal } = useWorkout();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !target || !deadline) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    addGoal({
      title,
      target: parseInt(target),
      current: 0,
      type,
      deadline,
    });

    toast({
      title: "Goal Set! 🎯",
      description: `Your new goal "${title}" has been created.`,
    });

    onClose();
  };

  const getTargetLabel = () => {
    switch (type) {
      case 'calories': return 'Total Calories';
      case 'workouts': return 'Number of Workouts';
      case 'duration': return 'Total Minutes';
      default: return 'Target';
    }
  };

  const getTargetPlaceholder = () => {
    switch (type) {
      case 'calories': return '5000';
      case 'workouts': return '20';
      case 'duration': return '600';
      default: return '100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Set New Goal
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Goal Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Lose 10 pounds this month"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Goal Type</Label>
              <Select value={type} onValueChange={(value: 'calories' | 'workouts' | 'duration') => setType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="workouts">Number of Workouts</SelectItem>
                  <SelectItem value="calories">Total Calories Burned</SelectItem>
                  <SelectItem value="duration">Total Workout Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target">{getTargetLabel()}</Label>
              <Input
                id="target"
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder={getTargetPlaceholder()}
                min="1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                Create Goal
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

export default GoalSetter;
