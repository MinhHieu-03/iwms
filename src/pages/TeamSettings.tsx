
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users, Shield, UserPlus, Settings } from "lucide-react";
import UsersTab from "@/components/team/UsersTab";
import RolesTab from "@/components/team/RolesTab";
import GroupsTab from "@/components/team/GroupsTab";

const TeamSettings = () => {
  const { section = "users" } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-warehouse-primary/10 to-warehouse-secondary/10 rounded-lg p-6 border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-warehouse-primary/20 p-3 rounded-lg">
              <Users className="h-8 w-8 text-warehouse-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t('team_management')}</h1>
              <p className="text-muted-foreground">Manage users, roles, and access permissions for your warehouse team</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate("/team-settings/users/new")}
            className="bg-warehouse-primary hover:bg-warehouse-primary/90"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {t('create_user')}
          </Button>
        </div>
      </div>

      {/* Navigation and Content */}
      <Tabs value={section} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="users" asChild className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Link to="/team-settings/users" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              {t('users')}
            </Link>
          </TabsTrigger>
          <TabsTrigger value="roles" asChild className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Link to="/team-settings/roles" className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              {t('roles')}
            </Link>
          </TabsTrigger>
          <TabsTrigger value="groups" asChild className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Link to="/team-settings/groups" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              {t('groups')}
            </Link>
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
