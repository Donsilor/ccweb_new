import { createAction, handleActions } from 'redux-actions';
import { httpFormClient } from '../../common/axios';

const LOADING = 'YICHAKU/MONITORIMAGE/LOADING';
const FETCH_IMAGE_LIST = 'YICHAKU/MONITORIMAGE/FETCH_IMAGE_LIST';

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
    [FETCH_IMAGE_LIST]: {
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
  },
  {
    loading: true,
    list: [],
    paging: { current: 1, pageSize: 10, total: 10 },
  }
);

export default reducer;

export const imageListFetch = createAction(FETCH_IMAGE_LIST, (data, paging) => {
  return httpFormClient.formSubmit('/WhareHouseAction_findDetailImage', '', data, paging);
});
