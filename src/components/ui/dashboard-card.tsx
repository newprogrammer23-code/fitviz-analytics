
import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "./card";

interface DashboardCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  glowEffect?: "blue" | "purple" | "pink" | "none";
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  icon,
  children,
  className,
  glowEffect = "none",
}) => {
  const glowClasses = {
    blue: "border-fitviz-blue/50 shadow-[0_0_15px_rgba(0,229,255,0.15)]",
    purple: "border-fitviz-purple/50 shadow-[0_0_15px_rgba(164,89,209,0.15)]",
    pink: "border-fitviz-pink/50 shadow-[0_0_15px_rgba(246,55,236,0.15)]",
    none: ""
  };

  return (
    <Card 
      className={cn(
        "glassmorphism p-5 transition-all duration-300 hover:shadow-lg card-hover", 
        glowEffect !== "none" && glowClasses[glowEffect],
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <div>{children}</div>
    </Card>
  );
};

export default DashboardCard;
