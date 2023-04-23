import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import carList from './carList';
import makeList from './makeList';
import taskList from './taskList';
import detail from './detail';
export default function TaskSummaryRouter({ match }) {
  return (
    <Switch>
      <Route path={`/noSuperviseList/carList`} component={carList} />
      <Route path={`/noSuperviseList/makeList`} component={makeList} />
      <Route path={`/noSuperviseList/taskList`} component={taskList} />
      <Route path={`${match.url}/detail/:id/:type/:tab`} component={detail} />
      <Redirect from="/noSuperviseList" to={`/noSuperviseList/carList`} />
    </Switch>
  );
}
