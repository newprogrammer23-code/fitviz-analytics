
import React, { useState } from "react";
import { Moon, Clock, BedDouble, Sunrise, AlarmClock, Plus } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardCard from "@/components/ui/dashboard-card";
import LineChart from "@/components/charts/LineChart";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { useNotifications } from "@/context/NotificationContext";

const Sleep = () => {
  const { sleepData, addSleepEntry } = useUser();
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const [formData, setFormData] = useState({
    hoursSlept: 7.5,
    restTime: "23:00",
    wakeUpTime: "06:30"
  });
  const [reminderSet, setReminderSet] = useState(false);
  const [bedtimeReminder, setBedtimeReminder] = useState("22:30");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    
    addSleepEntry({
      date: today,
      hoursSlept: Number(formData.hoursSlept),
      restTime: formData.restTime,
      wakeUpTime: formData.wakeUpTime
    });

    toast({
      title: "Sleep data added",
      description: "Your sleep data has been recorded successfully."
    });
  };

  // Process data for chart
  const chartData = [...sleepData]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-7)
    .map(entry => ({
      date: entry.date.split('-').slice(1).join('/'),
      hours: entry.hoursSlept
    }));

  // Calculate average hours slept
  const avgSleep = sleepData.length 
    ? sleepData.reduce((acc, curr) => acc + curr.hoursSlept, 0) / sleepData.length
    : 0;

  // Generate sleep insights
  const getSleepInsight = () => {
    if (avgSleep < 6) {
      return "Your sleep duration is below recommended levels. Try to get at least 7 hours of sleep for better health.";
    } else if (avgSleep >= 6 && avgSleep < 7) {
      return "You're getting close to adequate sleep. Aim for 7-9 hours for optimal health benefits.";
    } else if (avgSleep >= 7 && avgSleep <= 9) {
      return "Great job! You're getting the recommended amount of sleep for adults.";
    } else {
      return "You're sleeping more than average. While extra sleep can be beneficial, too much might indicate other issues.";
    }
  };

  // Function to set sleep reminder
  const setSleepReminder = () => {
    // Calculate when to show the reminder
    const [hours, minutes] = bedtimeReminder.split(':').map(Number);
    
    // Create a date object for today at the reminder time
    const now = new Date();
    const reminderTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );
    
    // If the time has already passed today, set it for tomorrow
    if (reminderTime < now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }
    
    // Calculate milliseconds until reminder time
    const timeUntilReminder = reminderTime.getTime() - now.getTime();
    
    // Set the reminder
    setTimeout(() => {
      addNotification(
        "Sleep Reminder", 
        `Time to prepare for bed! A good night's sleep is essential for recovery and health.`, 
        "sleep"
      );
      
      // Schedule the next day's reminder after this one triggers
      setTimeout(setSleepReminder, 1000);
    }, timeUntilReminder);
    
    setReminderSet(true);
    
    // Show confirmation toast and notification
    toast({
      title: "Sleep reminder set",
      description: `You'll be reminded to go to bed at ${bedtimeReminder} every day.`
    });
    
    // Add initial notification to confirm reminder is set
    addNotification(
      "Sleep Reminder Set", 
      `You'll be reminded to go to bed at ${bedtimeReminder} every day.`, 
      "sleep"
    );
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Sleep Coach</h1>
        <p className="text-gray-400">Track your sleep patterns and get personalized insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DashboardCard 
            title="Log Sleep" 
            icon={<Moon className="text-fitviz-purple" />}
            glowEffect="purple"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hoursSlept">Hours of Sleep</Label>
                <div className="flex items-center">
                  <Input
                    id="hoursSlept"
                    name="hoursSlept"
                    type="number"
                    step="0.1"
                    min="0"
                    max="24"
                    value={formData.hoursSlept}
                    onChange={handleChange}
                    className="bg-fitviz-dark-light border-gray-700"
                  />
                  <BedDouble className="ml-2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="restTime">Time to Bed</Label>
                <div className="flex items-center">
                  <Input
                    id="restTime"
                    name="restTime"
                    type="time"
                    value={formData.restTime}
                    onChange={handleChange}
                    className="bg-fitviz-dark-light border-gray-700"
                  />
                  <Clock className="ml-2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="wakeUpTime">Wake Up Time</Label>
                <div className="flex items-center">
                  <Input
                    id="wakeUpTime"
                    name="wakeUpTime"
                    type="time"
                    value={formData.wakeUpTime}
                    onChange={handleChange}
                    className="bg-fitviz-dark-light border-gray-700"
                  />
                  <Sunrise className="ml-2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-fitviz-purple hover:bg-fitviz-purple/80">
                <Plus className="mr-2 h-4 w-4" /> Log Sleep
              </Button>
            </form>
          </DashboardCard>
          
          <DashboardCard 
            title="Sleep Reminder"
            icon={<AlarmClock className="text-fitviz-pink" />}
            glowEffect="pink"
            className="mt-6"
          >
            <div className="space-y-4">
              <p className="text-sm text-gray-300">
                Set a consistent sleep schedule to improve your sleep quality.
                {reminderSet && (
                  <span className="block mt-1 text-fitviz-pink">
                    Bedtime reminder set for: {bedtimeReminder}
                  </span>
                )}
              </p>
              
              <div className="space-y-2">
                <Label htmlFor="bedtimeReminder">Bedtime Reminder</Label>
                <Input
                  id="bedtimeReminder"
                  type="time"
                  value={bedtimeReminder}
                  onChange={(e) => setBedtimeReminder(e.target.value)}
                  className="bg-fitviz-dark-light border-gray-700"
                />
              </div>
              
              <Button 
                className="w-full bg-fitviz-pink hover:bg-fitviz-pink/80"
                onClick={setSleepReminder}
              >
                {reminderSet ? "Update Reminder" : "Set Reminder"}
              </Button>
              
              {reminderSet && (
                <Button 
                  className="w-full bg-fitviz-dark border-gray-700 hover:bg-fitviz-dark/80"
                  onClick={() => {
                    setReminderSet(false);
                    toast({
                      title: "Reminder canceled",
                      description: "Sleep reminder has been canceled."
                    });
                  }}
                >
                  Cancel Reminder
                </Button>
              )}
            </div>
          </DashboardCard>
        </div>
        
        <div className="lg:col-span-2">
          <DashboardCard 
            title="Sleep Patterns" 
            icon={<Moon className="text-fitviz-purple" />}
            glowEffect="purple"
          >
            <div className="mb-6">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-4xl font-bold purple-neon-text">{avgSleep.toFixed(1)}</div>
                  <div className="text-sm text-gray-300">Average hours of sleep</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-300">Optimal Range</div>
                  <div className="text-fitviz-blue">7-9 hours</div>
                </div>
              </div>
            </div>
            
            <LineChart 
              data={chartData} 
              lines={[
                { dataKey: 'hours', stroke: '#A459D1', name: 'Hours Slept' }
              ]}
              xAxisDataKey="date"
              height={250}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <Card className="glassmorphism p-4">
                <h3 className="text-sm font-medium mb-2 text-fitviz-blue">Sleep Quality</h3>
                <p className="text-sm text-gray-300">
                  Your sleep consistency has improved by 15% this week. Consistent bedtimes help regulate your body clock.
                </p>
              </Card>
              <Card className="glassmorphism p-4">
                <h3 className="text-sm font-medium mb-2 text-fitviz-pink">Sleep Insight</h3>
                <p className="text-sm text-gray-300">
                  {getSleepInsight()}
                </p>
              </Card>
            </div>
          </DashboardCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sleep;
