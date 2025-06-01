
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Database, Server, Globe, HardDrive, Bot, Shield, Activity, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";

const SystemSettings = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [systemStatus, setSystemStatus] = useState({
    database: "online",
    apiServer: "online",
    robotController: "online",
    storage: "healthy"
  });
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "System configuration has been updated successfully.",
    });
  };

  const handleTestConnection = () => {
    toast({
      title: "Connection Test",
      description: "Database connection test completed successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg p-6 border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <Server className="h-8 w-8 text-purple-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t('system_settings')}</h1>
              <p className="text-muted-foreground">Configure system infrastructure and warehouse automation settings</p>
            </div>
          </div>
          <Button onClick={handleSaveSettings} className="bg-purple-500 hover:bg-purple-600">
            {t('save_changes')}
          </Button>
        </div>
      </div>

      {/* System Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div>
                <p className="text-sm font-medium">Database</p>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                  {systemStatus.database}
                </Badge>
              </div>
              <Database className="h-8 w-8 text-green-600" />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div>
                <p className="text-sm font-medium">API Server</p>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                  {systemStatus.apiServer}
                </Badge>
              </div>
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <div>
                <p className="text-sm font-medium">Robot Controller</p>
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100">
                  {systemStatus.robotController}
                </Badge>
              </div>
              <Bot className="h-8 w-8 text-amber-600" />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div>
                <p className="text-sm font-medium">Storage</p>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100">
                  {systemStatus.storage}
                </Badge>
              </div>
              <HardDrive className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Database Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" />
              {t('database_configuration')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="database-url">{t('database_url')}</Label>
              <Input id="database-url" value="postgres://warehouse:***@db.warehouse.local:5432/iwms" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="connection-pool">{t('connection_pool')}</Label>
                <Input id="connection-pool" type="number" defaultValue="20" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeout">{t('query_timeout')}</Label>
                <Input id="timeout" type="number" defaultValue="30" />
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-backup enabled</Label>
                <div className="text-sm text-muted-foreground">
                  Automatic database backups every 6 hours
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={handleTestConnection}>
                Test Connection
              </Button>
              <Button variant="outline" size="sm">
                Backup Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Robot System Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="mr-2 h-5 w-5" />
              Robot System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="robot-controller">Controller Endpoint</Label>
              <Input id="robot-controller" value="http://robot-controller.warehouse.local:8080" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="max-concurrent">Max Concurrent Missions</Label>
                <Input id="max-concurrent" type="number" defaultValue="50" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mission-timeout">Mission Timeout (min)</Label>
                <Input id="mission-timeout" type="number" defaultValue="30" />
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-retry failed missions</Label>
                <div className="text-sm text-muted-foreground">
                  Automatically retry missions up to 3 times
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Emergency stop enabled</Label>
                <div className="text-sm text-muted-foreground">
                  Allow emergency stop of all robot operations
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Server & Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="mr-2 h-5 w-5" />
              {t('server_settings')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="port">{t('server_port')}</Label>
                <Input id="port" type="number" defaultValue="3000" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="environment">{t('environment')}</Label>
                <Select defaultValue="production">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">{t('development')}</SelectItem>
                    <SelectItem value="staging">{t('staging')}</SelectItem>
                    <SelectItem value="production">{t('production')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="log-level">{t('log_level')}</Label>
              <Select defaultValue="info">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="debug">{t('debug')}</SelectItem>
                  <SelectItem value="info">{t('info')}</SelectItem>
                  <SelectItem value="warn">{t('warning')}</SelectItem>
                  <SelectItem value="error">{t('error')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Performance monitoring</Label>
                <div className="text-sm text-muted-foreground">
                  Track system performance metrics
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security & Access */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Security & Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">{t('api_key')}</Label>
              <div className="flex space-x-2">
                <Input id="api-key" type="password" value="wms_87x92jd8s7f6g5h4j3k2_prod" />
                <Button variant="outline" size="sm">{t('regenerate')}</Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rate-limit">{t('rate_limit')}</Label>
                <Input id="rate-limit" type="number" defaultValue="1000" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (min)</Label>
                <Input id="session-timeout" type="number" defaultValue="60" />
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-factor authentication</Label>
                <div className="text-sm text-muted-foreground">
                  Require 2FA for admin accounts
                </div>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Audit logging</Label>
                <div className="text-sm text-muted-foreground">
                  Log all system access and changes
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Storage & Backup */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <HardDrive className="mr-2 h-5 w-5" />
              {t('storage_configuration')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="storage-path">{t('storage_path')}</Label>
                <Input id="storage-path" defaultValue="/opt/iwms/data" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backup-location">Backup Location</Label>
                <Input id="backup-location" defaultValue="/opt/iwms/backups" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backup-frequency">{t('backup_frequency')}</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">{t('hourly')}</SelectItem>
                    <SelectItem value="daily">{t('daily')}</SelectItem>
                    <SelectItem value="weekly">{t('weekly')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">85%</p>
                <p className="text-sm text-muted-foreground">Storage Used</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-600">2.3TB</p>
                <p className="text-sm text-muted-foreground">Total Data</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-2xl font-bold text-purple-600">7</p>
                <p className="text-sm text-muted-foreground">Backup Copies</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-2xl font-bold text-amber-600">12h</p>
                <p className="text-sm text-muted-foreground">Last Backup</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemSettings;
