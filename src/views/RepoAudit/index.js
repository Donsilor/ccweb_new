import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuditFirstTodoContainer from './AuditFirstTodoContainer';
import AuditLastTodoContainer from './AuditLastTodoContainer';
import AuditFirstAllContainer from './AuditFirstAllContainer';
import AuditLastAllContainer from './AuditLastAllContainer';
import AuditFirstDetailContainer from './AuditFirstDetailContainer';
import AuditLastDetailContainer from './AuditLastDetailContainer';

export default function RepoAuditRouter() {
  return (
    <Switch>
      <Route exact path={`/repoAuditFirst/todo`} component={AuditFirstTodoContainer} />
      <Route exact path={`/repoAuditFirst/all`} component={AuditFirstAllContainer} />
      <Route exact path={`/repoAuditLast/todo`} component={AuditLastTodoContainer} />
      <Route exact path={`/repoAuditLast/all`} component={AuditLastAllContainer} />
      <Route exact path={`/:repoType/:tabName/detail/:id`} component={DetailRouter} />
      <Redirect from="/repoAuditFirst" to="/repoAuditFirst/todo" />
      <Redirect from="/repoAuditLast" to="/repoAuditLast/todo" />
    </Switch>
  );
}

function DetailRouter(props) {
  const { match } = props;
  if (match.params.repoType === 'repoAuditFirst') {
    return <AuditFirstDetailContainer {...props} />;
  } else {
    return <AuditLastDetailContainer {...props} />;
  }
}
