import React from "react";
import { useTranslation } from "react-i18next";
import MissionTable from "@/components/mission_table";

const Mission = () => {
  const { t } = useTranslation();

  return (
    <div>
      <MissionTable />
    </div>
  );
};

export default Mission;