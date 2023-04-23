import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient } from 'common/axios';
import _get from 'lodash/get';
// Actions
const FETCH_AUDITALL_LIST = 'YICHAKU/WARNING/FETCH_AUDITALL_LIST';
const UPDATE_AUDITALL_LIST = 'YICHAKU/WARNING/UPDATE_AUDITALL_LIST';

const FETCH_AUDITFIRST_LIST = 'YICHAKU/WARNING/FETCH_AUDITFIRST_LIST';
const UPDATE_AUDITFIRST_LIST = 'YICHAKU/WARNING/UPDATE_AUDITFIRST_LIST';

const FETCH_AUDITFIRSTREJECT_LIST = 'YICHAKU/WARNING/FETCH_AUDITFIRSTREJECT_LIST';
const UPDATE_AUDITFIRSTREJECT_LIST = 'YICHAKU/WARNING/UPDATE_AUDITFIRSTREJECT_LIST';

const FETCH_AUDITSECOND_LIST = 'YICHAKU/WARNING/FETCH_AUDITSECOND_LIST';
const UPDATE_AUDITSECOND_LIST = 'YICHAKU/WARNING/UPDATE_AUDITSECOND_LIST';

const FETCH_AUDITMONEY_LIST = 'YICHAKU/WARNING/FETCH_AUDITMONEY_LIST';
const UPDATE_AUDITMONEY_LIST = 'YICHAKU/WARNING/UPDATE_AUDITMONEY_LIST';

const FETCH_BONUSLIST_LIST = 'YICHAKU/WARNING/FETCH_BONUSLIST_LIST';
const UPDATE_BONUSLIST_LIST = 'YICHAKU/WARNING/UPDATE_BONUSLIST_LIST';

const FETCH_BONUSDONE_LIST = 'YICHAKU/WARNING/FETCH_BONUSDONE_LIST';
const UPDATE_BONUSDONE_LIST = 'YICHAKU/WARNING/UPDATE_BONUSDONE_LIST';

const LOADING = 'YICHAKU/WARNING/LOADING';

