import React, { Component } from 'react';
import OperationArea from 'components/OperationArea';
import { httpCommonClient } from 'common/axios';
import BackToList from 'components/BackToList';
import DetailWrapper from 'layouts/DetailWrapper';
import DetailInfoGrid from 'components/DetailInfoGrid';
import { Table, message, Button } from 'antd';
import { detailTrackColumns } from './Columns';

export default class CarDetail extends Component {
  state = {
    loading: true,
    carDetail: {},
    trackList: [],
  };

  componentDidMount() {
    this.handleSearch();
  }
  handleSearch = () => {
    this.setState({
      loading: true,
    });
    const { id } = this.props.match.params;
    httpCommonClient
      .submit(`/self-car/v1.0/cars/detail/${id}`)
      .then(({ data = {} }) => {
        if (data.code === 200) {
          const { carDetail = {}, trackList = [] } = data.data;
          this.setState({
            loading: false,
            carDetail,
            trackList,
          });
        } else {
          throw new Error(data.message);
        }
      })
      .catch(err => {
        message.error(err.message || err || '获取车辆信息失败');
        this.setState({
          loading: false,
          carDetail: {},
          trackList: [],
        });
      });
  };

  renderCarInfo = () => {
    const { carDetail } = this.state;
    const list = carDetail
      ? [
        {
          label: '车架号',
          value: carDetail.chassis,
        },
        {
          label: '车辆价格  (万元)',
          value: carDetail.carprice,
        },
        {
          label: '车辆类型',
          value: carDetail.carTypeName,
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
        {
          label: '钥匙数',
          value: carDetail.carkeys,
        },
        {
          label: '车身颜色',
          value: carDetail.color,
        },
        {
          label: '发动机号',
          value: carDetail.engine,
        },
        {
          label: '车辆状态',
          value: carDetail.additionStatusName,
        },
        {
          label: '金融产品',
          value: carDetail.financialProductsName,
        },
        {
          label: '合作金融机构',
          value: carDetail.bankName,
        },
        {
          label: '所在位置',
          value: carDetail.locationName,
          block: true,
        },
        {
          label: '详细地址',
          value: carDetail.businessAddress,
          block: true,
        },
        {
          label: '证件位置',
          value: carDetail.certificateLocationTypeName,
          block: true,
        },
      ]
      : [];
    return list;
  };
  render() {
    return (
      <div>
        <DetailWrapper title="车辆信息">
          <DetailInfoGrid list={this.renderCarInfo()} />
        </DetailWrapper>
        <DetailWrapper title="车辆轨迹">
          <Table
            columns={detailTrackColumns}
            dataSource={this.state.trackList}
            pagination={false}
            //loading={this.props.loading && factoryKey === this.state.factory.id}
            //onExpand={this.handleSubExpand(factoryKey)}
            //rowClassName={region => (region.provinceNum === 0 || region.cityNum === 0 ? 'noExpand' : '')}
            rowKey={'id'}
          />
        </DetailWrapper>
        <OperationArea>
          {!this.props.location.query ? (
            <BackToList />
          ) : (
            <Button
              onClick={() => {
                this.props.history.push(this.props.location.query.url);
              }}
            >
              返回列表
            </Button>
          )}
        </OperationArea>
      </div>
    );
  }
}
