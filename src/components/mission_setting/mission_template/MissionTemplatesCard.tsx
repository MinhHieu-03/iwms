import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Collapse, List, Typography } from "antd";
import { useToast } from "@/components/ui/use-toast";
import { Car } from "lucide-react";
import { getAllTemplates } from "@/data/missionTemplatesData";

interface MissionTemplatesCardProps {
  className?: string;
  onTemplateStepClick?: (templateStep: string) => void;
}

const MissionTemplatesCard: React.FC<MissionTemplatesCardProps> = ({ 
  className = "",
  onTemplateStepClick
}) => {
  const { toast } = useToast();
  const templates = getAllTemplates();

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Mission Templates
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="w-[20vw]">
        <Collapse
          defaultActiveKey={[]}
          ghost
          items={templates.map((template) => ({
            key: template.id,
            label: (
              <div className="flex items-center justify-between w-full">
                <Typography.Text strong>{template.name}</Typography.Text>
              </div>
            ),
            children: (
              <List
                size="small"
                dataSource={template.steps || []}
                renderItem={(step, index) => (
                  <List.Item
                    className="cursor-pointer hover:bg-blue-100 transition-all duration-200 rounded-md px-3 py-2 mb-2 border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md bg-white"
                    onClick={() => {
                      console.log("Selected step:", step);
                      toast({
                        title: "Node Created",
                        description: `Created new node: ${step}`,
                      });
                      
                      // Create new node if callback is provided
                      if (onTemplateStepClick) {
                        onTemplateStepClick(step);
                      }
                    }}
                  >
                    <List.Item.Meta
                      title={
                        <Typography.Text className="font-medium text-gray-800">
                          {step}
                        </Typography.Text>
                      }
                    />
                  </List.Item>
                )}
              />
            ),
          }))}
        />
      </CardContent>
    </Card>
  );
};

export default MissionTemplatesCard;
