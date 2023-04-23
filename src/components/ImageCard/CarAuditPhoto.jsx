import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Button, Empty, Icon, Tooltip } from 'antd';
import moment from 'moment';
import styles from './style.module.less';
import _isEmpty from 'lodash/isEmpty';
import { formatTime } from 'common/utils';

const TabPane = Tabs.TabPane;
export default class CarAuditPhoto extends PureComponent {
  static propTypes = {
    path: PropTypes.string,
    title: PropTypes.string,
    time: PropTypes.number,
    locaiton: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    showPreview: PropTypes.func,
  };

  state = {
    activeKey: !_isEmpty(this.props.data)
      ? String([...(this.props.data.hisList || []), this.props.data].length - 1)
      : '0',
  };

  handlePreview = (title, url) => e => {
    this.props.showPreview && this.props.showPreview(title, url);
  };

  onChange = activeKey => {
    this.setState({ activeKey });
  };
  //证件识别结果
  carSpotResult = (data, car) => {
    let chassis = data.chassisNum && data.chassisNum !== '-1' ? data.chassisNum : data.ccChassisNum //识别出的车架号
    let subChassis = chassis.substring(chassis.length - 8, chassis.length) //识别出的车架号后8位
    let checkIcon = false
    if (car.chassis && car.chassis == chassis) {
      checkIcon = true
    } else if (car.fullChassisNo && car.fullChassisNo == chassis) {
      checkIcon = true
    } else if (!car.fullChassisNo && car.chassis == subChassis) {
      checkIcon = true
    }
    return <p className={styles.subtitle}>识别结果：{chassis}
      &nbsp;&nbsp;
      {checkIcon ? <Icon type="check-circle" style={{ color: 'green' }} /> : <Icon type="close-circle" style={{ color: 'red' }} />}
    </p>
  }
  renderCard = data => {
    if (_isEmpty(data)) {
      return null;
    }
    const {
      codeType,
      codetypeDesc: title,
      ccChassisNum,//自研识别结果
      chassisNum,//腾讯云识别结果
      file = {},
      noImage,
      hideDetail,
      distance,
      locationTypeName,
      useflag,
    } = data;
    const { readOnly, url = '', curSpottest = {}, car = {} } = this.props;
    const { opStarttime = {}, location, latitude, longitude, absolutePath: path } = file || {};
    const isImageRecognition = codeType === 101;
    const isVideo = codeType === 201 || codeType === 202 || data.category === '200000';
    return (
      <div className={styles.imageCard}>
        {!noImage && (
          <div
            className={`${styles.image} ${_isEmpty(file) ? styles.disabled : ''}`}
            style={{ backgroundImage: isVideo ? '' : `url(${path})` }}
          >
            <div onClick={isVideo || _isEmpty(file) ? null : this.handlePreview(title, path)}>
              {isVideo && <video src={path} controls="controls" />}
              {!isVideo && <div className={styles.preview} />}
            </div>
          </div>
        )}
        <div className={styles.content}>
          {!_isEmpty(file) ? (
            <Fragment>
              <div className={styles.header}>
                <p className={styles.title}>{title}</p>
                {isImageRecognition && <p className={styles.subtitle}>识别结果：{(chassisNum && chassisNum !== '-1') ? chassisNum : ccChassisNum}</p>}
                {["接证任务", "盘证任务"].includes(curSpottest.description) &&
                  <>
                    {this.carSpotResult(data, car)}
                    {
                      ['合格证', '进口机动车辆随车检验单'].includes(data.codetypeDesc) &&
                      <>
                        <p className={styles.subtitle}>发证日期：{data.certificationDate}
                          &nbsp;&nbsp;
                          {!data.certConfirmFlag && !car.certConfirmFlag && !car.certificationDate && <Tooltip title="修改">
                            <Icon
                              type="edit"
                              style={{ color: 'rgba(24, 144, 255, 1)', fontSize: '16px' }}
                              onClick={() => {
                                this.props.onShowCarSpot(data)
                              }}
                            />
                          </Tooltip>}
                        </p>
                        {curSpottest.brandName == '青岛解放' && <p className={styles.subtitle}>排放标准：{data.emissionStandards}</p>}
                      </>
                    }
                  </>
                }
                <p className={styles.subtitle}>拍摄时间：{formatTime(opStarttime)}</p>
              </div>
              {!hideDetail && (
                <div className={styles.detail}>
                  <p className={styles.location}>拍摄地点：{location}</p>
                  <p className={styles.latitude}>
                    <span style={{ marginRight: '20px' }}>经度：{longitude}</span>
                    <span>纬度：{latitude}</span>
                  </p>
                  {!String(url).startsWith('/certificateTask') && title !== '合格证' && (
                    <p className={styles.longitude}>
                      距离{locationTypeName}：{distance}米
                    </p>
                  )}
                </div>
              )}
              {/* description免监管任务无需展示退回重拍 */}
              {!readOnly && !curSpottest.description && (
                <Button
                  style={{ position: 'absolute', bottom: '30px', right: '20px' }}
                  onClick={() => this.props.onShowModal(data)}
                  disabled={useflag === 1}
                >
                  {useflag === 1 ? '已退回' : '退回重拍'}
                </Button>
              )}
            </Fragment>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="等待用户上传数据" />
          )}
        </div>
      </div>
    );
  };
  render() {
    const { hisList = [] } = this.props.data;
    const dataList = [...hisList, this.props.data];
    if (dataList.length == 1) {
      return <div>{this.renderCard(dataList[0])}</div>;
    } else {
      return (
        <div className={styles.carAuditPhoto}>
          <Tabs
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            type="card"
            defaultActiveKey={String(dataList.length - 1)}
          >
            {dataList.map((data, index) => (
              <TabPane tab={String(index + 1)} key={index}>
                {this.renderCard(data)}
              </TabPane>
            ))}
          </Tabs>
        </div>
      );
    }
  }
}
