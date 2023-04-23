import React from 'react';
import { Route, Switch } from 'react-router-dom';
import EwAuditDetailContainer from './EwAuditDetailContainer';
import AuthInfo from './AuthInfo';
import BondHistory from './BondHistory';
import DistributorInfo from './DistributorInfo';
import EwInfo from './EwInfo';
import TrackRecord from './TrackRecord';
import AuthHistory from './AuthHistory';
import ExcepRecord from './ExcepRecord';
import Operation from './Operation';
import ExpressInfo from './ExpressInfo';

export default function EwAuditDetailRouter() {
  return (
    <Switch>
      <Route path={`/:menu/detail/authInfo/:id`} component={AuthInfo} />
      <Route path={`/:menu/detail/bondHistory/:id`} component={BondHistory} />
      <Route path={`/:menu/detail/distributorInfo/:id`} component={DistributorInfo} />
      <Route path={`/:menu/detail/ewInfo/:id`} component={EwInfo} />
      <Route path={`/:menu/detail/ewInfo/:id`} component={EwAuditDetailContainer} />
      <Route path={`/:menu/detail/expressInfo/:id`} component={ExpressInfo} />
      <Route path={`/:menu/detail/trackRecord/:id`} component={TrackRecord} />
      <Route path={`/:menu/detail/authHistory/:id`} component={AuthHistory} />
      <Route path={`/:menu/detail/excepRecord/:id`} component={ExcepRecord} />
      <Route path={`/:menu/detail/operation/:id`} component={Operation} />
    </Switch>
  );
}
