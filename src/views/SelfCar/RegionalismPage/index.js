import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import regionalSmall from './RegSmallContainer';
import regionalBig from './RegBigContainer';

export default function TaskSummaryRouter() {
  return (
    <Switch>
      <Route exact path={`/regionalism/smallMang`} component={regionalSmall} />
      <Route exact path={`/regionalism/bigMang`} component={regionalBig} />
      <Redirect from="/regionalism" to="/regionalism/smallMang" />
    </Switch>
  );
}
