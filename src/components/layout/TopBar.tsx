
import React from "react";
import { Bell, User, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const TopBar = () => {
  return (
    <header className="glassmorphism h-16 sticky top-0 z-30 flex items-center justify-between px-6 py-3">
      <div>
        <h2 className="text-lg font-medium">Welcome back, <span className="purple-neon-text font-semibold">Alex</span></h2>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
          <Bell size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
          <Settings size={20} />
        </Button>
        <Avatar className="border-2 border-fitviz-blue cursor-pointer">
          <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default TopBar;
