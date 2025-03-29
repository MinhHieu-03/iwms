
import React from "react";
import { Card } from "@/components/ui/card";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const MissionsHistory = () => {
  const activeMissions = [
    { id: "M-083", robot: "Robot-01", type: "Transfer", status: "In Progress", from: "A-12", to: "D-05", start: "2023-05-15T11:30:00" },
    { id: "M-084", robot: "Robot-03", type: "Pick", status: "In Progress", from: "B-08", to: "Loading", start: "2023-05-15T11:45:00" },
  ];
  
  const recentMissions = [
    { id: "M-082", robot: "Robot-02", type: "Transfer", status: "Completed", from: "C-14", to: "A-04", start: "2023-05-15T10:15:00", end: "2023-05-15T10:35:00" },
    { id: "M-081", robot: "Robot-01", type: "Store", status: "Completed", from: "Receiving", to: "B-11", start: "2023-05-15T09:20:00", end: "2023-05-15T09:45:00" },
    { id: "M-080", robot: "Robot-03", type: "Pick", status: "Failed", from: "D-02", to: "Loading", start: "2023-05-15T08:30:00", end: "2023-05-15T08:40:00" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <Button className="bg-warehouse-primary text-white hover:bg-warehouse-primary/90">
            <Plus className="mr-1 h-4 w-4" /> New Mission
          </Button>
        </div>
      </div>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Active Missions</h3>
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Mission ID</TableHead>
              <TableHead>Robot</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Started</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeMissions.map((mission) => (
              <TableRow key={mission.id}>
                <TableCell>{mission.id}</TableCell>
                <TableCell>{mission.robot}</TableCell>
                <TableCell>{mission.type}</TableCell>
                <TableCell>
                  <StatusBadge status={mission.status} />
                </TableCell>
                <TableCell>{mission.from}</TableCell>
                <TableCell>{mission.to}</TableCell>
                <TableCell>{new Date(mission.start).toLocaleString()}</TableCell>
                <TableCell>
                  <Button variant="ghost" className="text-yellow-600 hover:text-yellow-800 mr-2">
                    Pause
                  </Button>
                  <Button variant="ghost" className="text-red-600 hover:text-red-800">
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Recent Missions</h3>
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Mission ID</TableHead>
              <TableHead>Robot</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Started</TableHead>
              <TableHead>Finished</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentMissions.map((mission) => (
              <TableRow key={mission.id}>
                <TableCell>{mission.id}</TableCell>
                <TableCell>{mission.robot}</TableCell>
                <TableCell>{mission.type}</TableCell>
                <TableCell>
                  <StatusBadge status={mission.status} />
                </TableCell>
                <TableCell>{mission.from}</TableCell>
                <TableCell>{mission.to}</TableCell>
                <TableCell>{new Date(mission.start).toLocaleString()}</TableCell>
                <TableCell>{mission.end ? new Date(mission.end).toLocaleString() : '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default MissionsHistory;
