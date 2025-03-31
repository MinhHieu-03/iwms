
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Bell, Moon, SunMedium, Eye, Lock, Languages } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserSettings = () => {
  const { toast } = useToast();
  const { t, language, setLanguage } = useLanguage();
  
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  // Apply dark mode
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Save preference to localStorage
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Apply high contrast
  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
    
    // Save preference to localStorage
    localStorage.setItem("highContrast", highContrast.toString());
  }, [highContrast]);

  // Load saved preferences on initial load
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    const savedHighContrast = localStorage.getItem("highContrast") === "true";
    const savedEmailNotif = localStorage.getItem("emailNotifications") === "true";
    const savedPushNotif = localStorage.getItem("pushNotifications") === "true";
    
    setDarkMode(savedDarkMode);
    setHighContrast(savedHighContrast);
    setEmailNotifications(savedEmailNotif !== null ? savedEmailNotif : true);
    setPushNotifications(savedPushNotif !== null ? savedPushNotif : false);
  }, []);

  // Save notification preferences
  useEffect(() => {
    localStorage.setItem("emailNotifications", emailNotifications.toString());
    localStorage.setItem("pushNotifications", pushNotifications.toString());
  }, [emailNotifications, pushNotifications]);

  const handleSaveChanges = () => {
    toast({
      title: t('settings_saved'),
      description: t('settings_saved'),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('user_settings')}</h2>
        <Button onClick={handleSaveChanges}>{t('save_changes')}</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="mr-2 h-5 w-5" />
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
                id="dark-mode" 
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
              <Moon className="h-4 w-4" />
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t('high_contrast')}</Label>
              <div className="text-sm text-muted-foreground">
                {t('high_contrast_description')}
              </div>
            </div>
            <Switch 
              id="high-contrast" 
              checked={highContrast}
              onCheckedChange={setHighContrast}
            />
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
              <Label>{t('email_notifications')}</Label>
              <div className="text-sm text-muted-foreground">
                {t('email_notifications_description')}
              </div>
            </div>
            <Switch 
              id="email-notifications" 
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t('push_notifications')}</Label>
              <div className="text-sm text-muted-foreground">
                {t('push_notifications_description')}
              </div>
            </div>
            <Switch 
              id="push-notifications" 
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="mr-2 h-5 w-5" />
            {t('security')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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

          <Button variant="outline" className="mt-2">
            {t('update_password')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSettings;
