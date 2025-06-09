import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Lock, User, Monitor, Edit, Save, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useI18n } from "@/contexts/useI18n";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TranslationExample from "@/components/TranslationExample";

const UserSettings = () => {
  const { toast } = useToast();
  const { t, language, changeLanguage, themeSettings, updateThemeSetting } = useI18n();
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@warehouse.com",
    jobTitle: "Warehouse Manager",
    department: "Operations"
  });
  
  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: t('settings_saved'),
      description: "Your profile has been updated successfully.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data here if needed
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
            <div className="bg-teal-500/20 p-3 rounded-lg">
              <User className="h-8 w-8 text-teal-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t('user_settings')}</h1>
              <p className="text-muted-foreground">Manage your personal account settings and preferences</p>
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleCancel} variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-teal-500 hover:bg-teal-600">
                  <Save className="h-4 w-4 mr-2" />
                  {t('save_changes')}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-teal-500 hover:bg-teal-600">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation and Content */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          <TabsTrigger value="profile" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            <Monitor className="h-4 w-4 mr-2" />
            {t('appearance')}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            <Lock className="h-4 w-4 mr-2" />
            {t('security')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-6 bg-muted/20 rounded-lg border">
              <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                <AvatarImage src="" alt={userProfile.name} />
                <AvatarFallback className="bg-teal-500 text-white text-lg">
                  {userProfile.name.split(' ').map(name => name[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{userProfile.name}</h3>
                <p className="text-muted-foreground">{userProfile.jobTitle} • {userProfile.department}</p>
                <p className="text-sm text-muted-foreground">{userProfile.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  value={userProfile.name} 
                  onChange={(e) => handleProfileChange("name", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={userProfile.email} 
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input 
                  id="jobTitle" 
                  value={userProfile.jobTitle} 
                  onChange={(e) => handleProfileChange("jobTitle", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select 
                  value={userProfile.department} 
                  onValueChange={(value) => handleProfileChange("department", value)}
                  disabled={!isEditing}
                >
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
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label>{t('dark_mode')}</Label>
                <div className="text-sm text-muted-foreground">
                  {t('dark_mode_description')}
                </div>
              </div>
              <Switch 
                checked={themeSettings.darkMode}
                onCheckedChange={(value) => updateThemeSetting('darkMode', value)}
              />
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label>{t('language')}</Label>
                <div className="text-sm text-muted-foreground">
                  {t('language_description')}
                </div>
              </div>
              <Select value={language} onValueChange={(value: 'en' | 'vi') => changeLanguage(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="vi">Tiếng Việt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Translation Example Component */}
            <TranslationExample />
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label>Inventory alerts</Label>
                <div className="text-sm text-muted-foreground">
                  Low stock and out-of-stock notifications
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label>Mission updates</Label>
                <div className="text-sm text-muted-foreground">
                  Robot mission completion and failure alerts
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label>Shift reminders</Label>
                <div className="text-sm text-muted-foreground">
                  Start and end of shift notifications
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label>System maintenance</Label>
                <div className="text-sm text-muted-foreground">
                  Scheduled maintenance and system updates
                </div>
              </div>
              <Switch />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <div className="space-y-6">
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

            <div className="flex justify-end">
              <Button variant="outline">
                {t('update_password')}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserSettings;
