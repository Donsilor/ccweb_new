import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import newCar from './newCarContainer';
import esCar from './esCarContainer';

export default function TaskSummaryRouter() {
  return (
    <Switch>
      <Route exact path={`/credPhoTemp/newCar`} component={newCar} />
      <Route exact path={`/credPhoTemp/esCar`} component={esCar} />
      <Redirect from="/credPhoTemp" to="/credPhoTemp/newCar" />
    </Switch>
  );
}
