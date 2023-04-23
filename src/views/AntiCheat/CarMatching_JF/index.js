import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import collect from './Upload/collectUpload';
import third from './Upload/thirdUpload';
import settle from './Upload/settleUpload';
import collectMatch from './collectMatch';
import thirdMatch from './thirdMatch';
import matchList from './matchList';
export default function TaskSummaryRouter({ match }) {
  return (
    <Switch>
      <Route path={`${match.url}/collect`} component={collect} />
      <Route path={`${match.url}/third`} component={third} />
      <Route path={`${match.url}/settle`} component={settle} />
      <Route path="/collectMatch_JF" component={collectMatch} />
      <Route path="/thirdMatch_JF" component={thirdMatch} />
      <Route path="/matchList_JF" component={matchList} />
      <Redirect from="/uploadMatch_JF" to={`${match.url}/collect`} />
    </Switch>
  );
}
