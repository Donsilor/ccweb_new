import { createAction, handleActions } from 'redux-actions';
import { httpFormClient, httpBlobClient } from 'common/axios';

// Actions

const LOADING = 'YICHAKU/BONDMANAGEMENT/LOADING';
const FETCH_TRANSFERIN = 'YICHAKU/BONDMANAGEMENT/FETCH_TRANSFERIN';
const EXPORT_TRANSFERIN = 'YICHAKU/BONDMANAGEMENT/EXPORT_TRANSFERIN';
const UPDATEQUERY_TRANSFERIN = 'YICHAKU/BONDMANAGEMENT/UPDATEQUERY_TRANSFERIN';
const FETCH_TRANSFERIN_RENEWAL = 'YICHAKU/BONDMANAGEMENT/FETCH_TRANSFERIN_RENEWAL';
const EXPORT_TRANSFERIN_RENEWAL = 'YICHAKU/BONDMANAGEMENT/EXPORT_TRANSFERIN_RENEWAL';
const UPDATEQUERY_TRANSFERIN_RENEWAL = 'YICHAKU/BONDMANAGEMENT/UPDATEQUERY_TRANSFERIN_RENEWAL';
const FETCH_TRANSFEROUT = 'YICHAKU/BONDMANAGEMENT/FETCH_TRANSFEROUT';
const EXPORT_TRANSFEROUT = 'YICHAKU/BONDMANAGEMENT/EXPORT_TRANSFEROUT';
const UPDATEQUERY_TRANSFEROUT = 'YICHAKU/BONDMANAGEMENT/UPDATEQUERY_TRANSFEROUT';

// Reducer
const reducer = handleActions(
  {
    [FETCH_TRANSFERIN]: {
      next(state, action) {
        return {
          ...state,
          transferInData: {
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
    [UPDATEQUERY_TRANSFERIN]: {
      next(state, action) {
        return {
          ...state,
          transferInQuery: {
            ...state.transferInQuery,
            ...action.payload,
          },
        };
      },
    },
    [FETCH_TRANSFERIN_RENEWAL]: {
      next(state, action) {
        return {
          ...state,
          transferInRenewalData: {
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
    [UPDATEQUERY_TRANSFERIN_RENEWAL]: {
      next(state, action) {
        return {
          ...state,
          transferInRenewalQuery: {
            ...state.transferInRenewalQuery,
            ...action.payload,
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
    [UPDATEQUERY_TRANSFEROUT]: {
      next(state, action) {
        return {
          ...state,
          transferOutQuery: {
            ...state.transferOutQuery,
            ...action.payload,
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
    transferInData: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    transferInQuery: {
      value: {
        isExport: -1,
      },
      expandForm: false,
    },
    transferInRenewalData: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    transferInRenewalQuery: {
      value: {
        isExport: -1,
      },
      expandForm: false,
    },
    transferOutData: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    transferOutQuery: {
      value: {
        isExport: -1,
      },
      expandForm: false,
    },
    loading: true,
  }
);

export default reducer;

export const transferInFetch = createAction(FETCH_TRANSFERIN, (data, paging) => {
  return httpFormClient.formSubmit('/BondFlowAction_turnInBondList', 'bfbQuery', data, paging);
});
export const transferInExport = createAction(EXPORT_TRANSFERIN, data => {
  return httpBlobClient.formSubmit('/BondFlowAction_exportTurnInBondList', '', data);
});
export const transferInUpdateQuery = createAction(UPDATEQUERY_TRANSFERIN);

export const transferInRenewalFetch = createAction(FETCH_TRANSFERIN_RENEWAL, (data, paging) => {
  return httpFormClient.formSubmit('/BondFlowAction_turnInBondContinueList', 'bfbQuery', data, paging);
});
export const transferInRenewalExport = createAction(EXPORT_TRANSFERIN_RENEWAL, data => {
  return httpBlobClient.formSubmit('/BondFlowAction_exportTurnInBondContinueList', '', data);
});
export const transferInRenewalUpdateQuery = createAction(UPDATEQUERY_TRANSFERIN_RENEWAL);

export const transferOutFetch = createAction(FETCH_TRANSFEROUT, (data, paging) => {
  return httpFormClient.formSubmit('/BondFlowAction_turnOutBondList', 'bfbQuery', data, paging);
});
export const transferOutExport = createAction(EXPORT_TRANSFEROUT, data => {
  return httpBlobClient.formSubmit('/BondFlowAction_exportTurnOutBondList', '', data);
});
export const transferOutUpdateQuery = createAction(UPDATEQUERY_TRANSFEROUT);
