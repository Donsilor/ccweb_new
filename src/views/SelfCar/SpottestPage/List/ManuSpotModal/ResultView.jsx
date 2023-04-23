import React, { Component } from 'react';
import { Icon } from 'antd';

export default class ResultView extends Component {
  render() {
    const { ifSuccess } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '160px',
        }}
      >
        <div
          style={{
            marginBottom: '24px',
            fontSize: '72px',
            lineHeight: '72px',
            color: ifSuccess ? '#52c41a' : '#f5222d',
          }}
        >
          <Icon type={ifSuccess ? 'check-circle' : 'close-circle'} />
        </div>
        <p style={{ marginBottom: '24px', fontSize: '24px', lineHeight: '22px', color: 'rgba(0,0,0,.45)' }}>
          {ifSuccess ? '任务下发成功' : '任务下发失败'}
        </p>
        {!ifSuccess && (
          <p style={{ marginBottom: '16px', fontSize: '14px', lineHeight: '32px', color: 'rgba(0,0,0,.45)' }}>
            请核对选择的车辆信息，再重新下发任务
          </p>
        )}
      </div>
    );
  }
}
