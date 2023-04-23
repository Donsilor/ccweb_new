import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import chengUpload from './Upload/chengUpload';
import systemUpload from './Upload/systemUpload';
import returnUpload from './Upload/returnUpload';

import chengList from './List/chengList';
import systemList from './List/systemList';
import returnList from './List/returnList';
import detail from './detail';
export default function TaskSummaryRouter({ match }) {
  return (
    <Switch>
      <Route path={`/carChengType/upload`} component={chengUpload} />
      <Route path={`/carChengType/list`} component={chengList} />
      <Route path={`/carSystemType/upload`} component={systemUpload} />
      <Route path={`/carSystemType/list`} component={systemList} />
      <Route path={`/carReturnType/upload`} component={returnUpload} />
      <Route path={`/carReturnType/list`} component={returnList} />
      <Route path={`${match.url}/detail/:id`} component={detail} />
      <Redirect from="/carChengType" to={`/carChengType/upload`} />
      <Redirect from="/carSystemType" to={`/carSystemType/upload`} />
      <Redirect from="/carReturnType" to={`/carReturnType/upload`} />
    </Switch>
  );
}
