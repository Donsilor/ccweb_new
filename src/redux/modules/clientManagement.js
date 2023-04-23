import { createAction, handleActions } from 'redux-actions';
import { httpFormClient } from '../../common/axios';

const LOADING = 'YICHAKU/CLIENTMANAGEMENT/LOADING';
const FETCH_CLIENT_INFO = 'YICHAKU/CLIENTMANAGEMENT/FETCH_CLIENT_INFO';
const UPDATE_CLIENT_QUERY = 'YICHAKU/CLIENTMANAGEMENT/UPDATE_CLIENT_QUERY';
const INSERT_CLIENT_INFO = 'YICHAKU/CLIENTMANAGEMENT/INSERT_CLIENT_INFO';

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
    [FETCH_CLIENT_INFO]: {
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
    [UPDATE_CLIENT_QUERY]: {
      next(state, action) {
        return {
          ...state,
          ...{
            clientQuery: {
              ...state.clientQuery,
              ...action.payload,
            },
          },
        };
      },
    },
  },
  {
    loading: true,
    list: [],
    clientQuery: {
      value: {},
      expandForm: false,
    },
    paging: { current: 1, pageSize: 10, total: 10 },
  }
);

export default reducer;

export const insertClient = createAction(INSERT_CLIENT_INFO, data => {
  return httpFormClient.formSubmit('/EndPointAction_insert', '', data);
});
export const clientInfoFetch = createAction(FETCH_CLIENT_INFO, (data, paging) => {
  return httpFormClient.formSubmit('/EndPointAction_findList', '', data, paging);
});
export const updateClientQuery = createAction(UPDATE_CLIENT_QUERY);
