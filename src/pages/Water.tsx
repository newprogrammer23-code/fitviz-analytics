
import React, { useState } from "react";
import { Droplet, Plus, BarChart2, Bell } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardCard from "@/components/ui/dashboard-card";
import LineChart from "@/components/charts/LineChart";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const Water = () => {
  const { profile, waterIntake, addWaterIntake } = useUser();
  const { toast } = useToast();
  const [amount, setAmount] = useState(0.25);

  // Calculate recommended water intake based on weight
  const weight = Number(profile.weight);
  const recommendedWaterIntake = (weight * 0.033).toFixed(1); // 33ml per kg of body weight

  // Get today's water intake
  const today = new Date().toISOString().split('T')[0];
  const todayIntake = waterIntake.find(entry => entry.date === today)?.amount || 0;
  
  // Calculate water intake progress percentage
  const progressPercentage = Math.min(100, (todayIntake / Number(recommendedWaterIntake)) * 100);

  // Process data for chart
  const chartData = [...waterIntake]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-7)
    .map(entry => ({
      date: entry.date.split('-').slice(1).join('/'),
      intake: entry.amount,
      target: Number(recommendedWaterIntake)
    }));

  const handleAddWater = () => {
    addWaterIntake(amount);
    toast({
      title: "Water intake recorded",
      description: `Added ${amount}L to your daily water intake.`
    });
  };

  // Calculate Body Water Index (simplified version)
  const gender = profile.gender;
  const age = Number(profile.age);
  
  let baseHydrationPercentage = gender === 'male' ? 60 : 55;
  // Adjust for age
  if (age > 50) baseHydrationPercentage -= 5;
  
  // Adjust based on today's intake vs recommended
  const intakeAdjustment = (todayIntake / Number(recommendedWaterIntake)) * 10;
  const bodyWaterIndex = Math.min(100, Math.max(0, baseHydrationPercentage + intakeAdjustment));

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Water Intake Tracker</h1>
        <p className="text-gray-400">Monitor your hydration levels and set reminders</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DashboardCard 
            title="Log Water Intake" 
            icon={<Droplet className="text-fitviz-blue" />}
            glowEffect="blue"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="waterAmount">Amount (Liters)</Label>
                <div className="flex items-center">
                  <Input
                    id="waterAmount"
                    type="number"
                    step="0.05"
                    min="0.05"
                    max="2"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="bg-fitviz-dark-light border-gray-700"
                  />
                  <Droplet className="ml-2 h-4 w-4 text-fitviz-blue" />
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {[0.1, 0.25, 0.5, 1].map((val) => (
                  <Button 
                    key={val}
                    variant="outline" 
                    className="bg-fitviz-dark-light border-gray-700 hover:bg-fitviz-blue/20"
                    onClick={() => setAmount(val)}
                  >
                    {val}L
                  </Button>
                ))}
              </div>
              
              <Button 
                className="w-full bg-fitviz-blue hover:bg-fitviz-blue/80"
                onClick={handleAddWater}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Water
              </Button>
            </div>
          </DashboardCard>
          
          <DashboardCard 
            title="Water Reminder"
            icon={<Bell className="text-fitviz-blue" />}
            glowEffect="blue"
            className="mt-6"
          >
            <div className="space-y-4">
              <p className="text-sm text-gray-300">
                Set reminders to drink water throughout the day.
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="bg-fitviz-dark-light border-gray-700 hover:bg-fitviz-blue/20">
                  Every 1 hour
                </Button>
                <Button variant="outline" className="bg-fitviz-dark-light border-gray-700 hover:bg-fitviz-blue/20">
                  Every 2 hours
                </Button>
                <Button variant="outline" className="bg-fitviz-dark-light border-gray-700 hover:bg-fitviz-blue/20">
                  Every 3 hours
                </Button>
                <Button variant="outline" className="bg-fitviz-dark-light border-gray-700 hover:bg-fitviz-blue/20">
                  Custom
                </Button>
              </div>
              
              <Button className="w-full bg-fitviz-blue hover:bg-fitviz-blue/80">
                Set Reminder
              </Button>
            </div>
          </DashboardCard>
        </div>
        
        <div className="lg:col-span-2">
          <DashboardCard 
            title="Hydration Analytics" 
            icon={<BarChart2 className="text-fitviz-blue" />}
            glowEffect="blue"
          >
            <div className="mb-6">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="glassmorphism p-4 rounded-xl">
                  <div className="text-2xl font-bold neon-text">{todayIntake.toFixed(1)}L</div>
                  <div className="text-xs text-gray-300">Today's Intake</div>
                </div>
                <div className="glassmorphism p-4 rounded-xl">
                  <div className="text-2xl font-bold text-fitviz-purple">{recommendedWaterIntake}L</div>
                  <div className="text-xs text-gray-300">Recommended</div>
                </div>
                <div className="glassmorphism p-4 rounded-xl">
                  <div className="text-2xl font-bold text-fitviz-pink">{bodyWaterIndex.toFixed(1)}%</div>
                  <div className="text-xs text-gray-300">Body Water Index</div>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-300">Today's Progress</span>
                  <span className="text-sm text-fitviz-blue">{progressPercentage.toFixed(0)}%</span>
                </div>
                <Progress 
                  value={progressPercentage} 
                  className="h-2.5 bg-gray-700" 
                  indicatorClassName="bg-gradient-to-r from-fitviz-blue to-fitviz-purple" 
                />
              </div>
            </div>
            
            <LineChart 
              data={chartData} 
              lines={[
                { dataKey: 'intake', stroke: '#00E5FF', name: 'Daily Intake (L)' },
                { dataKey: 'target', stroke: '#A459D1', name: 'Target (L)', strokeDasharray: '5 5' }
              ]}
              xAxisDataKey="date"
              height={250}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <Card className="glassmorphism p-4">
                <h3 className="text-sm font-medium mb-2 text-fitviz-blue">Hydration Status</h3>
                <p className="text-sm text-gray-300">
                  {progressPercentage >= 100 
                    ? "Great job! You've reached your water intake goal for today." 
                    : `You still need ${(Number(recommendedWaterIntake) - todayIntake).toFixed(1)}L more water to reach your daily goal.`}
                </p>
              </Card>
              <Card className="glassmorphism p-4">
                <h3 className="text-sm font-medium mb-2 text-fitviz-pink">Tip of the Day</h3>
                <p className="text-sm text-gray-300">
                  Drinking water before meals can help reduce appetite and support weight management.
                </p>
              </Card>
            </div>
          </DashboardCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Water;
