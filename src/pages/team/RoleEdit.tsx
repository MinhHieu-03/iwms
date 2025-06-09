
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const RoleEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const { t } = useTranslation();  const { toast } = useToast();
  const isNew = id === "new";

  // Mock role data
  const roleData = !isNew ? {
    id: parseInt(id || "0"),
    name: id === "1" ? "Administrator" : id === "2" ? "Manager" : "Operator",
    description: id === "1" ? "Full access to all features" : id === "2" ? "Can manage inventory and reports" : "Limited to processing operations",
    permissions: {
      dashboard: true,
      inventory: id !== "3",
      users: id === "1",
      settings: id === "1",
      reports: id !== "3"
    }
  } : {
    id: 0,
    name: "",
    description: "",
    permissions: {
      dashboard: true,
      inventory: false,
      users: false,
      settings: false,
      reports: false
    }
  };

  const [role, setRole] = useState(roleData);

  const handlePermissionChange = (permission: string, value: boolean) => {
    setRole({
      ...role,
      permissions: {
        ...role.permissions,
        [permission]: value
      }
    });
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    toast({
      title: isNew ? "Role created" : "Role updated",
      description: `${role.name} has been ${isNew ? "created" : "updated"} successfully.`,
    });
    navigate("/team-settings/roles");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/team-settings/roles")}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('roles')}
        </Button>
        <h2 className="text-2xl font-bold">
          {isNew ? t('create_role') : t('edit_permissions')}
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isNew ? t('create_role') : t('edit_permissions')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Role Name</Label>
            <Input
              id="name"
              value={role.name}
              onChange={(e) => setRole({ ...role, name: e.target.value })}
              placeholder="Role name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={role.description}
              onChange={(e) => setRole({ ...role, description: e.target.value })}
              placeholder="Role description"
              rows={3}
            />
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-4">Permissions</h3>
            
            <div className="space-y-4">
              {Object.entries(role.permissions).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium capitalize">{key}</p>
                    <p className="text-sm text-muted-foreground">
                      Access to {key === 'dashboard' ? 'dashboard features' : `${key} management`}
                    </p>
                  </div>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) => handlePermissionChange(key, checked)}
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/team-settings/roles")}
          >
            {t('cancel')}
          </Button>
          <Button onClick={handleSave}>{isNew ? t('create_role') : t('save_changes')}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RoleEdit;
