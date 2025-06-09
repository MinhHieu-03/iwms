import { RenderForm, TypeRenderForm } from "@/lib/render-form";
import { Drawer, Form, Button } from "antd";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
type TEdit = {
  title: string;
  itemsRender?: TypeRenderForm[];
  _handleFinish: (values: unknown) => void;
  formEdit: {
    isOpen: boolean;
    data?: Record<string, unknown>;
  };
  setFormEdit: Dispatch<
    SetStateAction<
      | {
          isOpen: boolean;
          data: unknown | Record<string, unknown>;
        }
      | Record<string, unknown>
    >
  >;
};

const ModalEdit = ({
  title,
  itemsRender = [],
  _handleFinish,
  formEdit,
  setFormEdit,
}: TEdit) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  useEffect(() => {
    if (!formEdit.isOpen) form.resetFields();
    else {
      form.setFieldsValue(formEdit.data);
    }
  }, [formEdit]);
  return (
    <Drawer
      title={title}
      placement="right"
      onClose={() =>
        setFormEdit({
          ...formEdit,
          isOpen: false,
        })
      }
      open={formEdit.isOpen}
    >
      <Form onFinish={_handleFinish} form={form} layout="vertical">
        {itemsRender.map((items: TypeRenderForm) => {
          return <RenderForm data={items} />;
        })}
        <div
          className="flex items-center justify-end gap-4"
          style={{ padding: "15px 0" }}
        >
          <Button
            onClick={() =>
              setFormEdit({
                ...formEdit,
                isOpen: false,
              })
            }
          >
            {t("btn.cancel")}
          </Button>
          <Button type="primary" htmlType="submit">
            {t("btn.save")}
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default ModalEdit;
