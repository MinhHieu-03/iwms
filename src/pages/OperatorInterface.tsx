
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Package, PackageCheck, Clock } from "lucide-react";
import OperatorPerformance from "@/components/OperatorPerformance";
import { useLanguage } from "@/contexts/LanguageContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const OperatorInterface = () => {
  const [shiftStarted, setShiftStarted] = useState(false);
  const [selectedDock, setSelectedDock] = useState("3");
  const { t } = useLanguage();

  const toggleShift = () => {
    setShiftStarted(!shiftStarted);
  };

  return (
    <div className="space-y-6">
      {/* Performance Metrics moved to top */}
      <OperatorPerformance />

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t('operator_interface')}</h2>
          <p className="text-muted-foreground">
            {t('current_location')}: {t('dock')} {selectedDock}
          </p>
        </div>
        <div className="flex gap-3">
          {/* Added dock select button */}
          <Select value={selectedDock} onValueChange={setSelectedDock}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder={t('select_dock')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">{t('dock')} 1</SelectItem>
              <SelectItem value="2">{t('dock')} 2</SelectItem>
              <SelectItem value="3">{t('dock')} 3</SelectItem>
              <SelectItem value="4">{t('dock')} 4</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={toggleShift} 
            className={shiftStarted ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"}
          >
            {shiftStarted ? t('end_shift') : t('start_shift')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Removed Scan Barcode section, expanded tabs to full width */}
        <Tabs defaultValue="inbound" className="col-span-1 md:col-span-3">
          <TabsList className="grid grid-cols-2 mb-4 w-full max-w-md">
            <TabsTrigger value="inbound">{t('inbound')}</TabsTrigger>
            <TabsTrigger value="outbound">{t('outbound')}</TabsTrigger>
          </TabsList>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TabsContent value="inbound" className="col-span-1 md:col-span-2 lg:col-span-3 m-0">
              <Card className="w-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{t('inbound')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/operator-interface/inbound" className="flex-grow">
                      <Button className="w-full">
                        <Package className="mr-2 h-4 w-4" />
                        {t('process_operations')}
                      </Button>
                    </Link>

                    <Link to="/inbound-outbound/history" className="flex-grow">
                      <Button variant="outline" className="w-full">
                        <Clock className="mr-2 h-4 w-4" />
                        {t('dock_history')}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="outbound" className="col-span-1 md:col-span-2 lg:col-span-3 m-0">
              <Card className="w-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{t('outbound')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/operator-interface/outbound" className="flex-grow">
                      <Button className="w-full">
                        <PackageCheck className="mr-2 h-4 w-4" />
                        {t('process_operations')}
                      </Button>
                    </Link>

                    <Link to="/inbound-outbound/history" className="flex-grow">
                      <Button variant="outline" className="w-full">
                        <Clock className="mr-2 h-4 w-4" />
                        {t('dock_history')}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('recent_activity')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: "ACT-123", type: "Inbound", status: "Completed", time: "10 minutes ago" },
              { id: "ACT-122", type: "Outbound", status: "Completed", time: "25 minutes ago" },
              { id: "ACT-121", type: "Inbound", status: "Completed", time: "45 minutes ago" }
            ].map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {activity.type === "Inbound" ? (
                    <Package className="h-5 w-5 text-blue-500" />
                  ) : (
                    <PackageCheck className="h-5 w-5 text-green-500" />
                  )}
                  <div>
                    <p className="font-medium">{activity.id}</p>
                    <p className="text-sm text-muted-foreground">{t(activity.type.toLowerCase() as any)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {t(activity.status.toLowerCase() as any)}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperatorInterface;
