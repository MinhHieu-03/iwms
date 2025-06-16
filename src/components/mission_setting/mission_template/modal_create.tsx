import { RenderForm, TypeRenderForm } from "@/lib/render-form";
import { Drawer, Form } from "antd";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface TAdd {
  title: string;
  description?: string;
  itemsRender?: TypeRenderForm[];
  isOpen: boolean;
  onCreate: (submitData: any) => void;
  onCancel: () => void;
  submitData?: any;
};

const ModalAdd = ({
  title,
  description,
  itemsRender = [],
  isOpen,
  onCreate,
  onCancel,
  submitData,
}: TAdd) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isOpen) form.resetFields();
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <Form onFinish={() => onCreate(submitData)} form={form} layout="vertical">
          <form className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {itemsRender.map((items: TypeRenderForm) => {
                return <RenderForm data={items} />;
              })}
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel} >
            {t("btn_cancel")}
          </Button>
          <Button variant="secondary" type="submit">
            {t("btn_create")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAdd;
