
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import {
  Search,
  Calendar,
  MoreHorizontal,
  Edit,
  Copy,
  Trash,
  FileBarChart2,
  PlusCircle,
  XCircle,
} from "lucide-react";

const MissionsTemplates = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);

  // Mock data
  const templates = [
    {
      id: "template1",
      name: "Inventory Transfer",
      description: "Move items from one location to another",
      steps: ["Go to location A", "Pick items", "Go to location B", "Place items"],
      created: "2023-05-01T10:00:00",
      modified: "2023-05-05T14:30:00"
    },
    {
      id: "template2",
      name: "Stock Replenishment",
      description: "Refill items from warehouse to shelf",
      steps: ["Get list", "Go to storage", "Collect items", "Go to shelf", "Place items"],
      created: "2023-05-02T11:20:00",
      modified: "2023-05-04T09:15:00"
    },
  ];

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteTemplate = () => {
    if (templateToDelete) {
      const template = templates.find((t) => t.id === templateToDelete);
      if (template) {
        toast({
          title: t("template_deleted"),
          description: `${template.name} ${t("template_deleted_description")}`,
        });
      }
      setIsDeleteDialogOpen(false);
      setTemplateToDelete(null);
    }
  };

  const confirmDelete = (id: string) => {
    setTemplateToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("search_templates")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-2.5"
            >
              <XCircle className="h-4 w-4 text-muted-foreground hover:text-primary" />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 flex-shrink-0">
            <Calendar className="h-4 w-4" />
            {t("filter")}
          </Button>
          <Link to="/missions/templates/new">
            <Button className="gap-2 flex-shrink-0">
              <PlusCircle className="h-4 w-4" />
              {t("new_template")}
            </Button>
          </Link>
        </div>
      </div>

      {filteredTemplates.length === 0 ? (
        <Card className="p-8 flex flex-col items-center justify-center text-center">
          <FileBarChart2 className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">{t("no_templates_found")}</h3>
          {searchQuery ? (
            <p className="text-muted-foreground">
              {t("try_different_search")}
            </p>
          ) : (
            <p className="text-muted-foreground">
              {t("create_first_template")}
            </p>
          )}
          {searchQuery && (
            <Button
              variant="outline"
              onClick={() => setSearchQuery("")}
              className="mt-4"
            >
              {t("clear_search")}
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row sm:items-center p-4 gap-4">
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-muted-foreground">
                        {template.steps.length} {t("steps")}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {t("modified")}{" "}
                        {new Date(template.modified).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:flex-shrink-0">
                    <Link to={`/missions/templates/${template.id}`}>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Edit className="h-3.5 w-3.5" />
                        {t("edit")}
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            toast({
                              title: "Template duplicated",
                              description: `${template.name} has been duplicated.`,
                            })
                          }
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          <span>{t("duplicate")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => confirmDelete(template.id)}
                          className="text-red-500 focus:text-red-500"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          <span>{t("delete")}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("delete_template")}</DialogTitle>
            <DialogDescription>
              {t("delete_template_confirm")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              {t("cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteTemplate}
            >
              {t("delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MissionsTemplates;
