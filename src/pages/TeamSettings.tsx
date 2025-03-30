
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, Link } from "react-router-dom";

const TeamSettings = () => {
  const { section = "users" } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Management</h2>
        <Button>Create User</Button>
      </div>

      <Tabs defaultValue={section} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users" asChild>
            <Link to="/team-settings/users">Users</Link>
          </TabsTrigger>
          <TabsTrigger value="roles" asChild>
            <Link to="/team-settings/roles">Roles & Permissions</Link>
          </TabsTrigger>
          <TabsTrigger value="groups" asChild>
            <Link to="/team-settings/groups">Groups</Link>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">John Doe</h3>
                    <p className="text-sm text-gray-500">Administrator</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-red-500">Disable</Button>
                  </div>
                </div>
                <div className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Jane Smith</h3>
                    <p className="text-sm text-gray-500">Operator</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-red-500">Disable</Button>
                  </div>
                </div>
                <div className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Robert Johnson</h3>
                    <p className="text-sm text-gray-500">Manager</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-red-500">Disable</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">Administrator</h3>
                  <p className="text-sm text-gray-500">Full access to all system features</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">Manager</h3>
                  <p className="text-sm text-gray-500">Can manage inventory and view reports</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">Operator</h3>
                  <p className="text-sm text-gray-500">Limited to processing inbound/outbound operations</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groups" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">Warehouse Staff</h3>
                  <p className="text-sm text-gray-500">5 members</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">Manage Group</Button>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">Management Team</h3>
                  <p className="text-sm text-gray-500">3 members</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">Manage Group</Button>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">IT Support</h3>
                  <p className="text-sm text-gray-500">2 members</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">Manage Group</Button>
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
