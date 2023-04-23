import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient } from 'common/axios';

// Actions
const FETCH_MOVERECORD_LIST = 'YICHAKU/MOVELIST/FETCH_MOVERECORD_LIST';

const UPDATE_MOVERECORD_LIST = 'YICHAKU/MOVELIST/UPDATE_MOVERECORD_LIST';

const LOADING = 'YICHAKU/MOVELIST/LOADING';
// Reducer
const reducer = handleActions(
  {
    [FETCH_MOVERECORD_LIST]: {
      next(state, action) {
        return {
          ...state,
          primaryTodo: {
            list: (action.payload.data.data && action.payload.data.data.list) || [],
            paging: {
              current: (action.payload.data.data && action.payload.data.data.pageNum) || 1,
              pageSize: (action.payload.data.data && action.payload.data.data.pageSize) || 10,
              total: (action.payload.data.data && action.payload.data.data.total) || 10,
            },
          },
        };
      },
    },
    [UPDATE_MOVERECORD_LIST]: {
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
      value: {},
      expandForm: false,
      selfcarForm: true,
    },
  }
);

export default reducer;
//移动记录列表查询
export const fetchMoveRecord = createAction(FETCH_MOVERECORD_LIST, (data, paging) => {
  let url = '/self-car/v1.0/moveCars/find/list';
  return httpCommonClient.postWithPaging(url, data, paging);
});

export const updateMoveRecord = createAction(UPDATE_MOVERECORD_LIST);
