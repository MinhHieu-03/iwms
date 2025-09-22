import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Collapse, List, Typography } from "antd";
import { useToast } from "@/components/ui/use-toast";
import { Car } from "lucide-react";
import { getAllTemplates } from "@/data/missionTemplatesData";
import { getDeviceInfo, getDeviceType } from "@/api/missionSettingApi";

interface MissionTemplatesCardProps {
  className?: string;
  onTemplateStepClick?: (templateStep: any) => void;
}

const MissionTemplatesCard: React.FC<MissionTemplatesCardProps> = ({
  className = "",
  onTemplateStepClick,
}) => {
  const { toast } = useToast();

  const [deviceList, setDeviceList] = useState<any[]>([]);
  const [typeList, setTypeList] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const { data: deviceData } = await getDeviceInfo({});
      setDeviceList(deviceData?.data || []);

      const { data: taskData } = await getDeviceType({});
      setTypeList(taskData?.data || []);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Mission Tast List
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="w-[20vw]">
        <Collapse
          defaultActiveKey={[]}
          ghost
          items={deviceList.map((device) => ({
            key: device.name,
            label: (
              <div className="flex items-center justify-between w-full">
                <Typography.Text strong>{device.name}</Typography.Text>
              </div>
            ),
            children: (
              <List
                size="small"
                dataSource={
                  typeList.find((type) => type.name === device.type)?.task || []
                }
                renderItem={(task: any, index: number) => (
                  <List.Item
                    className="cursor-pointer hover:bg-blue-100 transition-all duration-200 rounded-md px-3 py-2 mb-2 border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md bg-white"
                    onClick={() => {
                      toast({
                        title: "Node Created",
                        description: `Created new node: ${task}`,
                      });

                      // Create new node if callback is provided
                      if (onTemplateStepClick) {
                        onTemplateStepClick(task);
                      }
                    }}
                  >
                    <List.Item.Meta
                      title={
                        <Typography.Text className="font-medium text-gray-800">
                          {task?.name || ""}
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
