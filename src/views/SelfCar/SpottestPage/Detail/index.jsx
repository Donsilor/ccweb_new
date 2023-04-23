import React, { Component } from 'react';
import { Spin, message, Button, Icon, Tooltip, Modal, Divider, Empty, Table } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import BackToList from 'components/BackToList';
import ModalForm from 'components/ModalForm';
import DetailWrapper from 'layouts/DetailWrapper';
import { httpCommonClient } from 'common/axios';
import { formatTime } from 'common/utils';
import OperationArea from 'components/OperationArea';
import DetailInfoGrid from 'components/DetailInfoGrid';
import ModalWithForm from 'components/ModalForm';
import CarAuditMap from './CarAuditMap';
import { ViewWrapper } from 'layouts/ViewWrapper';
import ImageWrapper from './ImageWrapper';
import CarDistanceModal from './CarDistanceModal';
const confirm = Modal.confirm;

export class SelfcarSpottestDetailView extends Component {
  state = {
    loading: true,
    showMapModal: false,
    showLocationModal: false,
    showDistanceModal: false,
    carDetail: {},
    spotDetail: {},
    mediaList: [],
    excepList: [],
    location: {},
    distanceList: [],
    text: [],
  };
  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    this.setState({
      loading: true,
    });
    const url = '/self-car/v1.0/selfSpottestDetail/find/one/items/audit-or-complete';
    const {
      params: { id },
    } = this.props.match;
    return httpCommonClient
      .submit(url, {
        id,
      })
      .then(({ data = {} }) => {
        if (data.code === 200) {
          const { detail = {}, multimedia = [], text = [] } = data.data;
          const { carId = '' } = detail;
          return httpCommonClient.submit(`/self-car/v1.0/cars/detail/${carId}`).then(({ data: carData = {} }) => {
            if (carData.code === 200) {
              const { carDetail = {} } = carData.data;
              const mediaList = reformatList(multimedia);
              const mainPhoto = mediaList.find(item => item.category === '100000');
              let location = {};
              try {
                if (mainPhoto && !_isEmpty(mainPhoto)) {
                  const fileList = [mainPhoto, ...mainPhoto.hisList].filter(item => item.file);
                  if (fileList.length > 0) {
                    location = {
                      ewName: carDetail.locationName,
                      address: fileList[0].file.location,
                      longitude: fileList[0].file.longitude,
                      latitude: fileList[0].file.latitude,
                    };
                  }
                }
              } catch (error) {}

              this.setState({
                spotDetail: detail,
                carDetail,
                mediaList,
                location,
                loading: false,
                text,
              });
            } else {
              return Promise.reject(carData.message || '获取车辆信息失败');
            }
          });
        } else {
          return Promise.reject(data.message || '获取任务明细失败');
        }
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
        message.error('获取任务信息失败');
      });
  };

  handleSearchExcepList = () => {
    const { url } = this.props.match;
    let spottesttype = 20;
    if (url.startsWith('/movingTask')) {
      spottesttype = 50;
    } else if (url.startsWith('/certificateTask')) {
      spottesttype = 30;
    }
    return httpCommonClient
      .submit('/self-car/v1.0/selfExceptionType/find/list/used', { spottesttype })
      .then(({ data }) => {
        if (data.code === 200) {
          const { data: excepList = [] } = data;
          this.setState({
            excepList,
          });
        }
      });
  };

  handleAuditPass = () => {
    const {
      params: { id },
    } = this.props.match;
    const self = this;
    confirm({
      title: '确定要审核通过该抽查任务吗？',
      onOk() {
        return httpCommonClient
          .submit('/self-car/v1.0/selfSpottestDetail/update/pass', { id })
          .then(({ data = {} }) => {
            if (data.code === 200) {
              message.success(data.msg || '操作成功！');
              self.props.history.goBack();
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

  handleExcepOk = () => {
    this.setState({
      showExcepModal: false,
    });
    this.props.history.goBack();
  };

  handleLocationOk = () => {
    this.setState({
      showLocationModal: false,
    });
    this.handleSearch();
  };

  excepSubmit = formValue => {
    const {
      params: { id },
    } = this.props.match;
    return httpCommonClient.submit('/self-car/v1.0/selfSpottestDetail/update/notpass', { ...formValue, id });
  };
  locationSubmit = formValue => {
    const {
      params: { id },
    } = this.props.match;
    const { location = {}, carDetail } = this.state;
    const { address: locationAddress, longitude, latitude } = location;
    return httpCommonClient.submit('/self-car/v1.0/locations/add', {
      ...formValue,
      id,
      locationAddress,
      longitude,
      latitude,
      ewId: carDetail.locationId,
    });
  };

  renderCarInfo = () => {
    const { carDetail } = this.state;
    const list = !_isEmpty(carDetail)
      ? [
          {
            label: '车架号',
            value: carDetail.chassis,
          },

          {
            label: '车辆颜色',
            value: carDetail.color,
          },
          {
            label: '发动机号',
            value: carDetail.engine,
          },
          {
            label: '品牌',
            value: carDetail.brandName,
          },
          {
            label: '车系',
            value: carDetail.trimName,
          },
          {
            label: '车型',
            value: carDetail.modelName,
          },
        ]
      : [];
    return list;
  };
  //距离重测
  handleOkAndReloadData = () => {
    this.setState({
      showDistanceModal: false,
    });
    this.handleSearch();
    this.handleSearchExcepList();
  };
  render() {
    const { mediaList = [], excepList = [], location, spotDetail = {}, text = [] } = this.state;
    const noPhoto = _isEmpty(mediaList.filter(item => !_isEmpty(item.file))) ? true : false;
    const readOnly = spotDetail.status == 20 || spotDetail.status == 30 ? false : true; //是否展示退回重拍
    const { url } = this.props.match;
    return (
      <Spin spinning={this.state.loading}>
        {spotDetail.feedbackName && (
          <DetailWrapper title="异常反馈">
            {
              <div>
                <span style={{ marginRight: '60px' }}>{spotDetail.feedbackName}</span>
                {spotDetail.feedbackReason && <span>原因: {spotDetail.feedbackReason}</span>}
              </div>
            }
          </DetailWrapper>
        )}
        <DetailWrapper title="车辆信息">
          <DetailInfoGrid list={this.renderCarInfo()} layout="vertical" />
        </DetailWrapper>
        <DetailWrapper title="影像资料">
          {spotDetail.status !== 10 && spotDetail.status !== 90 && (
            <div style={{ position: 'absolute', display: 'inline-block', top: '22px', right: '50px' }}>
              {!noPhoto && (
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
              )}

              <Divider type="vertical" />
              {spotDetail.status == 20 && !url.startsWith('/certificateTask') && (
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
              )}
            </div>
          )}
          {!noPhoto ? (
            <ImageWrapper list={mediaList} onSearch={this.handleSearch} readOnly={readOnly} url={url} />
          ) : (
            <Empty description="暂无拍摄数据" />
          )}
        </DetailWrapper>
        {text.length > 0 && (
          <DetailWrapper title="文字标签">
            {text.map((item, index) => (
              <div key={index}>
                <div style={{ fontWeight: 'bold' }}>
                  <span>{index + 1}. </span>
                  {item.name}
                </div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;{item.context}</div>
                <br />
              </div>
            ))}
          </DetailWrapper>
        )}
        {this.state.showMapModal && (
          <Modal
            title="查看地图"
            visible
            width={1300}
            onOk={() => {
              this.setState({ showMapModal: false });
            }}
            onCancel={() => {
              this.setState({ showMapModal: false });
            }}
          >
            <CarAuditMap photoList={mediaList} url={url} />
          </Modal>
        )}
        {this.state.showExcepModal && (
          <ModalForm
            title="标记异常"
            onOk={this.handleExcepOk}
            onCancel={() => {
              this.setState({ showExcepModal: false });
            }}
            onSubmit={this.excepSubmit}
            configList={[
              {
                type: 'select',
                key: 'excReason',
                label: '异常原因',
                required: true,
                optionList: excepList.map(item => ({ name: item.excName, value: item.excCode })),
              },
              {
                label: '异常描述',
                type: 'textArea',
                key: 'excRemark',
              },
            ]}
          />
        )}
        {this.state.showLocationModal && (
          <ModalForm
            title="新增定位点"
            onOk={this.handleLocationOk}
            onCancel={() => {
              this.setState({ showLocationModal: false });
            }}
            onSubmit={this.locationSubmit}
            configList={[
              { type: 'label', label: '所属二网', value: location.ewName },
              {
                label: '定位点名称',
                type: 'input',
                key: 'locationName',
                required: true,
              },
              { type: 'label', label: '定位点地址', value: location.address },
              { type: 'label', label: '经度', value: location.longitude },
              { type: 'label', label: '纬度', value: location.latitude },
            ]}
          />
        )}
        {/* 距离重测 */}
        {this.state.showDistanceModal && (
          <CarDistanceModal
            id={spotDetail.id}
            visible={this.state.showDistanceModal}
            onOk={this.handleOkAndReloadData}
            onCancel={() =>
              this.setState({
                showDistanceModal: false,
              })
            }
          />
        )}
        <OperationArea>
          {spotDetail.status === 20 && (
            <Button onClick={this.handleAuditPass} icon="check-circle" type="primary">
              审核通过
            </Button>
          )}
          {(spotDetail.status === 10 ||
            spotDetail.status === 20 ||
            spotDetail.status === 30 ||
            spotDetail.status === 60) && (
            <Button
              onClick={() => {
                this.handleSearchExcepList();
                this.setState({
                  showExcepModal: true,
                });
              }}
              icon="warning"
              type="danger"
            >
              标记异常
            </Button>
          )}
          {spotDetail.status === 20 && !url.startsWith('/certificateTask') && (
            <Button
              onClick={() =>
                this.setState({
                  showLocationModal: true,
                })
              }
              icon="environment"
              type="danger"
            >
              设为定位点
            </Button>
          )}
          {url.startsWith('/certificateTask') ? (
            <Button
              onClick={() => {
                window.history.go(-1);
              }}
            >
              返回车辆信息
            </Button>
          ) : (
            <BackToList />
          )}
        </OperationArea>
      </Spin>
    );
  }
}

const reformatList = (multimedia = []) => {
  const typeList = [...new Set(multimedia.map(item => item.name))];
  const finalList = [];
  for (let index in typeList) {
    const list = multimedia
      .filter(item => item.name === typeList[index])
      .map(item => ({
        ...item,
        codetypeDesc: item.name,
        useflag: item.useflag === 1 ? 0 : 1,
        locationTypeName: item.locationType === 0 ? '二网' : item.locationType === 1 ? '二库' : item.locationName,
      }));
    finalList.push(groupList(list));
  }
  return finalList;
};

const groupList = list => {
  try {
    if (list.length === 1) {
      return { ...list[0], hisList: [] };
    } else {
      const sortedList = list.sort((a, b) => b.id - a.id);
      const rootPhoto = sortedList[0];
      rootPhoto.hisList = sortedList.slice(1);
      return rootPhoto;
    }
  } catch (error) {
    return {};
  }
};

export default SelfcarSpottestDetailView;
