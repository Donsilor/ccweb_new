import isPromise from 'is-promise';

interface ActionType {
  type: string;
  timestamp: number;
}
interface ActionQueueType {
  [propName: string]: ActionType[];
}
const actionQueue: ActionQueueType = {};

export function preLoadingProcessor({ dispatch }) {
  return next => action => {
    if (isPromise(action.payload)) {
      const basicType: string = resolveBasicType(action.type);
      if (basicType) {
        action.timestamp = Date.now();
        const queue: ActionType[] = actionQueue[basicType];
        if (Array.isArray(queue) && queue.length > 0) {
          const index = queue.findIndex(item => item.type === action.type);
          if (index > -1) {
            queue.splice(index, 1);
          }
          queue.push({
            type: action.type,
            timestamp: action.timestamp,
          });
        } else {
          if (Array.isArray(queue) && queue.length === 0) {
            actionQueue[basicType].push({
              type: action.type,
              timestamp: action.timestamp,
            });
          } else {
            actionQueue[basicType] = [
              {
                type: action.type,
                timestamp: action.timestamp,
              },
            ];
          }
          dispatch({ type: loadingActionType(basicType), loading: true });
        }
      }
    }

    return next(action);
  };
}

export default function postLoadingProcessor({ dispatch }) {
  return next => action => {
    if (action.payload) {
      const basicType = resolveBasicType(action.type);
      const timestamp = action.timestamp;
      delete action.timestamp;
      const queue: ActionType[] = actionQueue[basicType];
      if (basicType && Array.isArray(queue)) {
        const index = queue.findIndex(item => item.type === action.type && item.timestamp === timestamp);
        if (index > -1) {
          queue.splice(index, 1);
          if (queue.length === 0) {
            dispatch({ type: loadingActionType(basicType), loading: false });
          }
        }
      }
    }
    return next(action);
  };
}

export { postLoadingProcessor };

function resolveBasicType(type: string = ''): string {
  const typeGroup = type.split('/');
  if (typeGroup.length < 2) {
    return '';
  } else {
    return typeGroup[1];
  }
}

function loadingActionType(type: string = ''): string {
  return `YICHAKU/${type}/LOADING`;
}
