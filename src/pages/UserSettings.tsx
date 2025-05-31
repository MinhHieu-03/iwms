
import React from "react";
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
  const { t, language, setLanguage, themeSettings, updateThemeSetting } = useLanguage();
  
  const handleSaveChanges = () => {
    toast({
      title: t('settings_saved'),
      description: t('settings_saved'),
    });
  };

  return (
    <div className="space-y-6">
      {/* <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('user_settings')}</h2>
        <Button onClick={handleSaveChanges}>{t('save_changes')}</Button>
      </div> */}

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
              defaultChecked={localStorage.getItem("emailNotifications") === "true" || true}
              onCheckedChange={(value) => localStorage.setItem("emailNotifications", value.toString())}
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
              defaultChecked={localStorage.getItem("pushNotifications") === "true" || false}
              onCheckedChange={(value) => localStorage.setItem("pushNotifications", value.toString())}
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
