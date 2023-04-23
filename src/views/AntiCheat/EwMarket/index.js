import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import marketList from './List/marketList';
import marketFirstList from './List/marketFirstList';
import marketFirstAbnormal from './List/marketFirstAbnormal';
import marketRecheck from './List/marketRecheck';
import marketAwardCheck from './Award/awardCheck';
import awardRemitTodo from './Award/awardRemitTodo';
import awardRemitDone from './Award/awardRemitDone';
import carDetail from './carDetail';

export default function TaskSummaryRouter({ match }) {
  return (
    <Switch>
      <Route path={`${match.url}/detail/:id`} component={carDetail} />
      <Route path={`${match.url}/marketFirstList/detail/:id`} component={carDetail} />
      <Route path={`${match.url}/marketFirstAbnormal/detail/:id`} component={carDetail} />
      <Route path={`/marketList`} component={marketList} />
      <Route path={`${match.url}/marketFirstList`} component={marketFirstList} />
      <Route path={`${match.url}/marketFirstAbnormal`} component={marketFirstAbnormal} />
      <Route path={`/marketRecheck`} component={marketRecheck} />
      <Route path={`/marketAwardCheck`} component={marketAwardCheck} />
      <Route path={`${match.url}/awardRemitTodo`} component={awardRemitTodo} />
      <Route path={`${match.url}/awardRemitDone`} component={awardRemitDone} />
      <Redirect from="/marketAwardRemit" to={`/marketAwardRemit/awardRemitTodo`} />
      <Redirect from="/marketFirst" to={`/marketFirst/marketFirstList`} />
    </Switch>
  );
}
export function auditStatus(val) {
  if (val == '0') {
    return '未提交'
  } else if (val == '1') {
    return '待初审'
  } else if (val == '2') {
    return '待复审'
  } else if (val == '3') {
    return '退回到二网'
  } else if (val == '4') {
    return '退回到易查库'
  } else if (val == '5') {
    return '奖励金待审核'
  } else if (val == '6') {
    return '审批通过'
  } else if (val == '7') {
    return '已完成'
  } else {
    return val;
  }
}
