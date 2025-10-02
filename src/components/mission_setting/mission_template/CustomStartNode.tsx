import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";

interface CustomNodeData {
  label: string;
}

const CustomStartNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as CustomNodeData;
  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md bg-green-50 border-2 ${
        selected ? "border-green-500" : "border-green-300"
      }`}
      style={{
        minWidth: "120px",
        textAlign: "center",
      }}
    >
      {/* No top handle - this is a start node */}
      <div className="text-sm font-medium text-green-900">{nodeData.label}</div>
      <div className="flex justify-center text-xs text-green-600 mt-2">
        <span>START</span>
      </div>
      {/* Single bottom handle - output */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="output-start"
        style={{
          background: "#22c55e",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          left: "50%",
        }}
      />
    </div>
  );
};

export const CustomEndNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as CustomNodeData;
  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md bg-red-50 border-2 ${
        selected ? "border-red-500" : "border-red-300"
      }`}
      style={{
        minWidth: "120px",
        textAlign: "center",
      }}
    >
      {/* No top handle - this is a start node */}
      <div className="text-sm font-medium text-red-900">{nodeData.label}</div>
      <div className="flex justify-center text-xs text-red-600 mt-2">
        <span>END</span>
      </div>
      {/* Single bottom handle - output */}
      <Handle
        type="target"
        position={Position.Top}
        id="input-end"
        style={{
          background: "#22c55e",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          left: "50%",
        }}
      />
    </div>
  );
};

export default CustomStartNode;
