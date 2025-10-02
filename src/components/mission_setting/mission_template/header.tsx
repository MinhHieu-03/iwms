import { useTranslation } from "react-i18next";
import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRow: string[];
  handleDelete: (payload: string[]) => void;
  handleCreateMission: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  selectedRow,
  handleDelete,
  handleCreateMission,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("mission_template.search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex gap-2">
            <>
              <Button
                onClick={handleCreateMission}
                className="h-10 bg-warehouse-primary hover:bg-warehouse-primary/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                {t("btn.create_new")}
              </Button>
              <Popconfirm
                title="Bạn có chắc muốn xóa"
                onConfirm={() => handleDelete(selectedRow)}
                okText="Có"
                cancelText="Không"
              >
                <Button
                  className="h-10"
                  variant="destructive"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DeleteOutlined className="mr-2 h-4 w-4" />
                  {t("btn.delete")} ({selectedRow.length})
                </Button>
              </Popconfirm>
            </>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Header;
