
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ArrowDownToLine, ArrowUpFromLine, Truck, BarChart4 } from "lucide-react";

const OperatorInterface = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Operator Controls</h2>
        <div className="flex space-x-2">
          <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
            <ArrowDownToLine className="mr-2 h-4 w-4" />
            Start Inbound
          </Button>
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            <ArrowUpFromLine className="mr-2 h-4 w-4" />
            Start Outbound
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="mr-2 h-5 w-5 text-warehouse-primary" />
              Active Dock Operations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-md flex justify-between items-center">
                <div>
                  <div className="font-medium">Dock #3 - Inbound</div>
                  <div className="text-sm text-gray-500">Truck: XYZ-1234 • Started 09:15 AM</div>
                </div>
                <Button size="sm" variant="outline">Process</Button>
              </div>
              <div className="p-3 border rounded-md flex justify-between items-center">
                <div>
                  <div className="font-medium">Dock #5 - Outbound</div>
                  <div className="text-sm text-gray-500">Truck: ABC-5678 • Started 10:30 AM</div>
                </div>
                <Button size="sm" variant="outline">Process</Button>
              </div>
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
        
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart4 className="mr-2 h-5 w-5 text-warehouse-primary" />
              Today's Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border rounded-md">
              <p className="text-gray-500">Daily operations chart would be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OperatorInterface;
