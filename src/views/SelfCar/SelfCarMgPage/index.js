import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ReservedContainer from './ReservedContainer';
import RemovedContainer from './RemovedContainer';
import CarDetail from './CarDetail';

export default function SelfCarMgPageRouter({ match }) {
  return (
    <Switch>
      <Route path={`${match.url}/reserved`} component={ReservedContainer} />
      <Route path={`${match.url}/removed`} component={RemovedContainer} />
      <Route path={`${match.url}/detail/:id`} component={CarDetail} />
      <Redirect to={`${match.url}/reserved`} />
    </Switch>
  );
}
