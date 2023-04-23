import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient } from 'common/axios';
import _get from 'lodash/get';
// Actions
const FETCH_LOCAMANAGE_LIST = 'YICHAKU/LOCAMANAGE/FETCH_LOCAMANAGE_LIST';

const UPDATE_LOCAMANAGE_LIST = 'YICHAKU/LOCAMANAGE/UPDATE_MOVERECORD_LIST';

const LOADING = 'YICHAKU/LOCAMANAGE/LOADING';
// Reducer
const reducer = handleActions(
  {
    [FETCH_LOCAMANAGE_LIST]: {
      next(state, action) {
        return {
          ...state,
          primaryTodo: {
            list: _get(action.payload.data, 'data.list', []),
            paging: {
              current: _get(action.payload.data, 'data.pageNum', 1),
              pageSize: _get(action.payload.data, 'data.pageSize', 1),
              total: _get(action.payload.data, 'data.total', 1),
            },
          },
        };
      },
    },
    [UPDATE_LOCAMANAGE_LIST]: {
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
//定位点管理列表
export const fetchLocaManage = createAction(FETCH_LOCAMANAGE_LIST, (data, paging) => {
  let url = '/self-car/v1.0/locations/find/list';
  return httpCommonClient.postWithPaging(url, data, paging);
});

export const updateLocaManage = createAction(UPDATE_LOCAMANAGE_LIST);
