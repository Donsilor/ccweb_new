import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import car from './CarContainer';
import move from './MoveContainer';
import plate from './PlateContainer';

export default function TaskSummaryRouter() {
  return (
    <Switch>
      <Route exact path={`/exceSetting/car`} component={car} />
      <Route exact path={`/exceSetting/move`} component={move} />
      <Route exact path={`/exceSetting/plate`} component={plate} />
      <Redirect from="/exceSetting" to="/exceSetting/car" />
    </Switch>
  );
}
