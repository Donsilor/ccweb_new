import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient } from 'common/axios';
import _get from 'lodash/get';

const ACTION_LOADING = 'YICHAKU/REGION/LOADING';
const ACTION_FETCH_REGIONSMALL_LIST = 'YICHAKU/REGION/FETCH_REGIONSMALL_LIST ';
const ACTION_FETCH_REGIONBIG_LIST = 'YICHAKU/REGION/FETCH_REGIONBIG_LIST ';

const ACTION_UPDATE_REGIONSMALL_QUERY = 'YICHAKU/REGION/UPDATE_REGIONSMALL_QUERY ';
const ACTION_UPDATE_REGIONBIG_QUERY = 'YICHAKU/REGION/UPDATE_REGIONBIG_QUERY ';

const reducer = handleActions(
  {
    [ACTION_FETCH_REGIONSMALL_LIST]: {
      next(state, action) {
        return {
          ...state,
          regionSmall: {
            ...state.regionSmall,
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
    [ACTION_FETCH_REGIONBIG_LIST]: {
      next(state, action) {
        return {
          ...state,
          regionBig: {
            ...state.regionBig,
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
    [ACTION_UPDATE_REGIONSMALL_QUERY]: {
      next(state, action) {
        return {
          ...state,
          regionSmall: {
            ...state.regionSmall,
            query: {
              ...state.regionSmall.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [ACTION_UPDATE_REGIONBIG_QUERY]: {
      next(state, action) {
        return {
          ...state,
          regionBig: {
            ...state.regionBig,
            query: {
              ...state.regionBig.query,
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
    regionSmall: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        selfcarForm: true,
      },
    },
    regionBig: {
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

export const FETCH_REGIONSMALL_LIST = createAction(ACTION_FETCH_REGIONSMALL_LIST, (data, paging) => {
  return httpCommonClient.post('/self-car/v1.0/selfDistributorArea/find/list/sub-area?pageNum=1&pageSize=500', data);
});
export const FETCH_REGIONBIG_LIST = createAction(ACTION_FETCH_REGIONBIG_LIST, (data, paging) => {
  return httpCommonClient.postWithPaging('/self-car/v1.0/selfDistributorArea/find/list/area', data, paging);
});

export const UPDATE_REGIONSMALL_QUERY = createAction(ACTION_UPDATE_REGIONSMALL_QUERY);
export const UPDATE_REGIONBIG_QUERY = createAction(ACTION_UPDATE_REGIONBIG_QUERY);
