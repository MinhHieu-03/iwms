
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Package, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Truck, 
  BarChart4,
  History
} from "lucide-react";

const OperatorInterface = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Operator Controls</h2>
        <div className="flex space-x-2">
          <Button 
            as={Link}
            to="/operator-interface/inbound"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <ArrowDownToLine className="mr-2 h-4 w-4" />
            Start Inbound
          </Button>
          <Button 
            as={Link}
            to="/operator-interface/outbound"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ArrowUpFromLine className="mr-2 h-4 w-4" />
            Start Outbound
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center">
              <Truck className="mr-2 h-5 w-5 text-warehouse-primary" />
              Active Dock Operations
            </CardTitle>
            <Link to="/inbound-outbound/history">
              <Button variant="outline" size="sm" className="flex items-center">
                <History className="mr-2 h-4 w-4" />
                View History
              </Button>
            </Link>
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
