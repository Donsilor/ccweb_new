import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient } from 'common/axios';
import _get from 'lodash/get';

const ACTION_LOADING = 'YICHAKU/EXUPLOADALL/LOADING';
const ACTION_FETCH_RESERVED_LIST = 'YICHAKU/EXUPLOADALL/FETCH_RESERVED_LIST ';
const ACTION_UPDATE_RESERVED_QUERY = 'YICHAKU/EXUPLOADALL/UPDATE_RESERVED_QUERY ';

const ACTION_FETCH_RECORD_LIST = 'YICHAKU/EXUPLOADALL/FETCH_RECORD_LIST ';
const ACTION_UPDATE_RECORD_QUERY = 'YICHAKU/EXUPLOADALL/UPDATE_RECORD_QUERY ';

const ACTION_FETCH_SELLDATA_LIST = 'YICHAKU/EXUPLOADALL/FETCH_SELLDATA_LIST ';
const ACTION_UPDATE_SELLDATA_QUERY = 'YICHAKU/EXUPLOADALL/UPDATE_SELLDATA_QUERY ';

const reducer = handleActions(
  {
    [ACTION_FETCH_RESERVED_LIST]: {
      next(state, action) {
        return {
          ...state,
          params_excelUpload: {
            ...state.params_excelUpload,
            list: _get(action.payload.data, 'data.list', []),
            paging: {
              current: _get(action.payload.data, 'data.pageNum', 1),
              pageSize: _get(action.payload.data, 'data.pageSize', 0),
              total: _get(action.payload.data, 'data.total', 1),
            },
          },
        };
      },
    },
    [ACTION_FETCH_RECORD_LIST]: {
      next(state, action) {
        return {
          ...state,
          params_carImports: {
            ...state.params_carImports,
            list: _get(action.payload.data, 'data.list', []),
            paging: {
              current: _get(action.payload.data, 'data.pageNum', 1),
              pageSize: _get(action.payload.data, 'data.pageSize', 10),
              total: _get(action.payload.data, 'data.total', 1),
            },
          },
        };
      },
    },
    [ACTION_FETCH_SELLDATA_LIST]: {
      next(state, action) {
        return {
          ...state,
          params_sell: {
            ...state.params_sell,
            list: _get(action.payload.data, 'data.list', []),
            paging: {
              current: _get(action.payload.data, 'data.pageNum', 1),
              pageSize: _get(action.payload.data, 'data.pageSize', 10),
              total: _get(action.payload.data, 'data.total', 1),
            },
          },
        };
      },
    },
    [ACTION_UPDATE_RESERVED_QUERY]: {
      next(state, action) {
        return {
          ...state,
          params_excelUpload: {
            ...state.params_excelUpload,
            query: {
              ...state.params_excelUpload.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [ACTION_UPDATE_RECORD_QUERY]: {
      next(state, action) {
        return {
          ...state,
          params_carImports: {
            ...state.params_carImports,
            query: {
              ...state.params_carImports.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [ACTION_UPDATE_SELLDATA_QUERY]: {
      next(state, action) {
        return {
          ...state,
          params_sell: {
            ...state.params_sell,
            query: {
              ...state.params_sell.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [ACTION_LOADING]: {
      next(state, action) {
        return {
          ...state,
          loading: action.loading,
        };
      },
    },
  },
  {
    params_excelUpload: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        selfcarForm: true,
      },
    },
    params_carImports: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        selfcarForm: true,
      },
    },
    params_sell: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        selfcarForm: true,
      },
    },
    loading: true,
  }
);
export default reducer;

export const FETCH_RESERVED_LIST = createAction(ACTION_FETCH_RESERVED_LIST, (data, paging) => {
  return httpCommonClient.postWithPaging('/self-car/v1.0/excelUpload/find/all/list', data, paging);
});
export const FETCH_RECORD_LIST = createAction(ACTION_FETCH_RECORD_LIST, (data, paging) => {
  return httpCommonClient.postWithPaging('/self-car/v1.0/carImports/find/all/list', data, paging);
});
export const FETCH_SELLDATA_LIST = createAction(ACTION_FETCH_SELLDATA_LIST, (data, paging) => {
  return httpCommonClient.postWithPaging(`/self-car/v1.0/carImports/find/all/list/sell/`, data, paging);
});

export const UPDATE_RESERVED_QUERY = createAction(ACTION_UPDATE_RESERVED_QUERY);
export const UPDATE_RECORD_QUERY = createAction(ACTION_UPDATE_RECORD_QUERY);
export const UPDATE_SELLDATA_QUERY = createAction(ACTION_UPDATE_SELLDATA_QUERY);
