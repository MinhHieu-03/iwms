
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const GroupsTab = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const groups = [
    { id: 1, name: "warehouse_staff", members: 5 },
    { id: 2, name: "management_team", members: 3 },
    { id: 3, name: "it_support", members: 2 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{t('user_groups')}</span>
          <Button size="sm" onClick={() => navigate("/team-settings/groups/new")}>
            {t('create_group')}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {groups.map((group) => (
            <div key={group.id} className="border rounded-lg p-4 dark:border-gray-700">
              <h3 className="font-medium">{t(group.name)}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {group.members} {t('members')}
              </p>
              <div className="mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate(`/team-settings/groups/${group.id}`)}
                >
                  {t('manage_group')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupsTab;
