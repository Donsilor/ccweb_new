import isPromise from 'is-promise';

export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    return isPromise(action.payload)
      ? action.payload
          .then(result => dispatch({ ...action, payload: result }))
          .catch(error => {
            dispatch({ ...action, payload: error, error: true });
            dispatch({
              type: 'YICHAKU/COMMON/APIERROR',
              payload: error && error.message ? `${error && error.message} -- ${action.type}` : error && error.message,
            });
            // return Promise.reject(error);
          })
      : next(action);
  };
}
