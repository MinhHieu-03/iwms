
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Filter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface WarehouseArea {
  id: string;
  name: string;
  description: string;
  status: "empty" | "occupied" | "maintenance";
}

interface RackLocation {
  id: string;
  locationCode: string;
  row: number;
  column: number;
  status: "empty" | "occupied" | "maintenance";
  warehouse: string;
  area: string;
}

const LayoutConfig = () => {
  const { toast } = useToast();
  
  const [warehouseAreas] = useState<WarehouseArea[]>([
    { id: "1", name: "Inbound Area", description: "for test", status: "empty" },
    { id: "2", name: "Outbound Area", description: "for test", status: "empty" },
    { id: "3", name: "Storage Area", description: "ts", status: "empty" },
  ]);

  const [rackLocations] = useState<RackLocation[]>([
    { id: "1", locationCode: "quan_man", row: 1, column: 1, status: "empty", warehouse: "Main", area: "A" },
    { id: "2", locationCode: "PK10", row: 6, column: 4, status: "empty", warehouse: "Main", area: "A" },
    { id: "3", locationCode: "PK09", row: 2, column: 6, status: "empty", warehouse: "Main", area: "A" },
    { id: "4", locationCode: "PK08", row: 6, column: 4, status: "empty", warehouse: "Main", area: "A" },
    { id: "5", locationCode: "PK07", row: 6, column: 4, status: "empty", warehouse: "Main", area: "A" },
    { id: "6", locationCode: "PK06", row: 9, column: 3, status: "empty", warehouse: "Main", area: "A" },
    { id: "7", locationCode: "PK05", row: 9, column: 5, status: "empty", warehouse: "Main", area: "A" },
    { id: "8", locationCode: "PK04", row: 9, column: 3, status: "empty", warehouse: "Main", area: "A" },
    { id: "9", locationCode: "PK03", row: 22, column: 3, status: "empty", warehouse: "Main", area: "A" },
    { id: "10", locationCode: "PK02", row: 20, column: 5, status: "empty", warehouse: "Main", area: "A" },
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      empty: "secondary",
      occupied: "default",
      maintenance: "destructive"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status}
      </Badge>
    );
  };

  return (
    <Tabs defaultValue="warehouse-areas" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="warehouse-areas">Warehouse Areas</TabsTrigger>
        <TabsTrigger value="area-structure">Area Structure</TabsTrigger>
        <TabsTrigger value="pricing-structure">Pricing Structure</TabsTrigger>
      </TabsList>

      <TabsContent value="warehouse-areas" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Area Management</CardTitle>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>STT</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {warehouseAreas.map((area, index) => (
                  <TableRow key={area.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{area.name}</TableCell>
                    <TableCell>{area.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="area-structure" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Rack Configuration</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>STT</TableHead>
                  <TableHead>Location Code</TableHead>
                  <TableHead>Row</TableHead>
                  <TableHead>Column</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Warehouse</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rackLocations.map((location, index) => (
                  <TableRow key={location.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{location.locationCode}</TableCell>
                    <TableCell>{location.row}</TableCell>
                    <TableCell>{location.column}</TableCell>
                    <TableCell>{getStatusBadge(location.status)}</TableCell>
                    <TableCell>{location.warehouse}</TableCell>
                    <TableCell>{location.area}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="pricing-structure" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Pricing Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              Pricing configuration content will be implemented here
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default LayoutConfig;
