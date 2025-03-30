
import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardCard from "@/components/ui/dashboard-card";
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import PieChart from "@/components/charts/PieChart";
import { 
  User, 
  Moon, 
  Droplet, 
  Nut, 
  Dumbbell, 
  ChevronRight,
  ActivitySquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Mock data for charts
const weightData = [
  { date: 'Mon', weight: 76, target: 75 },
  { date: 'Tue', weight: 75.8, target: 75 },
  { date: 'Wed', weight: 75.5, target: 75 },
  { date: 'Thu', weight: 75.3, target: 75 },
  { date: 'Fri', weight: 75.1, target: 75 },
  { date: 'Sat', weight: 75.2, target: 75 },
  { date: 'Sun', weight: 74.9, target: 75 },
];

const sleepData = [
  { day: 'Mon', hours: 6.5, target: 8 },
  { day: 'Tue', hours: 7.2, target: 8 },
  { day: 'Wed', hours: 7.8, target: 8 },
  { day: 'Thu', hours: 6.9, target: 8 },
  { day: 'Fri', hours: 7.5, target: 8 },
  { day: 'Sat', hours: 8.3, target: 8 },
  { day: 'Sun', hours: 8.1, target: 8 },
];

const waterData = [
  { day: 'Mon', intake: 1.8, target: 2.5 },
  { day: 'Tue', intake: 2.1, target: 2.5 },
  { day: 'Wed', intake: 2.3, target: 2.5 },
  { day: 'Thu', intake: 2.7, target: 2.5 },
  { day: 'Fri', intake: 2.2, target: 2.5 },
  { day: 'Sat', intake: 1.9, target: 2.5 },
  { day: 'Sun', intake: 2.4, target: 2.5 },
];

const nutritionData = [
  { name: 'Protein', value: 95, color: '#00E5FF' },
  { name: 'Carbs', value: 148, color: '#A459D1' },
  { name: 'Fat', value: 65, color: '#F637EC' },
];

const workoutData = [
  { day: 'Mon', duration: 45 },
  { day: 'Tue', duration: 0 },
  { day: 'Wed', duration: 60 },
  { day: 'Thu', duration: 30 },
  { day: 'Fri', duration: 0 },
  { day: 'Sat', duration: 90 },
  { day: 'Sun', duration: 45 },
];

const Index = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Your Fitness Dashboard</h1>
        <p className="text-gray-400">Here's an overview of your fitness journey</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile & BMI Card */}
        <DashboardCard 
          title="Profile & BMI" 
          icon={<User className="text-fitviz-blue" />}
          glowEffect="blue"
        >
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold neon-text mb-2">23.6</div>
            <div className="text-sm text-gray-300 mb-4">Normal Weight</div>
            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
              <div className="bg-fitviz-blue h-full rounded-full" style={{ width: '68%' }}></div>
            </div>
            <div className="flex justify-between w-full mt-2 text-xs text-gray-400">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
            <Link to="/profile">
              <Button 
                variant="outline" 
                className="mt-4 border-fitviz-blue/50 text-fitviz-blue hover:bg-fitviz-blue/20"
              >
                View Details <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
        </DashboardCard>
        
        {/* Sleep Coach Card */}
        <DashboardCard 
          title="Sleep Coach" 
          icon={<Moon className="text-fitviz-purple" />}
          glowEffect="purple"
        >
          <div>
            <div className="flex justify-between items-end mb-3">
              <div>
                <div className="text-3xl font-bold purple-neon-text">7.5hrs</div>
                <div className="text-sm text-gray-300">Last Night</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-300">Weekly Avg.</div>
                <div className="text-lg font-semibold text-white">7.2hrs</div>
              </div>
            </div>
            <LineChart 
              data={sleepData} 
              lines={[
                { dataKey: 'hours', stroke: '#A459D1', name: 'Sleep Hours' },
                { dataKey: 'target', stroke: 'rgba(164,89,209,0.3)', name: 'Target' }
              ]}
              xAxisDataKey="day"
              height={150}
              showGrid={false}
              showLegend={false}
            />
            <Link to="/sleep">
              <Button 
                variant="outline" 
                className="mt-4 border-fitviz-purple/50 text-fitviz-purple hover:bg-fitviz-purple/20"
              >
                View Details <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
        </DashboardCard>
        
        {/* Water Intake Card */}
        <DashboardCard 
          title="Water Intake" 
          icon={<Droplet className="text-fitviz-blue" />}
          glowEffect="blue"
        >
          <div>
            <div className="flex items-end justify-between mb-3">
              <div>
                <div className="text-3xl font-bold neon-text">1.9L</div>
                <div className="text-sm text-gray-300">Today</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-sm text-gray-300">Daily Goal</div>
                <div className="text-lg font-semibold text-white">2.5L</div>
              </div>
            </div>
            <div className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-300">Progress</span>
                <span className="text-sm text-gray-300">76%</span>
              </div>
              <Progress value={76} className="bg-gray-700 h-2">
                <div className="h-full bg-fitviz-blue rounded-full" />
              </Progress>
            </div>
            <Link to="/water">
              <Button 
                variant="outline" 
                className="mt-4 border-fitviz-blue/50 text-fitviz-blue hover:bg-fitviz-blue/20"
              >
                View Details <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
        </DashboardCard>
        
        {/* Nutrition Card */}
        <DashboardCard 
          title="Nutrition" 
          icon={<Nut className="text-fitviz-pink" />}
          glowEffect="pink"
          className="md:col-span-2 lg:col-span-1"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-3xl font-bold pink-neon-text">1,850</div>
                <div className="text-sm text-gray-300">Calories Today</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-300">Daily Goal</div>
                <div className="text-lg font-semibold text-white">2,100</div>
              </div>
            </div>
            <div className="flex justify-center">
              <PieChart 
                data={nutritionData} 
                height={150}
                innerRadius={40}
                outerRadius={60}
                showLegend={true}
              />
            </div>
            <Link to="/nutrition">
              <Button 
                variant="outline" 
                className="mt-4 border-fitviz-pink/50 text-fitviz-pink hover:bg-fitviz-pink/20"
              >
                View Details <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
        </DashboardCard>
        
        {/* Workout Card */}
        <DashboardCard 
          title="Workouts" 
          icon={<Dumbbell className="text-fitviz-purple" />}
          glowEffect="purple"
          className="md:col-span-2 lg:col-span-2"
        >
          <div>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="glassmorphism p-3 rounded-lg">
                <div className="text-sm text-gray-300">This Week</div>
                <div className="text-2xl font-bold purple-neon-text">270 min</div>
                <div className="text-xs text-gray-400">5 workouts</div>
              </div>
              <div className="glassmorphism p-3 rounded-lg">
                <div className="text-sm text-gray-300">Most Active</div>
                <div className="text-xl font-bold text-white">Upper Body</div>
                <div className="text-xs text-gray-400">120 min this week</div>
              </div>
            </div>
            <BarChart
              data={workoutData}
              bars={[{ dataKey: 'duration', fill: '#A459D1', name: 'Minutes' }]}
              xAxisDataKey="day"
              height={180}
            />
            <Link to="/workouts">
              <Button 
                variant="outline" 
                className="mt-4 border-fitviz-purple/50 text-fitviz-purple hover:bg-fitviz-purple/20"
              >
                View Details <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
        </DashboardCard>
        
        {/* Weekly Summary Card */}
        <DashboardCard 
          title="Weekly Activity" 
          icon={<ActivitySquare className="text-fitviz-blue" />}
          className="col-span-1 md:col-span-3 lg:col-span-3"
        >
          <div className="p-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="glassmorphism p-4 rounded-lg">
                <h4 className="text-sm text-gray-300 mb-2">Weight Trend</h4>
                <LineChart 
                  data={weightData} 
                  lines={[
                    { dataKey: 'weight', stroke: '#00E5FF', name: 'Weight (kg)' },
                    { dataKey: 'target', stroke: 'rgba(0,229,255,0.3)', name: 'Target' }
                  ]}
                  xAxisDataKey="date"
                  height={150}
                  showGrid={false}
                  showLegend={false}
                />
              </div>
              <div className="glassmorphism p-4 rounded-lg">
                <h4 className="text-sm text-gray-300 mb-2">Sleep Pattern</h4>
                <LineChart 
                  data={sleepData} 
                  lines={[
                    { dataKey: 'hours', stroke: '#A459D1', name: 'Sleep Hours' },
                    { dataKey: 'target', stroke: 'rgba(164,89,209,0.3)', name: 'Target' }
                  ]}
                  xAxisDataKey="day"
                  height={150}
                  showGrid={false}
                  showLegend={false}
                />
              </div>
              <div className="glassmorphism p-4 rounded-lg">
                <h4 className="text-sm text-gray-300 mb-2">Water Intake</h4>
                <LineChart 
                  data={waterData} 
                  lines={[
                    { dataKey: 'intake', stroke: '#00E5FF', name: 'Water (L)' },
                    { dataKey: 'target', stroke: 'rgba(0,229,255,0.3)', name: 'Target' }
                  ]}
                  xAxisDataKey="day"
                  height={150}
                  showGrid={false}
                  showLegend={false}
                />
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
};

export default Index;
