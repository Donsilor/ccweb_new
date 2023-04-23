import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import car from './CarContainer';
import plate from './PlateContainer';

export default function TaskSummaryRouter() {
  return (
    <Switch>
      <Route exact path={`/standMang/car`} component={car} />
      <Route exact path={`/standMang/plate`} component={plate} />
      <Redirect from="/standMang" to="/standMang/car" />
    </Switch>
  );
}
