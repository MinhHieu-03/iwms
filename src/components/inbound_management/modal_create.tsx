import { RenderForm, TypeRenderForm } from "@/lib/render-form";
import {
  Button,
  Form,
  Input,
  InputNumber,
  ConfigProvider,
  Select,
  Drawer,
  Typography,
  notification,
} from "antd";
import apiClient from "@/lib/axios";
import { keyBy, uniq } from "lodash";

import { useTranslation } from "react-i18next";

import { useEffect, useRef, useState } from "react";

const text2void = (text, isVN = true) => {
  if ("speechSynthesis" in window) {
    const lang = isVN ? "vi-VN" : "en-US";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.volume = 0.5;

    // Lấy danh sách giọng
    const voices = window.speechSynthesis.getVoices();

    // Ưu tiên chọn giọng nam tiếng Việt nếu có
    const vietnameseMaleVoice = voices.find(
      (voice) => voice.lang === lang && /nam|male/i.test(voice.name)
    );

    // Nếu không có giọng nam, chọn bất kỳ giọng tiếng Việt nào
    const vietnameseVoice =
      vietnameseMaleVoice || voices.find((voice) => voice.lang === lang);

    if (vietnameseVoice) {
      utterance.voice = vietnameseVoice;
      console.log("Dùng giọng:", vietnameseVoice.name);
    } else {
      console.warn("Không tìm thấy giọng tiếng Việt.");
    }

    speechSynthesis.speak(utterance);
  }
};

// Function to get color based on action type
const getActionColor = (flg1: number) => {
  switch (flg1) {
    case 1:
      return "bg-blue-200 border-blue-400 text-blue-800"; // Bỏ nguyên thùng - Blue
    case 2:
      return "bg-orange-200 border-orange-400 text-orange-800"; // Mở thùng carton cho vào thùng nhựa - Orange
    case 3:
      return "bg-green-200 border-green-400 text-green-800"; // Cho thùng carton vào thùng nhựa - Green
    default:
      return "bg-gray-200 border-gray-400 text-gray-800"; // Default - Gray
  }
};

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
  const [listItem, setListItem] = useState([]);

  const sku = Form.useWatch("sku", form);

  const reset = () => {
    setCurrentField("sku");
    form.resetFields();
    setValue("");
    setSkuMaster({});
    setListItem([]);
  };

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  // Fetch master data on component mount
  const fetchMasterData = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get("/master-data");
      if (data?.metaData?.length) {
        setMasterData(keyBy(fakeData, "material_no"));
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
  const handleSkuChange = (sku, masterData) => {
    setListItem([]);
    form.setFieldsValue({
      quantity: undefined,
      bag_quantity: undefined,
      bin_code: "",
    });
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
      form.setFieldsValue({
        sku: "",
      });
      if ("speechSynthesis" in window) {
        text2void(`Không hợp lệ`);
      }
      // form.setFields([
      //   {
      //     name: 'sku',
      //     errors: ['Mã vật tư không tồn tại trong dữ liệu'],
      //   },
      // ]);
    }
  };
  const handleSubmit = async () => {
    try {
      // Validate the form before submitting
      await form.validateFields();

      const values = form.getFieldsValue();
      console.log("Form submitted:", values);
      console.log("Master data available:", masterData);

      // Additional validation for numeric fields
      // if (isNaN(Number(values.quantity)) || Number(values.quantity) <= 0) {
      //   form.setFields([
      //     {
      //       name: 'quantity',
      //       errors: ['Số lượng phải là số hợp lệ lớn hơn 0'],
      //     },
      //   ]);
      //   return;
      // }
      const body = {
        product_name: values.name,
        sku: values.sku,
        store: [
          { key: values.storeMethod, qty: 1 },
          { key: values.packingMethod, qty: Number(values.bag_quantity) },
          {
            key: storageData[storageData.length - 1],
            qty: Number(values.quantity),
          },
        ],
      };
      // await apiClient.post('/inbound', body);
      reset();
    } catch (error) {
      console.error("Error during form submission:", error);

      // If it's a validation error, don't proceed
      if (error.errorFields) {
        console.log("Validation errors:", error.errorFields);
      }
      return;
    }
  };

  const handleAction = (e) => {
    const value = e.target.value.trim();
    setValue(value);
  };

  const handleActionEnter = (value) => {
    if (value === "OK") {
      handleSubmit();
      return;
    } else if (value === "Cancel") {
      // setCurrent(0);
      handleClose();
      return;
    } else if (
      !isNaN(value) &&
      form.getFieldValue("sku") &&
      value.length != 6
    ) {
      // is number
      console.log("ddd", listItem.length, skuMaster?.pk_style2);
      if (listItem.length === skuMaster?.pk_style2 - 1) {
        setCurrentField("bin");
      }

      if (listItem.length >= skuMaster?.pk_style2) {
        text2void(`Quá số lượng cho phép`);
        setValue("");
        return;
      }
      const oldValue = form.getFieldValue("quantity") || 0;
      form.setFieldValue("quantity", +oldValue + Number(value));
      setListItem((prev) => [
        ...prev,
        {
          sku: sku,
          quantity: Number(value),
        },
      ]);
      setValue("");
    } else if (value.startsWith("BIN")) {
      // is Bin ocode
      form.setFieldValue("bin_code", value);
      setCurrentField("bt");
      setValue("");
    } else {
      const oldSKU = form.getFieldValue("sku");
      if (!oldSKU) {
        form.setFieldValue("sku", value);
        setCurrentField("qty");
      } else if (oldSKU !== value) {
        text2void(`Không hợp lệ `);
        notification.error({
          message: "không hợp lệ",
          description: "Vui lòng kiểm tra lại",
        });
        return;
      }
      setValue("");
    }

    if (value && "speechSynthesis" in window) {
      text2void(`OK`, false);
    }
  };
  useEffect(() => {
    if (sku && masterData) {
      handleSkuChange(sku, masterData);
    }
  }, [sku, masterData]);
