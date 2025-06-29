
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

const FitnessMotivation = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  const motivationalQuotes = [
    "The only bad workout is the one that didn't happen.",
    "Your body can do it. It's time to convince your mind.",
    "Progress, not perfection.",
    "Every workout counts, no matter how small.",
    "You're stronger than your excuses."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5" />
          <p className="text-sm font-medium">
            {motivationalQuotes[currentQuote]}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FitnessMotivation;
