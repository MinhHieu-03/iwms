
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

const OperatorOutbound = () => {
  const { toast } = useToast();
  const [history, setHistory] = useState([
    { id: "OUT-001", timestamp: "2023-06-15T09:30:00", items: 15, dock: "Dock 4" },
    { id: "OUT-002", timestamp: "2023-06-15T11:45:00", items: 8, dock: "Dock 5" },
    { id: "OUT-003", timestamp: "2023-06-14T13:15:00", items: 22, dock: "Dock 6" },
  ]);

  const [newOutbound, setNewOutbound] = useState({
    customer: "",
    orderNumber: "",
    dock: "",
    itemCount: "",
    notes: ""
  });
  
  // Load operator's preferred dock from localStorage
  useEffect(() => {
    const savedDock = localStorage.getItem("preferredDock");
    if (savedDock) {
      // Convert from UI format "Dock #4" to the select format "Dock 4"
      const formattedDock = savedDock.replace("#", "");
      setNewOutbound(prev => ({ ...prev, dock: formattedDock }));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord = {
      id: `OUT-${(history.length + 1).toString().padStart(3, '0')}`,
      timestamp: new Date().toISOString(),
      items: parseInt(newOutbound.itemCount) || 0,
      dock: newOutbound.dock
    };
    
    // Update history
    setHistory([newRecord, ...history]);
    
    // Save operation to localStorage
    const operationRecord = {
      id: newRecord.id,
      type: "Outbound",
      dock: newOutbound.dock,
      timestamp: newRecord.timestamp,
      details: {
        customer: newOutbound.customer,
        orderNumber: newOutbound.orderNumber,
        items: newRecord.items
      }
    };
    
    // Save to localStorage history
    const existingHistory = JSON.parse(localStorage.getItem("operationHistory") || "[]");
    localStorage.setItem("operationHistory", JSON.stringify([operationRecord, ...existingHistory]));
    
    // Reset form
    setNewOutbound({
      customer: "",
      orderNumber: "",
      dock: "",
      itemCount: "",
      notes: ""
    });
    
    // Show success notification
    toast({
      title: "Outbound processed",
      description: `${newRecord.items} items shipped from ${newOutbound.dock}`,
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
        <h2 className="text-2xl font-bold">Outbound Processing</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="mr-2 h-5 w-5 text-blue-600" />
              New Outbound Shipment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Input 
                    id="customer" 
                    value={newOutbound.customer}
                    onChange={(e) => setNewOutbound({...newOutbound, customer: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orderNumber">Order Number</Label>
                  <Input 
                    id="orderNumber" 
                    value={newOutbound.orderNumber}
                    onChange={(e) => setNewOutbound({...newOutbound, orderNumber: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dock">Dock</Label>
                  <Select
                    value={newOutbound.dock}
                    onValueChange={(value) => setNewOutbound({...newOutbound, dock: value})}
                  >
                    <SelectTrigger id="dock">
                      <SelectValue placeholder="Select dock" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dock 4">Dock 4</SelectItem>
                      <SelectItem value="Dock 5">Dock 5</SelectItem>
                      <SelectItem value="Dock 6">Dock 6</SelectItem>
                      <SelectItem value="Dock 7">Dock 7</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemCount">Item Count</Label>
                  <Input 
                    id="itemCount" 
                    type="number"
                    value={newOutbound.itemCount}
                    onChange={(e) => setNewOutbound({...newOutbound, itemCount: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes" 
                  value={newOutbound.notes}
                  onChange={(e) => setNewOutbound({...newOutbound, notes: e.target.value})}
                  placeholder="Add any special instructions or notes"
                  className="h-24"
                />
              </div>
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Check className="mr-2 h-4 w-4" />
                Process Outbound
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

export default OperatorOutbound;
