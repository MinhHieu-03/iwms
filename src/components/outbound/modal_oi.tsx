import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Drawer,
  Select,
  message,
} from "antd";
import { creatMissionData } from "@/lib/dummyData";
import { useI18n } from "@/contexts/useI18n";

const DrawerOI: React.FC<any> = ({
  isOpen,
  selectedItem = {},
  setIsOpen,
  missionData,
}) => {
  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Drawer
      // title={t('issue_time_schedule.oi_modal.title')}
      open={isOpen}
      onClose={handleCancel}
      height={"95vh"}
      placement="bottom"
    >
      <SplitOrder missionData={missionData} />
    </Drawer>
  );
};

const SplitOrder: React.FC<any> = ({ missionData = [] }) => {
  const refAction = useRef(null);

  const [value, setValue] = useState("");
  const [boxFounded, setBoxFounded] = useState("");

  useEffect(() => {
    const currentRef = refAction.current;
    if (currentRef) {
      currentRef.focus();
      setTimeout(() => {
        currentRef.focus();
      }, 500);
    }

    return () => {
      if (currentRef && document.activeElement === currentRef) {
        (document.activeElement as HTMLElement).blur();
      }
    };
  }, []);

  useEffect(() => {
    const currentRef = refAction.current;
    if (currentRef) {
      currentRef.focus();
      setTimeout(() => {
        currentRef.focus();
      }, 500);
    }

    return () => {
      if (currentRef && document.activeElement === currentRef) {
        (document.activeElement as HTMLElement).blur();
      }
    };
  }, []);

  const handleAction = (e) => {
    const value = e.target.value.trim();
    setValue(value);
  };
  const handleInputEnter = (value) => {
    if (value && value.trim().toLowerCase() === "ok") {
    } else {
      const boxFounded = missionData.find((item) => item.package_no === value);
      if (boxFounded) {
        setBoxFounded(boxFounded);
        setValue("");
      } else {
        message.error("Không tìm thấy mã thùng, vui lòng thử lại.");
      }
    }
  };

  const handleFocus = () => {
    setTimeout(() => {
      refAction?.current?.focus();
    }, 500);
  };

  return (
    <div className="flex gap-4">
      <div className="flex-1 bg-gray-50 p-4 rounded-lg ">
        <p className="text-4xl text-gray-900 font-extrabold mb-4 text-center">
          Nhập mã thùng
        </p>
        <Input
          ref={refAction}
          placeholder="Trỏ chuột vào đây để nhập dữ liệu"
          autoFocus
          onBlur={(e) => {
            console.log("onBlur", e.nativeEvent.relatedTarget);
            // restNumber
            handleFocus();
          }}
          className="text-center text-3xl font-bold h-15"
          value={value}
          size="large"
          onChange={handleAction}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleInputEnter(value);
            }
          }}
        />
        <div className="grid grid-cols-2 gap-4 my-4 mt-10">
          {boxFounded?.package_no ? (
            <>
              <div className="text-center">
                <p className="text-xl text-gray-500 font-semibold">Mã thùng</p>
                <p className="font-bold text-2xl">
                  {boxFounded?.package_no || "Not scanned"}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xl text-gray-500 font-semibold">Mã vật tư</p>
                <p className="font-bold text-2xl">
                  {boxFounded?.material_no || "Not available"}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xl text-gray-500 font-semibold">Số lượng</p>
                <p className="font-bold text-2xl">
                  {boxFounded?.available_quantity || "0"}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xl text-gray-500 font-semibold">Mã vị trí</p>
                <p className="font-bold text-2xl">
                  {boxFounded?.supply_loc || "Not assigned"}
                </p>
              </div>
            </>
          ) : null}
        </div>
        <div
          className="text-center mt-6"
          onClick={() => refAction?.current?.blur()}
        >
          <label className="block text-3xl font-bold text-gray-700 mb-6">
            Số lượng còn lại trong thùng
          </label>
          <Input
            type="number"
            id="restNumber"
            value={boxFounded?.available_quantity - boxFounded?.quantity || 0}
            className="w-full text-4xl font-bold text-center"
            style={{ height: "80px" }}
            placeholder="Số lượng hồi kho"
          />
        </div>
      </div>
      <div className="flex-1 bg-gray-50 p-4 rounded-lg">
        <div>
          <p className="text-4xl text-gray-900 font-extrabold mb-4 text-center">
            Chỉ thị lấy vật tư
          </p>
          <div
            className={`p-6 rounded-lg border-2 shadow-lg bg-blue-200 border-blue-400 text-blue-800`}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl font-bold text-blue-600">
                {boxFounded.quantity}
              </span>
              <span className="text-xl text-gray-400">/</span>
              <span className="text-3xl font-bold text-gray-600">
                {boxFounded.available_quantity}
              </span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-3xl text-gray-900 font-bold mb-6 text-center mt-10">
            Thông tin Kit
          </p>
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="space-y-4">
              {boxFounded?.kit &&
                Object.entries(boxFounded.kit).map(([kitCode, quantity]) => (
                  <div
                    key={kitCode}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded border"
                  >
                    <span className="font-bold text-xl text-gray-700">
                      {kitCode}
                    </span>
                    <span className="font-bold text-2xl text-blue-600">
                      {String(quantity)}
                    </span>
                  </div>
                ))}
              {!boxFounded?.kit && (
                <div className="text-center text-gray-500 py-6">
                  <span className="text-xl"></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Inbound = ({
  selectedItem,
  setCurrentPage,
  boxFounded,
  setCurrentBox,
}) => {
  const [form] = Form.useForm();
  const [showInput, setShowInput] = useState(true);
  const [restNumber, setRestNumber] = useState(0);
  useEffect(() => {
    if (selectedItem) {
      form.setFieldsValue({
        sku: selectedItem.sku,
        quantity: selectedItem.quantity?.split(" / ")?.[0] || "",
      });
    }
  }, [selectedItem, form]);

  useEffect(() => {
    setRestNumber(
      (boxFounded?.available_quantity || 0) - (boxFounded?.quantity || 0)
    );
  }, [boxFounded]);

  const refAction = useRef(null);
  const [value, setValue] = useState("");
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
  };

  useEffect(() => {
    setShowInput(
      (boxFounded?.available_quantity || 0) - (boxFounded?.quantity || 0) !== 0
    );
  }, [boxFounded]);

  const handleFocus = () => {
    setTimeout(() => {
      refAction?.current?.focus();
    }, 500);
  };
  const handleInputEnter = (value) => {
    if (value && value.toLowerCase() === "ok") {
      setCurrentPage(0);
      setCurrentBox({});
    } else if (!isNaN(Number(value))) {
      setRestNumber(Number(value));
    }
    setValue("");
  };
  return (
    <div>
      <div className="space-y-6 mt-5 bg-gray-50 p-6 rounded-lg">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <p className="text-3xl text-gray-900 font-bold mb-6 text-center">
            Xử lý hồi kho
          </p>

          <Input
            ref={refAction}
            placeholder="Trỏ chuột vào đây để nhập dữ liệu"
            autoFocus
            onBlur={handleFocus}
            className="text-center text-3xl font-bold h-15 mb-6"
            value={value}
            size="large"
            onChange={handleAction}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleInputEnter(value);
              }
            }}
          />
          {/* Remaining Quantity Input */}
          <div className="mb-6">
            {!showInput ? (
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
                  <p className="text-5xl font-bold text-red-600">
                    Xử lý thùng rỗng
                  </p>
                </div>
                <Button
                  type="primary"
                  danger
                  className="w-full text-2xl"
                  style={{ height: "80px" }}
                  onClick={() => setShowInput(true)}
                >
                  Quay lại giao diện nhập số lượng
                </Button>
              </div>
            ) : (
              <div>
                <label className="block text-3xl font-bold text-gray-700 mb-6">
                  Số lượng còn lại trong thùng
                </label>
                <Input
                  type="number"
                  value={restNumber}
                  className="w-full text-4xl font-bold text-center"
                  style={{ height: "80px" }}
                  placeholder="Remaining quantity"
                  readOnly
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-500 mb-2">Mã thùng</p>
              <p className="font-bold text-2xl">
                {boxFounded?.package_no || "Not scanned"}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-500 mb-2">Mã vật tư</p>
              <p className="font-bold text-2xl">
                {boxFounded?.material_no || "Not available"}
              </p>
            </div>
            {/* <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-500 mb-2">Số lượng</p>
              <p className="font-bold text-2xl">{boxFounded?.quantity || "0"}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-500 mb-2">Supply Location</p>
              <p className="font-bold text-2xl">{boxFounded?.supply_loc || "Not assigned"}</p>
            </div> */}
          </div>

          {/* Kit Information */}
          {/* {boxFounded?.kit && (
            <div className="mt-6">
              <p className="text-2xl text-gray-700 font-bold mb-4">Kit Details:</p>
              <div className="space-y-3">
                {Object.entries(boxFounded.kit).map(([kitCode, quantity]) => (
                  <div key={kitCode} className="flex justify-between items-center p-4 bg-gray-50 rounded border">
                    <span className="font-bold text-xl text-gray-700">{kitCode}</span>
                    <span className="font-bold text-xl text-blue-600">{String(quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* Full JSON Debug */}
          {/* <div className="mt-4">
            <p className="text-md text-gray-700 font-medium mb-2">Complete Data (Debug):</p>
            <pre className="text-xs text-gray-600 bg-gray-100 p-2 rounded overflow-auto max-h-40">
              {JSON.stringify(boxFounded, null, 2)}
            </pre>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DrawerOI;
