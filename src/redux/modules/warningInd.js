import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient } from 'common/axios';
import _get from 'lodash/get';
import moment from 'moment';
// Actions
const FETCH_REFUNDIMPORT_LIST = 'YICHAKU/WARNING/FETCH_REFUNDIMPORT_LIST';
const UPDATE_REFUNDIMPORT_LIST = 'YICHAKU/WARNING/UPDATE_REFUNDIMPORT_LIST';

const FETCH_EXPIREIMPORT_LIST = 'YICHAKU/WARNING/FETCH_EXPIREIMPORT_LIST';
const UPDATE_EXPIREIMPORT_LIST = 'YICHAKU/WARNING/UPDATE_EXPIREIMPORT_LIST';

const FETCH_SHIFTIMPORT_LIST = 'YICHAKU/WARNING/FETCH_SHIFTIMPORT_LIST';
const UPDATE_SHIFTIMPORT_LIST = 'YICHAKU/WARNING/UPDATE_SHIFTIMPORT_LIST';

const FETCH_CERTIFICATEIMPORT_LIST = 'YICHAKU/WARNING/FETCH_CERTIFICATEIMPORT_LIST';
const UPDATE_CERTIFICATEIMPORT_LIST = 'YICHAKU/WARNING/UPDATE_CERTIFICATEIMPORT_LIST';

const FETCH_SUPPLYCHAIN_LIST = 'YICHAKU/WARNING/FETCH_SUPPLYCHAIN_LIST';
const UPDATE_SUPPLYCHAIN_LIST = 'YICHAKU/WARNING/UPDATE_SUPPLYCHAIN_LIST';

const FETCH_BRANDLIST_LIST = 'YICHAKU/WARNING/FETCH_BRANDLIST_LIST';
const UPDATE_BRANDLIST_LIST = 'YICHAKU/WARNING/UPDATE_BRANDLIST_LIST';

const FETCH_ACCOUNTSTATE_LIST = 'YICHAKU/WARNING/FETCH_ACCOUNTSTATE_LIST';
const UPDATE_ACCOUNTSTATE_LIST = 'YICHAKU/WARNING/UPDATE_ACCOUNTSTATE_LIST';

const FETCH_TRADEANALY_LIST = 'YICHAKU/WARNING/FETCH_TRADEANALY_LIST';
const UPDATE_TRADEANALY_LIST = 'YICHAKU/WARNING/UPDATE_TRADEANALY_LIST';

const FETCH_SHIFTANALY_LIST = 'YICHAKU/WARNING/FETCH_SHIFTANALY_LIST';
const UPDATE_SHIFTANALY_LIST = 'YICHAKU/WARNING/UPDATE_SHIFTANALY_LIST';

const FETCH_REDEMANALY_LIST = 'YICHAKU/WARNING/FETCH_REDEMANALY_LIST';
const UPDATE_REDEMANALY_LIST = 'YICHAKU/WARNING/UPDATE_REDEMANALY_LIST';

const FETCH_RETURNANALY_LIST = 'YICHAKU/WARNING/FETCH_RETURNANALY_LIST';
const UPDATE_RETURNANALY_LIST = 'YICHAKU/WARNING/UPDATE_RETURNANALY_LIST';

const FETCH_WARNINGMES_LIST = 'YICHAKU/WARNING/FETCH_WARNINGMES_LIST';
const UPDATE_WARNINGMES_LIST = 'YICHAKU/WARNING/UPDATE_WARNINGMES_LIST';

const FETCH_BRANDMANA_LIST = 'YICHAKU/WARNING/FETCH_BRANDMANA_LIST';
const UPDATE_BRANDMANA_LIST = 'YICHAKU/WARNING/UPDATE_BRANDMANA_LIST';

const LOADING = 'YICHAKU/WARNING/LOADING';

