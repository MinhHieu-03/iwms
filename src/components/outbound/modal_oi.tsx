import apiClient from "@/lib/axios";
import { MISSION_STATE } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Drawer, Input, message, Button } from "antd";
import { error } from "console";
import React, { useEffect, useMemo, useRef, useState } from "react";

const DrawerOI: React.FC<any> = ({ isOpen, setIsOpen, data }) => {
  const handleCancel = () => {
    setIsOpen(false);
  };

  const { missionData, kitMerge } = useMemo(() => {
    return {
      missionData: data.missions || [],
      kitMerge: data.kitMerge || null,
    };
  }, [data]);

  const refAction = useRef(null);

  const [value, setValue] = useState("");
  const [boxFounded, setBoxFounded] = useState<{ [key: string]: any }>({});

  const { data: missionStatistics, refetch: refetchMissionStatistics } =
    useQuery({
      queryKey: ["/mission/statistics", kitMerge],
      queryFn: async () => {
        const { data } = await apiClient.get(`/mission/statistics/${kitMerge}`);
        if (data?.length) {
          const error = data.filter(
            (item) => item.state === MISSION_STATE.ERROR
          ).length;

          const done_picking = data.filter(
            (item) => item.state === MISSION_STATE.DONE_PICKING
          ).length;

          const new_mission = data.filter(
            (item) => item.state === MISSION_STATE.NEW
          ).length;

          
          const rest = data.length - done_picking - error;
          return {
            rest: rest,
            total: data.length,
            error,
            done_picking,
            new: new_mission,
          };
        }
        return {};
      },
      enabled: !!kitMerge,
      retry: false,
    });

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
  const updateMissionStatus = (boxFounded) => {
    console.log("boxFounded___:", boxFounded);
    apiClient
      .patch(`/mission/${boxFounded._id}`, {
        state: MISSION_STATE.DONE_PICKING,
      })
      .then(() => {
        refetchMissionStatistics();
        // Simulate API call to update mission status
        message.success(
          `Cập nhật trạng thái nhiệm vụ cho mã thùng: ${boxFounded.bin_id}`
        );
      })
      .catch((err) => {
        console.error("Failed to update mission status:", err);
        message.error(
          "Cập nhật trạng thái nhiệm vụ thất bại, vui lòng thử lại."
        );
      });
  };

  const handleInputEnter = (value) => {
    const boxFounded = missionData.find((item) => item.bin_id === value);
    if (!boxFounded) {
      message.error("Không tìm thấy mã thùng, vui lòng thử lại.");
      setValue("");
      return;
    }
    setBoxFounded(boxFounded);
    setValue("");
    updateMissionStatus(boxFounded);
  };

  const handleFocus = () => {
    setTimeout(() => {
      refAction?.current?.focus();
    }, 500);
  };

  return (
    <Drawer
      title={`OI Pick Tổng`}
      open={isOpen}
      onClose={handleCancel}
      height={"95vh"}
      placement="bottom"
      extra={
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-xl shadow-lg min-w-[120px]">
            <div className="text-2xl font-bold leading-tight">
              {missionStatistics?.done_picking || 0}
            </div>
            <div className="text-xs font-medium opacity-90 uppercase tracking-wide">
              Hoàn thành
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl shadow-lg min-w-[120px]">
            <div className="text-2xl font-bold leading-tight">
              {missionStatistics?.error || 0}
            </div>
            <div className="text-xs font-medium opacity-90 uppercase tracking-wide">
              Lỗi
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-xl shadow-lg min-w-[120px]">
            <div className="text-2xl font-bold leading-tight">
              {missionStatistics?.rest || 0}
            </div>
            <div className="text-xs font-medium opacity-90 uppercase tracking-wide">
              Còn lại
            </div>
          </div>
          {missionStatistics?.rest === 0 ? (<Button
            type="primary"
            size="large"
            // className="bg-gray-600 hover:bg-gray-700 border-gray-600 hover:border-gray-700"
            onClick={handleCancel}
          >
            Kết thúc
          </Button>) : null}
        </div>
      }
    >
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
            {boxFounded?.inventory?.material_no ? (
              <>
                <div className="text-center">
                  <p className="text-xl text-gray-500 font-semibold">
                    Mã thùng
                  </p>
                  <p className="font-bold text-2xl">
                    {boxFounded?.bin_id || "Not scanned"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl text-gray-500 font-semibold">
                    Mã vật tư
                  </p>
                  <p className="font-bold text-2xl">
                    {boxFounded?.inventory?.material_no || "Not available"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl text-gray-500 font-semibold">
                    Số lượng
                  </p>
                  <p className="font-bold text-2xl">
                    {boxFounded?.inventory?.qty_available || "0"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl text-gray-500 font-semibold">
                    Mã vị trí
                  </p>
                  <p className="font-bold text-2xl">
                    {boxFounded?.origin || "Not assigned"}
                  </p>
                </div>
              </>
            ) : null}
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
                  {boxFounded?.inventory?.qty}
                </span>
                <span className="text-xl text-gray-400">/</span>
                <span className="text-3xl font-bold text-gray-600">
                  {boxFounded?.inventory?.qty_available}
                </span>
              </div>
            </div>
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
              value={
                boxFounded?.inventory?.qty_available -
                  boxFounded?.inventory?.qty || 0
              }
              className="w-full text-4xl font-bold text-center"
              style={{ height: "80px" }}
              placeholder="Số lượng hồi kho"
            />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerOI;
