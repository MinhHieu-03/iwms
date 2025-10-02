import React, { useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import apiClient from "@/lib/axios";
import { Button, Skeleton, Checkbox } from "antd";
import { get, keyBy } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { RackGridProps } from "./types";
import { STATUS_LOCATION, STATUS_COLOR } from "./constants";
import { generateCellId, getRackIds, isAllSelected } from "./utils";
import RackConfigurationModal from "./RackConfigurationModal";
import RackCell from "./RackCell";

const RackGrid: React.FC<RackGridProps> = ({ rackId, racks, area, index }) => {
  const { t } = useTranslation();
  const [highlightedRack, setHighlightedRack] = React.useState<string[]>([]);
  const [showConfigure, setShowConfigure] = React.useState<string[]>([]);

  const { maxRow, maxCol, rackIdentifier, rackGrid } = useMemo(() => {
    const maxRow = Math.max(...racks.map((r) => r.row), 0);
    const maxCol = Math.max(...racks.map((r) => r.column), 0);
    const rackIdentifier = get(racks[0], "_id", "");

    const rackGrid = new Map<string, any>();
    racks.forEach((rack) => {
      rackGrid.set(rack.locationCode, rack);
    });

    return { maxRow, maxCol, rackIdentifier, rackGrid };
  }, [racks]);

  const {
    data: locationData,
    isLoading: isLocationLoading,
    error: locationError,
  } = useQuery({
    queryKey: ["location-area", rackIdentifier],
    queryFn: async () => {
      const { data } = await apiClient.get(`/location/area/${rackIdentifier}`);
      return keyBy(data.metaData, "code");
    },
    enabled: !!rackIdentifier,
    refetchInterval: 10 * 1000,
  });

  // Actions
  const onRackClick = (rackId: string) => {
    setHighlightedRack((prev) =>
      prev.includes(rackId)
        ? prev.filter((id) => id !== rackId)
        : [...prev, rackId]
    );
  };

  const onRowSelect = (row: number) => {
    const rowRackIds = getRackIds(rackId, rackGrid, maxRow, maxCol, "row", row);
    const allRowRacksSelected = isAllSelected(rowRackIds, highlightedRack);

    setHighlightedRack((prev) => {
      if (allRowRacksSelected) {
        return prev.filter((id) => !rowRackIds.includes(id));
      } else {
        const newSelected = [...prev];
        rowRackIds.forEach((id) => {
          if (!newSelected.includes(id)) {
            newSelected.push(id);
          }
        });
        return newSelected;
      }
    });
  };

  const onColumnSelect = (col: number) => {
    const colRackIds = getRackIds(
      rackId,
      rackGrid,
      maxRow,
      maxCol,
      "column",
      col
    );
    const allColRacksSelected = isAllSelected(colRackIds, highlightedRack);

    setHighlightedRack((prev) => {
      if (allColRacksSelected) {
        return prev.filter((id) => !colRackIds.includes(id));
      } else {
        const newSelected = [...prev];
        colRackIds.forEach((id) => {
          if (!newSelected.includes(id)) {
            newSelected.push(id);
          }
        });
        return newSelected;
      }
    });
  };

  const getRackStatusColor = (
    locationData: any,
    configured: boolean
  ): string => {
    const status = locationData?.status || STATUS_LOCATION.AVAILABLE;

    if (configured && status === STATUS_LOCATION.AVAILABLE) {
      return STATUS_COLOR[STATUS_LOCATION.CONFIGURED];
    }

    return STATUS_COLOR[status] || "bg-gray-100";
  };

  const handleConfigureRack = () => {
    setShowConfigure(highlightedRack);
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">
              {t("rack")} {rackId}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              ({racks.length} {t("positions")} • {maxRow} {t("rows")} × {maxCol}{" "}
              {t("columns")})
            </div>
          </div>
          <div>
            {highlightedRack.length > 0 && (
              <Button onClick={handleConfigureRack}>
                {t("configure_rack")}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="text-xs font-medium text-muted-foreground w-8" />
            <div className="flex gap-1">
              {Array.from({ length: maxCol }, (_, colIndex) => {
                const col = colIndex + 1;
                const colRackIds = getRackIds(
                  rackId,
                  rackGrid,
                  maxRow,
                  maxCol,
                  "column",
                  col
                );
                const isColumnSelected = isAllSelected(
                  colRackIds,
                  highlightedRack
                );

                return (
                  <div key={col} className="w-10">
                    <Checkbox
                      checked={isColumnSelected}
                      onChange={() => onColumnSelect(col)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {Array.from({ length: maxRow }, (_, rowIndex) => {
            const row = rowIndex + 1;
            return (
              <div
                key={`row-${row}-${highlightedRack.length}`}
                className="flex items-center gap-2"
              >
                <div className="text-xs font-medium text-muted-foreground w-8">
                  H{row}
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: maxCol }, (_, colIndex) => {
                    const col = colIndex + 1;
                    const cellId = generateCellId(rackId, row, col);
                    const rackData = rackGrid.get(cellId);
                    const rackStatus = get(locationData, cellId, {
                      status: STATUS_LOCATION.AVAILABLE,
                    });

                    if (
                      rackStatus.status === STATUS_LOCATION.AVAILABLE &&
                      rackData?.skus?.length
                    ) {
                      rackStatus.status = STATUS_LOCATION.CONFIGURED;
                    }

                    const rack = {
                      ...rackData,
                      ...rackStatus,
                    };

                    const isHighlighted = highlightedRack.includes(rack?.id);
                    
                    return (
                      <RackCell
                        key={`${row}-${col}`}
                        rack={rack}
                        isHighlighted={isHighlighted}
                        onRackClick={onRackClick}
                        getRackStatusColor={getRackStatusColor}
                        locationData={locationData}
                        col={col}
                      />
                    );
                  })}
                </div>
                <Checkbox
                  checked={(() => {
                    const rowRackIds = getRackIds(
                      rackId,
                      rackGrid,
                      maxRow,
                      maxCol,
                      "row",
                      row
                    );
                    return isAllSelected(rowRackIds, highlightedRack);
                  })()}
                  onChange={() => onRowSelect(row)}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
      <RackConfigurationModal
        area={area}
        rackIdentifier={rackIdentifier}
        open={showConfigure.length > 0}
        selectedRacks={showConfigure}
        onCancel={() => setShowConfigure([])}
        onSubmit={(selectedRacks) => {
          setShowConfigure([]);
          setHighlightedRack([]);
        }}
        onInactive={(selectedRacks) => {
          setShowConfigure([]);
          setHighlightedRack([]);
        }}
      />
    </Card>
  );
};

export default RackGrid;
