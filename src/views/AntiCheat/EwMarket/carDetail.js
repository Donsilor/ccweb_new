import React, { Component } from 'react';
import { Spin, message, Button, Modal, Empty, Tooltip } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import DetailWrapper from 'layouts/DetailWrapper';
import { httpCommonClient } from 'common/axios';
import ModalForm from 'components/ModalForm';
import OperationArea from 'components/OperationArea';
import DetailInfoGrid from 'components/DetailInfoGrid';
import BackToList from 'components/BackToList';
import styles from './style.module.less';
import { auditStatus } from './index';
import RcViewer from 'rc-viewer';
const confirm = Modal.confirm;
export default class CarDetail extends Component {
  state = {
    loading: false,
    carInfo: {},
  };
  componentDidMount() {
    this.handleSearch();
  }
  handleSearch = () => {
    this.setState({ loading: true });
    httpCommonClient
      .get(`/yck/vehicle/info/${this.props.match.params.id}`, {})
      .then(({ data = {} }) => {
        if (data.code === 200) {
          this.setState({ carInfo: data.data });
        } else {
          message.error(data.msg);
        }
      })
      .then(() => {
        this.setState({ loading: false });
      });
  };
  renderCarInfo = () => {
    const { carInfo } = this.state;
    const list = !_isEmpty(carInfo)
      ? [
          {
            label: '车架号',
            value: carInfo.vin,
          },
          {
            label: '经销商名称',
            value: carInfo.dealerName,
          },
          {
            label: '厂商名称',
            value: carInfo.manufacturerName,
          },
          {
            label: '业务状态',
            value: auditStatus(carInfo.auditStatus),
          },
          {
            label: '创建日期',
            value: carInfo.createDate,
          },
          {
            label: '车辆品牌',
            value: carInfo.brandName,
          },
          {
            label: '车系',
            value: carInfo.vehicleSeriesName,
          },
          {
            label: '激励金额',
            value: carInfo.bonusAmount,
          },
          {
            label: '二网名称',
            value: carInfo.agentName,
          },
          {
            label: '二网地址',
            value: carInfo.agentAddress,
          },
          {
            label: '销售日期',
            value: carInfo.saleDate,
          },
          {
            label: '二网联系人',
            value: carInfo.agentContactPerson,
          },
          {
            label: '二网联系电话',
            value: carInfo.agentContactPhone,
          },
          {
            label: '最后提交地址',
            value: carInfo.agentAddress,
          },
          {
            label: '客户姓名',
            value: carInfo.vehicleCustumer && carInfo.vehicleCustumer.custumerName,
          },
          {
            label: '客户身份证',
            value: carInfo.vehicleCustumer && carInfo.vehicleCustumer.custumerIdcard,
          },
          {
            label: '客户联系电话',
            value: carInfo.vehicleCustumer && carInfo.vehicleCustumer.custumerPhone,
          },
          {
            label: '奖励金发放日期',
            value: carInfo.bonusDate,
          },
          {
            label: '奖励金发放备注',
            value: carInfo.bonusRemarks,
          },
        ]
      : [];
    return list;
  };
  render() {
    const { match } = this.props;
    const { carInfo } = this.state;
    return (
      <Spin spinning={this.state.loading}>
        <DetailWrapper title="车辆信息">
          <DetailInfoGrid list={this.renderCarInfo()} />
        </DetailWrapper>
        <DetailWrapper title="拍摄信息">
          {/* <div style={{ position: 'absolute', display: 'inline-block', top: '15px', right: '50px' }}>
                        <Button type="primary">批量导出图片</Button>
                    </div> */}
          {!_isEmpty(carInfo.vehiclePhotoList) ? (
            <div className={styles.carAuditPhoto}>
              {carInfo.vehiclePhotoList.map(
                item =>
                  (item.configPhoto.photoType != '代提人' ||
                    (item.configPhoto.photoType == '代提人' && carInfo.vehicleCustumer.agentName == '是')) && (
                    <div className={styles.imageCard}>
                      <RcViewer>
                        <img className={styles.image} src={item.photoUrl} />
                      </RcViewer>
                      <div className={styles.content}>
                        <p className={styles.title}>{item.configPhoto.content}</p>
                        <div>定位地点:{item.photoLocation}</div>
                        <div>拍摄时间:{item.photoDate}</div>
                        <div>拍摄人:{item.photoOwnner}</div>
                        <div>距离：{item.distance}米</div>
                      </div>
                    </div>
                  )
              )}
            </div>
          ) : (
            <Empty description="暂无拍摄数据" />
          )}
        </DetailWrapper>
        <OperationArea>
          {['1', '2', '4'].includes(carInfo.auditStatus) && (
            <Button
              icon="check-circle"
              type="primary"
              loading={this.state.isExporting}
              onClick={() => {
                let self = this;
                confirm({
                  title: '请确认是审核通过?',
                  onOk() {
                    const hide = message.loading('审核通过中，请稍后。。。', 0);
                    self.setState({
                      isExporting: true,
                    });
                    httpCommonClient
                      .post(`/yck/vehicle/${match.path.indexOf('marketFirst') > -1 ? 'auditFirst' : 'auditSecond'}`, {
                        id: self.props.match.params.id,
                      })
                      .then(({ data = {} }) => {
                        if (data.code === 200) {
                          message.success(data.msg);
                          window.history.back();
                        } else {
                          Modal.error({
                            title: '错误信息：',
                            content: data.msg,
                          });
                        }
                      })
                      .then(res => {
                        self.setState({
                          isExporting: false,
                        });
                        hide();
                      });
                  },
                });
              }}
            >
              审核通过
            </Button>
          )}
          {['1', '2', '4'].includes(carInfo.auditStatus) && (
            <Button
              onClick={() =>
                this.setState({
                  showExcepModal: true,
                })
              }
              icon="warning"
              type="danger"
            >
              退回重拍
            </Button>
          )}
          <Button onClick={() => window.history.back()}>返回列表</Button>
        </OperationArea>
        {/*退回重拍*/}
        {this.state.showExcepModal && (
          <ModalForm
            title={`退回重拍`}
            onOk={() => {
              this.setState({ showExcepModal: false });
              window.history.back();
            }}
            onCancel={() => this.setState({ showExcepModal: false })}
            onSubmit={formData => {
              return httpCommonClient
                .post(`/yck/vehicle/${formData.auditStatus == '4' ? 'rejectSecond' : 'rejectToAgent'}`, {
                  id: this.props.match.params.id,
                  ...formData,
                })
                .then(({ data = {} }) => {
                  if (data.code === 200) {
                    return Promise.resolve({
                      data: {
                        result: 0,
                      },
                    });
                  } else {
                    return Promise.resolve({
                      data: {
                        result: 1,
                        msg: data.msg,
                      },
                    });
                  }
                });
            }}
            configList={[
              match.path.indexOf('marketFirst') == -1 && {
                label: '退回到',
                type: 'radio',
                key: 'auditStatus',
                required: true,
                optionList:
                  carInfo.auditStatus == '4'
                    ? [{ label: '退回到二网', value: '3' }]
                    : [{ label: '退回到二网', value: '3' }, { label: '退回到易查库', value: '4' }],
              },
              {
                label: '退回原因',
                type: 'textArea',
                key: 'remarks',
                required: true,
              },
            ]}
          />
        )}
      </Spin>
    );
  }
}
