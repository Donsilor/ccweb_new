import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient } from 'common/axios';

// Actions
const FETCH_PRIMARY_TODO_QUERY = 'YICHAKU/EWINVOICELIST/FETCH_PRIMARY_TODO_QUERY';
const FETCH_PRIMARY_DONE_QUERY = 'YICHAKU/EWINVOICELIST/FETCH_PRIMARY_DONE_QUERY';

const UPDATE_PRIMARY_TODO_QUERY = 'YICHAKU/EWINVOICELIST/UPDATE_PRIMARY_TODO_QUERY';
const UPDATE_PRIMARY_DONE_QUERY = 'YICHAKU/EWINVOICELIST/UPDATE_PRIMARY_DONE_QUERY';

const LOADING = 'YICHAKU/EWINVOICELIST/LOADING';

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
    [FETCH_PRIMARY_DONE_QUERY]: {
      next(state, action) {
        return {
          ...state,
          primaryDone: {
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
    [UPDATE_PRIMARY_DONE_QUERY]: {
      next(state, action) {
        return {
          ...state,
          ...{
            primaryDoneQuery: {
              ...state.primaryDoneQuery,
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
    primaryTodo: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    primaryDone: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    primaryTodoQuery: {
      value: {
        status: 1,
      },
      expandForm: false,
    },
    primaryDoneQuery: {
      value: {
        status: 2,
      },
      expandForm: false,
    },
  }
);

export default reducer;

export const fetchPrimaryTodo = createAction(FETCH_PRIMARY_TODO_QUERY, (data, paging) => {
  let url = '/InvoiceAction_searchInvoices';
  return httpCommonClient.post(url, { ...data, ...paging });
});
export const fetchPrimaryDone = createAction(FETCH_PRIMARY_DONE_QUERY, (data, paging) => {
  let url = '/InvoiceAction_searchInvoices';
  return httpCommonClient.post(url, { ...data, ...paging });
});

export const updatePrimaryTodoQuery = createAction(UPDATE_PRIMARY_TODO_QUERY);
export const updatePrimaryDoneQuery = createAction(UPDATE_PRIMARY_DONE_QUERY);
