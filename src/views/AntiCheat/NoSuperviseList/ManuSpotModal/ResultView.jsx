import React, { Component } from 'react';
import { Icon } from 'antd';

export default class ResultView extends Component {
  render() {
    const { ifSuccess, message } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '200px',
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
          {ifSuccess ? '明细生成成功!' : '明细生成失败!'}
        </p>
        <p style={{ whiteSpace: 'pre-wrap', textAlign: 'center', marginBottom: '15px', fontSize: '14px', color: 'rgba(0,0,0,.45)' }}>
          {message}
        </p>
      </div>
    );
  }
}
