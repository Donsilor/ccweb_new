import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Divider, Tooltip, Icon, message, Tabs, Descriptions, Modal } from 'antd';
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
import ModalTable from 'components/ModalTable';
import ModalWithForm from 'components/ModalForm';
import AnsweredTimeModal from './TrackRecord/AnsweredTimeModal';
import TrackRecordModal from './TrackRecord/TrackRecordModal';
import ExtCallWrapper from 'components/ExtCallWrapper';
import moment from 'moment';

const { TabPane } = Tabs;
export default class DepartInfo extends Component {
  state = {
    showNewRemarkModal: false,
    showHisModal: false,
    showModifyTimeModal: false,
    showNewTraceModal: false,
    showOrderTimeModal: false,
    ewTraceInfo: {},
    ewTraceList: [],
    disTraceInfo: {},
    disTraceList: [],
    isEw: false,
    hasEw: !_isEmpty(this.props.ewInfo),
    loading: false,
  };
  componentDidMount() {
    this.handleDisTrackInfo();
    this.state.hasEw && this.onTabChange('ew');
  }
  handleHisRemarkSearch = () => {
    const { ewInfo = {}, disInfo = {} } = this.props;
    const { isEw } = this.state;
    return httpFormClient
      .formSubmit('/SpotTestTaskAction_getRemarkList', '', isEw ? { ewId: ewInfo.id } : { distributorId: disInfo.id })
      .then(({ data = {} }) => {
        if (data.result === 0) {
          return data.list;
        } else {
          return Promise.reject(data.msg);
        }
      })
      .catch(err => {
        message.error(err.message || err);
      });
  };
  handleSubmitRemark = value => {
    const { ewInfo = {}, disInfo = {} } = this.props;
    const { isEw } = this.state;
    return httpFormClient.formSubmit(
      isEw ? '/SpotTestTaskAction_addEwRemark' : '/SpotTestTaskAction_addDisRemark',
      '',
      isEw
        ? { ewId: ewInfo.id, ewName: ewInfo.ewName, ...value }
        : { distributorId: disInfo.id, distributorName: disInfo.distributorName, ...value }
    );
  };
  handleEwTrackInfo = () => {
    const { spottestId } = this.props;
    return httpFormClient
      .formSubmit('/SpotTestTaskAction_getEwTraceInfo', '', { id: spottestId })
      .then(({ data }) => {
        if (data.result === 0) {
          this.setState({
            ewTraceInfo: data.ewTraceInfo,
            ewTraceList: data.ewTraceList,
          });
        } else {
          return Promise.reject(data.reject(data.msg));
        }
      })
      .catch(err => {
        message.error(err.message || err);
      });
  };
  handleDisTrackInfo = () => {
    const { spottestId } = this.props;
    return httpFormClient
      .formSubmit('/SpotTestTaskAction_getDisTraceInfo', '', { id: spottestId })
      .then(({ data }) => {
        if (data.result === 0) {
          this.setState({
            disTraceInfo: data.disTraceInfo,
            disTraceList: data.disTraceList,
          });
        } else {
          return Promise.reject(data.reject(data.msg));
        }
      })
      .catch(err => {
        message.error(err.message || err);
      });
  };
  handleOrderSubmit = value => {
    const { bookTime, bookReason } = value;
    const { spottestId } = this.props;
    return httpFormClient.formSubmit('/SpotTestTaskAction_modifyBookTime', '', {
      bookTime: formatTime(bookTime),
      bookReason,
      spottestId,
    });
  };

