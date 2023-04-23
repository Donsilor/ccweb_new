import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import dealerList from './dealerList';
import ewList from './ewList';
import dealerEdit from './dealerEdit';
import ewEdit from './ewEdit';

export default function pageRouter() {
  return (
    <Switch>
      <Route path={'/dealerList/edit/:id'} component={dealerEdit} />
      <Route path={'/dealerList/add'} component={dealerEdit} />
      <Route path={'/dealerList'} component={dealerList} />
      <Route path={'/ewList/add'} component={ewEdit} />
      <Route path={'/ewList/edit/:id'} component={ewEdit} />
      <Route path={'/ewList'} component={ewList} />
    </Switch>
  );
}
