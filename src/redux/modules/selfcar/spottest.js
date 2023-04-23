import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient } from 'common/axios';
import _get from 'lodash/get';

const ACTION_LOADING = 'YICHAKU/SELFCAR_SPOTTEST/LOADING';
const ACTION_FETCH_COMMON_TODO_LIST = 'YICHAKU/SELFCAR_SPOTTEST/FETCH_COMMON_TODO_LIST';
const ACTION_UPDATE_COMMON_TODO_QUERY = 'YICHAKU/SELFCAR_SPOTTEST/UPDATE_COMMON_TODO_QUERY';
const ACTION_FETCH_COMMON_DONE_LIST = 'YICHAKU/SELFCAR_SPOTTEST/FETCH_COMMON_DONE_LIST';
const ACTION_UPDATE_COMMON_DONE_QUERY = 'YICHAKU/SELFCAR_SPOTTEST/UPDATE_COMMON_DONE_QUERY';

const ACTION_FETCH_MOVING_TODO_LIST = 'YICHAKU/SELFCAR_SPOTTEST/FETCH_MOVING_TODO_LIST';
const ACTION_UPDATE_MOVING_TODO_QUERY = 'YICHAKU/SELFCAR_SPOTTEST/UPDATE_MOVING_TODO_QUERY';
const ACTION_FETCH_MOVING_DONE_LIST = 'YICHAKU/SELFCAR_SPOTTEST/FETCH_MOVING_DONE_LIST';
const ACTION_UPDATE_MOVING_DONE_QUERY = 'YICHAKU/SELFCAR_SPOTTEST/UPDATE_MOVING_DONE_QUERY';

