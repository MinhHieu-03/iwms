
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import InboundDockTab from "@/components/operator/InboundDockTab";
import OrdersTab from "@/components/operator/OrdersTab";

const OperatorInterface = () => {
  const [shiftStarted, setShiftStarted] = useState(false);
  const [selectedDock, setSelectedDock] = useState("3");
  const { t } = useLanguage();

  const toggleShift = () => {
    setShiftStarted(!shiftStarted);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <p className="text-muted-foreground">
                {t('current_location')}: {t('dock')} {selectedDock}
              </p>

              <Button 
                onClick={toggleShift} 
                className={shiftStarted ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"}
              >
                {shiftStarted ? t('end_shift') : t('start_shift')}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="inbound" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="inbound">Inbound Dock</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>
            
            <TabsContent value="inbound" className="mt-6">
              <InboundDockTab 
                selectedDock={selectedDock} 
                setSelectedDock={setSelectedDock} 
              />
            </TabsContent>
            
            <TabsContent value="orders" className="mt-6">
              <OrdersTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperatorInterface;
