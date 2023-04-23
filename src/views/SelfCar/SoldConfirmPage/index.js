import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SoldConfirmTodo from './SoldTodoContainer';
import SoldConfirmGone from './SoldGoneContainer';

export default function TaskSummaryRouter() {
  return (
    <Switch>
      <Route exact path={`/soldConfirm/todo`} component={SoldConfirmTodo} />
      <Route exact path={`/soldConfirm/gone`} component={SoldConfirmGone} />
      <Redirect from="/soldConfirm" to="/soldConfirm/todo" />
    </Switch>
  );
}
