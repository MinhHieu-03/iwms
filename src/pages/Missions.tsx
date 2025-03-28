
import React from "react";
import { Card } from "@/components/ui/card";
import StatusBadge from "@/components/StatusBadge";

const Missions = () => {
  const activeMissions = [
    { id: "M-083", robot: "Robot-01", type: "Transfer", status: "In Progress", from: "A-12", to: "D-05", start: "2023-05-15T11:30:00" },
    { id: "M-084", robot: "Robot-03", type: "Pick", status: "In Progress", from: "B-08", to: "Loading", start: "2023-05-15T11:45:00" },
  ];
  
  const recentMissions = [
    { id: "M-082", robot: "Robot-02", type: "Transfer", status: "Completed", from: "C-14", to: "A-04", start: "2023-05-15T10:15:00", end: "2023-05-15T10:35:00" },
    { id: "M-081", robot: "Robot-01", type: "Store", status: "Completed", from: "Receiving", to: "B-11", start: "2023-05-15T09:20:00", end: "2023-05-15T09:45:00" },
    { id: "M-080", robot: "Robot-03", type: "Pick", status: "Failed", from: "D-02", to: "Loading", start: "2023-05-15T08:30:00", end: "2023-05-15T08:40:00" },
  ];
  
  const robotStatuses = [
    { id: "Robot-01", status: "Busy", battery: 82, location: "Moving: A-12 → D-05" },
    { id: "Robot-02", status: "Available", battery: 67, location: "Dock-1" },
    { id: "Robot-03", status: "Busy", battery: 45, location: "Moving: B-08 → Loading" },
    { id: "Robot-04", status: "Charging", battery: 23, location: "Charging Station" },
    { id: "Robot-05", status: "Maintenance", battery: 0, location: "Maintenance Bay" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Robot Missions</h2>
        <div className="space-x-2">
          <button className="bg-warehouse-primary text-white px-4 py-2 rounded-md hover:bg-warehouse-dark transition-colors">
            New Mission
          </button>
          <button className="border border-warehouse-primary text-warehouse-primary px-4 py-2 rounded-md hover:bg-warehouse-primary/10 transition-colors">
            View Templates
          </button>
        </div>
      </div>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Active Missions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Mission ID</th>
                <th className="px-4 py-2 text-left">Robot</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">From</th>
                <th className="px-4 py-2 text-left">To</th>
                <th className="px-4 py-2 text-left">Started</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeMissions.map((mission) => (
                <tr key={mission.id} className="border-b">
                  <td className="px-4 py-3">{mission.id}</td>
                  <td className="px-4 py-3">{mission.robot}</td>
                  <td className="px-4 py-3">{mission.type}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={mission.status} />
                  </td>
                  <td className="px-4 py-3">{mission.from}</td>
                  <td className="px-4 py-3">{mission.to}</td>
                  <td className="px-4 py-3">{new Date(mission.start).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <button className="text-yellow-600 hover:text-yellow-800 mr-2">
                      Pause
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Recent Missions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Mission ID</th>
                <th className="px-4 py-2 text-left">Robot</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">From</th>
                <th className="px-4 py-2 text-left">To</th>
                <th className="px-4 py-2 text-left">Started</th>
                <th className="px-4 py-2 text-left">Finished</th>
              </tr>
            </thead>
            <tbody>
              {recentMissions.map((mission) => (
                <tr key={mission.id} className="border-b">
                  <td className="px-4 py-3">{mission.id}</td>
                  <td className="px-4 py-3">{mission.robot}</td>
                  <td className="px-4 py-3">{mission.type}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={mission.status} />
                  </td>
                  <td className="px-4 py-3">{mission.from}</td>
                  <td className="px-4 py-3">{mission.to}</td>
                  <td className="px-4 py-3">{new Date(mission.start).toLocaleString()}</td>
                  <td className="px-4 py-3">{new Date(mission.end).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Robot Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {robotStatuses.map((robot) => (
            <div key={robot.id} className="border rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">{robot.id}</h4>
                <StatusBadge status={robot.status} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Battery</span>
                  <span>{robot.battery}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      robot.battery > 60 ? 'bg-green-500' : 
                      robot.battery > 30 ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`} 
                    style={{ width: `${robot.battery}%` }}
                  />
                </div>
                <div className="pt-2 text-sm">
                  <span className="text-gray-500">Location:</span> {robot.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Missions;
