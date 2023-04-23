import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient, httpFormClient } from 'common/axios';
import _get from 'lodash/get';
// Actions
const FETCH_EWBLACK_LIST = 'YICHAKU/SOLDCONF/FETCH_EWBLACK_LIST';
const FETCH_RECORD_LIST = 'YICHAKU/SOLDCONF/FETCH_RECORD_LIST';
const FETCH_DETAIL_LIST = 'YICHAKU/SOLDCONF/FETCH_DETAIL_LIST';
const FETCH_NOSPOTCAR_LIST = 'YICHAKU/SOLDCONF/FETCH_NOSPOTCAR_LIST';
const FETCH_EWCHARGE_LIST = 'YICHAKU/SOLDCONF/FETCH_EWCHARGE_LIST';
const FETCH_DISDEPOSIT_LIST = 'YICHAKU/SOLDCONF/FETCH_DISDEPOSIT_LIST';
const FETCH_DISODD_LIST = 'YICHAKU/SOLDCONF/FETCH_DISODD_LIST';
const FETCH_DISFLOW_LIST = 'YICHAKU/SOLDCONF/FETCH_DISFLOW_LIST';

const UPDATE_EWBLACK_LIST = 'YICHAKU/SOLDCONF/UPDATE_EWBLACK_LIST';
const UPDATE_RECORD_LIST = 'YICHAKU/SOLDCONF/UPDATE_RECORD_LIST';
const UPDATE_DETAIL_LIST = 'YICHAKU/SOLDCONF/UPDATE_DETAIL_LIST';
const UPDATE_EWLIST = 'YICHAKU/SOLDCONF/UPDATE_EWLIST';
const UPDATE_NOSPOTCAR_LIST = 'YICHAKU/SOLDCONF/UPDATE_NOSPOTCAR_LIST';
const UPDATE_EWCHARGE_LIST = 'YICHAKU/SOLDCONF/UPDATE_EWCHARGE_LIST';
const UPDATE_DISDEPOSIT_LIST = 'YICHAKU/SOLDCONF/UPDATE_DISDEPOSIT_LIST';
const UPDATE_DISODD_LIST = 'YICHAKU/SOLDCONF/UPDATE_DISODD_LIST';
const UPDATE_DISFLOW_LIST = 'YICHAKU/SOLDCONF/UPDATE_DISFLOW_LIST';

const LOADING = 'YICHAKU/SOLDCONF/LOADING';

