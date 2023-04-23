import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import SpottestContainer from './list/SpottestContainer';
import MoveTaskContainer from './list/MoveTaskContainer';
import TimeOutContainer from './list/TimeOutContainer';
import TodoCompleteContainer from './list/TodoCompleteContainer';
import SpottestDetailRouter from './detail';
import CarAuditDetailView from './detail/CarAuditDetailView';

export default function SpottestRouter({ match }) {
  return (
    <Switch>
      <Route path={`${match.url}/list/spotTask`} component={SpottestContainer} />
      <Route path={`${match.url}/list/moveTask`} component={MoveTaskContainer} />
      <Route path={`${match.url}/list/timeOut`} component={TimeOutContainer} />
      <Route path={`${match.url}/list/todoComplete`} component={TodoCompleteContainer} />
      <Route path={`${match.url}/detail/:tab/:id`} component={SpottestDetailRouter} />
      <Route path={`${match.url}/audit/:spottestId/:carId`} component={CarAuditDetailView} />
      <Redirect to={`${match.url}/list/spotTask`} />
    </Switch>
  );
}
