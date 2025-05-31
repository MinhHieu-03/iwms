
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Download, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface StorageHierarchy {
  id: string;
  name: string;
  level: number;
  parent?: string;
  children?: StorageHierarchy[];
}

interface MasterDataItem {
  id: string;
  sku: string;
  productName: string;
  storageModel: string;
  cartonQuantity: number;
  boxQuantity: number;
  kitQuantity: number;
  action: string;
}

const StorageModelConfig = () => {
  const { toast } = useToast();
  
  const [storageHierarchy] = useState<StorageHierarchy[]>([
    {
      id: "1",
      name: "thùng nhựa",
      level: 0,
      children: [
        {
          id: "2",
          name: "carton",
          level: 1,
          parent: "1",
          children: [
            { id: "5", name: "box", level: 2, parent: "2" },
            { id: "6", name: "kit", level: 2, parent: "2" }
          ]
        },
        {
          id: "3",
          name: "box",
          level: 1,
          parent: "1",
          children: [
            { id: "7", name: "kit", level: 2, parent: "3" }
          ]
        },
        {
          id: "4",
          name: "kit",
          level: 1,
          parent: "1"
        }
      ]
    }
  ]);

  const [masterData] = useState<MasterDataItem[]>([
    {
      id: "1",
      sku: "09922316",
      productName: "vt-d45",
      storageModel: "thùng nhựa",
      cartonQuantity: 20,
      boxQuantity: 100,
      kitQuantity: 300,
      action: "Can bổ vào thùng nhựa"
    },
    {
      id: "2",
      sku: "09922410",
      productName: "vt-d45",
      storageModel: "thùng nhựa",
      cartonQuantity: 20,
      boxQuantity: 100,
      kitQuantity: 300,
      action: "Can bổ vào thùng nhựa"
    },
    {
      id: "3",
      sku: "09923344",
      productName: "vt-d45",
      storageModel: "thùng nhựa",
      cartonQuantity: 20,
      boxQuantity: 100,
      kitQuantity: 300,
      action: "Can bổ vào thùng nhựa"
    },
    {
      id: "4",
      sku: "09922426",
      productName: "vt-d45",
      storageModel: "thùng nhựa",
      cartonQuantity: 2123,
      boxQuantity: 100,
      kitQuantity: 300,
      action: "Can bổ vào thùng nhựa"
    },
    {
      id: "5",
      sku: "09921797",
      productName: "vt-d23",
      storageModel: "thùng nhựa",
      cartonQuantity: 20,
      boxQuantity: 100,
      kitQuantity: 300,
      action: "Can bổ vào thùng nhựa"
    }
  ]);

  const [selectedTags, setSelectedTags] = useState<string[]>(["thùng nhựa", "carton"]);

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const renderHierarchyTree = (items: StorageHierarchy[], level = 0) => {
    return (
      <div className={`ml-${level * 4} space-y-2`}>
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
            <div className="flex items-center space-x-2">
              <span className="font-medium">{item.name}</span>
              <Button variant="outline" size="sm">
                <Edit className="h-3 w-3" />
              </Button>
              <Button variant="outline" size="sm" className="text-red-500">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-3 w-3" />
            </Button>
            {item.children && (
              <div className="mt-2 w-full">
                {renderHierarchyTree(item.children, level + 1)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Tabs defaultValue="storage-hierarchy" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="storage-hierarchy">Storage Hierarchy</TabsTrigger>
        <TabsTrigger value="storage-flow">Storage Flow</TabsTrigger>
        <TabsTrigger value="master-data">Master Data</TabsTrigger>
      </TabsList>

      <TabsContent value="storage-hierarchy" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Storage Level</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline">Reload</Button>
                <Button>Save</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                {selectedTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1">
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-sm hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                <Button variant="outline" size="sm">+ Add New</Button>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Storage Hierarchy</h3>
                  <Button variant="outline" size="sm">Create Storage Hierarchy</Button>
                </div>
                
                {renderHierarchyTree(storageHierarchy)}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="storage-flow" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Storage Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                {selectedTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1">
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-sm hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              
              <Button className="w-24">Save</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="master-data" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Master Data</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New
                </Button>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Import Excel
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>STT</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Storage Model</TableHead>
                  <TableHead>Carton Quantity</TableHead>
                  <TableHead>Box Quantity</TableHead>
                  <TableHead>Kit Quantity</TableHead>
                  <TableHead>Action Required</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {masterData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{item.sku}</TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.storageModel}</TableCell>
                    <TableCell>{item.cartonQuantity}</TableCell>
                    <TableCell>{item.boxQuantity}</TableCell>
                    <TableCell>{item.kitQuantity}</TableCell>
                    <TableCell>{item.action}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default StorageModelConfig;
