import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import InitialTransferInContainer from './InitialTransferInContainer';
import SupplementaryTransferInContainer from './SupplementaryTransferInContainer';
import CurrentInitContainer from './CurrentInitContainer';
import CurrentSupplementContainer from './CurrentSupplementContainer';
import TransferOutContainer from './TransferOutContainer';
import TransferOutHisContainer from './TransferOutHisContainer';

export default function PrintManagementContainer() {
  return (
    <Switch>
      <Route path={`/:menu/initialTransferIn`} component={InitialTransferInContainer} />
      <Route path={`/:menu/supplementaryTransferIn`} component={SupplementaryTransferInContainer} />
      <Route path={`/:menu/currentInit`} component={CurrentInitContainer} />
      <Route path={`/:menu/currentSupplement`} component={CurrentSupplementContainer} />
      <Route path={`/:menu/transferOut`} component={TransferOutContainer} />
      <Route path={`/:menu/transferOutHis`} component={TransferOutHisContainer} />
      <Redirect from="/:menu" to="/:menu/initialTransferIn" />
    </Switch>
  );
}
