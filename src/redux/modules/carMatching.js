import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient } from 'common/axios';
import _get from 'lodash/get';
// Actions
const FETCH_COLLECTIMPORT_LIST = 'YICHAKU/WARNING/FETCH_COLLECTIMPORT_LIST';
const UPDATE_COLLECTIMPORT_LIST = 'YICHAKU/WARNING/UPDATE_COLLECTIMPORT_LIST';

const FETCH_THIRDIMPORT_LIST = 'YICHAKU/WARNING/FETCH_THIRDIMPORT_LIST';
const UPDATE_THIRDIMPORT_LIST = 'YICHAKU/WARNING/UPDATE_THIRDIMPORT_LIST';

const FETCH_COLLECTMATCH_LIST = 'YICHAKU/WARNING/FETCH_COLLECTMATCH_LIST';
const UPDATE_COLLECTMATCH_LIST = 'YICHAKU/WARNING/UPDATE_COLLECTMATCH_LIST';

const FETCH_THIRDMATCH_LIST = 'YICHAKU/WARNING/FETCH_THIRDMATCH_LIST';
const UPDATE_THIRDMATCH_LIST = 'YICHAKU/WARNING/UPDATE_THIRDMATCH_LIST';

const FETCH_MATCHLIST_LIST = 'YICHAKU/WARNING/FETCH_MATCHLIST_LIST';
const UPDATE_MATCHLIST_LIST = 'YICHAKU/WARNING/UPDATE_MATCHLIST_LIST';

const FETCH_JIEFANGOUT_LIST = 'YICHAKU/WARNING/FETCH_JIEFANGOUT_LIST';
const UPDATE_JIEFANGOUT_LIST = 'YICHAKU/WARNING/UPDATE_JIEFANGOUT_LIST';

const FETCH_JIEFANGLIST_LIST = 'YICHAKU/WARNING/FETCH_JIEFANGLIST_LIST';
const UPDATE_JIEFANGLIST_LIST = 'YICHAKU/WARNING/UPDATE_JIEFANGLIST_LIST';

const LOADING = 'YICHAKU/WARNING/LOADING';

