import React from "react";
import { Popover } from "antd";
import { RackCellProps } from "./types";
import RackContent from "./RackContent";

const RackCell: React.FC<RackCellProps> = ({
  rack,
  isHighlighted,
  onRackClick,
  getRackStatusColor,
  locationData,
  col,
}) => {
  if (!rack) {
    return (
      <div
        key={`empty-${col}`}
        className="w-10 h-10 border border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-400"
      >
        -
      </div>
    );
  }

  return (
    <Popover content={<RackContent rack={rack} />} key={`${rack.id}-${col}`}>
      <button
        className={`
          w-10 h-10 flex items-center justify-center text-xs font-medium
          transition-all duration-200 ease-in-out rounded border
          ${getRackStatusColor(
            locationData?.[rack.locationCode],
            rack?.skus?.length > 0
          )}
          ${
            isHighlighted
              ? "ring-2 ring-warehouse-highlight scale-105 z-10 shadow-md"
              : "ring-1 ring-gray-200 dark:ring-gray-700"
          }
          hover:shadow-md relative
        `}
        onClick={() => onRackClick(rack.id)}
      >
        <span className="z-10">{col}</span>
      </button>
    </Popover>
  );
};

export default RackCell;
