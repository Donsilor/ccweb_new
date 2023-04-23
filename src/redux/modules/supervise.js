import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient } from '../../common/axios';

// Actions
const FETCH_SUPERVISE_SETTING = 'YICHAKU/SUPERVISE/FETCH_SUPERVISE_SETTING';
const FETCH_SUPERVISE_SPECIAL = 'YICHAKU/SUPERVISE/FETCH_SUPERVISE_SPECIAL';
const FETCH_SUPERVISE_LOG_RECORD = 'YICHAKU/SUPERVISE/FETCH_SUPERVISE_LOG_RECORD';
const FETCH_SUPERVISE_LOG = 'YICHAKU/SUPERVISE/FETCH_SUPERVISE_LOG';
const FETCH_SUPERVISE_COMPANY_COUNT = 'YICHAKU/SUPERVISE/FETCH_SUPERVISE_COMPANY_COUNT';
const FETCH_SUPERVISE_IMPORT_RECORD = 'YICHAKU/SUPERVISE/FETCH_SUPERVISE_IMPORT_RECORD';
const FETCH_SUPERVISE_ALL_DEALER = 'YICHAKU/SUPERVISE/FETCH_SUPERVISE_ALL_DEALER';
const FETCH_AMOUNT_BY_DEALER = 'YICHAKU/SUPERVISE/FETCH_AMOUNT_BY_DEALER';
const FETCH_AMOUNT_BY_VEHICLE = 'YICHAKU/SUPERVISE/FETCH_AMOUNT_BY_VEHICLE';

const INSERT_SPECIAL_DEALER_INFO = 'YICHAKU/SUPERVISE/INSERT_SPECIAL_DEALER_INFO';

const UPDATE_SUPERVISE_SETTING = 'YICHAKU/SUPERVISE/UPDATE_SUPERVISE_SETTING';
const UPDATE_SUPERVISE_SPECIAL_QUERY = 'YICHAKU/SUPERVISE/UPDATE_SUPERVISE_SPECIAL_QUERY';
const UPDATE_SUPERVISE_LOG_QUERY = 'YICHAKU/SUPERVISE/UPDATE_SUPERVISE_LOG_QUERY';
const UPDATE_DEALER_AMOUNT_QUERY = 'YICHAKU/SUPERVISE/UPDATE_DEALER_AMOUNT_QUERY';
const UPDATE_VEHICLE_AMOUNT_QUERY = 'YICHAKU/SUPERVISE/UPDATE_VEHICLE_AMOUNT_QUERY';

const DELETE_SPECIAL_IMPORT_RECORD = 'YICHAKU/SUPERVISE/DELETE_SPECIAL_IMPORT_RECORD';

const CREATE_SUPERVISE = 'YICHAKU/SUPERVISE/CREATE_SUPERVISE';
const CONFIRM_SUPERVISE = 'YICHAKU/SUPERVISE/CONFIRM_SUPERVISE';

const LOADING = 'YICHAKU/SUPERVISE/LOADING';

