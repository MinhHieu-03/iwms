import { useTranslation } from "react-i18next";
import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
    <Card className="p-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search device"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <>
            <Button
              onClick={() => navigate(`/mission-setting/template/new`)}
              className="h-10 bg-warehouse-primary hover:bg-warehouse-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              {t("btn.create_new")}
            </Button>
          </>
        </div>
      </div>
    </Card>
    </div>
  );
};

export default Header;