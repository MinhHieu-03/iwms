
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const RolesTab = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const roles = [
    { id: 1, name: "administrator", description: "full_access" },
    { id: 2, name: "manager", description: "inventory_reports" },
    { id: 3, name: "operator", description: "process_operations" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{t('roles_permissions')}</span>
          <Button size="sm" onClick={() => navigate("/team-settings/roles/new")}>
            {t('create_role')}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {roles.map((role) => (
            <div key={role.id} className="border rounded-lg p-4 dark:border-gray-700">
              <h3 className="font-medium">{t(role.name)}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t(role.description)}</p>
              <div className="mt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/team-settings/roles/${role.id}`)}
                >
                  {t('edit_permissions')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RolesTab;
