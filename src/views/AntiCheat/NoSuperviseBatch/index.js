import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import uploadList from './uploadList';
import detail from './detail';
import listUnsupervised from './listUnsupervised';
import supeDetail from './supeDetail';
export default function TaskSummaryRouter({ match }) {
    return (
        <Switch>
            <Route path={`/noSuperviseBatch/uploadList`} component={uploadList} />
            <Route path={`/noSuperviseBatch/detail/:id`} component={detail} />
            <Route path={`/listUnsupervised/detail/:id`} component={supeDetail} />
            <Route path={`/listUnsupervised`} component={listUnsupervised} />
            <Redirect from="/noSuperviseBatch" to={`/noSuperviseBatch/uploadList`} />
        </Switch>
    );
}
