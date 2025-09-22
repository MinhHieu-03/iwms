import wcsApiClient from "@/lib/wcsApiConfig";

const getDeviceType = async (payload: any) => {
  return await wcsApiClient.get(`/device/type`, payload);
};

const getDeviceInfo = async (payload: any) => {
  return await wcsApiClient.get(`/device`, payload);
};

const updateDevice = async (payload: any) => {
  return await wcsApiClient.patch(`/device`, payload);
};

const createDevice = async (payload: any) => {
  return await wcsApiClient.post(`/device`, payload);
};

const deleteDevice = async (payload: any) => {
  return await wcsApiClient.delete(`/device`, {}, payload);
};

const createMissionTemplate = async (payload: any) => {
  return await wcsApiClient.post(`/mission/template`, payload);
};

const deleteMissionTemplate = async (payload: any) => {
  return await wcsApiClient.delete(`/mission/template/${payload.id}`);
};

export {
  getDeviceType,
  getDeviceInfo,
  updateDevice,
  createDevice,
  deleteDevice,
  deleteMissionTemplate,
};
