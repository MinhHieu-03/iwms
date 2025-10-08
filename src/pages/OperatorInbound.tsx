import {
  Modal,
  Input,
  Button,
  Steps,
  StepProps,
  Form,
  Select,
  InputNumber,
} from "antd";
import Dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

const Inbound = ({ selectedItem, setCurrent, handleClose }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedItem) {
      form.setFieldsValue({
        sku: selectedItem.sku,
        quantity: selectedItem.quantity?.split(" / ")?.[0] || "",
      });
    }
  }, [selectedItem, form]);

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    // Handle form submission here
  };

  const refAction = useRef(null);
  const [value, setValue] = useState("");
  useEffect(() => {
    const currentRef = refAction.current;
    if (currentRef) {
      currentRef.focus();
    }

    return () => {
      // Cleanup to prevent focusing on unmounted components
      if (currentRef && document.activeElement === currentRef) {
        (document.activeElement as HTMLElement).blur();
      }
    };
  }, [selectedItem]);

  const handleAction = (e) => {
    const value = e.target.value.trim();
    setValue(value);
    if (
      value === "" ||
      (/^\d{0,4}-?\d{0,4}$/.test(value) && value.length === 9)
    ) {
      form.setFieldValue("sku", value);

      // Voice feedback for SKU entry
      if (value && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(`OK`);
        utterance.rate = 0.9;
        utterance.volume = 0.5;
        speechSynthesis.speak(utterance);
      }

      setValue("");
    } else if (value === "OK") {
      // Voice feedback for SKU entry
      if (value && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(`Next`);
        utterance.rate = 0.9;
        utterance.volume = 0.5;
        speechSynthesis.speak(utterance);
      }
      handleClose();
      return;
    } else if (value === "Cancel") {
      setCurrent(0);
      if (value && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(`Cancel`);
        utterance.rate = 0.9;
        utterance.volume = 0.5;
        speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div>
      <div className="space-y-4 mt-5 bg-gray-50 p-4 rounded-lg">
        {" "}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="SKU"
              name="sku"
              rules={[{ required: true, message: "Please input SKU!" }]}
            >
              <Input placeholder="Enter SKU" />
            </Form.Item>

            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                { required: true, message: "Please input quantity!" },
                {
                  type: "number",
                  min: 1,
                  message: "Quantity must be greater than 0!",
                },
              ]}
            >
              <InputNumber placeholder="Enter quantity" className="w-full" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Store Method"
              name="storeMethod"
              rules={[
                { required: true, message: "Please select store method!" },
              ]}
            >
              <Select placeholder="Select store method">
                <Select.Option value="bin">Bin</Select.Option>
                <Select.Option value="carton">Carton</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Packing Method"
              name="packingMethod"
              rules={[
                { required: true, message: "Please select packing method!" },
              ]}
            >
              <Select placeholder="Select packing method">
                <Select.Option value="bin">Bin</Select.Option>
                <Select.Option value="carton">Carton</Select.Option>
                <Select.Option value="kit">Kit</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className="space-y-4 mt-5 bg-gray-50 p-4 rounded-lg">
        <div className=" p-4 bg-white rounded-lg shadow-sm">
          <div className="text-center">
            <p className="text-lg text-gray-600 font-semibold mb-2">
              Next Action
            </p>
            <Input
              ref={refAction}
              placeholder="Enter picking quantity or next action"
              autoFocus
              className="text-center"
              value={value}
              onChange={handleAction}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!isNaN(+value)) {
                    form.setFieldValue("quantity", value);
                    setValue("");
                    // Voice feedback for SKU entry
                    if (value && "speechSynthesis" in window) {
                      const utterance = new SpeechSynthesisUtterance(`OK`);
                      utterance.rate = 0.9;
                      utterance.volume = 0.5;
                      speechSynthesis.speak(utterance);
                    }
                  }
                }
              }}
            />
            <div className="flex justify-center mt-4 gap-3">
              <Button onClick={() => setCurrent(0)} type="default">
                Cancel
              </Button>
              <Button onClick={() => handleClose()} type="primary">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Inbound;
