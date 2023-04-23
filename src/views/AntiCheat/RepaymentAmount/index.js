import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import dealer from './dealer';
import brand from './brand';
import supplyChain from './supplyChain';
export default function TaskSummaryRouter({ match }) {
    return (
        <Switch>
            <Route path={`/repaymentAmount/dealer`} component={dealer} />
            <Route path={`/repaymentAmount/brand`} component={brand} />
            <Route path={`/repaymentAmount/supplyChain`} component={supplyChain} />
            <Redirect from="/repaymentAmount" to={`/repaymentAmount/dealer`} />
        </Switch>
    );
}