const keepFocus = () => {
    setTimeout(() => {
      refAction.current?.focus();
    }, 0);
  };
  const handleBlur = () => {
    keepFocus();
  };

  useEffect(() => {
    if (isOpen) {
      fetchMasterData();
      fetchStorageData();
      keepFocus();

      // let intervalId = setInterval(() => {
      //   console.log("ddđ");
      //   if (currentRef && document.activeElement !== currentRef) {
      //     currentRef.focus();
      //   }
      // }, 1 * 1000);

      return () => {
        // clearInterval(intervalId);
        if (refAction?.current && document.activeElement === refAction?.current) {
          (document.activeElement as HTMLElement).blur();
        }
      };
    }
  }, [isOpen]);

  return (
    <Drawer
      title={title}
      open={isOpen}
      placement="bottom"
      height={"95vh"}
      onClose={() => {
        handleClose();
      }}
      footer={null}
      // width={600}
    >
      <ConfigProvider
        theme={{
          token: {
            fontSize: 22, // Default is 14
          },
        }}
      >
        <div>
          <div className="flex items-stretch mb-4 gap-4">
            <div className="flex-1 space-y-4  bg-gray-50 p-4 rounded-lg">
              <div className="space-y-4  bg-gray-50 p-4 rounded-lg">
                <div className="text-center">
                  <p className="text-4xl text-gray-600 font-bold mb-6">
                    {mapMessage[current]}
                  </p>
                  <Input
                    ref={refAction}
                    placeholder={"Trỏ chuột vào đây để quét dữ liệu"}
                    autoFocus
                    onBlur={handleBlur}
                    className="text-center text-3xl font-bold h-15"
                    size="large"
                    style={{ fontSize: "20px" }}
                    value={value}
                    onChange={handleAction}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleActionEnter(value);
                      }
                    }}
                  />
                </div>
              </div>{" "}
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                disabled={true}
                className="bg-white py-0 px-8 rounded-lg shadow-sm text-2xl font-bold"
              >
                <div className="grid grid-cols-1 gap-8">
                  <Form.Item
                    label={
                      <span className="text-2xl font-bold">Mã vật tư</span>
                    }
                    name="sku"
                    // rules={[
                    //   { required: true, message: 'Vui lòng nhập mã vật tư!' },
                    // ]}
                  >
                    <Input
                      // placeholder='Nhập mã vật tư'
                      className="text-2xl font-bold h-16"
                    />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  <Form.Item
                    label={
                      <span className="text-2xl font-bold">
                        Số lượng vật tư
                      </span>
                    }
                    name="quantity"
                    // rules={[
                    //   { required: true, message: 'Vui lòng nhập số lượng!' },
                    //   {
                    //     type: 'number',
                    //     min: 1,
                    //     message: 'Số lượng phải lớn hơn 0!',
                    //   },
                    //   {
                    //     validator: (_, value) => {
                    //       if (value && isNaN(Number(value))) {
                    //         return Promise.reject(
                    //           new Error('Số lượng phải là số hợp lệ!')
                    //         );
                    //       }
                    //       return Promise.resolve();
                    //     },
                    //   },
                    // ]}
                  >
                    <InputNumber
                      // placeholder='Nhập số lượng'
                      className="w-full text-2xl font-bold"
                      size="large"
                      style={{ height: "64px", lineHeight: "64px" }}
                      parser={(value) =>
                        value ? value.replace(/\D/g, "") : ""
                      }
                      formatter={(value) => (value ? `${value}` : "")}
                    />
                  </Form.Item>
                </div>

                {/* <div className='grid grid-cols-2 gap-8'>
                  <Form.Item
                    label={
                      <span className='text-2xl font-bold'>
                        Phương pháp lưu trữ
                      </span>
                    }
                    name='storeMethod'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn phương pháp lưu trữ!',
                      },
                    ]}
                  >
                    <Select
                      placeholder='Chọn phương pháp lưu trữ'
                      loading={loading}
                      className='text-2xl font-bold h-16'
                      size='large'
                      style={{ height: '64px' }}
                    >
                      {storeUnits?.map((method) => (
                        <Select.Option
                          key={method}
                          value={method}
                          className='text-2xl font-bold'
                        >
                          {method}
                        </Select.Option>
                      )) || (
                        <>
                          <Select.Option
                            value='bin'
                            className='text-2xl font-bold'
                          >
                            Bin
                          </Select.Option>
                          <Select.Option
                            value='carton'
                            className='text-2xl font-bold'
                          >
                            Carton
                          </Select.Option>
                        </>
                      )}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className='text-2xl font-bold'>
                        Phương pháp đóng gói
                      </span>
                    }
                    name='packingMethod'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn phương pháp đóng gói!',
                      },
                    ]}
                  >
                    <Select
                      placeholder='Chọn phương pháp đóng gói'
                      loading={loading}
                      className='text-2xl font-bold h-16'
                      size='large'
                      style={{ height: '64px' }}
                    >
                      {storageData?.map((method) => (
                        <Select.Option
                          key={method}
                          value={method}
                          className='text-2xl font-bold'
                        >
                          {method}
                        </Select.Option>
                      )) || (
                        <>
                          <Select.Option
                            value='bin'
                            className='text-2xl font-bold'
                          >
                            Bin
                          </Select.Option>
                          <Select.Option
                            value='carton'
                            className='text-2xl font-bold'
                          >
                            Carton
                          </Select.Option>
                          <Select.Option
                            value='kit'
                            className='text-2xl font-bold'
                          >
                            Kit
                          </Select.Option>
                        </>
                      )}
                    </Select>
                  </Form.Item>
                </div> */}
                <div className="grid grid-cols-1 gap-8">
                  <Form.Item
                    label={<span className="text-2xl font-bold">Mã thùng</span>}
                    name="bin_code"
                  >
                    <Input
                      // placeholder='Nhập mã thùng'
                      className="w-full text-2xl font-bold h-16"
                    />
                  </Form.Item>
                </div>

                {/* <div className='grid grid-cols-1 gap-8'>
                  <Form.Item
                    label={
                      <span className='text-2xl font-bold'>{`Số lượng túi ${
                        skuMaster?.pk_style1
                          ? `(mặc định ${skuMaster?.pk_style1}/Túi)`
                          : ''
                      }`}</span>
                    }
                    name='bag_quantity'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập số lượng túi!',
                      },
                      {
                        type: 'number',
                        min: 1,
                        message: 'Số lượng phải lớn hơn 0!',
                      },
                      {
                        validator: (_, value) => {
                          if (value && isNaN(Number(value))) {
                            return Promise.reject(
                              new Error('Số lượng túi phải là số hợp lệ!')
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <InputNumber
                      // placeholder='Số lượng túi'
                      className='w-full text-2xl font-bold h-16'
                      size='large'
                      style={{ height: '64px', lineHeight: '64px' }}
                      parser={(value) =>
                        value ? value.replace(/\D/g, '') : ''
                      }
                      formatter={(value) => (value ? `${value}` : '')}
                    />
                  </Form.Item>
                </div> */}
              </Form>
            </div>
            <div className="flex-1 space-y-4  bg-gray-50 p-4 rounded-lg">
              {skuMaster ? (
                <div>
                  <Typography.Title level={5} className="text-center mb-0">
                    Kiểu vật tư
                  </Typography.Title>
                  <div
                    className={`p-6 rounded-lg border-2 shadow-lg ${getActionColor(
                      skuMaster?.flg1
                    )}`}
                  >
                    <Typography.Title level={3} className="text-center mb-0">
                      {mapAction[skuMaster?.flg1]}
                    </Typography.Title>
                  </div>
                </div>
              ) : null}
              {sku && !skuMaster ? (
                <div className={`p-6 rounded-lg border-2 shadow-lg bg-red-400`}>
                  <Typography.Title level={3} className="text-center mb-0">
                    Vật tư không hợp lệ
                  </Typography.Title>
                </div>
              ) : null}
              <div className="bg-white p-4 rounded-lg shadow-sm ">
                <Typography.Title level={4} className="text-center mb-4">
                  Danh sách đã quét
                </Typography.Title>
                <div className="max-h-[30vh] overflow-y-auto">
                  {
                    listItem.length > 0 ? (
                      <div className="space-y-2">
                        {listItem.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border"
                          >
                            <div className="flex flex-col">
                              <span className="text-lg font-bold text-gray-800">
                                {item.sku}
                              </span>
                              <span className="text-sm text-gray-600">
                                Số lượng: {item.quantity}
                              </span>
                            </div>
                            <div className="text-lg font-bold text-blue-600">
                              #{index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null
                    // <div className='text-center text-gray-500 py-8'>
                    //   <p className='text-lg'>Chưa có vật tư nào được quét</p>
                    // </div>
                  }
                </div>
                {listItem.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-center">
                      <span className="text-lg font-bold text-blue-800">
                        Tổng số lượng:{" "}
                        {listItem.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                        | {listItem.length} / {skuMaster?.pk_style2}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-6">
            <Button
              onClick={() => {
                handleClose();
              }}
              type="default"
              className="h-16 px-12 text-2xl font-bold"
              size="large"
            >
              Hủy
            </Button>
            <Button
              onClick={() => handleSubmit()}
              type="primary"
              className="h-16 px-12 text-2xl font-bold"
              size="large"
            >
              OK
            </Button>
          </div>
        </div>
        {/* 9920631 */}
      </ConfigProvider>
    </Drawer>
  );
};

export default ModalAdd;

const mapMessage = {
  sku: "Nhập mã vật tư",
  qty: "Nhập số lượng",
  bin: "Nhập mã thùng",
  bt: "Đặt thùng lên băng tải",
};

// const Inbound = ({ selectedItem, setCurrent, handleClose }) => {

//   return (
//   );
// };

const mapAction = {
  1: "Bỏ nguyên thùng",
  2: "Mở thùng carton cho vào thùng nhựa",
  3: "Cho thùng carton vào thùng nhựa",
};

const fakeData = [
  {
    material_no: "9920631",
    material_nm: "TEL86101-2 ",
    material_tp: "Component",
    pk_style: 1,
    pk_style1: 200,
    pk_style2: 1,
    flg: 1,
    flg1: 1, //
    data2: "data2",
    data3: "data3",
    comment: "comment",
    user_id: "user_id",
    ent_dt: "ent_dt",
    upd_dt: "upd_dt",
  },
  {
    material_no: "9920632",
    material_nm: "TEL86101-2 ",
    material_tp: "Component",
    pk_style: 1,
    pk_style1: 100,
    pk_style2: 20,
    flg: 1,
    flg1: 2, //
    data2: "data2",
    data3: "data3",
    comment: "comment",
    user_id: "user_id",
    ent_dt: "ent_dt",
    upd_dt: "upd_dt",
  },
  {
    material_no: "9920633",
    material_nm: "TEL86101-3 ",
    material_tp: "Component",
    pk_style: 100,
    pk_style1: 150,
    pk_style2: 3,
    flg: 1,
    flg1: 3, //
    data2: "data2",
    data3: "data3",
    comment: "comment",
    user_id: "user_id",
    ent_dt: "ent_dt",
    upd_dt: "upd_dt",
  },
];

// flg1 1 là bỏ nguyên thùng
// 2 mở thùng carton cho vào thùng nhựa => e cần biết bỏ tối đa bao nhiêu túi
// 3 cho thùng carton vào thùng nhựa => e cần biết bỏ tối đa bao nhiêu thùng
