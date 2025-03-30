import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, UserPlus, Trash2, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "pending" | "inactive";
};

const TeamSettings = () => {
  const [users, setUsers] = useState<UserType[]>([
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
  ]);

  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Operator",
    status: "pending" as const,
  });

  const handleCreateUser = () => {
    const userId = `${users.length + 1}`;
    const user = { id: userId, ...newUser };
    setUsers([...users, user]);
    setNewUser({
      name: "",
      email: "",
      role: "Operator",
      status: "pending",
    });
    setIsCreateUserOpen(false);
  };

  const handleEditUser = () => {
    if (currentUser) {
      const updatedUsers = users.map(user => 
        user.id === currentUser.id ? currentUser : user
      );
      setUsers(updatedUsers);
      setIsEditUserOpen(false);
      setCurrentUser(null);
    }
  };

  const handleUserClick = (user: UserType) => {
    setCurrentUser(user);
    setIsEditUserOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Management</h2>
        <Button 
          className="bg-warehouse-primary text-white hover:bg-warehouse-primary/90"
          onClick={() => setIsCreateUserOpen(true)}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Create User
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
              <div 
                key={user.id} 
                className="grid grid-cols-12 p-3 items-center text-sm border-t cursor-pointer hover:bg-gray-50"
                onClick={() => handleUserClick(user)}
              >
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
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 w-8 p-0 text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUsers(users.filter(u => u.id !== user.id));
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create User</DialogTitle>
            <DialogDescription>
              Add a new user to your team. They will receive an email invitation.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select 
                value={newUser.role}
                onValueChange={(value) => setNewUser({...newUser, role: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Administrator">Administrator</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Operator">Operator</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateUserOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateUser}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and permissions.
            </DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Role
                </Label>
                <Select 
                  value={currentUser.role}
                  onValueChange={(value) => setCurrentUser({...currentUser, role: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Operator">Operator</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select 
                  value={currentUser.status}
                  onValueChange={(value: "active" | "pending" | "inactive") => 
                    setCurrentUser({...currentUser, status: value})
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>Cancel</Button>
            <Button onClick={handleEditUser}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
