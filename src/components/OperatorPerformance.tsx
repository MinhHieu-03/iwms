
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Line } from "recharts";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

// Mock data for performance metrics
const performanceData = [
  { name: "8:00", inbound: 2, outbound: 1, avg: 5.2 },
  { name: "9:00", inbound: 4, outbound: 2, avg: 4.8 },
  { name: "10:00", inbound: 3, outbound: 3, avg: 5.1 },
  { name: "11:00", inbound: 5, outbound: 4, avg: 4.5 },
  { name: "12:00", inbound: 2, outbound: 1, avg: 5.0 },
  { name: "13:00", inbound: 4, outbound: 3, avg: 4.7 },
  { name: "14:00", inbound: 6, outbound: 5, avg: 4.2 },
];

// Get rating based on average completion time
const getEfficiencyRating = (avg: number) => {
  if (avg < 4) return { rating: "excellent", color: "text-green-500" };
  if (avg < 5) return { rating: "good", color: "text-blue-500" };
  if (avg < 6) return { rating: "average", color: "text-yellow-500" };
  return { rating: "needs_improvement", color: "text-red-500" };
};

// Get totals from data
const getTotals = () => {
  const inboundTotal = performanceData.reduce((sum, item) => sum + item.inbound, 0);
  const outboundTotal = performanceData.reduce((sum, item) => sum + item.outbound, 0);
  const avgTime = performanceData.reduce((sum, item) => sum + item.avg, 0) / performanceData.length;
  return { inboundTotal, outboundTotal, total: inboundTotal + outboundTotal, avgTime };
};

interface OperatorPerformanceProps {
  className?: string;
}

const OperatorPerformance: React.FC<OperatorPerformanceProps> = ({ className = "" }) => {
const { t } = useTranslation();  const { inboundTotal, outboundTotal, total, avgTime } = getTotals();
  const efficiency = getEfficiencyRating(avgTime);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{t('performance_metrics')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              {t('orders_processed')}
            </h3>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold">{total}</p>
                <p className="text-sm text-muted-foreground">
                  {t('today')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm">
                  <span className="text-green-500 font-medium">{inboundTotal}</span> {t('inbound')}
                </p>
                <p className="text-sm">
                  <span className="text-blue-500 font-medium">{outboundTotal}</span> {t('outbound')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              {t('avg_completion_time')}
            </h3>
            <div>
              <p className="text-2xl font-bold">{avgTime.toFixed(1)}</p>
              <p className="text-sm text-muted-foreground">
                {t('minutes_per_order')}
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              {t('efficiency_rating')}
            </h3>
            <div>
              <p className={`text-xl font-bold ${efficiency.color}`}>
                {t(efficiency.rating as any)}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className={`h-2.5 rounded-full ${
                    efficiency.rating === "excellent" ? "bg-green-500" :
                    efficiency.rating === "good" ? "bg-blue-500" :
                    efficiency.rating === "average" ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  style={{ width: `${((6-avgTime)/3)*100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-3">{t('today')}</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <Bar dataKey="inbound" name={t('inbound')} stackId="a" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="outbound" name={t('outbound')} stackId="a" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Line 
                  type="monotone" 
                  dataKey="avg" 
                  name={t('avg_completion_time')} 
                  stroke="#FF6B6B" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OperatorPerformance;
