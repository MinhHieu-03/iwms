import { Form, Input, Select, InputNumber, DatePicker } from "antd";

export type TypeRenderForm = {
  label: string;
  rules?: unknown[];
  name: string;
  placeholder?: string;
  type?: string;
  items?: unknown[];
  autoFocus?: boolean;
  hasFeedback?: boolean;
};

export const RenderForm = ({ data }: { data: TypeRenderForm }) => {
  if (data.type == "password") {
    return (
      <Form.Item
        label={data.label}
        rules={data.rules}
        name={data.name}
        hasFeedback={data.hasFeedback || false}
      >
        <Input.Password />
      </Form.Item>
    );
  }
  if (data.type === "number") {
    return (
      <Form.Item name={data.name} label={data.label} rules={data.rules}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
    );
  }
  if (data.type == "select") {
    return (
      <Form.Item label={data.label} name={data.name} rules={data.rules}>
        <Select>
          {data.items.map((item: {value: unknown, label: string}, index: number) => {
            return (
              <Select.Option key={index} value={item.value}>
                {item.label}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    );
  }
  if (data.type == "date") {
    return (
      <Form.Item label={data.label} name={data.name} rules={data.rules}>
        <DatePicker
          format="DD-MM-YYYY"
          style={{ width: "100%" }}
          placeholder={data.placeholder}
          autoFocus={data.autoFocus}
          allowClear
        />
      </Form.Item>
    );
  }
  return (
    <Form.Item
      label={data.label}
      rules={data.rules}
      name={data.name}
      hasFeedback={data.hasFeedback || false}
    >
      <Input
        autoFocus={data.autoFocus}
        placeholder={data.placeholder}
        allowClear
      />
    </Form.Item>
  );
};
