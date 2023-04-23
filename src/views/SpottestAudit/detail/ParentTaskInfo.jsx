import React, { Component, Fragment } from 'react';
import { Empty, Timeline, Table, Divider } from 'antd';
import DetailWrapper from 'layouts/DetailWrapper';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
import DetailInfoGrid from 'components/DetailInfoGrid';
import { formatTime } from 'common/utils';
import { ewTrColumns, disTrColumns, calcAnsweredTime } from './TrackRecord/ListGrid';
import _isEmpty from 'lodash/isEmpty';

export default class ParentTaskInfo extends Component {
  renderBasicInfo = () => {
    const { parentTask } = this.props;
    const list = parentTask
      ? [
          {
            label: '经销商名称',
            value: parentTask.distributorName,
          },
          {
            label: '二网名称',
            value: parentTask.ewName,
          },
          {
            label: '任务编号',
            value: parentTask.id,
          },
          {
            label: '车架号',
            value: parentTask.chassis,
          },
        ]
      : [];
    return list;
  };

  render() {
    const { parentChangList, ewTraceList, disTraceList, parentTask } = this.props;
    return (
      <div>
        <DetailWrapper title="父任务信息">
          <DetailInfoGrid list={this.renderBasicInfo()} layout="vertical" />
        </DetailWrapper>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', width: '400px', marginRight: '20px' }}>
            <DetailWrapper title="异常原因变更记录" style={{ flex: 1 }}>
              {_isEmpty(parentChangList) ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              ) : (
                <Timeline>
                  {parentChangList.map(item => {
                    const { id, operTime, fromValue, toValue, description, operName } = item;
                    return (
                      <Timeline.Item color="red" key={id}>
                        <p>{`${operName}：${fromValue} → ${toValue}`}</p>
                        <p>{`操作人：${operName}`}</p>
                        <p>{`描述：${description}`}</p>
                        <p>{`操作时间：${formatTime(operTime)}`}</p>
                      </Timeline.Item>
                    );
                  })}
                </Timeline>
              )}
            </DetailWrapper>
          </div>
          <div style={{ flex: 1 }}>
            <DetailWrapper title="二网跟踪记录">
              {_isEmpty(ewTraceList) ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              ) : (
                <Fragment>
                  <div style={{ position: 'absolute', top: '20px', right: '50px' }}>
                    <span>打通次数：{calcAnsweredTime(parentTask, true).answeredTime}</span>
                    <Divider type="vertical" />
                    <span>未打通次数：{calcAnsweredTime(parentTask, true).notAnsweredTime}</span>
                  </div>
                  <Table columns={ewTrColumns} dataSource={ewTraceList} pagination={false} rowKey="id" />
                </Fragment>
              )}
            </DetailWrapper>
            <DetailWrapper title="经销商跟踪记录">
              {_isEmpty(disTraceList) ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              ) : (
                <Fragment>
                  <div style={{ position: 'absolute', top: '20px', right: '50px' }}>
                    <span>打通次数：{calcAnsweredTime(parentTask, false).answeredTime}</span>
                    <Divider type="vertical" />
                    <span>未打通次数：{calcAnsweredTime(parentTask, false).notAnsweredTime}</span>
                  </div>
                  <Table columns={disTrColumns} dataSource={disTraceList} pagination={false} rowKey="id" />
                </Fragment>
              )}
            </DetailWrapper>
          </div>
        </div>

        <OperationArea>
          <BackToList />
        </OperationArea>
      </div>
    );
  }
}
