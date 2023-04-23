import React, { Component } from 'react';
import { Modal, Form, message, Select, Input, Radio, Steps, Button, Icon, Tooltip } from 'antd';
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
    carPaging: {
      current: 1,
      pageSize: 10,
      total: 10,
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
          loading={step === 2 && isLoading}
          disabled={
            isLoading ||
            (step === 0 && (!Array.isArray(carRecordList) || carRecordList.length === 0)) ||
            (step === 1 && (!orderRecord.orderType || (orderRecord.orderType === 2 && !orderRecord.bookTime)))
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
          {step === 2 ? '完成' : step === 2 ? '提交' : '下一步'}
        </Button>
      </div>
    );
  };

  handleSubmit = () => {
    const { isCertificateSpot, description } = this.props;
    const { carRecordList, orderRecord } = this.state;
    try {
      const carIds = carRecordList.map(item => item.id).join();
      const data = {
        // taskId: isCertificateSpot ? firstStepRecord.id : undefined,
        bookTime: orderRecord.orderType === 2 ? orderRecord.bookTime.format('YYYY-MM-DD HH:mm:ss') : undefined,
        carIds,
        spottesttype: isCertificateSpot ? 30 : 20,
      };
      if (description) {
        data.description = description;
      }
      if (new Date(data.bookTime) < new Date()) {
        message.error('下发时间不能早于当前时间');
        return;
      }
      this.setState({
        isLoading: true,
      });
      return httpCommonClient
        .submit(isCertificateSpot ? '/self-car/v1.0/selfSpottest/add' : '/self-car/v1.0/selfSpottest/add', data)
        .then(({ data = {} }) => {
          if (data.code == 200) {
            this.setState({
              step: 2,
              ifSuccess: true,
              isLoading: false,
            });
          } else {
            return Promise.reject(data.message || '下发抽查失败');
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

  handleOrderChange = (orderType, bookTime) => {
    this.setState({
      orderRecord: {
        ...this.state.orderRecord,
        orderType,
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

  renderCarDesc = () => {
    const { carRecordList } = this.state;
    if (carRecordList.length === 0) {
      return null;
    } else if (carRecordList.length === 1) {
      return carRecordList[0].chassis;
    } else {
      const text = (
        <span>
          车架号列表：
          <br />
          {carRecordList.map(car => (
            <span key={car.id}>
              {car.chassis} <br />
            </span>
          ))}
        </span>
      );
      return (
        <Tooltip title={text} placement="right">
          {`已选择${carRecordList.length}辆车 `}
          <Icon type="info-circle" />
        </Tooltip>
      );
    }
  };

  render() {
    const { isCertificateSpot, description } = this.props;
    const { step, carRecordList, orderRecord, ifSuccess } = this.state;
    return (
      <Modal
        title={isCertificateSpot ? description ? '新建免监管任务' : '新建盘证抽查任务' : '新建自有车抽查任务'}
        visible
        onCancel={this.handleCancel}
        footer={this.renderFooter()}
        width={1100}
        height={800}
        destroyOnClose
      >
        <div style={{ marginBottom: '10px', minHeight: '65px' }}>
          <Steps size="small" current={step}>
            <Step title="选择车辆" description={this.renderCarDesc()} />
            <Step title="选择预约方式" />
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
          {step === 0 && (
            <CarSelectionView
              query={this.state.carQuery}
              paging={this.state.carPaging}
              updateQuery={this.updateCarQuery}
              onSelectRow={this.handleCarSelectRow}
              record={carRecordList}
              isCertificateSpot={isCertificateSpot}
            />
          )}
          {step === 1 && <OrderTypeView record={orderRecord} onChange={this.handleOrderChange} />}
          {step === 2 && <ResultView ifSuccess={ifSuccess} />}
        </div>
      </Modal>
    );
  }
}
