import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Drawer,
  Select,
  Typography,
  notification,
} from "antd";
import { creatMissionData } from "@/lib/dummyData";
import { useI18n } from "@/contexts/useI18n";

const DrawerOI: React.FC<any> = ({
  isOpen,
  selectedItem = {},
  setIsOpen,
  missionData,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useI18n();

  const [currentBox, setCurrentBox] = useState<any>({});

  const handleOkButton = () => {
    currentPage === 0 ? setCurrentPage(1) : setCurrentPage(0);
  };

  const handleCancelButton = () => {
    currentPage === 1 ? setCurrentPage(0) : setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setCurrentPage(0);
  };

  return (
    <Drawer
      // title={t('issue_time_schedule.oi_modal.title')}
      open={isOpen}
      onClose={handleCancel}
      height={"95vh"}
      placement="bottom"
      // footer={
      //   <div style={{ textAlign: "right" }}>
      //     <Button style={{ marginRight: 8 }} onClick={handleCancelButton}>
      //       {currentPage === 1
      //         ? t("issue_time_schedule.oi_modal.back")
      //         : t("issue_time_schedule.oi_modal.cancel")}
      //     </Button>
      //     <Button
      //       type="primary"
      //       onClick={handleOkButton}
      //       loading={confirmLoading}
      //     >
      //       {currentPage === 0
      //         ? t("issue_time_schedule.oi_modal.next")
      //         : t("issue_time_schedule.oi_modal.complete")}
      //     </Button>
      //   </div>
      // }
    >
      {currentPage === 0 && (
        <SplitOrder
          selectedItem={selectedItem}
          boxFounded={currentBox}
          setCurrentPage={setCurrentPage}
          missionData={missionData}
          setCurrentBox={setCurrentBox}
        />
      )}
      {currentPage === 1 && (
        <Inbound
          selectedItem={selectedItem}
          setCurrentPage={setCurrentPage}
          boxFounded={currentBox}
          setCurrentBox={setCurrentBox}
        />
      )}
    </Drawer>
  );
};

const SplitOrder: React.FC<any> = ({
  selectedItem,
  setCurrentPage,
  setCurrentBox,
  boxFounded,
}) => {
  const { t } = useI18n();

  const [missionData, setMissionData] = useState<any[]>([]);
  // const [boxFounded, setBoxFounded] = useState<any>({});

  const fetchData = async () => {
    const data = await creatMissionData();
    console.log("ata.metaData", data.metaData);
    setMissionData(data.metaData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refAction = useRef(null);
  const [value, setValue] = useState("");
  const [current, total] = selectedItem?.quantity
    ?.split(" / ")
    .map((num) => parseInt(num, 10)) || [0, 0];

  const handleFocus = () => {
    setTimeout(() => {
      refAction?.current?.focus();
    }, 500);
  };

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
    // if (value === "OK") {
    //   setCurrentPage(1);
    //   return;
    // } else if (value === "cancel") {
    //   setCurrentPage(0); // Reset to Outbound step
    // }
    // console.log('___adf', missionData)
  };
  const handleInputEnter = (value) => {
    if (value === "OK" || value === "ok") {
      setCurrentPage(1);
      setValue("");
      return;
    }
    const boxFounded = missionData.find((item) => item.package_no === value);
    if (!boxFounded) {
      notification.error({
        message: "Error",
        description: "Mã thùng không tồn tại, vui lòng thử lại!",
        duration: 2,
      });
      setValue("");
      return;
    }
    console.log("___package_no", boxFounded);
    // setBoxFounded(boxFounded);
    setCurrentBox(boxFounded);
    setValue("");
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
          onBlur={handleFocus}
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

        {/* <div className="my-4">
          <p className="text-lg text-gray-600 text-center">Quantity to Pick</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-bold text-blue-600">{current}</span>
            <span className="text-xl text-gray-400">from</span>
            <span className="text-3xl font-bold text-gray-600">{total}</span>
          </div>
        </div> */}

        <div className="grid grid-cols-2 gap-4 my-4 mt-10">
          {/* <div className="bg-blue-50 p-3 rounded-md border border-blue-100 text-center">
            <p className="text-sm text-blue-600 font-medium">KIT</p>
            <p className="text-2xl font-bold text-blue-700 tracking-wider">
              {selectedItem?.order || "Item order"}
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded-md border border-blue-100 text-center">
            <p className="text-sm text-blue-600 font-medium">Mã vật tư</p>
            <p className="text-2xl font-bold text-blue-700 tracking-wider">
              {selectedItem?.sku || "Item sku"}
            </p>
          </div> */}
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
                  {boxFounded?.material_no || ""}
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
          {/* <div className="text-center">
            <p className="text-md text-gray-500">Robot No</p>
            <p className="font-medium text-lg">{boxFounded?.robot_no || "Not assigned"}</p>
          </div>
          <div className="text-center">
            <p className="text-md text-gray-500">ETA</p>
            <p className="font-medium text-lg">{boxFounded?.eta || "Not available"}</p>
          </div> */}
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
        <div
          className="text-center mt-6"
          // onClick={() => refAction?.current?.blur()}
        >
          <label className="block text-3xl font-bold text-gray-700 mb-6">
            Số lượng còn lại trong thùng
          </label>
          <Input
            type="number"
            id="restNumber"
            value={
              boxFounded?.available_quantity -
                boxFounded?.quantity || 0
            }
            className="w-full text-4xl font-bold text-center"
            style={{ height: "80px" }}
            placeholder="Số lượng hồi kho"
          />
        </div>
        {/* <div>
          <p className="text-lg text-gray-900 font-semibold mb-4 text-center">
            Current Box Data (Debug)
          </p>
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap overflow-auto max-h-60">
              {JSON.stringify(boxFounded, null, 2)}
            </pre>
          </div>
        </div> */}
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
      // setRestNumber(Number(value));
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
                  value={
                    (boxFounded?.available_quantity || 0) -
                    (boxFounded?.quantity || 0)
                  }
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
