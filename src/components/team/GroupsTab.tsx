
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Settings, Edit, Trash2, Plus, Users } from "lucide-react";
import { TranslationKey } from "@/lib/i18n/translations";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

interface Group {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  department: string;
}

const GroupsTab = () => {
  const { t } = useLanguage();
  const [groups, setGroups] = useState<Group[]>([
    { id: 1, name: "warehouse_staff", description: "Front-line warehouse operations team", memberCount: 12, department: "Operations" },
    { id: 2, name: "management_team", description: "Warehouse management and supervisors", memberCount: 4, department: "Management" },
    { id: 3, name: "it_support", description: "Technical support and system maintenance", memberCount: 2, department: "IT Support" }
  ]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const handleDeleteGroup = (group: Group) => {
    setSelectedGroup(group);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedGroup) {
      setGroups(groups.filter(g => g.id !== selectedGroup.id));
      setSelectedGroup(null);
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "Operations": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Management": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "IT Support": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{t('user_groups')}</span>
            <Button className="bg-warehouse-primary hover:bg-warehouse-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              {t('create_group')}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {groups.map((group) => (
              <div key={group.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-warehouse-primary/10 p-2 rounded-full">
                        <Settings className="h-4 w-4 text-warehouse-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{t(group.name as TranslationKey)}</h3>
                          <Badge className={getDepartmentColor(group.department)}>
                            {group.department}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{group.description}</p>
                        <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                          <Users className="h-3 w-3" />
                          {group.memberCount} {t('members')}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      {t('manage_group')}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteGroup(group)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        itemName={selectedGroup?.name || ""}
        itemType="group"
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default GroupsTab;
