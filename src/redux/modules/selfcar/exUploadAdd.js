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
          reserved_add: {
            ...state.reserved_add,
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
    [ACTION_FETCH_RECORD_LIST]: {
      next(state, action) {
        return {
          ...state,
          reserved_sell: {
            ...state.reserved_sell,
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
          reserved_list: {
            ...state.reserved_list,
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
          reserved_add: {
            ...state.reserved_add,
            query: {
              ...state.reserved_add.query,
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
          reserved_sell: {
            ...state.reserved_sell,
            query: {
              ...state.reserved_sell.query,
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
          reserved_list: {
            ...state.reserved_list,
            query: {
              ...state.reserved_list.query,
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
    reserved_add: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        selfcarForm: true,
      },
    },
    reserved_sell: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        selfcarForm: true,
      },
    },
    reserved_list: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        selfcarForm: true,
      },
    },
    loading: true,
  }
);
export default reducer;

export const FETCH_RESERVED_LIST = createAction(ACTION_FETCH_RESERVED_LIST, (data, paging) => {
  return httpCommonClient.postWithPaging('/self-car/v1.0/excelUpload/find/inc/list', data, paging);
});
export const FETCH_SELL_LIST = createAction(ACTION_FETCH_RECORD_LIST, (data, paging) => {
  return httpCommonClient.postWithPaging('/self-car/v1.0/excelUpload/find/inc/list', data, paging);
});
export const FETCH_SELLDATA_LIST = createAction(ACTION_FETCH_SELLDATA_LIST, (data, paging) => {
  return httpCommonClient.postWithPaging(`/self-car/v1.0/carImports/find/inc/list`, data, paging);
});

export const UPDATE_RESERVED_QUERY = createAction(ACTION_UPDATE_RESERVED_QUERY);
export const UPDATE_SELL_QUERY = createAction(ACTION_UPDATE_RECORD_QUERY);
export const UPDATE_SELLDATA_QUERY = createAction(ACTION_UPDATE_SELLDATA_QUERY);
