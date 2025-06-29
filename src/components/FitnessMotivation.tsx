
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCw } from 'lucide-react';

const FitnessMotivation = () => {
  const [currentTip, setCurrentTip] = useState('');
  const [currentQuote, setCurrentQuote] = useState('');

  const fitnessQuotes = [
    "The only bad workout is the one that didn't happen. 💪",
    "Your body can do it. It's your mind you have to convince. 🧠",
    "Don't stop when you're tired. Stop when you're done. 🔥",
    "Success isn't given. It's earned in the gym. 🏆",
    "The pain you feel today will be the strength you feel tomorrow. 💯",
    "Make yourself proud! 🌟",
    "Every workout is progress, no matter how small. 📈",
    "Champions train, losers complain. 🥇",
  ];

  const fitnessTips = [
    "💧 Drink water before, during, and after your workout to stay hydrated.",
    "🔥 Warm up for 5-10 minutes before exercising to prevent injury.",
    "🍎 Eat a balanced meal 2-3 hours before working out for optimal energy.",
    "😴 Get 7-9 hours of sleep for proper muscle recovery.",
    "📱 Track your progress to stay motivated and see improvements.",
    "🎵 Create an upbeat playlist to keep you energized during workouts.",
    "👥 Find a workout buddy for accountability and motivation.",
    "🧘 Include stretching or yoga in your routine for flexibility.",
    "🥗 Focus on protein intake post-workout for muscle recovery.",
    "📅 Schedule your workouts like important appointments.",
  ];

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * fitnessQuotes.length);
    setCurrentQuote(fitnessQuotes[randomIndex]);
  };

  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * fitnessTips.length);
    setCurrentTip(fitnessTips[randomIndex]);
  };

  useEffect(() => {
    getRandomQuote();
    getRandomTip();
  }, []);

  return (
    <div className="space-y-4">
      {/* Motivational Quote */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-semibold">Daily Motivation</h3>
              </div>
              <p className="text-lg font-medium leading-relaxed">
                {currentQuote}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={getRandomQuote}
              className="text-white hover:bg-white/20 ml-4"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Fitness Tip */}
      <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-xl">💡</div>
                <h3 className="font-semibold">Fitness Tip</h3>
              </div>
              <p className="leading-relaxed">
                {currentTip}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={getRandomTip}
              className="text-white hover:bg-white/20 ml-4"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FitnessMotivation;
