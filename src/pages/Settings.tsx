
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Lock, Bell, Database, Robot } from "lucide-react";

const Settings = () => {
  const [warehouseSettings, setWarehouseSettings] = useState({
    name: "Main Warehouse",
    rows: 10,
    columns: 15,
    shelfHeight: 3,
    temperatureControl: true,
    automationLevel: "high",
  });

  // User profile state
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "",
    jobTitle: "Warehouse Manager",
    phone: "+1 (555) 123-4567",
  });

  const handleSettingChange = (setting: string, value: string | number | boolean) => {
    setWarehouseSettings({
      ...warehouseSettings,
      [setting]: value,
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
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="flex space-x-1">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="warehouse" className="flex items-center">
            <Database className="w-4 h-4 mr-2" />
            Warehouse
          </TabsTrigger>
          <TabsTrigger value="robots" className="flex items-center">
            <Robot className="w-4 h-4 mr-2" />
            Robots
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Lock className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>
        
        {/* User Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">User Profile</h3>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                  <AvatarFallback className="text-3xl bg-warehouse-primary/10 text-warehouse-primary">
                    {userProfile.name.split(' ').map(name => name[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
              </div>
              
              <div className="w-full md:w-2/3 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="userName">Full Name</Label>
                    <Input 
                      id="userName" 
                      value={userProfile.name} 
                      onChange={(e) => handleProfileChange("name", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="userEmail">Email</Label>
                    <Input 
                      id="userEmail" 
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
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      value={userProfile.phone} 
                      onChange={(e) => handleProfileChange("phone", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button>Save Profile</Button>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              
              <div className="pt-2 flex justify-end">
                <Button>Update Password</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        {/* Warehouse Configuration Tab */}
        <TabsContent value="warehouse" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Warehouse Structure</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="warehouseName">Warehouse Name</Label>
                  <Input 
                    id="warehouseName" 
                    value={warehouseSettings.name} 
                    onChange={(e) => handleSettingChange("name", e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="rows">Number of Rows</Label>
                  <Input 
                    id="rows" 
                    type="number" 
                    value={warehouseSettings.rows} 
                    onChange={(e) => handleSettingChange("rows", parseInt(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="columns">Number of Columns</Label>
                  <Input 
                    id="columns" 
                    type="number" 
                    value={warehouseSettings.columns} 
                    onChange={(e) => handleSettingChange("columns", parseInt(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="shelfHeight">Shelf Height (levels)</Label>
                  <Input 
                    id="shelfHeight" 
                    type="number" 
                    value={warehouseSettings.shelfHeight} 
                    onChange={(e) => handleSettingChange("shelfHeight", parseInt(e.target.value))}
                  />
                </div>
                
                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox 
                    id="temperatureControl" 
                    checked={warehouseSettings.temperatureControl} 
                    onCheckedChange={(checked) => handleSettingChange("temperatureControl", !!checked)}
                  />
                  <Label htmlFor="temperatureControl">Temperature Controlled Environment</Label>
                </div>
                
                <div>
                  <Label htmlFor="automationLevel">Automation Level</Label>
                  <select 
                    id="automationLevel" 
                    value={warehouseSettings.automationLevel}
                    onChange={(e) => handleSettingChange("automationLevel", e.target.value)}
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="low">Low - Manual with minimal automation</option>
                    <option value="medium">Medium - Partially automated processes</option>
                    <option value="high">High - Fully automated operations</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button>Save Configuration</Button>
            </div>
          </Card>
        </TabsContent>
        
        {/* Robot Settings Tab */}
        <TabsContent value="robots" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Robot Configuration</h3>
            <p className="text-gray-500 mb-4">Configure settings for warehouse robots.</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="maxSpeed">Maximum Robot Speed (m/s)</Label>
                <Input id="maxSpeed" type="number" defaultValue="1.2" />
              </div>
              
              <div>
                <Label htmlFor="batteryThreshold">Low Battery Alert Threshold (%)</Label>
                <Input id="batteryThreshold" type="number" defaultValue="20" />
              </div>
              
              <div>
                <Label htmlFor="pathPlanning">Path Planning Algorithm</Label>
                <select 
                  id="pathPlanning" 
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  defaultValue="aStar"
                >
                  <option value="aStar">A* Algorithm</option>
                  <option value="dijkstra">Dijkstra's Algorithm</option>
                  <option value="rrt">RRT (Rapidly-exploring Random Tree)</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button>Save Robot Settings</Button>
            </div>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Security Settings</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="twoFactorAuth" />
                  <Label htmlFor="twoFactorAuth">Enable two-factor authentication</Label>
                </div>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security to your account by requiring a verification code in addition to your password.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input id="sessionTimeout" type="number" defaultValue="30" />
                <p className="text-sm text-gray-500">
                  Automatically log out after this period of inactivity.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Login History</Label>
                <div className="border rounded-md p-4 bg-gray-50">
                  <p className="text-sm">Last login: Today at 9:30 AM from 192.168.1.1</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button>Save Security Settings</Button>
            </div>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Email Notifications</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="emailInventory" defaultChecked />
                    <Label htmlFor="emailInventory">Inventory alerts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="emailShipment" defaultChecked />
                    <Label htmlFor="emailShipment">Shipment updates</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="emailSystem" />
                    <Label htmlFor="emailSystem">System notifications</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>In-App Notifications</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="inAppInventory" defaultChecked />
                    <Label htmlFor="inAppInventory">Inventory alerts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="inAppShipment" defaultChecked />
                    <Label htmlFor="inAppShipment">Shipment updates</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="inAppSystem" defaultChecked />
                    <Label htmlFor="inAppSystem">System notifications</Label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button>Save Notification Settings</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
