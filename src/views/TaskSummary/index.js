import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PlatformManagerContainer from './PlatformManagerContainer';
import RiskManagerContainer from './RiskManagerContainer';
import CustomerManagerContainer from './CustomerManagerContainer';

export default function TaskSummaryRouter() {
  return (
    <Switch>
      <Route exact path={`/taskSummary/platformManager`} component={PlatformManagerContainer} />
      <Route exact path={`/taskSummary/riskManager`} component={RiskManagerContainer} />
      <Route exact path={`/taskSummary/customerManager`} component={CustomerManagerContainer} />
      <Redirect from="/taskSummary" to="/taskSummary/platformManager" />
    </Switch>
  );
}
