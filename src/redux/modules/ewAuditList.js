import { createAction, handleActions } from 'redux-actions';
import { httpFormClient, httpBlobClient } from 'common/axios';

// Actions
const FETCH_PRIMARY_TODO_QUERY = 'YICHAKU/EWAUDITLIST/FETCH_PRIMARY_TODO_QUERY';
const FETCH_PRIMARY_EXP_QUERY = 'YICHAKU/EWAUDITLIST/FETCH_PRIMARY_EXP_QUERY';
const FETCH_PRIMARY_DIS_QUERY = 'YICHAKU/EWAUDITLIST/FETCH_PRIMARY_DIS_QUERY';
const FETCH_PRIMARY_TOTAL_QUERY = 'YICHAKU/EWAUDITLIST/FETCH_PRIMARY_TOTAL_QUERY';
const FETCH_LAST_TODO_QUERY = 'YICHAKU/EWAUDITLIST/FETCH_LAST_TODO_QUERY';
const FETCH_LAST_EXP_QUERY = 'YICHAKU/EWAUDITLIST/FETCH_LAST_EXP_QUERY';
const FETCH_LAST_TOTAL_QUERY = 'YICHAKU/EWAUDITLIST/FETCH_LAST_TOTAL_QUERY';

const UPDATE_PRIMARY_TODO_QUERY = 'YICHAKU/EWAUDITLIST/UPDATE_PRIMARY_TODO_QUERY';
const UPDATE_PRIMARY_EXP_QUERY = 'YICHAKU/EWAUDITLIST/UPDATE_PRIMARY_EXP_QUERY';
const UPDATE_PRIMARY_DIS_QUERY = 'YICHAKU/EWAUDITLIST/UPDATE_PRIMARY_DIS_QUERY';
const UPDATE_PRIMARY_TOTAL_QUERY = 'YICHAKU/EWAUDITLIST/UPDATE_PRIMARY_TOTAL_QUERY';
const UPDATE_LAST_TODO_QUERY = 'YICHAKU/EWAUDITLIST/UPDATE_LAST_TODO_QUERY';
const UPDATE_LAST_EXP_QUERY = 'YICHAKU/EWAUDITLIST/UPDATE_LAST_EXP_QUERY';
const UPDATE_LAST_TOTAL_QUERY = 'YICHAKU/EWAUDITLIST/UPDATE_LAST_TOTAL_QUERY';

const CONFIRM_RECEIPT = 'YICHAKU/EWAUDITLIST/CONFIRM_RECEIPT';
const CONFIRM_RECEIPT_SINGLE = 'YICHAKU/EWAUDITLIST/CONFIRM_RECEIPT_SINGLE';
const CONFIRM_EXCEPTION = 'YICHAKU/EWAUDITLIST/CONFIRM_EXCEPTION';
const CONFIRM_CONTRACT = 'YICHAKU/EWAUDITLIST/CONFIRM_CONTRACT';
const EXPORT_TOTAL = 'YICHAKU/EWAUDITLIST/EXPORT_TOTAL';
const EXPORT_SELECTED = 'YICHAKU/EWAUDITLIST/EXPORT_SELECTED';
const LOADING = 'YICHAKU/EWAUDITLIST/LOADING';

