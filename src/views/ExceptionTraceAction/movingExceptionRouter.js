import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import MovingExceptionTodoListContainer from './MovingExceptionTodoListContainer';
import MovingExceptionDoneListContainer from './MovingExceptionDoneListContainer';

import ExceptionDetailContainer from './ExceptionDetailContainer';
export default function movingExceptionRouter({ match }) {
  return (
    <Switch>
      <Route path={`${match.url}/list/todo`} component={MovingExceptionTodoListContainer} />
      <Route path={`${match.url}/list/done`} component={MovingExceptionDoneListContainer} />
      <Route path={`${match.url}/detail/:spottestId`} component={ExceptionDetailContainer} />
      <Redirect to={`${match.url}/list/todo`} />
    </Switch>
  );
}
