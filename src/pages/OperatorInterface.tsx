import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUp, Package, Truck } from "lucide-react";
import InboundDockTab from "@/components/operator/InboundDockTab";
import OrdersTab from "@/components/operator/OrdersTab";

const OperatorInterface = () => {
  const [shiftStarted, setShiftStarted] = useState(false);
  const [selectedDock, setSelectedDock] = useState("3");
  const { t } = useTranslation();

  const toggleShift = () => {
    setShiftStarted(!shiftStarted);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          {/* <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
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
          </div> */}

          {/* Grid View for OI Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <Link to="/oi/inbound">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-2 hover:border-green-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <ArrowDown className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">
                        OI Nhập kho
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Quản lý nhập kho và kiểm soát hàng hóa
                      </p>
                      <div className="flex items-center mt-3 text-green-600">
                        <Package className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">
                          Đi đến OI nhập kho
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-2 hover:border-purple-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="bg-purple-100 p-3 rounded-lg flex">
                      <ArrowUp className="h-8 w-8 text-purple-600" />
                      <h3 className="text-xl font-semibold text-gray-900 ml-5">
                        OI Xuất kho hàng chẵn
                      </h3>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Link to="/oi/outbound" className="flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-purple-600 border-purple-300 hover:bg-purple-50"
                        >
                          <Package className="h-4 w-4 mr-2" />
                          Pick tổng
                        </Button>
                      </Link>
                      <Link to="/oi/outbound-ptl" className="flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-purple-600 border-purple-300 hover:bg-purple-50"
                        >
                          <Truck className="h-4 w-4 mr-2" />
                          Chia lẻ
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-2 hover:border-purple-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="bg-purple-100 p-3 rounded-lg flex">
                      <ArrowUp className="h-8 w-8 text-purple-600" />
                      <h3 className="text-xl font-semibold text-gray-900 ml-5">
                        OI Xuất kho hàng lẻ
                      </h3>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Link to="/oi/outbound-odd" className="flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-purple-600 border-purple-300 hover:bg-purple-50"
                        >
                          <Package className="h-4 w-4 mr-2" />
                          Pick tổng
                        </Button>
                      </Link>
                      <Link to="/oi/outbound-odd-ptl" className="flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-purple-600 border-purple-300 hover:bg-purple-50"
                        >
                          <Truck className="h-4 w-4 mr-2" />
                          Chia lẻ
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Legacy Tabs (commented out for now, can be removed later) */}
          {/* <Tabs defaultValue="inbound" className="w-full">
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
          </Tabs> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default OperatorInterface;
