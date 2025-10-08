import React from "react";
import { Button, Modal, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import { keyBy } from "lodash";

interface RackConfigurationModalProps {
  open: boolean;
  area: string;
  rackIdentifier: string;
  selectedRacks: string[];
  onCancel: () => void;
  onSubmit: (selectedRacks: string[]) => void;
  onInactive: (selectedRacks: string[]) => void;
}

const RackConfigurationModal: React.FC<RackConfigurationModalProps> = ({
  open,
  area,
  rackIdentifier,
  selectedRacks,
  onCancel,
  onSubmit,
  onInactive,
}) => {
  const { t } = useTranslation();
  const [materials, setMaterials] = React.useState<string[]>([]);
  const queryClient = useQueryClient();

  const {
    data: masterData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["material-mst"],
    queryFn: async () => {
      const { data } = await apiClient.get("/material-mst");
      if (data?.metaData?.length) {
        return keyBy(data?.metaData, "material_no");
      }
      return {};
    },
    enabled: open, // Only fetch when modal is open
    staleTime: 10 * 60 * 1000, // Data stays fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Cache for 10 minutes
  });

  const configureRacksMutation = useMutation({
    mutationFn: async (configData: {
      locationIds: string[];
      materials: string[];
      area: string;
      rackId: string;
    }) => {
      const { data } = await apiClient.patch(
        "/location/bundle/create",
        configData
      );
      return data;
    },
    onSuccess: (data) => {
      setMaterials([]);
      console.log("Racks configured successfully:", data);
      // Invalidate related queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["area-data"] });
      queryClient.invalidateQueries({ queryKey: ["location-area"] });
      onSubmit(selectedRacks);
    },
    onError: (error) => {
      console.error("Error configuring racks:", error);
    },
  });

  const handleSubmit = () => {
    configureRacksMutation.mutate({
      locationIds: selectedRacks,
      materials,
      area,
      rackId: rackIdentifier,
    });
  };

  const handleInactive = () => {
    console.log("Setting racks inactive:", selectedRacks);
    onInactive(selectedRacks);
  };

  const handleCancel = () => {
    setMaterials([]);
    onCancel();
  };
  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      maskClosable={false}
      title={t("configure_rack")}
      footer={
        <div className="mt-4">
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={configureRacksMutation.isPending}
            disabled={selectedRacks.length === 0 || materials.length === 0}
          >
            {t("submit")}
          </Button>
          {/* <Button danger className='mx-2' onClick={handleInactive}>
            {t('inactive')}
          </Button> */}
          <Button
            className="mx-2"
            onClick={handleCancel}
            disabled={configureRacksMutation.isPending}
          >
            {t("cancel")}
          </Button>
        </div>
      }
    >
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-4">{t("sku_cell")}</p>
        <div className="space-y-2">
          <Select
            mode="multiple"
            placeholder="Chọn danh sách vật tư cho vị trí"
            className="w-full"
            loading={isLoading}
            value={materials}
            options={
              Object.keys(masterData || {})?.map(( material_no) => ({
                label: material_no,
                value: material_no,
              })) || []
            }
            onChange={setMaterials}
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">
              Error loading master data: {error.message}
            </p>
          )}
          {configureRacksMutation.isError && (
            <p className="text-red-500 text-sm mt-2">
              Error configuring racks: {configureRacksMutation.error?.message}
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RackConfigurationModal;
