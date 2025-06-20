import React from 'react';
import { Button, Modal, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { set } from 'date-fns';

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

  const {
    data: masterData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['master-data'],
    queryFn: async () => {
      const { data } = await apiClient.get('/master-data');
      return data.metaData;
    },
    enabled: open, // Only fetch when modal is open
  });

  const handleSubmit = () => {
    apiClient
      .patch('/location/bundle/create', {
        locationIds: selectedRacks,
        materials,
        area,
        rackId: rackIdentifier,
      })
      .then((response) => {
        console.log('Racks configured successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error configuring racks:', error);
      });

    onSubmit(selectedRacks);
  };

  const handleInactive = () => {
    console.log('Setting racks inactive:', selectedRacks);
    onInactive(selectedRacks);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      title='Configure Rack'
      footer={
        <div className='mt-4'>
          <Button type='primary' onClick={handleSubmit}>
            {t('submit')}
          </Button>
          <Button danger className='mx-2' onClick={handleInactive}>
            {t('inactive')}
          </Button>
          <Button onClick={handleCancel}>{t('cancel')}</Button>
        </div>
      }
    >
      <div className='p-4'>
        <p className='text-sm text-gray-600 mb-4'>Select Sku in Rack:</p>

        <div className='space-y-2'>
          <Select
            mode='multiple'
            placeholder='Select configuration options'
            className='w-full'
            loading={isLoading}
            value={materials}
            options={
              masterData?.map((item: { material_no: string }) => ({
                label: item.material_no,
                value: item.material_no,
              })) || []
            }
            onChange={setMaterials}
          />
          {error && (
            <p className='text-red-500 text-sm mt-2'>
              Error loading master data: {error.message}
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RackConfigurationModal;
