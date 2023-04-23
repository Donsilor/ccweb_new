import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SpotEwBlackRouter from './SpotEwBlackList';
import AntiCheatRouter from './AntiCheat';
import AntiDetailRouter from './antiDetail';
import NoSpotCarRouter from './noSpotCarList';
import ewChargeRouter from './ewCharge';
import DisDepositRouter from './DisDeposit';
import DepositDetailRouter from './DepositDetail';
import DisFlowDetailRouter from './DisFlowDetail';
export { SpotEwBlackRouter, NoSpotCarRouter, ewChargeRouter };
export default function pageRouter() {
  return (
    <Switch>
      <Route path={'/antiCheat/detail/:id'} component={AntiDetailRouter} />
      <Route path={'/antiCheat'} component={AntiCheatRouter} />
      <Route path={'/disDeposit/detail/:id'} component={DepositDetailRouter} />
      <Route path={'/disDeposit/flow/:id'} component={DisFlowDetailRouter} />
      <Route path={'/disDeposit'} component={DisDepositRouter} />
    </Switch>
  );
}
