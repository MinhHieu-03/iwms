
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, UserPlus, Edit2, Trash2, Users } from "lucide-react";

type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "pending" | "inactive";
};

const TeamSettings = () => {
  const users: UserType[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Administrator",
      status: "active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Operator",
      status: "active",
    },
    {
      id: "3",
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      role: "Manager",
      status: "active",
    },
    {
      id: "4",
      name: "Emily Williams",
      email: "emily.williams@example.com",
      role: "Viewer",
      status: "pending",
    },
    {
      id: "5",
      name: "Robert Brown",
      email: "robert.brown@example.com",
      role: "Operator",
      status: "inactive",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Management</h2>
        <Button className="bg-warehouse-primary text-white hover:bg-warehouse-primary/90">
          <UserPlus className="mr-2 h-4 w-4" />
          Invite User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Team Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center pb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-8" />
            </div>
          </div>

          <div className="rounded-md border">
            <div className="grid grid-cols-12 p-3 text-sm font-medium text-muted-foreground bg-muted/50">
              <div className="col-span-3">Name</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {users.map((user) => (
              <div key={user.id} className="grid grid-cols-12 p-3 items-center text-sm border-t">
                <div className="col-span-3 font-medium">{user.name}</div>
                <div className="col-span-3 text-muted-foreground">{user.email}</div>
                <div className="col-span-2">{user.role}</div>
                <div className="col-span-2">
                  <Badge
                    variant={
                      user.status === "active"
                        ? "default"
                        : user.status === "pending"
                        ? "outline"
                        : "secondary"
                    }
                    className={
                      user.status === "active"
                        ? "bg-green-500"
                        : user.status === "pending"
                        ? "border-yellow-500 text-yellow-500"
                        : "bg-gray-200 text-gray-500"
                    }
                  >
                    {user.status === "active"
                      ? "Active"
                      : user.status === "pending"
                      ? "Pending"
                      : "Inactive"}
                  </Badge>
                </div>
                <div className="col-span-2 flex justify-end space-x-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Edit2 className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Roles & Permissions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="font-medium">Administrator</div>
            <div className="text-sm text-muted-foreground">
              Full access to all features and settings
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              <Badge variant="secondary">All Permissions</Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="font-medium">Manager</div>
            <div className="text-sm text-muted-foreground">
              Can manage missions, layout, and view reports
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              <Badge variant="secondary">Manage Missions</Badge>
              <Badge variant="secondary">Manage Layout</Badge>
              <Badge variant="secondary">View Reports</Badge>
              <Badge variant="secondary">View Team</Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="font-medium">Operator</div>
            <div className="text-sm text-muted-foreground">
              Can execute missions and manage inventory
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              <Badge variant="secondary">Execute Missions</Badge>
              <Badge variant="secondary">Manage Inventory</Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="font-medium">Viewer</div>
            <div className="text-sm text-muted-foreground">
              Read-only access to dashboard and reports
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              <Badge variant="secondary">View Dashboard</Badge>
              <Badge variant="secondary">View Reports</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamSettings;
