import { createAction, handleActions } from 'redux-actions';
import { httpFormClient } from 'common/axios';

// Actions
const ACTION_FETCH_FACTORY_BRAND = 'YICHAKU/REGIONMANAGEMENT/FETCH_FACTORY_BRAND'; //获取汽车厂商和品牌关联
const ACTION_UPDATE_FACTORY_BRAND = 'YICHAKU/REGIONMANAGEMENT/UPDATE_FACTORY_BRAND'; //获取汽车厂商和品牌关联
const ACTION_FETCH_FACTORY_LIST = 'YICHAKU/REGIONMANAGEMENT/FETCH_FACTORY_LIST'; //获取厂商数据数据

const ACTION_SPECIFY_FACTORY_ID = 'YICHAKU/REGIONMANAGEMENT/SPECIFY_FACTORY_ID'; //获取某厂商大区数据
const ACTION_SPECIFY_REGION_ID = 'YICHAKU/REGIONMANAGEMENT/SPECIFY_REGION_ID'; //获取某厂商大区数据
const ACTION_FETCH_REGION_LIST = 'YICHAKU/REGIONMANAGEMENT/FETCH_REGION_LIST'; //获取某厂商大区数据
const ACTION_FETCH_SUBREGION_LIST = 'YICHAKU/REGIONMANAGEMENT/FETCH_SUBREGION_LIST'; //获取某厂商大区数据

const ACTION_UPDATE_REGION = 'YICHAKU/REGIONMANAGEMENT/UPDATE_REGION'; //创建大区
const ACTION_UPDATE_SUBREGION = 'YICHAKU/REGIONMANAGEMENT/UPDATE_SUBREGION'; //创建小区
const ACTION_DELETE_REGION = 'YICHAKU/REGIONMANAGEMENT/DELETE_REGION'; //删除大区
const ACTION_DELETE_SUBREGION = 'YICHAKU/REGIONMANAGEMENT/DELETE_SUBREGION'; //删除小区
const ACTION_UPDATE_QUERY = 'YICHAKU/REGIONMANAGEMENT/UPDATE_QUERY'; //更新查询
const ACTION_FETCH_REGION_LOG_LIST = 'YICHAKU/REGIONMANAGEMENT/FETCH_REGION_LOG_LIST'; //日志查询
const ACTION_FETCH_MANAGER_LIST = 'YICHAKU/REGIONMANAGEMENT/FETCH_MANAGER_LIST'; //区域经理查询
const ACTION_UPDATE_MANAGER = 'YICHAKU/REGIONMANAGEMENT/UPDATE_MANAGER'; //区域经理查询

const LOADING = 'YICHAKU/REGIONMANAGEMENT/LOADING';

