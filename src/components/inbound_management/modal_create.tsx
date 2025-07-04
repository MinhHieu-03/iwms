import { RenderForm, TypeRenderForm } from "@/lib/render-form";
import { Button, Form, Input, InputNumber, Modal, Select, Drawer } from "antd";
import apiClient from "@/lib/axios";
import { keyBy, uniq } from "lodash";

import { useTranslation } from "react-i18next";

import { useEffect, useRef, useState } from "react";

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
      open={isOpen}
      placement="bottom"
      height={"90vh"}
      onClose={() => {
        form?.resetFields();
        setIsOpen(false);
      }}
      footer={null}
      // width={600}
    >
      <Inbound
        selectedItem={null}
        setCurrent={() => {}}
        handleClose={() => {
          form?.resetFields();
          setIsOpen(false);
        }}
      />
    </Drawer>
  );
};

export default ModalAdd;

const Inbound = ({ selectedItem, setCurrent, handleClose }) => {
  const [form] = Form.useForm();
  const [masterData, setMasterData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [storageData, setStorageData] = useState<string[]>([]);
  const [storeUnits, setStoreUnits] = useState<string[]>([]);
  const [skuMaster, setSkuMaster] = useState<any>({});
  const refAction = useRef(null);
  const [value, setValue] = useState("");
  console.log("storageData__", storageData);

  const sku = Form.useWatch("sku", form);

  // Fetch master data on component mount
  const fetchMasterData = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get("/master-data");
      if (data?.metaData?.length) {
        setMasterData(keyBy(data.metaData, "material_no"));
      }
      console.log("Master data fetched:", keyBy(data.metaData, "material_no"));
    } catch (error) {
      console.error("Error fetching master data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStorageData = async () => {
    try {
      const { data } = await apiClient.get("/storage-model");
      const dataNodes = data?.metaData?.[0]?.nodes || [];
      const allData = dataNodes.map((i) => i?.data?.label) || [];
      setStorageData(uniq(allData));
      setStoreUnits(data?.metaData?.[0]?.storage_unit || []);
    } catch (error) {
      console.error("Error fetching storage data:", error);
    }
  };
  useEffect(() => {
    fetchMasterData();
    fetchStorageData();
  }, []);

  useEffect(() => {
    if (sku && masterData) {
      const item = masterData[sku];
      setSkuMaster(item);
      if (item) {
        if (item.new_pk_style == 2) {
          form.setFieldsValue({
            sku: item.material_no,
            storeMethod: "Carton",
            packingMethod: "Bag",
            name: item.material_nm,
            bin_code: item.material_no,
          });
        } else if (item.new_pk_style == 1) {
          form.setFieldsValue({
            sku: item.material_no,
            storeMethod: "Plastic Bin",
            packingMethod: "Bag",
            name: item.material_nm,
            bin_code: item.material_no,
          });
        }
        console.log("Item found in master data:", item);
      }
    }
  }, [sku, masterData]);

  useEffect(() => {
    if (selectedItem) {
      form.setFieldsValue({
        sku: selectedItem.sku,
        quantity: selectedItem.quantity?.split(" / ")?.[0] || "",
      });
    }
  }, [selectedItem, form]);

  const handleSubmit = async () => {
    try {
      const values = form.getFieldsValue();
      console.log("Form submitted:", values);
      console.log("Master data available:", masterData);
      const body = {
        product_name: values.name,
        sku: values.sku,
        store: [
          { key: values.storeMethod, qty: 1 },
          { key: values.packingMethod, qty: values.bag_quantity },
          { key: storageData[storageData.length-1], qty: values.quantity },
        ],
      };
      await apiClient.post("/inbound", body);
      form.resetFields();
      // Handle form submission here
      console.log("Form_values:", body);
    } catch (error) {
      console.error("Error during form submission:", error);
      return;
    }
  };

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
  const [current, setCurrentField] = useState("sku");

  const handleAction = (e) => {
    const value = e.target.value.trim();
    setValue(value);
    return 1;
    // ==========
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
      // handleClose();
      form.resetFields();
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

  const handleActionForm = (value) => {

    if (value === "OK") {
      form.resetFields();
      return;
    } else if (value === "Cancel") {
      setCurrent(0);
      return;
    } else if (current === "sku") {
      form.setFieldValue("sku", value);
      setCurrentField("qty");
      setValue("");
    } else if (current === "qty") {
      const count = skuMaster? value/skuMaster?.pcs_bag: 0
      form.setFieldValue("quantity", value);
      form.setFieldValue("bag_quantity", count);
      if (skuMaster?.new_pk_style === 1) {
        setCurrentField("bin");
      } else {
        setCurrentField("sku");
        // handleSubmit();
      }
      setValue("");
    } else if (current === "bin") {
      form.setFieldValue("bin_code", value);
      setCurrentField("sku");
      setValue("");
      handleSubmit();
    }

    if (value && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(`OK`);
      utterance.rate = 0.9;
      utterance.volume = 0.5;
      speechSynthesis.speak(utterance);
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
              label="Mã vật tư"
              name="sku"
              rules={[{ required: true, message: "Please input SKU!" }]}
            >
              <Input placeholder="Enter SKU" />
            </Form.Item>
            <Form.Item
              label="Tên vật tư"
              name="name"
              rules={[{ required: true, message: "Please input SKU!" }]}
            >
              <Input placeholder="Enter Name" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Phương pháp lưu trữ"
              name="storeMethod"
              rules={[
                { required: true, message: "Please select store method!" },
              ]}
            >
              <Select placeholder="Select store method" loading={loading}>
                {storeUnits?.map((method) => (
                  <Select.Option key={method} value={method}>
                    {method}
                  </Select.Option>
                )) || (
                  <>
                    <Select.Option value="bin">Bin</Select.Option>
                    <Select.Option value="carton">Carton</Select.Option>
                  </>
                )}
              </Select>
            </Form.Item>

            <Form.Item
              label="Phương pháp đóng gói"
              name="packingMethod"
              rules={[
                { required: true, message: "Please select packing method!" },
              ]}
            >
              <Select placeholder="Select packing method" loading={loading}>
                {storageData?.map((method) => (
                  <Select.Option key={method} value={method}>
                    {method}
                  </Select.Option>
                )) || (
                  <>
                    <Select.Option value="bin">Bin</Select.Option>
                    <Select.Option value="carton">Carton</Select.Option>
                    <Select.Option value="kit">Kit</Select.Option>
                  </>
                )}
              </Select>
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Mã thùng" name="bin_code">
              <Input placeholder="Enter Bin code" className="w-full" />
            </Form.Item>
            <Form.Item
              label={`Số lượng túi ${skuMaster?.pcs_bag ? `(mặc định ${skuMaster?.pcs_bag}/Túi)`: ''}`}
              name="bag_quantity"
              rules={[
                { required: true, message: "Please input quantity!" },
                {
                  type: "number",
                  min: 1,
                  message: "Quantity must be greater than 0!",
                },
              ]}
            >
              <InputNumber placeholder="Số lượng túi" className="w-full" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Form.Item
              label="Số lượng"
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
        </Form>
      </div>
      <div className="space-y-4 mt-5 bg-gray-50 p-4 rounded-lg">
        <div className=" p-4 bg-white rounded-lg shadow-sm">
          <div className="text-center">
            <p className="text-lg text-gray-600 font-semibold mb-2">
              {skuMaster?.new_pk_style === 2 ? `Để nguyên thùng carton ` : ''}
              {skuMaster?.new_pk_style === 1 ? `Bỏ vào thùng nhựa ` : ''}
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
                  // handleAction(value)
                  handleActionForm(value);
                  // if (!isNaN(+value)) {
                  //   form.setFieldValue("quantity", value);
                  //   setValue("");
                  //   // Voice feedback for SKU entry
                  //   if (value && "speechSynthesis" in window) {
                  //     const utterance = new SpeechSynthesisUtterance(`OK`);
                  //     utterance.rate = 0.9;
                  //     utterance.volume = 0.5;
                  //     speechSynthesis.speak(utterance);
                  //   }
                  // }
                }
              }}
            />
            <div className="flex justify-center mt-4 gap-3">
              <Button
                onClick={() => {
                  form.resetFields();
                  handleClose();
                }}
                type="default"
              >
                Cancel
              </Button>
              <Button onClick={() => handleSubmit()} type="primary">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
