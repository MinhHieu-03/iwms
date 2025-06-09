
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Save, Play, Settings, Code, Eye, Plus, Trash2, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TemplateGraph from "@/components/missions/TemplateGraph";
import { getTemplateById } from "@/data/robotMissionsData";

const TemplateEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
const { t } = useTranslation();  
  const existingTemplate = id ? getTemplateById(id) : null;
  
  const initialTemplate = existingTemplate || {
    id: "",
    name: "",
    description: "",
    category: "inbound" as const,
    estimatedDuration: 30,
    steps: [
      { id: "step-1", stepNumber: 1, action: "navigate", description: "Navigate to start location", estimatedDuration: 120, location: "" },
      { id: "step-2", stepNumber: 2, action: "scan", description: "Scan items", estimatedDuration: 60 },
    ],
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
    usageCount: 0,
    successRate: 100,
    json: {
      nodes: [
        { id: '1', position: { x: 100, y: 100 }, data: { label: 'Start' } },
        { id: '2', position: { x: 100, y: 200 }, data: { label: 'Navigate' } },
        { id: '3', position: { x: 100, y: 300 }, data: { label: 'Scan' } },
        { id: '4', position: { x: 100, y: 400 }, data: { label: 'End' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' }
      ]
    }
  };
  
  const [template, setTemplate] = useState(initialTemplate);
  const [jsonString, setJsonString] = useState(JSON.stringify(initialTemplate.json, null, 2));
  const [activeTab, setActiveTab] = useState("overview");
  
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

  const addStep = () => {
    const newStep = {
      id: `step-${template.steps.length + 1}`,
      stepNumber: template.steps.length + 1,
      action: "navigate" as const,
      description: "",
      estimatedDuration: 60,
      location: ""
    };
    
    setTemplate({
      ...template,
      steps: [...template.steps, newStep]
    });
  };

  const removeStep = (stepIndex: number) => {
    const updatedSteps = template.steps.filter((_, index) => index !== stepIndex)
      .map((step, index) => ({ ...step, stepNumber: index + 1 }));
    
    setTemplate({
      ...template,
      steps: updatedSteps
    });
  };

  const updateStep = (stepIndex: number, field: string, value: any) => {
    const updatedSteps = template.steps.map((step, index) => 
      index === stepIndex ? { ...step, [field]: value } : step
    );
    
    setTemplate({
      ...template,
      steps: updatedSteps
    });
  };

  const calculateTotalDuration = () => {
    return template.steps.reduce((total, step) => total + step.estimatedDuration, 0);
  };
  
  const handleSave = () => {
    if (!template.name || !template.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in the template name and description",
        variant: "destructive",
      });
      return;
    }

    const updatedTemplate = {
      ...template,
      estimatedDuration: Math.ceil(calculateTotalDuration() / 60),
      modified: new Date().toISOString()
    };

    console.log("Saving template:", updatedTemplate);
    
    toast({
      title: id ? t('template_updated') : t('template_created'),
      description: `${template.name} ${id ? 'has been updated' : 'has been created'} successfully`,
    });
    
    navigate("/missions");
  };

  const handleTest = () => {
    toast({
      title: "Test Mission Created",
      description: `Test mission using "${template.name}" template has been queued`,
    });
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'navigate': return '🧭';
      case 'pick': return '🤏';
      case 'place': return '📦';
      case 'scan': return '📷';
      case 'wait': return '⏱️';
      case 'charge': return '🔋';
      default: return '⚡';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'inbound': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'outbound': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'transfer': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/missions")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Missions
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {id ? 'Edit Template' : 'Create New Template'}
            </h1>
            <p className="text-muted-foreground">
              {id ? 'Modify existing mission template' : 'Design a new mission workflow for warehouse automation'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleTest} className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            Test Template
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {id ? 'Update Template' : 'Create Template'}
          </Button>
        </div>
      </div>

      {/* Template Overview Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Template Configuration</CardTitle>
            <div className="flex items-center gap-2">
              {existingTemplate && (
                <>
                  <Badge className={getCategoryColor(template.category)} variant="secondary">
                    {template.category}
                  </Badge>
                  <Badge variant="outline">{existingTemplate.usageCount} uses</Badge>
                  <Badge variant="outline">{existingTemplate.successRate.toFixed(1)}% success</Badge>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Template Name *</label>
                <Input 
                  value={template.name}
                  onChange={(e) => setTemplate({...template, name: e.target.value})}
                  placeholder="e.g., Standard Inbound Process"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Category *</label>
                <Select value={template.category} onValueChange={(value: any) => setTemplate({...template, category: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inbound">Inbound</SelectItem>
                    <SelectItem value="outbound">Outbound</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Description *</label>
                <Textarea 
                  rows={4}
                  value={template.description}
                  onChange={(e) => setTemplate({...template, description: e.target.value})}
                  placeholder="Describe what this template accomplishes..."
                />
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Estimated Duration:</span>
                  <span className="text-lg font-bold">{Math.ceil(calculateTotalDuration() / 60)}min</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Steps:</span>
                  <span className="text-lg font-bold">{template.steps.length}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Editor */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b px-6 pt-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="steps" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Steps
                </TabsTrigger>
                <TabsTrigger value="visual" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Visual Editor
                </TabsTrigger>
                <TabsTrigger value="json" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  JSON
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {template.steps.map((step, index) => (
                  <Card key={step.id} className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {step.stepNumber}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{step.description || 'Untitled Step'}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          <span>{getActionIcon(step.action)} {step.action}</span>
                          <span>• {Math.ceil(step.estimatedDuration / 60)}min</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="steps" className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Mission Steps</h3>
                <Button onClick={addStep} size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Step
                </Button>
              </div>
              
              <div className="space-y-4">
                {template.steps.map((step, index) => (
                  <Card key={step.id} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                      <div className="md:col-span-1 flex items-center justify-center">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                          {step.stepNumber}
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="text-xs font-medium text-muted-foreground">Action</label>
                        <Select 
                          value={step.action} 
                          onValueChange={(value) => updateStep(index, 'action', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="navigate">Navigate</SelectItem>
                            <SelectItem value="pick">Pick</SelectItem>
                            <SelectItem value="place">Place</SelectItem>
                            <SelectItem value="scan">Scan</SelectItem>
                            <SelectItem value="wait">Wait</SelectItem>
                            <SelectItem value="charge">Charge</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="md:col-span-4">
                        <label className="text-xs font-medium text-muted-foreground">Description</label>
                        <Input 
                          className="mt-1"
                          value={step.description}
                          onChange={(e) => updateStep(index, 'description', e.target.value)}
                          placeholder="Describe this step..."
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="text-xs font-medium text-muted-foreground">Location</label>
                        <Input 
                          className="mt-1"
                          value={step.location || ''}
                          onChange={(e) => updateStep(index, 'location', e.target.value)}
                          placeholder="e.g., Dock-A"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="text-xs font-medium text-muted-foreground">Duration (sec)</label>
                        <Input 
                          className="mt-1"
                          type="number"
                          value={step.estimatedDuration}
                          onChange={(e) => updateStep(index, 'estimatedDuration', parseInt(e.target.value) || 60)}
                          min="1"
                        />
                      </div>
                      
                      <div className="md:col-span-1 flex items-end">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeStep(index)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="visual" className="p-6">
              <div className="border rounded-lg bg-gray-50 dark:bg-gray-900" style={{ height: '600px' }}>
                <TemplateGraph data={template.json} view="editor" />
              </div>
            </TabsContent>

            <TabsContent value="json" className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Template JSON Configuration</label>
                  <Textarea
                    value={jsonString}
                    onChange={handleJsonChange}
                    className="font-mono text-sm h-96"
                    placeholder="Enter JSON configuration..."
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  Edit the JSON directly for advanced configuration. Changes will be reflected in the visual editor.
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplateEdit;
