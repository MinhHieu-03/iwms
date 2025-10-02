
export interface MissionTemplate {
  id: string;
  name: string;
  description: string;
  category: 'inbound' | 'outbound' | 'transfer' | 'maintenance';
  estimatedDuration: number;
  steps: string[];
  created: string;
  modified: string;
  usageCount: number;
  successRate: number;
  json: {
    nodes: any[];
    edges: any[];
  };
}

// Import from the comprehensive robot missions data
import { mockMissionTemplates as comprehensiveTemplates } from './robotMissionsData';

// Convert to the simplified format for backward compatibility
export const missionTemplatesData: Record<string, MissionTemplate> = {};

comprehensiveTemplates.forEach(template => {
  missionTemplatesData[template.id] = {
    id: template.id,
    name: template.name,
    description: template.description,
    category: template.category,
    estimatedDuration: template.estimatedDuration,
    steps: template.steps.map(step => step.description),
    created: template.created,
    modified: template.modified,
    usageCount: template.usageCount,
    successRate: template.successRate,
    json: template.json
  };
});

export const getTemplateById = (id: string): MissionTemplate | undefined => {
  return missionTemplatesData[id];
};

export const getAllTemplates = (): MissionTemplate[] => {
  return Object.values(missionTemplatesData);
};
