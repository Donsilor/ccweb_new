import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import jieSupervise from './jieSupervise';
import pangSupervise from './pangSupervise';

export default function TaskSummaryRouter({ match }) {
  return (
    <Switch>
      <Route path={`${match.url}/jieSupervise`} component={jieSupervise} />
      <Route path={`${match.url}/pangSupervise`} component={pangSupervise} />
      <Redirect from="/noSupervise" to={`/noSupervise/jieSupervise`} />
    </Switch>
  );
}
