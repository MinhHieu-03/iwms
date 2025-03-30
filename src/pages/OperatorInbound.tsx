
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Truck, Package, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const OperatorInbound = () => {
  const { toast } = useToast();
  const [history, setHistory] = useState([
    { id: "INB-001", timestamp: "2023-06-15T08:15:00", items: 24, dock: "Dock 3" },
    { id: "INB-002", timestamp: "2023-06-15T10:30:00", items: 18, dock: "Dock 1" },
    { id: "INB-003", timestamp: "2023-06-14T14:45:00", items: 36, dock: "Dock 2" },
  ]);

  const [newInbound, setNewInbound] = useState({
    supplier: "",
    poNumber: "",
    dock: "",
    itemCount: "",
    notes: ""
  });
  
  // Load operator's preferred dock from localStorage
  useEffect(() => {
    const savedDock = localStorage.getItem("preferredDock");
    if (savedDock) {
      // Convert from UI format "Dock #1" to the select format "Dock 1"
      const formattedDock = savedDock.replace("#", "");
      setNewInbound(prev => ({ ...prev, dock: formattedDock }));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord = {
      id: `INB-${(history.length + 1).toString().padStart(3, '0')}`,
      timestamp: new Date().toISOString(),
      items: parseInt(newInbound.itemCount) || 0,
      dock: newInbound.dock
    };
    
    // Update history
    setHistory([newRecord, ...history]);
    
    // Save operation to localStorage
    const operationRecord = {
      id: newRecord.id,
      type: "Inbound",
      dock: newInbound.dock,
      timestamp: newRecord.timestamp,
      details: {
        supplier: newInbound.supplier,
        poNumber: newInbound.poNumber,
        items: newRecord.items
      }
    };
    
    // Save to localStorage history
    const existingHistory = JSON.parse(localStorage.getItem("operationHistory") || "[]");
    localStorage.setItem("operationHistory", JSON.stringify([operationRecord, ...existingHistory]));
    
    // Reset form
    setNewInbound({
      supplier: "",
      poNumber: "",
      dock: "",
      itemCount: "",
      notes: ""
    });
    
    // Show success notification
    toast({
      title: "Inbound processed",
      description: `${newRecord.items} items processed at ${newInbound.dock}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/operator-interface">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold">Inbound Processing</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="mr-2 h-5 w-5 text-green-600" />
              New Inbound Shipment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input 
                    id="supplier" 
                    value={newInbound.supplier}
                    onChange={(e) => setNewInbound({...newInbound, supplier: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="poNumber">PO Number</Label>
                  <Input 
                    id="poNumber" 
                    value={newInbound.poNumber}
                    onChange={(e) => setNewInbound({...newInbound, poNumber: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dock">Dock</Label>
                  <Select
                    value={newInbound.dock}
                    onValueChange={(value) => setNewInbound({...newInbound, dock: value})}
                  >
                    <SelectTrigger id="dock">
                      <SelectValue placeholder="Select dock" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dock 1">Dock 1</SelectItem>
                      <SelectItem value="Dock 2">Dock 2</SelectItem>
                      <SelectItem value="Dock 3">Dock 3</SelectItem>
                      <SelectItem value="Dock 4">Dock 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemCount">Item Count</Label>
                  <Input 
                    id="itemCount" 
                    type="number"
                    value={newInbound.itemCount}
                    onChange={(e) => setNewInbound({...newInbound, itemCount: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes" 
                  value={newInbound.notes}
                  onChange={(e) => setNewInbound({...newInbound, notes: e.target.value})}
                  placeholder="Add any special instructions or notes"
                  className="h-24"
                />
              </div>
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Check className="mr-2 h-4 w-4" />
                Process Inbound
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {history.map(item => (
              <div key={item.id} className="p-3 border rounded-md">
                <div className="font-medium">{item.id}</div>
                <div className="text-sm text-gray-500">
                  {new Date(item.timestamp).toLocaleString()}
                </div>
                <div className="text-sm">
                  <span className="font-medium">{item.items} items</span> • {item.dock}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OperatorInbound;
