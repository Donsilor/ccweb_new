import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import DaoqiFCZ from './DaoqiFCZ';
import CarCollectFCZ from './CarCollectFCZ';
import settingFCZ from './paraSetting';
import list from './UploadFCZ/list';
import history from './UploadFCZ/history';
import ledgerFCZ from './ledgerFCZ';
import policyFCZ from './policyFCZ';
import dealerFCZ from './dealerFCZ';
import usedCarFCZ from './usedCarFCZ';
import supervisorFCZ from './supervisorFCZ';
export default function TaskSummaryRouter({ match }) {
    return (
        <Switch>
            <Route path={`/daoqiFCZ`} component={DaoqiFCZ} />
            <Route path={`/carCollectFCZ`} component={CarCollectFCZ} />
            <Route path={`/settingFCZ`} component={settingFCZ} />
            <Route path={`/uploadFCZ/list`} component={list} />
            <Route path={`/uploadFCZ/history`} component={history} />
            <Route path={`/ledgerFCZ`} component={ledgerFCZ} />
            <Route path={`/policyFCZ`} component={policyFCZ} />
            <Route path={`/dealerFCZ`} component={dealerFCZ} />
            <Route path={`/usedCarFCZ`} component={usedCarFCZ} />
            <Route path={`/supervisorFCZ`} component={supervisorFCZ} />
            <Redirect from="/uploadFCZ" to={`/uploadFCZ/list`} />
        </Switch>
    );
}
