import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient, httpFormClient } from 'common/axios';
import _get from 'lodash/get';
import moment from 'moment';
// Actions
const FETCH_DEALERLIST_LIST = 'YICHAKU/USERINFO/FETCH_DEALERLIST_LIST';
const UPDATE_DEALERLIST_LIST = 'YICHAKU/USERINFO/UPDATE_DEALERLIST_LIST';

const FETCH_EW_LIST = 'YICHAKU/USERINFO/FETCH_EW_LIST';
const UPDATE_EW_LIST = 'YICHAKU/USERINFO/UPDATE_EW_LIST';

const LOADING = 'YICHAKU/USERINFO/LOADING';

// Reducer
const reducer = handleActions(
  {
    [FETCH_DEALERLIST_LIST]: {
      next(state, action) {
        return {
          ...state,
          dealerList: {
            ...state.dealerList,
            list: _get(action.payload.data, 'list', []),
            pendingAuditNum: _get(action.payload.data, 'pendingAuditNum', 0),
            paging: {
              current: _get(action.payload.data, 'page.pageNum', 1),
              pageSize: _get(action.payload.data, 'page.pageSize', 10),
              total: _get(action.payload.data, 'page.total', 0),
            },
          },
        };
      },
    },
    [FETCH_EW_LIST]: {
      next(state, action) {
        return {
          ...state,
          ewList: {
            ...state.ewList,
            list: _get(action.payload.data, 'list', []),
            waitAuditNum: _get(action.payload.data, 'waitAuditNum', 0),
            paging: {
              current: _get(action.payload.data, 'page.pageNum', 1),
              pageSize: _get(action.payload.data, 'page.pageSize', 10),
              total: _get(action.payload.data, 'page.total', 0),
            },
          },
        };
      },
    },

    [UPDATE_DEALERLIST_LIST]: {
      next(state, action) {
        return {
          ...state,
          dealerList: {
            ...state.dealerList,
            query: {
              ...state.dealerList.query,
              ...action.payload,
            },
          },
        };
      },
    },

    [UPDATE_EW_LIST]: {
      next(state, action) {
        return {
          ...state,
          ewList: {
            ...state.ewList,
            query: {
              ...state.ewList.query,
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
    dealerList: {
      list: [],
      pendingAuditNum: 0,
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        userinfo: true,
      },
    },
    ewList: {
      list: [],
      waitAuditNum: 0,
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        userinfo: true,
      },
    },
  }
);

export default reducer;
//查询经销商信息
export const getDealerList = createAction(FETCH_DEALERLIST_LIST, (data, paging) => {
  let url = '/DistributorAction_list';
  return httpCommonClient.post(url, { ...data, ...paging });
});
//查询二网信息
export const getEWList = createAction(FETCH_EW_LIST, (data, paging) => {
  let url = '/EwAction_list';
  return httpCommonClient.post(url, { ...data, ...paging });
});

export const updateDealerList = createAction(UPDATE_DEALERLIST_LIST);
export const updateEWList = createAction(UPDATE_EW_LIST);
