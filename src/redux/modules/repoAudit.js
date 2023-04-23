import { createAction, handleActions } from 'redux-actions';
import { httpFormClient } from 'common/axios';

// Actions

const LOADING = 'YICHAKU/REPOAUDIT/LOADING';
const FETCH_TODO_LIST = 'YICHAKU/REPOAUDIT/FETCH_TODO_LIST';
const UPDATEQUERY_REPOAUDIT_TODO = 'YICHAKU/REPOAUDIT/UPDATEQUERY_REPOAUDIT_TODO';
const UPDATEQUERY_REPOLASTAUDIT_TODO = 'YICHAKU/REPOAUDIT/UPDATEQUERY_REPOLASTAUDIT_TODO';

const FETCH_ALL_LIST = 'YICHAKU/REPOAUDIT/FETCH_ALL_LIST';
const UPDATEQUERY_REPOAUDIT_ALL = 'YICHAKU/REPOAUDIT/UPDATEQUERY_REPOAUDIT_ALL';
const UPDATEQUERY_REPOLASTAUDIT_ALL = 'YICHAKU/REPOAUDIT/UPDATEQUERY_REPOLASTAUDIT_ALL';

const FETCH_REPO_DETAIL = 'YICHAKU/REPOAUDIT/FETCH_REPO_DETAIL';
const REPO_AUDIT = 'YICHAKU/REPOAUDIT/REPO_AUDIT';

const FETCH_REPO_HIS = 'YICHAKU/REPOAUDIT/FETCH_REPO_HIS';

// Reducer
const reducer = handleActions(
  {
    [FETCH_TODO_LIST]: {
      next(state, action) {
        return {
          ...state,
          todoData: {
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
    [FETCH_ALL_LIST]: {
      next(state, action) {
        return {
          ...state,
          allData: {
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
    [UPDATEQUERY_REPOAUDIT_TODO]: {
      next(state, action) {
        return {
          ...state,
          firstTodoQuery: {
            ...state.firstTodoQuery,
            ...action.payload,
          },
        };
      },
    },
    [UPDATEQUERY_REPOAUDIT_ALL]: {
      next(state, action) {
        return {
          ...state,
          firstAllQuery: {
            ...state.firstAllQuery,
            ...action.payload,
          },
        };
      },
    },
    [UPDATEQUERY_REPOLASTAUDIT_TODO]: {
      next(state, action) {
        return {
          ...state,
          lastTodoQuery: {
            ...state.lastTodoQuery,
            ...action.payload,
          },
        };
      },
    },
    [UPDATEQUERY_REPOLASTAUDIT_ALL]: {
      next(state, action) {
        return {
          ...state,
          lastAllQuery: {
            ...state.lastAllQuery,
            ...action.payload,
          },
        };
      },
    },
    [FETCH_REPO_DETAIL]: {
      next(state, action) {
        return {
          ...state,
          repoDetail: {
            info: { ...action.payload.data.info },
            photoInfo:
              (action.payload.data.photoInfo && {
                absolutePath: action.payload.data.photoInfo.absolutePath,
                latitude: action.payload.data.photoInfo.latitude,
                longitude: action.payload.data.photoInfo.longitude,
                location: action.payload.data.photoInfo.location,
                time: action.payload.data.photoInfo.opStarttime.time,
              }) ||
              {},
            videoInfo:
              (action.payload.data.videoInfo && {
                absolutePath: action.payload.data.videoInfo.absolutePath,
                latitude: action.payload.data.videoInfo.latitude,
                longitude: action.payload.data.videoInfo.longitude,
                location: action.payload.data.videoInfo.location,
                time: action.payload.data.videoInfo.opStarttime.time,
              }) ||
              {},
          },
        };
      },
    },
    [FETCH_REPO_HIS]: {
      next(state, action) {
        return {
          ...state,
          hisList: (action.payload.data && action.payload.data.list) || [],
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
    todoData: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    firstTodoQuery: {
      value: {
        status: -1,
      },
      expandForm: false,
    },
    allData: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    firstAllQuery: {
      value: {
        status: -1,
      },
      expandForm: false,
    },
    lastTodoQuery: {
      value: {
        status: -1,
      },
      expandForm: false,
    },
    lastAllQuery: {
      value: {
        status: -1,
      },
      expandForm: false,
    },
    repoDetail: {
      info: {},
      photoInfo: {},
      videoInfo: {},
    },
    hisList: [],
    loading: true,
  }
);

export default reducer;

export const firstTodoDataFetch = createAction(FETCH_TODO_LIST, (data, paging) => {
  return httpFormClient.formSubmit('/DepotManageAction_searchDepotAuditList', 'disLocExtraQuery', data, paging);
});
export const lastTodoDataFetch = createAction(FETCH_TODO_LIST, (data, paging) => {
  return httpFormClient.formSubmit('/DepotManageAction_searchDepotReviewList', 'disLocExtraQuery', data, paging);
});
export const updateTodoQuery = createAction(UPDATEQUERY_REPOAUDIT_TODO);
export const updateLastTodoQuery = createAction(UPDATEQUERY_REPOLASTAUDIT_TODO);
export const updateLastAllQuery = createAction(UPDATEQUERY_REPOLASTAUDIT_ALL);

export const allDataFetch = createAction(FETCH_ALL_LIST, (data, paging) => {
  return httpFormClient.formSubmit('/DepotManageAction_searchDepotAuditList', 'disLocExtraQuery', data, paging);
});
export const updateAllQuery = createAction(UPDATEQUERY_REPOAUDIT_ALL);

export const repoDetailFetch = createAction(FETCH_REPO_DETAIL, (data, paging) => {
  return httpFormClient.formSubmit('/DepotManageAction_searchDepotAuditInfo', '', data, paging);
});

export const auditFirstRepo = createAction(REPO_AUDIT, data => {
  return httpFormClient.formSubmit('/DepotManageAction_executeDepotAudit', 'disLocExtraQuery', data);
});

export const auditLastRepo = createAction(REPO_AUDIT, data => {
  return httpFormClient.formSubmit('/DepotManageAction_executeDepotReview', 'disLocExtraQuery', data);
});

export const fetchRepoHis = createAction(FETCH_REPO_HIS, data => {
  return httpFormClient.formSubmit('/DepotManageAction_searchOperationRecord', '', data);
});
