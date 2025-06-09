
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { Package, Plus } from "lucide-react";
import { mockInboundRecords, type InboundRecord } from "@/data/operatorData";

interface InboundDockTabProps {
  selectedDock: string;
  setSelectedDock: (dock: string) => void;
}

const InboundDockTab: React.FC<InboundDockTabProps> = ({ selectedDock, setSelectedDock }) => {
  const { toast } = useToast();
const { t } = useTranslation();  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [inboundType, setInboundType] = useState("");
  const [supplier, setSupplier] = useState("");
  const [expectedItems, setExpectedItems] = useState("");

  // Filter inbound records by selected dock and current user
  const dockInboundRecords = mockInboundRecords.filter(
    record => record.dock === selectedDock && record.createdBy === "John Doe"
  );

  const handleCreateInbound = () => {
    if (!inboundType || !supplier || !expectedItems) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Inbound Created",
      description: `New ${inboundType} inbound created for dock ${selectedDock}`,
    });

    // Reset form
    setInboundType("");
    setSupplier("");
    setExpectedItems("");
    setIsCreateDialogOpen(false);
  };

  const getStatusBadge = (status: InboundRecord['status']) => {
    const variants = {
      pending: "secondary",
      "in-progress": "default",
      completed: "secondary",
      cancelled: "destructive"
    } as const;

    const colors = {
      pending: "bg-gray-100 text-gray-800",
      "in-progress": "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: ""
    };

    return (
      <Badge variant={variants[status] || "secondary"} className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Inbound Dock Operations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="dock-select">Current Dock:</Label>
              <Select value={selectedDock} onValueChange={setSelectedDock}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select dock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Dock 1</SelectItem>
                  <SelectItem value="2">Dock 2</SelectItem>
                  <SelectItem value="3">Dock 3</SelectItem>
                  <SelectItem value="4">Dock 4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Inbound
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Inbound</DialogTitle>
                  <DialogDescription>
                    Create a new inbound operation for Dock {selectedDock}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="inbound-type">Inbound Type</Label>
                    <Select value={inboundType} onValueChange={setInboundType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select inbound type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Purchase Order">Purchase Order</SelectItem>
                        <SelectItem value="Return">Return</SelectItem>
                        <SelectItem value="Transfer">Transfer</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="supplier">Supplier</Label>
                    <Input
                      id="supplier"
                      value={supplier}
                      onChange={(e) => setSupplier(e.target.value)}
                      placeholder="Enter supplier name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="expected-items">Expected Items</Label>
                    <Input
                      id="expected-items"
                      type="number"
                      value={expectedItems}
                      onChange={(e) => setExpectedItems(e.target.value)}
                      placeholder="Enter expected number of items"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateInbound}>Create Inbound</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Inbound Records - Dock {selectedDock}</CardTitle>
        </CardHeader>
        <CardContent>
          {dockInboundRecords.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No inbound records found for Dock {selectedDock}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Expected</TableHead>
                    <TableHead>Received</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dockInboundRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>{record.type}</TableCell>
                      <TableCell>{record.supplier}</TableCell>
                      <TableCell>{record.expectedItems}</TableCell>
                      <TableCell>{record.receivedItems}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell>
                        {new Date(record.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InboundDockTab;
