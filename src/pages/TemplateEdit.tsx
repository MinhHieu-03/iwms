
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TemplateGraph from "@/components/missions/TemplateGraph";

// Mock template data
const templateMockData = {
  "template1": {
    id: "template1",
    name: "Inventory Transfer",
    description: "Move items from one location to another",
    steps: ["Go to location A", "Pick items", "Go to location B", "Place items"],
    created: "2023-05-01T10:00:00",
    modified: "2023-05-05T14:30:00",
    json: {
      nodes: [
        { id: '1', position: { x: 100, y: 100 }, data: { label: 'Start' } },
        { id: '2', position: { x: 100, y: 200 }, data: { label: 'Go to location A' } },
        { id: '3', position: { x: 100, y: 300 }, data: { label: 'Pick items' } },
        { id: '4', position: { x: 100, y: 400 }, data: { label: 'Go to location B' } },
        { id: '5', position: { x: 100, y: 500 }, data: { label: 'Place items' } },
        { id: '6', position: { x: 100, y: 600 }, data: { label: 'End' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e4-5', source: '4', target: '5' },
        { id: 'e5-6', source: '5', target: '6' }
      ]
    }
  },
  "template2": {
    id: "template2",
    name: "Stock Replenishment",
    description: "Refill items from warehouse to shelf",
    steps: ["Get list", "Go to storage", "Collect items", "Go to shelf", "Place items"],
    created: "2023-05-02T11:20:00",
    modified: "2023-05-04T09:15:00",
    json: {
      nodes: [
        { id: '1', position: { x: 100, y: 100 }, data: { label: 'Start' } },
        { id: '2', position: { x: 100, y: 200 }, data: { label: 'Get list' } },
        { id: '3', position: { x: 100, y: 300 }, data: { label: 'Go to storage' } },
        { id: '4', position: { x: 100, y: 400 }, data: { label: 'Collect items' } },
        { id: '5', position: { x: 100, y: 500 }, data: { label: 'Go to shelf' } },
        { id: '6', position: { x: 100, y: 600 }, data: { label: 'Place items' } },
        { id: '7', position: { x: 100, y: 700 }, data: { label: 'End' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e4-5', source: '4', target: '5' },
        { id: 'e5-6', source: '5', target: '6' },
        { id: 'e6-7', source: '6', target: '7' }
      ]
    }
  },
};

const TemplateEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const initialTemplate = id && templateMockData[id] ? { ...templateMockData[id] } : {
    id: "",
    name: "",
    description: "",
    steps: [""],
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
    json: {
      nodes: [
        { id: '1', position: { x: 100, y: 100 }, data: { label: 'Start' } },
        { id: '2', position: { x: 100, y: 200 }, data: { label: 'End' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' }
      ]
    }
  };
  
  const [template, setTemplate] = useState(initialTemplate);
  const [jsonString, setJsonString] = useState(JSON.stringify(initialTemplate.json, null, 2));
  
  const handleAddStep = () => {
    setTemplate({
      ...template,
      steps: [...template.steps, ""]
    });
  };
  
  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...template.steps];
    newSteps[index] = value;
    setTemplate({
      ...template,
      steps: newSteps
    });
  };
  
  const handleRemoveStep = (index: number) => {
    const newSteps = template.steps.filter((_, i) => i !== index);
    setTemplate({
      ...template,
      steps: newSteps
    });
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonString(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      setTemplate({
        ...template,
        json: parsed
      });
    } catch (error) {
      console.error("Invalid JSON:", error);
    }
  };
  
  const handleSave = () => {
    // In a real app, this would save to a database
    toast({
      title: id ? t('template_updated') : t('template_created'),
      description: `${template.name} ${id ? t('template_updated_description') : t('template_created_description')}`,
    });
    navigate("/missions/templates");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/missions/templates")}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('mission_templates')}
        </Button>
        <h2 className="text-2xl font-bold">{id ? t('edit_template') : t('new_template')}</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{id ? t('edit_template') : t('new_template')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="templateName">{t('template_name')}</Label>
            <Input
              id="templateName"
              value={template.name}
              onChange={(e) => setTemplate({ ...template, name: e.target.value })}
              placeholder="Enter template name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="templateDescription">{t('template_description')}</Label>
            <Textarea
              id="templateDescription"
              value={template.description}
              onChange={(e) => setTemplate({ ...template, description: e.target.value })}
              placeholder="Describe what this template does"
              rows={3}
            />
          </div>

          <Tabs defaultValue="steps" className="w-full mt-6">
            <TabsList>
              <TabsTrigger value="steps">{t('steps')}</TabsTrigger>
              <TabsTrigger value="graph">{t('graph')}</TabsTrigger>
              <TabsTrigger value="json">JSON</TabsTrigger>
            </TabsList>

            <TabsContent value="steps" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{t('steps')}</h3>
                <Button size="sm" onClick={handleAddStep} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  {t('add_step')}
                </Button>
              </div>
              
              {template.steps.map((step, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="rounded-full bg-primary w-6 h-6 flex items-center justify-center text-primary-foreground flex-shrink-0 mt-2">
                    {index + 1}
                  </div>
                  <Input
                    value={step}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    placeholder={`Step ${index + 1}`}
                    className="flex-grow"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveStep(index)}
                    disabled={template.steps.length <= 1}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="graph" className="mt-4">
              <div className="border rounded-lg" style={{ height: '500px' }}>
                {template.json && <TemplateGraph data={template.json} />}
              </div>
            </TabsContent>

            <TabsContent value="json" className="mt-4">
              <div className="space-y-2">
                <Label htmlFor="jsonEditor">JSON Configuration</Label>
                <Textarea
                  id="jsonEditor"
                  value={jsonString}
                  onChange={handleJsonChange}
                  className="font-mono h-96"
                />
              </div>
            </TabsContent>
          </Tabs>
          
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/missions/templates")}
          >
            {t('cancel')}
          </Button>
          <Button onClick={handleSave}>{t('save_template')}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TemplateEdit;
