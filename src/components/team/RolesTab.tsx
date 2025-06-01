
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Edit, Trash2, Plus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TranslationKey } from "@/lib/i18n/translations";
import RoleCreateDialog from "./RoleCreateDialog";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

interface Role {
  id: number;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
}

const RolesTab = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([
    { 
      id: 1, 
      name: "administrator", 
      description: "full_access",
      userCount: 2,
      permissions: ["All Permissions"]
    },
    { 
      id: 2, 
      name: "manager", 
      description: "inventory_reports",
      userCount: 3,
      permissions: ["View Dashboard", "Manage Inventory", "View Reports"]
    },
    { 
      id: 3, 
      name: "operator", 
      description: "process_operations",
      userCount: 8,
      permissions: ["View Dashboard", "Control Robots"]
    }
  ]);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleEditRole = (role: Role) => {
    navigate(`/team-settings/roles/${role.id}/edit`);
  };

  const handleDeleteRole = (role: Role) => {
    setSelectedRole(role);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRole) {
      setRoles(roles.filter(r => r.id !== selectedRole.id));
      setSelectedRole(null);
    }
  };

  const handleCreateRole = () => {
    navigate("/team-settings/roles/new");
  };

  const getRoleColor = (roleName: string) => {
    switch (roleName) {
      case "administrator": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "manager": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "operator": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{t('roles_permissions')}</span>
            <Button onClick={handleCreateRole} className="bg-warehouse-primary hover:bg-warehouse-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              {t('create_role')}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roles.map((role) => (
              <div key={role.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-warehouse-primary/10 p-2 rounded-full">
                        <Shield className="h-4 w-4 text-warehouse-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{t(role.name as TranslationKey)}</h3>
                          <Badge className={getRoleColor(role.name)}>
                            {t(role.name as TranslationKey)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{t(role.description as TranslationKey)}</p>
                        <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                          <Users className="h-3 w-3" />
                          {role.userCount} users assigned
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((permission, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditRole(role)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteRole(role)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <RoleCreateDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
      />
      
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        itemName={selectedRole?.name || ""}
        itemType="role"
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default RolesTab;
