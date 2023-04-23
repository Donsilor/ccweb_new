/*
 * @Author Osborn
 * @File index.ts
 * @Created Date 2018-06-28 18-08
 * @Last Modified: 2018-06-28 18-08
 * @Modified By: Osborn
 */

import axios from 'axios';
import qs from 'qs';
import {
  httpApiSettings,
  httpCommonSettings,
  httpFormSetting,
  httpBlobSetting,
  httpArraybufferSetting,
} from './config';
import { sessionExpired } from 'redux/modules/session';

const httpClient = axios.create(httpApiSettings);
export default httpClient;

export const httpCommonClient = axios.create(httpCommonSettings);

export const httpFormClient = axios.create(httpFormSetting);
export const httpBlobClient = axios.create(httpBlobSetting);
export const httpBufferClient = axios.create(httpArraybufferSetting);

if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, 'assign', {
    value: function assign(target, varArgs) {
      // .length of function is 2
      'use strict';
      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true,
  });
}

const formSubmit = client => (url, modelName, data = {}, { pageNum, pageSize } = {}) => {
  let formData = new FormData();
  Object.keys(data).forEach(key => {
    data[key] !== undefined &&
      data[key] !== null &&
      formData.append(`${modelName ? `${modelName}.${key}` : `${key}`}`, data[key]);
  });
  if (pageNum && pageSize) {
    formData.append('paging.pageNum', pageNum);
    formData.append('paging.pageSize', pageSize);
  }
  return client.post(url, formData);
};
const submit = client => (url, data) => {
  return client.post(url, data || {});
};
const deleteMeth = client => (url, data) => {
  return client.delete(url, { data: data || {} });
};
const getMeth = client => (url, data) => {
  return client.get(url, { params: data || {} });
};

const postWithPaging = client => (url, data = {}, { pageNum = 1, pageSize = 10 } = {}) => {
  url = `${url}?pageNum=${pageNum}&pageSize=${pageSize}`;
  return submit(client)(url, data);
};

const getWithPaging = client => (url, data = {}, { pageNum = 1, pageSize = 10 } = {}) => {
  url = `${url}?pageNum=${pageNum}&pageSize=${pageSize}`;
  return getMeth(client)(url, data);
};

httpFormClient.formSubmit = formSubmit(httpFormClient);
httpBlobClient.formSubmit = formSubmit(httpBlobClient);
httpCommonClient.postWithPaging = postWithPaging(httpCommonClient);
httpCommonClient.submit = submit(httpCommonClient);
httpCommonClient.deleteMeth = deleteMeth(httpCommonClient);
httpBufferClient.submit = submit(httpBufferClient);
httpCommonClient.getWithPaging = getWithPaging(httpCommonClient);

axios.interceptors.response.use(
  response => {
    const contentType = response.headers['content-type'];
    if (contentType.includes('text/html;')) {
      const error = new Error('接口错误');
      return Promise.reject(error);
    }
    return response;
  },
  error => {
    if (error && error.response) {
      if (error.response.status === 401) {
        sessionExpired();
      }
    }
    return Promise.reject(error);
  }
);
