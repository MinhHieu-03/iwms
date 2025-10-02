import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { ReloadOutlined } from "@ant-design/icons";
import { Filter, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

interface KitManagementHeaderProps {
  selectedRowKeysLength: number;
  rowInProgressLength: number;
  onAccessOI?: () => void;
  onCreateOrder: () => void;
  onRefresh: () => void;
  loading?: boolean;
  showFilters: boolean;
  setShowFilters: (val: boolean) => void;
  isLoading?: boolean;
}

const KitManagementHeader = ({
  onRefresh,
  loading,
  showFilters,
  setShowFilters,
  isLoading,
}: KitManagementHeaderProps) => {
  const { t } = useTranslation();

  return (
    <CardTitle className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span>📅</span>
        {t('issue_time_schedule.title')}
      </div>
      <div className="flex gap-2">
        <Button
          disabled={!!loading}
          onClick={onRefresh}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <ReloadOutlined className="h-4 w-4" />
          {t("btn.refresh")}
        </Button>
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant={showFilters ? "default" : "outline"}
          loading={isLoading}
        >
          <Filter size={16} className="mr-1" />
          {t("common.filter")}
        </Button>
      </div>
    </CardTitle>
  );
};

export default KitManagementHeader;
