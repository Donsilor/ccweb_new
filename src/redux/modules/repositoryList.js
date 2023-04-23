import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient, httpFormClient } from '../../common/axios';

const LOADING = 'YICHAKU/REPOSITORYLIST/LOADING';
const FETCH_REPO_LIST = 'YICHAKU/REPOSITORYLIST/FETCH_REPOSITORY_LIST';
const FETCH_CAMERA_LIST = 'YICHAKU/REPOSITORYLIST/FETCH_CAMERA_LIST';
const FETCH_K_DATA = 'YICHAKU/REPOSITORYLIST/FETCH_K_DATA';
const FETCH_TODO_WARNING = 'YICHAKU/REPOSITORYLIST/FETCH_TODO_WARNING';
const FETCH_GONE_WARNING = 'YICHAKU/REPOSITORYLIST/FETCH_GONE_WARNING';

const UPDATE_FACTORY_ID = 'YICHAKU/REPOSITORYLIST/UPDATE_FACTORY_ID';
const UPDATE_CAMERA_CODE = 'YICHAKU/REPOSITORYLIST/UPDATE_CAMERA_CODE';
const UPDATE_REPOSITORY = 'YICHAKU/REPOSITORYLIST/UPDATE_REPOSITORY';
const UPDATE_TODO_WARNING_QUERY = 'YICHAKU/REPOSITORYLIST/UPDATE_TODO_WARNING_QUERY';
const UPDATE_GONE_WARNING_QUERY = 'YICHAKU/REPOSITORYLIST/UPDATE_GONE_WARNING_QUERY';

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
    [FETCH_REPO_LIST]: {
      next(state, action) {
        return {
          ...state,
          repoList: action.payload.data.list || [],
          paging: {
            current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
            pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
            total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
          },
        };
      },
    },
    [FETCH_TODO_WARNING]: {
      next(state, action) {
        return {
          ...state,
          warningTodo: {
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
    [FETCH_GONE_WARNING]: {
      next(state, action) {
        return {
          ...state,
          warningGone: {
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
    [UPDATE_FACTORY_ID]: {
      next(state, action) {
        return {
          ...state,
          factoryId: action.payload || '',
        };
      },
    },
    [UPDATE_CAMERA_CODE]: {
      next(state, action) {
        return {
          ...state,
          serialNumber: action.payload || '',
        };
      },
    },
    [UPDATE_TODO_WARNING_QUERY]: {
      next(state, action) {
        return {
          ...state,
          ...{
            warningTodoQuery: {
              ...state.warningTodoQuery,
              ...action.payload,
            },
          },
        };
      },
    },
    [UPDATE_GONE_WARNING_QUERY]: {
      next(state, action) {
        return {
          ...state,
          ...{
            warningGoneQuery: {
              ...state.warningGoneQuery,
              ...action.payload,
            },
          },
        };
      },
    },
  },
  {
    loading: true,
    repoList: [],
    paging: { current: 1, pageSize: 10, total: 10 },
    factoryId: '',
    serialNumber: '',
    warningTodo: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    warningGone: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    warningTodoQuery: {
      value: {
        isRemove: 0,
      },
      expandForm: false,
    },
    warningGoneQuery: {
      value: {
        isRemove: 1,
      },
      expandForm: false,
    },
  }
);

export default reducer;

export const repoListFetch = createAction(FETCH_REPO_LIST, paging => {
  return httpFormClient.formSubmit('/WhareHouseAction_findWhareHouseList', '', {}, paging);
});

export const cameraListFetch = createAction(FETCH_CAMERA_LIST, data => {
  return httpFormClient.formSubmit('/WhareHouseAction_findCameraListByWhareHouse', '', data);
});

export const updateFactoryId = createAction(UPDATE_FACTORY_ID);
export const updateCameraCode = createAction(UPDATE_CAMERA_CODE);

export const updateRepository = createAction(UPDATE_REPOSITORY, data => {
  return httpCommonClient.post('/WhareHouseAction_editWhareHouse', data);
});
export const repoRecordFetch = createAction(UPDATE_REPOSITORY, (data, paging) => {
  return httpCommonClient.post('/WhareHouseAction_findWhareHouseRecord', { ...data, ...paging });
});
export const kDataFetch = createAction(FETCH_K_DATA, data => {
  return httpCommonClient.post('/WhareHouseAction_getWhareHouseKData', data);
});
export const todoWarningFetch = createAction(FETCH_TODO_WARNING, (data, paging) => {
  return httpCommonClient.post('/WhareHouseAction_getWarning', { ...data, ...paging });
});
export const goneWarningFetch = createAction(FETCH_GONE_WARNING, (data, paging) => {
  return httpCommonClient.post('/WhareHouseAction_getWarning', { ...data, ...paging });
});

export const updateTodoWarningQuery = createAction(UPDATE_TODO_WARNING_QUERY);
export const updateGoneWarningQuery = createAction(UPDATE_GONE_WARNING_QUERY);
