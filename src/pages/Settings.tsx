
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon, User, System, Users, Edit, Save, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const Settings = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Settings Saved",
      description: "Configuration has been updated successfully.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const settingsCategories = [
    {
      title: "User Settings",
      description: "Personal preferences and account configuration",
      icon: User,
      link: "/user-settings",
      color: "teal"
    },
    {
      title: "System Settings",
      description: "System infrastructure and automation settings",
      icon: System,
      link: "/system-settings",
      color: "purple"
    },
    {
      title: "Team Management",
      description: "User management, roles, and permissions",
      icon: Users,
      link: "/team-settings",
      color: "warehouse-primary"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-warehouse-primary/10 to-warehouse-secondary/10 rounded-lg p-6 border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-warehouse-primary/20 p-3 rounded-lg">
              <SettingsIcon className="h-8 w-8 text-warehouse-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t('settings')}</h1>
              <p className="text-muted-foreground">Configure system settings, user preferences, and team management</p>
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleCancel} variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-warehouse-primary hover:bg-warehouse-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  {t('save_changes')}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-warehouse-primary hover:bg-warehouse-primary/90">
                <Edit className="h-4 w-4 mr-2" />
                Edit Settings
              </Button>
            )}
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <SettingsIcon className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="quick-access" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <System className="h-4 w-4 mr-2" />
            Quick Access
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {settingsCategories.map((category, index) => (
              <Link key={index} to={category.link}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg bg-${category.color === 'warehouse-primary' ? 'warehouse-primary' : category.color}-500/20`}>
                        <category.icon className={`h-8 w-8 text-${category.color === 'warehouse-primary' ? 'warehouse-primary' : category.color}-500`} />
                      </div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quick-access" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Changes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Language updated to English</span>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Dark mode enabled</span>
                    <span className="text-xs text-muted-foreground">1 day ago</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Notification preferences updated</span>
                    <span className="text-xs text-muted-foreground">3 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Database</span>
                    <span className="text-xs text-green-600">Online</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">API Server</span>
                    <span className="text-xs text-green-600">Online</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Robot Controller</span>
                    <span className="text-xs text-green-600">Online</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
