import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { Dayjs } from "dayjs";

const ModalOI: React.FC<any> = ({ isOpen, selectedItem = {}, setIsOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const handleOkButton = () => {
    currentPage === 0 ? setCurrentPage(1) : setIsOpen(false);
  };

  const handleCancelButton = () => {
    currentPage === 1 ? setCurrentPage(0) : setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setCurrentPage(0);
  };

  return (
    <Modal
      width={1000}
      title="Title"
      open={isOpen}
      onOk={handleOkButton}
      okText="Next"
      confirmLoading={confirmLoading}
      cancelButtonProps={{
        onClick: handleCancelButton,
      }}
      onCancel={handleCancel}
    >
      {currentPage === 0 && (
        <SplitOrder
          selectedItem={selectedItem}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === 1 && (
        <Inbound selectedItem={selectedItem} setCurrentPage={setCurrentPage} />
      )}
    </Modal>
  );
};

const SplitOrder: React.FC<any> = ({ selectedItem, setCurrentPage }) => {
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
  }, [selectedItem, setCurrentPage]);

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
      setCurrentPage(1);
      return;
    } else if (value === "cancel") {
      setCurrentPage(0); // Reset to Outbound step
    }
  };

  return (
    <div>
      <p className="text-lg text-gray-600 font-semibold mb-2 text-center">
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

      <div className="my-4">
        <p className="text-lg text-gray-600 text-center">Quantity to Pick</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl font-bold text-blue-600">{current}</span>
          <span className="text-xl text-gray-400">from</span>
          <span className="text-3xl font-bold text-gray-600">{total}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 my-4 mb-8">
        <div className="bg-blue-50 p-3 rounded-md border border-blue-100 text-center">
          <p className="text-sm text-blue-600 font-medium">Order</p>
          <p className="text-2xl font-bold text-blue-700 tracking-wider">
            {selectedItem?.order || "Item order"}
          </p>
        </div>
        <div className="bg-blue-50 p-3 rounded-md border border-blue-100 text-center">
          <p className="text-sm text-blue-600 font-medium">SKU</p>
          <p className="text-2xl font-bold text-blue-700 tracking-wider">
            {selectedItem?.sku || "Item sku"}
          </p>
        </div>
        <div className="text-center">
          <p className="text-md text-gray-500">Conveyor Time</p>
          <p className="font-medium">{"Conveyor Time"}</p>
        </div>
        <div className="text-center">
          <p className="text-md text-gray-500">Order Time</p>
          <p className="font-medium">{"Order Time"}</p>
        </div>
      </div>
    </div>
  );
};

const Inbound = ({ selectedItem, setCurrentPage }) => {
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
      return;
    } else if (value === "Cancel") {
      setCurrentPage(0);
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
      <div className="space-y-4 mt-4 bg-gray-50 p-4 rounded-lg">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalOI;
