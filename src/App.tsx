
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Create placeholder pages for other features
const SleepPage = () => (
  <div className="flex min-h-screen items-center justify-center bg-fitviz-dark text-white">
    <div className="text-center glassmorphism p-8 animate-pulse-glow">
      <h1 className="text-2xl font-bold mb-4 purple-neon-text">Sleep Coach</h1>
      <p>Coming soon! This feature is under development.</p>
    </div>
  </div>
);

const WaterPage = () => (
  <div className="flex min-h-screen items-center justify-center bg-fitviz-dark text-white">
    <div className="text-center glassmorphism p-8 animate-pulse-glow">
      <h1 className="text-2xl font-bold mb-4 neon-text">Water Intake & Body Water Index</h1>
      <p>Coming soon! This feature is under development.</p>
    </div>
  </div>
);

const NutritionPage = () => (
  <div className="flex min-h-screen items-center justify-center bg-fitviz-dark text-white">
    <div className="text-center glassmorphism p-8 animate-pulse-glow">
      <h1 className="text-2xl font-bold mb-4 pink-neon-text">Nutrition Goals & Meal Tracking</h1>
      <p>Coming soon! This feature is under development.</p>
    </div>
  </div>
);

const WorkoutsPage = () => (
  <div className="flex min-h-screen items-center justify-center bg-fitviz-dark text-white">
    <div className="text-center glassmorphism p-8 animate-pulse-glow">
      <h1 className="text-2xl font-bold mb-4 purple-neon-text">Workout Visualization & Recommendations</h1>
      <p>Coming soon! This feature is under development.</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sleep" element={<SleepPage />} />
          <Route path="/water" element={<WaterPage />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/workouts" element={<WorkoutsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
