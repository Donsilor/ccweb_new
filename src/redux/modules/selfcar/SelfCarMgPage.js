import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient } from 'common/axios';
import _get from 'lodash/get';

const ACTION_LOADING = 'YICHAKU/SELFCARMGPAGE/LOADING';
const ACTION_FETCH_RESERVED_LIST = 'YICHAKU/SELFCARMGPAGE/FETCH_RESERVED_LIST';
const ACTION_UPDATE_RESERVED_QUERY = 'YICHAKU/SELFCARMGPAGE/UPDATE_RESERVED_QUERY';
const ACTION_FETCH_REMOVED_LIST = 'YICHAKU/SELFCARMGPAGE/FETCH_REMOVED_LIST';
const ACTION_UPDATE_REMOVED_QUERY = 'YICHAKU/SELFCARMGPAGE/UPDATE_REMOVED_QUERY';
const reducer = handleActions(
  {
    [ACTION_FETCH_RESERVED_LIST]: {
      next(state, action) {
        return {
          ...state,
          reserved: {
            ...state.reserved,
            list: _get(action.payload.data, 'data.pageList.list', []),
            sellOnCreditFlag: _get(action.payload.data, 'data.sellOnCreditFlag', ''),
            paging: {
              current: _get(action.payload.data, 'data.pageList.pageNum', 1),
              pageSize: _get(action.payload.data, 'data.pageList.pageSize', 10),
              total: _get(action.payload.data, 'data.pageList.total', 1),
            },
          },
        };
      },
    },
    [ACTION_FETCH_REMOVED_LIST]: {
      next(state, action) {
        return {
          ...state,
          removed: {
            ...state.removed,
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
          reserved: {
            ...state.reserved,
            query: {
              ...state.reserved.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [ACTION_UPDATE_REMOVED_QUERY]: {
      next(state, action) {
        return {
          ...state,
          removed: {
            ...state.removed,
            query: {
              ...state.removed.query,
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
    reserved: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        selfcarForm: true,
      },
    },
    removed: {
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
  return httpCommonClient.postWithPaging('/self-car/v1.0/cars/find/list', data, paging);
});

export const UPDATE_RESERVED_QUERY = createAction(ACTION_UPDATE_RESERVED_QUERY);

export const FETCH_REMOVED_LIST = createAction(ACTION_FETCH_REMOVED_LIST, (data, paging) => {
  return httpCommonClient.postWithPaging('/self-car/v1.0/cars/find/list/deleted', data, paging);
});

export const UPDATE_REMOVED_QUERY = createAction(ACTION_UPDATE_REMOVED_QUERY);