// Reducer
const reducer = handleActions(
  {
    [FETCH_REFUNDIMPORT_LIST]: {
      next(state, action) {
        return {
          ...state,
          refundImport: {
            ...state.refundImport,
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
    [FETCH_EXPIREIMPORT_LIST]: {
      next(state, action) {
        return {
          ...state,
          expireImport: {
            ...state.expireImport,
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
    [FETCH_SHIFTIMPORT_LIST]: {
      next(state, action) {
        return {
          ...state,
          shiftImport: {
            ...state.shiftImport,
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
    [FETCH_CERTIFICATEIMPORT_LIST]: {
      next(state, action) {
        return {
          ...state,
          certificateImport: {
            ...state.certificateImport,
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
    [FETCH_SUPPLYCHAIN_LIST]: {
      next(state, action) {
        return {
          ...state,
          supplyChain: {
            ...state.supplyChain,
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
    [FETCH_BRANDLIST_LIST]: {
      next(state, action) {
        return {
          ...state,
          brand: {
            ...state.brand,
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
    [FETCH_ACCOUNTSTATE_LIST]: {
      next(state, action) {
        return {
          ...state,
          accountState: {
            ...state.accountState,
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
    [FETCH_TRADEANALY_LIST]: {
      next(state, action) {
        return {
          ...state,
          tradeAnaly: {
            ...state.tradeAnaly,
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
    [FETCH_SHIFTANALY_LIST]: {
      next(state, action) {
        return {
          ...state,
          shiftAnaly: {
            ...state.shiftAnaly,
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
    [FETCH_REDEMANALY_LIST]: {
      next(state, action) {
        return {
          ...state,
          redemAnaly: {
            ...state.redemAnaly,
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
    [FETCH_RETURNANALY_LIST]: {
      next(state, action) {
        return {
          ...state,
          returnAnaly: {
            ...state.returnAnaly,
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
    [FETCH_WARNINGMES_LIST]: {
      next(state, action) {
        return {
          ...state,
          warningMes: {
            ...state.warningMes,
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
    [FETCH_BRANDMANA_LIST]: {
      next(state, action) {
        return {
          ...state,
          brandMana: {
            ...state.brandMana,
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
    [UPDATE_REFUNDIMPORT_LIST]: {
      next(state, action) {
        return {
          ...state,
          refundImport: {
            ...state.refundImport,
            query: {
              ...state.refundImport.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_EXPIREIMPORT_LIST]: {
      next(state, action) {
        return {
          ...state,
          expireImport: {
            ...state.expireImport,
            query: {
              ...state.expireImport.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_SHIFTIMPORT_LIST]: {
      next(state, action) {
        return {
          ...state,
          shiftImport: {
            ...state.shiftImport,
            query: {
              ...state.shiftImport.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_CERTIFICATEIMPORT_LIST]: {
      next(state, action) {
        return {
          ...state,
          certificateImport: {
            ...state.certificateImport,
            query: {
              ...state.certificateImport.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_SUPPLYCHAIN_LIST]: {
      next(state, action) {
        return {
          ...state,
          supplyChain: {
            ...state.supplyChain,
            query: {
              ...state.supplyChain.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_BRANDLIST_LIST]: {
      next(state, action) {
        return {
          ...state,
          brand: {
            ...state.brand,
            query: {
              ...state.brand.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_ACCOUNTSTATE_LIST]: {
      next(state, action) {
        return {
          ...state,
          accountState: {
            ...state.accountState,
            query: {
              ...state.accountState.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_TRADEANALY_LIST]: {
      next(state, action) {
        return {
          ...state,
          tradeAnaly: {
            ...state.tradeAnaly,
            query: {
              ...state.tradeAnaly.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_SHIFTANALY_LIST]: {
      next(state, action) {
        return {
          ...state,
          shiftAnaly: {
            ...state.shiftAnaly,
            query: {
              ...state.shiftAnaly.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_REDEMANALY_LIST]: {
      next(state, action) {
        return {
          ...state,
          redemAnaly: {
            ...state.redemAnaly,
            query: {
              ...state.redemAnaly.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_RETURNANALY_LIST]: {
      next(state, action) {
        return {
          ...state,
          returnAnaly: {
            ...state.returnAnaly,
            query: {
              ...state.returnAnaly.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_WARNINGMES_LIST]: {
      next(state, action) {
        return {
          ...state,
          warningMes: {
            ...state.warningMes,
            query: {
              ...state.warningMes.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_BRANDMANA_LIST]: {
      next(state, action) {
        return {
          ...state,
          brandMana: {
            ...state.brandMana,
            query: {
              ...state.brandMana.query,
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
    refundImport: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    expireImport: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    shiftImport: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    certificateImport: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    supplyChain: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    brand: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    accountState: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {
          paramYearMonth: moment().subtract(1, 'months'),
        },
        expandForm: false,
        aitiForm: true,
      },
    },
    tradeAnaly: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    shiftAnaly: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    redemAnaly: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {
          paramYearMonth: moment().subtract(1, 'months'),
        },
        expandForm: false,
        aitiForm: true,
      },
    },
    returnAnaly: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {
          paramYearMonth: moment().subtract(1, 'months'),
        },
        expandForm: false,
        aitiForm: true,
      },
    },
    warningMes: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    brandMana: {
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
//查询导入分页数据-还款金额
export const getRefundImport = createAction(FETCH_REFUNDIMPORT_LIST, (data, paging) => {
  let url = '/warning/v1.0/warning/importRecord/list';
  return httpCommonClient.postWithPaging(url, data, paging);
});
//查询导入分页数据-到期票
export const getExpireImport = createAction(FETCH_EXPIREIMPORT_LIST, (data, paging) => {
  let url = '/warning/v1.0/warning/importRecord/list';
  return httpCommonClient.postWithPaging(url, data, paging);
});
//查询导入分页数据-转池台账
export const getShiftImport = createAction(FETCH_SHIFTIMPORT_LIST, (data, paging) => {
  let url = '/warning/v1.0/warning/importRecord/list';
  return httpCommonClient.postWithPaging(url, data, paging);
});
//查询导入分页数据-换证明细
export const getCertificateImport = createAction(FETCH_CERTIFICATEIMPORT_LIST, (data, paging) => {
  let url = '/warning/v1.0/warning/importRecord/list';
  return httpCommonClient.postWithPaging(url, data, paging);
});
//供应链列表
export const getSupplyChain = createAction(FETCH_SUPPLYCHAIN_LIST, (data, paging) => {
  let url = '/warning/v1.0/warning/supplyChain/list';
  return httpCommonClient.postWithPaging(url, data, paging);
});
//获取品牌列表
export const getBrandlist = createAction(FETCH_BRANDLIST_LIST, (data, paging) => {
  let url = '/warning/v1.0/warning/brand/list';
  return httpCommonClient.postWithPaging(url, data, paging);
});
//统计分析-出账情况列表
export const getAccountState = createAction(FETCH_ACCOUNTSTATE_LIST, (data, paging) => {
  let url = '/warning/v1.0/warning/maturedNote/list/accountState';
  return httpCommonClient.postWithPaging(url, data, paging);
});
//统计分析-换证情况列表
export const getTradeAnaly = createAction(FETCH_TRADEANALY_LIST, (data, paging) => {
  let url = '/warning/v1.0/warning/changeCertificateDetail/list';
  return httpCommonClient.postWithPaging(url, data, paging);
});
//统计分析-转池情况列表
export const getShiftAnaly = createAction(FETCH_SHIFTANALY_LIST, (data, paging) => {
  let url = '/warning/v1.0/warning/transferLedger/list';
  return httpCommonClient.postWithPaging(url, data, paging);
});
//统计分析-赎车情况列表
export const getRedemAnaly = createAction(FETCH_REDEMANALY_LIST, (data, paging) => {
  let url = '/warning/v1.0/warning/repaymentAmount/list';
  return httpCommonClient.postWithPaging(url, data, paging);
});
//统计分析-回款情况列表
export const getReturnAnaly = createAction(FETCH_RETURNANALY_LIST, (data, paging) => {
  let url = '/warning/v1.0/warning/maturedNote/list/returnedMoneyState';
  return httpCommonClient.postWithPaging(url, data, paging);
});
//预警信息
export const getWarningMes = createAction(FETCH_WARNINGMES_LIST, (data, paging) => {
  let url = '/warning/v1.0/warning/maturedNote/list/WarningState';
  return httpCommonClient.postWithPaging(url, data, paging);
});
//品牌合作管理列表
export const getBrandMana = createAction(FETCH_BRANDMANA_LIST, (data, paging) => {
  let url = '/warning/v1.0/warning/supplyChainDealerRel/list/cooperateBrand';
  return httpCommonClient.postWithPaging(url, data, paging);
});

export const updateRefundImport = createAction(UPDATE_REFUNDIMPORT_LIST);
export const updateExpireImport = createAction(UPDATE_EXPIREIMPORT_LIST);
export const updateShiftImport = createAction(UPDATE_SHIFTIMPORT_LIST);
export const updateCertificateImport = createAction(UPDATE_CERTIFICATEIMPORT_LIST);

export const updateSupplyChain = createAction(UPDATE_SUPPLYCHAIN_LIST);
export const updateBrandlist = createAction(UPDATE_BRANDLIST_LIST);

export const updateAccountState = createAction(UPDATE_ACCOUNTSTATE_LIST);
export const updateTradeAnaly = createAction(UPDATE_TRADEANALY_LIST);
export const updateShiftAnaly = createAction(UPDATE_SHIFTANALY_LIST);
export const updateRedemAnaly = createAction(UPDATE_REDEMANALY_LIST);
export const updateReturnAnaly = createAction(UPDATE_RETURNANALY_LIST);

export const updateWarningMes = createAction(UPDATE_WARNINGMES_LIST);
export const updateBrandMana = createAction(UPDATE_BRANDMANA_LIST);
