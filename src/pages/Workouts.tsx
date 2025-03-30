
import React, { useState } from "react";
import { Dumbbell, Stopwatch, Plus, BarChart2, Target } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardCard from "@/components/ui/dashboard-card";
import BarChart from "@/components/charts/BarChart";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Define muscle groups for selection
const muscleGroups = [
  "chest", "back", "shoulders", "biceps", "triceps", "forearms", 
  "abs", "legs", "glutes", "calves", "cardiovascular"
];

// Sample workout exercises
const workoutExercises = [
  { name: "Push-ups", muscleGroups: ["chest", "shoulders", "triceps"] },
  { name: "Pull-ups", muscleGroups: ["back", "biceps"] },
  { name: "Squats", muscleGroups: ["legs", "glutes"] },
  { name: "Lunges", muscleGroups: ["legs", "glutes"] },
  { name: "Bench Press", muscleGroups: ["chest", "shoulders", "triceps"] },
  { name: "Deadlift", muscleGroups: ["back", "legs", "glutes"] },
  { name: "Shoulder Press", muscleGroups: ["shoulders"] },
  { name: "Bicep Curls", muscleGroups: ["biceps"] },
  { name: "Tricep Dips", muscleGroups: ["triceps"] },
  { name: "Crunches", muscleGroups: ["abs"] },
  { name: "Running", muscleGroups: ["cardiovascular", "legs"] },
  { name: "Cycling", muscleGroups: ["cardiovascular", "legs"] },
];

