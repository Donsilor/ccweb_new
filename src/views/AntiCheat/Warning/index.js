import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import refund from './Upload/refundUpload';
import expire from './Upload/expireUpload';
import shift from './Upload/shiftUpload';
import certificate from './Upload/certiUpload';
import supplyMana from './supplyMana';
import brandMana from './brandMana';
import paraSetting from './paraSetting';
import expend from './Analy/expendAnaly';
import redem from './Analy/redemAnaly';
import shiftA from './Analy/shiftAnaly';
import trade from './Analy/tradeAnaly';
import returnA from './Analy/returnAnaly';
import warningMes from './warningMes';
import warningBrandMana from './warningBrandMana';

export default function TaskSummaryRouter({ match }) {
  return (
    <Switch>
      <Route path={`${match.url}/refund`} component={refund} />
      <Route path={`${match.url}/expire`} component={expire} />
      <Route path={`${match.url}/shift`} component={shift} />
      <Route path={`${match.url}/certificate`} component={certificate} />
      <Route path={`${match.url}/expend`} component={expend} />
      <Route path={`${match.url}/redem`} component={redem} />
      <Route path={`${match.url}/shiftA`} component={shiftA} />
      <Route path={`${match.url}/trade`} component={trade} />
      <Route path={`${match.url}/return`} component={returnA} />
      <Route path="/supplyMana" component={supplyMana} />
      <Route path="/brandMana" component={brandMana} />
      <Route path="/paraSetting" component={paraSetting} />
      <Route path="/warningMes" component={warningMes} />
      <Route path="/warningBrandMana" component={warningBrandMana} />
      <Redirect from="/uploadWarning" to={`${match.url}/refund`} />
      <Redirect from="/statAnalysis" to={`${match.url}/expend`} />
    </Switch>
  );
}
