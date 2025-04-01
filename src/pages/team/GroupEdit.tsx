
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const GroupEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const isNew = id === "new";

  // Mock group data
  const groupData = !isNew ? {
    id: parseInt(id || "0"),
    name: id === "1" ? "Warehouse Staff" : id === "2" ? "Management Team" : "IT Support",
    description: `Group for ${id === "1" ? "warehouse operators" : id === "2" ? "management personnel" : "IT support staff"}`,
    members: id === "1" ? ["John Doe", "Jane Smith", "Mike Brown", "Sarah Lee", "Chris Wong"] : 
             id === "2" ? ["Robert Johnson", "Lisa Chen", "Michael Davis"] : 
             ["Alex Kim", "Priya Patel"]
  } : {
    id: 0,
    name: "",
    description: "",
    members: []
  };

  const [group, setGroup] = useState(groupData);
  const [newMember, setNewMember] = useState("");

  const allUsers = ["John Doe", "Jane Smith", "Mike Brown", "Sarah Lee", "Chris Wong", 
                   "Robert Johnson", "Lisa Chen", "Michael Davis", "Alex Kim", "Priya Patel"];
                   
  const availableUsers = allUsers.filter(user => !group.members.includes(user));

  const handleAddMember = () => {
    if (newMember && !group.members.includes(newMember)) {
      setGroup({
        ...group,
        members: [...group.members, newMember]
      });
      setNewMember("");
    }
  };

  const handleRemoveMember = (member: string) => {
    setGroup({
      ...group,
      members: group.members.filter(m => m !== member)
    });
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    toast({
      title: isNew ? "Group created" : "Group updated",
      description: `${group.name} has been ${isNew ? "created" : "updated"} successfully.`,
    });
    navigate("/team-settings/groups");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/team-settings/groups")}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('groups')}
        </Button>
        <h2 className="text-2xl font-bold">
          {isNew ? t('create_group') : t('manage_group')}
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isNew ? t('create_group') : t('manage_group')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Group Name</Label>
            <Input
              id="name"
              value={group.name}
              onChange={(e) => setGroup({ ...group, name: e.target.value })}
              placeholder="Group name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={group.description}
              onChange={(e) => setGroup({ ...group, description: e.target.value })}
              placeholder="Group description"
            />
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label>Group Members ({group.members.length})</Label>
              <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-20">
                {group.members.length === 0 ? (
                  <p className="text-muted-foreground text-sm p-2">No members in this group</p>
                ) : (
                  group.members.map((member, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {member}
                      <button 
                        className="ml-1 rounded-full hover:bg-muted p-0.5" 
                        onClick={() => handleRemoveMember(member)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              <div className="flex-grow">
                <Select value={newMember} onValueChange={setNewMember}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a member to add" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableUsers.length === 0 ? (
                      <SelectItem value="" disabled>All users added</SelectItem>
                    ) : (
                      availableUsers.map((user, index) => (
                        <SelectItem key={index} value={user}>{user}</SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleAddMember} 
                disabled={!newMember || group.members.includes(newMember)}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>

        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/team-settings/groups")}
          >
            {t('cancel')}
          </Button>
          <Button onClick={handleSave}>{isNew ? "Create Group" : t('save_changes')}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GroupEdit;