// Reducer
const reducer = handleActions(
  {
    [FETCH_EWBLACK_LIST]: {
      next(state, action) {
        return {
          ...state,
          todo: {
            ...state.todo,
            list: _get(action.payload.data, 'list', []),
            paging: {
              current: _get(action.payload.data, 'page.pageNum', 1),
              pageSize: _get(action.payload.data, 'page.pageSize', 10),
              total: _get(action.payload.data, 'page.total', 1),
            },
          },
        };
      },
    },
    [FETCH_RECORD_LIST]: {
      next(state, action) {
        return {
          ...state,
          record: {
            ...state.record,
            list: _get(action.payload.data, 'list', []),
            paging: {
              current: _get(action.payload.data, 'page.pageNum', 1),
              pageSize: _get(action.payload.data, 'page.pageSize', 10),
              total: _get(action.payload.data, 'page.total', 1),
            },
          },
        };
      },
    },
    [FETCH_DETAIL_LIST]: {
      next(state, action) {
        return {
          ...state,
          detail: {
            ...state.detail,
            list: _get(action.payload.data, 'list', []),
            paging: {
              current: _get(action.payload.data, 'page.pageNum', 1),
              pageSize: _get(action.payload.data, 'page.pageSize', 10),
              total: _get(action.payload.data, 'page.total', 1),
            },
          },
        };
      },
    },
    [FETCH_NOSPOTCAR_LIST]: {
      next(state, action) {
        return {
          ...state,
          noSpotCar: {
            ...state.noSpotCar,
            list: _get(action.payload.data, 'list', []),
            paging: {
              current: _get(action.payload.data, 'page.pageNum', 1),
              pageSize: _get(action.payload.data, 'page.pageSize', 10),
              total: _get(action.payload.data, 'page.total', 1),
            },
          },
        };
      },
    },
    [FETCH_EWCHARGE_LIST]: {
      next(state, action) {
        return {
          ...state,
          ewCharge: {
            ...state.ewCharge,
            list: _get(action.payload.data, 'list', []),
            paging: {
              current: _get(action.payload.data, 'page.pageNum', 1),
              pageSize: _get(action.payload.data, 'page.pageSize', 10),
              total: _get(action.payload.data, 'page.total', 1),
            },
          },
        };
      },
    },
    [FETCH_DISDEPOSIT_LIST]: {
      next(state, action) {
        return {
          ...state,
          disDeposit: {
            ...state.disDeposit,
            list: _get(action.payload.data, 'list', []),
            paging: {
              current: _get(action.payload.data, 'page.pageNum', 1),
              pageSize: _get(action.payload.data, 'page.pageSize', 10),
              total: _get(action.payload.data, 'page.total', 1),
            },
          },
        };
      },
    },
    [FETCH_DISODD_LIST]: {
      next(state, action) {
        return {
          ...state,
          disOdd: {
            ...state.disOdd,
            list: _get(action.payload.data, 'list', []),
            paging: {
              current: _get(action.payload.data, 'page.pageNum', 1),
              pageSize: _get(action.payload.data, 'page.pageSize', 10),
              total: _get(action.payload.data, 'page.total', 1),
            },
          },
        };
      },
    },
    [FETCH_DISFLOW_LIST]: {
      next(state, action) {
        return {
          ...state,
          disFlow: {
            ...state.disFlow,
            list: _get(action.payload.data, 'list', []),
            paging: {
              current: _get(action.payload.data, 'page.pageNum', 1),
              pageSize: _get(action.payload.data, 'page.pageSize', 10),
              total: _get(action.payload.data, 'page.total', 1),
            },
          },
        };
      },
    },

    [UPDATE_EWBLACK_LIST]: {
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
    [UPDATE_RECORD_LIST]: {
      next(state, action) {
        return {
          ...state,
          record: {
            ...state.record,
            query: {
              ...state.record.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_DETAIL_LIST]: {
      next(state, action) {
        return {
          ...state,
          detail: {
            ...state.detail,
            query: {
              ...state.detail.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_NOSPOTCAR_LIST]: {
      next(state, action) {
        return {
          ...state,
          noSpotCar: {
            ...state.noSpotCar,
            query: {
              ...state.noSpotCar.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_EWCHARGE_LIST]: {
      next(state, action) {
        return {
          ...state,
          ewCharge: {
            ...state.ewCharge,
            query: {
              ...state.ewCharge.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_DISDEPOSIT_LIST]: {
      next(state, action) {
        return {
          ...state,
          disDeposit: {
            ...state.disDeposit,
            query: {
              ...state.disDeposit.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_DISODD_LIST]: {
      next(state, action) {
        return {
          ...state,
          disOdd: {
            ...state.disOdd,
            query: {
              ...state.disOdd.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_DISFLOW_LIST]: {
      next(state, action) {
        return {
          ...state,
          disFlow: {
            ...state.disFlow,
            query: {
              ...state.disFlow.query,
              ...action.payload,
            },
          },
        };
      },
    },

    [UPDATE_EWLIST]: {
      next(state, action) {
        return {
          ...state,
          ewList: action.payload,
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
        aitiForm: true,
      },
    },
    record: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    detail: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    noSpotCar: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    ewCharge: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    disDeposit: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    disOdd: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    disFlow: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
        aitiForm: true,
      },
    },
    ewList: [],
  }
);

export default reducer;
//黑名单列表查询
export const spotEwBlackList = createAction(FETCH_EWBLACK_LIST, (data, paging) => {
  let url = '/SpottestEwBlacklistAction_searchList';
  return httpCommonClient.post(url, { ...data, ...paging });
});
//防作弊检查列表查询
export const searchRecordList = createAction(FETCH_RECORD_LIST, (data, paging) => {
  let url = '/AntiCheatingAction_searchRecordList';
  return httpCommonClient.post(url, { ...data, ...paging });
});
//防作弊检查明细查询
export const searchDetailList = createAction(FETCH_DETAIL_LIST, (data, paging) => {
  let url = '/AntiCheatingAction_searchDetailList';
  return httpCommonClient.post(url, { ...data, ...paging });
});
//超20天未查车辆
export const searchNoSpotCarList = createAction(FETCH_NOSPOTCAR_LIST, (data, paging) => {
  let url = '/SpotTestTaskAction_getNoSpotCarList';
  return httpCommonClient.post(url, { ...data, ...paging });
});
//二网明细台账-财务专用
export const searchEwChargeList = createAction(FETCH_EWCHARGE_LIST, (data, paging) => {
  let url = '/EwChargeLedgerAction_ewChargeList';
  return httpFormClient.formSubmit(url, '', data, paging);
});
//经销商保证金本金汇总台账
export const searchDisDepositList = createAction(FETCH_DISDEPOSIT_LIST, (data, paging) => {
  let url = '/BondPrintAction_getDistributorDepositList';
  return httpFormClient.formSubmit(url, '', data, paging);
});
//经销商保证金本金汇总台账-查看单号列表
export const searchDisOddList = createAction(FETCH_DISODD_LIST, (data, paging) => {
  let url = '/BondPrintAction_getDistributorDepositOddList';
  return httpFormClient.formSubmit(url, '', data, paging);
});
//经销商保证金本金汇总台账-交易明细列表
export const searchDisFlowList = createAction(FETCH_DISFLOW_LIST, (data, paging) => {
  let url = '/BondPrintAction_getDistributorDepositFlowList';
  return httpFormClient.formSubmit(url, '', data, paging);
});

export const updateEwBlackList = createAction(UPDATE_EWBLACK_LIST);
export const updateRecordList = createAction(UPDATE_RECORD_LIST);
export const updateEwList = createAction(UPDATE_EWLIST);
export const updateDetailList = createAction(UPDATE_DETAIL_LIST);
export const updateNoSpotCarList = createAction(UPDATE_NOSPOTCAR_LIST);
export const updateEwChargeList = createAction(UPDATE_EWCHARGE_LIST);
export const updateDisDepositList = createAction(UPDATE_DISDEPOSIT_LIST);
export const updateDisOddList = createAction(UPDATE_DISODD_LIST);
export const updateDisFlowList = createAction(UPDATE_DISFLOW_LIST);
