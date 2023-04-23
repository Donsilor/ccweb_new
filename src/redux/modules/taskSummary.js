import { createAction, handleActions } from 'redux-actions';
import { httpFormClient, httpBlobClient } from 'common/axios';

// Actions

const LOADING = 'YICHAKU/TASKSUMMARY/LOADING';
const FETCHDATA_PLATFORM = 'YICHAKU/TASKSUMMARY/FETCHDATA_PLATFORM';
const FETCHDATA_PLATFORM_DETAIL = 'YICHAKU/TASKSUMMARY/FETCHDATA_PLATFORM_DETAIL';
const UPDATEQUERY_PLATFORM = 'YICHAKU/TASKSUMMARY/UPDATEQUERY_PLATFORM';

const FETCHDATA_RISK = 'YICHAKU/TASKSUMMARY/FETCHDATA_RISK';
const FETCHDATA_RISK_SUMMARY = 'YICHAKU/TASKSUMMARY/FETCHDATA_RISK_SUMMARY';
const FETCHDATA_RISK_DETAIL = 'YICHAKU/TASKSUMMARY/FETCHDATA_RISK_DETAIL';
const UPDATEQUERY_RISK = 'YICHAKU/TASKSUMMARY/UPDATEQUERY_RISK';

const FETCHDATA_CUSTOMER = 'YICHAKU/TASKSUMMARY/FETCHDATA_CUSTOMER';
const FETCHDATA_CUSTOMER_SUMMARY = 'YICHAKU/TASKSUMMARY/FETCHDATA_CUSTOMER_SUMMARY';
const FETCHDATA_CUSTOMER_DETAIL = 'YICHAKU/TASKSUMMARY/FETCHDATA_CUSTOMER_DETAIL';
const UPDATEQUERY_CUSTOMER = 'YICHAKU/TASKSUMMARY/UPDATEQUERY_CUSTOMER';

const EXPORT_DATA = 'YICHAKU/TASKSUMMARY/EXPORT_DATA';

// Reducer
const reducer = handleActions(
  {
    [FETCHDATA_PLATFORM]: {
      next(state, action) {
        return {
          ...state,
          platformData: {
            list: action.payload.data.list || [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
          },
        };
      },
    },
    [FETCHDATA_PLATFORM_DETAIL]: {
      next(state, action) {
        return {
          ...state,
          platformDataDetail: {
            list: action.payload.data.list || [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
          },
        };
      },
    },
    [UPDATEQUERY_PLATFORM]: {
      next(state, action) {
        return {
          ...state,
          platformQuery: {
            ...state.platformQuery,
            ...action.payload,
          },
        };
      },
    },
    [FETCHDATA_RISK]: {
      next(state, action) {
        return {
          ...state,
          riskData: {
            list: action.payload.data.list || [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
          },
        };
      },
    },
    [FETCHDATA_RISK_SUMMARY]: {
      next(state, action) {
        return {
          ...state,
          riskSummary: {
            total: action.payload.data.total,
            auto: action.payload.data.auto,
            manual: action.payload.data.manual,
          },
        };
      },
    },
    [FETCHDATA_RISK_DETAIL]: {
      next(state, action) {
        return {
          ...state,
          riskDataDetail: {
            list: action.payload.data.list || [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
          },
        };
      },
    },
    [UPDATEQUERY_RISK]: {
      next(state, action) {
        return {
          ...state,
          riskQuery: {
            ...state.riskQuery,
            ...action.payload,
          },
        };
      },
    },
    [FETCHDATA_CUSTOMER]: {
      next(state, action) {
        return {
          ...state,
          customerData: {
            list: action.payload.data.list || [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
          },
        };
      },
    },
    [FETCHDATA_CUSTOMER_SUMMARY]: {
      next(state, action) {
        return {
          ...state,
          customerSummary: {
            total: action.payload.data.total,
            auto: action.payload.data.auto,
            manual: action.payload.data.manual,
          },
        };
      },
    },
    [FETCHDATA_CUSTOMER_DETAIL]: {
      next(state, action) {
        return {
          ...state,
          customerDataDetail: {
            list: action.payload.data.list || [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
          },
        };
      },
    },
    [UPDATEQUERY_CUSTOMER]: {
      next(state, action) {
        return {
          ...state,
          customerQuery: {
            ...state.customerQuery,
            ...action.payload,
          },
        };
      },
    },
    [LOADING]: {
      next(state: any, action: any) {
        return {
          ...state,
          loading: action.loading,
        };
      },
    },
  },
  {
    platformData: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    platformQuery: {
      value: {},
      expandForm: false,
    },
    platformDataDetail: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    riskData: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    riskSummary: {
      total: 0,
      auto: 0,
      manual: 0,
    },
    riskQuery: {
      value: {},
      expandForm: false,
    },
    riskDataDetail: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    customerData: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    customerSummary: {
      total: 0,
      auto: 0,
      manual: 0,
    },
    customerQuery: {
      value: {},
      expandForm: false,
    },
    customerDataDetail: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    loading: true,
  }
);

export default reducer;

export const fetchPlatformData = createAction(FETCHDATA_PLATFORM, (data, paging) => {
  return httpFormClient.formSubmit('/TaskStatAction_searchPlatformTaskList', 'query', data, paging);
});
export const fetchPlatformDetail = createAction(FETCHDATA_PLATFORM_DETAIL, (data, paging) => {
  return httpFormClient.formSubmit('/TaskStatAction_searchPlatformTaskInfo', 'query', data, paging);
});
export const updatePlatformQuery = createAction(UPDATEQUERY_PLATFORM);

export const fetchRiskData = createAction(FETCHDATA_RISK, (data, paging) => {
  return httpFormClient.formSubmit('/TaskStatAction_searchRiskControlTaskList', '', data, paging);
});
export const fetchRiskSummary = createAction(FETCHDATA_RISK_SUMMARY, data => {
  return httpFormClient.formSubmit('/TaskStatAction_searchRiskControlTaskCount', '', data);
});
export const fetchRiskDetail = createAction(FETCHDATA_RISK_DETAIL, (data, paging) => {
  return httpFormClient.formSubmit('/TaskStatAction_searchRiskControlTaskInfo', '', data, paging);
});
export const updateRiskQuery = createAction(UPDATEQUERY_RISK);

export const fetchCustomerData = createAction(FETCHDATA_CUSTOMER, (data, paging) => {
  return httpFormClient.formSubmit('/TaskStatAction_searchAMTaskList', '', data, paging);
});
export const fetchCustomerSummary = createAction(FETCHDATA_CUSTOMER_SUMMARY, data => {
  return httpFormClient.formSubmit('/TaskStatAction_searchAMTaskCount', '', data);
});
export const fetchCustomerDetail = createAction(FETCHDATA_CUSTOMER_DETAIL, (data, paging) => {
  return httpFormClient.formSubmit('/TaskStatAction_searchAMTaskInfo', '', data, paging);
});
export const updateCustomerQuery = createAction(UPDATEQUERY_CUSTOMER);

export const exportData = createAction(EXPORT_DATA, (data, type) => {
  let url = '',
    query = '';
  switch (type) {
    case 'platform':
      url = 'TaskStatAction_exportPlatformTaskInfo';
      query = 'query';
      break;
    case 'risk':
      url = 'TaskStatAction_exportRiskControlTaskList';
      break;
    case 'customer':
      url = 'TaskStatAction_exportAMTaskList';
      break;
    default:
      break;
  }
  return url && httpBlobClient.formSubmit(url, query, data);
});
