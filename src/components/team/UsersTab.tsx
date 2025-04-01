
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const UsersTab = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const users = [
    { id: 1, name: "John Doe", role: "administrator" },
    { id: 2, name: "Jane Smith", role: "operator" },
    { id: 3, name: "Robert Johnson", role: "manager" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('user_management')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="border rounded-lg p-4 flex justify-between items-center dark:border-gray-700">
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t(user.role)}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/team-settings/users/${user.id}`)}
                >
                  {t('edit_user')}
                </Button>
                <Button variant="outline" size="sm" className="text-red-500">{t('disable_user')}</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersTab;
