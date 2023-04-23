import React, { Component } from 'react';
import { Spin, message, Button, Icon, Tooltip, Modal, Divider, Empty } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import DetailWrapper from 'layouts/DetailWrapper';
import { httpFormClient, httpCommonClient } from 'common/axios';
import { formatTime } from 'common/utils';
import OperationArea from 'components/OperationArea';
import DetailInfoGrid from 'components/DetailInfoGrid';
import ModalWithForm from 'components/ModalForm';
import CarAuditDetailImageWrapper from './CarAuditDetailImageWrapper';
import ExceptionModal from './ExceptionModal';
import CarAuditMap from './CarAuditMap';
import DepartImageModal from './DepartImageModal';
import CarDistanceModal from './CarDistanceModal';
import moment from 'moment';

const confirm = Modal.confirm;
const carShowWaringEle = <span style={{ color: 'red' }}>车展尚未确定位置信息！</span>;
export default class CarAuditDetailView extends Component {
  state = {
    loading: true,
    isEw: false,
    showExcepModal: false,
    showMapModal: false,
    showDistanceModal: false,
    showCloseModal: false,
    car: {},
    curSpottest: {},
    curSpottestDetail: {},
    carShow: {},
    photoList: [],
    ewRemark: '',
    disRemark: '',
    carShowWarning: false,
    storehouse: {},
    storehouseRemark: '',
    showUpdateCar: false,
    title: ''
  };
  componentDidMount() {
    this.handleSearch();
  }
  goBack = () => {
    const {
      params: { spottestId },
      path,
    } = this.props.match;
    const ifLedger = path.startsWith('/spottestAuditLedger');
    const link = {
      pathname: `${ifLedger ? '/spottestAuditLedger' : '/spottestAudit'}/detail/carInfo/${spottestId}`,
      search: this.props.location.search || '',
    };
    this.props.history.push(link);
  };

  handleAuditPass = () => {
    const { id } = this.state.curSpottestDetail;
    const { carShowWarning } = this.state;
    const self = this;
    confirm({
      title: '确定要审核通过该抽查任务吗？',
      content: carShowWarning ? carShowWaringEle : null,
      onOk() {
        return httpFormClient
          .formSubmit('/SpotTestTaskAction_auditPass', '', { id })
          .then(({ data = {} }) => {
            if (data.result === 0) {
              message.success(data.msg || '操作成功！');
              self.goBack();
            } else {
              return Promise.reject(data.msg || '操作失败，请重试！');
            }
          })
          .catch(err => {
            message.error(err.message || err);
          });
      },
    });
  };

  handleSearch = () => {
    const {
      params: { spottestId, carId },
    } = this.props.match;
    if (spottestId && carId) {
      this.setState({
        loading: true,
      });
      httpFormClient
        .formSubmit('/SpotTestTaskAction_getAuditTaskDetail', '', { spottestId, carId })
        .then(({ data = {} }) => {
          if (data) {
            const { car, curSpottest, curSpottestDetail, carShow, photoList, ew, dis, storehouse, storehouseRemark } = data;
            this.setState({
              car,
              curSpottest,
              curSpottestDetail,
              carShow,
              photoList,
              loading: false,
              ew,
              ewRemark: (ew && ew.remark) || '',
              disRemark: (dis && dis.remark) || '',
              storehouse,//库房信息
              storehouseRemark //注意：该库房尚未采集定位信息
            });
            if (!_isEmpty(carShow)) {
              httpFormClient
                .formSubmit('/SpotTestTaskAction_checkCarShowPosition', '', { carShowId: carShow.id })
                .then(({ data = {} }) => {
                  if (data.result === 1) {
                    this.setState({
                      carShowWarning: true,
                    });
                  }
                });
            }
          } else {
            return Promise.reject(data.msg || '加载失败，请重试');
          }
        })
        .catch(err => {
          message.error(err.message || err);
        })
        .then(() => {
          this.setState({
            loading: false,
          });
        });
    }
  };

