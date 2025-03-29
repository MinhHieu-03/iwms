
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type TemplateType = {
  id: string;
  name: string;
  description: string;
  steps: number;
  lastModified: string;
};

const MissionsTemplates = () => {
  const templates: TemplateType[] = [
    {
      id: "t-001",
      name: "Pickup and Delivery",
      description: "Standard pickup and delivery process with verification",
      steps: 5,
      lastModified: "2023-05-10T14:30:00",
    },
    {
      id: "t-002",
      name: "Zone Transfer",
      description: "Move items between warehouse zones",
      steps: 3,
      lastModified: "2023-05-08T09:15:00",
    },
    {
      id: "t-003",
      name: "Inventory Check",
      description: "Automated inventory verification process",
      steps: 7,
      lastModified: "2023-05-12T11:20:00",
    },
    {
      id: "t-004",
      name: "Pallet Transport",
      description: "Heavy pallet transportation between storage areas",
      steps: 4,
      lastModified: "2023-05-11T16:45:00",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mission Templates</h2>
        <Button className="bg-warehouse-primary text-white hover:bg-warehouse-primary/90">
          <Plus className="mr-1 h-4 w-4" /> New Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Link
            key={template.id}
            to={`/missions/templates/${template.id}`}
            className="block"
          >
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span className="text-lg">{template.name}</span>
                  <FileText className="h-5 w-5 text-warehouse-secondary" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{template.steps} steps</span>
                  <span>Modified: {new Date(template.lastModified).toLocaleDateString()}</span>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-warehouse-primary hover:text-warehouse-primary/80"
                  >
                    Edit <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MissionsTemplates;
