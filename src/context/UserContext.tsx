
import React, { createContext, useState, useContext, useEffect } from "react";

interface UserProfileData {
  name: string;
  gender: string;
  age: string;
  height: string;
  weight: string;
}

interface SleepData {
  date: string;
  hoursSlept: number;
  restTime: string;
  wakeUpTime: string;
}

interface WaterIntakeData {
  date: string;
  amount: number;
}

interface MealData {
  id: string;
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

interface WorkoutData {
  id: string;
  name: string;
  duration: number;
  intensity: 'low' | 'medium' | 'high';
  muscleGroups: string[];
  date: string;
}

interface UserContextType {
  profile: UserProfileData;
  updateProfile: (data: Partial<UserProfileData>) => void;
  sleepData: SleepData[];
  addSleepEntry: (entry: SleepData) => void;
  waterIntake: WaterIntakeData[];
  addWaterIntake: (amount: number) => void;
  meals: MealData[];
  addMeal: (meal: Omit<MealData, 'id' | 'date'>) => void;
  workouts: WorkoutData[];
  addWorkout: (workout: Omit<WorkoutData, 'id' | 'date'>) => void;
}

const defaultProfile: UserProfileData = {
  name: "Alex",
  gender: "male",
  age: "30",
  height: "178",
  weight: "73.2"
};

// Mock data for initial state
const mockSleepData: SleepData[] = [
  { date: '2023-05-01', hoursSlept: 7.5, restTime: '23:00', wakeUpTime: '06:30' },
  { date: '2023-05-02', hoursSlept: 6.8, restTime: '23:30', wakeUpTime: '06:20' },
  { date: '2023-05-03', hoursSlept: 8.2, restTime: '22:45', wakeUpTime: '07:00' },
  { date: '2023-05-04', hoursSlept: 7.0, restTime: '23:15', wakeUpTime: '06:15' },
  { date: '2023-05-05', hoursSlept: 7.8, restTime: '22:30', wakeUpTime: '06:20' },
  { date: '2023-05-06', hoursSlept: 8.5, restTime: '22:00', wakeUpTime: '06:30' },
  { date: '2023-05-07', hoursSlept: 7.2, restTime: '23:45', wakeUpTime: '07:00' },
];

const mockWaterIntake: WaterIntakeData[] = [
  { date: '2023-05-01', amount: 1.8 },
  { date: '2023-05-02', amount: 2.1 },
  { date: '2023-05-03', amount: 1.5 },
  { date: '2023-05-04', amount: 2.3 },
  { date: '2023-05-05', amount: 2.0 },
  { date: '2023-05-06', amount: 1.9 },
  { date: '2023-05-07', amount: 2.2 },
];

const mockMeals: MealData[] = [
  { id: '1', name: 'Oatmeal with Berries', calories: 350, carbs: 45, protein: 12, fat: 8, date: '2023-05-07', mealType: 'breakfast' },
  { id: '2', name: 'Chicken Salad', calories: 420, carbs: 15, protein: 35, fat: 22, date: '2023-05-07', mealType: 'lunch' },
  { id: '3', name: 'Salmon with Vegetables', calories: 480, carbs: 20, protein: 40, fat: 25, date: '2023-05-07', mealType: 'dinner' },
  { id: '4', name: 'Greek Yogurt with Honey', calories: 180, carbs: 20, protein: 15, fat: 5, date: '2023-05-07', mealType: 'snack' },
];

const mockWorkouts: WorkoutData[] = [
  { id: '1', name: 'Push-ups', duration: 15, intensity: 'medium', muscleGroups: ['chest', 'shoulders', 'triceps'], date: '2023-05-07' },
  { id: '2', name: 'Running', duration: 30, intensity: 'high', muscleGroups: ['legs', 'cardiovascular'], date: '2023-05-07' },
  { id: '3', name: 'Squats', duration: 20, intensity: 'medium', muscleGroups: ['legs', 'glutes'], date: '2023-05-06' },
  { id: '4', name: 'Pull-ups', duration: 10, intensity: 'high', muscleGroups: ['back', 'biceps'], date: '2023-05-05' },
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfileData>(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : defaultProfile;
  });
  
  const [sleepData, setSleepData] = useState<SleepData[]>(() => {
    const savedSleepData = localStorage.getItem('sleepData');
    return savedSleepData ? JSON.parse(savedSleepData) : mockSleepData;
  });
  
  const [waterIntake, setWaterIntake] = useState<WaterIntakeData[]>(() => {
    const savedWaterIntake = localStorage.getItem('waterIntake');
    return savedWaterIntake ? JSON.parse(savedWaterIntake) : mockWaterIntake;
  });
  
  const [meals, setMeals] = useState<MealData[]>(() => {
    const savedMeals = localStorage.getItem('meals');
    return savedMeals ? JSON.parse(savedMeals) : mockMeals;
  });
  
  const [workouts, setWorkouts] = useState<WorkoutData[]>(() => {
    const savedWorkouts = localStorage.getItem('workouts');
    return savedWorkouts ? JSON.parse(savedWorkouts) : mockWorkouts;
  });

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('sleepData', JSON.stringify(sleepData));
  }, [sleepData]);

  useEffect(() => {
    localStorage.setItem('waterIntake', JSON.stringify(waterIntake));
  }, [waterIntake]);

  useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);

  const updateProfile = (data: Partial<UserProfileData>) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  const addSleepEntry = (entry: SleepData) => {
    setSleepData(prev => [entry, ...prev.slice(0, 29)]);
  };

  const addWaterIntake = (amount: number) => {
    const today = new Date().toISOString().split('T')[0];
    const todayEntry = waterIntake.find(entry => entry.date === today);
    
    if (todayEntry) {
      setWaterIntake(prev => 
        prev.map(entry => 
          entry.date === today ? { ...entry, amount: entry.amount + amount } : entry
        )
      );
    } else {
      setWaterIntake(prev => [{ date: today, amount }, ...prev]);
    }
  };

  const addMeal = (meal: Omit<MealData, 'id' | 'date'>) => {
    const newMeal: MealData = {
      ...meal,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setMeals(prev => [newMeal, ...prev]);
  };

  const addWorkout = (workout: Omit<WorkoutData, 'id' | 'date'>) => {
    const newWorkout: WorkoutData = {
      ...workout,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setWorkouts(prev => [newWorkout, ...prev]);
  };

  return (
    <UserContext.Provider value={{ 
      profile, 
      updateProfile, 
      sleepData, 
      addSleepEntry,
      waterIntake,
      addWaterIntake,
      meals,
      addMeal,
      workouts,
      addWorkout
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
