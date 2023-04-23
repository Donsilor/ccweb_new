import React from 'react';
import { Route, Switch } from 'react-router-dom';
import list from './list';
import detail from './detail';
export default function TaskSummaryRouter({ match }) {
    return (
        <Switch>
            <Route path={`${match.url}/detail/:id/:name`} component={detail} />
            <Route path={`/carBillContrast`} component={list} />
        </Switch>
    );
}