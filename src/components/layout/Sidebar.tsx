
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Activity, 
  User, 
  Moon, 
  Droplet, 
  Nut, 
  Dumbbell 
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { icon: Activity, label: "Dashboard", path: "/" },
    { icon: User, label: "Profile & BMI", path: "/profile" },
    { icon: Moon, label: "Sleep Coach", path: "/sleep" },
    { icon: Droplet, label: "Water Intake", path: "/water" },
    { icon: Nut, label: "Nutrition", path: "/nutrition" },
    { icon: Dumbbell, label: "Workouts", path: "/workouts" },
  ];

  return (
    <div className="glassmorphism w-64 h-full p-4 fixed left-0 top-0 bottom-0 z-40">
      <div className="flex items-center justify-center mb-10 mt-6">
        <h1 className="text-2xl font-bold neon-text">FitViz</h1>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
              isActive(item.path)
                ? "bg-fitviz-blue/20 text-white neon-text"
                : "text-gray-300 hover:bg-white/10"
            )}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="absolute bottom-8 left-0 right-0 px-4">
        <div className="glassmorphism p-4 rounded-lg">
          <h3 className="text-sm font-medium text-white mb-2">Quick Tip</h3>
          <p className="text-xs text-gray-300">
            Remember to update your weight daily for accurate BMI tracking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
