
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardCard from "@/components/ui/dashboard-card";
import LineChart from "@/components/charts/LineChart";
import { User, Scale, Ruler, Calendar, TrendingDown, TrendingUp } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/components/ui/use-toast";

// Mock weight data for the chart
const weightData = [
  { date: 'Jan 1', weight: 78, bmi: 24.1 },
  { date: 'Jan 8', weight: 77.5, bmi: 23.9 },
  { date: 'Jan 15', weight: 76.8, bmi: 23.7 },
  { date: 'Jan 22', weight: 76.2, bmi: 23.5 },
  { date: 'Jan 29', weight: 75.5, bmi: 23.3 },
  { date: 'Feb 5', weight: 75.1, bmi: 23.2 },
  { date: 'Feb 12', weight: 74.8, bmi: 23.1 },
  { date: 'Feb 19', weight: 74.5, bmi: 23.0 },
  { date: 'Feb 26', weight: 74.0, bmi: 22.8 },
  { date: 'Mar 5', weight: 73.8, bmi: 22.8 },
  { date: 'Mar 12', weight: 73.6, bmi: 22.7 },
  { date: 'Mar 19', weight: 73.5, bmi: 22.7 },
  { date: 'Mar 26', weight: 73.2, bmi: 22.6 },
];

const Profile = () => {
  const { profile, updateProfile } = useUser();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    gender: profile.gender,
    age: profile.age,
    height: profile.height,
    weight: profile.weight,
  });

  // Update form data when profile changes
  useEffect(() => {
    setFormData({
      gender: profile.gender,
      age: profile.age,
      height: profile.height,
      weight: profile.weight,
    });
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    toast({
      title: "Profile updated",
      description: "Your profile data has been saved successfully.",
    });
  };

  // Calculate BMI based on current profile data
  const heightInMeters = Number(profile.height) / 100;
  const weightInKg = Number(profile.weight);
  const bmi = weightInKg / (heightInMeters * heightInMeters);
  
  // Determine BMI category
  let bmiCategory = "Normal weight";
  let bmiColor = "text-green-400";
  
  if (bmi < 18.5) {
    bmiCategory = "Underweight";
    bmiColor = "text-blue-400";
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory = "Overweight";
    bmiColor = "text-yellow-400";
  } else if (bmi >= 30) {
    bmiCategory = "Obese";
    bmiColor = "text-red-400";
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Profile & BMI Tracking</h1>
        <p className="text-gray-400">Update your profile and track your BMI over time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DashboardCard 
            title="Profile Information" 
            icon={<User className="text-fitviz-blue" />}
            glowEffect="blue"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange("gender", value)}
                >
                  <SelectTrigger className="bg-fitviz-dark-light border-gray-700">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <div className="flex items-center">
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    className="bg-fitviz-dark-light border-gray-700"
                  />
                  <Calendar className="ml-2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <div className="flex items-center">
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={handleChange}
                    className="bg-fitviz-dark-light border-gray-700"
                  />
                  <Ruler className="ml-2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <div className="flex items-center">
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={handleChange}
                    className="bg-fitviz-dark-light border-gray-700"
                  />
                  <Scale className="ml-2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-fitviz-blue hover:bg-fitviz-blue/80">
                Update Profile
              </Button>
            </form>
          </DashboardCard>
        </div>
        
        <div className="lg:col-span-2">
          <DashboardCard 
            title="BMI Analytics" 
            icon={<Scale className="text-fitviz-purple" />}
            glowEffect="purple"
          >
            <div className="mb-6">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-4xl font-bold purple-neon-text">{bmi.toFixed(1)}</div>
                  <div className={`text-lg ${bmiColor}`}>{bmiCategory}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-300">Weekly Change</div>
                  <div className="flex items-center">
                    <TrendingDown className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400">-0.3</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 w-full bg-gray-700 h-4 rounded-full overflow-hidden">
                <div className="flex h-full">
                  <div className="bg-blue-500 h-full" style={{ width: '18.5%' }}></div>
                  <div className="bg-green-500 h-full" style={{ width: '6.5%' }}></div>
                  <div className="bg-yellow-500 h-full" style={{ width: '5%' }}></div>
                  <div className="bg-red-500 h-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div className="flex justify-between w-full mt-1 text-xs text-gray-400">
                <span>Underweight<br/>&lt;18.5</span>
                <span>Normal<br/>18.5-24.9</span>
                <span>Overweight<br/>25-29.9</span>
                <span>Obese<br/>&gt;30</span>
              </div>
            </div>
            
            <LineChart 
              data={weightData} 
              lines={[
                { dataKey: 'weight', stroke: '#A459D1', name: 'Weight (kg)' },
                { dataKey: 'bmi', stroke: '#00E5FF', name: 'BMI' }
              ]}
              xAxisDataKey="date"
              height={250}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <Card className="glassmorphism p-4">
                <h3 className="text-sm font-medium mb-2 text-fitviz-blue">Your Progress</h3>
                <p className="text-sm text-gray-300">
                  You've lost 4.8kg in the last 3 months. Keep up the good work!
                </p>
              </Card>
              <Card className="glassmorphism p-4">
                <h3 className="text-sm font-medium mb-2 text-fitviz-pink">Recommendation</h3>
                <p className="text-sm text-gray-300">
                  Maintain your current diet and exercise routine to reach your target weight of 70kg.
                </p>
              </Card>
            </div>
          </DashboardCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
