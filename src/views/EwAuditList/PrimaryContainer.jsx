import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrimaryTodoContainer from './PrimaryTodoContainer';
import PrimaryExpContainer from './PrimaryExpContainer';
import PrimaryTodoForDisContainer from './PrimaryTodoForDisContainer';
import PrimaryTotalContainer from './PrimaryTotalContainer';
import EwAuditDetailRouter from '../EwAuditDetail';

export default function PrimaryContainer({ match }) {
  return (
    <Switch>
      <Route path={`${match.url}/list/todoList`} component={PrimaryTodoContainer} />
      <Route path={`${match.url}/list/expList`} component={PrimaryExpContainer} />
      <Route path={`${match.url}/list/todoListForDistr`} component={PrimaryTodoForDisContainer} />
      <Route path={`${match.url}/list/totalList`} component={PrimaryTotalContainer} />
      <Route path={`${match.url}/detail/`} component={EwAuditDetailRouter} />
      <Redirect to={`${match.url}/list/todoList`} />
    </Switch>
  );
}