  renderCarInfo = () => {
    const { car: carInfo, ewRemark, disRemark } = this.state;
    const list = !_isEmpty(carInfo)
      ? [
        {
          label: '车架号',
          value: carInfo.chassis,
        },
        {
          label: '品牌车系',
          value: carInfo.fld_trim,
        },
        {
          label: '发动机号',
          value: carInfo.engine,
        },
        {
          label: '钥匙数量',
          value: carInfo.carkeys,
        },
        {
          label: '二网备注',
          value: ewRemark,
          block: true,
        },
        {
          label: '经销商备注',
          value: disRemark,
        },
        {
          label: <div>发证日期&nbsp;&nbsp;
            <Tooltip title="修改">
              <Icon
                type="edit"
                style={{ color: 'rgba(24, 144, 255, 1)', fontSize: '17px' }}
                onClick={() => {
                  this.setState({ title: '发证日期', showUpdateCar: true })
                }}
              />
            </Tooltip>
          </div>,
          value: <span style={{ color: !carInfo.certificationDateUpdateFlag ? 'green' : '' }}> {carInfo.certificationDate}</span >
        },
        {
          label: <div>排放标准&nbsp;&nbsp;
            <Tooltip title="修改">
              <Icon
                type="edit"
                style={{ color: 'rgba(24, 144, 255, 1)', fontSize: '17px' }}
                onClick={() => {
                  this.setState({ title: '排放标准', showUpdateCar: true })
                }}
              />
            </Tooltip>
          </div>,
          value: <span style={{ color: !carInfo.emissionStandardsFlag ? 'green' : '' }}>{carInfo.emissionStandards || '-'}</span>
        },
      ]
      : [];
    return list;
  };
  renderCarShowInfo = () => {
    const { carShow } = this.state;
    const list = !_isEmpty(carShow)
      ? [
        {
          label: '车展名称',
          value: carShow.showName,
        },
        {
          label: '车展ID',
          value: carShow.id,
        },
        {
          label: '车展地址',
          value: carShow.showAddress,
        },
        {
          label: '抽查频率',
          value: carShow.spottestFeqCH,
        },
        {
          label: '开始日期',
          value: formatTime(carShow.startTime),
        },
        {
          label: '结束日期',
          value: formatTime(carShow.endTime),
        },
      ]
      : [];
    return list;
  };

  handleOk = () => {
    this.handleCancel();
    this.goBack();
  };
  handleOkAndReloadData = () => {
    this.handleCancel();
    this.handleSearch();
  };

  handleCancel = () => {
    this.setState({
      showExcepModal: false,
      showMapModal: false,
      showDistanceModal: false,
      showCloseModal: false,
      showUpdateCar: false,
    });
  };

  handleCloseTask = value => {
    const {
      curSpottestDetail: { spottestId, id: spotdetailId },
    } = this.state;
    return httpFormClient.formSubmit('/ExceptionTraceAction_endExceptionTrace', '', {
      ...value,
      actionFrom: 1, // 待补拍任务关闭
      spottestId,
      spotdetailId,
    });
  };

  judgeIfExsitingPhoto = list => {
    let result = true;
    if (Array.isArray(list) && list.length === 0) {
      result = false;
    } else {
      result = [list[0], ...list[0].hisList].filter(photo => photo.file).length > 0;
    }
    return result;
  };

