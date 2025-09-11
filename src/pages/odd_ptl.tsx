import OutboundHeader from "@/components/OutboundHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { creatMissionData } from "@/lib/dummyData";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Input, message, Spin, Table } from "antd";
import { Eye, Plus } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

interface MissionData {
  _id: string;
  mission_no: string;
  package_no: string;
  material_no: string;
  quantity: number;
  supply_loc: string;
  receive_loc: string;
  robot_no: string;
  eta: string;
  status: string;
}

interface PTLData {
  id: string;
  issue_ord_no: string;
  material_no: string;
  ptl_qty: number;
  picked_qty?: number;
  station: string;
  box_tp: string;
  trolley_tp: string;
}
const OrdersTab: React.FC = () => {
  const [selectedGate, setSelectedGate] = useState("1");
  const handleGateChange = (gate: string) => {
    setSelectedGate(gate);
    console.log("Gate changed to:", gate);
  };
  const [missionData, setMissionData] = useState<MissionData[]>([]);

  const fetchData = async () => {
    try {
      const data = await creatMissionData();
      if (data && data.metaData) {
        setMissionData(data.metaData);
      }
    } catch (error) {
      console.error("Error fetching mission data:", error);
      setMissionData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-2">
      <OutboundHeader
        selectedGate={selectedGate}
        onGateChange={handleGateChange}
        title="OI chia lẻ hàng lẻ"
        type="ptl-odd"
      />
      <Card>
        <SplitOrder />
      </Card>
    </div>
  );
};

export default OrdersTab;

const SplitOrder: React.FC = () => {
  const [boxFounded, setCurrentBox] = useState<Partial<MissionData>>({});
  const [missionData, setMissionData] = useState<MissionData[]>([]);
  const [ptlData, setPtlData] = useState<PTLData[]>(ptlFakeData);
  const [sku, setSku] = useState<string>("");
  const [ptlDataShow, setPtlDataShow] = useState<PTLData[]>([]);

  const fetchData = async () => {
    try {
      const data = await creatMissionData();
      if (data && data.metaData) {
        setMissionData(data.metaData);
      }
    } catch (error) {
      console.error("Error fetching mission data:", error);
      setMissionData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refAction = useRef(null);
  const [value, setValue] = useState("");

  const handleFocus = () => {
    setTimeout(() => {
      refAction?.current?.focus();
    }, 500);
  };

  useEffect(() => {
    const currentRef = refAction.current;
    if (currentRef) {
      currentRef.focus();
      setTimeout(() => {
        if (currentRef && document.contains(currentRef)) {
          currentRef.focus();
        }
      }, 500);
    }

    return () => {
      // Cleanup to prevent focusing on unmounted components
      if (currentRef && document.activeElement === currentRef) {
        (document.activeElement as HTMLElement)?.blur();
      }
    };
  }, []);

  useEffect(() => {
    const currentRef = refAction.current;
    if (currentRef) {
      currentRef.focus();
      setTimeout(() => {
        if (currentRef && document.contains(currentRef)) {
          currentRef.focus();
        }
      }, 500);
    }

    return () => {
      // Cleanup to prevent focusing on unmounted components
      if (currentRef && document.activeElement === currentRef) {
        (document.activeElement as HTMLElement)?.blur();
      }
    };
  }, []);

  const handleAction = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setValue(value);
  };
  const [totalPicked, setTotalPicked] = useState(33);
  useEffect(() => {
    if (sku && ptlData && ptlData.length > 0) {
      const total = ptlData.filter((item) => item?.material_no === sku);
      setTotalPicked(total.reduce((sum, item) => sum + (item.ptl_qty || 0), 0));
      setPtlDataShow(ptlData.filter((item) => item?.material_no === sku));
    } else {
      setPtlDataShow([]);
    }
  }, [sku, ptlData]);

  const handleInputEnter = (value: string) => {
    if (value && value.length > 6) {
      setSku(value);
      const boxFounded = missionData.find(
        (item) => item?.material_no === value
      );
      setCurrentBox(boxFounded || {});
    } else if (value && !isNaN(Number(value))) {
      let total = Number(value);
      const clone = [...ptlDataShow];
      const index = clone.findIndex((item) => {
        if (item.ptl_qty === total) {
          item.picked_qty = total;

          return true;
        }
        return false;
      });
      if (index !== -1) {
        clone[index].picked_qty = total;
        setPtlDataShow([...clone]);
      } else {
        message.error("Không tìm thấy mã vật tư trong đơn hàng");
      }
    }
    setValue("");
  };

  return (
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

          {boxFounded?.material_no ? <div>
            <p className="text-3xl text-gray-900 font-bold mt-6 text-center">
              Thông tin vật tư
            </p>
            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="text-center">
                <p className="text-xl text-gray-500 font-semibold">Mã vật tư</p>
                <p className="font-bold text-2xl">
                  {boxFounded?.material_no || ""}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xl text-gray-500 font-semibold">Số lượng</p>
                <p className="font-bold text-2xl">
                  {totalPicked || "0"}
                </p>
              </div>
            </div>
          </div> : null}
        </div>
        <div className={`flex-1 bg-gray-100 p-4 rounded-lg`}>
          <p className="text-xl text-gray-500 font-semibold mb-5">
            Thông tin chia vật tư
          </p>
          <TrolleyKit
            ptlDataShow={ptlDataShow}
            title={<span>{boxFounded?.material_no || ""}</span>}
          />
        </div>
      </div>
    </div>
  );
};

const ptlFakeData = [
  {
    id: "1",
    issue_ord_no: "K365015",
    material_no: "60988953",
    ptl_qty: 16,
    picked_qty: 0,
    station: "SA01",
    box_tp: "Ca bé",
    trolley_tp: "Xe bé",
  },
  {
    id: "2",
    issue_ord_no: "K365005",
    material_no: "60988953",
    ptl_qty: 18,
    station: "SA02",
    box_tp: "Ca to",
    trolley_tp: "Xe bé",
  },
  {
    id: "3",
    issue_ord_no: "K365006",
    material_no: "60988954",
    ptl_qty: 45,
    station: "SD02",
    box_tp: "Ca to",
    trolley_tp: "Xe to",
  },
  {
    id: "4",
    issue_ord_no: "K365026",
    material_no: "60988954",
    ptl_qty: 35,
    station: "SD03",
    box_tp: "Ca to",
    trolley_tp: "Xe to",
  },
  {
    id: "5",
    issue_ord_no: "K365026",
    material_no: "60988954",
    ptl_qty: 30,
    station: "SD03",
    box_tp: "Ca to",
    trolley_tp: "Xe to",
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
  ptlDataShow: PTLData[];
  title: React.ReactNode;
}

const TrolleyKit: React.FC<TrolleyKitProps> = ({ ptlDataShow, title }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3">
      {/* <h3 className="font-semibold text-center bg-blue-100 py-2 rounded text-xl flex justify-between px-3">
        <span>{title}</span>
      </h3> */}
      <div className=" p-2">
        {ptlDataShow && ptlDataShow.length > 0 ? (
          ptlDataShow.map((item, index) => (
            <div
              key={item?.id || index}
              className={`${
                +(item?.picked_qty || 0) < +(item?.ptl_qty || 0)
                  ? "bg-gray-50"
                  : "bg-green-100"
              } mb-2 p-2 px-5 rounded border flex justify-between text-xl`}
            >
              <div className=" text-gray-600 ">
                {item?.issue_ord_no || "N/A"}
              </div>
              <div className="">
                {+(item?.picked_qty || 0)}/{+(item?.ptl_qty || 0)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">
            
          </div>
        )}
      </div>
    </div>
  );
};
