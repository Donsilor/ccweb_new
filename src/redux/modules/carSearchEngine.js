import { createAction, handleActions } from 'redux-actions';
import { httpFormClient } from 'common/axios';

// Actions

const LOADING = 'YICHAKU/CARSEARCHENGINE/LOADING';
const UPDATE_CARCHASSIS = 'YICHAKU/CARSEARCHENGINE/UPDATE_CARCHASSIS';
const FETCH_CARINFO = 'YICHAKU/CARSEARCHENGINE/FETCH_CARINFO';
const FETCH_CARTRACKLIST = 'YICHAKU/CARSEARCHENGINE/FETCH_CARTRACKLIST';
const FETCH_CARCURRENTTASK = 'YICHAKU/CARSEARCHENGINE/FETCH_CARCURRENTTASK';
const FETCH_CARTASKHIS = 'YICHAKU/CARSEARCHENGINE/FETCH_CARTASKHIS';
const FETCH_CARCHANGELIST = 'YICHAKU/CARSEARCHENGINE/FETCH_CARCHANGELIST';
const FETCH_CARCHASSISLIST = 'YICHAKU/CARSEARCHENGINE/FETCH_CARCHASSISLIST';
const UPDATE_CARID = 'YICHAKU/CARSEARCHENGINE/UPDATE_CARID';
const FETCH_VINCHANGELIST = 'YICHAKU/CARSEARCHENGINE/FETCH_VINCHANGELIST';


// Reducer
const reducer = handleActions(
  {
    [UPDATE_CARCHASSIS]: {
      next(state, action) {
        return {
          ...state,
          chassis: action.payload || '',
        };
      },
    },
    [UPDATE_CARID]: {
      next(state, action) {
        return {
          ...state,
          carId: action.payload || '',
        };
      },
    },
    [FETCH_CARINFO]: {
      next(state, action) {
        return {
          ...state,
          carInfo: action.payload.data.data || {},
          searchResult: (action.payload.data && {
            result: action.payload.data.result,
            msg: action.payload.data.msg,
          }) || {
            result: 0,
            msg: '',
          },
        };
      },
    },
    [FETCH_CARTRACKLIST]: {
      next(state, action) {
        return {
          ...state,
          trackList:
            action.payload.data.result === 0
              ? {
                list: action.payload.data.trackList || [],
                paging: {
                  current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
                  pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
                  total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
                },
              }
              : {
                list: [],
                paging: { current: 1, pageSize: 10, total: 10 },
              },
        };
      },
    },
    [FETCH_CARCURRENTTASK]: {
      next(state, action) {
        return {
          ...state,
          currentTaskList:
            action.payload.data.result === 0
              ? {
                list: action.payload.data.spottestList || [],
                paging: {
                  current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
                  pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
                  total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
                },
              }
              : {
                list: [],
                paging: { current: 1, pageSize: 10, total: 10 },
              },
        };
      },
    },
    [FETCH_CARTASKHIS]: {
      next(state, action) {
        return {
          ...state,
          taskHis:
            action.payload.data.result === 0
              ? {
                abnormal: action.payload.data.abnormal || '',
                abnormalRate: action.payload.data.abnormalRate || '',
                normal: action.payload.data.normal || '',
                total: action.payload.data.total || '',
                list: action.payload.data.spottestList || [],
                paging: {
                  current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
                  pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
                  total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
                },
              }
              : {
                abnormal: '',
                abnormalRate: '',
                normal: '',
                total: '',
                list: [],
                paging: { current: 1, pageSize: 10, total: 10 },
              },
        };
      },
    },
    [FETCH_CARCHANGELIST]: {
      next(state, action) {
        return {
          ...state,
          changeList:
            action.payload.data.result === 0
              ? {
                list: action.payload.data.changeList || [],
                paging: {
                  current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
                  pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
                  total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
                },
              }
              : {
                list: [],
                paging: { current: 1, pageSize: 10, total: 10 },
              },
        };
      },
    },
    [FETCH_VINCHANGELIST]: {
      next(state, action) {
        return {
          ...state,
          flowList:
            action.payload.data.result === 0
              ? {
                list: action.payload.data.flowList || [],
                paging: {
                  current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
                  pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
                  total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
                },
              }
              : {
                list: [],
                paging: { current: 1, pageSize: 10, total: 10 },
              },
        };
      },
    },
    [FETCH_CARCHASSISLIST]: {
      next(state, action) {
        return {
          ...state,
          chassisList: action.payload.data.list || [],
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
    chassis: '',
    carId: '',
    searchResult: {
      result: 0,
      msg: '',
    },
    carInfo: {},
    trackList: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    currentTaskList: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    taskHis: {
      abnormal: '',
      abnormalRate: '',
      normal: '',
      total: '',
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    changeList: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    flowList: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    chassisList: [],
    loading: false,
  }
);

export default reducer;

export const updateCarChassis = createAction(UPDATE_CARCHASSIS);
export const updateCarId = createAction(UPDATE_CARID);
export const fetchCarInfo = createAction(FETCH_CARINFO, data => {
  return httpFormClient.formSubmit('/CarAction_getDetail', '', data);
});
export const fetchCarTrackList = createAction(FETCH_CARTRACKLIST, (data, paging) => {
  return httpFormClient.formSubmit('/CarAction_searchTrackList', '', data, paging);
});
export const fetchCarCurrentTask = createAction(FETCH_CARCURRENTTASK, (data, paging) => {
  return httpFormClient.formSubmit('/CarAction_getSpottestUndone', '', data, paging);
});
export const fetchCarTaskHis = createAction(FETCH_CARTASKHIS, (data, paging) => {
  return httpFormClient.formSubmit('/CarAction_searchSpottestHistory', '', data, paging);
});
export const fetchCarChangeList = createAction(FETCH_CARCHANGELIST, (data, paging) => {
  return httpFormClient.formSubmit('/CarAction_searchChangeList', '', data, paging);
});
export const searchCarChassisList = createAction(FETCH_CARCHASSISLIST, (data, paging) => {
  return httpFormClient.formSubmit('/CarAction_getCarList', '', data, paging);
});
export const fetchVinChangeList = createAction(FETCH_VINCHANGELIST, (data, paging) => {
  return httpFormClient.formSubmit('/CarAction_searchVinChangeList', '', data, paging);
});