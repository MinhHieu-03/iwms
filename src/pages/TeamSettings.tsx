
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import UsersTab from "@/components/team/UsersTab";
import RolesTab from "@/components/team/RolesTab";
import GroupsTab from "@/components/team/GroupsTab";

const TeamSettings = () => {
  const { section = "users" } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('team_management')}</h2>
        <Button onClick={() => navigate("/team-settings/users/new")}>{t('create_user')}</Button>
      </div> */}

      <Tabs value={section} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users" asChild>
            <Link to="/team-settings/users">{t('users')}</Link>
          </TabsTrigger>
          <TabsTrigger value="roles" asChild>
            <Link to="/team-settings/roles">{t('roles')}</Link>
          </TabsTrigger>
          <TabsTrigger value="groups" asChild>
            <Link to="/team-settings/groups">{t('groups')}</Link>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6">
          <UsersTab />
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