  handleNewRemarkOk = () => {
    this.setState(
      {
        showNewRemarkModal: false,
        showHisModal: false,
      },
      this.props.reloadData
    );
  };
  handleHideModifyTimeModal = ifRefresh => {
    this.setState(
      {
        showModifyTimeModal: false,
      },
      () => {
        if (ifRefresh && this.state.isEw) {
          this.props.reloadData();
          this.handleEwTrackInfo();
        } else if (ifRefresh && !this.state.isEw) {
          this.handleDisTrackInfo();
        }
      }
    );
  };
  handleNewTraceOk = ifRefresh => {
    this.setState(
      {
        showNewTraceModal: false,
      },
      () => {
        if (ifRefresh && !this.state.isEw) {
          this.handleDisTrackInfo();
        } else if (ifRefresh && this.state.isEw) {
          this.handleEwTrackInfo();
        }
      }
    );
  };
  handleHideOrderTimeModal = ifRefresh => {
    this.setState({
      showOrderTimeModal: false,
    });
    ifRefresh && this.props.reloadData();
  };
  onTabChange = key => {
    this.setState({ isEw: key === 'ew' });
    if (key === 'ew' && _isEmpty(this.state.ewTraceInfo)) {
      this.handleEwTrackInfo();
    }
  };
  remarkOperator = () => [
    <Tooltip title="新增备注" key={1}>
      <a
        href="javascript:;"
        key="新增备注"
        style={{ color: 'rgba(0, 0, 0, 0.65)', fontSize: '12px' }}
        onClick={() =>
          this.setState({
            showNewRemarkModal: true,
          })
        }
      >
        <Icon type="plus" /> 新增备注
      </a>
    </Tooltip>,
    <Divider type="vertical" key={2} />,
    <Tooltip title="历史备注" key={3}>
      <a
        href="javascript:;"
        key="历史备注"
        style={{ color: 'rgba(0, 0, 0, 0.65)', fontSize: '12px' }}
        onClick={() =>
          this.setState({
            showHisModal: true,
          })
        }
      >
        <Icon type="clock-circle" /> 历史备注
      </a>
    </Tooltip>,
  ];
  renderEwInfo = () => {
    const { ewInfo, readOnly } = this.props;
    const list = ewInfo
      ? [
          {
            label: '二网名称',
            value: ewInfo.ewName,
          },
          {
            label: '二网联系人',
            value: ewInfo.ewOperatorName,
          },
          {
            label: '联系电话',
            value: ewInfo.ewOperatorTel,
            isPhone: true,
          },
          {
            label: readOnly ? (
              '二网备注'
            ) : (
              <div>
                <span style={{ marginRight: '100px' }}>二网备注</span>
                {this.remarkOperator()}
              </div>
            ),
            value: ewInfo.remark,
          },
        ]
      : [];
    return list;
  };
  renderDisInfo = () => {
    const { disInfo, readOnly } = this.props;
    const list = disInfo
      ? [
          {
            label: '经销商名称',
            value: disInfo.distributorName,
          },
          {
            label: '经销商联系人',
            value: disInfo.operatorName,
          },
          {
            label: '联系电话',
            value: disInfo.operatorPhone,
            isPhone: true,
          },
          {
            label: readOnly ? (
              '经销商备注'
            ) : (
              <div>
                <span style={{ marginRight: '100px' }}>经销商备注</span>
                {this.remarkOperator()}
              </div>
            ),
            value: disInfo.remark,
          },
        ]
      : [];
    return list;
  };
  render() {
    const { ewInfo = {}, disInfo = {}, readOnly, spottestId } = this.props;
    const { isEw, disTraceList, disTraceInfo = {}, ewTraceList, ewTraceInfo = {} } = this.state;
    const traceInfo = isEw ? ewTraceInfo : disTraceInfo;
    const { answeredTime, notAnsweredTime } = calcAnsweredTime(traceInfo, isEw);
    return (
      <DetailWrapper style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: '35px', right: '50px', zIndex: 10 }}>
          <span>打通次数：{answeredTime}</span>
          <Divider type="vertical" />
          <span>未打通次数：{notAnsweredTime}</span>
          <Divider type="vertical" />
          {!readOnly && traceInfo.status !== 9 && (
            <Tooltip title="次数修改">
              <a
                href="javascript:;"
                style={{ color: 'rgba(0, 0, 0, 0.65)' }}
                onClick={() => {
                  this.setState({
                    showModifyTimeModal: true,
                  });
                }}
              >
                <Icon type="edit" /> 次数修改
              </a>
            </Tooltip>
          )}
          {!readOnly && traceInfo.status !== 9 && <Divider type="vertical" />}
          {!readOnly && traceInfo.status !== 9 && (
            <Tooltip title="新增跟踪记录">
              <a
                href="javascript:;"
                style={{ color: 'rgba(0, 0, 0, 0.65)' }}
                onClick={() => {
                  this.setState({
                    showNewTraceModal: true,
                  });
                }}
              >
                <Icon type="plus" /> 新增跟踪记录
              </a>
            </Tooltip>
          )}
          {!readOnly && traceInfo.status !== 9 && isEw && <Divider type="vertical" />}
          {!readOnly && traceInfo.status !== 9 && isEw && (
            <Tooltip title="预约抽查时间">
              <a
                href="javascript:;"
                style={{ color: 'rgba(0, 0, 0, 0.65)' }}
                onClick={() => {
                  this.setState({
                    showOrderTimeModal: true,
                  });
                }}
              >
                <Icon type="clock-circle" /> 预约抽查时间
              </a>
            </Tooltip>
          )}
        </div>
        <Tabs onChange={this.onTabChange}>
          {!_isEmpty(ewInfo) && (
            <TabPane tab="二网" key="ew">
              <DetailWrapper>
                <Descriptions title="二网信息" layout="vertical" bordered>
                  {this.renderEwInfo().map((item, index) => (
                    <Descriptions.Item label={item.label} key={index}>
                      {item.isPhone ? <ExtCallWrapper data={item.value} /> : item.value}
                    </Descriptions.Item>
                  ))}
                </Descriptions>
                <Descriptions title="二网跟踪记录" layout="vertical" style={{ marginTop: '30px' }} />
                <Table columns={ewTrColumns} dataSource={ewTraceList} pagination={false} rowKey="id" bordered />
              </DetailWrapper>
            </TabPane>
          )}
          <TabPane tab="经销商" key="dis">
            <DetailWrapper>
              <Descriptions title="经销商信息" layout="vertical" bordered>
                {this.renderDisInfo().map((item, index) => (
                  <Descriptions.Item label={item.label} key={index}>
                    {item.isPhone ? <ExtCallWrapper data={item.value} /> : item.value}
                  </Descriptions.Item>
                ))}
              </Descriptions>
              <Descriptions title="经销商跟踪记录" layout="vertical" style={{ marginTop: '30px' }} />
              <Table columns={disTrColumns} dataSource={disTraceList} pagination={false} rowKey="id" bordered />
            </DetailWrapper>
          </TabPane>
        </Tabs>
        {this.state.showHisModal && (
          <ModalTable
            title="历史备注"
            onCancel={() => this.setState({ showHisModal: false })}
            onOk={() => this.setState({ showHisModal: false })}
            onSearch={this.handleHisRemarkSearch}
            columns={isEw ? ewColumns : disColumns}
            width={800}
          />
        )}
        {this.state.showNewRemarkModal && (
          <ModalWithForm
            title="新增备注"
            onCancel={() => this.setState({ showNewRemarkModal: false })}
            onOk={this.handleNewRemarkOk}
            onSearch={this.onSearch}
            onSubmit={this.handleSubmitRemark}
            configList={[
              {
                type: 'label',
                label: isEw ? '二网名称' : '经销商名称',
                key: isEw ? 'ewName' : 'distributorName',
              },
              {
                type: 'textArea',
                label: '备注',
                key: 'remark',
                required: true,
              },
            ]}
            width={600}
            record={isEw ? ewInfo : disInfo}
          />
        )}
        {this.state.showNewTraceModal && (
          <TrackRecordModal
            visible
            hideModal={this.handleNewTraceOk}
            isEw={isEw}
            id={spottestId}
            departId={isEw ? traceInfo.ewId : traceInfo.distributorId}
          />
        )}
        {this.state.showModifyTimeModal && (
          <AnsweredTimeModal
            {...{ answeredTime, notAnsweredTime }}
            hideModal={this.handleHideModifyTimeModal}
            isEw={isEw}
            spottestId={spottestId}
          />
        )}
        {this.state.showOrderTimeModal && (
          <ModalWithForm
            title="预约抽查时间"
            onOk={() => this.handleHideOrderTimeModal(true)}
            onCancel={() => this.handleHideOrderTimeModal()}
            onSubmit={this.handleOrderSubmit}
            configList={[
              {
                label: '预约时间',
                key: 'bookTime',
                type: 'datePicker',
                required: true,
                showTime: true,
                initialValue: moment()
                  .add(1, 'h')
                  .minute(0)
                  .second(0),
                rules: [
                  { required: true, message: '请选择预约时间' },
                  {
                    validator: (rule, value, callback) => {
                      if (value && value < moment()) {
                        callback('不能预约过去的时间!');
                      }
                      callback();
                    },
                  },
                ],
                disabledDate: current =>
                  current &&
                  current <
                    moment()
                      .subtract(1, 'day')
                      .endOf('day'),
              },
              {
                label: '预约原因',
                key: 'bookReason',
                type: 'textArea',
                required: true,
              },
            ]}
          />
        )}
      </DetailWrapper>
    );
  }
}

