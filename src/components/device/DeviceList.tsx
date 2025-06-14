
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { devices, deviceTypes, type DeviceData } from "@/data/deviceData";
import { Search, Filter, Eye, Pause, Play, Square, AlertCircle } from "lucide-react";

const DeviceList = () => {
const { t } = useTranslation();  const [searchQuery, setSearchQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedDevice, setSelectedDevice] = useState<DeviceData | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  
  
  // Get unique values for filters
  const device_states = [...new Set(devices.map(m => m.state))];
  const device_types = [...new Set(deviceTypes.map(m => m.name))];
  
  // Filter missions based on search and filters
  const filter_devices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || device.type === typeFilter;
    const matchesRobot = stateFilter === "all" || device.state === stateFilter;
    return matchesSearch && matchesType && matchesRobot;
  });

  // const handleViewDetails = (mission: RobotMission) => {
  //   setSelectedMission(mission);
  //   setIsDetailDialogOpen(true);
  // };

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
            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {device_states.map((state) => (
                  <SelectItem value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {device_types.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="rounded-md border dark:border-gray-700">
          <Table>
            <TableHeader className="bg-muted/50 dark:bg-gray-800">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-medium text-center">{t('device_name')}</TableHead>
                <TableHead className="font-medium text-center">{t('device_type')}</TableHead>
                <TableHead className="font-medium text-center">{t('device_connection')}</TableHead>
                <TableHead className="font-medium text-center">{t('device_state')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filter_devices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{device.name}</div>
                      <div className="text-sm text-muted-foreground">{device.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{device.type}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {device.connected}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {device.state}
                    </div>
                  </TableCell>
                  {/* <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDetails(device)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-yellow-600 hover:text-yellow-800">
                        <Pause className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                        <Square className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default DeviceList;
