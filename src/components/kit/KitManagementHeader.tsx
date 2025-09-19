import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { ReloadOutlined } from "@ant-design/icons";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

interface KitManagementHeaderProps {
  selectedRowKeysLength: number;
  rowInProgressLength: number;
  onAccessOI?: () => void;
  onCreateOrder: () => void;
  onRefresh: () => void;
  loading?: boolean;
}

const KitManagementHeader = ({
  onRefresh,
  loading,
}: KitManagementHeaderProps) => {
  const { t } = useTranslation();

  return (
    <CardTitle className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span>📅</span>
        Quản lý KIT
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
      </div>
    </CardTitle>
  );
};

export default KitManagementHeader;
