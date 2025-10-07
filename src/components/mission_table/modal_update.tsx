import { Modal, Form, Input, Select, InputNumber, Button, Divider } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MISSION_STATUS, MISSION_TYPE, MissionDataType } from "./const";

const { TextArea } = Input;

export interface FormValues {
  mission_code: string;
  robot_code?: string;
  origin?: string;
  destination?: string;
  description?: string;
  bin_id?: string;
  inventory_material_no?: string;
  inventory_qty?: number;
  inventory_qty_available?: number;
  inventory_id?: string;
  kit_merger?: string;
  status?: MISSION_STATUS;
  type: MISSION_TYPE;
  ETA?: number;
}

interface ModalEditProps {
  isOpen: boolean;
  data: MissionDataType | Record<string, unknown>;
  onClose: () => void;
  onFinish: (values: FormValues) => void;
  loading: boolean;
}

const ModalEdit = ({ isOpen, data, onClose, onFinish, loading }: ModalEditProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
  };

  const handleFinish = (values: FormValues) => {
    // Transform inventory data
    const payload = {
      ...values,
      inventory: {
        material_no: values.inventory_material_no,
        qty: values.inventory_qty,
        qty_available: values.inventory_qty_available,
      },
    };
    onFinish(payload);
  };

  useEffect(() => {
    if (isOpen && data) {
      const missionData = data as MissionDataType;
      form.setFieldsValue({
        mission_code: missionData.mission_code,
        robot_code: missionData.robot_code,
        origin: missionData.origin,
        destination: missionData.destination,
        description: missionData.description,
        bin_id: missionData.bin_id,
        inventory_material_no: missionData.inventory?.material_no,
        inventory_qty: missionData.inventory?.qty,
        inventory_qty_available: missionData.inventory?.qty_available,
        inventory_id: missionData.inventory_id,
        kit_merger: missionData.kit_merger,
        status: missionData.status,
        type: missionData.type,
        ETA: missionData.ETA,
      });
    }
  }, [isOpen, data, form]);

  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
    }
  }, [isOpen, form]);

  const missionTypeOptions = [
    { label: t("mission.type.inbound"), value: MISSION_TYPE.INBOUND },
    { label: t("mission.type.outbound"), value: MISSION_TYPE.OUTBOUND },
    { label: t("mission.type.internal"), value: MISSION_TYPE.INTERNAL },
    { label: t("mission.type.back_whs"), value: MISSION_TYPE.BACK_WHS },
    { label: t("mission.type.transfer_gate"), value: MISSION_TYPE.TRANSFER_GATE },
  ];

  const missionStateOptions = [
    { label: t("mission.state.new"), value: MISSION_STATUS.NEW },
    { label: t("mission.state.processing"), value: MISSION_STATUS.PROCESSING },
    { label: t("mission.state.done"), value: MISSION_STATUS.DONE },
    { label: t("mission.state.error"), value: MISSION_STATUS.ERROR },
    { label: t("mission.state.done_picking"), value: MISSION_STATUS.DONE_PICKING },
  ];

  return (
    <Modal
      title={t("mission.edit_title")}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          {t("common.cancel")}
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          {t("common.update")}
        </Button>,
      ]}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          name="mission_code"
          label={t("mission.mission_code")}
          rules={[
            {
              required: true,
              message: t("mission.mission_code_required"),
            },
          ]}
        >
          <Input placeholder={t("mission.mission_code_placeholder")} />
        </Form.Item>

        <Form.Item
          name="type"
          label={t("mission.type")}
          rules={[
            {
              required: true,
              message: t("mission.type_required"),
            },
          ]}
        >
          <Select
            placeholder={t("mission.type_placeholder")}
            options={missionTypeOptions}
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="robot_code"
            label={t("mission.robot_code")}
          >
            <Input placeholder={t("mission.robot_code_placeholder")} />
          </Form.Item>

          <Form.Item
            name="bin_id"
            label={t("mission.bin_id")}
          >
            <Input placeholder={t("mission.bin_id_placeholder")} />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="origin"
            label={t("mission.origin")}
          >
            <Input placeholder={t("mission.origin_placeholder")} />
          </Form.Item>

          <Form.Item
            name="destination"
            label={t("mission.destination")}
          >
            <Input placeholder={t("mission.destination_placeholder")} />
          </Form.Item>
        </div>

        <Form.Item
          name="description"
          label={t("mission.description")}
        >
          <TextArea 
            rows={3} 
            placeholder={t("mission.description_placeholder")} 
          />
        </Form.Item>

        <Divider>{t("mission.inventory_section")}</Divider>

        <Form.Item
          name="inventory_material_no"
          label={t("mission.inventory_material_no")}
        >
          <Input placeholder={t("mission.inventory_material_no_placeholder")} />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="inventory_qty"
            label={t("mission.inventory_qty")}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder={t("mission.inventory_qty_placeholder")}
            />
          </Form.Item>

          <Form.Item
            name="inventory_qty_available"
            label={t("mission.inventory_qty_available")}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder={t("mission.inventory_qty_available_placeholder")}
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="status"
            label={t("mission.state")}
          >
            <Select
              placeholder={t("mission.state_placeholder")}
              options={missionStateOptions}
            />
          </Form.Item>

          <Form.Item
            name="ETA"
            label={t("mission.eta")}
          >
            <InputNumber
              min={1}
              style={{ width: "100%" }}
              placeholder={t("mission.eta_placeholder")}
              addonAfter="minutes"
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalEdit;