import { createAction, handleActions } from 'redux-actions';
import { httpFormClient } from 'common/axios';

const ACTION_SPOTTEST_FETCH_TODO_LIST = 'YICHAKU/SPOTTEST/FETCH_TODO_LIST ';
const ACTION_SPOTTEST_FETCH_DONE_LIST = 'YICHAKU/SPOTTEST/FETCH_DONE_LIST ';
const ACTION_SPOTTEST_FETCH_TODO_SUB_LIST = 'YICHAKU/SPOTTEST/FETCH_TODO_SUB_LIST ';
const ACTION_SPOTTEST_FETCH_DONE_SUB_LIST = 'YICHAKU/SPOTTEST/FETCH_DONE_SUB_LIST ';
const ACTION_SPOTTEST_FETCH_UN_INFO = 'YICHAKU/SPOTTEST/FETCH_UN_INFO';
const ACTION_SPOTTEST_SPECIFY_PARENT_TASK_ID = 'YICHAKU/SPOTTEST/SPECIFY_PARENT_TASK_ID';
const ACTION_SPOTTEST_UPDATE_TODO_QUERY = 'YICHAKU/SPOTTEST/UPDATE_TODO_QUERY';
const ACTION_SPOTTEST_UPDATE_DONE_QUERY = 'YICHAKU/SPOTTEST/UPDATE_DONE_QUERY';

const ACTION_SPOTTEST_FETCH_LOG_LIST = 'YICHAKU/SPOTTEST/FETCH_LOG_LIST';

const LOADING = 'YICHAKU/SPOTTEST/LOADING';

const reducer = handleActions(
  {
    [ACTION_SPOTTEST_FETCH_LOG_LIST]: {
      next(state, action) {
        return {
          ...state,
          logList: action.payload.data.list || [],
        };
      },
    },
    [ACTION_SPOTTEST_FETCH_TODO_LIST]: {
      next(state, action) {
        return {
          ...state,
          todo: {
            ...state.todo,
            list:
              (Array.isArray(action.payload.data.list) &&
                action.payload.data.list.map(item =>
                  item.hasSubTasks == 1
                    ? {
                        ...item,
                        children: [],
                      }
                    : item
                )) ||
              [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
          },
        };
      },
    },
    [ACTION_SPOTTEST_FETCH_DONE_LIST]: {
      next(state, action) {
        return {
          ...state,
          done: {
            ...state.done,
            list:
              (Array.isArray(action.payload.data.list) &&
                action.payload.data.list.map(item =>
                  item.hasSubTasks == 1
                    ? {
                        ...item,
                        children: [],
                      }
                    : item
                )) ||
              [],
            paging: {
              current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
              pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
              total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
            },
          },
        };
      },
    },
    [ACTION_SPOTTEST_FETCH_TODO_SUB_LIST]: {
      next(state, action) {
        return {
          ...state,
          todo: {
            ...state.todo,
            list: state.todo.list.map(item =>
              item.spotdetailId === state.parentId
                ? {
                    ...item,
                    children: action.payload.data.list || [],
                  }
                : item
            ),
          },
        };
      },
    },
    [ACTION_SPOTTEST_FETCH_DONE_SUB_LIST]: {
      next(state, action) {
        return {
          ...state,
          done: {
            ...state.done,
            list: state.done.list.map(item =>
              item.spotdetailId === state.parentId
                ? {
                    ...item,
                    children: action.payload.data.list || [],
                  }
                : item
            ),
          },
        };
      },
    },
    [ACTION_SPOTTEST_UPDATE_TODO_QUERY]: {
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
    [ACTION_SPOTTEST_UPDATE_DONE_QUERY]: {
      next(state, action) {
        return {
          ...state,
          done: {
            ...state.done,
            query: {
              ...state.done.query,
              ...action.payload,
            },
          },
        };
      },
    },
    [ACTION_SPOTTEST_SPECIFY_PARENT_TASK_ID]: {
      next(state, action) {
        return {
          ...state,
          parentId: action.payload || '',
        };
      },
    },
    [ACTION_SPOTTEST_FETCH_UN_INFO]: {
      next(state, action) {
        const {
          detail,
          recordList,
          customManagerList,
          checkerList,
          trainerList,
          riskManagerList,
          releaseManagerList,
        } = action.payload.data;
        return {
          ...state,
          detailData: {
            detail,
            recordList,
            customManagerList,
            checkerList,
            trainerList,
            riskManagerList,
            releaseManagerList,
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
    todo: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
      },
    },
    subData: {},
    parentId: '',
    done: {
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
      query: {
        value: {},
        expandForm: false,
      },
    },
    detailData: {},
    loading: true,
    logList: [],
  }
);

export default reducer;

export const FETCH_TODO_LIST = createAction(ACTION_SPOTTEST_FETCH_TODO_LIST, (data, paging) => {
  let url = '/ExceptionTraceAction_getSpotExceptionTraceList';
  return httpFormClient.formSubmit(url, '', data, paging);
});
export const FETCH_DONE_LIST = createAction(ACTION_SPOTTEST_FETCH_DONE_LIST, (data, paging) => {
  let url = '/ExceptionTraceAction_getSpotExceptionTraceList';
  return httpFormClient.formSubmit(url, '', data, paging);
});
export const FETCH_SUB_LIST = type =>
  createAction(type === 'todo' ? ACTION_SPOTTEST_FETCH_TODO_SUB_LIST : ACTION_SPOTTEST_FETCH_DONE_SUB_LIST, data => {
    let url = '/ExceptionTraceAction_getSubSpotExceptionTraceList';
    return httpFormClient.formSubmit(url, '', data);
  });
export const FETCH_UN_INFO = createAction(ACTION_SPOTTEST_FETCH_UN_INFO, (data, paging) => {
  let url = '/ExceptionTraceAction_getExceptionTraceDetail';
  return httpFormClient.formSubmit(url, '', data, paging);
});
export const FETCH_LOG_LIST = createAction(ACTION_SPOTTEST_FETCH_LOG_LIST, data =>
  httpFormClient.formSubmit('ExceptionTraceAction_searchExceptionTraceRecord', '', data)
);

export const SPECIFY_PARENT_TASK_ID = createAction(ACTION_SPOTTEST_SPECIFY_PARENT_TASK_ID);
export const UPDATE_TODO_QUERY = createAction(ACTION_SPOTTEST_UPDATE_TODO_QUERY);
export const UPDATE_DONE_QUERY = createAction(ACTION_SPOTTEST_UPDATE_DONE_QUERY);
