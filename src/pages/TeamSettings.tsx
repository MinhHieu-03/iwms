
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const TeamSettings = () => {
  const { section = "users" } = useParams();
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('team_management')}</h2>
        <Button>{t('create_user')}</Button>
      </div>

      <Tabs defaultValue={section} className="w-full">
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
          <Card>
            <CardHeader>
              <CardTitle>{t('user_management')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 flex justify-between items-center dark:border-gray-700">
                  <div>
                    <h3 className="font-medium">John Doe</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('administrator')}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">{t('edit_user')}</Button>
                    <Button variant="outline" size="sm" className="text-red-500">{t('disable_user')}</Button>
                  </div>
                </div>
                <div className="border rounded-lg p-4 flex justify-between items-center dark:border-gray-700">
                  <div>
                    <h3 className="font-medium">Jane Smith</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('operator')}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">{t('edit_user')}</Button>
                    <Button variant="outline" size="sm" className="text-red-500">{t('disable_user')}</Button>
                  </div>
                </div>
                <div className="border rounded-lg p-4 flex justify-between items-center dark:border-gray-700">
                  <div>
                    <h3 className="font-medium">Robert Johnson</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('manager')}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">{t('edit_user')}</Button>
                    <Button variant="outline" size="sm" className="text-red-500">{t('disable_user')}</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('roles_permissions')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 dark:border-gray-700">
                  <h3 className="font-medium">{t('administrator')}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('full_access')}</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">{t('edit_permissions')}</Button>
                  </div>
                </div>
                <div className="border rounded-lg p-4 dark:border-gray-700">
                  <h3 className="font-medium">{t('manager')}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('inventory_reports')}</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">{t('edit_permissions')}</Button>
                  </div>
                </div>
                <div className="border rounded-lg p-4 dark:border-gray-700">
                  <h3 className="font-medium">{t('operator')}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('process_operations')}</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">{t('edit_permissions')}</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groups" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('user_groups')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 dark:border-gray-700">
                  <h3 className="font-medium">{t('warehouse_staff')}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">5 {t('members')}</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">{t('manage_group')}</Button>
                  </div>
                </div>
                <div className="border rounded-lg p-4 dark:border-gray-700">
                  <h3 className="font-medium">{t('management_team')}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">3 {t('members')}</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">{t('manage_group')}</Button>
                  </div>
                </div>
                <div className="border rounded-lg p-4 dark:border-gray-700">
                  <h3 className="font-medium">{t('it_support')}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">2 {t('members')}</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">{t('manage_group')}</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamSettings;
