import apiClient from '@/lib/axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

// Types
interface MatSuppMstFilter {
  supplier_c?: string;
  material_no?: string;
  supp_mat_no?: string;
  data_position?: string;
  userid?: string;
  dateFrom?: string;
  dateTo?: string;
  [key: string]: any;
}

interface MatSuppMstPaginationParams {
  limit?: number;
  page?: number;
}

export interface MatSuppMstItem {
  supplier_c: string;
  material_no: string;
  supp_mat_no?: string;
  data_position?: string;
  data1?: string;
  data2?: string;
  data3?: string;
  userid?: string;
  ent_dt?: string | Date;
  upd_dt?: string | Date;
  [key: string]: any;
}

interface MatSuppMstListResponse {
  metaData: MatSuppMstItem[];
  total: number;
  page: number;
  pageSize: number;
  message: string;
}

interface CreateMatSuppMstRequest {
  supplier_c: string;
  material_no: string;
  supp_mat_no?: string;
  data_position?: string;
  data1?: string;
  data2?: string;
  data3?: string;
  userid?: string;
}

interface UpdateMatSuppMstRequest {
  supplier_c?: string;
  material_no?: string;
  supp_mat_no?: string;
  data_position?: string;
  data1?: string;
  data2?: string;
  data3?: string;
  userid?: string;
}

// Constants
const MATSUPP_MST_QUERY_KEYS = {
  all: ['matsupp-mst'] as const,
  lists: () => [...MATSUPP_MST_QUERY_KEYS.all, 'list'] as const,
  list: (filter?: MatSuppMstFilter, pagination?: MatSuppMstPaginationParams) =>
    [...MATSUPP_MST_QUERY_KEYS.lists(), { filter, pagination }] as const,
  detail: (supplier_c: string, material_no: string) =>
    [...MATSUPP_MST_QUERY_KEYS.all, 'detail', supplier_c, material_no] as const,
  bySupplierCode: (supplier_c: string) =>
    [...MATSUPP_MST_QUERY_KEYS.all, 'supplier', supplier_c] as const,
  byMaterialNo: (material_no: string) =>
    [...MATSUPP_MST_QUERY_KEYS.all, 'material', material_no] as const,
};

const DEFAULT_PAGINATION = {
  limit: 10,
  page: 1,
} as const;

// Hooks

/**
 * Fetch all matsupp-mst data with optional query parameters
 */
export const useMatSuppMstAll = (): UseQueryResult<MatSuppMstItem[], Error> => {
  return useQuery({
    queryKey: ['matsupp-mst'],
    queryFn: async (): Promise<MatSuppMstItem[]> => {
      const { data } = await apiClient.get('matsupp-mst');
      return data.metaData || data;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
