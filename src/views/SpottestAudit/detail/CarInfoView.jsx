import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Divider, Tooltip, Icon, Modal, Tabs, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import DetailWrapper from 'layouts/DetailWrapper';
import { httpFormClient } from 'common/axios';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
import { FETCH_DETAIL_CARINFO } from 'redux/modules/spottest';
import DetailInfoGrid from 'components/DetailInfoGrid';
import ExcepTypeModal from '../../ExceptionTraceAction/ExcepTypeModal';
import EwAuditTable from 'components/EwAuditTable';
import { stopTaskAdc } from '../../ExceptionTraceAction/modalMapper';
import _isEmpty from 'lodash/isEmpty';
import { formatTime } from 'common/utils';
import DepartInfo from './DepartInfo';
import moment from 'moment';
const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export class CarInfoView extends Component {
  state = {
    modalShowing: false,
    departInfoLoading: true,
    record: {},
    chassis: '',
  };
  componentDidMount() {
    this.handleSearch();
  }
  handleSearch = (page, pageSize) => {
    const {
      params: { id },
    } = this.props.match;
    id &&
      this.props
        .fetch(
          { spottestId: id, chassis: this.state.chassis },
          {
            pageNum: page || this.props.paging.current,
            pageSize: pageSize || this.props.paging.pageSize,
          }
        )
        .then(() => {
          this.setState({
            departInfoLoading: false,
          });
        })
        .catch(() => {
          this.setState({
            departInfoLoading: false,
          });
        });
  };

  handlePageChange = (page, pageSize) => {
    this.handleSearch(page, pageSize);
  };

  handleCancel = () => {
    this.setState({
      modalShowing: false,
    });
  };

  handleModalOk = () => {
    this.setState({
      modalShowing: false,
    });
    this.handleSearch();
  };

  handleStopTask = record => e => {
    this.setState({ modalShowing: true, record });
  };

  renderColumn = () => {
    const { list = [] } = this.props;
    const isMoving = list.some(item => item.spottestType === 5 || item.spottestType === 6);
    const columns = [...(isMoving ? carMovingTableColumn : carTableColumn), operCol];
    const {
      params: { id, menu },
    } = this.props.match;
    columns.push({
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      fixed: 'right',
      render: (text, record) => (
        <div>
          <Link
            to={{
              pathname: `/${menu}/audit/${record.spottestId}/${record.carId}`,
              search: `${this.props.location.search || ''}`,
            }}
          >
            <Tooltip title="查看">
              <Icon type="search" /> 查看
            </Tooltip>
          </Link>
          {[2, 3, 5].includes(record.auditStatus) &&
            menu === 'spottestAudit' &&
            record.isWaitRetakePhoto !== 1 && [
              <Divider type="vertical" key="Divider" />,
              <Tooltip title="终止" key="终止">
                <a href="javascript:;" key="终止" style={{ color: 'red' }} onClick={this.handleStopTask(record)}>
                  <span>
                    <Icon type="poweroff" /> 终止
                  </span>
                </a>
              </Tooltip>,
            ]}
        </div>
      ),
    });
    return columns;
  };

  render() {
    const {
      params: { id, menu },
    } = this.props.match;
    const { list = [], ewInfo = {}, disInfo = {}, paging } = this.props;
    return (
      <div>
        <DetailWrapper title="车辆信息">
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '50px' }}>
              车架号:&nbsp;&nbsp;
              <Input
                size="small"
                style={{ width: '250px' }}
                value={this.state.chassis}
                placeholder="请输入车架号"
                onChange={e => this.setState({ chassis: e.target.value })}
              />
            </div>
            <div>
              <Button size="small" type="primary" onClick={() => this.handleSearch()}>
                查询
              </Button>
              &nbsp;&nbsp;
              <Button size="small" onClick={() => this.setState({ chassis: '' })}>重置</Button>
            </div>
          </div>
          <br />
          <EwAuditTable
            columns={this.renderColumn()}
            data={list}
            paging={paging}
            loading={this.props.loading}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
            rowKey="carId"
          />
        </DetailWrapper>
        {
          !this.state.departInfoLoading && (
            <DepartInfo
              ewInfo={ewInfo}
              disInfo={disInfo}
              reloadData={this.handleSearch}
              spottestId={id}
              readOnly={menu === 'spottestAuditLedger'}
            />
          )
        }
        {
          this.state.modalShowing && (
            <ExcepTypeModal
              title={stopTaskAdc.adcTitle}
              visible={this.state.modalShowing}
              onOk={this.handleModalOk}
              onCancel={this.handleCancel}
              configList={stopTaskAdc.adcConfig}
              onSubmit={stopTaskAdc.endSkill}
              record={this.state.record}
              destroyOnClose
            />
          )
        }
        <OperationArea>
          <BackToList />
        </OperationArea>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  list: state.spottest.carInfo.list,
  loading: state.spottest.loading,
  ewInfo: state.spottest.carInfo.ewInfo,
  disInfo: state.spottest.carInfo.disInfo,
  paging: state.spottest.carInfo.paging,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetch: (data, paging) => dispatch(FETCH_DETAIL_CARINFO(data, paging)),
  calcIfEw: ownProps.calcIfEw,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarInfoView);

