import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CarInfo from './CarInfo';
import CurrentTask from './CurrentTask';
import ChangeRecord from './ChangeRecord';
import TaskHistory from './TaskHistory';
import CarTrail from './CarTrail';
import ChangeVin from './ChangeVin';

export default function WrapperRouter() {
  return (
    <Switch>
      <Route exact path={`/:menu/result/carInfo`} component={CarInfo} />
      <Route exact path={`/:menu/result/carTrail`} component={CarTrail} />
      <Route exact path={`/:menu/result/currentTask`} component={CurrentTask} />
      <Route exact path={`/:menu/result/taskHistory`} component={TaskHistory} />
      <Route exact path={`/:menu/result/changeRecord`} component={ChangeRecord} />
      <Route exact path={`/:menu/result/changeVin`} component={ChangeVin} />
      <Redirect from={`/:menu/*`} to={`/:menu/result/carInfo`} />
    </Switch>
  );
}
