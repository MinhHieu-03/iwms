
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, UserPlus, Trash2, Users, Shield, Settings, UserCog } from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "pending" | "inactive";
};

const rolePermissions = {
  Administrator: {
    name: "Administrator",
    description: "Full access to all features and settings",
    permissions: ["All Permissions"]
  },
  Manager: {
    name: "Manager",
    description: "Can manage missions, layout, and view reports",
    permissions: ["Manage Missions", "Manage Layout", "View Reports", "View Team"]
  },
  Operator: {
    name: "Operator",
    description: "Can execute missions and manage inventory",
    permissions: ["Execute Missions", "Manage Inventory"]
  },
  Viewer: {
    name: "Viewer",
    description: "Read-only access to dashboard and reports",
    permissions: ["View Dashboard", "View Reports"]
  }
};

const TeamSettings = () => {
  const { section } = useParams<{ section?: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(section || "members");
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
  
  // For role editing
  const [editingRole, setEditingRole] = useState("");
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState<any>(null);

  useEffect(() => {
    if (section) {
      setActiveTab(section);
    }
  }, [section]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/team-settings${value === "members" ? "" : `/${value}`}`);
  };

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
    toast.success(`User ${newUser.name} created successfully`);
  };

  const handleEditUser = () => {
    if (currentUser) {
      const updatedUsers = users.map(user => 
        user.id === currentUser.id ? currentUser : user
      );
      setUsers(updatedUsers);
      setIsEditUserOpen(false);
      setCurrentUser(null);
      toast.success(`User information updated`);
    }
  };

  const handleUserClick = (user: UserType) => {
    setCurrentUser(user);
    setIsEditUserOpen(true);
  };
  
  const handleEditRole = (roleName: string) => {
    setEditingRole(roleName);
    setRoleToEdit({...rolePermissions[roleName as keyof typeof rolePermissions]});
    setIsEditRoleOpen(true);
  };
  
  const saveRoleChanges = () => {
    // In a real app, we would save these changes to the database
    toast.success(`Role ${editingRole} updated successfully`);
    setIsEditRoleOpen(false);
    setRoleToEdit(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Management</h2>
        {activeTab === "members" && (
          <Button 
            className="bg-warehouse-primary text-white hover:bg-warehouse-primary/90"
            onClick={() => setIsCreateUserOpen(true)}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Create User
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Team Members</span>
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Roles & Permissions</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Team Settings</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="members" className="space-y-4 pt-4">
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
        </TabsContent>
        
        <TabsContent value="roles" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Roles & Permissions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(rolePermissions).map(([roleKey, role], index) => (
                <div key={roleKey} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{role.name}</div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditRole(roleKey)}
                    >
                      <UserCog className="mr-2 h-4 w-4" />
                      Edit Role
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {role.description}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {role.permissions.map((permission) => (
                      <Badge key={permission} variant="secondary">{permission}</Badge>
                    ))}
                  </div>
                  {index < Object.entries(rolePermissions).length - 1 && <Separator className="my-3" />}
                </div>
              ))}
              
              <div className="mt-6">
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Custom Role
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Permission Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Dashboard & Reporting</h3>
                  <div className="text-sm text-muted-foreground mb-2">
                    Access to analytics, dashboards, and reports
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center border rounded-md p-2">
                      <input 
                        type="checkbox" 
                        id="perm-view-dashboard" 
                        checked 
                        readOnly 
                        className="mr-2"
                      />
                      <label htmlFor="perm-view-dashboard" className="text-sm">View Dashboard</label>
                    </div>
                    <div className="flex items-center border rounded-md p-2">
                      <input 
                        type="checkbox" 
                        id="perm-view-reports" 
                        checked 
                        readOnly 
                        className="mr-2"
                      />
                      <label htmlFor="perm-view-reports" className="text-sm">View Reports</label>
                    </div>
                    <div className="flex items-center border rounded-md p-2">
                      <input 
                        type="checkbox" 
                        id="perm-create-reports" 
                        checked 
                        readOnly 
                        className="mr-2"
                      />
                      <label htmlFor="perm-create-reports" className="text-sm">Create Reports</label>
                    </div>
                    <div className="flex items-center border rounded-md p-2">
                      <input 
                        type="checkbox" 
                        id="perm-export-data" 
                        checked 
                        readOnly 
                        className="mr-2"
                      />
                      <label htmlFor="perm-export-data" className="text-sm">Export Data</label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-medium">Warehouse Operations</h3>
                  <div className="text-sm text-muted-foreground mb-2">
                    Access to manage warehouse operations and equipment
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center border rounded-md p-2">
                      <input 
                        type="checkbox" 
                        id="perm-manage-inventory" 
                        checked 
                        readOnly 
                        className="mr-2"
                      />
                      <label htmlFor="perm-manage-inventory" className="text-sm">Manage Inventory</label>
                    </div>
                    <div className="flex items-center border rounded-md p-2">
                      <input 
                        type="checkbox" 
                        id="perm-manage-layout" 
                        checked 
                        readOnly 
                        className="mr-2"
                      />
                      <label htmlFor="perm-manage-layout" className="text-sm">Manage Layout</label>
                    </div>
                    <div className="flex items-center border rounded-md p-2">
                      <input 
                        type="checkbox" 
                        id="perm-execute-missions" 
                        checked 
                        readOnly 
                        className="mr-2"
                      />
                      <label htmlFor="perm-execute-missions" className="text-sm">Execute Missions</label>
                    </div>
                    <div className="flex items-center border rounded-md p-2">
                      <input 
                        type="checkbox" 
                        id="perm-manage-missions" 
                        checked 
                        readOnly 
                        className="mr-2"
                      />
                      <label htmlFor="perm-manage-missions" className="text-sm">Manage Missions</label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-medium">Administration</h3>
                  <div className="text-sm text-muted-foreground mb-2">
                    Access to system and team administration
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center border rounded-md p-2">
                      <input 
                        type="checkbox" 
                        id="perm-view-team" 
                        checked 
                        readOnly 
                        className="mr-2"
                      />
                      <label htmlFor="perm-view-team" className="text-sm">View Team</label>
                    </div>
                    <div className="flex items-center border rounded-md p-2">
                      <input 
                        type="checkbox" 
                        id="perm-manage-team" 
                        checked 
                        readOnly 
                        className="mr-2"
                      />
                      <label htmlFor="perm-manage-team" className="text-sm">Manage Team</label>
                    </div>
                    <div className="flex items-center border rounded-md p-2">
                      <input 
                        type="checkbox" 
                        id="perm-system-settings" 
                        checked 
                        readOnly 
                        className="mr-2"
                      />
                      <label htmlFor="perm-system-settings" className="text-sm">System Settings</label>
                    </div>
                    <div className="flex items-center border rounded-md p-2">
                      <input 
                        type="checkbox" 
                        id="perm-billing-access" 
                        checked 
                        readOnly 
                        className="mr-2"
                      />
                      <label htmlFor="perm-billing-access" className="text-sm">Billing Access</label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="team-name">Team Name</Label>
                  <Input id="team-name" defaultValue="Warehouse Operations" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team-email">Team Email</Label>
                  <Input id="team-email" defaultValue="warehouse-ops@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="authentication">Authentication Method</Label>
                  <Select defaultValue="email">
                    <SelectTrigger id="authentication">
                      <SelectValue placeholder="Select authentication method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email/Password</SelectItem>
                      <SelectItem value="sso">Single Sign-On (SSO)</SelectItem>
                      <SelectItem value="2fa">Two-Factor Authentication</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      className="rounded border-gray-300"
                    />
                    <span>Require password reset every 90 days</span>
                  </Label>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      className="rounded border-gray-300"
                    />
                    <span>Automatically deactivate inactive users after 30 days</span>
                  </Label>
                </div>
                
                <Button className="mt-6">Save Team Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
      
      <Dialog open={isEditRoleOpen} onOpenChange={setIsEditRoleOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Role: {editingRole}</DialogTitle>
            <DialogDescription>
              Customize the permissions for this role.
            </DialogDescription>
          </DialogHeader>
          {roleToEdit && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="role-name">Role Name</Label>
                <Input
                  id="role-name"
                  value={roleToEdit.name}
                  onChange={(e) => setRoleToEdit({...roleToEdit, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-desc">Description</Label>
                <Input
                  id="role-desc"
                  value={roleToEdit.description}
                  onChange={(e) => setRoleToEdit({...roleToEdit, description: e.target.value})}
                />
              </div>
              <div className="space-y-3 mt-4">
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="perm-view-dashboard-edit" 
                      defaultChecked 
                    />
                    <Label htmlFor="perm-view-dashboard-edit">View Dashboard</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="perm-view-reports-edit" 
                      defaultChecked 
                    />
                    <Label htmlFor="perm-view-reports-edit">View Reports</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="perm-manage-inventory-edit" 
                      defaultChecked={editingRole === "Administrator" || editingRole === "Operator"} 
                    />
                    <Label htmlFor="perm-manage-inventory-edit">Manage Inventory</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="perm-manage-missions-edit" 
                      defaultChecked={editingRole === "Administrator" || editingRole === "Manager"} 
                    />
                    <Label htmlFor="perm-manage-missions-edit">Manage Missions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="perm-execute-missions-edit" 
                      defaultChecked={editingRole === "Administrator" || editingRole === "Operator" || editingRole === "Manager"} 
                    />
                    <Label htmlFor="perm-execute-missions-edit">Execute Missions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="perm-manage-layout-edit" 
                      defaultChecked={editingRole === "Administrator" || editingRole === "Manager"} 
                    />
                    <Label htmlFor="perm-manage-layout-edit">Manage Layout</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="perm-view-team-edit" 
                      defaultChecked={editingRole === "Administrator" || editingRole === "Manager"} 
                    />
                    <Label htmlFor="perm-view-team-edit">View Team</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="perm-manage-team-edit" 
                      defaultChecked={editingRole === "Administrator"} 
                    />
                    <Label htmlFor="perm-manage-team-edit">Manage Team</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="perm-system-settings-edit" 
                      defaultChecked={editingRole === "Administrator"} 
                    />
                    <Label htmlFor="perm-system-settings-edit">System Settings</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="perm-all-edit" 
                      defaultChecked={editingRole === "Administrator"} 
                    />
                    <Label htmlFor="perm-all-edit">All Permissions</Label>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRoleOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveRoleChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamSettings;
