import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import OrderTodoContainer from './OrderTodoContainer';
import OrderGoneContainer from './OrderGoneContainer';
import OrderDoneContainer from './OrderDoneContainer';
import InvoiceDoneContainer from './InvoiceDoneContainer';
import InvoiceTodoContainer from './InvoiceTodoContainer';
import RefundContainer from './RefundContainer';

export default function OrderManagementTRouter({ match }) {
  console.log(match);
  return (
    <Switch>
      <Route path={`${match.url}/list/todoOrderList`} component={OrderTodoContainer} />
      <Route path={`${match.url}/list/doneOrderList`} component={OrderDoneContainer} />
      <Route path={`${match.url}/list/goneOrderList`} component={OrderGoneContainer} />
      <Route path={`${match.url}/list/todoInvoiceList`} component={InvoiceTodoContainer} />
      <Route path={`${match.url}/list/doneInvoiceList`} component={InvoiceDoneContainer} />
      <Route path={`${match.url}/list/todoRefundList`} component={RefundContainer} />
      <Redirect from="/orderManagement" to={`${match.url}/list/todoOrderList`} />
      <Redirect from="/invoiceManagement" to={`${match.url}/list/todoInvoiceList`} />
      <Redirect from="/refundManagement" to={`${match.url}/list/todoRefundList`} />
    </Switch>
  );
}