  render() {
    const { car, curSpottest, curSpottestDetail, carShow, photoList = [], showExcepModal, ew, storehouse, storehouseRemark, title } = this.state;
    const sortedPhotoList = photoList.sort(
      (a, b) => codeTypeSort.indexOf(a.codeType) - codeTypeSort.indexOf(b.codeType)
    );
    const noPhoto =
      this.state.loading ||
      [0, 1, 2, 11].includes(curSpottestDetail.status) ||
      !this.judgeIfExsitingPhoto(sortedPhotoList);
    const {
      match: { path },
    } = this.props;
    const readOnly = path && path.startsWith('/spottestAuditLedger');
    return (
      <Spin spinning={this.state.loading}>
        <DetailWrapper title="车辆信息">
          <DetailInfoGrid list={this.renderCarInfo()} layout="vertical" />
        </DetailWrapper>
        <DetailWrapper title={
          <div>
            影像资料
            <span style={{ color: '#D9001B', fontSize: '14px', marginLeft: '15px' }}>{storehouseRemark}</span>
          </div>
        }>
          {!noPhoto && (
            <div style={{ position: 'absolute', display: 'inline-block', top: '22px', right: '50px' }}>
              <Tooltip title="经销商店头信息">
                <a
                  href="javascript:;"
                  key="经销商店头信息"
                  style={{ color: 'rgba(0, 0, 0, 0.65)' }}
                  onClick={() =>
                    this.setState({
                      showDepartImageModal: true,
                      isEw: false,
                    })
                  }
                >
                  <Icon type="file-image" /> 经销商店头信息
                </a>
              </Tooltip>
              <Divider type="vertical" />
              {!_isEmpty(ew) && (
                <Tooltip title="二网店头信息">
                  <a
                    href="javascript:;"
                    key="二网店头信息"
                    style={{ color: 'rgba(0, 0, 0, 0.65)' }}
                    onClick={() =>
                      this.setState({
                        showDepartImageModal: true,
                        isEw: true,
                      })
                    }
                  >
                    <Icon type="file-image" /> 二网店头信息
                  </a>
                </Tooltip>
              )}
              {!_isEmpty(ew) && <Divider type="vertical" />}
              <Tooltip title="查看地图">
                <a
                  href="javascript:;"
                  key="查看地图"
                  style={{ color: 'rgba(0, 0, 0, 0.65)' }}
                  onClick={() =>
                    this.setState({
                      showMapModal: true,
                    })
                  }
                >
                  <Icon type="environment" /> 查看地图
                </a>
              </Tooltip>
              {/* <Divider type="vertical" /> */}
              {/* {!readOnly && (
                <Tooltip title="距离重测">
                  <a
                    href="javascript:;"
                    key="距离重测"
                    style={{ color: 'rgba(0, 0, 0, 0.65)' }}
                    onClick={() =>
                      this.setState({
                        showDistanceModal: true,
                      })
                    }
                  >
                    <Icon type="redo" /> 距离重测
                  </a>
                </Tooltip>
              )} */}
            </div>
          )}
          {
            !noPhoto ? (
              <CarAuditDetailImageWrapper car={car} curSpottest={curSpottest} list={sortedPhotoList} onSearch={this.handleSearch} readOnly={readOnly} />
            ) : (
              <Empty description="暂无拍摄数据" />
            )
          }
        </DetailWrapper >
        {!_isEmpty(carShow) && (
          <DetailWrapper title="车展信息">
            <DetailInfoGrid list={this.renderCarShowInfo()} layout="vertical" />
          </DetailWrapper>
        )}
        {
          !_isEmpty(storehouse) && (
            <DetailWrapper title="库房信息">
              <DetailInfoGrid list={[
                {
                  label: '经销商名称',
                  value: car.distributorName,
                },
                {
                  label: '库房名称',
                  value: storehouse.name,
                },
                {
                  label: '经销商提供库房地址',
                  value: storehouse.address,
                },
              ]} layout="vertical" />
            </DetailWrapper>
          )
        }
        {
          showExcepModal && (
            <ExceptionModal
              record={curSpottestDetail}
              visible={showExcepModal}
              isSubTask={curSpottest.parentSpotId != 0}
              spottestType={curSpottest.spottesttype}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              {this.state.carShowWarning ? carShowWaringEle : null}
            </ExceptionModal>
          )
        }
        <Modal
          title="查看地图"
          visible={this.state.showMapModal}
          width={1200}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
        >
          <CarAuditMap photoList={sortedPhotoList} />
        </Modal>
        {
          this.state.showDepartImageModal && (
            <DepartImageModal
              id={this.state.isEw ? curSpottestDetail.ewId : curSpottestDetail.distributorId}
              onCancel={() => {
                this.setState({ showDepartImageModal: false });
              }}
              isEw={this.state.isEw}
            />
          )
        }
        {
          this.state.showDistanceModal && (
            <CarDistanceModal
              id={curSpottestDetail.id}
              visible={this.state.showDistanceModal}
              onOk={this.handleOkAndReloadData}
              onCancel={this.handleCancel}
            />
          )
        }
        {
          this.state.showCloseModal && (
            <ModalWithForm
              title="关闭任务"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              onSubmit={this.handleCloseTask}
              configList={[
                {
                  type: 'radio',
                  key: 'unshootType',
                  label: '违规情况',
                  initialValue: 10,
                  optionList: [
                    {
                      label: '不记录违规',
                      value: 10,
                    },
                    {
                      label: '异常超时',
                      value: 11,
                    },
                    {
                      label: '严重超时',
                      value: 12,
                    },
                  ],
                  required: true,
                },
              ]}
            />
          )
        }
        {/* 修改车辆信息中发证日期，排放标准 */}
        {
          this.state.showUpdateCar && (
            <ModalWithForm
              title={`修改${title}`}
              onOk={() => { this.handleCancel(); this.handleSearch() }}
              onCancel={this.handleCancel}
              onSubmit={(value) => {
                const { id } = this.state.car;
                let values = {}
                if (value.certificationDate) {
                  values = { certificationDate: moment(value.certificationDate).format('YYYY-MM-DD') }
                } else {
                  values = value
                }
                return httpCommonClient.post('/CarAction_updateCar', { ...values, id });
              }}
              configList={[
                title == '发证日期' ? {
                  type: 'datePicker',
                  key: 'certificationDate',
                  label: '发证日期',
                  required: true,
                  initialValue: car.certificationDate ? moment(car.certificationDate) : '',
                } : {
                  type: 'input',
                  key: 'emissionStandards',
                  label: '排放标准',
                  required: true,
                  initialValue: car.emissionStandards,
                },
              ]}
            />
          )
        }
        <OperationArea>
          {!readOnly && curSpottestDetail && curSpottestDetail.status === 3 && (
            <Button onClick={this.handleAuditPass} icon="check-circle" type="primary">
              审核通过
            </Button>
          )}
          {!readOnly && curSpottestDetail && [2, 3, 5, 9, 11].includes(curSpottestDetail.status) && (
            <Button
              onClick={() =>
                this.setState({
                  showExcepModal: true,
                })
              }
              icon="warning"
              type="danger"
            >
              标记异常
            </Button>
          )}
          {!readOnly &&
            curSpottestDetail &&
            curSpottestDetail.isWaitRetakePhoto === 1 &&
            (curSpottestDetail.status === 11 || curSpottestDetail.status === 3) && (
              <Button
                onClick={() =>
                  this.setState({
                    showCloseModal: true,
                  })
                }
                icon="close"
                type="danger"
              >
                关闭任务
              </Button>
            )}
          <Button onClick={this.goBack}>返回车辆信息</Button>
        </OperationArea>
      </Spin >
    );
  }
}

const codeTypeSort = [101, 102, 201, 5, 6, 87];
