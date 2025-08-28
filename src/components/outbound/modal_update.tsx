import { Modal, Form, Input, DatePicker, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import dayjs from "dayjs";
import { IssueTimeScheduleDataType } from "./const";

export interface FormValues extends Omit<IssueTimeScheduleDataType, '_id' | 'key'> {}

interface ModalEditProps {
  isOpen: boolean;
  onCancel: () => void;
  onFinish: (values: FormValues) => Promise<void>;
  loading: boolean;
  data: IssueTimeScheduleDataType;
}

const { Option } = Select;

const ModalEdit: React.FC<ModalEditProps> = ({
  isOpen,
  onCancel,
  onFinish,
  loading,
  data,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen && data) {
      form.setFieldsValue({
        ...data,
        plan_issue_dt: data.plan_issue_dt ? dayjs(data.plan_issue_dt) : null,
        A_reqd_time: data.A_reqd_time ? dayjs(data.A_reqd_time) : null,
        time_issue: data.time_issue ? dayjs(data.time_issue) : null,
        ent_dt: data.ent_dt ? dayjs(data.ent_dt) : null,
      });
    }
  }, [isOpen, data, form]);

  const handleFinish = async (values: any) => {
    try {
      const formattedValues: FormValues = {
        ...values,
        plan_issue_dt: values.plan_issue_dt?.toISOString(),
        A_reqd_time: values.A_reqd_time?.toISOString(),
        time_issue: values.time_issue?.toISOString(),
        ent_dt: values.ent_dt?.toISOString(),
        upd_dt: dayjs().toISOString(),
      };
      await onFinish(formattedValues);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={t("issue_time_schedule.modal.edit_title", "Edit Issue Time Schedule")}
      open={isOpen}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      confirmLoading={loading}
      width={800}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label={t("issue_time_schedule.form.section", "Section")}
            name="section_c"
            rules={[{ required: true, message: "Please input section!" }]}
          >
            <Input placeholder="Enter section code" />
          </Form.Item>

          <Form.Item
            label={t("issue_time_schedule.form.factory", "Factory")}
            name="fact_c"
            rules={[{ required: true, message: "Please input factory!" }]}
          >
            <Input placeholder="Enter factory code" />
          </Form.Item>

          <Form.Item
            label={t("issue_time_schedule.form.line", "Line")}
            name="line_c"
            rules={[{ required: true, message: "Please input line!" }]}
          >
            <Input placeholder="Enter line code" />
          </Form.Item>

          <Form.Item
            label={t("issue_time_schedule.form.product_no", "Product Number")}
            name="prod_no"
            rules={[{ required: true, message: "Please input product number!" }]}
          >
            <Select placeholder="Select product">
              <Option value="Common">Common</Option>
              <Option value="Premium">Premium</Option>
              <Option value="Standard">Standard</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={t("issue_time_schedule.form.customer_desc_1", "Customer Description 1")}
            name="cusdesch_cd1"
            rules={[{ required: true, message: "Please input customer description 1!" }]}
          >
            <Input placeholder="Enter customer description 1" />
          </Form.Item>

          <Form.Item
            label={t("issue_time_schedule.form.customer_desc_2", "Customer Description 2")}
            name="cusdesch_cd2"
            rules={[{ required: true, message: "Please input customer description 2!" }]}
          >
            <Input placeholder="Enter customer description 2" />
          </Form.Item>

          <Form.Item
            label={t("issue_time_schedule.form.internal_desc", "Internal Description")}
            name="intdesch_cd"
            rules={[{ required: true, message: "Please input internal description!" }]}
          >
            <Input placeholder="Enter internal description" />
          </Form.Item>

          <Form.Item
            label={t("issue_time_schedule.form.issue_order_no", "Issue Order Number")}
            name="issue_ord_no"
            rules={[{ required: true, message: "Please input issue order number!" }]}
          >
            <Input placeholder="Enter issue order number" />
          </Form.Item>

          <Form.Item
            label={t("issue_time_schedule.form.plan_issue_date", "Plan Issue Date")}
            name="plan_issue_dt"
            rules={[{ required: true, message: "Please select plan issue date!" }]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              style={{ width: "100%" }}
              placeholder="Select plan issue date"
            />
          </Form.Item>

          <Form.Item
            label={t("issue_time_schedule.form.required_time", "Required Time")}
            name="A_reqd_time"
            rules={[{ required: true, message: "Please select required time!" }]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              style={{ width: "100%" }}
              placeholder="Select required time"
            />
          </Form.Item>

          <Form.Item
            label={t("issue_time_schedule.form.issue_time", "Issue Time")}
            name="time_issue"
            rules={[{ required: true, message: "Please select issue time!" }]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              style={{ width: "100%" }}
              placeholder="Select issue time"
            />
          </Form.Item>

          <Form.Item
            label={t("issue_time_schedule.form.user_id", "User ID")}
            name="userid"
            rules={[{ required: true, message: "Please input user ID!" }]}
          >
            <Input placeholder="Enter user ID" />
          </Form.Item>

          <Form.Item
            label={t("issue_time_schedule.form.entry_date", "Entry Date")}
            name="ent_dt"
          >
            <DatePicker
              format="YYYY-MM-DD"
              style={{ width: "100%" }}
              placeholder="Select entry date"
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalEdit;
