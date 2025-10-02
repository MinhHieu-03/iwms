// /mission/kit-merge/
import apiClient from "@/lib/axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";

// Types
export interface MissionKitMergeItem {
  id?: string;
  _id?: string;
  kit_no: string[];
  planned_issue_date: Date[];
  warehouse_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

// Constants
const MISSION_KIT_MERGE_QUERY_KEYS = {
  all: ['mission-kit-merge'] as const,
  detail: (id: string) => [...MISSION_KIT_MERGE_QUERY_KEYS.all, 'detail', id] as const,
};

// Hooks

/**
 * Fetch mission kit-merge item by ID
 */
export const useMissionKitMergeDetail = (
  id: string,
  enabled: boolean = true
): UseQueryResult<MissionKitMergeItem, Error> => {
  return useQuery({
    queryKey: MISSION_KIT_MERGE_QUERY_KEYS.detail(id),
    queryFn: async (): Promise<MissionKitMergeItem> => {
      const { data } = await apiClient.get(`/mission/kit-merge/${id}`);
      return data;
    },
    enabled: Boolean(id) && enabled,
    retry: 2,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};


