import React, { Component } from 'react';
import BasicInfo from './BasicInfo';
import ListGrid from './ListGrid';
import OperationArea from 'components/OperationArea';
import BackToList from 'components/BackToList';
import ModalWithForm from 'components/ModalForm';
import { Button, Spin } from 'antd';
import TrackRecordModal from './TrackRecordModal';
import { httpFormClient } from 'common/axios';
import { formatTime } from 'common/utils';
import moment from 'moment';

export const TrContext = React.createContext({});

export default class TrackRecordView extends Component {
  state = {
    traceInfo: {},
    traceList: [],
    loading: true,
    showTrModal: false,
    showOrderModal: false,
  };
  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    this.props.fetch().then(({ traceInfo = {}, traceList = [] } = {}) => {
      this.setState({ traceInfo, traceList, loading: false });
    });
  };

  handleOrderSubmit = value => {
    const { bookTime, bookReason } = value;
    const { id } = this.props;
    return httpFormClient.formSubmit('/SpotTestTaskAction_modifyBookTime', '', {
      bookTime: formatTime(bookTime),
      bookReason,
      spottestId: id,
    });
  };

  handleHideModal = ifRefresh => {
    this.setState({
      showTrModal: false,
      showOrderModal: false,
    });
    ifRefresh && this.handleSearch();
  };

  render() {
    const { isEw, id, readOnly } = this.props;
    const { traceInfo, traceList, showTrModal, showOrderModal, loading } = this.state;
    return (
      <TrContext.Provider value={{ traceInfo, traceList }}>
        <Spin spinning={loading}>
          <BasicInfo data={traceInfo} isEw={isEw} readOnly={readOnly} reloadData={this.handleSearch} />
          <ListGrid isEw={isEw} data={traceList} onSearch={this.handleSearch} id={id} readOnly={readOnly} />
          {showTrModal && (
            <TrackRecordModal
              visible={showTrModal}
              hideModal={this.handleHideModal}
              isEw={isEw}
              id={id}
              departId={isEw ? traceInfo.ewId : traceInfo.distributorId}
            />
          )}
          {showOrderModal && (
            <ModalWithForm
              title="预约抽查时间"
              onOk={() => this.handleHideModal(true)}
              onCancel={() => this.handleHideModal()}
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
          <OperationArea>
            {isEw && !readOnly && traceInfo.status !== 9 && (
              <Button
                onClick={() => {
                  this.setState({
                    showOrderModal: true,
                  });
                }}
                type="primary"
                icon="clock-circle"
              >
                预约抽查时间
              </Button>
            )}
            {!readOnly && traceInfo.status !== 9 && (
              <Button
                onClick={() => {
                  this.setState({
                    showTrModal: true,
                  });
                }}
                type="primary"
                icon="plus"
              >
                新增跟踪记录
              </Button>
            )}
            <BackToList />
          </OperationArea>
        </Spin>
      </TrContext.Provider>
    );
  }
}
