import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import carUpload from './disUpload';
import detail from './detailView';

export default function TaskSummaryRouter({ match }) {
  return (
    <Switch>
      <Route path={'/keyPointSpot/detail/:id'} component={detail} />
      <Route path={'/keyPointSpot'} component={carUpload} />
    </Switch>
  );
}
