import React, { useState } from "react";
import { Utensils, Plus, PieChartIcon, Apple } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardCard from "@/components/ui/dashboard-card";
import PieChart from "@/components/charts/PieChart";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const foodDatabase = [
  { name: "Chicken Breast", calories: 165, carbs: 0, protein: 31, fat: 3.6 },
  { name: "Brown Rice", calories: 216, carbs: 45, protein: 5, fat: 1.8 },
  { name: "Salmon", calories: 206, carbs: 0, protein: 22, fat: 13 },
  { name: "Broccoli", calories: 55, carbs: 11, protein: 3.7, fat: 0.6 },
  { name: "Sweet Potato", calories: 86, carbs: 20, protein: 1.6, fat: 0.1 },
  { name: "Avocado", calories: 160, carbs: 8.5, protein: 2, fat: 14.7 },
  { name: "Greek Yogurt", calories: 100, carbs: 3.6, protein: 17, fat: 0.4 },
  { name: "Banana", calories: 105, carbs: 27, protein: 1.3, fat: 0.4 },
  { name: "Eggs", calories: 78, carbs: 0.6, protein: 6.3, fat: 5.3 },
  { name: "Quinoa", calories: 120, carbs: 21, protein: 4.4, fat: 1.9 },
];

const Nutrition = () => {
  const { profile, meals, addMeal } = useUser();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
    mealType: "breakfast" as 'breakfast' | 'lunch' | 'dinner' | 'snack'
  });
  const [selectedFood, setSelectedFood] = useState("");

  const today = new Date().toISOString().split('T')[0];
  const todayMeals = meals.filter(meal => meal.date === today);
  
  const totalCalories = todayMeals.reduce((acc, meal) => acc + meal.calories, 0);
  const totalCarbs = todayMeals.reduce((acc, meal) => acc + meal.carbs, 0);
  const totalProtein = todayMeals.reduce((acc, meal) => acc + meal.protein, 0);
  const totalFat = todayMeals.reduce((acc, meal) => acc + meal.fat, 0);
  
  const weight = Number(profile.weight);
  const recommendedCalories = profile.gender === 'male' ? 2500 : 2000;
  const recommendedProtein = weight * 1.6;
  const recommendedFat = (recommendedCalories * 0.25) / 9;
  const recommendedCarbs = (recommendedCalories * 0.5) / 4;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'name' ? value : Number(value) 
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === 'mealType') {
      setFormData(prev => ({ ...prev, [name]: value as any }));
    } else if (name === 'foodSelect') {
      const food = foodDatabase.find(f => f.name === value);
      if (food) {
        setSelectedFood(value);
        setFormData(prev => ({
          ...prev,
          name: food.name,
          calories: food.calories,
          carbs: food.carbs,
          protein: food.protein,
          fat: food.fat
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.name.trim() === '') {
      toast({
        title: "Error",
        description: "Please enter a meal name",
        variant: "destructive"
      });
      return;
    }
    
    addMeal(formData);
    
    toast({
      title: "Meal added",
      description: "Your meal has been recorded successfully."
    });
    
    setFormData({
      name: "",
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
      mealType: "breakfast"
    });
    setSelectedFood("");
  };

  const macroData = [
    { name: 'Carbs', value: totalCarbs, color: '#00E5FF' },
    { name: 'Protein', value: totalProtein, color: '#A459D1' },
    { name: 'Fat', value: totalFat, color: '#F637EC' }
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Nutrition Tracker</h1>
        <p className="text-gray-400">Track your meals and monitor your macronutrients</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DashboardCard 
            title="Add Meal" 
            icon={<Utensils className="text-fitviz-pink" />}
            glowEffect="pink"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mealType">Meal Type</Label>
                <Select
                  value={formData.mealType}
                  onValueChange={(value) => handleSelectChange("mealType", value)}
                >
                  <SelectTrigger className="bg-fitviz-dark-light border-gray-700">
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="foodSelect">Select from Database</Label>
                <Select
                  value={selectedFood}
                  onValueChange={(value) => handleSelectChange("foodSelect", value)}
                >
                  <SelectTrigger className="bg-fitviz-dark-light border-gray-700">
                    <SelectValue placeholder="Search food..." />
                  </SelectTrigger>
                  <SelectContent>
                    {foodDatabase.map((food) => (
                      <SelectItem key={food.name} value={food.name}>
                        {food.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Food Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-fitviz-dark-light border-gray-700"
                  placeholder="Enter food name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="calories">Calories</Label>
                  <Input
                    id="calories"
                    name="calories"
                    type="number"
                    value={formData.calories}
                    onChange={handleChange}
                    className="bg-fitviz-dark-light border-gray-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="carbs">Carbs (g)</Label>
                  <Input
                    id="carbs"
                    name="carbs"
                    type="number"
                    value={formData.carbs}
                    onChange={handleChange}
                    className="bg-fitviz-dark-light border-gray-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="protein">Protein (g)</Label>
                  <Input
                    id="protein"
                    name="protein"
                    type="number"
                    value={formData.protein}
                    onChange={handleChange}
                    className="bg-fitviz-dark-light border-gray-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fat">Fat (g)</Label>
                  <Input
                    id="fat"
                    name="fat"
                    type="number"
                    value={formData.fat}
                    onChange={handleChange}
                    className="bg-fitviz-dark-light border-gray-700"
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-fitviz-pink hover:bg-fitviz-pink/80">
                <Plus className="mr-2 h-4 w-4" /> Add Meal
              </Button>
            </form>
          </DashboardCard>
        </div>
        
        <div className="lg:col-span-2">
          <DashboardCard 
            title="Nutrition Overview" 
            icon={<PieChartIcon className="text-fitviz-pink" />}
            glowEffect="pink"
          >
            <div className="grid grid-cols-4 gap-2 mb-6">
              <div className="glassmorphism p-3 rounded-xl">
                <div className="text-xl font-bold pink-neon-text">{totalCalories}</div>
                <div className="text-xs text-gray-300">Calories</div>
                <div className="text-xs text-gray-400">{Math.round(totalCalories / recommendedCalories * 100)}%</div>
              </div>
              <div className="glassmorphism p-3 rounded-xl">
                <div className="text-xl font-bold text-fitviz-blue">{totalCarbs}g</div>
                <div className="text-xs text-gray-300">Carbs</div>
                <div className="text-xs text-gray-400">{Math.round(totalCarbs / recommendedCarbs * 100)}%</div>
              </div>
              <div className="glassmorphism p-3 rounded-xl">
                <div className="text-xl font-bold text-fitviz-purple">{totalProtein}g</div>
                <div className="text-xs text-gray-300">Protein</div>
                <div className="text-xs text-gray-400">{Math.round(totalProtein / recommendedProtein * 100)}%</div>
              </div>
              <div className="glassmorphism p-3 rounded-xl">
                <div className="text-xl font-bold text-fitviz-pink">{totalFat}g</div>
                <div className="text-xs text-gray-300">Fat</div>
                <div className="text-xs text-gray-400">{Math.round(totalFat / recommendedFat * 100)}%</div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
              <div className="w-full md:w-1/2 h-64">
                <PieChart 
                  data={macroData}
                  height={250}
                  showLegend={true}
                />
              </div>
              
              <div className="w-full md:w-1/2 space-y-2">
                <h3 className="text-lg font-medium mb-3">Today's Meals</h3>
                {todayMeals.length === 0 ? (
                  <p className="text-gray-400">No meals recorded today</p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {todayMeals.map((meal) => (
                      <div key={meal.id} className="glassmorphism p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">{meal.name}</span>
                            <span className="text-xs text-gray-400 ml-2 capitalize">{meal.mealType}</span>
                          </div>
                          <span className="text-fitviz-pink">{meal.calories} cal</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1 mt-1">
                          <span className="text-xs text-gray-300">Carbs: {meal.carbs}g</span>
                          <span className="text-xs text-gray-300">Protein: {meal.protein}g</span>
                          <span className="text-xs text-gray-300">Fat: {meal.fat}g</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <Card className="glassmorphism p-4">
                <h3 className="text-sm font-medium mb-2 text-fitviz-blue">Nutrition Insight</h3>
                <p className="text-sm text-gray-300">
                  {totalProtein < recommendedProtein * 0.8 
                    ? "Your protein intake is below recommended levels. Consider adding more lean protein sources to your diet."
                    : "Your protein intake is within the healthy range. Great job maintaining a balanced diet!"}
                </p>
              </Card>
              <Card className="glassmorphism p-4">
                <h3 className="text-sm font-medium mb-2 text-fitviz-pink">Food Recommendation</h3>
                <p className="text-sm text-gray-300">
                  Based on your current intake, adding foods rich in {
                    totalProtein < recommendedProtein * 0.8 ? "protein like Greek yogurt or chicken" :
                    totalCarbs < recommendedCarbs * 0.8 ? "complex carbs like sweet potatoes or quinoa" :
                    "healthy fats like avocados or nuts"
                  } could help balance your nutrition.
                </p>
              </Card>
            </div>
          </DashboardCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Nutrition;