// Reducer
const reducer = handleActions(
  {
    [FETCH_SUPERVISE_SETTING]: {
      next(state, action) {
        return {
          ...state,
          param: action.payload.data.data || {},
        };
      },
    },
    [FETCH_SUPERVISE_IMPORT_RECORD]: {
      next(state, action) {
        return {
          ...state,
          importRecord: {
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
    [FETCH_SUPERVISE_SPECIAL]: {
      next(state, action) {
        return {
          ...state,
          special: {
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
    [FETCH_SUPERVISE_LOG_RECORD]: {
      next(state, action) {
        return {
          ...state,
          logRecord: {
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
    [FETCH_SUPERVISE_COMPANY_COUNT]: {
      next(state, action) {
        return {
          ...state,
          company: {
            list: action.payload.data.list || [],
          },
        };
      },
    },
    [FETCH_AMOUNT_BY_DEALER]: {
      next(state, action) {
        return {
          ...state,
          dealerAmount: {
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
    [FETCH_AMOUNT_BY_VEHICLE]: {
      next(state, action) {
        return {
          ...state,
          vehicleAmount: {
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
    [UPDATE_SUPERVISE_SETTING]: {
      next(state, action) {
        return {
          ...state,
          param: action.payload.data.data || {},
        };
      },
    },
    [UPDATE_SUPERVISE_SPECIAL_QUERY]: {
      next(state, action) {
        return {
          ...state,
          ...{
            specialQuery: {
              ...state.specialQuery,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_SUPERVISE_LOG_QUERY]: {
      next(state, action) {
        return {
          ...state,
          ...{
            logRecordQuery: {
              ...state.logRecordQuery,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_DEALER_AMOUNT_QUERY]: {
      next(state, action) {
        return {
          ...state,
          ...{
            dealerAmountQuery: {
              ...state.dealerAmountQuery,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_VEHICLE_AMOUNT_QUERY]: {
      next(state, action) {
        return {
          ...state,
          ...{
            vehicleAmountQuery: {
              ...state.vehicleAmountQuery,
              ...action.payload,
            },
          },
        };
      },
    },

    [LOADING]: {
      next(state, action) {
        return {
          ...state,
          loading: action.loading,
        };
      },
    },
  },
  {
    loading: true,
    param: {},
    special: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    specialQuery: {
      value: {},
      expandForm: false,
    },
    logRecord: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    logRecordQuery: {
      value: {},
      expandForm: false,
    },
    company: {
      list: [],
    },
    importRecord: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    dealerAmount: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    vehicleAmount: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    dealerAmountQuery: {
      value: {
        theMonth: '',
      },
      expandForm: false,
    },
    vehicleAmountQuery: {
      value: {
        theMonth: '',
      },
      expandForm: false,
    },
  }
);

export default reducer;

export const fetchSuperviseSetting = createAction(FETCH_SUPERVISE_SETTING, () => {
  let url = '/SuperviseAction_getParam';
  return httpCommonClient.post(url, null);
});
export const fetchSuperviseImportRecord = createAction(FETCH_SUPERVISE_IMPORT_RECORD, paging => {
  let url = '/SuperviseAction_getImportRecord';
  return httpCommonClient.post(url, { ...paging });
});
export const fetchSuperviseSpecial = createAction(FETCH_SUPERVISE_SPECIAL, (data, paging) => {
  let url = '/SuperviseAction_getSpecialDealer';
  return httpCommonClient.post(url, { ...data, ...paging });
});
export const fetchSuperviseLogRecord = createAction(FETCH_SUPERVISE_LOG_RECORD, (data, paging) => {
  let url = '/SuperviseAction_getLogRecord';
  return httpCommonClient.post(url, { ...data, ...paging });
});
export const fetchSuperviseLog = createAction(FETCH_SUPERVISE_LOG, (data, paging) => {
  let url = '/SuperviseAction_getLog';
  return httpCommonClient.post(url, { ...data, ...paging });
});
export const fetchSuperviseCompanyCount = createAction(FETCH_SUPERVISE_COMPANY_COUNT, () => {
  let url = '/SuperviseAction_getCompanyCount';
  return httpCommonClient.post(url, {});
});
export const fetchSuperviseAllDealer = createAction(FETCH_SUPERVISE_ALL_DEALER, () => {
  let url = '/SuperviseAction_allSpecialDealer';
  return httpCommonClient.post(url, {});
});
export const fetchDealerAmount = createAction(FETCH_AMOUNT_BY_DEALER, (data, paging) => {
  let url = '/SuperviseAction_dealerAmount';
  return httpCommonClient.post(url, { ...data, ...paging });
});
export const fetchVehicleAmount = createAction(FETCH_AMOUNT_BY_VEHICLE, (data, paging) => {
  let url = '/SuperviseAction_vehicleAmount';
  return httpCommonClient.post(url, { ...data, ...paging });
});

export const insertOrUpdateSpecialDealerInfo = createAction(INSERT_SPECIAL_DEALER_INFO, data => {
  return httpCommonClient.post('/SuperviseAction_updateSpecialDealer', data);
});

export const updateSuperviseSetting = createAction(UPDATE_SUPERVISE_SETTING, value => {
  let url = '/SuperviseAction_updateParam';
  return httpCommonClient.post(url, { ...value });
});
export const updateSuperviseSpecialQuery = createAction(UPDATE_SUPERVISE_SPECIAL_QUERY);
export const updateSuperviseLogQuery = createAction(UPDATE_SUPERVISE_LOG_QUERY);
export const updateDealerAmountQuery = createAction(UPDATE_DEALER_AMOUNT_QUERY);
export const updateVehicleAmountQuery = createAction(UPDATE_VEHICLE_AMOUNT_QUERY);

export const deleteImportRecord = createAction(DELETE_SPECIAL_IMPORT_RECORD, data => {
  return httpCommonClient.post('/SuperviseAction_deleteImportRecord', data);
});
export const createSupervision = createAction(CREATE_SUPERVISE, () => {
  return httpCommonClient.post('/SuperviseAction_generateSupervision', {});
});
export const confirmSupervision = createAction(CONFIRM_SUPERVISE, data => {
  return httpCommonClient.post('/SuperviseAction_confirmSupervision', data);
});
