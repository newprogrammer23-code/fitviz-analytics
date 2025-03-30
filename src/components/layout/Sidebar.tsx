
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Activity, 
  User, 
  Moon, 
  Droplet, 
  Nut, 
  Dumbbell,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);
  
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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <Button 
          className="fixed top-4 left-4 z-50 p-1 h-10 w-10 rounded-full bg-fitviz-dark-accent border border-white/10"
          onClick={toggleSidebar}
          variant="ghost"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      )}

      {/* Sidebar */}
      <div 
        className={cn(
          "glassmorphism w-64 h-full fixed left-0 top-0 bottom-0 z-40 transition-transform duration-300",
          isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"
        )}
      >
        <div className="flex items-center justify-center mb-10 mt-6">
          <h1 className="text-2xl font-bold neon-text">FitViz</h1>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => isMobile && setIsOpen(false)}
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

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
