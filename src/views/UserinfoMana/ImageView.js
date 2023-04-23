import React, { Component } from 'react';
import { Tabs, Button, Empty, message, Modal } from 'antd';
import { httpCommonClient, httpFormClient } from 'common/axios';
import styles from './style.module.less';
import _ from 'lodash';
import RcViewer from 'rc-viewer';
const { confirm } = Modal;
const TabPane = Tabs.TabPane;
export default class CarAuditPhoto extends Component {
  state = {
    photoKey: !_.isEmpty(this.props.infoList) ? '1' : '0',
  };
  render() {
    //二网： 0：正常；2：待上传资料；3：待审核；
    //经销商： 0:正常;1:待上传资料;2:待审核;9:停用
    const { photoList = [], videoList = [], distributor = {}, ew = {} } = this.props.infoList;
    const url = !_.isEmpty(distributor) ? '/DistributorAction' : '/EwAction';
    return (
      <div>
        <div className={styles.collectTit}>影像资料</div>
        {(distributor.status === 2 || ew.auditStatus === 3) && (
          <Button
            style={{ float: 'right' }}
            type="primary"
            onClick={() => {
              let self = this;
              confirm({
                title: '请确认是否退回影像资料退回?',
                onOk() {
                  httpCommonClient
                    .post(`${url}_auditNotPass`, { id: distributor.id || ew.id })
                    .then(({ data = {} }) => {
                      if (data.result === 0) {
                        message.success(data.msg);
                        self.props.onSearch();
                      } else {
                        message.error(data.msg);
                      }
                    });
                },
              });
            }}
          >
            影像资料退回
          </Button>
        )}
        &nbsp;&nbsp;
        {(distributor.status === 2 || ew.auditStatus === 3) && (
          <Button
            style={{ float: 'right', marginRight: '20px' }}
            type="primary"
            onClick={() => {
              let self = this;
              confirm({
                title: '请确认是否审核通过?',
                onOk() {
                  httpCommonClient.post(`${url}_auditPass`, { id: distributor.id || ew.id }).then(({ data = {} }) => {
                    if (data.result === 0) {
                      message.success(data.msg);
                      self.props.onSearch();
                    } else {
                      message.error(data.msg);
                    }
                  });
                },
              });
            }}
          >
            审核通过
          </Button>
        )}
        {(distributor.status === 0 || ew.auditStatus === 0) && (
          <Button
            style={{ float: 'right' }}
            type="primary"
            onClick={() => {
              let self = this;
              confirm({
                title: '请确认是否重拍门头?',
                onOk() {
                  httpCommonClient
                    .post(`${url}_rephotograph`, { id: distributor.id || ew.id })
                    .then(({ data = {} }) => {
                      if (data.result === 0) {
                        message.success(data.msg);
                        self.props.onSearch();
                      } else {
                        message.error(data.msg);
                      }
                    });
                },
              });
            }}
          >
            重拍门头
          </Button>
        )}
        <div className={styles.carAuditPhoto}>
          {!_.isEmpty(photoList) && (
            <Tabs
              type="card"
              //activeKey={this.state.photoKey}
              defaultActiveKey={String(photoList.length - 1)}
              onChange={val => this.setState({ photoKey: val })}
            >
              {photoList.map((item, index) =>
                item.fileName ? (
                  <TabPane tab={String(index + 1)} key={index}>
                    <RcViewer>
                      <img className={styles.img} src={item.absolutePath} />
                    </RcViewer>
                    <div style={{ fontWeight: 'bold' }}>门店照片</div>
                    <div>拍摄时间:{item.opStarttime}</div>
                    <div>拍摄地点:{item.location}</div>
                    <div>经度:{item.longitude}</div>
                    <div>纬度:{item.latitude}</div>
                    <div>经营地址:{distributor.businessAddress || ew.ewAddress}</div>
                  </TabPane>
                ) : (
                  <TabPane tab={String(index + 1)} key={index}>
                    <Empty
                      style={{ width: '300px' }}
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description="等待用户上传门店照片"
                    />
                  </TabPane>
                )
              )}
            </Tabs>
          )}
          {!_.isEmpty(videoList) && (
            <Tabs type="card" defaultActiveKey={String(videoList.length - 1)}>
              {videoList.map((item, index) =>
                item.fileName ? (
                  <TabPane tab={String(index + 1)} key={index}>
                    <video className={styles.video} src={item.absolutePath} controls="controls" />
                    <div style={{ fontWeight: 'bold' }}>门店视频</div>
                    <div>拍摄时间:{item.opStarttime}</div>
                    <div>拍摄地点:{item.location}</div>
                    <div>经度:{item.longitude}</div>
                    <div>纬度:{item.latitude}</div>
                    <div>经营地址:{distributor.businessAddress || ew.ewAddress}</div>
                  </TabPane>
                ) : (
                  <TabPane tab={String(index + 1)} key={index}>
                    <Empty
                      style={{ width: '300px' }}
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description="等待用户上传门店视频"
                    />
                  </TabPane>
                )
              )}
            </Tabs>
          )}
        </div>
      </div>
    );
  }
}
