import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import newCar from './newCarContainer';
import esCar from './esCarContainer';

export default function TaskSummaryRouter() {
  return (
    <Switch>
      <Route exact path={`/carPhoTemp/newCar`} component={newCar} />
      <Route exact path={`/carPhoTemp/esCar`} component={esCar} />
      <Redirect from="/carPhoTemp" to="/carPhoTemp/newCar" />
    </Switch>
  );
}
