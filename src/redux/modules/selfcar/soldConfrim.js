import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient } from 'common/axios';
import _get from 'lodash/get';
// Actions
const FETCH_SOLD_TODO = 'YICHAKU/SOLDCONF/FETCH_SOLD_TODO';
const FETCH_SOLD_GONE = 'YICHAKU/SOLDCONF/FETCH_SOLD_GONE';

const UPDATE_SOLD_TODO = 'YICHAKU/SOLDCONF/UPDATE_SOLD_TODO';
const UPDATE_SOLD_GONE = 'YICHAKU/SOLDCONF/UPDATE_SOLD_GONE';

const LOADING = 'YICHAKU/SOLDCONF/LOADING';

// Reducer
const reducer = handleActions(
  {
    [FETCH_SOLD_TODO]: {
      next(state, action) {
        return {
          ...state,
          todo: {
            ...state.todo,
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
    [FETCH_SOLD_GONE]: {
      next(state, action) {
        return {
          ...state,
          gone: {
            ...state.gone,
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
    [UPDATE_SOLD_TODO]: {
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
    [UPDATE_SOLD_GONE]: {
      next(state, action) {
        return {
          ...state,
          gone: {
            ...state.gone,
            query: {
              ...state.gone.query,
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
    todo: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        selfcarForm: true,
      },
    },
    gone: {
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
//已售确认列表查询
export const fetchSoldTodo = createAction(FETCH_SOLD_TODO, (data, paging) => {
  let url = '/self-car/v1.0/cars/find/list/sold-wait-confirm';
  return httpCommonClient.postWithPaging(url, data, paging);
});
export const fetchSoldGone = createAction(FETCH_SOLD_GONE, (data, paging) => {
  let url = '/self-car/v1.0/cars/find/list/sold-success';
  return httpCommonClient.postWithPaging(url, data, paging);
});

export const updateSoldTodo = createAction(UPDATE_SOLD_TODO);
export const updateSoldGone = createAction(UPDATE_SOLD_GONE);
