import apiClient from "@/lib/axios";
import { 
  useQuery, 
  useMutation, 
  useQueryClient,
  UseQueryResult,
  UseMutationResult
} from "@tanstack/react-query";
import { useCallback } from "react";

// Types
interface KitMergeFilter {
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  warehouseId?: string;
  materialCode?: string;
  [key: string]: any;
}

interface KitMergePaginationParams {
  limit?: number;
  page?: number;
}

interface KitMergeItem {
  id: string;
  materialCode: string;
  materialName: string;
  quantity: number;
  status: string;
  warehouseId: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

interface KitMergeListResponse {
  metaData: KitMergeItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface CreateKitMergeRequest {
  materialCode: string;
  quantity: number;
  warehouseId: string;
  [key: string]: any;
}

interface UpdateKitMergeRequest {
  id: string;
  materialCode?: string;
  quantity?: number;
  status?: string;
  [key: string]: any;
}

export const KIT_MERGE_STATUS = {
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
}

export const KIT_MERGE_TYPE = {
    STANDARD: 'STANDARD',
    ODD: 'ODD',
};

// Constants
const KIT_MERGE_QUERY_KEYS = {
  all: ['kit-merger'] as const,
  lists: () => [...KIT_MERGE_QUERY_KEYS.all, 'list'] as const,
  list: (filter?: KitMergeFilter, pagination?: KitMergePaginationParams) => 
    [...KIT_MERGE_QUERY_KEYS.lists(), { filter, pagination }] as const,
  detail: (id: string) => [...KIT_MERGE_QUERY_KEYS.all, 'detail', id] as const,
};

const DEFAULT_PAGINATION = {
  limit: 50,
  page: 1,
} as const;

// Hooks

/**
 * Fetch kit merge list with filtering and pagination
 */
export const useKitMergeQuery = (
  filter?: KitMergeFilter,
  pagination?: KitMergePaginationParams
): UseQueryResult<KitMergeListResponse, Error> => {
  const mergedPagination = { ...DEFAULT_PAGINATION, ...pagination };
  
  return useQuery({
    queryKey: KIT_MERGE_QUERY_KEYS.list(filter, mergedPagination),
    queryFn: async (): Promise<KitMergeListResponse> => {
      const { data } = await apiClient.post('kit-merger/list', {
        filter: filter || {},
        limit: mergedPagination.limit,
        page: mergedPagination.page,
      });
      return data;
    },
    retry: 2,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 1 * 60 * 1000, // 1 minute
  });
};

/**
 * Fetch single kit merge item by ID
 */
export const useKitMergeDetail = (
  id: string,
  enabled: boolean = true
): UseQueryResult<KitMergeItem, Error> => {
  return useQuery({
    queryKey: KIT_MERGE_QUERY_KEYS.detail(id),
    queryFn: async (): Promise<KitMergeItem> => {
      const { data } = await apiClient.get(`kit-merger/${id}`);
      return data;
    },
    enabled: Boolean(id) && enabled,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Create new kit merge item
 */
export const useCreateKitMerge = (): UseMutationResult<
  KitMergeItem,
  Error,
  CreateKitMergeRequest
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: CreateKitMergeRequest): Promise<KitMergeItem> => {
      const { data } = await apiClient.post('kit-merger/create', request);
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch kit merge lists
      queryClient.invalidateQueries({
        queryKey: KIT_MERGE_QUERY_KEYS.lists(),
      });
    },
    onError: (error) => {
      console.error('Failed to create kit merge:', error);
    },
  });
};

/**
 * Update existing kit merge item
 */
export const useUpdateKitMerge = (): UseMutationResult<
  KitMergeItem,
  Error,
  UpdateKitMergeRequest
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: UpdateKitMergeRequest): Promise<KitMergeItem> => {
      const { id, ...updateData } = request;
      const { data } = await apiClient.put(`kit-merger/${id}`, updateData);
      return data;
    },
    onSuccess: (data, variables) => {
      // Update the item in cache
      queryClient.setQueryData(
        KIT_MERGE_QUERY_KEYS.detail(variables.id),
        data
      );
      
      // Invalidate lists to reflect changes
      queryClient.invalidateQueries({
        queryKey: KIT_MERGE_QUERY_KEYS.lists(),
      });
    },
    onError: (error) => {
      console.error('Failed to update kit merge:', error);
    },
  });
};

/**
 * Delete kit merge item
 */
export const useDeleteKitMerge = (): UseMutationResult<
  void,
  Error,
  string
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await apiClient.delete(`kit-merger/${id}`);
    },
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({
        queryKey: KIT_MERGE_QUERY_KEYS.detail(deletedId),
      });
      
      // Invalidate lists
      queryClient.invalidateQueries({
        queryKey: KIT_MERGE_QUERY_KEYS.lists(),
      });
    },
    onError: (error) => {
      console.error('Failed to delete kit merge:', error);
    },
  });
};

/**
 * Prefetch kit merge list for better UX
 */
export const usePrefetchKitMergeList = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (filter?: KitMergeFilter, pagination?: KitMergePaginationParams) => {
      const mergedPagination = { ...DEFAULT_PAGINATION, ...pagination };
      
      queryClient.prefetchQuery({
        queryKey: KIT_MERGE_QUERY_KEYS.list(filter, mergedPagination),
        queryFn: async () => {
          const { data } = await apiClient.post('kit-merger/list', {
            filter: filter || {},
            limit: mergedPagination.limit,
            page: mergedPagination.page,
          });
          return data;
        },
        staleTime: 5 * 60 * 1000,
      });
    },
    [queryClient]
  );
};

/**
 * Utility hook for common kit merge operations
 */
export const useKitMergeOperations = () => {
  const queryClient = useQueryClient();

  const invalidateAll = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: KIT_MERGE_QUERY_KEYS.all,
    });
  }, [queryClient]);

  const invalidateLists = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: KIT_MERGE_QUERY_KEYS.lists(),
    });
  }, [queryClient]);

  const clearCache = useCallback(() => {
    queryClient.removeQueries({
      queryKey: KIT_MERGE_QUERY_KEYS.all,
    });
  }, [queryClient]);

  return {
    invalidateAll,
    invalidateLists,
    clearCache,
  };
};
