import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";
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
        <CardContent className="space-y-4 pt-6">
          <Tabs defaultValue="editor" className="w-full">
            <TabsList>
              <TabsTrigger value="editor">{t('visual_editor')}</TabsTrigger>
              <TabsTrigger value="json">JSON</TabsTrigger>
              <TabsTrigger value="settings">{t('settings')}</TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="mt-4">
              <div className="border rounded-lg" style={{ height: '600px' }}>
                <TemplateGraph data={template.json} />
              </div>
            </TabsContent>

            <TabsContent value="json" className="mt-4">
              <div className="space-y-2">
                <Textarea
                  id="jsonEditor"
                  value={jsonString}
                  onChange={handleJsonChange}
                  className="font-mono h-96"
                />
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Template Name</label>
                    <input 
                      type="text" 
                      value={template.name}
                      onChange={(e) => setTemplate({...template, name: e.target.value})}
                      className="border rounded px-3 py-2"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea 
                      rows={3}
                      value={template.description}
                      onChange={(e) => setTemplate({...template, description: e.target.value})}
                      className="border rounded px-3 py-2"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Category</label>
                    <select className="border rounded px-3 py-2">
                      <option>Pick and Place</option>
                      <option>Transport</option>
                      <option>Inventory</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <input type="checkbox" id="is-active" defaultChecked />
                    <label htmlFor="is-active" className="text-sm">Active template (available for use)</label>
                  </div>
                </CardContent>
              </Card>
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
