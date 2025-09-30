import apiClient from '@/lib/axios';
import { TypeRenderForm } from '@/lib/render-form';
import {
  Button,
  ConfigProvider,
  Drawer,
  Form,
  Input,
  InputNumber,
  Typography,
  notification,
} from 'antd';
import { uniq } from 'lodash';

import { useEffect, useRef, useState } from 'react';

const text2void = (text, isVN = true) => {
  if ('speechSynthesis' in window) {
    const lang = isVN ? 'vi-VN' : 'en-US';
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
      console.log('Dùng giọng:', vietnameseVoice.name);
    } else {
      console.warn('Không tìm thấy giọng tiếng Việt.');
    }

    speechSynthesis.speak(utterance);
  }
};

// Function to get color based on action type
const getActionColor = (flg1: number) => {
  switch (flg1) {
    case 1:
      return 'bg-blue-200 border-blue-400 text-blue-800'; // Bỏ nguyên thùng - Blue
    case 2:
      return 'bg-orange-200 border-orange-400 text-orange-800'; // Mở thùng carton cho vào thùng nhựa - Orange
    case 3:
      return 'bg-green-200 border-green-400 text-green-800'; // Cho thùng carton vào thùng nhựa - Green
    default:
      return 'bg-gray-200 border-gray-400 text-gray-800'; // Default - Gray
  }
};

type TAdd = {
  title: string;
  itemsRender?: TypeRenderForm[];
  _handleFinish: (values: unknown) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  masterData?: any;
  suppMatData?: any;
};

