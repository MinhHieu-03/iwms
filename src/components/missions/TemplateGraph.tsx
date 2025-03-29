
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Save, PlusCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const TemplateGraph = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            asChild
          >
            <Link to="/missions/templates">
              <ArrowLeftIcon className="mr-1 h-4 w-4" /> Back
            </Link>
          </Button>
          <h2 className="text-2xl font-bold">
            {id?.startsWith('t-') ? 'Edit Template' : 'Create Template'}
          </h2>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            <PlusCircle className="mr-1 h-4 w-4" /> Add Node
          </Button>
          <Button className="bg-warehouse-primary text-white hover:bg-warehouse-primary/90">
            <Save className="mr-1 h-4 w-4" /> Save Template
          </Button>
        </div>
      </div>

      <Card className="p-6 h-[600px] flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-lg">Workflow Graph Editor</p>
          <p className="text-sm mt-2">This is where the mission template workflow editor would be implemented</p>
          <p className="text-sm mt-1">Would include nodes for robot actions, conditions, and connections between steps</p>
        </div>
      </Card>
    </div>
  );
};

export default TemplateGraph;
