import { createAction, handleActions } from 'redux-actions';
import { httpFormClient, httpBlobClient } from 'common/axios';
import moment from 'moment';

// Actions
const ACTION_FETCH_CARMOVING = 'YICHAKU/CARFACTORYMANAGEMENT/FETCH_CARMOVING'; //移车点检表

const ACTION_FETCH_CHECKEDDETAIL = 'YICHAKU/CARFACTORYMANAGEMENT/FETCH_CHECKEDDETAIL'; //点检明细表

const ACTION_FETCH_CARSALES = 'YICHAKU/CARFACTORYMANAGEMENT/FETCH_CARSALES'; //车型销售表
const ACTION_FETCH_CARSALES_DETAIL = 'YICHAKU/CARFACTORYMANAGEMENT/FETCH_CARSALES_DETAIL'; //车型销售表弹出表

const ACTION_FETCH_DEALER_SALERINK = 'YICHAKU/CARFACTORYMANAGEMENT/FECTH_DEALER_SALERINK'; //经销商销量排名
const ACTION_FETCH_DEALER_SALERINK_DETAIL = 'YICHAKU/CARFACTORYMANAGEMENT/FETCH_DEALER_SALERINK_DETAIL'; //经销商销量排名弹出表

const ACTION_FETCH_SALERINK = 'YICHAKU/CARFACTORYMANAGEMENT/FETCH_SALERINK'; //二网销量排名
const ACTION_FETCH_SALERINK_DETAIL = 'YICHAKU/CARFACTORYMANAGEMENT/FETCH_SALERINK_DETAIL'; //二网销量排名弹出表

const UPDATE_CHECKEDDETAIL = 'YICHAKU/CARFACTORYMANAGEMENT/UPDATE_CHECKEDDETAIL'; //点检明细表
const UPDATE_CARMOVING = 'YICHAKU/CARFACTORYMANAGEMENT/UPDATE_CARMOVING'; //移车点检表
const UPDATE_CARSALES = 'YICHAKU/CARFACTORYMANAGEMENT/UPDATE_CARSALES'; //车型销量表
const UPDATE_DEALERSALERINK = 'YICHAKU/CARFACTORYMANAGEMENT/UPDATE_DEALERSALERINK'; //经销商销量排名
const UPDATE_EWSALERINK = 'YICHAKU/CARFACTORYMANAGEMENT/UPDATE_EWSALERINK'; //二网销量排名

const EXPORT_DATA = 'YICHAKU/CARFACTORYMANAGEMENT/EXPORT_DATA'; //报表导出

const LOADING = 'YICHAKU/CARFACTORYMANAGEMENT/LOADING';

