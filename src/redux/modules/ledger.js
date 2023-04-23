import { createAction, handleActions } from 'redux-actions';
import { httpFormClient, httpBlobClient, httpCommonClient } from 'common/axios';
import moment from 'moment';
// Actions
const ACTION_FETCH_EW_SUMMARY = 'YICHAKU/LEDGER/FETCH_EW_SUMMARY';
const ACTION_UPDATE_EW_SUMMARY = 'YICHAKU/LEDGER/UPDATE_EW_SUMMARY';
const UPDATE_EW_SUMMARY = 'YICHAKU/LEDGER/UPDATE_EW_SUMMARY';

const ACTION_FETCH_EW_DETAIL = 'YICHAKU/LEDGER/FETCH_EW_DETAIL';
const ACTION_UPDATE_EW_DETAIL = 'YICHAKU/LEDGER/UPDATE_EW_DETAIL';
const UPDATE_EW_DETAIL = 'YICHAKU/LEDGER/UPDATE_EW_DETAIL';

const ACTION_FETCH_DIS_BOND = 'YICHAKU/LEDGER/FETCH_DIS_BOND';
const ACTION_UPDATE_DIS_BOND = 'YICHAKU/LEDGER/UPDATE_DIS_BOND';
const UPDATE_DIS_BOND = 'YICHAKU/LEDGER/UPDATE_DIS_BOND';

const ACTION_FETCH_EW_BOND = 'YICHAKU/LEDGER/FETCH_EW_BOND';
const ACTION_UPDATE_EW_BOND = 'YICHAKU/LEDGER/UPDATE_EW_BOND';
const UPDATE_EW_BOND = 'YICHAKU/LEDGER/UPDATE_EW_BOND';

const ACTION_FETCH_BOND_DETAIL = 'YICHAKU/LEDGER/FETCH_BOND_DETAIL';
const ACTION_UPDATE_BOND_DETAIL = 'YICHAKU/LEDGER/UPDATE_EW_DETAIL';
const UPDATE_BOND_DETAIL = 'YICHAKU/LEDGER/UPDATE_BOND_DETAIL';

const ACTION_FETCH_EWONLINE_LIST = 'YICHAKU/LEDGER/FETCH_EWONLINE_LIST';
const UPDATE_EWONLINE_LIST = 'YICHAKU/LEDGER/UPDATE_EWONLINE_LIST';

const ACTION_FETCH_EWONLINE_DETAIL = 'YICHAKU/LEDGER/FETCH_EWONLINE_DETAIL';
const ACTION_UPDATE_EWONLINE_DETAIL = 'YICHAKU/LEDGER/UPDATE_EWONLINE_DETAIL';
const UPDATE_EWONLINE_DETAIL = 'YICHAKU/LEDGER/UPDATE_EWONLINE_DETAIL';

const ACTION_FETCH_SPOTMOVE_LIST = 'YICHAKU/LEDGER/ACTION_FETCH_SPOTMOVE_LIST';
const UPDATE_FETCH_SPOTMOVE_LIST = 'YICHAKU/LEDGER/UPDATE_FETCH_SPOTMOVE_LIST';
const ACTION_UPDATE_SPOTMOVE_DETAIL = 'YICHAKU/LEDGER/UPDATE_SPOTMOVE_DETAIL';

const LOADING = 'YICHAKU/LEDGER/LOADING';

