import { devices, deviceTypes } from "./deviceData"
import { type MissionTemplate, type TaskData } from "@/components/mission_setting/mission_template/const"

// Assume `deviceTypes` and `devices` are already loaded from your data file

function generateFakeMissions(): MissionTemplate[] {
  const missions: MissionTemplate[] = [];

  for (let i = 0; i < 20; i++) {
    // Pick 2-4 random devices
    const selectedDevices = getRandomItems(devices, randomInt(2, 4));

    // Build tasks from selected devices and their deviceTypes
    const tasks: TaskData[] = [];

    selectedDevices.forEach((device) => {
      const deviceType = deviceTypes.find((dt) => dt.id === device.type);
      if (deviceType) {
        const selectedTasks = getRandomItems(deviceType.task, randomInt(1, 2));
        selectedTasks.forEach((task) => {
          tasks.push({
            id: `${task.id}-d${device.id}`,
            name: task.name,
            device: device.id,
            param: task.param,
          });
        });
      }
    });

    missions.push({
      id: `mission-${i + 1}`,
      name: `Mission Template ${i + 1}`,
      description: `This is a generated mission template #${i + 1}`,
      tasks,
      createAt: new Date().toISOString()
    });
  }

  return missions;
}

export const mission_templates = generateFakeMissions();

// Utility functions
function getRandomItems<T>(arr: T[], count: number): T[] {
  return arr.slice().sort(() => 0.5 - Math.random()).slice(0, count);
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

import { Node, Edge, MarkerType } from '@xyflow/react';

export const storageHierarchyNodes: Node[] = [
  {
    id: 'carton-1',
    type: 'default', 
    data: {
      label: 'Carton',
      task: "123456",
    },
    position: { x: 200, y: 200 },
    style: { 
      background: '#f3e5f5', 
      border: '2px solid #7b1fa2',
      borderRadius: '12px',
      padding: '10px',
      minWidth: '100px'
    }
  }
]