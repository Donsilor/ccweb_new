import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import RepositoryList from './RepositoryList';
import MonitorImage from './MonitorImage';
import ImageMark from './ImageMark';
import RepoWarningTodoContainer from './RepoWarningTodoContainer';
import RepoWarningGoneContainer from './RepoWarningGoneContainer';

function MonitorManagementRouter({ match }) {
  if (match.url === '/repositoryList') {
    return (
      <Switch>
        <Route path={`${match.url}/list`} component={RepositoryList} />
        <Route path={`${match.url}/detail`} component={MonitorImage} />
        <Route path={`${match.url}/train`} component={ImageMark} />
        <Redirect to={`${match.url}/list`} />
      </Switch>
    );
  } else if (match.url === '/repositoryWarning') {
    return (
      <Switch>
        <Route path={`${match.url}/todo`} component={RepoWarningTodoContainer} />
        <Route path={`${match.url}/gone`} component={RepoWarningGoneContainer} />
        <Redirect to={`${match.url}/todo`} />
      </Switch>
    );
  }
}

export default MonitorManagementRouter;
