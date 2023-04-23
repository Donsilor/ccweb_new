import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient } from 'common/axios';
import _get from 'lodash/get';
// Actions
const FETCH_RECORD_LIST = 'YICHAKU/SOLDCONF/FETCH_RECORD_LIST';
const FETCH_DETAIL_LIST = 'YICHAKU/SOLDCONF/FETCH_DETAIL_LIST';

const UPDATE_RECORD_LIST = 'YICHAKU/SOLDCONF/UPDATE_RECORD_LIST';
const UPDATE_DETAIL_LIST = 'YICHAKU/SOLDCONF/UPDATE_DETAIL_LIST';

const LOADING = 'YICHAKU/SOLDCONF/LOADING';

// Reducer
const reducer = handleActions(
  {
    [FETCH_RECORD_LIST]: {
      next(state, action) {
        return {
          ...state,
          record: {
            ...state.record,
            list: _get(action.payload.data, 'data.list', []),
            paging: {
              current: _get(action.payload.data, 'data.pageNum', 1),
              pageSize: _get(action.payload.data, 'data.pageSize', 10),
              total: _get(action.payload.data, 'data.total', 10),
            },
          },
        };
      },
    },
    [FETCH_DETAIL_LIST]: {
      next(state, action) {
        return {
          ...state,
          detail: {
            ...state.detail,
            list: _get(action.payload.data, 'data.list', []),
            paging: {
              current: _get(action.payload.data, 'data.pageNum', 1),
              pageSize: _get(action.payload.data, 'data.pageSize', 10),
              total: _get(action.payload.data, 'data.total', 10),
            },
          },
        };
      },
    },
    [UPDATE_RECORD_LIST]: {
      next(state, action) {
        return {
          ...state,
          record: {
            ...state.record,
            query: {
              ...state.record.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_DETAIL_LIST]: {
      next(state, action) {
        return {
          ...state,
          detail: {
            ...state.detail,
            query: {
              ...state.detail.query,
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
    record: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        selfcarForm: true,
      },
    },
    detail: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        selfcarForm: true,
      },
    },
  }
);

export default reducer;

//防作弊检查列表查询
export const searchRecordList = createAction(FETCH_RECORD_LIST, (data, paging) => {
  let url = '/self-car/v1.0/selfAntiCheatingRecord/find/list';
  return httpCommonClient.postWithPaging(url, data, paging);
});

//防作弊检查明细查询
export const searchDetailList = createAction(FETCH_DETAIL_LIST, (data, paging) => {
  let url = '/self-car/v1.0/selfAntiCheatingDetail/find/list';
  return httpCommonClient.postWithPaging(url, data, paging);
});
export const updateRecordList = createAction(UPDATE_RECORD_LIST);
export const updateDetailList = createAction(UPDATE_DETAIL_LIST);