// Reducer
const reducer = handleActions(
  {
    [FETCH_PRIMARY_TODO_QUERY]: {
      next(state, action) {
        return {
          ...state,
          primaryTodo: {
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
    [FETCH_PRIMARY_EXP_QUERY]: {
      next(state, action) {
        return {
          ...state,
          primaryExp: {
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
    [FETCH_PRIMARY_DIS_QUERY]: {
      next(state, action) {
        return {
          ...state,
          primaryDis: {
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
    [FETCH_PRIMARY_TOTAL_QUERY]: {
      next(state, action) {
        return {
          ...state,
          primaryTotal: {
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
    [FETCH_LAST_TODO_QUERY]: {
      next(state, action) {
        return {
          ...state,
          lastTodo: {
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
    [FETCH_LAST_EXP_QUERY]: {
      next(state, action) {
        return {
          ...state,
          lastExp: {
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
    [FETCH_LAST_TOTAL_QUERY]: {
      next(state, action) {
        return {
          ...state,
          lastTotal: {
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
    [UPDATE_PRIMARY_TODO_QUERY]: {
      next(state, action) {
        return {
          ...state,
          ...{
            primaryTodoQuery: {
              ...state.primaryTodoQuery,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_PRIMARY_EXP_QUERY]: {
      next(state, action) {
        return {
          ...state,
          ...{
            primaryExpQuery: {
              ...state.primaryExpQuery,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_PRIMARY_DIS_QUERY]: {
      next(state, action) {
        return {
          ...state,
          ...{
            primaryDisQuery: {
              ...state.primaryDisQuery,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_PRIMARY_TOTAL_QUERY]: {
      next(state, action) {
        return {
          ...state,
          ...{
            primaryTotalQuery: {
              ...state.primaryTotalQuery,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_LAST_TODO_QUERY]: {
      next(state, action) {
        return {
          ...state,
          ...{
            lastTodoQuery: {
              ...state.lastTodoQuery,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_LAST_EXP_QUERY]: {
      next(state, action) {
        return {
          ...state,
          ...{
            lastExpQuery: {
              ...state.lastExpQuery,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_LAST_TOTAL_QUERY]: {
      next(state, action) {
        return {
          ...state,
          ...{
            lastTotalQuery: {
              ...state.lastTotalQuery,
              ...action.payload,
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
    loading: true,
    primaryTodo: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    primaryExp: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    primaryDis: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    primaryTotal: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    lastTodo: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    lastExp: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    lastTotal: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    primaryTodoQuery: {
      value: {
        status: -1,
      },
      expandForm: false,
    },
    primaryExpQuery: {
      value: {
        status: -1,
      },
      expandForm: false,
    },
    primaryDisQuery: {
      value: {},
      expandForm: false,
    },
    primaryTotalQuery: {
      value: {
        status: -1,
      },
      expandForm: false,
    },
    lastTodoQuery: {
      value: { isfirst: -1 },
      expandForm: false,
    },
    lastExpQuery: {
      value: { status: -1 },
      expandForm: false,
    },
    lastTotalQuery: {
      value: { status: -1 },
      expandForm: false,
    },
  }
);

export default reducer;

export const fetchPrimaryTodo = createAction(FETCH_PRIMARY_TODO_QUERY, (data, paging, tabName) => {
  let url = '/EwDistributorAction_ewBankAuditPt';
  return httpFormClient.formSubmit(url, 'ebQuery', data, paging);
});
export const fetchPrimaryExp = createAction(FETCH_PRIMARY_EXP_QUERY, (data, paging, tabName) => {
  let url = '/EwDistributorAction_ewBankExcetionList';
  return httpFormClient.formSubmit(url, 'ebQuery', data, paging);
});
export const fetchPrimaryDis = createAction(FETCH_PRIMARY_DIS_QUERY, (data, paging, tabName) => {
  let url = '/EwDistributorAction_ewBankDistWaitAuditList';
  return httpFormClient.formSubmit(url, 'ebQuery', data, paging);
});
export const fetchPrimaryTotal = createAction(FETCH_PRIMARY_TOTAL_QUERY, (data, paging, tabName) => {
  let url = '/EwDistributorAction_ewBankAllList';
  return httpFormClient.formSubmit(url, 'ebQuery', data, paging);
});
export const fetchLastTodo = createAction(FETCH_LAST_TODO_QUERY, (data, paging, tabName) => {
  let url = '/EwDistributorAction_ewBankAuditBank';
  return httpFormClient.formSubmit(url, 'ebQuery', data, paging);
});
export const fetchLastExp = createAction(FETCH_LAST_EXP_QUERY, (data, paging, tabName) => {
  let url = '/EwDistributorAction_ewBankExcetionList';
  return httpFormClient.formSubmit(url, 'ebQuery', data, paging);
});
export const fetchLastTotal = createAction(FETCH_LAST_TOTAL_QUERY, (data, paging, tabName) => {
  let url = '/EwDistributorAction_ewBankAllList';
  return httpFormClient.formSubmit(url, 'ebQuery', data, paging);
});

export const updatePrimaryTodoQuery = createAction(UPDATE_PRIMARY_TODO_QUERY);
export const updatePrimaryExpQuery = createAction(UPDATE_PRIMARY_EXP_QUERY);
export const updatePrimaryDisQuery = createAction(UPDATE_PRIMARY_DIS_QUERY);
export const updatePrimaryTotalQuery = createAction(UPDATE_PRIMARY_TOTAL_QUERY);

export const updateLastTodoQuery = createAction(UPDATE_LAST_TODO_QUERY);
export const updateLastExpQuery = createAction(UPDATE_LAST_EXP_QUERY);
export const updateLastTotalQuery = createAction(UPDATE_LAST_TOTAL_QUERY);
export const confirmReceipt = createAction(CONFIRM_RECEIPT, data => {
  return httpFormClient.formSubmit('/EwDistributorAction_ewAuditConfirmReceiptBt', 'ebQuery', data);
});
export const confirmReceiptSingle = createAction(CONFIRM_RECEIPT_SINGLE, data => {
  return httpFormClient.formSubmit('/EwDistributorAction_ewAuditConfirmReceipt', 'ebQuery', data);
});
export const confirmException = createAction(CONFIRM_EXCEPTION, data => {
  return httpFormClient.formSubmit('/EwDistributorAction_ewAuditMarkException', 'ebQuery', data);
});
export const confirmContract = createAction(CONFIRM_CONTRACT, data => {
  return httpFormClient.formSubmit('/EwDistributorAction_ewAuditContractSigned', 'ebQuery', data);
});
export const exportTotal = createAction(EXPORT_TOTAL, data => {
  return httpBlobClient.formSubmit('/EwDistributorAction_exportEwBankAllList', 'ebQuery', data);
});
export const exportSelected = createAction(EXPORT_SELECTED, data => {
  return httpBlobClient.formSubmit('/EwDistributorAction_exportBatchEwBankAllList', 'ebQuery', data);
});
