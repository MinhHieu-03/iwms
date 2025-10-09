import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Mission from "@/pages/Missions";
import { useTranslation } from "react-i18next";
import MissionTemplatePage from "./Mission";
import Notify from "./Notify";
import Task from "./Task";

const MissionManagerment = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <Tabs className="w-full" defaultValue="mission">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger
            value="mission"
            className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white"
          >
            Mission
          </TabsTrigger>
          <TabsTrigger
            value="task"
            className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white"
          >
            Task
          </TabsTrigger>
          <TabsTrigger
            value="notify"
            className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white"
          >
            Notify
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mission" className="mt-6">
          <MissionTemplatePage />
        </TabsContent>

        <TabsContent value="task" className="mt-6">
          <Task />
        </TabsContent>

        <TabsContent value="notify" className="mt-6">
          <Notify />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MissionManagerment;
