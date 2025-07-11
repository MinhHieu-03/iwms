
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Users, Shield, Settings } from "lucide-react";
import UsersTab from "@/components/team/UsersTab";
import RolesTab from "@/components/team/RolesTab";
import GroupsTab from "@/components/team/GroupsTab";
import User from "@/components/user_management";

const TeamSettings = () => {
  const { section = "users" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
const { t } = useTranslation();
  // Extract the current tab from the URL
  const currentTab = location.pathname.split('/')[2] || 'users';

  const handleTabChange = (value: string) => {
    navigate(`/team-settings/${value}`);
  };
  return <User />
  return (
    <div className="space-y-6">

      {/* Navigation and Content */}
      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="users" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Users className="h-4 w-4 mr-2" />
            {t('users')}
          </TabsTrigger>
          <TabsTrigger value="roles" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Shield className="h-4 w-4 mr-2" />
            {t('roles')}
          </TabsTrigger>
          <TabsTrigger value="groups" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Settings className="h-4 w-4 mr-2" />
            {t('groups')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6">
          <User />
        </TabsContent>

        <TabsContent value="roles" className="mt-6">
          <RolesTab />
        </TabsContent>

        <TabsContent value="groups" className="mt-6">
          <GroupsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamSettings;
