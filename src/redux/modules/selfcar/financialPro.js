import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient } from 'common/axios';
import _get from 'lodash/get';
// Actions
const FETCH_FINANC_TODO = 'YICHAKU/FINANC/FETCH_FINANC_TODO';

const UPDATE_FINANC_TODO = 'YICHAKU/FINANC/UPDATE_FINANC_TODO';

const LOADING = 'YICHAKU/FINANC/LOADING';

// Reducer
const reducer = handleActions(
  {
    [FETCH_FINANC_TODO]: {
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

    [UPDATE_FINANC_TODO]: {
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
  }
);

export default reducer;
//查询分页数据
export const fetchFinancialPro = createAction(FETCH_FINANC_TODO, (data, paging) => {
  let url = '/self-car/v1.0/selfFinancialProducts/find/list';
  return httpCommonClient.postWithPaging(url, data, paging);
});

export const updatefinancial = createAction(UPDATE_FINANC_TODO);