const carTableColumn = [
  {
    title: '车架号',
    dataIndex: 'chassis',
  },
  {
    title: '品牌车系',
    dataIndex: 'fldTrim',
  },
  {
    title: '异常原因-二网',
    dataIndex: 'ewExcReasonName',
  },
  {
    title: '异常备注-二网',
    dataIndex: 'ewExcRemark',
  },
  {
    title: '抽查确认类型',
    dataIndex: 'spotConfrimType',
  },
  {
    title: '确认可拍照时间',
    dataIndex: 'confirmTime',
    render: text => {
      return (text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT)) || '-';
    },
  },
  {
    title: '自动下发时间',
    dataIndex: 'bookTime',
    render: text => {
      return (text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT)) || '-';
    },
  },
  {
    title: '预约拍照时间',
    dataIndex: 'modifyTime',
    render: text => {
      return (text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT)) || '-';
    },
  },
  {
    title: '位置',
    dataIndex: 'locationType',
  },
  {
    title: '位置状态',
    dataIndex: 'carStatusName',
  },
  {
    title: '拍照时间',
    dataIndex: 'uploadTime',
    render: text => {
      return (text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT)) || '-';
    },
  },
];

const carMovingTableColumn = [
  {
    title: '车架号',
    dataIndex: 'chassis',
  },
  {
    title: '品牌车系',
    dataIndex: 'fldTrim',
  },
  {
    title: '抽查确认类型',
    dataIndex: 'spotConfrimType',
  },
  {
    title: '车辆移动申请时间',
    dataIndex: 'moveApplyTime',
    render: text => {
      return (text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT)) || '-';
    },
  },
  {
    title: '任务下发时间',
    dataIndex: 'bookTime',
    render: text => {
      return (text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT)) || '-';
    },
  },
  {
    title: '位置状态',
    dataIndex: 'carStatusName',
  },
  {
    title: '拍照时间',
    dataIndex: 'uploadTime',
    render: text => {
      return (text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT)) || '-';
    },
  },
];

const operCol = {
  title: '审核状态',
  dataIndex: 'auditStatusName',
  align: 'center',
  fixed: 'right',
  render: (text, record) => {
    if (record.isWaitRetakePhoto !== 1) {
      return <span>{text}</span>;
    } else {
      return (
        <span style={{ color: 'red' }}>
          {text}
          <Tooltip title="超时待补拍任务">
            <span
              style={{
                fontSize: '8px',
                color: 'red',
                verticalAlign: 'text-top',
                lineHeight: '10px',
                height: '10px',
                outline: 'none',
                padding: '2px',
              }}
            >
              超
            </span>
          </Tooltip>
        </span>
      );
    }
  },
};
