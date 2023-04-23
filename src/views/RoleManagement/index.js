import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { MicroShopDistributorContainer } from './MicroShopDistributorContainer';
import { MicroShopEWContainer } from './MicroShopEWContainer';
import MicroShopAdd from './MicroShopAdd';

export default function RoleManagementRouter() {
  return (
    <Switch>
      <Route exact path={`/storeManagement/distributor`} component={MicroShopDistributorContainer} />
      <Route exact path={`/storeManagement/ew`} component={MicroShopEWContainer} />
      <Route exact path={`/storeManagement/add`} component={MicroShopAdd} />
      <Redirect to={`/storeManagement/distributor`} />
    </Switch>
  );
}
