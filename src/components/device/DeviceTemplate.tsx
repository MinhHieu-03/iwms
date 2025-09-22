import React, { useEffect, useState } from "react";
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
import { useTranslation } from "react-i18next";
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
import { getDeviceType } from "@/api/missionSettingApi";

const DeviceTemplate = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deviceDropDownId, setDeviceDropDownId] = useState("");
  const [deviceDropDown, setDeviceDropDown] = useState("");
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);
  const [deviceTypes, setDeviceTypes] = useState<any>([]);

  // Use data from the new data source
  const filtered_device_types = deviceTypes.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDeviceTypes = async (payload?: any) => {
    try {
      const res = await getDeviceType(payload);
      setDeviceTypes(res?.data?.data || []);
    } catch (error) {
      console.log("error ====", error);
    }
  };

  useEffect(() => {
    getDeviceTypes();
  }, []);

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("search_device")}
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
        </div>
      </Card>

      {filtered_device_types.length === 0 ? (
        <Card className="p-8 flex flex-col items-center justify-center text-center">
          <FileBarChart2 className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">
            {t("no_templates_found")}
          </h3>
          {searchQuery ? (
            <p className="text-muted-foreground">{t("try_different_search")}</p>
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
          {filtered_device_types.map((template) => (
            <Card
              key={template.name}
              className="overflow-hidden cursor-pointer hover:bg-gray-100"
              onClick={() => {
                if (template.name === deviceDropDownId) {
                  setDeviceDropDownId("");
                  setDeviceDropDown("");
                } else {
                  setDeviceDropDownId(template.name);
                  setDeviceDropDown(
                    JSON.stringify(
                      {
                        config: template.config,
                        task: template.task.map((task) => {
                          return {
                            name: task.name,
                            param: task.param,
                          };
                        }),
                      },
                      null,
                      2
                    )
                  );
                }
              }}
            >
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row sm:items-center p-4 gap-4">
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                    {template.name === deviceDropDownId && (
                      <div>
                        <div className="mb-6">
                          <h3 className="text-left text-lg font-semibold text-gray-700 mb-2">
                            Config
                          </h3>
                          <div className="text-left mt-2 p-2 bg-gray-50 rounded font-mono text-base text-black border border-gray-200">
                            <pre onClick={(e) => e.stopPropagation()}>
                              {JSON.stringify(template.config, null, 2)}
                            </pre>
                          </div>
                        </div>
                        <div className="mb-6">
                          <h3 className="text-left text-lg font-semibold text-gray-700 mb-2">
                            Setting
                          </h3>
                          <div className="text-left mt-2 p-2 bg-gray-50 rounded font-mono text-base text-black border border-gray-200">
                            <pre onClick={(e) => e.stopPropagation()}>
                              {JSON.stringify(template.setting, null, 2)}
                            </pre>
                          </div>
                        </div>
                        <div className="mb-6">
                          <h3 className="text-left text-lg font-semibold text-gray-700 mb-2">
                            State
                          </h3>
                          <div className="text-left mt-2 p-2 bg-gray-50 rounded font-mono text-base text-black border border-gray-200">
                            <pre onClick={(e) => e.stopPropagation()}>
                              {JSON.stringify(template.state, null, 2)}
                            </pre>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-left text-lg font-semibold text-gray-700 mb-4">
                            Tasks
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {template.task.map((task, index) => (
                              <div
                                key={index}
                                className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-md transition"
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="text-md font-semibold text-gray-800">
                                    {task.name}
                                  </h4>
                                </div>
                                <div className="text-left mt-2 p-2 bg-gray-50 rounded font-mono text-base text-black border border-gray-200">
                                  <pre onClick={(e) => e.stopPropagation()}>
                                    {JSON.stringify(task.param, null, 2)}
                                  </pre>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-muted-foreground">
                        {template.steps.length} {t("steps")}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {t("modified")}{" "}
                        {new Date(template.modified).toLocaleDateString()}
                      </span>
                    </div> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeviceTemplate;
