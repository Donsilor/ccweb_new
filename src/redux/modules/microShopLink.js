import { createAction, handleActions } from 'redux-actions';
import _get from 'lodash/get';
import { httpCommonClient } from 'common/axios';

const FETCH_DISTRIBUTOR_LIST = 'YICHAKU/MICROSHOPLINK/FETCH_DISTRIBUTOR_LIST';
const FETCH_EW_LIST = 'YICHAKU/MICROSHOPLINK/FETCH_EW_LIST';

const CREATE_REL = 'YICHAKU/MICROSHOPLINK/CREATE_REL';

const UPDATE_DISTRIBUTOR_OPTION = 'YICHAKU/MICROSHOPLINK/UPDATE_DISTRIBUTOR_OPTION';

const UPDTAE_DISTRIBUTOR_QUERY = 'YICHAKU/MICROSHOPLINK/UPDTAE_DISTRIBUTOR_QUERY';
const UPDTAE_EW_QUERY = 'YICHAKU/MICROSHOPLINK/UPDTAE_EW_QUERY';

const LOADING = 'YICHAKU/MICROSHOPLINK/LOADING';

// Reducer
const reducer = handleActions(
  {
    [FETCH_DISTRIBUTOR_LIST]: {
      next(state, action) {
        return {
          ...state,
          distributor: {
            ...state.distributor,
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

    [FETCH_EW_LIST]: {
      next(state, action) {
        return {
          ...state,
          ew: {
            ...state.ew,
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

    [UPDATE_DISTRIBUTOR_OPTION]: {
      next(state, action) {
        return {
          ...state,
          distributorList: action.payload,
        };
      },
    },

    [UPDTAE_DISTRIBUTOR_QUERY]: {
      next(state, action) {
        return {
          ...state,
          distributor: {
            ...state.distributor,
            query: {
              ...state.distributor.query,
              ...action.payload,
            },
          },
        };
      },
    },

    [UPDTAE_EW_QUERY]: {
      next(state, action) {
        return {
          ...state,
          ew: {
            ...state.ew,
            query: {
              ...state.ew.query,
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
    distributor: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {
          shopType: 1,
        },
        expandForm: false,
        aitiForm: false,
      },
    },
    ew: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {
          shopType: 2,
        },
        expandForm: false,
        aitiForm: false,
      },
    },
    distributorList: [],
  }
);

export default reducer;

export const fetchDistributorList = createAction(FETCH_DISTRIBUTOR_LIST, (data, paging) => {
  let url = '/LinkAction_list';
  return httpCommonClient.post(url, { ...data, ...paging });
});
export const fetchEwList = createAction(FETCH_EW_LIST, (data, paging) => {
  let url = '/LinkAction_list';
  return httpCommonClient.post(url, { ...data, ...paging });
});

export const createRel = createAction(CREATE_REL, data => {
  let url = '/LinkAction_createRel';
  return httpCommonClient.post(url, { ...data });
});

export const updateDistributorQuery = createAction(UPDTAE_DISTRIBUTOR_QUERY);
export const updateEwQuery = createAction(UPDTAE_EW_QUERY);

export const updateDistributorOption = createAction(UPDATE_DISTRIBUTOR_OPTION);
