import React, { Component } from 'react';
import { Spin, message, Button, Icon, Tooltip, Modal, Divider, Empty, Table } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import { matchPath, Link } from 'react-router';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
import DetailWrapper from 'layouts/DetailWrapper';
import { httpCommonClient } from 'common/axios';
import DetailInfoGrid from 'components/DetailInfoGrid';
const confirm = Modal.confirm;

export class SelfcarSpottestDetailView extends Component {
  state = {
    loading: true,
    list: [],
    managerDetail: {},
  };
  componentDidMount() {
    this.handleSearch();
    this.handleSearchExcepList();
  }

  handleSearch = () => {
    this.setState({
      loading: true,
    });
    const url = '/self-car/v1.0/selfSpottestDetail/find/one/all';
    const {
      params: { id },
    } = this.props.match;
    return httpCommonClient
      .submit(url, {
        spottestId: id,
      })
      .then(({ data = {} }) => {
        this.setState({ list: data.data, loading: false });
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
        message.error('获取任务信息失败');
      });
  };

  handleSearchExcepList = () => {
    const {
      params: { id },
    } = this.props.match;
    return httpCommonClient.submit('/self-car/v1.0/selfSpottest/find/one/area-manager', { id: id }).then(({ data }) => {
      if (data.code === 200) {
        this.setState({
          managerDetail: data.data,
          loading: false,
        });
      }
    });
  };
  renderCarInfo = () => {
    const { managerDetail } = this.state;
    const list = !_isEmpty(managerDetail)
      ? [
          {
            label: '小区名称',
            value: managerDetail.subAreaName,
          },

          {
            label: '区域经理',
            value: managerDetail.managerName,
          },
          {
            label: '联系电话',
            value: managerDetail.managerTel,
          },
        ]
      : [];
    return list;
  };
  jumpToDetail = id => {
    if (!id) {
      return;
    }
    const { match } = this.props;
    const matchResult = matchPath(match.path, {
      path: '/:menu/:tab',
    });
    const { params: { menu, tab } = {} } = matchResult;

    const link = {
      pathname: `/${menu}/detail/${id}`,
      search: `?tab=${tab}`,
    };
    this.props.history.push(link);
  };
  stopTask = record => {
    const self = this;
    if (_isEmpty(record)) {
      return;
    }
    confirm({
      title: '您真的要终止该任务吗？',
      onOk() {
        httpCommonClient
          .post(`/self-car/v1.0/selfSpottestDetail/update/stop`, { id: record.id, terminationRemark: 'TBC' })
          .then(({ data = {} }) => {
            if (data.code === 200) {
              message.success('终止任务成功');
              self.handleSearch();
            } else {
              return Promise.reject(data.message || '终止任务失败');
            }
          })
          .catch(err => {
            message.error(err.message || err);
          });
      },
    });
  };
  render() {
    const columns = [
      {
        title: '二网名称',
        dataIndex: 'ewName',
      },
      {
        title: '车架号',
        dataIndex: 'car.chassis',
      },
      {
        title: '车辆类型',
        dataIndex: 'car.carTypeName',
      },
      {
        title: '品牌',
        dataIndex: 'car.brandName',
      },
      {
        title: '任务下发时间',
        dataIndex: 'spottest.bookTime',
      },
      {
        title: '拍照时间',
        dataIndex: 'submitTime',
      },
      {
        title: '审核状态',
        dataIndex: 'statusName',
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <div>
              <Tooltip title="审核" key="审核">
                <a href="javascript:;" onClick={() => this.jumpToDetail(record.id)}>
                  <Icon type="search" />
                </a>
              </Tooltip>
              {(record.status == 10 || record.status == 20 || record.status == 30) && (
                <Divider type="vertical" key="Divider" />
              )}
              {(record.status == 10 || record.status == 20 || record.status == 30) && (
                <Tooltip title="终止" key="终止">
                  <a href="javascript:;" onClick={() => this.stopTask(record)}>
                    <Icon type="poweroff" style={{ color: 'red' }} />
                  </a>
                </Tooltip>
              )}
            </div>
          );
        },
      },
    ];
    return (
      <Spin spinning={this.state.loading}>
        <DetailWrapper title="车辆信息">
          <Table dataSource={this.state.list} columns={columns} rowKey="id" />
        </DetailWrapper>
        <DetailWrapper title="区域信息">
          <DetailInfoGrid list={this.renderCarInfo()} layout="vertical" />
        </DetailWrapper>
        <OperationArea>
          <BackToList />
        </OperationArea>
      </Spin>
    );
  }
}

export default SelfcarSpottestDetailView;
