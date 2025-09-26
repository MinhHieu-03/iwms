import OutboundHeader from "@/components/OutboundHeader";
import { Card } from "@/components/ui/card";
import { KIT_MERGE_TYPE, useKitMergeQuery } from "@/hooks/kit-merge";
import { MissionKitMergeItem, useMissionKitMergeDetail } from "@/hooks/mission";
import { PTLKitIssueDataItem, usePTLKitIssueDataByIssordNo, useUpdatePTL } from "@/hooks/ptl";
import { KIT_MERGER_STATUS } from "@/types";
import { Input, message } from "antd";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";

const OrdersTab: React.FC = () => {
  const refAction = useRef(null);

  const [boxFounded, setCurrentBox] = useState<Partial<MissionKitMergeItem>>(
    {}
  );
  const [sku, setSku] = useState<string>("");
  const [ptlDataShow, setPtlDataShow] = useState<PTLKitIssueDataItem[]>([]);
  const [value, setValue] = useState("");
  const [selectedGate, setSelectedGate] = useState<string | undefined>();

  // get kit merge in progress
  const { data: listKitMerge, isLoading } = useKitMergeQuery(
    {
      gate: selectedGate,
      type: KIT_MERGE_TYPE.STANDARD,
      status: KIT_MERGER_STATUS.IN_PROGRESS,
    },
    { page: 1, limit: 2 }
  );

  const [currentKits, currentKitMerge] = useMemo(() => {
    if (
      listKitMerge &&
      listKitMerge.metaData &&
      listKitMerge.metaData.length > 0
    ) {
      return [listKitMerge.metaData[0].kit_no, listKitMerge.metaData[0]._id];
    }
    return [[], undefined];
  }, [listKitMerge]);

  const {
    data: ptlDataByIssordNo,
    error: ptlDataError,
    isLoading: isLoadingPTLData,
    refetch: refetchPTLData,
  } = usePTLKitIssueDataByIssordNo(currentKits);

  const { data: missionData, refetch: refetchMissionData } =
    useMissionKitMergeDetail(currentKitMerge);

  const { mutate: updatePTLMutate } = useUpdatePTL();
  const handleFocus = () => {
    setTimeout(() => {
      refAction?.current?.focus();
    }, 500);
  };

  useEffect(() => {
    const currentRef = refAction.current;
    if (currentRef) {
      currentRef.focus();
      handleFocus();
    }

    return () => {
      // Cleanup to prevent focusing on unmounted components
      if (currentRef && document?.activeElement === currentRef) {
        (document.activeElement as HTMLElement)?.blur();
      }
    };
  }, []);

  const handleAction = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setValue(value);
  };

  useEffect(() => {
    if (!sku) return () => {};
    refetchPTLData();
    if (ptlDataByIssordNo && ptlDataByIssordNo.length > 0) {
      setPtlDataShow(
        ptlDataByIssordNo.filter((item) => item?.material_no === sku)
      );
    } else {
      setPtlDataShow([]);
    }
    if (missionData && missionData.length > 0) {
      const boxFoundedMission = missionData.find(
        (item) => item?.inventory?.material_no === sku
      );
      setCurrentBox(boxFoundedMission?.inventory || {});
    } else {
      setCurrentBox({});
    }
  }, [sku, ptlDataByIssordNo, missionData]);
  const handlePTL = (value) => {
    let total = Number(value);
    const updateItems = [];

    const convert = ptlDataShow.map((item) => {
      if (!item) return item;
      const oldPicked = item.picked_qty || 0;

      if (item.material_no === sku && oldPicked < (item.ptl_qty || 0)) {
        const need = (item.ptl_qty || 0) - oldPicked;

        const countSet = Math.min(total, need);
        if(countSet <= 0) return item;
        
        item.picked_qty = oldPicked + countSet;
        total = total - countSet;
        
        updateItems.push(item);
      }
      return item;
    });
    console.log("updateItems", updateItems);
    updateItems.forEach((item) => {
      if (!item || !item._id) return;
      updatePTLMutate({
        id: item._id || "",
        picked_qty: item.picked_qty || 0,
      });
    });
    setPtlDataShow([...convert]);
  };

  const handleInputEnter = (value: string) => {
    if (value && value.length >= 6) {
      setSku(value);
    } else if (value && !isNaN(Number(value))) {
      handlePTL(value);
    } else {
      console.log("Invalid input", value);
      message.error("Dữ liệu nhập không hợp lệ");
    }
    setValue("");
  };

  return (
    <div className="space-y-2">
      <OutboundHeader
        selectedGate={selectedGate}
        onGateChange={setSelectedGate}
        title="OI chia lẻ hàng chẵn"
      />
      <Card>
        <div>
          <div className="flex gap-4">
            <div className="flex-1 bg-gray-50 p-4 rounded-lg ">
              <p className="text-4xl text-gray-900 font-extrabold mb-4 text-center">
                Nhập mã vật tư
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
            </div>
            <div
              className={`flex-1 ${
                boxFounded?.material_no ? "bg-green-50" : "bg-gray-100"
              } p-4 rounded-lg`}
            >
              <div>
                <p className="text-3xl text-gray-900 font-bold mb-6 text-center">
                  Thông tin chia vật tư
                </p>
                <div className="grid grid-cols-2 gap-4 my-4">
                  <div className="text-center">
                    <p className="text-xl text-gray-500 font-semibold">
                      Mã vật tư
                    </p>
                    <p className="font-bold text-2xl">
                      {boxFounded?.material_no || "Not available"}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl text-gray-500 font-semibold">
                      Số lượng
                    </p>
                    <p className="font-bold text-2xl">
                      {boxFounded?.qty || "0"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="grid grid-cols-4 gap-4">
              {currentKits.map((kitNo, index) => (
                <TrolleyKit
                  ptlDataShow={ptlDataShow}
                  key={kitNo}
                  title={kitNo}
                  kit={`Kit ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {isLoadingPTLData ? (
          <span>Loading...</span>
        ) : (
          <span>
            {ptlDataError ? ptlDataError.message : ptlDataByIssordNo?.length}
          </span>
        )}
      </Card>
    </div>
  );
};

export default OrdersTab;

const ptlFakeData = [
  {
    id: "1",
    issue_ord_no: "K365005",
    material_no: "60988953",
    ptl_qty: 100,
    picked_qty: 0,
    station: "SA01",
    group: "Nhóm SA 01",
    box_tp: "Ca bé",
    trolley_tp: "Xe bé",
  },
  {
    id: "2",
    issue_ord_no: "K365005",
    material_no: "60988953",
    ptl_qty: 200,
    station: "SA02",
    group: "Nhóm SA 02",
    box_tp: "Ca to",
    trolley_tp: "Xe bé",
  },
  {
    id: "3",
    issue_ord_no: "K365006",
    material_no: "60988953",
    ptl_qty: 100,
    station: "SD02",
    box_tp: "Ca to",
    group: "Nhóm SD 03",
    trolley_tp: "Xe to",
  },
  {
    id: "4",
    issue_ord_no: "K365006",
    material_no: "60988953",
    ptl_qty: 100,
    station: "SD03",
    box_tp: "Ca to",
    group: "Nhóm SD 04",
    trolley_tp: "Xe to",
  },
  {
    id: "5",
    issue_ord_no: "K345678",
    material_no: "61897084",
    ptl_qty: 95,
    station: "SD01",
    box_tp: "Ca bé",
    trolley_tp: "Xe bé",
  },
  {
    id: "6",
    issue_ord_no: "K456789",
    material_no: "60984673",
    ptl_qty: 140,
    station: "SA03",
    box_tp: "Ca to",
    trolley_tp: "Xe to",
  },
  {
    id: "7",
    issue_ord_no: "K567890",
    material_no: "56789012",
    ptl_qty: 60,
    station: "SD02",
    box_tp: "Ca bé",
    trolley_tp: "Xe bé",
  },
  {
    id: "8",
    issue_ord_no: "K678901",
    material_no: "67890123",
    ptl_qty: 110,
    station: "SA04",
    box_tp: "Ca to",
    trolley_tp: "Xe to",
  },
  {
    id: "9",
    issue_ord_no: "K789012",
    material_no: "78901234",
    ptl_qty: 85,
    station: "SD03",
    box_tp: "Ca bé",
    trolley_tp: "Xe bé",
  },
  {
    id: "10",
    issue_ord_no: "K890123",
    material_no: "89012345",
    ptl_qty: 130,
    station: "SA05",
    box_tp: "Ca to",
    trolley_tp: "Xe to",
  },
  {
    id: "11",
    issue_ord_no: "K901234",
    material_no: "90123456",
    ptl_qty: 70,
    station: "SD04",
    box_tp: "Ca bé",
    trolley_tp: "Xe bé",
  },
  {
    id: "12",
    issue_ord_no: "K012345",
    material_no: "01234567",
    ptl_qty: 150,
    station: "SA06",
    box_tp: "Ca to",
    trolley_tp: "Xe to",
  },
  {
    id: "13",
    issue_ord_no: "K112233",
    material_no: "11223344",
    ptl_qty: 55,
    station: "SD05",
    box_tp: "Ca bé",
    trolley_tp: "Xe bé",
  },
  {
    id: "14",
    issue_ord_no: "K223344",
    material_no: "22334455",
    ptl_qty: 125,
    station: "SA07",
    box_tp: "Ca to",
    trolley_tp: "Xe to",
  },
  {
    id: "15",
    issue_ord_no: "K334455",
    material_no: "33445566",
    ptl_qty: 90,
    station: "SD06",
    box_tp: "Ca bé",
    trolley_tp: "Xe bé",
  },
  {
    id: "16",
    issue_ord_no: "K445566",
    material_no: "44556677",
    ptl_qty: 105,
    station: "SA08",
    box_tp: "Ca to",
    trolley_tp: "Xe to",
  },
  {
    id: "17",
    issue_ord_no: "K556677",
    material_no: "55667788",
    ptl_qty: 65,
    station: "SD07",
    box_tp: "Ca bé",
    trolley_tp: "Xe bé",
  },
  {
    id: "18",
    issue_ord_no: "K667788",
    material_no: "66778899",
    ptl_qty: 135,
    station: "SA09",
    box_tp: "Ca to",
    trolley_tp: "Xe to",
  },
  {
    id: "19",
    issue_ord_no: "K778899",
    material_no: "77889900",
    ptl_qty: 80,
    station: "SD08",
    box_tp: "Ca bé",
    trolley_tp: "Xe bé",
  },
  {
    id: "20",
    issue_ord_no: "K889900",
    material_no: "88990011",
    ptl_qty: 115,
    station: "SA10",
    box_tp: "Ca to",
    trolley_tp: "Xe to",
  },
  {
    id: "21",
    issue_ord_no: "K990011",
    material_no: "99001122",
    ptl_qty: 50,
    station: "SD09",
    box_tp: "Ca bé",
    trolley_tp: "Xe bé",
  },
  {
    id: "22",
    issue_ord_no: "K100112",
    material_no: "10011223",
    ptl_qty: 145,
    station: "SA11",
    box_tp: "Ca to",
    trolley_tp: "Xe to",
  },
];

interface TrolleyKitProps {
  ptlDataShow: PTLKitIssueDataItem[];
  title: string;
  kit: string;
}

const TrolleyKit: React.FC<TrolleyKitProps> = memo(
  ({ ptlDataShow: data, title, kit }) => {
    const ptlDataShow = data?.filter((item) => item?.issord_no === title) || [];

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-3">
        <h3 className="font-semibold text-center bg-blue-100 py-2 rounded text-xl flex justify-between px-3">
          <span>{kit}</span> <span>{title}</span>
        </h3>
        <div className="">
          <div className="h-[30vh] bg-red-50 p-2">
            {ptlDataShow && ptlDataShow.length > 0 ? (
              ptlDataShow
                .filter((item) => item?.type === "SA")
                .map((item, index) => (
                  <div
                    key={item?.id || index}
                    className={`${
                      (item?.picked_qty || 0) === (item?.ptl_qty || 0)
                        ? "bg-green-100"
                        : "bg-gray-50"
                    } mb-2 p-2 rounded border flex justify-between text-xl`}
                  >
                    <div className=" text-gray-600 ">
                      {item?.ptl_code || "N/A"}
                    </div>
                    <div className="">
                      {item?.picked_qty || 0}/{item?.ptl_qty || 0}
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                No SA data available
              </div>
            )}
          </div>
          <div className="h-[30vh] bg-green-50  p-2">
            {ptlDataShow && ptlDataShow.length > 0 ? (
              ptlDataShow
                .filter((item) => item?.type === "SD")
                .map((item, index) => (
                  <div
                    key={item?.id || index}
                    className={`${
                      (item?.picked_qty || 0) === (item?.ptl_qty || 0)
                        ? "bg-green-100"
                        : "bg-gray-50"
                    } mb-2 p-2 rounded border flex justify-between text-xl`}
                  >
                    <div className=" text-gray-600 ">
                      {item?.ptl_code || "N/A"}
                    </div>
                    <div className="">
                      {item?.picked_qty || 0}/{item?.ptl_qty || 0}
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                No SD data available
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
