import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { httpFormClient } from 'common/axios';
import _isEmpty from 'lodash/isEmpty';
import styles from 'layouts/ActionArea/style.module.less';
import OperationAreaForMenu from 'components/OperationAreaForMenu';

import CarInfoView from './CarInfoView';
import ParentTaskInfo from './ParentTaskInfo';
import { EwTrackRecordContainer, DisTrackRecordContainer } from './TrackRecord';

export default class SpottestDetailView extends Component {
  state = {
    ifSubTask: false,
    parentTask: {},
    parentChangList: [],
    ewTraceList: [],
    disTraceList: [],
  };

  componentDidMount() {
    this.handleSearch();
  }
  handleSearch = () => {
    const {
      params: { id },
    } = this.props.match;
    return httpFormClient
      .formSubmit('/SpotTestTaskAction_getParentSpotTestTask', '', { id })
      .then(({ data }) => {
        if (data.result === 0) {
          const {
            parentTask = {},
            parentExTypeChangLogList: parentChangList = [],
            ewTraceList = [],
            disTraceList = [],
          } = data;
          this.setState({
            parentTask,
            parentChangList,
            ewTraceList,
            disTraceList,
            ifSubTask: !_isEmpty(parentTask),
          });
        } else {
          return Promise.reject(data.reject(data.msg));
        }
      })
      .catch(() => {
        this.setState({
          ifSubTask: false,
        });
      });
  };
  render() {
    const { search, pathname } = this.props.location;
    const {
      params: { id },
      path,
    } = this.props.match;
    const ifLedger = path.startsWith('/spottestAuditLedger');
    const menuId = ifLedger ? '/spottestAuditLedger' : '/spottestAudit';
    return (
      <div>
        <Switch>
          <Route path={`/:menu/detail/carInfo/:id`} render={props => <CarInfoView {...props} />} />
          <Route
            path={`/:menu/detail/trackRecordForDist/:id`}
            render={props => <DisTrackRecordContainer {...props} />}
          />
          <Route path={`/:menu/detail/trackRecordForEw/:id`} render={props => <EwTrackRecordContainer {...props} />} />
          <Route
            path={`/:menu/detail/parentTaskInfo/:id`}
            render={props => (
              <ParentTaskInfo
                {...props}
                parentTask={this.state.parentTask}
                parentChangList={this.state.parentChangList}
                ewTraceList={this.state.ewTraceList}
                disTraceList={this.state.disTraceList}
              />
            )}
          />
        </Switch>
        <OperationAreaForMenu>
          {this.state.ifSubTask && (
            <Link
              to={{
                pathname: `${menuId}/detail/parentTaskInfo/${id}`,
                search,
              }}
              style={{ position: 'relative', top: '9.5px', left: '15px' }}
              className={String(pathname).startsWith(`${menuId}/detail/parentTaskInfo`) ? styles.active : ''}
            >
              父任务详情
            </Link>
          )}
        </OperationAreaForMenu>
      </div>
    );
  }
}
