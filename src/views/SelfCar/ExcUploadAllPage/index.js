import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import uploadAll from './UploadAllContainer';
import uploadAllList from './UploadListContainer';
import sellData from './SellDataContainer';

export default function TaskSummaryRouter() {
  return (
    <Switch>
      <Route path={`/excUploadAll/uploadAll`} component={uploadAll} />
      <Route path={`/excUploadAll/uploadAllList`} component={uploadAllList} />
      <Route path={`/excUploadAll/sellData/:id`} component={sellData} />
      <Redirect from="/excUploadAll" to="/excUploadAll/uploadAll" />
    </Switch>
  );
}
