import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import carList from './carList';
import carDis from './carDis';
import carBank from './carBank';
import detail from './detail';
export default function TaskSummaryRouter({ match }) {
    return (
        <Switch>
            <Route path={`${match.url}/detail/:id/:dis`} component={detail} />
            <Route path={`/CarAction_Bank`} component={carBank} />
            <Route path={`/CarAction_Dis/carTodo`} component={carDis} />
            <Route path={`/CarAction_Dis/carList`} component={carList} />
            <Redirect from="/CarAction_Dis" to={`/CarAction_Dis/carTodo`} />
        </Switch>
    );
}