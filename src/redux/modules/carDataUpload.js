import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient } from 'common/axios';
import _get from 'lodash/get';
import moment from 'moment';
// Actions
const FETCH_COLLECTIMPORT_LIST = 'YICHAKU/WARNING/FETCH_COLLECTIMPORT_LIST';
const UPDATE_COLLECTIMPORT_LIST = 'YICHAKU/WARNING/UPDATE_COLLECTIMPORT_LIST';

const FETCH_CHENGLIST_LIST = 'YICHAKU/WARNING/FETCH_CHENGLIST_LIST';
const UPDATE_CHENGLIST_LIST = 'YICHAKU/WARNING/UPDATE_CHENGLIST_LIST';

const FETCH_LISTITEM_LIST = 'YICHAKU/WARNING/FETCH_LISTITEM_LIST';
const UPDATE_LISTITEM_LIST = 'YICHAKU/WARNING/UPDATE_LISTITEM_LIST';

const FETCH_DISACTION_LIST = 'YICHAKU/WARNING/FETCH_DISACTION_LIST';
const UPDATE_DISACTION_LIST = 'YICHAKU/WARNING/UPDATE_DISACTION_LIST';

const FETCH_SPOTDIS_LIST = 'YICHAKU/WARNING/FETCH_SPOTDIS_LIST';
const UPDATE_SPOTDIS_LIST = 'YICHAKU/WARNING/UPDATE_SPOTDIS_LIST';

const FETCH_CARBILLCONTRAST_LIST = 'YICHAKU/WARNING/FETCH_CARBILLCONTRAST_LIST';
const UPDATE_CARBILLCONTRAST_LIST = 'YICHAKU/WARNING/UPDATE_CARBILLCONTRAST_LIST';

const FETCH_LISTUNSUPERVISED_LIST = 'YICHAKU/WARNING/FETCH_LISTUNSUPERVISED_LIST';
const UPDATE_LISTUNSUPERVISED_LIST = 'YICHAKU/WARNING/UPDATE_LISTUNSUPERVISED_LIST';

const FETCH_CARLIST_LIST = 'YICHAKU/WARNING/FETCH_CARLIST_LIST';
const UPDATE_CARLIST_LIST = 'YICHAKU/WARNING/UPDATE_CARLIST_LIST';

const LOADING = 'YICHAKU/WARNING/LOADING';

