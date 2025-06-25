import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";

interface CustomNodeData {
  label: string;
}

const CustomStorageNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as CustomNodeData;
  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md bg-white border-2 ${
        selected ? "border-blue-500" : "border-gray-300"
      }`}
      style={{
        minWidth: "120px",
        textAlign: "center",
      }}
    >
      {/* Top handle - input */}
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: "#3b82f6",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
        }}
      />
      <div className="text-sm font-medium text-gray-900">{nodeData.label}</div>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span style={{ width: "33.33%", textAlign: "center" }}>OK</span>
        <span style={{ width: "33.33%", textAlign: "center" }}>TO</span>
        <span style={{ width: "33.33%", textAlign: "center" }}>NG</span>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="output-1"
        style={{
          background: "#3b82f6",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          left: "25%",
        }}
      >
        
      </Handle>
      <Handle
        type="source"
        position={Position.Bottom}
        id="output-2"
        style={{
          background: "#3b82f6",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          left: "50%",
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="output-3"
        style={{
          background: "#3b82f6",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          left: "75%",
        }}
      />
    </div>
  );
};

export default CustomStorageNode;
