
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const isNew = id === "new";

  // Mock user data
  const userData = !isNew ? {
    id: parseInt(id || "0"),
    name: id === "1" ? "doan nguyen" : id === "2" ? "Jane Smith" : "Robert Johnson",
    email: id === "1" ? "john@example.com" : id === "2" ? "jane@example.com" : "robert@example.com",
    role: id === "1" ? "administrator" : id === "2" ? "operator" : "manager",
    active: true
  } : {
    id: 0,
    name: "",
    email: "",
    role: "operator",
    active: true
  };

  const [user, setUser] = useState(userData);

  const handleSave = () => {
    // In a real app, this would save to a database
    toast({
      title: isNew ? "User created" : "User updated",
      description: `${user.name} has been ${isNew ? "created" : "updated"} successfully.`,
    });
    navigate("/team-settings/users");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/team-settings/users")}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('users')}
        </Button>
        <h2 className="text-2xl font-bold">
          {isNew ? t('create_user') : t('edit_user')}
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isNew ? t('create_user') : t('edit_user')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="User name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="user@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={user.role}
              onValueChange={(value) => setUser({ ...user, role: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="administrator">{t('administrator')}</SelectItem>
                <SelectItem value="manager">{t('manager')}</SelectItem>
                <SelectItem value="operator">{t('operator')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {!isNew && (
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={user.active ? "active" : "inactive"}
                onValueChange={(value) => setUser({ ...user, active: value === "active" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">{t('active')}</SelectItem>
                  <SelectItem value="inactive">{t('inactive')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/team-settings/users")}
          >
            {t('cancel')}
          </Button>
          <Button onClick={handleSave}>{isNew ? t('create_user') : t('save_changes')}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserEdit;
