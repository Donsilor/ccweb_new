import { createAction, handleActions, createActions } from 'redux-actions';
import { httpFormClient } from 'common/axios';

const ACTION_LOADING = 'YICHAKU/EWSPOTTEST/LOADING';
const ACTION_FETCH_SPOTTEST_LIST = 'YICHAKU/EWSPOTTEST/FETCH_SPOTTEST_LIST ';
const ACTION_FETCH_MOVETASK_LIST = 'YICHAKU/EWSPOTTEST/FETCH_MOVETASK_LIST ';
const ACTION_FETCH_TIMEOUT_LIST = 'YICHAKU/EWSPOTTEST/FETCH_TIMEOUT_LIST ';
const ACTION_FETCH_TODOCOMPLETE_LIST = 'YICHAKU/EWSPOTTEST/FETCH_TODOCOMPLETE_LIST ';

const ACTION_UPDATE_SPOTTEST_QUERY = 'YICHAKU/EWSPOTTEST/ACTION_UPDATE_SPOTTEST_QUERY ';
const ACTION_UPDATE_MOVETASK_QUERY = 'YICHAKU/EWSPOTTEST/ACTION_UPDATE_MOVETASK_QUERY ';
const ACTION_UPDATE_TIMEOUT_QUERY = 'YICHAKU/EWSPOTTEST/ACTION_UPDATE_TIMEOUT_QUERY ';
const ACTION_UPDATE_TODOCOMPLETE_QUERY = 'YICHAKU/EWSPOTTEST/ACTION_UPDATE_TODOCOMPLETE_QUERY ';

const ACTION_FETCH_DETAIL_CARINFO = 'YICHAKU/EWSPOTTEST/ACTION_FETCH_DETAIL_CARINFO ';

const reducer = handleActions(
  {
    [ACTION_FETCH_SPOTTEST_LIST]: {
      next(state, action) {
        return {
          ...state,
          spottest: {
            ...state.spottest,
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
    [ACTION_FETCH_MOVETASK_LIST]: {
      next(state, action) {
        return {
          ...state,
          movetask: {
            ...state.movetask,
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
    [ACTION_FETCH_TIMEOUT_LIST]: {
      next(state, action) {
        return {
          ...state,
          timeout: {
            ...state.timeout,
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
    [ACTION_FETCH_TODOCOMPLETE_LIST]: {
      next(state, action) {
        return {
          ...state,
          todo: {
            ...state.todo,
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
    [ACTION_FETCH_DETAIL_CARINFO]: {
      next(state, action) {
        return {
          ...state,
          carInfo: {
            list: action.payload.data.list,
            ewInfo: action.payload.data.ew,
            disInfo: action.payload.data.dis,
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
          },
        };
      },
    },
    [ACTION_UPDATE_SPOTTEST_QUERY]: {
      next(state, action) {
        return {
          ...state,
          spottest: {
            ...state.spottest,
            query: {
              ...state.spottest.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [ACTION_UPDATE_MOVETASK_QUERY]: {
      next(state, action) {
        return {
          ...state,
          movetask: {
            ...state.movetask,
            query: {
              ...state.movetask.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [ACTION_UPDATE_TIMEOUT_QUERY]: {
      next(state, action) {
        return {
          ...state,
          timeout: {
            ...state.timeout,
            query: {
              ...state.timeout.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [ACTION_UPDATE_TODOCOMPLETE_QUERY]: {
      next(state, action) {
        return {
          ...state,
          todo: {
            ...state.todo,
            query: {
              ...state.todo.query,
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
    spottest: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
      },
    },
    movetask: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
      },
    },
    timeout: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
      },
    },
    todo: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
      },
    },
    carInfo: {
      list: [],
      ewInfo: {},
      disInfo: {},
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    loading: true,
  }
);
export default reducer;

export const FETCH_SPOTTEST_LIST = createAction(ACTION_FETCH_SPOTTEST_LIST, (data, paging) => {
  let url = '/SpotTestTaskAction_getUnauditedSpotTaskList';
  return httpFormClient.formSubmit(url, '', data, paging);
});
export const FETCH_MOVETASK_LIST = createAction(ACTION_FETCH_MOVETASK_LIST, (data, paging) => {
  let url = '/SpotTestTaskAction_getUnauditedSpotTaskList';
  return httpFormClient.formSubmit(url, '', data, paging);
});
export const FETCH_TIMEOUT_LIST = createAction(ACTION_FETCH_TIMEOUT_LIST, (data, paging) => {
  let url = '/SpotTestTaskAction_getUnauditedSpotTaskList';
  return httpFormClient.formSubmit(url, '', data, paging);
});
export const FETCH_TODOCOMPLETE_LIST = createAction(ACTION_FETCH_TODOCOMPLETE_LIST, (data, paging) => {
  let url = '/SpotTestTaskAction_getAuditedSpotTaskList';
  return httpFormClient.formSubmit(url, '', data, paging);
});

export const FETCH_DETAIL_CARINFO = createAction(ACTION_FETCH_DETAIL_CARINFO, (data, paging) => {
  let url = '/SpotTestTaskAction_getSpotCars';
  return httpFormClient.formSubmit(url, '', data, paging);
});

export const UPDATE_SPOTTEST_QUERY = createAction(ACTION_UPDATE_SPOTTEST_QUERY);
export const UPDATE_MOVETASK_QUERY = createAction(ACTION_UPDATE_MOVETASK_QUERY);
export const UPDATE_TIMEOUT_QUERY = createAction(ACTION_UPDATE_TIMEOUT_QUERY);
export const UPDATE_TODOCOMPLETE_QUERY = createAction(ACTION_UPDATE_TODOCOMPLETE_QUERY);
