
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ScanBarcode, Package, PackageCheck, Clock } from "lucide-react";
import OperatorPerformance from "@/components/OperatorPerformance";
import { useLanguage } from "@/contexts/LanguageContext";

const OperatorInterface = () => {
  const [shiftStarted, setShiftStarted] = useState(false);
  const { t } = useLanguage();

  const toggleShift = () => {
    setShiftStarted(!shiftStarted);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t('operator_interface')}</h2>
          <p className="text-muted-foreground">
            {t('current_location')}: {t('dock')} 3
          </p>
        </div>
        <Button 
          onClick={toggleShift} 
          className={shiftStarted ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"}
        >
          {shiftStarted ? t('end_shift') : t('start_shift')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>{t('scan_barcode')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-6 p-8 border-2 border-dashed rounded-lg">
              <ScanBarcode size={64} className="text-muted-foreground" />
              <div className="text-center">
                <p className="text-lg font-medium">{t('scan_barcode')}</p>
                <p className="text-sm text-muted-foreground">{t('enter_barcode')}</p>
              </div>
              <div className="w-full max-w-sm">
                <input
                  type="text"
                  className="w-full p-3 border border-input rounded-md text-center text-lg"
                  placeholder="SCAN-123456"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="inbound" className="col-span-1">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="inbound">{t('inbound')}</TabsTrigger>
            <TabsTrigger value="outbound">{t('outbound')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="inbound">
            <Card className="mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{t('inbound')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Link to="/operator-interface/inbound">
                  <Button className="w-full">
                    <Package className="mr-2 h-4 w-4" />
                    {t('process_operations')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="outbound">
            <Card className="mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{t('outbound')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Link to="/operator-interface/outbound">
                  <Button className="w-full">
                    <PackageCheck className="mr-2 h-4 w-4" />
                    {t('process_operations')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
          
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                {t('history')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/inbound-outbound/history">
                <Button variant="outline" className="w-full">
                  {t('dock_history')}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Tabs>
      </div>

      <OperatorPerformance />
      
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