const ACTION_FETCH_CERTIFICATE_TODO_LIST = 'YICHAKU/SELFCAR_SPOTTEST/FETCH_CERTIFICATE_TODO_LIST';
const ACTION_UPDATE_CERTIFICATE_TODO_QUERY = 'YICHAKU/SELFCAR_SPOTTEST/UPDATE_CERTIFICATE_TODO_QUERY';
const ACTION_FETCH_CERTIFICATE_DONE_LIST = 'YICHAKU/SELFCAR_SPOTTEST/FETCH_CERTIFICATE_DONE_LIST';
const ACTION_UPDATE_CERTIFICATE_DONE_QUERY = 'YICHAKU/SELFCAR_SPOTTEST/UPDATE_CERTIFICATE_DONE_QUERY';
const reducer = handleActions(
  {
    [ACTION_FETCH_COMMON_TODO_LIST]: {
      next(state, action) {
        return {
          ...state,
          commonTodo: {
            ...state.commonTodo,
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
    [ACTION_FETCH_COMMON_DONE_LIST]: {
      next(state, action) {
        return {
          ...state,
          commonDone: {
            ...state.commonDone,
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
    [ACTION_UPDATE_COMMON_TODO_QUERY]: {
      next(state, action) {
        return {
          ...state,
          commonTodo: {
            ...state.commonTodo,
            query: {
              ...state.commonTodo.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [ACTION_UPDATE_COMMON_DONE_QUERY]: {
      next(state, action) {
        return {
          ...state,
          commonDone: {
            ...state.commonDone,
            query: {
              ...state.commonDone.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [ACTION_FETCH_MOVING_TODO_LIST]: {
      next(state, action) {
        return {
          ...state,
          movingTodo: {
            ...state.movingTodo,
            list: _get(action.payload.data, 'data.pageList.list', []),
            paging: {
              current: _get(action.payload.data, 'data.pageList.pageNum', 1),
              pageSize: _get(action.payload.data, 'data.pageList.pageSize', 10),
              total: _get(action.payload.data, 'data.pageList.total', 1),
            },
          },
        };
      },
    },
    [ACTION_FETCH_MOVING_DONE_LIST]: {
      next(state, action) {
        return {
          ...state,
          movingDone: {
            ...state.movingDone,
            list: _get(action.payload.data, 'data.pageList.list', []),
            paging: {
              current: _get(action.payload.data, 'data.pageList.pageNum', 1),
              pageSize: _get(action.payload.data, 'data.pageList.pageSize', 10),
              total: _get(action.payload.data, 'data.pageList.total', 1),
            },
          },
        };
      },
    },
    [ACTION_UPDATE_MOVING_TODO_QUERY]: {
      next(state, action) {
        return {
          ...state,
          movingTodo: {
            ...state.movingTodo,
            query: {
              ...state.movingTodo.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [ACTION_UPDATE_MOVING_DONE_QUERY]: {
      next(state, action) {
        return {
          ...state,
          movingDone: {
            ...state.movingDone,
            query: {
              ...state.movingDone.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [ACTION_FETCH_CERTIFICATE_TODO_LIST]: {
      next(state, action) {
        return {
          ...state,
          certificateTodo: {
            ...state.certificateTodo,
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
    [ACTION_FETCH_CERTIFICATE_DONE_LIST]: {
      next(state, action) {
        return {
          ...state,
          certificateDone: {
            ...state.certificateDone,
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
    [ACTION_UPDATE_CERTIFICATE_TODO_QUERY]: {
      next(state, action) {
        return {
          ...state,
          certificateTodo: {
            ...state.certificateTodo,
            query: {
              ...state.certificateTodo.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [ACTION_UPDATE_CERTIFICATE_DONE_QUERY]: {
      next(state, action) {
        return {
          ...state,
          certificateDone: {
            ...state.certificateDone,
            query: {
              ...state.certificateDone.query,
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
    commonTodo: {
      list: [],
      sellOnCreditFlag: 0,
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        selfcarForm: true,
      },
    },
    commonDone: {
      list: [],
      sellOnCreditFlag: 0,
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        selfcarForm: true,
      },
    },
    movingTodo: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        selfcarForm: true,
      },
    },
    movingDone: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        selfcarForm: true,
      },
    },
    certificateTodo: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        selfcarForm: true,
      },
    },
    certificateDone: {
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

// 抽查任务
export const FETCH_COMMON_TODO_LIST = createAction(ACTION_FETCH_COMMON_TODO_LIST, (data, paging) => {
  return httpCommonClient.postWithPaging(
    '/self-car/v1.0/selfSpottestDetail/find/list/uncompleted',
    { ...data, spottesttype: 20 },
    paging
  );
});

export const UPDATE_COMMON_TODO_QUERY = createAction(ACTION_UPDATE_COMMON_TODO_QUERY);

export const FETCH_COMMON_DONE_LIST = createAction(ACTION_FETCH_COMMON_DONE_LIST, (data, paging) => {
  return httpCommonClient.postWithPaging(
    '/self-car/v1.0/selfSpottestDetail/find/list/completed',
    { ...data, spottesttype: 20 },
    paging
  );
});

export const UPDATE_COMMON_DONE_QUERY = createAction(ACTION_UPDATE_COMMON_DONE_QUERY);

// 移动任务
export const FETCH_MOVING_TODO_LIST = createAction(ACTION_FETCH_MOVING_TODO_LIST, (data, paging) => {
  return httpCommonClient.postWithPaging(
    '/self-car/v1.0/selfSpottestDetail/find/list/uncompleted',
    { ...data, spottesttype: 50 },
    paging
  );
});

export const UPDATE_MOVING_TODO_QUERY = createAction(ACTION_UPDATE_MOVING_TODO_QUERY);

export const FETCH_MOVING_DONE_LIST = createAction(ACTION_FETCH_MOVING_DONE_LIST, (data, paging) => {
  return httpCommonClient.postWithPaging(
    '/self-car/v1.0/selfSpottestDetail/find/list/completed',
    { ...data, spottesttype: 50 },
    paging
  );
});

export const UPDATE_MOVING_DONE_QUERY = createAction(ACTION_UPDATE_MOVING_DONE_QUERY);

// 盘证任务
export const FETCH_CERTIFICATE_TODO_LIST = createAction(ACTION_FETCH_CERTIFICATE_TODO_LIST, (data, paging) => {
  return httpCommonClient.postWithPaging(
    '/self-car/v1.0/selfSpottest/find/list/pending',
    { ...data, spottesttype: 30 },
    paging
  );
});

export const UPDATE_CERTIFICATE_TODO_QUERY = createAction(ACTION_UPDATE_CERTIFICATE_TODO_QUERY);

export const FETCH_CERTIFICATE_DONE_LIST = createAction(ACTION_FETCH_CERTIFICATE_DONE_LIST, (data, paging) => {
  return httpCommonClient.postWithPaging(
    '/self-car/v1.0/selfSpottest/find/list/complete',
    { ...data, spottesttype: 30 },
    paging
  );
});

export const UPDATE_CERTIFICATE_DONE_QUERY = createAction(ACTION_UPDATE_CERTIFICATE_DONE_QUERY);
