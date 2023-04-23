import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reduxPromise from './middlewares/reduxPromise';
import reducer from './reducer';
import { preLoadingProcessor, postLoadingProcessor } from './middlewares/loadingProcessor';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [preLoadingProcessor, reduxPromise, postLoadingProcessor];
let processer = compose;
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
  processer = composeEnhancers;
}

// const store = createStore(reducer, processer(applyMiddleware(...middleware)));
export default preloadedStore => {
  return createStore(reducer, preloadedStore, processer(applyMiddleware(...middleware)));
};
