import React, { Component } from 'react';
import { Modal, message, Steps, Button, Icon, Tooltip } from 'antd';
import { httpCommonClient } from 'common/axios';
import CarSelectionView from './CarSelectionView';
import OrderTypeView from './OrderTypeView';
import ResultView from './ResultView';
import _isEmpty from 'lodash/isEmpty';

const Step = Steps.Step;
export default class ManuSpotModal extends Component {
  state = {
    step: 0,
    carRecordList: [],
    orderRecord: {}, // 预约方式
    carQuery: {},
    ifSuccess: false,
    isLoading: false,
    message: '',
    carPaging: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  };

  handleCancel = () => {
    this.resetQuery();
    this.props.onCancel();
  };

  renderFooter = () => {
    const { step, carRecordList, orderRecord, ifSuccess, isLoading } = this.state;
    return (
      <div>
        {step !== 0 && (step !== 2 || !ifSuccess) && (
          <Button
            key="back"
            icon="left"
            onClick={() =>
              this.setState({
                step: Math.max(0, this.state.step - 1),
              })
            }
          >
            上一步
          </Button>
        )}
        <Button
          key="next"
          icon={step >= 1 ? 'check' : 'right'}
          type={step >= 1 ? 'primary' : ''}
          loading={step === 1 && isLoading}
          disabled={
            isLoading ||
            (step === 1 && (!Array.isArray(carRecordList) || carRecordList.length === 0)) ||
            (step === 0 && !orderRecord.bookTime)
          }
          onClick={() => {
            if (step < 1) {
              this.setState({
                step: Math.min(3, this.state.step + 1),
              });
            } else if (step === 1) {
              this.handleSubmit();
            } else if (step === 2) {
              this.props.onOk();
            }
          }}
        >
          {step === 2 ? '完成' : step === 1 ? '生成明细' : '下一步'}
        </Button>
      </div>
    );
  };

  handleSubmit = () => {
    const { carRecordList, orderRecord } = this.state;
    try {
      const disIds = carRecordList.map(item => item.id).join();
      const data = {
        bookTime: orderRecord.bookTime.format('YYYY-MM-DD HH:mm:ss'),
        disIds,
      };
      if (new Date(data.bookTime) < new Date()) {
        message.error('下发时间不能早于当前时间');
        return;
      }
      this.setState({
        isLoading: true,
      });
      return httpCommonClient
        .submit('/UnsupervisedSpotDisAction_generateCarDetail', data)
        .then(({ data = {} }) => {
          if (data.result == 0) {
            this.setState({
              step: 2,
              ifSuccess: true,
              isLoading: false,
              message: data.msg
            });
          } else {
            this.setState({
              step: 2,
              ifSuccess: false,
              isLoading: false,
              message: data.msg
            });
          }
        })
        .catch(err => {
          this.setState({
            step: 2,
            ifSuccess: false,
            isLoading: false,
          });
          message.error(err.message || err);
        });
    } catch (error) {
      message.error(error.message);
    }
  };

  handleCarSelectRow = (selectedKeys, selectedRows) => {
    const { carRecordList } = this.state;
    const newList = [...carRecordList]
      .concat(selectedRows.filter(item => !carRecordList.map(cur => cur.id).includes(item.id)))
      .filter(item => selectedKeys.includes(item.id));
    this.setState({
      carRecordList: newList,
    });
  };

  handleOrderChange = (bookTime) => {
    this.setState({
      orderRecord: {
        ...this.state.orderRecord,
        bookTime,
      },
    });
  };

  updateCarQuery = (carQuery, carPaging) => {
    this.setState({
      carQuery,
      carPaging,
    });
  };

  resetQuery = () => {
    this.setState({
      firstStepQuery: {},
      carQuery: {},
    });
  };
  render() {
    const { step, carRecordList, orderRecord, ifSuccess, message } = this.state;
    return (
      <Modal
        title='生成车辆明细'
        visible
        onCancel={this.handleCancel}
        footer={this.renderFooter()}
        width={1100}
        height={800}
        destroyOnClose
      >
        <div style={{ marginBottom: '10px', minHeight: '65px' }}>
          <Steps size="small" current={step}>
            <Step title="选择下发时间" />
            <Step title="选择经销商" />
            <Step title="完成" />
          </Steps>
        </div>
        <div
          style={{
            padding: '20px 10px',
            border: '1px dashed #e9e9e9',
            borderRadius: '6px',
            backgroundColor: '#fafafa',
            minHeight: '200px',
          }}
        >
          {step === 0 &&
            <OrderTypeView record={orderRecord} onChange={this.handleOrderChange} />
          }
          {step === 1 && <CarSelectionView
            bookTime={orderRecord.bookTime.format('YYYY-MM-DD HH:mm:ss')}
            paging={this.state.carPaging}
            updateQuery={this.updateCarQuery}
            onSelectRow={this.handleCarSelectRow}
            record={carRecordList}
          />}
          {step === 2 && <ResultView ifSuccess={ifSuccess} message={message} />}
        </div>
      </Modal>
    );
  }
}
