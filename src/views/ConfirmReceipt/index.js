import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ToDoContainer from './ToDoContainer';
import AllContainer from './AllContainer';
import EwDetail from './EwDetail';

export default function ConfirmReceiptRouter() {
  return (
    <Switch>
      <Route exact path={`/confirmReceiptList/todo`} component={ToDoContainer} />
      <Route exact path={`/confirmReceiptList/all`} component={AllContainer} />
      <Route exact path={`/confirmReceiptList/:tabName/ewDetail`} component={EwDetail} />
      <Redirect from="/confirmReceiptList" to="/confirmReceiptList/todo" />
    </Switch>
  );
}
