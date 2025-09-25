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

const getMissionTemplate = async (payload: any) => {
  return await wcsApiClient.get(`/mission/template`, payload);
};

const patchMissionTemplate = async (payload: any, id: string) => {
  return await wcsApiClient.patch(`/mission/template/${id}`, payload);
};

const createMissionTemplate = async (payload: any) => {
  return await wcsApiClient.post(`/mission/template`, payload);
};

const deleteMissionTemplate = async (payload: any) => {
  return await wcsApiClient.delete(`/mission/template`, {}, { id: payload });
};

const runMissionApi = async (payload: any) => {
  return await wcsApiClient.post(`/mission`, payload);
};

export {
  getDeviceType,
  getDeviceInfo,
  updateDevice,
  createDevice,
  deleteDevice,
  deleteMissionTemplate,
  getMissionTemplate,
  patchMissionTemplate,
  createMissionTemplate,
  runMissionApi,
};
