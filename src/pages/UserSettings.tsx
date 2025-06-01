
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Bell, Moon, SunMedium, User, Lock, Languages, Warehouse, Monitor } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserSettings = () => {
  const { toast } = useToast();
  const { t, language, setLanguage, themeSettings, updateThemeSetting } = useLanguage();
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@warehouse.com",
    jobTitle: "Warehouse Manager",
    department: "Operations",
    shift: "day",
    defaultDock: "Dock-A"
  });
  
  const handleSaveChanges = () => {
    toast({
      title: t('settings_saved'),
      description: t('settings_saved'),
    });
  };

  const handleProfileChange = (field: string, value: string) => {
    setUserProfile({
      ...userProfile,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-lg p-6 border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
              <AvatarImage src="" alt={userProfile.name} />
              <AvatarFallback className="bg-teal-500 text-white text-lg">
                {userProfile.name.split(' ').map(name => name[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{userProfile.name}</h1>
              <p className="text-muted-foreground">{userProfile.jobTitle} • {userProfile.department}</p>
              <p className="text-sm text-muted-foreground">{userProfile.email}</p>
            </div>
          </div>
          <Button onClick={handleSaveChanges} className="bg-teal-500 hover:bg-teal-600">
            {t('save_changes')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                value={userProfile.name} 
                onChange={(e) => handleProfileChange("name", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={userProfile.email} 
                onChange={(e) => handleProfileChange("email", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input 
                id="jobTitle" 
                value={userProfile.jobTitle} 
                onChange={(e) => handleProfileChange("jobTitle", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select value={userProfile.department} onValueChange={(value) => handleProfileChange("department", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Logistics">Logistics</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="IT Support">IT Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Warehouse Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Warehouse className="mr-2 h-5 w-5" />
              Warehouse Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="defaultShift">Default Shift</Label>
              <Select value={userProfile.shift} onValueChange={(value) => handleProfileChange("shift", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day Shift (06:00 - 14:00)</SelectItem>
                  <SelectItem value="evening">Evening Shift (14:00 - 22:00)</SelectItem>
                  <SelectItem value="night">Night Shift (22:00 - 06:00)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="defaultDock">Default Dock Assignment</Label>
              <Select value={userProfile.defaultDock} onValueChange={(value) => handleProfileChange("defaultDock", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dock-A">Dock A - Inbound</SelectItem>
                  <SelectItem value="Dock-B">Dock B - Outbound</SelectItem>
                  <SelectItem value="Dock-C">Dock C - Mixed</SelectItem>
                  <SelectItem value="Dock-D">Dock D - Express</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-assign to available dock</Label>
                <div className="text-sm text-muted-foreground">
                  Automatically assign to the next available dock when starting shift
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show efficiency metrics</Label>
                <div className="text-sm text-muted-foreground">
                  Display real-time performance metrics on operator interface
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Appearance & Display */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Monitor className="mr-2 h-5 w-5" />
              {t('appearance')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t('dark_mode')}</Label>
                <div className="text-sm text-muted-foreground">
                  {t('dark_mode_description')}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <SunMedium className="h-4 w-4" />
                <Switch 
                  checked={themeSettings.darkMode}
                  onCheckedChange={(value) => updateThemeSetting('darkMode', value)}
                />
                <Moon className="h-4 w-4" />
              </div>
            </div>

            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t('language')}</Label>
                <div className="text-sm text-muted-foreground">
                  {t('language_description')}
                </div>
              </div>
              <Select value={language} onValueChange={(value: 'en' | 'vi') => setLanguage(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="vi">Tiếng Việt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              {t('notification_preferences')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Inventory alerts</Label>
                <div className="text-sm text-muted-foreground">
                  Low stock and out-of-stock notifications
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Mission updates</Label>
                <div className="text-sm text-muted-foreground">
                  Robot mission completion and failure alerts
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Shift reminders</Label>
                <div className="text-sm text-muted-foreground">
                  Start and end of shift notifications
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>System maintenance</Label>
                <div className="text-sm text-muted-foreground">
                  Scheduled maintenance and system updates
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="mr-2 h-5 w-5" />
              {t('security')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">{t('current_password')}</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">{t('new_password')}</Label>
                <Input id="new-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">{t('confirm_password')}</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button variant="outline">
                {t('update_password')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserSettings;
