import { RenderForm, TypeRenderForm } from "@/lib/render-form";
import { Drawer, Form, Button } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
type TAdd = {
  title: string;
  itemsRender?: TypeRenderForm[];
  _handleFinish: (values: unknown) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  type?: string;
};
const ModalAdd = ({
  title,
  itemsRender = [],
  _handleFinish,
  isOpen,
  setIsOpen,
  type,
}: TAdd) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  return (
    <Drawer
      title={title}
      placement="right"
      onClose={() => {
        form?.resetFields();
        setIsOpen(false);
      }}
      open={isOpen}
    >
      <Form onFinish={_handleFinish} form={form} layout="vertical">
        {itemsRender.map((items: TypeRenderForm) => {
          return <RenderForm key={items.name} data={items} />;
        })}
        <div
          className="flex items-center justify-end gap-4"
          style={{ padding: "15px 0" }}
        >
          <Button onClick={() => setIsOpen(false)}>{t("btn.cancel")}</Button>
          <Button type="primary" htmlType="submit">
            {type == "password" ? t("btn.save") : t("btn.add")}
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default ModalAdd;
