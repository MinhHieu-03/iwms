import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Database, Server, Globe, HardDrive, Bot, Shield, Activity, Warehouse, Edit, Save, X, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";

const SystemSettings = () => {
const { t } = useTranslation();  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const [systemStatus] = useState({
    database: "online",
    apiServer: "online",
    robotController: "online",
    storage: "healthy"
  });

  const [warehouseSettings, setWarehouseSettings] = useState({
    shift: "day",
    defaultDock: "Dock-A",
    autoAssign: true,
    showMetrics: true
  });
  
  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Settings Saved",
      description: "System configuration has been updated successfully.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data here if needed
  };

  const handleWarehouseChange = (field: string, value: string | boolean) => {
    setWarehouseSettings({
      ...warehouseSettings,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg p-6 border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <Settings className="h-8 w-8 text-purple-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t('system_settings')}</h1>
              <p className="text-muted-foreground">Configure system infrastructure and warehouse automation settings</p>
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleCancel} variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-purple-500 hover:bg-purple-600">
                  <Save className="h-4 w-4 mr-2" />
                  {t('save_changes')}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-purple-500 hover:bg-purple-600">
                <Edit className="h-4 w-4 mr-2" />
                Edit Settings
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* System Status Overview */}
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

      {/* Navigation and Content */}
      <Tabs defaultValue="warehouse" className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-muted/50">
          <TabsTrigger value="warehouse" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            <Warehouse className="h-4 w-4 mr-2" />
            Warehouse
          </TabsTrigger>
          <TabsTrigger value="database" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            <Database className="h-4 w-4 mr-2" />
            Database
          </TabsTrigger>
          <TabsTrigger value="robots" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            <Bot className="h-4 w-4 mr-2" />
            Robots
          </TabsTrigger>
          <TabsTrigger value="server" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            <Server className="h-4 w-4 mr-2" />
            Server
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            <Activity className="h-4 w-4 mr-2" />
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="warehouse" className="mt-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="defaultShift">Default Shift</Label>
                <Select 
                  value={warehouseSettings.shift} 
                  onValueChange={(value) => handleWarehouseChange("shift", value)}
                  disabled={!isEditing}
                >
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
                <Select 
                  value={warehouseSettings.defaultDock} 
                  onValueChange={(value) => handleWarehouseChange("defaultDock", value)}
                  disabled={!isEditing}
                >
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
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label>Auto-assign to available dock</Label>
                  <div className="text-sm text-muted-foreground">
                    Automatically assign to the next available dock when starting shift
                  </div>
                </div>
                <Switch 
                  checked={warehouseSettings.autoAssign}
                  onCheckedChange={(value) => handleWarehouseChange("autoAssign", value)}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label>Show efficiency metrics</Label>
                  <div className="text-sm text-muted-foreground">
                    Display real-time performance metrics on operator interface
                  </div>
                </div>
                <Switch 
                  checked={warehouseSettings.showMetrics}
                  onCheckedChange={(value) => handleWarehouseChange("showMetrics", value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="database" className="mt-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="database-url">{t('database_url')}</Label>
                <Input 
                  id="database-url" 
                  value="postgres://warehouse:***@db.warehouse.local:5432/iwms" 
                  disabled={!isEditing}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="connection-pool">{t('connection_pool')}</Label>
                  <Input 
                    id="connection-pool" 
                    type="number" 
                    defaultValue="20" 
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeout">{t('query_timeout')}</Label>
                  <Input 
                    id="timeout" 
                    type="number" 
                    defaultValue="30" 
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label>Auto-backup enabled</Label>
                  <div className="text-sm text-muted-foreground">
                    Automatic database backups every 6 hours
                  </div>
                </div>
                <Switch defaultChecked disabled={!isEditing} />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="robots" className="mt-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="robot-controller">Controller Endpoint</Label>
                <Input 
                  id="robot-controller" 
                  value="http://robot-controller.warehouse.local:8080" 
                  disabled={!isEditing}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max-concurrent">Max Concurrent Missions</Label>
                  <Input 
                    id="max-concurrent" 
                    type="number" 
                    defaultValue="50" 
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mission-timeout">Mission Timeout (min)</Label>
                  <Input 
                    id="mission-timeout" 
                    type="number" 
                    defaultValue="30" 
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label>Auto-retry failed missions</Label>
                    <div className="text-sm text-muted-foreground">
                      Automatically retry missions up to 3 times
                    </div>
                  </div>
                  <Switch defaultChecked disabled={!isEditing} />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label>Emergency stop enabled</Label>
                    <div className="text-sm text-muted-foreground">
                      Allow emergency stop of all robot operations
                    </div>
                  </div>
                  <Switch defaultChecked disabled={!isEditing} />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="server" className="mt-6">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="port">{t('server_port')}</Label>
                <Input 
                  id="port" 
                  type="number" 
                  defaultValue="3000" 
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="environment">{t('environment')}</Label>
                <Select defaultValue="production" disabled={!isEditing}>
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
              <Select defaultValue="info" disabled={!isEditing}>
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

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label>Performance monitoring</Label>
                <div className="text-sm text-muted-foreground">
                  Track system performance metrics
                </div>
              </div>
              <Switch defaultChecked disabled={!isEditing} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">{t('api_key')}</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="api-key" 
                    type="password" 
                    value="wms_87x92jd8s7f6g5h4j3k2_prod" 
                    disabled={!isEditing}
                  />
                  <Button variant="outline" size="sm" disabled={!isEditing}>
                    {t('regenerate')}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rate-limit">{t('rate_limit')}</Label>
                  <Input 
                    id="rate-limit" 
                    type="number" 
                    defaultValue="1000" 
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (min)</Label>
                  <Input 
                    id="session-timeout" 
                    type="number" 
                    defaultValue="60" 
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label>Two-factor authentication</Label>
                    <div className="text-sm text-muted-foreground">
                      Require 2FA for admin accounts
                    </div>
                  </div>
                  <Switch disabled={!isEditing} />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label>Audit logging</Label>
                    <div className="text-sm text-muted-foreground">
                      Log all system access and changes
                    </div>
                  </div>
                  <Switch defaultChecked disabled={!isEditing} />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="mt-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="defaultShift">Default Shift</Label>
                <Select 
                  value={warehouseSettings.shift} 
                  onValueChange={(value) => handleWarehouseChange("shift", value)}
                  disabled={!isEditing}
                >
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
                <Select 
                  value={warehouseSettings.defaultDock} 
                  onValueChange={(value) => handleWarehouseChange("defaultDock", value)}
                  disabled={!isEditing}
                >
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
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label>Auto-assign to available dock</Label>
                  <div className="text-sm text-muted-foreground">
                    Automatically assign to the next available dock when starting shift
                  </div>
                </div>
                <Switch 
                  checked={warehouseSettings.autoAssign}
                  onCheckedChange={(value) => handleWarehouseChange("autoAssign", value)}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label>Show efficiency metrics</Label>
                  <div className="text-sm text-muted-foreground">
                    Display real-time performance metrics on operator interface
                  </div>
                </div>
                <Switch 
                  checked={warehouseSettings.showMetrics}
                  onCheckedChange={(value) => handleWarehouseChange("showMetrics", value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