// Reducer
const reducer = handleActions(
  {
    [ACTION_FETCH_EW_SUMMARY]: {
      next(state, action) {
        return {
          ...state,
          ewSummary: {
            ...state.ewSummary,
            list: action.payload.data.list || [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
          },
        };
      },
    },
    [ACTION_FETCH_EW_DETAIL]: {
      next(state, action) {
        return {
          ...state,
          ewDetail: {
            ...state.ewDetail,
            list: action.payload.data.list || [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
          },
        };
      },
    },
    [ACTION_FETCH_DIS_BOND]: {
      next(state, action) {
        return {
          ...state,
          disBond: {
            ...state.disBond,
            list: action.payload.data.list || [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
          },
        };
      },
    },
    [ACTION_FETCH_EW_BOND]: {
      next(state, action) {
        return {
          ...state,
          ewBond: {
            ...state.ewBond,
            list: action.payload.data.list || [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
          },
        };
      },
    },
    [ACTION_FETCH_BOND_DETAIL]: {
      next(state, action) {
        return {
          ...state,
          bondDetail: {
            ...state.bondDetail,
            list: action.payload.data.list || [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
          },
        };
      },
    },
    [ACTION_FETCH_EWONLINE_LIST]: {
      next(state, action) {
        return {
          ...state,
          ewOnlineList: {
            ...state.ewOnlineList,
            list: action.payload.data.list || [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
          },
        };
      },
    },
    [ACTION_FETCH_EWONLINE_DETAIL]: {
      next(state, action) {
        return {
          ...state,
          ewOnlineDetail: {
            ...state.ewOnlineDetail,
            list: action.payload.data.list || [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
          },
        };
      },
    },
    [ACTION_FETCH_SPOTMOVE_LIST]: {
      next(state, action) {
        return {
          ...state,
          ewSpotMoveList: {
            ...state.ewSpotMoveList,
            list: action.payload.data.list || [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
          },
        };
      },
    },
    [UPDATE_EW_SUMMARY]: {
      next(state, action) {
        return {
          ...state,
          ewSummary: {
            ...state.ewSummary,
            query: {
              ...state.ewSummary.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_EW_DETAIL]: {
      next(state, action) {
        return {
          ...state,
          ewDetail: {
            ...state.ewDetail,
            query: {
              ...state.ewDetail.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_DIS_BOND]: {
      next(state, action) {
        return {
          ...state,
          disBond: {
            ...state.disBond,
            query: {
              ...state.disBond.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_EW_BOND]: {
      next(state, action) {
        return {
          ...state,
          ewBond: {
            ...state.ewBond,
            query: {
              ...state.ewBond.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_BOND_DETAIL]: {
      next(state, action) {
        return {
          ...state,
          bondDetail: {
            ...state.bondDetail,
            query: {
              ...state.bondDetail.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_EWONLINE_LIST]: {
      next(state, action) {
        return {
          ...state,
          ewOnlineList: {
            ...state.ewOnlineList,
            query: {
              ...state.ewOnlineList.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_EWONLINE_DETAIL]: {
      next(state, action) {
        return {
          ...state,
          ewOnlineDetail: {
            ...state.ewOnlineDetail,
            query: {
              ...state.ewOnlineDetail.query,
              ...action.payload,
              expandForm: false,
            },
          },
        };
      },
    },
    [UPDATE_FETCH_SPOTMOVE_LIST]: {
      next(state, action) {
        return {
          ...state,
          ewSpotMoveList: {
            ...state.ewSpotMoveList,
            query: {
              ...state.ewSpotMoveList.query,
              ...action.payload,
            },
          },
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
    ewSummary: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
      },
    },
    ewDetail: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
      },
    },
    disBond: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
      },
    },
    ewBond: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
      },
    },
    bondDetail: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
      },
    },
    ewOnlineList: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
      },
    },
    ewOnlineDetail: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
      },
    },
    ewSpotMoveList: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {
          taskFlag: 1,
          beginTime: moment()
            .startOf('month')
            .format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
        },
        expandForm: false,
      },
    },
    loading: true,
  }
);

export default reducer;

export const FETCH_EW_SUMMARY = createAction(ACTION_FETCH_EW_SUMMARY, (data, paging) => {
  return httpFormClient.formSubmit('/LedgerAction_ewStatisticsLedger', 'ebQuery', data, paging);
});
export const EXPORT_EW_SUMMARY = createAction(ACTION_UPDATE_EW_SUMMARY, data => {
  return httpBlobClient.formSubmit('/LedgerAction_exportEwStatisticsLedger', 'ebQuery', data);
});

export const FETCH_EW_DETAIL = createAction(ACTION_FETCH_EW_DETAIL, (data, paging) => {
  return httpFormClient.formSubmit('/LedgerAction_ewDetailLedger', 'ebQuery', data, paging);
});

export const EXPORT_EW_DETAIL = createAction(ACTION_UPDATE_EW_DETAIL, data => {
  return httpBlobClient.formSubmit('/LedgerAction_exportEwDetailLedger', 'ebQuery', data);
});

export const FETCH_DIS_BOND = createAction(ACTION_FETCH_DIS_BOND, (data, paging) => {
  return httpFormClient.formSubmit('/LedgerAction_disDepositTotalList', 'ebQuery', data, paging);
});

export const EXPORT_DIS_BOND = createAction(ACTION_UPDATE_DIS_BOND, data => {
  return httpBlobClient.formSubmit('/LedgerAction_exportDisDepositTotalList', 'ebQuery', data);
});

export const FETCH_EW_BOND = createAction(ACTION_FETCH_EW_BOND, (data, paging) => {
  return httpFormClient.formSubmit('/LedgerAction_ewDepositTotalList', 'ebQuery', data, paging);
});

export const EXPORT_EW_BOND = createAction(ACTION_UPDATE_EW_BOND, data => {
  return httpBlobClient.formSubmit('/LedgerAction_exportEwDepositTotalList', 'ebQuery', data);
});

export const FETCH_BOND_DETAIL = createAction(ACTION_FETCH_BOND_DETAIL, (data, paging) => {
  return httpFormClient.formSubmit('/LedgerAction_ewDepositDetailList', 'ebQuery', data, paging);
});

export const EXPORT_BOND_DETAIL = createAction(ACTION_UPDATE_BOND_DETAIL, data => {
  return httpBlobClient.formSubmit('/LedgerAction_exportEwDepositDetailList', 'ebQuery', data);
});

export const FETCH_EWONLINE_LIST = createAction(ACTION_FETCH_EWONLINE_LIST, (data, paging) => {
  return httpFormClient.formSubmit('/EwCollectAction_ewOnlineInfoEntry', 'query', data, paging);
});
export const FETCH_EWONLINE_DETAIL = createAction(ACTION_FETCH_EWONLINE_DETAIL, (data, paging) => {
  return httpFormClient.formSubmit('/EwCollectAction_queryEwOnlineDetail', 'query', data, paging);
});

export const EXPORT_EWONLINE_DETAIL = createAction(ACTION_UPDATE_EWONLINE_DETAIL, data => {
  return httpBlobClient.formSubmit('/EwCollectAction_exportEwOnlineDetail', 'query', data);
});

export const FETCH_SPOTMOVE_LIST = createAction(ACTION_FETCH_SPOTMOVE_LIST, (data, paging) => {
  return httpFormClient.formSubmit('/SpotStatAction_getSpotMoveStatList', '', data, paging);
});
export const EXPORT_SPOTMOVE_DETAIL = createAction(ACTION_UPDATE_SPOTMOVE_DETAIL, data => {
  return httpBlobClient.formSubmit('/SpotStatAction_exportSpotMoveStatList', '', data);
});

export const updateEwSummaryQuery = createAction(UPDATE_EW_SUMMARY);
export const updateEwDetailQuery = createAction(UPDATE_EW_DETAIL);
export const updateDisBondQuery = createAction(UPDATE_DIS_BOND);
export const updateEwBondQuery = createAction(UPDATE_EW_BOND);
export const updateBondDetailQuery = createAction(UPDATE_BOND_DETAIL);
export const updateEwOnlineListQuery = createAction(UPDATE_EWONLINE_LIST);
export const updateEwOnlineDetailQuery = createAction(UPDATE_EWONLINE_DETAIL);
export const updateSpotMoveStatListQuery = createAction(UPDATE_FETCH_SPOTMOVE_LIST);
