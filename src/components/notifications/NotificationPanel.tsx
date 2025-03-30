
import React from "react";
import { Check, Trash2, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNotifications, Notification as NotificationType } from "@/context/NotificationContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NotificationItemProps {
  notification: NotificationType;
  onMarkAsRead: (id: string) => void;
  onClear: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onMarkAsRead, 
  onClear 
}) => {
  const { id, title, message, timestamp, type, read } = notification;
  
  return (
    <div className={`p-3 border-b border-gray-700 ${read ? 'bg-transparent' : 'bg-fitviz-dark-light'}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`${read ? 'text-gray-300' : 'text-white'} font-medium`}>
              {title}
            </span>
            {!read && (
              <span className="flex h-2 w-2 rounded-full bg-fitviz-blue"></span>
            )}
          </div>
          <p className="text-sm text-gray-400 mt-1">{message}</p>
          <div className="text-xs text-gray-500 mt-1">
            {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {!read && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 rounded-full hover:bg-white/10" 
              onClick={() => onMarkAsRead(id)}
              title="Mark as read"
            >
              <Check size={14} />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 rounded-full hover:bg-white/10" 
            onClick={() => onClear(id)}
            title="Delete notification"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

interface NotificationPanelProps {
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    clearNotification, 
    clearAllNotifications 
  } = useNotifications();

  return (
    <div className="glassmorphism absolute right-0 top-16 w-80 md:w-96 rounded-lg shadow-lg z-50 border border-gray-700">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h3 className="font-semibold">Notifications</h3>
        <div className="flex items-center space-x-2">
          {notifications.some(n => !n.read) && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-8" 
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full hover:bg-white/10" 
            onClick={onClose}
          >
            <X size={16} />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="max-h-96">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            No notifications
          </div>
        ) : (
          <>
            {notifications.map(notification => (
              <NotificationItem 
                key={notification.id} 
                notification={notification} 
                onMarkAsRead={markAsRead} 
                onClear={clearNotification} 
              />
            ))}
          </>
        )}
      </ScrollArea>
      
      {notifications.length > 0 && (
        <div className="p-3 border-t border-gray-700 flex justify-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs" 
            onClick={clearAllNotifications}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