// Reducer
const reducer = handleActions(
  {
    [FETCH_COLLECTIMPORT_LIST]: {
      next(state, action) {
        return {
          ...state,
          collectImport: {
            ...state.collectImport,
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
    [FETCH_CHENGLIST_LIST]: {
      next(state, action) {
        return {
          ...state,
          chengList: {
            ...state.chengList,
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

    [FETCH_LISTITEM_LIST]: {
      next(state, action) {
        return {
          ...state,
          listItem: {
            ...state.listItem,
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
    [FETCH_SPOTDIS_LIST]: {
      next(state, action) {
        return {
          ...state,
          SpotDis: {
            ...state.SpotDis,
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
    [FETCH_DISACTION_LIST]: {
      next(state, action) {
        return {
          ...state,
          DisAction: {
            ...state.DisAction,
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
    [FETCH_CARBILLCONTRAST_LIST]: {
      next(state, action) {
        return {
          ...state,
          CarBillContrast: {
            ...state.CarBillContrast,
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
    [FETCH_LISTUNSUPERVISED_LIST]: {
      next(state, action) {
        return {
          ...state,
          ListUnsupervised: {
            ...state.ListUnsupervised,
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
    [FETCH_CARLIST_LIST]: {
      next(state, action) {
        return {
          ...state,
          Carlist: {
            ...state.Carlist,
            list: _get(action.payload.data.data, 'list', []),
            paging: {
              current: _get(action.payload.data.data, 'pageNum', 1),
              pageSize: _get(action.payload.data.data, 'pageSize', 10),
              total: _get(action.payload.data.data, 'total', 1),
            },
          },
        };
      },
    },
    [UPDATE_COLLECTIMPORT_LIST]: {
      next(state, action) {
        return {
          ...state,
          collectImport: {
            ...state.collectImport,
            query: {
              ...state.collectImport.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_CHENGLIST_LIST]: {
      next(state, action) {
        return {
          ...state,
          chengList: {
            ...state.chengList,
            query: {
              ...state.chengList.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_LISTITEM_LIST]: {
      next(state, action) {
        return {
          ...state,
          listItem: {
            ...state.listItem,
            query: {
              ...state.listItem.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_DISACTION_LIST]: {
      next(state, action) {
        return {
          ...state,
          DisAction: {
            ...state.DisAction,
            query: {
              ...state.DisAction.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_SPOTDIS_LIST]: {
      next(state, action) {
        return {
          ...state,
          SpotDis: {
            ...state.SpotDis,
            query: {
              ...state.SpotDis.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_CARBILLCONTRAST_LIST]: {
      next(state, action) {
        return {
          ...state,
          CarBillContrast: {
            ...state.CarBillContrast,
            query: {
              ...state.CarBillContrast.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_LISTUNSUPERVISED_LIST]: {
      next(state, action) {
        return {
          ...state,
          ListUnsupervised: {
            ...state.ListUnsupervised,
            query: {
              ...state.ListUnsupervised.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_CARLIST_LIST]: {
      next(state, action) {
        return {
          ...state,
          Carlist: {
            ...state.Carlist,
            query: {
              ...state.Carlist.query,
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
    collectImport: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    chengList: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    listItem: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    DisAction: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    SpotDis: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    CarBillContrast: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {
          buyTime: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          billTime: [moment().subtract(6, 'months'), moment()]
        },
        expandForm: false,
        aitiForm: true,
      },
    },
    ListUnsupervised: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    Carlist: {
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
//查询上传文件列表
export const getCollectImport = createAction(FETCH_COLLECTIMPORT_LIST, (data, paging) => {
  let url = '/CarDataUploadAction_list';
  return httpCommonClient.post(url, { ...data, ...paging });
});
//导入记录列表接口
export const getChengList = createAction(FETCH_CHENGLIST_LIST, (data, paging) => {
  let url = '/CarDataUploadAction_listRecord';
  return httpCommonClient.post(url, { ...data, ...paging });
});
//导入明细列表接口
export const getListItem = createAction(FETCH_LISTITEM_LIST, (data, paging) => {
  let url = '/CarDataUploadAction_listItem';
  return httpCommonClient.post(url, { ...data, ...paging });
});
//车辆明细对账-银行-列表
export const getDisAction = createAction(FETCH_DISACTION_LIST, (data, paging) => {
  let url = '/CarUnsupervisedDisAction_listDistributorCarUpload ';
  return httpCommonClient.post(url, { ...data, ...paging });
});

//已生成车辆明细的经销商列表
export const getSpotDis = createAction(FETCH_SPOTDIS_LIST, (data, paging) => {
  let url = '/UnsupervisedSpotDisAction_listSpotDistributors';
  return httpCommonClient.post(url, { ...data, ...paging });
});

//查询经销商赎车开票对比数据
export const getCarBillContrast = createAction(FETCH_CARBILLCONTRAST_LIST, (data, paging) => {
  let url = '/CarAction_searchDistributorCarBillContrastList';
  return httpCommonClient.post(url, { ...data, ...paging });
});

//撤监管车辆处理-经销商列表查询
export const getListUnsupervised = createAction(FETCH_LISTUNSUPERVISED_LIST, (data, paging) => {
  let url = '/DistributorAction_listUnsupervised';
  return httpCommonClient.post(url, { ...data, ...paging });
});

//撤监管车辆处理-经销商列表查询
export const getCarlist = createAction(FETCH_CARLIST_LIST, (data, paging) => {
  let url = '/warning/v1.0/sync/show/list/car/send/dealer';
  return httpCommonClient.postWithPaging(url, data, paging);
});

export const updateCollectImport = createAction(UPDATE_COLLECTIMPORT_LIST);
export const updateChengList = createAction(UPDATE_CHENGLIST_LIST);
export const updateListItem = createAction(UPDATE_LISTITEM_LIST);
export const updateDisAction = createAction(UPDATE_DISACTION_LIST);
export const updateSpotDis = createAction(UPDATE_SPOTDIS_LIST);
export const updateCarBillContrast = createAction(UPDATE_CARBILLCONTRAST_LIST);
export const updateListUnsupervised = createAction(UPDATE_LISTUNSUPERVISED_LIST);
export const updateCarlist = createAction(UPDATE_CARLIST_LIST);
