import { RenderForm, TypeRenderForm } from "@/lib/render-form";
import { Modal, Form, Button } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

type TEdit = {
  title: string;
  itemsRender?: TypeRenderForm[];
  _handleFinish: (values: unknown) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: Record<string, unknown>;
};

const ModalEdit = ({
  title,
  itemsRender = [],
  _handleFinish,
  isOpen,
  setIsOpen,
  data,
}: TEdit) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue(data);
    }
  }, [isOpen, form, data]);

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={() => {
        form?.setFieldsValue({});
        setIsOpen(false);
      }}
      footer={null}
      width={800}
    >
      <Form 
        onFinish={(values) => {
          _handleFinish(values);
          form.resetFields();
        }} 
        form={form} 
        layout="vertical"
        initialValues={data}
      >
        {itemsRender.map((items: TypeRenderForm) => {
          return <RenderForm key={items.name} data={items} />;
        })}
        <div
          className="flex items-center justify-end gap-4"
          style={{ padding: "15px 0" }}
        >
          <Button onClick={() => setIsOpen(false)}>{t("btn.cancel")}</Button>
          <Button type="primary" htmlType="submit">
            {t("btn.save")}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalEdit;
