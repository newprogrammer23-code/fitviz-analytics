
import React from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Dumbbell, Droplet, Apple } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex h-screen bg-fitviz-dark text-white overflow-hidden">
      {/* Animation background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -right-8 top-1/4 opacity-10 animate-float">
          <Dumbbell size={isMobile ? 80 : 120} className="text-fitviz-purple" />
        </div>
        <div className="absolute left-1/4 bottom-1/4 opacity-10 animate-float" style={{ animationDelay: '1s' }}>
          <Droplet size={isMobile ? 60 : 100} className="text-fitviz-blue" />
        </div>
        <div className="absolute right-1/3 top-2/3 opacity-10 animate-float" style={{ animationDelay: '2s' }}>
          <Apple size={isMobile ? 50 : 80} className="text-fitviz-pink" />
        </div>
      </div>
      
      <Sidebar />
      <div className={`flex-1 flex flex-col ${isMobile ? 'ml-0' : 'ml-64'}`}>
        <TopBar />
        <main className="flex-1 overflow-y-auto p-3 md:p-6 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
