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
  
  const [form] = Form.useForm();
  const [masterData, setMasterData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [storageData, setStorageData] = useState<string[]>([]);
  const [storeUnits, setStoreUnits] = useState<string[]>([]);
  const [skuMaster, setSkuMaster] = useState<any>({});
  const refAction = useRef(null);
  const [value, setValue] = useState("");
  const [current, setCurrentField] = useState("sku");
  const sku = Form.useWatch("sku", form);

  const handleClose = () => {
    setIsOpen(false);
    form.resetFields();
    setValue("");
    setSkuMaster({});
  }

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
      } else {
        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(`Vật tư Không hợp lệ`);
          utterance.rate = 0.9;
          utterance.volume = 0.5;
          speechSynthesis.speak(utterance);
        }
        form.setFields([
          {
            name: 'sku',
            errors: ['Mã vật tư không tồn tại trong dữ liệu'],
          },
        ]);
      }
    }
  }, [sku, masterData]);

  // useEffect(() => {
  //   if (selectedItem) {
  //     form.setFieldsValue({
  //       sku: selectedItem.sku,
  //       quantity: selectedItem.quantity?.split(" / ")?.[0] || "",
  //     });
  //   }
  // }, [selectedItem, form]);

  const handleSubmit = async () => {
    try {
      // Validate the form before submitting
      await form.validateFields();
      
      const values = form.getFieldsValue();
      console.log("Form submitted:", values);
      console.log("Master data available:", masterData);
      
      // Additional validation for numeric fields
      if (isNaN(Number(values.quantity)) || Number(values.quantity) <= 0) {
        form.setFields([
          {
            name: 'quantity',
            errors: ['Số lượng phải là số hợp lệ lớn hơn 0'],
          },
        ]);
        return;
      }
      
      if (isNaN(Number(values.bag_quantity)) || Number(values.bag_quantity) <= 0) {
        form.setFields([
          {
            name: 'bag_quantity',
            errors: ['Số lượng túi phải là số hợp lệ lớn hơn 0'],
          },
        ]);
        return;
      }
      
      const body = {
        product_name: values.name,
        sku: values.sku,
        store: [
          { key: values.storeMethod, qty: 1 },
          { key: values.packingMethod, qty: Number(values.bag_quantity) },
          { key: storageData[storageData.length-1], qty: Number(values.quantity) },
        ],
      };
      await apiClient.post("/inbound", body);
      form.resetFields();
      // Handle form submission here
      console.log("Form_values:", body);
    } catch (error) {
      console.error("Error during form submission:", error);
      
      // If it's a validation error, don't proceed
      if (error.errorFields) {
        console.log("Validation errors:", error.errorFields);
      }
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
  }, []);

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
      // setCurrent(0);
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
      // setCurrent(0);
      return;
    } else if (current === "sku") {
      form.setFieldValue("sku", value);
      setCurrentField("qty");
      setValue("");
    } else if (current === "qty") {
      // Validate if value is a number
      if (isNaN(Number(value)) || Number(value) <= 0) {
        // Voice feedback for invalid input
        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(`Không hợp lệ`);
          utterance.rate = 0.9;
          utterance.volume = 0.5;
          speechSynthesis.speak(utterance);
        }
        setValue("");
        return;
      }
      
      const count = skuMaster? Number(value)/skuMaster?.pcs_bag: 0
      form.setFieldValue("quantity", Number(value));
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
    <Drawer
      title={title}
      open={isOpen}
      placement="bottom"
      height={"95vh"}
      onClose={() => {
        form.resetFields();
        setIsOpen(false);
        setValue("");
        setCurrentField("sku");
      }}
      footer={null}
      // width={600}
    >
      
    <div>
      <div className="space-y-4 mt-5 bg-gray-50 p-4 rounded-lg">
        {" "}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="bg-white py-0 px-8 rounded-lg shadow-sm text-2xl font-bold"
        >
          <div className="grid grid-cols-2 gap-8">
            <Form.Item
              label={<span className="text-2xl font-bold">Mã vật tư</span>}
              name="sku"
              rules={[{ required: true, message: "Vui lòng nhập mã vật tư!" }]}
            >
              <Input placeholder="Nhập mã vật tư" className="text-2xl font-bold h-16" style={{ fontSize: '24px' }} />
            </Form.Item>
            <Form.Item
              label={<span className="text-2xl font-bold">Tên vật tư</span>}
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên vật tư!" }]}
            >
              <Input placeholder="Nhập tên vật tư" className="text-2xl font-bold h-16" style={{ fontSize: '24px' }} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <Form.Item
              label={<span className="text-2xl font-bold">Phương pháp lưu trữ</span>}
              name="storeMethod"
              rules={[
                { required: true, message: "Vui lòng chọn phương pháp lưu trữ!" },
              ]}
            >
              <Select placeholder="Chọn phương pháp lưu trữ" loading={loading} className="text-2xl font-bold h-16" size="large" style={{ fontSize: '24px' }}>
                {storeUnits?.map((method) => (
                  <Select.Option key={method} value={method} className="text-2xl font-bold" style={{ fontSize: '24px' }}>
                    {method}
                  </Select.Option>
                )) || (
                  <>
                    <Select.Option value="bin" className="text-2xl font-bold" style={{ fontSize: '24px' }}>Bin</Select.Option>
                    <Select.Option value="carton" className="text-2xl font-bold" style={{ fontSize: '24px' }}>Carton</Select.Option>
                  </>
                )}
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="text-2xl font-bold">Phương pháp đóng gói</span>}
              name="packingMethod"
              rules={[
                { required: true, message: "Vui lòng chọn phương pháp đóng gói!" },
              ]}
            >
              <Select placeholder="Chọn phương pháp đóng gói" loading={loading} className="text-2xl font-bold h-16" size="large" style={{ fontSize: '24px' }}>
                {storageData?.map((method) => (
                  <Select.Option key={method} value={method} className="text-2xl font-bold" style={{ fontSize: '24px' }}>
                    {method}
                  </Select.Option>
                )) || (
                  <>
                    <Select.Option value="bin" className="text-2xl font-bold" style={{ fontSize: '24px' }}>Bin</Select.Option>
                    <Select.Option value="carton" className="text-2xl font-bold" style={{ fontSize: '24px' }}>Carton</Select.Option>
                    <Select.Option value="kit" className="text-2xl font-bold" style={{ fontSize: '24px' }}>Kit</Select.Option>
                  </>
                )}
              </Select>
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <Form.Item label={<span className="text-2xl font-bold">Mã thùng</span>} name="bin_code">
              <Input placeholder="Nhập mã thùng" className="w-full text-2xl font-bold h-16" style={{ fontSize: '24px' }} />
            </Form.Item>
            <Form.Item
              label={<span className="text-2xl font-bold">{`Số lượng túi ${skuMaster?.pcs_bag ? `(mặc định ${skuMaster?.pcs_bag}/Túi)`: ''}`}</span>}
              name="bag_quantity"
              rules={[
                { required: true, message: "Vui lòng nhập số lượng túi!" },
                {
                  type: "number",
                  min: 1,
                  message: "Số lượng phải lớn hơn 0!",
                },
                {
                  validator: (_, value) => {
                    if (value && isNaN(Number(value))) {
                      return Promise.reject(new Error('Số lượng túi phải là số hợp lệ!'));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <InputNumber 
                placeholder="Số lượng túi" 
                className="w-full text-2xl font-bold h-16" 
                size="large" 
                style={{ fontSize: '24px' }}
                parser={(value) => value ? value.replace(/\D/g, '') : ''}
                formatter={(value) => value ? `${value}` : ''}
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 gap-8">
            <Form.Item
              label={<span className="text-2xl font-bold">Số lượng</span>}
              name="quantity"
              rules={[
                { required: true, message: "Vui lòng nhập số lượng!" },
                {
                  type: "number",
                  min: 1,
                  message: "Số lượng phải lớn hơn 0!",
                },
                {
                  validator: (_, value) => {
                    if (value && isNaN(Number(value))) {
                      return Promise.reject(new Error('Số lượng phải là số hợp lệ!'));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <InputNumber 
                placeholder="Nhập số lượng" 
                className="w-full text-2xl font-bold h-16" 
                size="large" 
                style={{ fontSize: '24px' }}
                parser={(value) => value ? value.replace(/\D/g, '') : ''}
                formatter={(value) => value ? `${value}` : ''}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className="space-y-4 mt-5 bg-gray-50 p-4 rounded-lg">
        <div className=" p-6 bg-white rounded-lg shadow-sm">
          <div className="text-center">
            <p className="text-4xl text-gray-600 font-bold mb-6">
              {/* {skuMaster?.new_pk_style === 2 ? `Để nguyên thùng carton ` : ''}
              {skuMaster?.new_pk_style === 1 ? `Bỏ vào thùng nhựa ` : ''} */}
              {mapMessage[current]}
            </p>
            <Input
              ref={refAction}
              placeholder={mapMessage[current]}
              autoFocus
              className="text-center text-3xl font-bold h-20"
              size="large"
              style={{ fontSize: '32px' }}
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
            <div className="flex justify-center mt-8 gap-6">
              <Button
                onClick={() => {
                  form.resetFields();
                  handleClose();
                }}
                type="default"
                className="h-16 px-12 text-2xl font-bold"
                size="large"
                style={{ fontSize: '24px' }}
              >
                Hủy
              </Button>
              <Button onClick={() => handleSubmit()} type="primary" className="h-16 px-12 text-2xl font-bold" size="large" style={{ fontSize: '24px' }}>
                Tiếp theo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Drawer>
  );
};

export default ModalAdd;

const mapMessage = {
  sku: "Nhập mã vật tư",
  qty: "Nhập số lượng",
  bin: "Nhập mã thùng",
}

// const Inbound = ({ selectedItem, setCurrent, handleClose }) => {

//   return (
//   );
// };
