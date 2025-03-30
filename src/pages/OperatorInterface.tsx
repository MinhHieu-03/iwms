
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Package, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Truck, 
  BarChart4,
  History,
  CheckCircle
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const OperatorInterface = () => {
  const { toast } = useToast();
  const [selectedDock, setSelectedDock] = useState("");
  const [currentOperations, setCurrentOperations] = useState([
    { id: 1, type: "Inbound", dock: "Dock #3", truck: "XYZ-1234", startTime: "09:15 AM" },
    { id: 2, type: "Outbound", dock: "Dock #5", truck: "ABC-5678", startTime: "10:30 AM" }
  ]);
  
  const [operationHistory, setOperationHistory] = useState([]);

  // Load operator's preferred dock from localStorage if available
  useEffect(() => {
    const savedDock = localStorage.getItem("preferredDock");
    if (savedDock) {
      setSelectedDock(savedDock);
    }
  }, []);

  // Save preferred dock to localStorage when changed
  const handleDockChange = (value: string) => {
    setSelectedDock(value);
    localStorage.setItem("preferredDock", value);
    toast({
      title: "Default dock updated",
      description: `Your default dock is now set to ${value}`,
    });
  };

  const startOperation = (type: "Inbound" | "Outbound") => {
    if (!selectedDock) {
      toast({
        title: "No dock selected",
        description: "Please select a dock before starting an operation.",
        variant: "destructive"
      });
      return;
    }

    // Add to history
    const newHistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      dock: selectedDock,
      timestamp: new Date().toISOString()
    };
    setOperationHistory([newHistoryItem, ...operationHistory]);
    
    // In a real app, we would store this in a database or localStorage
    localStorage.setItem("operationHistory", JSON.stringify([newHistoryItem, ...operationHistory]));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Operator Controls</h2>
        <div className="flex space-x-2">
          <Button 
            onClick={() => startOperation("Inbound")}
            className="bg-green-600 hover:bg-green-700 text-white"
            asChild
          >
            <Link to="/operator-interface/inbound">
              <ArrowDownToLine className="mr-2 h-4 w-4" />
              Start Inbound
            </Link>
          </Button>
          <Button 
            onClick={() => startOperation("Outbound")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            asChild
          >
            <Link to="/operator-interface/outbound">
              <ArrowUpFromLine className="mr-2 h-4 w-4" />
              Start Outbound
            </Link>
          </Button>
        </div>
      </div>
      
      <Card className="col-span-1 md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center">
            <Truck className="mr-2 h-5 w-5 text-warehouse-primary" />
            Operator Settings
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center"
            onClick={() => {
              if (selectedDock) {
                toast({
                  title: "Settings saved",
                  description: `Your default dock is set to ${selectedDock}`,
                });
              }
            }}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="default-dock">Default Working Dock</Label>
              <Select
                value={selectedDock}
                onValueChange={handleDockChange}
              >
                <SelectTrigger id="default-dock">
                  <SelectValue placeholder="Select your default dock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dock #1">Dock #1</SelectItem>
                  <SelectItem value="Dock #2">Dock #2</SelectItem>
                  <SelectItem value="Dock #3">Dock #3</SelectItem>
                  <SelectItem value="Dock #4">Dock #4</SelectItem>
                  <SelectItem value="Dock #5">Dock #5</SelectItem>
                  <SelectItem value="Dock #6">Dock #6</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center">
              <Truck className="mr-2 h-5 w-5 text-warehouse-primary" />
              Active Dock Operations
            </CardTitle>
            <Button variant="outline" size="sm" className="flex items-center" asChild>
              <Link to="/inbound-outbound/history">
                <History className="mr-2 h-4 w-4" />
                View History
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentOperations.map((operation) => (
                <div key={operation.id} className="p-3 border rounded-md flex justify-between items-center">
                  <div>
                    <div className="font-medium">{operation.dock} - {operation.type}</div>
                    <div className="text-sm text-gray-500">Truck: {operation.truck} • Started {operation.startTime}</div>
                  </div>
                  <Button size="sm" variant="outline">Process</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5 text-warehouse-primary" />
              Pending Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-md flex justify-between items-center">
                <div>
                  <div className="font-medium">Inbound Shipment #INB-4567</div>
                  <div className="text-sm text-gray-500">45 items • Priority: High</div>
                </div>
                <Button size="sm">Process</Button>
              </div>
              <div className="p-3 border rounded-md flex justify-between items-center">
                <div>
                  <div className="font-medium">Outbound Order #OUT-7890</div>
                  <div className="text-sm text-gray-500">23 items • Priority: Medium</div>
                </div>
                <Button size="sm">Process</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
        
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="mr-2 h-5 w-5 text-warehouse-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {operationHistory.length > 0 ? (
            <div className="space-y-4">
              {operationHistory.map((item) => (
                <div key={item.id} className="p-3 border rounded-md">
                  <div className="font-medium">{item.type} Operation</div>
                  <div className="text-sm text-gray-500">
                    {new Date(item.timestamp).toLocaleString()} • {item.dock}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>No recent activity to display</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OperatorInterface;
