import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import StorageHierarchyCard from "./StorageHierarchyCard";
import MissionTemplatesCard from "./MissionTemplatesCard";

const EditMissionTemplate = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);

  return (
    <div className="flex">
      <StorageHierarchyCard />
      <MissionTemplatesCard />
    </div>
  );
};

export default EditMissionTemplate;
