import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient } from 'common/axios';

// Actions
const FETCH_PRIMARY_TODO_QUERY = 'YICHAKU/EWORDERLIST/FETCH_PRIMARY_TODO_QUERY';

const UPDATE_PRIMARY_TODO_QUERY = 'YICHAKU/EWORDERLIST/UPDATE_PRIMARY_TODO_QUERY';

const LOADING = 'YICHAKU/EWORDERLIST/LOADING';

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
    primaryTodoQuery: {
      value: {
        refundStatus: 1,
      },
      expandForm: false,
    },
  }
);

export default reducer;

export const fetchPrimaryTodo = createAction(FETCH_PRIMARY_TODO_QUERY, (data, paging) => {
  let url = '/OrderAction_searchOrders';
  return httpCommonClient.post(url, { ...data, ...paging });
});

export const updatePrimaryTodoQuery = createAction(UPDATE_PRIMARY_TODO_QUERY);