// Reducer
const reducer = handleActions(
  {
    [FETCH_COLLECTIMPORT_LIST]: {
      next(state, action) {
        return {
          ...state,
          collectImport: {
            ...state.collectImport,
            list: _get(action.payload.data.data, 'list', []),
            paging: {
              current: _get(action.payload.data.data, 'pageNum', 1),
              pageSize: _get(action.payload.data.data, 'pageSize', 10),
              total: _get(action.payload.data.data, 'total', 1),
            },
          },
        };
      },
    },
    [FETCH_THIRDIMPORT_LIST]: {
      next(state, action) {
        return {
          ...state,
          thirdImport: {
            ...state.thirdImport,
            list: _get(action.payload.data.data, 'list', []),
            paging: {
              current: _get(action.payload.data.data, 'pageNum', 1),
              pageSize: _get(action.payload.data.data, 'pageSize', 10),
              total: _get(action.payload.data.data, 'total', 1),
            },
          },
        };
      },
    },

    [FETCH_COLLECTMATCH_LIST]: {
      next(state, action) {
        return {
          ...state,
          collectMatch: {
            ...state.collectMatch,
            list: _get(action.payload.data.data, 'list', []),
            paging: {
              current: _get(action.payload.data.data, 'pageNum', 1),
              pageSize: _get(action.payload.data.data, 'pageSize', 10),
              total: _get(action.payload.data.data, 'total', 1),
            },
          },
        };
      },
    },
    [FETCH_THIRDMATCH_LIST]: {
      next(state, action) {
        return {
          ...state,
          thirdMatch: {
            ...state.thirdMatch,
            list: _get(action.payload.data.data, 'list', []),
            paging: {
              current: _get(action.payload.data.data, 'pageNum', 1),
              pageSize: _get(action.payload.data.data, 'pageSize', 10),
              total: _get(action.payload.data.data, 'total', 1),
            },
          },
        };
      },
    },

    [FETCH_MATCHLIST_LIST]: {
      next(state, action) {
        return {
          ...state,
          matchList: {
            ...state.matchList,
            list: _get(action.payload.data.data, 'list', []),
            paging: {
              current: _get(action.payload.data.data, 'pageNum', 1),
              pageSize: _get(action.payload.data.data, 'pageSize', 10),
              total: _get(action.payload.data.data, 'total', 1),
            },
          },
        };
      },
    },
    [FETCH_JIEFANGOUT_LIST]: {
      next(state, action) {
        return {
          ...state,
          jiefangOut: {
            ...state.jiefangOut,
            list: _get(action.payload.data.data, 'list', []),
            paging: {
              current: _get(action.payload.data.data, 'pageNum', 1),
              pageSize: _get(action.payload.data.data, 'pageSize', 10),
              total: _get(action.payload.data.data, 'total', 1),
            },
          },
        };
      },
    },
    [FETCH_JIEFANGLIST_LIST]: {
      next(state, action) {
        return {
          ...state,
          jiefangList: {
            ...state.jiefangList,
            list: _get(action.payload.data.data, 'list', []),
            paging: {
              current: _get(action.payload.data.data, 'pageNum', 1),
              pageSize: _get(action.payload.data.data, 'pageSize', 10),
              total: _get(action.payload.data.data, 'total', 1),
            },
          },
        };
      },
    },
    [UPDATE_COLLECTIMPORT_LIST]: {
      next(state, action) {
        return {
          ...state,
          collectImport: {
            ...state.collectImport,
            query: {
              ...state.collectImport.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_THIRDIMPORT_LIST]: {
      next(state, action) {
        return {
          ...state,
          thirdImport: {
            ...state.thirdImport,
            query: {
              ...state.thirdImport.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_COLLECTMATCH_LIST]: {
      next(state, action) {
        return {
          ...state,
          collectMatch: {
            ...state.collectMatch,
            query: {
              ...state.collectMatch.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_THIRDMATCH_LIST]: {
      next(state, action) {
        return {
          ...state,
          thirdMatch: {
            ...state.thirdMatch,
            query: {
              ...state.thirdMatch.query,
              ...action.payload,
            },
          },
        };
      },
    },

    [UPDATE_MATCHLIST_LIST]: {
      next(state, action) {
        return {
          ...state,
          matchList: {
            ...state.matchList,
            query: {
              ...state.matchList.query,
              ...action.payload,
            },
          },
        };
      },
    },

    [UPDATE_JIEFANGOUT_LIST]: {
      next(state, action) {
        return {
          ...state,
          jiefangOut: {
            ...state.jiefangOut,
            query: {
              ...state.jiefangOut.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_JIEFANGLIST_LIST]: {
      next(state, action) {
        return {
          ...state,
          jiefangList: {
            ...state.jiefangList,
            query: {
              ...state.jiefangList.query,
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
    collectImport: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    thirdImport: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    collectMatch: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    thirdMatch: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    matchList: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    jiefangOut: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    jiefangList: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
  }
);

export default reducer;
//查询导入分页数据-开票汇总
export const getCollectImport = createAction(FETCH_COLLECTIMPORT_LIST, (data, paging) => {
  let url = '/warning/v1.0/warning/importRecord/list';
  return httpCommonClient.postWithPaging(url, data, paging);
});
//查询导入分页数据-三方出库
export const getThirdImport = createAction(FETCH_THIRDIMPORT_LIST, (data, paging) => {
  let url = '/warning/v1.0/warning/importRecord/list';
  return httpCommonClient.postWithPaging(url, data, paging);
});
//开票汇总列表
export const getCollectMatch = createAction(FETCH_COLLECTMATCH_LIST, (data, paging) => {
  let url = '/warning/v1.0/matching/bill/list';
  return httpCommonClient.postWithPaging(url, data, paging);
});
//三方出库信息列表
export const getThirdMatch = createAction(FETCH_THIRDMATCH_LIST, (data, paging) => {
  let url = '/warning/v1.0/matching/outbound/list';
  return httpCommonClient.postWithPaging(url, data, paging);
});
//车辆匹配列表
export const getMatchList = createAction(FETCH_MATCHLIST_LIST, (data, paging) => {
  let url = '/warning/v1.0/matching/outbound/outboundBill/list';
  return httpCommonClient.postWithPaging(url, data, paging);
});
//解放发车信息列表
export const getJiefangOut = createAction(FETCH_JIEFANGOUT_LIST, (data, paging) => {
  let url = '/warning/v1.0/matching/outboundJiefang/list';
  return httpCommonClient.postWithPaging(url, data, paging);
});
//一汽解放台账
export const getJiefangList = createAction(FETCH_JIEFANGLIST_LIST, (data, paging) => {
  let url = '/warning/v1.0/matching/outboundJiefang/outboundJiefangBill/list';
  return httpCommonClient.postWithPaging(url, data, paging);
});

export const updateCollectImport = createAction(UPDATE_COLLECTIMPORT_LIST);
export const updateThirdImport = createAction(UPDATE_THIRDIMPORT_LIST);

export const updateCollectMatch = createAction(UPDATE_COLLECTMATCH_LIST);
export const updateThirdMatch = createAction(UPDATE_THIRDMATCH_LIST);

export const updateMatchList = createAction(UPDATE_MATCHLIST_LIST);

export const updateJiefangOut = createAction(UPDATE_JIEFANGOUT_LIST);
export const updateJiefangList = createAction(UPDATE_JIEFANGLIST_LIST);
