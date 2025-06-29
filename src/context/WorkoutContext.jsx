
import React, { createContext, useContext, useState, useEffect } from 'react';

const WorkoutContext = createContext(undefined);

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [goals, setGoals] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedWorkouts = localStorage.getItem('fittrack-workouts');
    const savedGoals = localStorage.getItem('fittrack-goals');
    
    if (savedWorkouts) {
      setWorkouts(JSON.parse(savedWorkouts));
    }
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('fittrack-workouts', JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem('fittrack-goals', JSON.stringify(goals));
  }, [goals]);

  const addWorkout = (workout) => {
    const newWorkout = {
      ...workout,
      id: Date.now().toString(),
    };
    setWorkouts(prev => [newWorkout, ...prev]);
    
    // Update relevant goals
    setGoals(prev => prev.map(goal => {
      if (goal.type === 'calories') {
        return { ...goal, current: goal.current + workout.calories };
      } else if (goal.type === 'workouts') {
        return { ...goal, current: goal.current + 1 };
      } else if (goal.type === 'duration') {
        return { ...goal, current: goal.current + workout.duration };
      }
      return goal;
    }));
  };

  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoalProgress = (goalId, progress) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, current: progress } : goal
    ));
  };

  const getWeeklyStats = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const weeklyWorkouts = workouts.filter(workout => 
      new Date(workout.date) >= oneWeekAgo
    );
    
    return {
      totalWorkouts: weeklyWorkouts.length,
      totalCalories: weeklyWorkouts.reduce((sum, w) => sum + w.calories, 0),
      totalDuration: weeklyWorkouts.reduce((sum, w) => sum + w.duration, 0),
    };
  };

  return (
    <WorkoutContext.Provider value={{
      workouts,
      goals,
      addWorkout,
      addGoal,
      updateGoalProgress,
      getWeeklyStats,
    }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};
