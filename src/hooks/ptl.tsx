import apiClient from "@/lib/axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { useCallback } from "react";

// Types
interface PTLKitIssueDataFilter {
  section_c?: string;
  line_c?: string;
  issord_no?: string;
  material_no?: string;
  station?: string;
  Trolley_ID?: string;
  Trolley_tp?: string;
  box_tp?: string;
  userid?: string;
  dateFrom?: string;
  dateTo?: string;
  [key: string]: any;
}

interface PTLKitIssueDataPaginationParams {
  limit?: number;
  page?: number;
}

export interface PTLKitIssueDataItem {
  id: string;
  section_c?: string;
  line_c?: string;
  issord_no?: string;
  material_no?: string;
  ptl_qty?: number;
  picked_qty?: number;
  type?: string;
  station?: string;
  Trolley_ID?: string;
  Trolley_tp?: string;
  box_tp?: string;
  data1?: string;
  data2?: string;
  data3?: string;
  data4?: string;
  userid?: string;
  ent_dt?: string;
  upd_dt?: string;
  [key: string]: any;
}

interface PTLKitIssueDataListResponse {
  metaData: PTLKitIssueDataItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface CreatePTLKitIssueDataRequest {
  section_c?: string;
  line_c?: string;
  issord_no?: string;
  material_no?: string;
  ptl_qty?: number;
  station?: string;
  Trolley_ID?: string;
  Trolley_tp?: string;
  box_tp?: string;
  data1?: string;
  data2?: string;
  data3?: string;
  data4?: string;
  userid?: string;
  [key: string]: any;
}

interface UpdatePTLKitIssueDataRequest {
  id: string;
  section_c?: string;
  line_c?: string;
  issord_no?: string;
  material_no?: string;
  ptl_qty?: number;
  station?: string;
  Trolley_ID?: string;
  Trolley_tp?: string;
  box_tp?: string;
  data1?: string;
  data2?: string;
  data3?: string;
  data4?: string;
  userid?: string;
  [key: string]: any;
}

interface BulkCreatePTLKitIssueDataRequest {
  data: CreatePTLKitIssueDataRequest[];
}

// Constants
const PTL_KIT_ISSUE_DATA_QUERY_KEYS = {
  all: ["ptl-kit-issue-data"] as const,
  lists: () => [...PTL_KIT_ISSUE_DATA_QUERY_KEYS.all, "list"] as const,
  list: (
    filter?: PTLKitIssueDataFilter,
    pagination?: PTLKitIssueDataPaginationParams
  ) =>
    [...PTL_KIT_ISSUE_DATA_QUERY_KEYS.lists(), { filter, pagination }] as const,
  detail: (id: string) =>
    [...PTL_KIT_ISSUE_DATA_QUERY_KEYS.all, "detail", id] as const,
  byIssordNo: (issord_no: string[]) =>
    [...PTL_KIT_ISSUE_DATA_QUERY_KEYS.all, "issord", { issord_no }] as const,
  byMaterialNo: (material_no: string) =>
    [...PTL_KIT_ISSUE_DATA_QUERY_KEYS.all, "material", material_no] as const,
  byTrolleyId: (trolley_id: string) =>
    [...PTL_KIT_ISSUE_DATA_QUERY_KEYS.all, "trolley", trolley_id] as const,
};

const DEFAULT_PAGINATION = {
  limit: 50,
  page: 1,
} as const;

// Hooks

/**
 * Fetch PTL kit issue data by issue order number
 */
export const usePTLKitIssueDataByIssordNo = (
  issord_no: string[],
  enabled: boolean = true
): UseQueryResult<PTLKitIssueDataItem[], Error> => {
  return useQuery({
    queryKey: PTL_KIT_ISSUE_DATA_QUERY_KEYS.byIssordNo(issord_no),
    queryFn: async (): Promise<PTLKitIssueDataItem[]> => {
      const { data } = await apiClient.post(`ptl/get-by-kits`, {
        kits: issord_no,
      });
      return data;
    },
    enabled: issord_no && issord_no.length > 0 && enabled,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
};

export const createPtlKitIssueData = () => {
  return useMutation({
    mutationFn: async (issord_nos: string[]): Promise<void> => {
      await apiClient.post(`ptl/by-kits`, { kits: issord_nos });
    },
    onSuccess: () => {
      // Invalidate and refetch
    },
  });
};
export const useUpdatePTL = () => {
  return useMutation({
    mutationFn: async ({
      id,
      picked_qty,
    }: {
      id: string;
      picked_qty: number;
    }): Promise<void> => {
      await apiClient.patch(`ptl/${id}`, { picked_qty });
    },
    onSuccess: () => {
      // Invalidate and refetch
    },
  });
};
