import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import CommonTodoContainer from './CommonTask/TodoContainer';
import CommonDoneContainer from './CommonTask/DoneContainer';
import MovingTodoContainer from './MovingTask/TodoContainer';
import MovingDoneContainer from './MovingTask/DoneContainer';
import CertificateTodoContainer from './CertificateTask/TodoContainer';
import CertificateDoneContainer from './CertificateTask/DoneContainer';
import SelfcarSpottestDetail from './Detail';
import CertificateDetail from './CerDetail';

export default function SelfCarMgPageRouter() {
  return (
    <Switch>
      <Route path={'/commonTask/list/todo'} component={CommonTodoContainer} />
      <Route path={'/commonTask/list/done'} component={CommonDoneContainer} />
      <Route path={'/commonTask/detail/:id'} component={SelfcarSpottestDetail} />
      <Redirect from={`/commonTask`} to={`/commonTask/list/todo`} />
      <Route path={'/movingTask/list/todo'} component={MovingTodoContainer} />
      <Route path={'/movingTask/list/done'} component={MovingDoneContainer} />
      <Route path={'/movingTask/detail/:id'} component={SelfcarSpottestDetail} />
      <Redirect from={`/movingTask`} to={`/movingTask/list/todo`} />
      <Route path={'/certificateTask/list/todo'} component={CertificateTodoContainer} />
      <Route path={'/certificateTask/list/done'} component={CertificateDoneContainer} />
      <Route path={'/certificateTask/detail/:id'} component={SelfcarSpottestDetail} />
      <Route path={'/certificateTask/CerDetail/:id'} component={CertificateDetail} />
      <Redirect from={`/certificateTask`} to={`/certificateTask/list/todo`} />
    </Switch>
  );
}
