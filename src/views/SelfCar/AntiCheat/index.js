import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AntiCheatRouter from './AntiCheat';
import AntiDetailRouter from './antiDetail';
export default function pageRouter() {
  return (
    <Switch>
      <Route path={'/selfcarCheat/detail/:id'} component={AntiDetailRouter} />
      <Route path={'/selfcarCheat'} component={AntiCheatRouter} />
      <Redirect from={`/selfcarCheat`} to={`/selfcarCheat`} />
    </Switch>
  );
}
