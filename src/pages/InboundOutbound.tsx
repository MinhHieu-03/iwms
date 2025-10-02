import React, { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InboundTable from "@/components/inbound_table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowDown,
  ArrowUp,
  Package,
  Truck,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Edit,
  Trash2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";
import {
  inboundOutboundOrders,
  InboundOutboundOrder,
} from "@/data/inboundOutboundData";
import OrderForm from "@/components/OrderForm";
import OutboundTable from "@/components/outbound_table";

const InboundOutbound = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("inbound");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger
            value="inbound"
            className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white"
          >
            <ArrowDown className="h-4 w-4 mr-2" />
            {t("inbound")}
          </TabsTrigger>
          <TabsTrigger
            value="outbound"
            className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white"
          >
            <ArrowUp className="h-4 w-4 mr-2" />
            {t("outbound")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="inbound" className="mt-6">
          <InboundTable />
        </TabsContent>

        <TabsContent value="outbound" className="mt-6">
          <OutboundTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InboundOutbound;
