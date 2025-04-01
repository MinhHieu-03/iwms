
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Package, PackageCheck, Clock, ArrowLeftRight } from "lucide-react";
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
      {/* Performance Metrics at top */}
      <OperatorPerformance />

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('operator_interface')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <p className="text-muted-foreground">
                  {t('current_location')}: {t('dock')} {selectedDock}
                </p>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/operator-interface/inbound">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <Package className="h-6 w-6 text-blue-500" />
                  <span>{t('process_inbound')}</span>
                </Button>
              </Link>

              <Link to="/operator-interface/outbound">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <PackageCheck className="h-6 w-6 text-green-500" />
                  <span>{t('process_outbound')}</span>
                </Button>
              </Link>

              <Link to="/inbound-outbound/history">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <Clock className="h-6 w-6 text-amber-500" />
                  <span>{t('dock_history')}</span>
                </Button>
              </Link>
              
              <Link to="/inbound-outbound">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <ArrowLeftRight className="h-6 w-6 text-purple-500" />
                  <span>{t('inbound_outbound')}</span>
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperatorInterface;