// Reducer
const reducer = handleActions(
    {
        [FETCH_AUDITALL_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    auditAll: {
                        ...state.auditAll,
                        list: _get(action.payload.data, 'rows', []),
                        paging: {
                            current: _get(action.payload.data, 'pageNum', 1),
                            pageSize: _get(action.payload.data, 'pageSize', 10),
                            total: _get(action.payload.data, 'total', 1),
                        },
                    },
                };
            },
        },
        [FETCH_AUDITFIRST_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    auditFirst: {
                        ...state.auditFirst,
                        list: _get(action.payload.data, 'rows', []),
                        paging: {
                            current: _get(action.payload.data, 'pageNum', 1),
                            pageSize: _get(action.payload.data, 'pageSize', 10),
                            total: _get(action.payload.data, 'total', 1),
                        },
                    },
                };
            },
        },
        [FETCH_AUDITFIRSTREJECT_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    auditFirstReject: {
                        ...state.auditFirstReject,
                        list: _get(action.payload.data, 'rows', []),
                        paging: {
                            current: _get(action.payload.data, 'pageNum', 1),
                            pageSize: _get(action.payload.data, 'pageSize', 10),
                            total: _get(action.payload.data, 'total', 1),
                        },
                    },
                };
            },
        },
        [FETCH_AUDITSECOND_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    auditSecond: {
                        ...state.auditSecond,
                        list: _get(action.payload.data, 'rows', []),
                        paging: {
                            current: _get(action.payload.data, 'pageNum', 1),
                            pageSize: _get(action.payload.data, 'pageSize', 10),
                            total: _get(action.payload.data, 'total', 1),
                        },
                    },
                };
            },
        },
        [FETCH_AUDITMONEY_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    auditMoney: {
                        ...state.auditMoney,
                        list: _get(action.payload.data, 'rows', []),
                        paging: {
                            current: _get(action.payload.data, 'pageNum', 1),
                            pageSize: _get(action.payload.data, 'pageSize', 10),
                            total: _get(action.payload.data, 'total', 1),
                        },
                    },
                };
            },
        },
        [FETCH_BONUSLIST_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    bonusList: {
                        ...state.bonusList,
                        list: _get(action.payload.data, 'rows', []),
                        paging: {
                            current: _get(action.payload.data, 'pageNum', 1),
                            pageSize: _get(action.payload.data, 'pageSize', 10),
                            total: _get(action.payload.data, 'total', 1),
                        },
                    },
                };
            },
        },
        [FETCH_BONUSDONE_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    bonusDone: {
                        ...state.bonusDone,
                        list: _get(action.payload.data, 'rows', []),
                        paging: {
                            current: _get(action.payload.data, 'pageNum', 1),
                            pageSize: _get(action.payload.data, 'pageSize', 10),
                            total: _get(action.payload.data, 'total', 1),
                        },
                    },
                };
            },
        },
        [UPDATE_AUDITALL_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    auditAll: {
                        ...state.auditAll,
                        query: {
                            ...state.auditAll.query,
                            ...action.payload,
                        },
                    },
                };
            },
        },
        [UPDATE_AUDITFIRST_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    auditFirst: {
                        ...state.auditFirst,
                        query: {
                            ...state.auditFirst.query,
                            ...action.payload,
                        },
                    },
                };
            },
        },
        [UPDATE_AUDITFIRSTREJECT_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    auditFirstReject: {
                        ...state.auditFirstReject,
                        query: {
                            ...state.auditFirstReject.query,
                            ...action.payload,
                        },
                    },
                };
            },
        },
        [UPDATE_AUDITSECOND_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    auditSecond: {
                        ...state.auditSecond,
                        query: {
                            ...state.auditSecond.query,
                            ...action.payload,
                        },
                    },
                };
            },
        },
        [UPDATE_AUDITMONEY_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    auditMoney: {
                        ...state.auditMoney,
                        query: {
                            ...state.auditMoney.query,
                            ...action.payload,
                        },
                    },
                };
            },
        },
        [UPDATE_BONUSLIST_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    bonusList: {
                        ...state.bonusList,
                        query: {
                            ...state.bonusList.query,
                            ...action.payload,
                        },
                    },
                };
            },
        },
        [UPDATE_BONUSDONE_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    bonusDone: {
                        ...state.bonusDone,
                        query: {
                            ...state.bonusDone.query,
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
        auditAll: {
            list: [],
            paging: { current: 1, pageSize: 10, total: 10 },
            query: {
                value: {},
                expandForm: false,
                aitiForm: true,
            },
        },
        auditFirst: {
            list: [],
            paging: { current: 1, pageSize: 10, total: 10 },
            query: {
                value: {},
                expandForm: false,
                aitiForm: true,
            },
        },
        auditFirstReject: {
            list: [],
            paging: { current: 1, pageSize: 10, total: 10 },
            query: {
                value: {},
                expandForm: false,
                aitiForm: true,
            },
        },
        auditSecond: {
            list: [],
            paging: { current: 1, pageSize: 10, total: 10 },
            query: {
                value: {},
                expandForm: false,
                aitiForm: true,
            },
        },
        auditMoney: {
            list: [],
            paging: { current: 1, pageSize: 10, total: 10 },
            query: {
                value: {},
                expandForm: false,
                aitiForm: true,
            },
        },
        bonusList: {
            list: [],
            paging: { current: 1, pageSize: 10, total: 10 },
            query: {
                value: {},
                expandForm: false,
                aitiForm: true,
            },
        },
        bonusDone: {
            list: [],
            paging: { current: 1, pageSize: 10, total: 10 },
            query: {
                value: {},
                expandForm: false,
                aitiForm: true,
            },
        },
        loading: true,
    }
);

export default reducer;
//全部数据列表list
export const getauditAll = createAction(FETCH_AUDITALL_LIST, (data, paging) => {
    let url = `/yck/vehicle/infolist`;
    return httpCommonClient.getWithPaging(url, data, paging);
});
//初审-待审核list
export const getauditFirst = createAction(FETCH_AUDITFIRST_LIST, (data, paging) => {
    let url = '/yck/vehicle/auditFirstList';
    return httpCommonClient.getWithPaging(url, data, paging);
});
//初审-异常跟踪list
export const getauditFirstReject = createAction(FETCH_AUDITFIRSTREJECT_LIST, (data, paging) => {
    let url = `/yck/vehicle/auditFirstRejectList`;
    return httpCommonClient.getWithPaging(url, data, paging);
});
//复审-待复审list
export const getauditSecond = createAction(FETCH_AUDITSECOND_LIST, (data, paging) => {
    let url = '/yck/vehicle/auditList/2';
    return httpCommonClient.postWithPaging(url, data, paging);
});
//奖励金待审核list
export const getauditMoney = createAction(FETCH_AUDITMONEY_LIST, (data, paging) => {
    let url = '/yck/vehicle/auditBonusList';
    return httpCommonClient.getWithPaging(url, data, paging);
});
//奖励金打款 待发放list
export const getbonusList = createAction(FETCH_BONUSLIST_LIST, (data, paging) => {
    let url = '/yck/bonus/list';
    return httpCommonClient.postWithPaging(url, { status: '0', ...data }, paging);
});
//奖励金打款 已发放list
export const getbonusDone = createAction(FETCH_BONUSDONE_LIST, (data, paging) => {
    let url = '/yck/bonus/list';
    return httpCommonClient.postWithPaging(url, { status: '1', ...data }, paging);
});
export const updateauditAll = createAction(UPDATE_AUDITALL_LIST);
export const updateauditFirst = createAction(UPDATE_AUDITFIRST_LIST);
export const updateauditFirstReject = createAction(UPDATE_AUDITFIRSTREJECT_LIST);
export const updateauditSecond = createAction(UPDATE_AUDITSECOND_LIST);
export const updateauditMoney = createAction(UPDATE_AUDITMONEY_LIST);
export const updatebonusList = createAction(UPDATE_BONUSLIST_LIST);
export const updatebonusDone = createAction(UPDATE_BONUSDONE_LIST);


