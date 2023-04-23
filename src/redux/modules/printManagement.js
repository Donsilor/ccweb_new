import { createAction, handleActions } from 'redux-actions';
import { httpFormClient, httpBlobClient } from 'common/axios';

// Actions

const LOADING = 'YICHAKU/PRINTMANAGEMENT/LOADING';
const FETCH_INITIAL_TRANSFERIN = 'YICHAKU/PRINTMANAGEMENT/FETCH_INITIAL_TRANSFERIN';
const EXPORT_TRANSFEROUT = 'YICHAKU/PRINTMANAGEMENT/EXPORT_TRANSFEROUT';
const FETCH_SUPPLEMENTARY_TRANSFERIN = 'YICHAKU/PRINTMANAGEMENT/FETCH_SUPPLEMENTARY_TRANSFERIN';
const FETCH_CURRENT_INIT = 'YICHAKU/PRINTMANAGEMENT/FETCH_CURRENT_INIT';
const FETCH_CURRENT_SUPPLEMENT = 'YICHAKU/PRINTMANAGEMENT/FETCH_CURRENT_SUPPLEMENT';
const FETCH_TRANSFEROUT = 'YICHAKU/PRINTMANAGEMENT/FETCH_TRANSFEROUT';
const FETCH_TRANSFEROUT_HIS = 'YICHAKU/PRINTMANAGEMENT/FETCH_TRANSFEROUT_HIS';
const FETCH_EW_DETAIL = 'YICHAKU/PRINTMANAGEMENT/FETCH_EW_DETAIL';
const UPDATE_QUERY = 'YICHAKU/PRINTMANAGEMENT/UPDATE_QUERY';
// const UPDATEQUERY_INITIAL_TRANSFERIN = "YICHAKU/PRINTMANAGEMENT/UPDATEQUERY_INITIAL_TRANSFERIN";

// Reducer
const reducer = handleActions(
  {
    [FETCH_INITIAL_TRANSFERIN]: {
      next(state, action) {
        return {
          ...state,
          initialTransferInData: {
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
    [FETCH_EW_DETAIL]: {
      next(state, action) {
        return {
          ...state,
          ewDetailData: {
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
    [FETCH_SUPPLEMENTARY_TRANSFERIN]: {
      next(state, action) {
        return {
          ...state,
          supplementaryTransferInData: {
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
    [FETCH_CURRENT_INIT]: {
      next(state, action) {
        return {
          ...state,
          currentInitData: {
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
    [FETCH_CURRENT_SUPPLEMENT]: {
      next(state, action) {
        return {
          ...state,
          currentSupplementData: {
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
    [FETCH_TRANSFEROUT]: {
      next(state, action) {
        return {
          ...state,
          transferOutData: {
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
    [FETCH_TRANSFEROUT_HIS]: {
      next(state, action) {
        return {
          ...state,
          transferOutHisData: {
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
    [UPDATE_QUERY]: {
      next(state, action) {
        return {
          ...state,
          query: { ...action.payload },
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
    initialTransferInData: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    supplementaryTransferInData: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    currentInitData: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    currentSupplementData: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    transferOutData: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    transferOutHisData: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    ewDetailData: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    query: {
      brandName: '',
      distributorName: '',
    },
    loading: true,
  }
);

export default reducer;

export const initialTransferInFetch = createAction(FETCH_INITIAL_TRANSFERIN, (data, paging) => {
  return httpFormClient.formSubmit('/BondPrintAction_getInitTurnInList', 'bpQuery', data, paging);
});
export const ewDetailFetch = createAction(FETCH_EW_DETAIL, (data, paging) => {
  return httpFormClient.formSubmit('/BondPrintAction_getEwList', 'ebQuery', data, paging);
});
export const transferInExport = createAction(EXPORT_TRANSFEROUT, data => {
  return httpFormClient.formSubmit('/BondPrintAction_exportBondTurnIn', 'bpQuery', data);
});

export const transferOutExport = createAction(EXPORT_TRANSFEROUT, data => {
  return httpFormClient.formSubmit('/BondPrintAction_exportBondTurnOut', 'bpQuery', data);
});

export const supplementaryTransferInFetch = createAction(FETCH_SUPPLEMENTARY_TRANSFERIN, (data, paging) => {
  return httpFormClient.formSubmit('/BondPrintAction_getAddTurnInList', 'bpQuery', data, paging);
});
export const currentInitFetch = createAction(FETCH_CURRENT_INIT, (data, paging) => {
  return httpFormClient.formSubmit('/BondPrintAction_getCurrentInitList', 'bpQuery', data, paging);
});
export const currentSupplementFetch = createAction(FETCH_CURRENT_SUPPLEMENT, (data, paging) => {
  return httpFormClient.formSubmit('/BondPrintAction_getCurrentAddList', 'bpQuery', data, paging);
});
export const transferOutFetch = createAction(FETCH_TRANSFEROUT, (data, paging) => {
  return httpFormClient.formSubmit('/BondPrintAction_getTurnOutList', 'bpQuery', data, paging);
});
export const transferOutHisFetch = createAction(FETCH_TRANSFEROUT_HIS, (data, paging) => {
  return httpFormClient.formSubmit('/BondPrintAction_getExportHistoryList', 'bpQuery', data, paging);
});
export const updateQuery = createAction(UPDATE_QUERY);
