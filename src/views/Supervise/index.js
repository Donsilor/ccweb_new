import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import SuperviseImport from './SuperviseImport';
import SuperviseManager from './SuperviseManager';
import SuperviseParam from './SuperviseParam';
import SuperviseSpecial from './SuperviseSpecialForm';
import SuperviseCompany from './SuperviseCompany';
import DealerAmountContainer from './Container/DealerAmountContainer';
import VehicleAmountContainer from './Container/VehicleAmountContainer';

function SuperviseRouter({ match }) {
  console.log(match);
  if (match.url === '/superviseAmount') {
    return (
      <switch>
        <Route path={`${match.url}/list/dealerAmount`} component={DealerAmountContainer} />
        <Route path={`${match.url}/list/vehicleAmount`} component={VehicleAmountContainer} />
        <Redirect from={`${match.url}`} to={`${match.url}/list/dealerAmount`} />
      </switch>
    );
  } else {
    return (
      <switch>
        <Route path="/importView" component={SuperviseImport} />
        <Route path="/superviseManager" component={SuperviseManager} />
        <Route path="/specialDealer" component={SuperviseSpecial} />
        <Route path="/superviseParam" component={SuperviseParam} />
        <Route path="/superviseCompany" component={SuperviseCompany} />
      </switch>
    );
  }
}

export default SuperviseRouter;
