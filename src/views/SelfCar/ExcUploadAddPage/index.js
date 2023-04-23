import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import add from './AddContainer';
import sell from './SellContainer';
import list from './ListContainer';

export default function TaskSummaryRouter({ match }) {
  return (
    <Switch>
      <Route path={`${match.url}/add`} component={add} />
      <Route path={`${match.url}/sell`} component={sell} />
      <Route path={`${match.url}/list`} component={list} />
      <Redirect from="/excUploadAdd" to={`${match.url}/add`} />
    </Switch>
  );
}
