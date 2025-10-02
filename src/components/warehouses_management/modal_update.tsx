import { RenderForm, TypeRenderForm } from "@/lib/render-form";
import { Modal, Form, Button } from "antd";
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
    if (formEdit.isOpen) {
      form.setFieldsValue(formEdit.data);
    }
  }, [formEdit, form]);
  return (
    <Modal
      title={title}
      open={formEdit.isOpen}
      onCancel={() => {
        form.resetFields();
        setFormEdit({
          ...formEdit,
          isOpen: false,
        });
      }}
      footer={null}
      width={600}
    >
      <Form onFinish={_handleFinish} form={form} layout="vertical">
        {itemsRender.map((items: TypeRenderForm) => {
          return <RenderForm key={items.name} data={items} />;
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
    </Modal>
  );
};

export default ModalEdit;
