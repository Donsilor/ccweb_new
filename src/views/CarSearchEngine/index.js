import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from './Main';
import CarSearchEngine from './CarSearchEngine';

export default function CarSearchEngineRouter() {
  return (
    <Switch>
      <Route path={`/:menu/result/:tabName`} component={CarSearchEngine} />
      <Route exact path={`/:menu/`} component={Main} />
      <Redirect from={`/:menu/*`} to={`/:menu/result/carInfo`} />
    </Switch>
  );
}
