
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";

interface DeleteData {
  confirmation: string;
  data: any;
}

interface DeleteFormProps {
  isOpen: boolean;
  confirmation: string;
  data: any;
  onConfirm: (data: any) => void;
  onCancel: () => void;
}

const DeleteConfirmForm: React.FC<DeleteFormProps> = ({
  isOpen,
  confirmation,
  data,
  onConfirm,
  onCancel
}) => {
  if (!data) return;
  
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("delete_prompt")}</DialogTitle>
          <DialogDescription>
            {confirmation}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onCancel}
          >
            {t("cancel")}
          </Button>
          <Button
            variant="destructive"
            onClick={() => onConfirm(data)}
          >
            {t("delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { DeleteConfirmForm };
