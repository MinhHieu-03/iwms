
import React from "react";
import { cn } from "@/lib/utils";
import { getStatusColor } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded-full text-xs font-medium",
        getStatusColor(status),
        className
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