const reducer = handleActions(
  {
    [ACTION_FETCH_FACTORY_BRAND]: {
      next(state, action) {
        return {
          ...state,
          brandList: action.payload.data.autoMakerOption || [],
          paging: {
            current: action.payload.data && action.payload.data.page && action.payload.data.page.pageNum,
            pageSize: action.payload.data && action.payload.data.page && action.payload.data.page.pageSize,
            total: action.payload.data && action.payload.data.page && action.payload.data.page.total,
          },
        };
      },
    },
    [ACTION_FETCH_FACTORY_LIST]: {
      next(state, action) {
        return {
          ...state,
          list: action.payload.data.list || [],
        };
      },
    },
    [ACTION_FETCH_REGION_LOG_LIST]: {
      next(state, action) {
        return {
          ...state,
          logList: action.payload.data.list || [],
        };
      },
    },
    [ACTION_FETCH_MANAGER_LIST]: {
      next(state, action) {
        return {
          ...state,
          managerList: action.payload.data.list || [],
        };
      },
    },
    [ACTION_FETCH_REGION_LIST]: {
      next(state, action) {
        return {
          ...state,
          regionData: {
            ...state.regionData,
            [state.factoryId]: action.payload.data.list || [],
          },
        };
      },
    },
    [ACTION_FETCH_SUBREGION_LIST]: {
      next(state, action) {
        return {
          ...state,
          subRegionData: {
            ...state.subRegionData,
            [state.regionId]: action.payload.data.list || [],
          },
        };
      },
    },
    [ACTION_SPECIFY_FACTORY_ID]: {
      next(state, action) {
        return {
          ...state,
          factoryId: action.payload || '',
        };
      },
    },
    [ACTION_SPECIFY_REGION_ID]: {
      next(state, action) {
        return {
          ...state,
          regionId: action.payload || '',
        };
      },
    },
    [ACTION_UPDATE_QUERY]: {
      next(state, action) {
        return {
          ...state,
          query: action.payload,
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
    loading: true,
    query: {},
    paging: { current: 1, pageSize: 10, total: 10 },
    brandList: [],
    list: [],
    managerList: [],
    factoryId: '',
    regionId: '',
    regionData: {},
    subRegionData: {},
    logList: [],
  }
);

export const FETCH_FACTORY_BRAND = createAction(ACTION_FETCH_FACTORY_BRAND, data =>
  httpFormClient.formSubmit('AutomakerRegionAction_searchAutomakerfldOption', '', data)
);

export const UPDATE_FACTORY_BRAND = createAction(ACTION_UPDATE_FACTORY_BRAND, data =>
  httpFormClient.formSubmit('AutomakerRegionAction_executeSaveAutomaker', 'abQuery', data)
);

export const FETCH_FACTORY_LIST = createAction(ACTION_FETCH_FACTORY_LIST, data =>
  httpFormClient.formSubmit('AutomakerRegionAction_searchAutomakerList', 'abQuery', data)
);

export const FETCH_REGION_LIST = createAction(ACTION_FETCH_REGION_LIST, data =>
  httpFormClient.formSubmit('AutomakerRegionAction_searchRegionList', 'arQuery', data)
);
export const FETCH_SUBREGION_LIST = createAction(ACTION_FETCH_SUBREGION_LIST, data =>
  httpFormClient.formSubmit('AutomakerRegionAction_searchRegionSubList', 'arQuery', data)
);

export const UPDATE_REGION = createAction(ACTION_UPDATE_REGION, data =>
  httpFormClient.formSubmit('AutomakerRegionAction_executeSaveRegionInfo', 'arQuery', data)
);

export const UPDATE_SUBREGION = createAction(ACTION_UPDATE_SUBREGION, data =>
  httpFormClient.formSubmit('AutomakerRegionAction_executeSaveRegionSubInfo', 'arsQuery', data)
);

export const DELETE_REGION = createAction(ACTION_DELETE_REGION, data =>
  httpFormClient.formSubmit('AutomakerRegionAction_executeDeleteRegionInfo', 'arQuery', data)
);
export const DELETE_SUBREGION = createAction(ACTION_DELETE_SUBREGION, data =>
  httpFormClient.formSubmit('AutomakerRegionAction_executeDeleteRegionSubInfo', 'arsQuery', data)
);

export const SPECIFY_FACTORY_ID = createAction(ACTION_SPECIFY_FACTORY_ID);
export const SPECIFY_REGION_ID = createAction(ACTION_SPECIFY_REGION_ID);
export const UPDATE_QUERY = createAction(ACTION_UPDATE_QUERY);

export const FETCH_REGION_LOG_LIST = createAction(ACTION_FETCH_REGION_LOG_LIST, data =>
  httpFormClient.formSubmit('AutomakerRegionAction_searchOperationRecordList', 'abrQuery', data)
);
export const FETCH_MANAGER_LIST = createAction(ACTION_FETCH_MANAGER_LIST, data =>
  httpFormClient.formSubmit('AutomakerRegionAction_searchRegionRMList', 'arsQuery', data)
);
export const UPDATE_MANAGER = createAction(ACTION_UPDATE_MANAGER, data =>
  httpFormClient.formSubmit('AutomakerRegionAction_executeSaveRegionRM', 'arsQuery', data)
);

export default reducer;
