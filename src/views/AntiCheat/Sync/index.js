import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import carIn from './List/carIn';
import carOut from './List/carOut';
import carSend from './List/carSend';
import carDis from './List/disList';
import disAccount from './List/disAccount';
import disExposure from './List/disExposure';
import disSettlement from './List/disSettlement';
import carReturn from './List/carReturn';

export default function TaskSummaryRouter({ match }) {
  return (
    <Switch>
      <Route path={`/carSync/carIn`} component={carIn} />
      <Route path={`/carSync/carOut`} component={carOut} />
      <Route path={`/carSync/carSend`} component={carSend} />
      <Route path={`/carSync/carDis`} component={carDis} />
      <Route path={`/carSync/disAccounting`} component={disAccount} />
      <Route path={`/carSync/disExposure`} component={disExposure} />
      <Route path={`/carSync/disSettlement`} component={disSettlement} />
      <Route path={`/carSync/carReturn`} component={carReturn} />
      <Redirect from="/carSync" to={`/carSync/carIn`} />
    </Switch>
  );
}
