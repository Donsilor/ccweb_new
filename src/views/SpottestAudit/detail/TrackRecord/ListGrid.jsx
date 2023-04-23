import React, { Component } from 'react';
import { Icon, Tooltip, Modal, Table, message, Divider } from 'antd';
import { httpFormClient } from 'common/axios';
import { formatTime } from 'common/utils';
import AnsweredTimeForm from './AnsweredTimeForm';
import DetailWrapper from 'layouts/DetailWrapper';
import { TrContext } from './TrackRecordView';

export default class ListGrid extends Component {
  state = {
    showModal: false,
    loading: false,
  };
  onSubmit = formValue => {
    this.setState({
      loading: true,
    });
    const { isEw, id } = this.props;
    let value = { id };
    if (isEw) {
      value = { ...value, ewGetcalltimes: formValue.answeredTime, ewNogetcalltimes: formValue.notAnsweredTime };
    } else {
      value = { ...value, distGetcalltimes: formValue.answeredTime, distNogetcalltimes: formValue.notAnsweredTime };
    }
    return httpFormClient
      .formSubmit(isEw ? 'SpotTestTaskAction_modifyEwCallTimes' : 'SpotTestTaskAction_modifyDisCallTimes', '', value)
      .then(({ data = {} } = {}) => {
        if (data.result === 0) {
          message.success('更新次数成功');
          this.handleHideModal(true);
        } else {
          return Promise.reject(data.msg);
        }
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
        message.error(err.message || err);
      });
  };

  handleHideModal = ifRefresh => {
    this.setState({
      showModal: false,
      loading: false,
    });
    ifRefresh && this.props.onSearch();
  };

  handleSubmit = () => {
    this.form && this.form.handleSubmit();
  };
  render() {
    const { isEw, readOnly } = this.props;
    return (
      <DetailWrapper title={isEw ? '二网跟踪记录' : '经销商跟踪记录'}>
        <TrContext.Consumer>
          {({ traceInfo }) => {
            const { answeredTime, notAnsweredTime } = calcAnsweredTime(traceInfo, isEw);
            return (
              <div style={{ position: 'absolute', top: '20px', right: '50px' }}>
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
                          showModal: true,
                        });
                      }}
                    >
                      <Icon type="edit" /> 次数修改
                    </a>
                  </Tooltip>
                )}
                <Modal
                  title="次数修改"
                  visible={this.state.showModal}
                  onOk={this.handleSubmit}
                  onCancel={() => this.handleHideModal(false)}
                  confirmLoading={this.state.loading}
                  destroyOnClose
                >
                  <AnsweredTimeForm
                    {...{ answeredTime, notAnsweredTime }}
                    onSubmit={this.onSubmit}
                    wrappedComponentRef={form => (this.form = form)}
                  />
                </Modal>
              </div>
            );
          }}
        </TrContext.Consumer>
        <TrContext.Consumer>
          {({ traceList }) => (
            <Table columns={isEw ? ewTrColumns : disTrColumns} dataSource={traceList} pagination={false} rowKey="id" />
          )}
        </TrContext.Consumer>
      </DetailWrapper>
    );
  }
}

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
    render: text => formatTime(text),
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
    render: text => formatTime(text),
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
