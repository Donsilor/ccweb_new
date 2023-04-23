import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ExceptionTodoListContainer from './ExceptionTodoListContainer';
import ExceptionDoneListContainer from './ExceptionDoneListContainer';

import ExceptionDetailContainer from './ExceptionDetailContainer';
import movingExceptionRouter from './movingExceptionRouter';

export { movingExceptionRouter };
export default function SpotExceptionTraceRouter({ match }) {
  return (
    <Switch>
      <Route path={`${match.url}/list/todo`} component={ExceptionTodoListContainer} />
      <Route path={`${match.url}/list/done`} component={ExceptionDoneListContainer} />
      <Route path={`${match.url}/detail/:spottestId`} component={ExceptionDetailContainer} />
      <Redirect to={`${match.url}/list/todo`} />
    </Switch>
  );
}
