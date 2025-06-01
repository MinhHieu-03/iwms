
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, CheckCircle, Info, Clock, Trash2, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Notifications = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");

  const notifications = [
    {
      id: 1,
      type: "warning",
      title: "Low Stock Alert",
      message: "SKU-12345 inventory below threshold",
      time: "2 minutes ago",
      read: false,
      category: "inventory"
    },
    {
      id: 2,
      type: "success",
      title: "Mission Completed",
      message: "Robot R-07 completed pick & place mission",
      time: "5 minutes ago",
      read: false,
      category: "missions"
    },
    {
      id: 3,
      type: "error",
      title: "Robot Offline",
      message: "Robot R-03 connection lost",
      time: "12 minutes ago",
      read: true,
      category: "system"
    },
    {
      id: 4,
      type: "info",
      title: "Shift Change",
      message: "Evening shift starts in 30 minutes",
      time: "1 hour ago",
      read: true,
      category: "general"
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const filteredNotifications = activeTab === "unread" 
    ? notifications.filter(n => !n.read)
    : activeTab === "all" 
    ? notifications 
    : notifications.filter(n => n.category === activeTab);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-warehouse-primary/10 to-warehouse-secondary/10 rounded-lg p-6 border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-warehouse-primary/20 p-3 rounded-lg">
              <Bell className="h-8 w-8 text-warehouse-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t('notifications')}</h1>
              <p className="text-muted-foreground">Stay updated with system alerts and important warehouse events</p>
            </div>
          </div>
          <Button className="bg-warehouse-primary hover:bg-warehouse-primary/90">
            <Mail className="h-4 w-4 mr-2" />
            Mark All as Read
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-muted/50">
          <TabsTrigger value="all" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Bell className="h-4 w-4 mr-2" />
            All
          </TabsTrigger>
          <TabsTrigger value="unread" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Clock className="h-4 w-4 mr-2" />
            Unread
          </TabsTrigger>
          <TabsTrigger value="inventory" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="missions" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <CheckCircle className="h-4 w-4 mr-2" />
            Missions
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Info className="h-4 w-4 mr-2" />
            System
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card key={notification.id} className={`${!notification.read ? 'border-l-4 border-l-warehouse-primary' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{notification.title}</h3>
                          {!notification.read && (
                            <Badge variant="secondary" className="text-xs">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <MarkAsUnread className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredNotifications.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No notifications</h3>
                  <p className="text-muted-foreground">You're all caught up! No new notifications to display.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;
