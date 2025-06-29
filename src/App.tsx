
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WorkoutProvider } from "@/context/WorkoutContext";
import Navigation from "@/components/Navigation";
import Dashboard from "@/pages/Dashboard";
import Workouts from "@/pages/Workouts";
import Goals from "@/pages/Goals";
import Progress from "@/pages/Progress";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WorkoutProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/progress" element={<Progress />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </WorkoutProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