const ewColumns = [
  {
    title: '时间',
    dataIndex: 'opTime',
    width: 120,
    render: text => text && text.time && moment.unix(text.time / 1000).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '操作人',
    width: 120,
    dataIndex: 'opUserName',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

const disColumns = [
  {
    title: '时间',
    dataIndex: 'opTime',
    width: 120,
    render: text => text && text.time && moment.unix(text.time / 1000).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '操作人',
    width: 120,
    dataIndex: 'opUserName',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const calcAnsweredTime = (value, isEw) => {
  const answeredTime = isEw ? value.ewGetcalltimes : value.distGetcalltimes;
  const notAnsweredTime = isEw ? value.ewNogetcalltimes : value.distNogetcalltimes;
  return { answeredTime, notAnsweredTime };
};

export const ewTrColumns = [
  {
    title: '是否打通',
    dataIndex: 'ewGetCallName',
  },
  {
    title: '反馈类型',
    dataIndex: 'ewReplyName',
  },
  {
    title: '反馈内容',
    dataIndex: 'ewReplyContentName',
  },
  {
    title: '具体原因',
    dataIndex: 'ewReplyReasonName',
  },
  {
    title: '拨打时间',
    dataIndex: 'ewCallTime',
    render: text => {
      return text && text.time && moment.unix(text.time / 1000).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
    render: text => (
      <span style={remarkStyle} title={text}>
        {text}
      </span>
    ),
  },
];
export const disTrColumns = [
  {
    title: '是否打通',
    dataIndex: 'distGetCallName',
  },
  {
    title: '反馈类型',
    dataIndex: 'distReplyName',
  },
  {
    title: '反馈内容',
    dataIndex: 'distReplyContentName',
  },
  {
    title: '具体原因',
    dataIndex: 'distReplyReasonName',
  },
  {
    title: '拨打时间',
    dataIndex: 'distCallTime',
    render: text => {
      return text && text.time && moment.unix(text.time / 1000).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 500,
    render: text => (
      <span style={remarkStyle} title={text}>
        {text}
      </span>
    ),
  },
];

const remarkStyle = { display: 'inline-block', maxWidth: 500, textOverflow: 'ellipsis', overflow: 'hidden' };
