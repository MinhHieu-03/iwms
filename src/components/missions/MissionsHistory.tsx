
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
import { getAllMissions, getMissionsByStatus, type RobotMission } from "@/data/robotMissionsData";
import { Search, Filter, Eye, Pause, Play, Square, AlertCircle } from "lucide-react";

const MissionsHistory = () => {
const { t } = useTranslation();  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [robotFilter, setRobotFilter] = useState("all");
  const [selectedMission, setSelectedMission] = useState<RobotMission | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  
  const allMissions = getAllMissions();
  const activeMissions = getMissionsByStatus('in-progress');
  const recentMissions = allMissions.filter(m => m.status !== 'in-progress').slice(0, 20);
  
  // Get unique values for filters
  const robots = [...new Set(allMissions.map(m => m.robotCode))];
  const types = [...new Set(allMissions.map(m => m.type))];
  
  // Filter missions based on search and filters
  const filteredActiveMissions = activeMissions.filter(mission => {
    const matchesSearch = mission.missionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mission.robotCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mission.templateName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || mission.type === typeFilter;
    const matchesRobot = robotFilter === "all" || mission.robotCode === robotFilter;
    return matchesSearch && matchesType && matchesRobot;
  });
  
  const filteredRecentMissions = recentMissions.filter(mission => {
    const matchesSearch = mission.missionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mission.robotCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mission.templateName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || mission.status === statusFilter;
    const matchesType = typeFilter === "all" || mission.type === typeFilter;
    const matchesRobot = robotFilter === "all" || mission.robotCode === robotFilter;
    return matchesSearch && matchesStatus && matchesType && matchesRobot;
  });

  const handleViewDetails = (mission: RobotMission) => {
    setSelectedMission(mission);
    setIsDetailDialogOpen(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'low': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'inbound': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'outbound': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'transfer': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search missions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={robotFilter} onValueChange={setRobotFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Robot" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Robots</SelectItem>
                {robots.map(robot => (
                  <SelectItem key={robot} value={robot}>{robot}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Active Missions */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">{t('active_missions')} ({filteredActiveMissions.length})</h3>
        <div className="rounded-md border dark:border-gray-700">
          <Table>
            <TableHeader className="bg-muted/50 dark:bg-gray-800">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-medium">Mission</TableHead>
                <TableHead className="font-medium">Robot</TableHead>
                <TableHead className="font-medium">Type</TableHead>
                <TableHead className="font-medium">Priority</TableHead>
                <TableHead className="font-medium">Progress</TableHead>
                <TableHead className="font-medium">From → To</TableHead>
                <TableHead className="font-medium">ETA</TableHead>
                <TableHead className="font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActiveMissions.map((mission) => (
                <TableRow key={mission.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{mission.missionNumber}</div>
                      <div className="text-sm text-muted-foreground">{mission.templateName}</div>
                    </div>
                  </TableCell>
                  <TableCell>{mission.robotCode}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(mission.type)} variant="secondary">
                      {mission.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(mission.priority)} variant="secondary">
                      {mission.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="text-sm">{mission.currentStep}/{mission.totalSteps}</div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(mission.currentStep / mission.totalSteps) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {mission.pickupLocation} → {mission.dropoffLocation}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {mission.estimatedDuration}min
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDetails(mission)}
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
      
      {/* Recent Missions */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">{t('recent_missions')} ({filteredRecentMissions.length})</h3>
        <div className="rounded-md border dark:border-gray-700">
          <Table>
            <TableHeader className="bg-muted/50 dark:bg-gray-800">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-medium">Mission</TableHead>
                <TableHead className="font-medium">Robot</TableHead>
                <TableHead className="font-medium">Type</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium">Items</TableHead>
                <TableHead className="font-medium">Duration</TableHead>
                <TableHead className="font-medium">Completed</TableHead>
                <TableHead className="font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecentMissions.map((mission) => (
                <TableRow key={mission.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{mission.missionNumber}</div>
                      <div className="text-sm text-muted-foreground">{mission.templateName}</div>
                    </div>
                  </TableCell>
                  <TableCell>{mission.robotCode}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(mission.type)} variant="secondary">
                      {mission.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={mission.status} />
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {mission.sku && (
                        <div>
                          <div>{mission.sku}</div>
                          <div className="text-muted-foreground">Qty: {mission.quantity}</div>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {mission.actualDuration ? `${mission.actualDuration}min` : 
                       mission.estimatedDuration ? `~${mission.estimatedDuration}min` : '-'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {mission.completedAt ? new Date(mission.completedAt).toLocaleString() : '-'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewDetails(mission)}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Mission Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mission Details - {selectedMission?.missionNumber}</DialogTitle>
            <DialogDescription>
              Detailed information and step-by-step progress
            </DialogDescription>
          </DialogHeader>
          
          {selectedMission && (
            <div className="space-y-6">
              {/* Mission Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">
                    <StatusBadge status={selectedMission.status} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Type</label>
                  <div className="mt-1">
                    <Badge className={getTypeColor(selectedMission.type)} variant="secondary">
                      {selectedMission.type}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Priority</label>
                  <div className="mt-1">
                    <Badge className={getPriorityColor(selectedMission.priority)} variant="secondary">
                      {selectedMission.priority}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Robot</label>
                  <div className="mt-1 font-medium">{selectedMission.robotCode}</div>
                </div>
              </div>

              {/* Mission Steps */}
              <div>
                <h4 className="font-medium mb-3">Mission Steps ({selectedMission.currentStep}/{selectedMission.totalSteps})</h4>
                <div className="space-y-2">
                  {selectedMission.steps.map((step, index) => (
                    <div 
                      key={step.id} 
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        step.status === 'completed' ? 'bg-green-50 border-green-200' :
                        step.status === 'in-progress' ? 'bg-blue-50 border-blue-200' :
                        step.status === 'failed' ? 'bg-red-50 border-red-200' :
                        'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step.status === 'completed' ? 'bg-green-500 text-white' :
                        step.status === 'in-progress' ? 'bg-blue-500 text-white' :
                        step.status === 'failed' ? 'bg-red-500 text-white' :
                        'bg-gray-300 text-gray-600'
                      }`}>
                        {step.stepNumber}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{step.description}</div>
                        <div className="text-sm text-muted-foreground">
                          {step.location && `Location: ${step.location}`}
                          {step.duration && ` • Duration: ${Math.floor(step.duration / 60)}m ${step.duration % 60}s`}
                        </div>
                        {step.errorMessage && (
                          <div className="text-sm text-red-600 flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3 w-3" />
                            {step.errorMessage}
                          </div>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {step.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              {selectedMission.status === 'completed' && (
                <div>
                  <h4 className="font-medium mb-3">Performance Metrics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold">{selectedMission.actualDuration}min</div>
                      <div className="text-sm text-muted-foreground">Actual Duration</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold">{selectedMission.distanceTraveled}m</div>
                      <div className="text-sm text-muted-foreground">Distance</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold">{selectedMission.batteryUsed}%</div>
                      <div className="text-sm text-muted-foreground">Battery Used</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold">{selectedMission.errorCount}</div>
                      <div className="text-sm text-muted-foreground">Errors</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MissionsHistory;
