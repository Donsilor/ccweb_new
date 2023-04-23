import { createAction, handleActions } from 'redux-actions';
import { httpFormClient } from 'common/axios';

// Actions

const LOADING = 'YICHAKU/CONFIRMRECEIPT/LOADING';
const FETCH_TODO_LIST = 'YICHAKU/CONFIRMRECEIPT/FETCH_TODO_LIST';
const UPDATEQUERY_CONFIRMDATA_TODO = 'YICHAKU/CONFIRMRECEIPT/UPDATEQUERY_CONFIRMDATA_TODO';

const FETCH_ALL_LIST = 'YICHAKU/CONFIRMRECEIPT/FETCH_ALL_LIST';
const UPDATEQUERY_CONFIRMDATA_ALL = 'YICHAKU/CONFIRMRECEIPT/UPDATEQUERY_CONFIRMDATA_ALL';

const FETCH_EW_DETAIL = 'YICHAKU/CONFIRMRECEIPT/FETCH_EW_DETAIL';
const UPDATEQUERY_EWDETAIL = 'YICHAKU/CONFIRMRECEIPT/UPDATEQUERY_EWDETAIL';
const CONFIRM_EXCEPTION = 'YICHAKU/CONFIRMRECEIPT/CONFIRM_EXCEPTION';
const CONFIRM_RECEIPT = 'YICHAKU/CONFIRMRECEIPT/CONFIRM_RECEIPT';
const CONFIRM_MULTIPLE_RECEIPT = 'YICHAKU/CONFIRMRECEIPT/CONFIRM_MULTIPLE_RECEIPT';

const UPDATE_ACCOUNT = 'YICHAKU/CONFIRMRECEIPT/UPDATE_ACCOUNT';

// Reducer
const reducer = handleActions(
  {
    [FETCH_TODO_LIST]: {
      next(state, action) {
        return {
          ...state,
          todoData: {
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
    [FETCH_ALL_LIST]: {
      next(state, action) {
        return {
          ...state,
          allData: {
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
    [UPDATEQUERY_CONFIRMDATA_TODO]: {
      next(state, action) {
        return {
          ...state,
          todoQuery: {
            ...state.todoQuery,
            ...action.payload,
          },
        };
      },
    },
    [UPDATEQUERY_CONFIRMDATA_ALL]: {
      next(state, action) {
        return {
          ...state,
          allQuery: {
            ...state.allQuery,
            ...action.payload,
          },
        };
      },
    },
    [UPDATEQUERY_EWDETAIL]: {
      next(state, action) {
        return {
          ...state,
          ewDetailQuery: {
            ...state.ewDetailQuery,
            ...action.payload,
          },
        };
      },
    },
    [FETCH_EW_DETAIL]: {
      next(state, action) {
        return {
          ...state,
          ewDetailData: {
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
    [LOADING]: {
      next(state: any, action: any) {
        return {
          ...state,
          loading: action.loading,
        };
      },
    },
  },
  {
    todoData: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    todoQuery: {
      value: {
        exportType: -1,
      },
      expandForm: false,
    },
    allData: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    allQuery: {
      value: {
        exportType: -1,
      },
      expandForm: false,
    },
    ewDetailData: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    ewDetailQuery: {},
    loading: true,
  }
);

export default reducer;

export const todoDataFetch = createAction(FETCH_TODO_LIST, (data, paging) => {
  return httpFormClient.formSubmit('/BondPrintAction_getExportDataHistoryList', 'bedQuery', data, paging);
});
export const updateTodoQuery = createAction(UPDATEQUERY_CONFIRMDATA_TODO);

export const allDataFetch = createAction(FETCH_ALL_LIST, (data, paging) => {
  return httpFormClient.formSubmit('/BondPrintAction_getExportDataHistoryList', 'bedQuery', data, paging);
});
export const updateAllQuery = createAction(UPDATEQUERY_CONFIRMDATA_ALL);

export const updateEwDetailQuery = createAction(UPDATEQUERY_EWDETAIL);

export const ewDetailFetch = createAction(FETCH_EW_DETAIL, (data, paging) => {
  return httpFormClient.formSubmit('/BondPrintAction_getExportDataDetailHistoryList', 'beddQuery', data, paging);
});
export const confirmException = createAction(CONFIRM_EXCEPTION, data => {
  return httpFormClient.formSubmit('/BondPrintAction_markException', '', data);
});

export const confirmReceipt = createAction(CONFIRM_RECEIPT, data => {
  return httpFormClient.formSubmit('/BondPrintAction_confirmReceipt', 'bedQuery', data);
});

export const confirmMultipleReceipt = createAction(CONFIRM_MULTIPLE_RECEIPT, data => {
  return httpFormClient.formSubmit('/BondPrintAction_confirmReceiptBt', 'bedQuery', data);
});

export const accountUpdate = createAction(UPDATE_ACCOUNT, data => {
  return httpFormClient.formSubmit('/BondAccountAction_saveBondAccountNum', 'bondQuery', data);
});