const Workouts = () => {
  const { workouts, addWorkout } = useUser();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    duration: 30,
    intensity: "medium" as "low" | "medium" | "high",
    muscleGroups: [] as string[]
  });
  const [selectedExercise, setSelectedExercise] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'name' ? value : Number(value) 
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === 'intensity') {
      setFormData(prev => ({ ...prev, [name]: value as any }));
    } else if (name === 'exerciseSelect') {
      const exercise = workoutExercises.find(e => e.name === value);
      if (exercise) {
        setSelectedExercise(value);
        setFormData(prev => ({
          ...prev,
          name: exercise.name,
          muscleGroups: exercise.muscleGroups
        }));
      }
    }
  };

  const handleMuscleGroupChange = (group: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        muscleGroups: [...prev.muscleGroups, group]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        muscleGroups: prev.muscleGroups.filter(g => g !== group)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.name.trim() === '') {
      toast({
        title: "Error",
        description: "Please enter an exercise name",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.muscleGroups.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one muscle group",
        variant: "destructive"
      });
      return;
    }
    
    addWorkout(formData);
    
    toast({
      title: "Workout added",
      description: "Your workout has been recorded successfully."
    });
    
    // Reset form
    setFormData({
      name: "",
      duration: 30,
      intensity: "medium",
      muscleGroups: []
    });
    setSelectedExercise("");
  };

  // Process workout data for analysis
  const today = new Date().toISOString().split('T')[0];
  const recentWorkouts = workouts.slice(0, 10);
  
  // Count muscle groups frequency
  const muscleGroupFrequency: Record<string, number> = {};
  workouts.forEach(workout => {
    workout.muscleGroups.forEach(group => {
      muscleGroupFrequency[group] = (muscleGroupFrequency[group] || 0) + 1;
    });
  });
  
  // Prepare data for the chart
  const muscleGroupData = Object.entries(muscleGroupFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7)
    .map(([group, count]) => ({
      name: group.charAt(0).toUpperCase() + group.slice(1),
      count
    }));

  // Identify less worked muscle groups
  const lessWorkedGroups = muscleGroups
    .filter(group => !muscleGroupFrequency[group] || muscleGroupFrequency[group] < 2)
    .slice(0, 3);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Workout Tracker</h1>
        <p className="text-gray-400">Log your workouts and track your progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DashboardCard 
            title="Log Workout" 
            icon={<Dumbbell className="text-fitviz-purple" />}
            glowEffect="purple"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="exerciseSelect">Select Exercise</Label>
                <Select
                  value={selectedExercise}
                  onValueChange={(value) => handleSelectChange("exerciseSelect", value)}
                >
                  <SelectTrigger className="bg-fitviz-dark-light border-gray-700">
                    <SelectValue placeholder="Choose exercise..." />
                  </SelectTrigger>
                  <SelectContent>
                    {workoutExercises.map((exercise) => (
                      <SelectItem key={exercise.name} value={exercise.name}>
                        {exercise.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Exercise Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-fitviz-dark-light border-gray-700"
                  placeholder="Enter custom exercise"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <div className="flex items-center">
                  <Input
                    id="duration"
                    name="duration"
                    type="number"
                    min="1"
                    value={formData.duration}
                    onChange={handleChange}
                    className="bg-fitviz-dark-light border-gray-700"
                  />
                  <Stopwatch className="ml-2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="intensity">Intensity</Label>
                <Select
                  value={formData.intensity}
                  onValueChange={(value) => handleSelectChange("intensity", value)}
                >
                  <SelectTrigger className="bg-fitviz-dark-light border-gray-700">
                    <SelectValue placeholder="Select intensity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Muscle Groups</Label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1">
                  {muscleGroups.map((group) => (
                    <div key={group} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`muscle-${group}`} 
                        checked={formData.muscleGroups.includes(group)}
                        onCheckedChange={(checked) => 
                          handleMuscleGroupChange(group, checked as boolean)
                        }
                      />
                      <label 
                        htmlFor={`muscle-${group}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                      >
                        {group}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-fitviz-purple hover:bg-fitviz-purple/80">
                <Plus className="mr-2 h-4 w-4" /> Log Workout
              </Button>
            </form>
          </DashboardCard>
        </div>
        
        <div className="lg:col-span-2">
          <DashboardCard 
            title="Workout Analysis" 
            icon={<BarChart2 className="text-fitviz-purple" />}
            glowEffect="purple"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
              <div className="w-full md:w-1/2 h-64">
                <BarChart 
                  data={muscleGroupData} 
                  xAxisDataKey="name"
                  bars={[
                    { dataKey: 'count', fill: '#A459D1', name: 'Workouts' }
                  ]}
                  height={250}
                />
              </div>
              
              <div className="w-full md:w-1/2 space-y-2">
                <h3 className="text-lg font-medium mb-3">Recent Workouts</h3>
                {recentWorkouts.length === 0 ? (
                  <p className="text-gray-400">No workouts recorded yet</p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {recentWorkouts.map((workout) => (
                      <div key={workout.id} className="glassmorphism p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{workout.name}</span>
                          <div className="flex items-center">
                            <span className={`text-xs rounded px-2 py-0.5 mr-2 ${
                              workout.intensity === 'high' ? 'bg-red-500/20 text-red-400' :
                              workout.intensity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {workout.intensity}
                            </span>
                            <span className="text-fitviz-blue">{workout.duration} min</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {workout.muscleGroups.map(group => (
                            <span key={group} className="text-xs bg-fitviz-dark-light px-2 py-0.5 rounded-full text-gray-300 capitalize">
                              {group}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <Card className="glassmorphism p-4">
                <h3 className="text-sm font-medium mb-2 text-fitviz-blue">Workout Insights</h3>
                <p className="text-sm text-gray-300">
                  {lessWorkedGroups.length > 0 
                    ? `Consider focusing more on these muscle groups: ${lessWorkedGroups.map(g => g.charAt(0).toUpperCase() + g.slice(1)).join(', ')}.`
                    : "You're maintaining a good balance across different muscle groups. Keep it up!"}
                </p>
              </Card>
              <Card className="glassmorphism p-4">
                <h3 className="text-sm font-medium mb-2 text-fitviz-pink">Recommended Workouts</h3>
                <p className="text-sm text-gray-300">
                  Try adding {
                    lessWorkedGroups.includes('chest') ? "Push-ups or Bench Press" :
                    lessWorkedGroups.includes('back') ? "Pull-ups or Rows" :
                    lessWorkedGroups.includes('legs') ? "Squats or Lunges" :
                    lessWorkedGroups.includes('abs') ? "Planks or Crunches" :
                    "HIIT or Circuit Training"
                  } to your routine to improve overall fitness.
                </p>
              </Card>
            </div>
          </DashboardCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Workouts;
