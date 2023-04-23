// export const BASE_URL = `http://${process.env.REACT_APP_SERVICE_HOST || 'localhost'}:${process.env.REACT_APP_SERVICE_PORT || '4000'}/`;
export const BASE_URL = '/';

const baseSetting = {
  timeout: 60 * 1000 * 30,
  withCredentials: true,
};
export const httpApiSettings = {
  baseURL: `${BASE_URL}api`,
  ...baseSetting,
};
export const httpCommonSettings = {
  baseURL: `${BASE_URL}`,
  headers: { 'Content-Type': 'application/json;charse=UTF-8' },
  ...baseSetting,
};

export const httpFormSetting = {
  baseURL: `${BASE_URL}`,
  headers: { 'Content-Type': 'multipart/form-data' },
  ...baseSetting,
};
export const httpBlobSetting = {
  baseURL: `${BASE_URL}`,
  headers: { 'Content-Type': 'multipart/form-data' },
  responseType: 'blob',
  ...baseSetting,
};
export const httpArraybufferSetting = {
  baseURL: `${BASE_URL}`,
  headers: { 'Content-Type': 'application/json;charse=UTF-8' },
  responseType: 'arraybuffer',
  ...baseSetting,
};

export const appName = 'YICHAKU';
export const maxFileSize = 10;
