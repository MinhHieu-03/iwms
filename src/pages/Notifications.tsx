
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Clock, 
  CheckCheck 
} from "lucide-react";

type NotificationType = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "info" | "warning" | "error" | "success";
  read: boolean;
};

const Notifications = () => {
  const notifications: NotificationType[] = [
    {
      id: "n1",
      title: "Low Battery Warning",
      message: "Robot-03 battery level is below 15%. Please dock for charging.",
      time: "10 minutes ago",
      type: "warning",
      read: false,
    },
    {
      id: "n2",
      title: "Mission Completed",
      message: "Pickup and Delivery mission #M-7842 has been completed successfully.",
      time: "30 minutes ago",
      type: "success",
      read: false,
    },
    {
      id: "n3",
      title: "System Update Available",
      message: "A new system update (v2.3.4) is available. Please schedule installation.",
      time: "2 hours ago",
      type: "info",
      read: true,
    },
    {
      id: "n4",
      title: "Zone Access Error",
      message: "Robot-01 unable to access Zone B due to obstruction. Manual intervention required.",
      time: "3 hours ago",
      type: "error",
      read: true,
    },
    {
      id: "n5",
      title: "Inventory Alert",
      message: "Low stock detected for SKU-45678 in Zone C. Current quantity: 5 units.",
      time: "5 hours ago",
      type: "warning",
      read: true,
    },
    {
      id: "n6",
      title: "New Team Member",
      message: "Sarah Johnson has joined the team as an Operator. Welcome!",
      time: "Yesterday",
      type: "info",
      read: true,
    },
    {
      id: "n7",
      title: "Maintenance Scheduled",
      message: "Routine maintenance scheduled for Robot-02 on Friday at 10:00 AM.",
      time: "Yesterday",
      type: "info",
      read: true,
    },
    {
      id: "n8",
      title: "High Traffic Alert",
      message: "Unusual traffic detected in Zone D. Consider rerouting missions.",
      time: "2 days ago",
      type: "warning",
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">Notifications</h2>
          <Badge className="ml-2 bg-warehouse-primary">{notifications.filter(n => !n.read).length}</Badge>
        </div>
        <div className="space-x-2">
          <Button variant="outline" className="flex items-center">
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
          <Button variant="outline" className="flex items-center text-muted-foreground">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg mb-2 ${
                  notification.read ? "" : "bg-muted/30 border-warehouse-primary/30"
                }`}
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      {!notification.read && (
                        <Badge variant="outline" className="text-xs bg-warehouse-primary text-white">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {notification.time}
                      </div>
                      <div className="flex space-x-2">
                        {!notification.read && (
                          <Button size="sm" variant="ghost" className="h-8 px-2 text-xs">
                            Mark as read
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" className="h-8 px-2 text-xs text-muted-foreground">
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <Button variant="link" className="text-muted-foreground">
              View All Notifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
