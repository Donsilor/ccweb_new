import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ListView from './ListView';
// import MoveTaskContainer from './list/MoveTaskContainer';

export default function MultipleAccountRouter({ match }) {
  return (
    <Switch>
      <Route path={`${match.url}/list`} component={ListView} />
      {/* <Route path={`${match.url}/list/moveTask`} component={MoveTaskContainer} /> */}
      <Redirect to={`${match.url}/list`} />
    </Switch>
  );
}
