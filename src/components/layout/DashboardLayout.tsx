
import React from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Dumbbell, Droplet, Apple } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-fitviz-dark text-white overflow-hidden">
      {/* Animation background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -right-8 top-1/4 opacity-10 animate-float">
          <Dumbbell size={120} className="text-fitviz-purple" />
        </div>
        <div className="absolute left-1/4 bottom-1/4 opacity-10 animate-float" style={{ animationDelay: '1s' }}>
          <Droplet size={100} className="text-fitviz-blue" />
        </div>
        <div className="absolute right-1/3 top-2/3 opacity-10 animate-float" style={{ animationDelay: '2s' }}>
          <Apple size={80} className="text-fitviz-pink" />
        </div>
      </div>
      
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