const reducer = handleActions(
  {
    [ACTION_FETCH_CARMOVING]: {
      next(state, action) {
        return {
          ...state,
          carMoving: {
            list: action.payload.data.list || [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
            query: {
              ...state.carMoving.query,
            },
          },
        };
      },
    },
    [ACTION_FETCH_CHECKEDDETAIL]: {
      next(state, action) {
        return {
          ...state,
          checkedDetail: {
            list: action.payload.data.list || [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
            query: {
              ...state.checkedDetail.query,
            },
          },
        };
      },
    },
    [ACTION_FETCH_CARSALES]: {
      next(state, action) {
        return {
          ...state,
          carSales: {
            list: action.payload.data.list || [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
            query: {
              ...state.carSales.query,
            },
          },
        };
      },
    },
    [ACTION_FETCH_CARSALES_DETAIL]: {
      next(state, action) {
        return {
          ...state,
          carSalesDetail: {
            list: action.payload.data.list || [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
            query: {
              ...state.carSalesDetail.query,
            },
          },
        };
      },
    },
    [ACTION_FETCH_DEALER_SALERINK]: {
      next(state, action) {
        return {
          ...state,
          dealerSaleRink: {
            list: action.payload.data.list || [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
            query: {
              ...state.dealerSaleRink.query,
            },
          },
        };
      },
    },

    [ACTION_FETCH_DEALER_SALERINK_DETAIL]: {
      next(state, action) {
        return {
          ...state,
          dealerSaleRinkDetail: {
            list: action.payload.data.list || [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
            query: {
              ...state.dealerSaleRinkDetail.query,
            },
          },
        };
      },
    },

    [ACTION_FETCH_SALERINK]: {
      next(state, action) {
        return {
          ...state,
          ewSaleRink: {
            list: action.payload.data.list || [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
            query: {
              ...state.ewSaleRink.query,
            },
          },
        };
      },
    },

    [ACTION_FETCH_SALERINK_DETAIL]: {
      next(state, action) {
        return {
          ...state,
          ewSaleRinkDetail: {
            list: action.payload.data.list || [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
            query: {
              ...state.ewSaleRinkDetail.query,
            },
          },
        };
      },
    },

    [UPDATE_DEALERSALERINK]: {
      next(state, action) {
        return {
          ...state,
          dealerSaleRink: {
            ...state.dealerSaleRink,
            query: {
              ...state.dealerSaleRink.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_EWSALERINK]: {
      next(state, action) {
        return {
          ...state,
          ewSaleRink: {
            ...state.ewSaleRink,
            query: {
              ...state.ewSaleRink.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_CHECKEDDETAIL]: {
      next(state, action) {
        return {
          ...state,
          checkedDetail: {
            ...state.checkedDetail,
            query: {
              ...state.checkedDetail.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_CARSALES]: {
      next(state, action) {
        return {
          ...state,
          carSales: {
            ...state.carSales,
            query: {
              ...state.carSales.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_CARMOVING]: {
      next(state, action) {
        return {
          ...state,
          carMoving: {
            ...state.carMoving,
            query: {
              ...state.carMoving.query,
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
    carMoving: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {
          statisDate: [moment().subtract(30, 'days'), moment()],
        },
        expandForm: true,
      },
    },
    checkedDetail: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
      },
    },
    carSales: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
      },
    },
    carSalesDetail: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
      },
    },
    dealerSaleRink: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
      },
    },
    dealerSaleRinkDetail: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
      },
    },
    ewSaleRink: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
      },
    },
    ewSaleRinkDetail: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
      },
    },
    loading: true,
  }
);

export const FETCH_CARMOVING = createAction(ACTION_FETCH_CARMOVING, (data, paging) => {
  return httpFormClient.formSubmit('/AutomakerRegionAction_searchMoveCarInspectList', 'mcQuery', data, paging);
});

export const FETCH_CHECKEDDETAIL = createAction(ACTION_FETCH_CHECKEDDETAIL, (data, paging) => {
  return httpFormClient.formSubmit('/AutomakerRegionAction_searchCarManageInspectInfo', 'idQuery', data, paging);
});

export const FETCH_CARSALES = createAction(ACTION_FETCH_CARSALES, (data, paging) => {
  return httpFormClient.formSubmit('/AutomakerRegionAction_searchCarSalesList', 'sQuery', data, paging);
});

export const FETCH_CARSALES_DETAIL = createAction(ACTION_FETCH_CARSALES_DETAIL, (data, paging) => {
  return httpFormClient.formSubmit('/AutomakerRegionAction_searchCarSalesInfo', 'sQuery', data, paging);
});

export const FETCH_DEALER_SALERINK = createAction(ACTION_FETCH_DEALER_SALERINK, (data, paging) => {
  return httpFormClient.formSubmit('/AutomakerRegionAction_searchDistributorSalesList', 'sQuery', data, paging);
});

export const FETCH_DEALER_SALERINK_DETAIL = createAction(ACTION_FETCH_DEALER_SALERINK_DETAIL, (data, paging) => {
  return httpFormClient.formSubmit('/AutomakerRegionAction_searchDistributorSalesInfo', 'sQuery', data, paging);
});

export const FETCH_SALERINK = createAction(ACTION_FETCH_SALERINK, (data, paging) => {
  return httpFormClient.formSubmit('/AutomakerRegionAction_searchEwSalesList', 'sQuery', data, paging);
});

export const FETCH_SALERINK_DETAIL = createAction(ACTION_FETCH_SALERINK_DETAIL, (data, paging) => {
  return httpFormClient.formSubmit('AutomakerRegionAction_searchEwSalesInfo', 'sQuery', data, paging);
});

export const exportData = createAction(EXPORT_DATA, (data, type) => {
  let url = '',
    query = '';
  switch (type) {
    case 'ewSaleRink':
      url = 'AutomakerRegionAction_exportEwSalesInfo';
      query = 'sQuery';
      break;
    case 'dealerSaleRink':
      url = 'AutomakerRegionAction_exportDistributorSalesInfo';
      query = 'sQuery';
      break;
    case 'carMoving':
      url = 'AutomakerRegionAction_exportMoveCarInspectInfo';
      query = 'mcQuery';
      break;
    case 'checkedDetail':
      url = 'AutomakerRegionAction_exportCarManageInspectInfo';
      query = 'idQuery';
      break;
    case 'carSales':
      url = 'AutomakerRegionAction_exportCarSalesInfo';
      query = 'sQuery';
      break;
    default:
      break;
  }
  return url && httpBlobClient.formSubmit(url, query, data);
});

export const updateDealerSaleRink = createAction(UPDATE_DEALERSALERINK);
export const updateEwSaleRinkQuery = createAction(UPDATE_EWSALERINK);
export const updateCheckedDetailQuery = createAction(UPDATE_CHECKEDDETAIL);
export const updateCarMovingQuery = createAction(UPDATE_CARMOVING);
export const updateCarSalesQuery = createAction(UPDATE_CARSALES);

export default reducer;
