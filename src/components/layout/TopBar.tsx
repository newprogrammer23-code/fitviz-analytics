
import React, { useState } from "react";
import { Bell, User, Settings, Check, Edit2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { useNotifications } from "@/context/NotificationContext";
import NotificationPanel from "@/components/notifications/NotificationPanel";
import { useIsMobile } from "@/hooks/use-mobile";

const TopBar = () => {
  const { profile, updateProfile } = useUser();
  const { toast } = useToast();
  const { unreadCount, markAllAsRead } = useNotifications();
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);
  const [showNotifications, setShowNotifications] = useState(false);
  const isMobile = useIsMobile();

  const handleSaveName = () => {
    if (nameInput.trim() !== '') {
      updateProfile({ name: nameInput });
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your name has been updated successfully.",
      });
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications && unreadCount > 0) {
      markAllAsRead();
    }
  };

  return (
    <header className="glassmorphism h-16 sticky top-0 z-30 flex items-center justify-between px-3 md:px-6 py-3">
      <div className={isMobile ? "ml-12" : ""}>
        {isEditing ? (
          <div className="flex items-center">
            <Input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="bg-fitviz-dark-light border-gray-700 mr-2 w-28 md:w-40"
              placeholder="Enter name"
              autoFocus
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full text-green-400 hover:bg-white/10"
              onClick={handleSaveName}
            >
              <Check size={18} />
            </Button>
          </div>
        ) : (
          <div className="flex items-center">
            <h2 className={`text-sm md:text-lg font-medium truncate max-w-[150px] md:max-w-none`}>
              {!isMobile ? "Welcome back, " : ""}
              <span className="purple-neon-text font-semibold">{profile.name}</span>
            </h2>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-white/10 ml-1"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 size={14} />
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-white/10 h-8 w-8 md:h-10 md:w-10"
            onClick={toggleNotifications}
          >
            <Bell size={isMobile ? 18 : 20} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-fitviz-pink text-[10px] flex items-center justify-center text-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Button>
          {showNotifications && (
            <NotificationPanel onClose={() => setShowNotifications(false)} />
          )}
        </div>
        {!isMobile && (
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
            <Settings size={20} />
          </Button>
        )}
        <Avatar className="border-2 border-fitviz-blue cursor-pointer h-8 w-8 md:h-10 md:w-10">
          <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
          <AvatarFallback>{profile.name[0]}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default TopBar;
