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
import { PickingItem } from "./outbound/PickingDrawer";

interface PickingItemModalProps {
  selectedItem: PickingItem | null;
  onClose: () => void;
  actionValue: string;
  setActionValue: (value: string) => void;
}

const PickingItemModal: React.FC<PickingItemModalProps> = ({
  selectedItem,
  onClose,
}) => {
  console.log("PickingItemModal --------", selectedItem);
  const [current, setCurrent] = useState(0);
  const handleClose = () => {
    setCurrent(0);
    onClose();
  };

  const items: StepProps[] = [
    {
      title: "Outbound",
      description: "Outbound information",
    },
    {
      title: "Inbound",
      description: "Back to the warehouse",
    },
  ];

  return (
    <Modal
      title={current === 1 ? "Inbound" : "Outbound"}
      open={!!selectedItem}
      onCancel={handleClose}
      footer={null}
      zIndex={1000}
      width={"60vw"}
    >
      <Steps
        current={current}
        items={items}
        type="navigation"
        size="small"
        className="mb-3"
      />

      {current === 0 ? (
        <SplitOrder
          selectedItem={selectedItem}
          setCurrent={setCurrent}
          handleClose={handleClose}
        />
      ) : null}
      {current === 1 ? (
        <Inbound
          selectedItem={selectedItem}
          setCurrent={setCurrent}
          handleClose={handleClose}
        />
      ) : null}
    </Modal>
  );
};

export default PickingItemModal;

const SplitOrder = ({ selectedItem, setCurrent, handleClose }) => {
  console.log("SplitOrder --------", selectedItem);
  const refAction = useRef(null);
  const [value, setValue] = useState("");
  const [current, total] = selectedItem?.quantity
    ?.split(" / ")
    .map((num) => parseInt(num, 10)) || [0, 0];
  if (refAction?.current) {
    console.log("refAction.current");
    refAction.current.focus();
    setTimeout(() => {
      refAction.current.focus();
    }, 500);
  }
  useEffect(() => {
    const currentRef = refAction.current;
    console.log("currentRef", currentRef);
    if (currentRef) {
      console.log("dnd1");
      currentRef.focus();
      setTimeout(() => {
        currentRef.focus();
      }, 500);
    }

    return () => {
      // Cleanup to prevent focusing on unmounted components
      if (currentRef && document.activeElement === currentRef) {
        (document.activeElement as HTMLElement).blur();
      }
    };
  }, [selectedItem, setCurrent]);
  useEffect(() => {
    const currentRef = refAction.current;
    if (selectedItem && currentRef) {
      currentRef.focus();
      setTimeout(() => {
        currentRef.focus();
      }, 500);
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
    if (value === "OK") {
      setCurrent(1);
      return;
    } else if (value === "cancel") {
      setCurrent(0); // Reset to Outbound step
      handleClose();
    }
  };
  return (
    <div className="space-y-4 mt-5 bg-gray-50 p-4 rounded-lg">
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-2">Quantity to Pick</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-bold text-blue-600">{current}</span>
            <span className="text-xl text-gray-400">from</span>
            <span className="text-3xl font-bold text-gray-600">{total}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 grid grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
            <p className="text-sm text-blue-600 font-medium">Order</p>
            <p className="text-2xl font-bold text-blue-700 tracking-wider">
              {selectedItem?.order}
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
            <p className="text-sm text-blue-600 font-medium">SKU</p>
            <p className="text-2xl font-bold text-blue-700 tracking-wider">
              {selectedItem?.sku}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">Conveyor Time</p>
          <p className="font-medium">
            {Dayjs(selectedItem?.conveyor).format("HH:mm:ss")}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Order Time</p>
          <p className="font-medium">
            {Dayjs(selectedItem?.ordered).format("HH:mm:ss")}
          </p>
        </div>
      </div>
      <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
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
          />
          <div className="flex justify-center mt-4 gap-3">
            <Button onClick={() => handleClose()} type="default">
              Cancel
            </Button>
            <Button onClick={() => setCurrent(1)} type="primary">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
    if (value === "OK") {
      handleClose();
      return;
    } else if (value === "Cancel") {
      setCurrent(0);
    } else if (
      value === "" ||
      (/^\d{0,4}-?\d{0,4}$/.test(value) && value.length === 9)
    ) {
      form.setFieldValue("binCode", value);
      setValue("");
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
          <div className="grid grid-cols-1">
            <Form.Item
              label="Bin code"
              name="binCode"
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
