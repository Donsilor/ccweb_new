import { createAction, handleActions } from 'redux-actions';
import { httpFormClient } from '../../common/axios';

const LOADING = 'YICHAKU/CAMERALIST/LOADING';
const INSERT_CAMERA_INFO = 'YICHAKU/CAMERALIST/INSERT_CAMERA_INFO';
const FETCH_CAMERA_INFO = 'YICHAKU/CAMERALIST/FETCH_CAMERA_INFO';
const UPDATE_CAMERA_QUERY = 'YICHAKU/CAMERALIST/UPDATE_CAMERA_QUERY';
const FETCH_ENDPOINT_LIST = 'YICHAKU/CAMERALIST/FETCH_ENDPOINT_LIST';
const FETCH_DEALER_LIST = 'YICHAKU/CAMERALIST/FETCH_DEALER_LIST';
const UPDATE_CAMERA_DEALER_BIND = 'YICHAKU/CAMERALIST/UPDATE_CAMERA_DEALER_BIND';
const UPDATE_CAMERA_CLIENT_BIND = 'YICHAKU/CAMERALIST/UPDATE_CAMERA_CLIENT_BIND';
const UPDATE_CAMERA_INFO = 'YICHAKU/CAMERALIST/UPDATE_CAMERA_INFO';

const reducer = handleActions(
  {
    [LOADING]: {
      next(state, action) {
        return {
          ...state,
          loading: action.loading,
        };
      },
    },
    [FETCH_CAMERA_INFO]: {
      next(state, action) {
        return {
          ...state,
          list: action.payload.data.list || [],
          paging: {
            current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
            pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
            total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
          },
        };
      },
    },
    [UPDATE_CAMERA_QUERY]: {
      next(state, action) {
        return {
          ...state,
          query: {
            ...state.query,
            ...action.payload,
          },
        };
      },
    },
    [FETCH_ENDPOINT_LIST]: {
      next(state, action) {
        return {
          ...state,
          endPointList: action.payload.data.list || [],
        };
      },
    },
    [FETCH_DEALER_LIST]: {
      next(state, action) {
        return {
          ...state,
          dealerList: action.payload.data.list || [],
        };
      },
    },
  },
  {
    loading: true,
    list: [],
    paging: { current: 1, pageSize: 10, total: 10 },
    query: {
      value: {},
      expandForm: false,
    },
    endPointList: [],
    dealerList: [],
  }
);

export default reducer;

export const insertCamera = createAction(INSERT_CAMERA_INFO, data => {
  return httpFormClient.formSubmit('/CameraAction_saveCameraInsert', '', data);
});

export const fetchCameraList = createAction(FETCH_CAMERA_INFO, (data, paging) => {
  return httpFormClient.formSubmit('/CameraAction_findList', '', data, paging);
});

export const updateCameraQuery = createAction(UPDATE_CAMERA_QUERY);

export const fetchEndPointList = createAction(FETCH_ENDPOINT_LIST, () => {
  return httpFormClient.formSubmit('/CameraAction_findEndPointList', '');
});

export const fetchDealerList = createAction(FETCH_DEALER_LIST, () => {
  return httpFormClient.formSubmit('/CameraAction_findDealerList', '');
});

export const updateCameraDealerBind = createAction(UPDATE_CAMERA_DEALER_BIND, data => {
  return httpFormClient.formSubmit('/CameraAction_allocateUsers', '', data);
});

export const updateCameraClientBind = createAction(UPDATE_CAMERA_CLIENT_BIND, data => {
  return httpFormClient.formSubmit('/CameraAction_bindEnd', '', data);
});

export const updateCameraInfo = createAction(UPDATE_CAMERA_INFO, data => {
  return httpFormClient.formSubmit('/CameraAction_saveCameraUpdate', '', data);
});
