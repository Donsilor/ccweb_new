import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient, httpFormClient } from 'common/axios';
import _get from 'lodash/get';
// Actions
const FETCH_CARLIST_LIST = 'YICHAKU/CARSTATISTICS/FETCH_CARLIST_LIST';
const UPDATE_CARLIST_LIST = 'YICHAKU/CARSTATISTICS/UPDATE_CARLIST_LIST';

const FETCH_DISLIST_LIST = 'YICHAKU/CARSTATISTICS/FETCH_DISLIST_LIST';
const UPDATE_DISLIST_LIST = 'YICHAKU/CARSTATISTICS/UPDATE_DISLIST_LIST';

const LOADING = 'YICHAKU/CARSTATISTICS/LOADING';

// Reducer
const reducer = handleActions(
  {
    [FETCH_CARLIST_LIST]: {
      next(state, action) {
        return {
          ...state,
          carList: {
            ...state.carList,
            list: _get(action.payload.data, 'list', []),
            paging: {
              current: _get(action.payload.data.page, 'pageNum', 1),
              pageSize: _get(action.payload.data.page, 'pageSize', 10),
              total: _get(action.payload.data.page, 'total', 1),
            },
          },
        };
      },
    },
    [FETCH_DISLIST_LIST]: {
      next(state, action) {
        return {
          ...state,
          disList: {
            ...state.disList,
            list: _get(action.payload.data, 'list', []),
            paging: {
              current: _get(action.payload.data.page, 'pageNum', 1),
              pageSize: _get(action.payload.data.page, 'pageSize', 10),
              total: _get(action.payload.data.page, 'total', 1),
            },
          },
        };
      },
    },

    [UPDATE_CARLIST_LIST]: {
      next(state, action) {
        return {
          ...state,
          carList: {
            ...state.carList,
            query: {
              ...state.carList.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_DISLIST_LIST]: {
      next(state, action) {
        return {
          ...state,
          disList: {
            ...state.disList,
            query: {
              ...state.disList.query,
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
    carList: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    disList: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
  }
);

export default reducer;
//车辆录入统计-大连
export const getCarList = createAction(FETCH_CARLIST_LIST, (data, paging) => {
  let url = '/BakDataMngAction_list';
  return httpCommonClient.post(url, { ...data, ...paging });
});
//重点关注企业抽查
export const getDisList = createAction(FETCH_DISLIST_LIST, (data, paging) => {
  return httpFormClient.formSubmit('/SpotTestTaskAction_getKeyDistributorsFiles', 'paging', { ...data, ...paging });
});

export const updateCarList = createAction(UPDATE_CARLIST_LIST);
export const updateDisList = createAction(UPDATE_DISLIST_LIST);
