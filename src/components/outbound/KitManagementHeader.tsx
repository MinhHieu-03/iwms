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
}

const KitManagementHeader = ({
  selectedRowKeysLength,
  rowInProgressLength,
  onAccessOI,
  onCreateOrder,
  onRefresh,
}: KitManagementHeaderProps) => {
  const { t } = useTranslation();

  return (
    <CardTitle className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span>📅</span>
        Quản lý KIT chẵn chờ xuất hàng
      </div>
      <div className="flex gap-2">
        <Button
          onClick={onCreateOrder}
          className="gap-2"
          disabled={selectedRowKeysLength === 0 || rowInProgressLength === 4}
          size="sm"
        >
          <Plus className="h-4 w-4" />
          Tạo lệnh xuất hàng
        </Button>
        <Button
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
