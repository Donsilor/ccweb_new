import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import carUpload from './carUpload';
import detail from './detailView';

export default function TaskSummaryRouter({ match }) {
  return (
    <Switch>
      <Route path={'/carStatistics/detail/:id/:fileType'} component={detail} />
      <Route path={'/carStatistics'} component={carUpload} />
    </Switch>
  );
}
