import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "react-i18next";
import {
  devices as device_init_data,
  deviceTypes,
  type DeviceType,
} from "@/data/deviceData";
import {
  Search,
  Filter,
  Eye,
  Pause,
  Play,
  Trash,
  PlusCircle,
  Edit,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  DeviceForm,
  type DeviceFormData,
} from "@/components/device/DeviceForm";
import { DeleteConfirmForm } from "@/components/common/DeleteConfirm";
import {
  createDevice,
  deleteDevice,
  getDeviceInfo,
  getDeviceType,
  updateDevice,
} from "@/api/missionSettingApi";

const DeviceList = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const [stateFilter, setStateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [deviceToDelete, setDeviceToDelete] = useState<any | null>(null);
  const [isDeleteFormOpen, setIsDeleteFormOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState<any | null>(null);
  const [devices, setDevices] = useState<any[]>([]);
  const [deviceTypes, setDeviceTypes] = useState<any[]>([]);
  const [formMode, setFormMode] = useState<"create" | "edit" | "view">(
    "create"
  );
  // Filter missions based on search and filters
  const filter_devices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || device.type === typeFilter;
    const matchesRobot = stateFilter === "all" || device.state === stateFilter;
    return matchesSearch && matchesType && matchesRobot;
  });

  // const handleViewDetails = (mission: RobotMission) => {
  //   setSelectedMission(mission);
  //   setIsDetailDialogOpen(true);
  // };

  const fetchData = async () => {
    try {
      const { data } = await getDeviceInfo({});
      setDevices(data?.data || []);
      console.log("data   data", data);
    } catch (error) {
      console.log("error ====", error);
    }
  };

  const getDeviceTypes = async () => {
    try {
      const { data } = await getDeviceType({});
      setDeviceTypes(data?.data.map((type: any) => type.name) || []);
    } catch (error) {
      console.log("error ====", error);
    }
  };

  useEffect(() => {
    fetchData();
    getDeviceTypes();
  }, []);

  const handleCreateDevice = async (deviceData: DeviceFormData) => {
    try {
      if (!deviceData) return;

      const newDevice: any = {
        ...deviceData,
        setting: { ...deviceData.setting },
        config: { ...deviceData.config },
        init_state: { ...deviceData.state },
      };

      const { data } = await createDevice(newDevice);
      fetchData();

      if (data.success) {
        toast({
          title: "Success",
          description: `Device ${deviceData.name} has been created successfully.`,
        });
      } else {
        toast({
          title: "Error",
          description: data.desc,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEditDevice = async (deviceData: DeviceFormData) => {
    if (!deviceData) return;
    console.log("first", deviceData);

    const updatedDevice: any = {
      name: deviceData.name,
      config: deviceData.config || {},
      state: deviceData.state || {},
      description: deviceData.description,
    };

    console.log("updatedDevice", updatedDevice);
    await updateDevice(updatedDevice);
    fetchData();

    setIsFormOpen(false);
    setEditingDevice(null);
    toast({
      title: "Device Updated",
      description: `Device ${updatedDevice.name} has been updated successfully.`,
    });
  };

  const handleDeleteDevice = async (deviceData: any) => {
    await deleteDevice({ name: deviceData.name });
    console.log("deviceData ====", deviceData);
    setIsDeleteFormOpen(false);
    fetchData();
    toast({
      title: "Device deleted",
      description: `Device ${deviceData.name} has been deleted.`,
      variant: "destructive",
    });
  };

  const openCreateForm = () => {
    setFormMode("create");
    setEditingDevice(null);
    setIsFormOpen(true);
  };

  const openEditForm = (device: any) => {
    setFormMode("edit");
    setEditingDevice(device);
    setIsFormOpen(true);
  };

  const openDeleteForm = (device: any) => {
    setDeviceToDelete(device);
    setIsDeleteFormOpen(true);
  };

  const openViewForm = (device: any) => {
    setFormMode("view");
    setEditingDevice(device);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search device"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="all" value="all">
                  All Types
                </SelectItem>
                {deviceTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={openCreateForm}
              className="h-10 bg-warehouse-primary hover:bg-warehouse-primary/90"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              {t("new_device")}
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="rounded-md border dark:border-gray-700">
          <Table>
            <TableHeader className="bg-muted/50 dark:bg-gray-800">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-medium text-center">
                  {t("device_name")}
                </TableHead>
                <TableHead className="font-medium text-center">
                  {t("device_type")}
                </TableHead>
                <TableHead className="font-medium text-center">
                  {t("device_connection")}
                </TableHead>
                <TableHead className="font-medium text-center">
                  {t("device_action")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filter_devices.map((device) => (
                <TableRow
                  key={device.name}
                  onClick={() => openViewForm(device)}
                >
                  <TableCell>
                    <div>
                      <div className="font-medium">{device.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {device.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{device.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={device.connected ? "secondary" : "destructive"}
                      className="w-fit"
                    >
                      {device.connected
                        ? t("device_connection_connected")
                        : t("device_connection_disconnected")}
                    </Badge>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => openEditForm(device)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-800"
                      onClick={() => openDeleteForm(device)}
                    >
                      <Trash className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <DeviceForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={formMode === "edit" ? handleEditDevice : handleCreateDevice}
        initialData={editingDevice}
        mode={formMode}
        deviceTypes={deviceTypes}
      />

      <DeleteConfirmForm
        isOpen={isDeleteFormOpen}
        confirmation={t("device_delete_confirmation")}
        data={deviceToDelete}
        onConfirm={handleDeleteDevice}
        onCancel={() => setIsDeleteFormOpen(false)}
      />
    </div>
  );
};

export default DeviceList;
