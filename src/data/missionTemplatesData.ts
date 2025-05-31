
export interface MissionTemplate {
  id: string;
  name: string;
  description: string;
  steps: string[];
  created: string;
  modified: string;
  json: {
    nodes: any[];
    edges: any[];
  };
}

export const missionTemplatesData: Record<string, MissionTemplate> = {
  "template1": {
    id: "template1",
    name: "Inventory Transfer",
    description: "Move items from one location to another",
    steps: ["Go to location A", "Pick items", "Go to location B", "Place items"],
    created: "2023-05-01T10:00:00",
    modified: "2023-05-05T14:30:00",
    json: {
      nodes: [
        { id: '1', position: { x: 100, y: 100 }, data: { label: 'Start' } },
        { id: '2', position: { x: 100, y: 200 }, data: { label: 'Go to location A' } },
        { id: '3', position: { x: 100, y: 300 }, data: { label: 'Pick items' } },
        { id: '4', position: { x: 100, y: 400 }, data: { label: 'Go to location B' } },
        { id: '5', position: { x: 100, y: 500 }, data: { label: 'Place items' } },
        { id: '6', position: { x: 100, y: 600 }, data: { label: 'End' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e4-5', source: '4', target: '5' },
        { id: 'e5-6', source: '5', target: '6' }
      ]
    }
  },
  "template2": {
    id: "template2",
    name: "Stock Replenishment",
    description: "Refill items from warehouse to shelf",
    steps: ["Get list", "Go to storage", "Collect items", "Go to shelf", "Place items"],
    created: "2023-05-02T11:20:00",
    modified: "2023-05-04T09:15:00",
    json: {
      nodes: [
        { id: '1', position: { x: 100, y: 100 }, data: { label: 'Start' } },
        { id: '2', position: { x: 100, y: 200 }, data: { label: 'Get list' } },
        { id: '3', position: { x: 100, y: 300 }, data: { label: 'Go to storage' } },
        { id: '4', position: { x: 100, y: 400 }, data: { label: 'Collect items' } },
        { id: '5', position: { x: 100, y: 500 }, data: { label: 'Go to shelf' } },
        { id: '6', position: { x: 100, y: 600 }, data: { label: 'Place items' } },
        { id: '7', position: { x: 100, y: 700 }, data: { label: 'End' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e4-5', source: '4', target: '5' },
        { id: 'e5-6', source: '5', target: '6' },
        { id: 'e6-7', source: '6', target: '7' }
      ]
    }
  },
};

export const getTemplateById = (id: string): MissionTemplate | undefined => {
  return missionTemplatesData[id];
};

export const getAllTemplates = (): MissionTemplate[] => {
  return Object.values(missionTemplatesData);
};
