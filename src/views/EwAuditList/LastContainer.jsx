import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LastTodoContainer from './LastTodoContainer';
import LastExpContainer from './LastExpContainer';
import LastTotalContainer from './LastTotalContainer';
import EwAuditDetailRouter from '../EwAuditDetail';

export default function LastContainer({ match }) {
  return (
    <Switch>
      <Route path={`${match.url}/list/todoList`} component={LastTodoContainer} />
      <Route path={`${match.url}/list/expList`} component={LastExpContainer} />
      <Route path={`${match.url}/list/totalList`} component={LastTotalContainer} />
      <Route path={`${match.url}/detail/`} component={EwAuditDetailRouter} />
      <Redirect to={`${match.url}/list/todoList`} />
    </Switch>
  );
}