const ModalAdd = ({
  title,
  isOpen,
  setIsOpen,
  masterData,
  suppMatData,
}: TAdd) => {
  const [form] = Form.useForm();
  const [storageData, setStorageData] = useState<string[]>([]);
  const [skuMaster, setSkuMaster] = useState<any>({});
  const refAction = useRef(null);
  const [value, setValue] = useState('');
  const [current, setCurrentField] = useState('sku');
  const [listItem, setListItem] = useState([]);

  const sku = Form.useWatch('sku', form);

  const reset = () => {
    setCurrentField('sku');
    form.resetFields();
    setValue('');
    setSkuMaster({});
    setListItem([]);
  };

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  const fetchStorageData = async () => {
    try {
      const { data } = await apiClient.get('/storage-model');
      const dataNodes = data?.metaData?.[0]?.nodes || [];
      const allData = dataNodes.map((i) => i?.data?.label) || [];
      setStorageData(uniq(allData));
    } catch (error) {
      console.error('Error fetching storage data:', error);
    }
  };
  const handleSkuChange = (sku, masterData) => {
    setListItem([]);
    form.setFieldsValue({
      quantity: undefined,
      bag_quantity: undefined,
      bin_code: '',
    });
    let item = masterData[sku];
    if (!item) {
      const isSuppMat = findSubMat(sku, suppMatData);
      if (!isSuppMat) {
        form.setFieldsValue({
          sku: '',
        });
        text2void(`Không hợp lệ`);
        return;
      }
      item = masterData[isSuppMat];

      if (!item) {
        form.setFieldsValue({
          sku: '',
        });
        text2void(`Không hợp lệ`);
        return;
      }
    }
    if (item.flg1 === 4) {
      setSkuMaster(item);
      text2void(`Không nhập kho`);
      setTimeout(() => {
        reset();
      }, 1000 * 3);
      return;
    }
    setSkuMaster(item);
    setCurrentField('qty');
    text2void(`OK`, false);
    if (item.flg1 == 2) {
      form.setFieldsValue({
        sku: item.material_no,
        storeMethod: 'Carton',
        packingMethod: 'Bag',
        name: item.material_nm,
      });
    } else if (item.flg1 == 1) {
      form.setFieldsValue({
        sku: item.material_no,
        storeMethod: 'Plastic Bin',
        packingMethod: 'Bag',
        name: item.material_nm,
      });
    }
  };
  const handleSubmit = async () => {
    try {
      // Validate the form before submitting
      await form.validateFields();
      const values = form.getFieldsValue();

      const item = masterData[sku];
      // nguyên thùng
      let storeModel = [
        {
          key: 'Carton',
          qty: 1,
        },
        {
          key: 'Bag',
          qty: Number(values.quantity) / item?.pk_style,
        },
        {
          key: storageData[storageData.length - 1],
          qty: Number(values.quantity),
        },
      ];
      if (item.flg1 == 2) {
        // mở thùng carton cho túi vào thùng nhựa
        storeModel = [
          {
            key: 'Plastic Bin',
            qty: 1,
          },
          {
            key: 'Bag',
            qty: Number(values.quantity) / Number(item?.pk_style),
          },
          {
            key: storageData[storageData.length - 1],
            qty: Number(values.quantity),
          },
        ];
      } else if (item.flg1 == 3) {
        storeModel = [
          {
            key: 'Plastic Bin',
            qty: 1,
          },
          {
            key: 'Carton',
            qty: listItem.length,
          },
          {
            key: 'Bag',
            qty: Number(values.quantity) / Number(item?.pk_style),
          },
          {
            key: storageData[storageData.length - 1],
            qty: Number(values.quantity),
          },
        ];
      }
      const body = {
        product_name: values.sku,
        sku: values.sku,
        bin_code: values.bin_code,
        store: storeModel,
        pk_style: skuMaster?.pk_style,
      };
      await apiClient.post('/inbound', body, {}, false);
      console.log('Form submitted:', body);
      notification.success({
        message: 'Thành công',
        description: `Đã thêm yêu cầu nhập kho vật tư ${values.sku} - Số lượng: ${values.quantity}`,
      });
      reset();
    } catch (error) {
      console.error('Error during form submission:', error);

      // If it's a validation error, don't proceed
      if (error.errorFields) {
        console.log('Validation errors:', error.errorFields);
      }
      return;
    }
  };

  const inputQuantity = (value) => {
    // is number
    if (listItem.length === skuMaster?.max_pk - 1) {
      setCurrentField('bin');
    }
    if (listItem.length >= skuMaster?.max_pk) {
      text2void(`Quá số lượng cho phép`);
      setValue('');
      return;
    }
    const per_scan = form.getFieldValue('per_scan');
    if (per_scan && value !== per_scan) {
      text2void(`Số lượng quét không hợp lệ`);
      setValue('');
      return;
    }
    if (!Number.isInteger(Number(value)) || Number(value) <= 0) {
      text2void(`Số lượng không đúng định dạng`);
      setValue('');
      return;
    }

    setCurrentField('sku_bin');
    const oldValue = form.getFieldValue('quantity') || 0;
    form.setFieldValue('quantity', +oldValue + Number(value));

    form.setFieldValue('per_scan', value);
    setListItem((prev) => [
      ...prev,
      {
        sku: sku,
        quantity: Number(value),
      },
    ]);
    setValue('');
    text2void(`OK`, false);
  };
  const handleActionEnter = (value) => {
    const oldSKU = form.getFieldValue('sku');
    // if (value === "OK") {
    //   handleSubmit();
    //   return;
    // } else if (value === "Cancel") {
    //   // setCurrent(0);
    //   handleClose();
    //   return;
    // }
    if (!isNaN(value) && oldSKU && value.length != 8 && value.length != 7) {
      inputQuantity(value);
    } else if (isValidBinCode(value)) {
      // is Bin ocode
      form.setFieldValue('bin_code', value);
      setCurrentField('bt');
      setValue('');
      text2void(`OK`, false);
      setTimeout(() => {
        handleSubmit();
      }, 100);
    } else {
      if (!oldSKU) {
        form.setFieldValue('sku', value);
      } else if (oldSKU !== value) {
        text2void(`Không hợp lệ`);
        notification.error({
          message: 'Không hợp lệ',
          description: 'Vui lòng kiểm tra lại',
        });
        setValue('');
        return;
      }
      setValue('');
    }

    setValue('');
  };

  const keepFocus = () => {
    setTimeout(() => {
      refAction.current?.focus();
    }, 0);
  };
  const handleBlur = () => {
    keepFocus();
  };

  useEffect(() => {
    if (sku && masterData) {
      handleSkuChange(sku, masterData);
    }
  }, [sku, masterData]);

  useEffect(() => {
    if (isOpen) {
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
        if (
          refAction?.current &&
          document.activeElement === refAction?.current
        ) {
          (document.activeElement as HTMLElement).blur();
        }
      };
    }
  }, [isOpen]);

  return (
    <Drawer
      title={title}
      open={isOpen}
      placement='bottom'
      height={'95vh'}
      onClose={() => {
        handleClose();
      }}
      footer={null}
    >
      <ConfigProvider
        theme={{
          token: {
            fontSize: 22, // Default is 14
          },
        }}
      >
        <div>
          <div className='flex items-stretch mb-4 gap-4'>
            <div className='flex-1 space-y-4  bg-gray-50 p-4 rounded-lg'>
              <div className='space-y-4  bg-gray-50 p-4 rounded-lg'>
                <div className='text-center'>
                  <p className='text-4xl text-gray-600 font-bold mb-6'>
                    {mapMessage[current]}
                  </p>
                  <Input
                    ref={refAction}
                    placeholder={'Trỏ chuột vào đây để quét dữ liệu'}
                    autoFocus
                    onBlur={handleBlur}
                    className='text-center text-3xl font-bold h-15'
                    size='large'
                    style={{ fontSize: '20px' }}
                    value={value}
                    onChange={(e) => setValue(e.target.value.trim())}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleActionEnter(value);
                      }
                    }}
                  />
                </div>
              </div>{' '}
              <Form
                form={form}
                layout='vertical'
                onFinish={handleSubmit}
                disabled={true}
                className='bg-white py-0 px-8 rounded-lg shadow-sm text-2xl font-bold'
              >
                <div className='grid grid-cols-1 gap-8'>
                  <Form.Item
                    label={
                      <span className='text-2xl font-bold'>
                        Mã vật tư{' '}
                        <span className='text-sm font-bold'>
                          ({skuMaster?.pk_style} items/túi)
                        </span>
                      </span>
                    }
                    name='sku'
                  >
                    <Input className='text-2xl font-bold h-16' />
                  </Form.Item>
                </div>

                <div className='grid grid-cols-1 gap-8'>
                  <Form.Item
                    label={
                      <span className='text-2xl font-bold'>
                        Số lượng vật tư
                      </span>
                    }
                    name='quantity'
                  >
                    <InputNumber
                      className='w-full text-2xl font-bold'
                      size='large'
                      style={{ height: '64px', lineHeight: '64px' }}
                      parser={(value) =>
                        value ? value.replace(/\D/g, '') : ''
                      }
                      formatter={(value) => (value ? `${value}` : '')}
                    />
                  </Form.Item>
                </div>
                <div className='grid grid-cols-1 gap-8'>
                  <Form.Item
                    label={<span className='text-2xl font-bold'>Mã thùng</span>}
                    name='bin_code'
                  >
                    <Input
                      // placeholder='Nhập mã thùng'
                      className='w-full text-2xl font-bold h-16'
                    />
                  </Form.Item>
                </div>
              </Form>
            </div>
            <div className='flex-1 space-y-4  bg-gray-50 p-4 rounded-lg'>
              {skuMaster ? (
                <div>
                  <Typography.Title level={5} className='text-center mb-0'>
                    Kiểu vật tư
                  </Typography.Title>
                  <div
                    className={`p-6 rounded-lg border-2 shadow-lg ${getActionColor(
                      skuMaster?.flg1
                    )}`}
                  >
                    <Typography.Title level={3} className='text-center mb-0'>
                      {mapAction[skuMaster?.flg1]}
                    </Typography.Title>
                  </div>
                </div>
              ) : null}
              {sku && !skuMaster ? (
                <div className={`p-6 rounded-lg border-2 shadow-lg bg-red-400`}>
                  <Typography.Title level={3} className='text-center mb-0'>
                    Vật tư không hợp lệ
                  </Typography.Title>
                </div>
              ) : null}
              <div className='bg-white p-4 rounded-lg shadow-sm '>
                <Typography.Title level={4} className='text-center mb-4'>
                  Danh sách đã quét
                </Typography.Title>
                <div className='max-h-[30vh] overflow-y-auto'>
                  {
                    listItem.length > 0 ? (
                      <div className='space-y-2'>
                        {listItem.map((item, index) => (
                          <div
                            key={index}
                            className='flex justify-between items-center p-3 bg-gray-50 rounded-lg border'
                          >
                            <div className='flex flex-col'>
                              <span className='text-lg font-bold text-gray-800'>
                                {item.sku}
                              </span>
                              <span className='text-sm text-gray-600'>
                                Số lượng: {item.quantity}
                              </span>
                            </div>
                            <div className='text-lg font-bold text-blue-600'>
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
                  <div className='mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200'>
                    <div className='text-center flex justify-between items-center'>
                      <span className='text-lg font-bold text-blue-800'>
                        Tổng số lượng item:{' '}
                        {listItem.reduce((sum, item) => sum + item.quantity, 0)}{' '}
                      </span>
                      <span className='text-lg font-bold text-blue-800'>
                        {listItem.length} / {skuMaster?.max_pk}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='flex justify-center mt-8 gap-6'>
            <Button
              onClick={() => {
                handleClose();
              }}
              type='default'
              className='h-16 px-12 text-2xl font-bold'
              size='large'
            >
              Hủy
            </Button>
            <Button
              onClick={() => handleSubmit()}
              type='primary'
              className='h-16 px-12 text-2xl font-bold'
              size='large'
            >
              OK
            </Button>
          </div>
        </div>
        {/* 60988953 */}
      </ConfigProvider>
    </Drawer>
  );
};

export default ModalAdd;

const mapMessage = {
  sku: 'Nhập mã vật tư',
  qty: 'Nhập số lượng',
  bin: 'Nhập mã thùng',
  sku_bin: 'Nhập số lượng / mã thùng',
  bt: 'Đặt thùng lên băng tải',
};

// const Inbound = ({ selectedItem, setCurrent, handleClose }) => {

//   return (
//   );
// };

const mapAction = {
  1: 'Bỏ nguyên thùng',
  2: 'Mở thùng carton và đổ toàn bộ túi vào thùng nhựa',
  3: 'Cho thùng carton vào thùng nhựa',
  4: 'Không nhập kho',
};

const fakeData = [
  {
    material_no: '60988953',
    material_nm: 'TEL86101-2 ',
    material_tp: 'Component',
    pk_style: 100,
    pk_style1: 200,
    pk_style2: 1,
    flg: 1,
    flg1: 1, //
    data2: 'data2',
    data3: 'data3',
    comment: 'comment',
    user_id: 'user_id',
    ent_dt: 'ent_dt',
    upd_dt: 'upd_dt',
  },
  {
    material_no: '9920632',
    material_nm: 'TEL86101-2 ',
    material_tp: 'Component',
    pk_style: 100,
    pk_style1: 100,
    pk_style2: 20,
    flg: 1,
    flg1: 2, //
    data2: 'data2',
    data3: 'data3',
    comment: 'comment',
    user_id: 'user_id',
    ent_dt: 'ent_dt',
    upd_dt: 'upd_dt',
  },
  {
    material_no: '9920633',
    material_nm: 'TEL86101-3 ',
    material_tp: 'Component',
    pk_style: 100,
    pk_style1: 150,
    pk_style2: 3,
    flg: 1,
    flg1: 3, //
    data2: 'data2',
    data3: 'data3',
    comment: 'comment',
    user_id: 'user_id',
    ent_dt: 'ent_dt',
    upd_dt: 'upd_dt',
  },
];

// flg1 1 là bỏ nguyên thùng
// 2 mở thùng carton cho vào thùng nhựa => e cần biết bỏ tối đa bao nhiêu túi
// 3 cho thùng carton vào thùng nhựa => e cần biết bỏ tối đa bao nhiêu thùng

// material_no	nchar(26)	Mã vật tư( tối đa 26 ký tự)
// material_nm	nchar(15)	Tên vật tư
// material_tp	nchar(1)	Kiểu vật tư
// pk_style	int	200 (item) / túi
// pk_style1	int	2000 (item) / thùng carton
// pk_style2	int	Số lượng lớn nhất của túi/thùng carton được đóng gói trong thùng nhựa
// flg	int	Cờ đánh dấu vât tư cấp theo  phương thức tự động(Smart warehouse) hoặc thủ công( người cấp)
// flg1	int	1 | 2| 3
// data2	nchar(50)
// data3	nchar(50)
// comment	nchar(26)
// user_id	nchar(8)
// ent_dt	datetime
// upd_dt	datetime

function isValidBinCode(str) {
  return /^B\d{6}$/.test(str);
}
const findSubMat = (sku, masterData) => {
  try {
    console.log('findSubMat', sku, masterData);
    if (!sku || !masterData || masterData.length === 0) return null;
    const found = masterData.find((row) => {
      const substring = sku.slice(Number(row.data_position)); // adjust since .slice is 0-based
      console.log('Comparing', substring, substring === row.supp_mat_no);
      return substring === row.supp_mat_no;
    });
    console.log('Found sub mat:', found);
    return found ? found.material_no : null;
  } catch (error) {
    return null;
  }
};
