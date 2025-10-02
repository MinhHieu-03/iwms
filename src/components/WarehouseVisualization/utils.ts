import { Rack } from "@/data/warehouseData";

export const generateCellId = (rackId: string, row: number, col: number): string => {
  const rowStr = row.toString().padStart(2, "0");
  const colStr = col.toString().padStart(2, "0");
  return `${rackId}/${rowStr}-${colStr}`;
};

export const getRackIds = (
  rackId: string,
  rackGrid: Map<string, Rack>,
  maxRow: number,
  maxCol: number,
  type: "row" | "column",
  index: number
): string[] => {
  const ids: string[] = [];

  if (type === "row") {
    for (let col = 1; col <= maxCol; col++) {
      const cellId = generateCellId(rackId, index, col);
      const rackData = rackGrid.get(cellId);
      if (rackData) {
        ids.push(rackData.id);
      }
    }
  } else {
    for (let row = 1; row <= maxRow; row++) {
      const cellId = generateCellId(rackId, row, index);
      const rackData = rackGrid.get(cellId);
      if (rackData) {
        ids.push(rackData.id);
      }
    }
  }

  return ids;
};

export const isAllSelected = (ids: string[], selectedIds: string[]): boolean => {
  return ids.length > 0 && ids.every((id) => selectedIds.includes(id));
};
