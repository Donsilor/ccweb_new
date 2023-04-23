import React, { Component } from 'react';
import { Modal, Form, message, Select, Input, Radio, Steps, Button, Icon, Tooltip } from 'antd';
import { httpFormClient } from 'common/axios';
import CarShowView from './CarShowView';
import DistributorView from './DistributorView';
import CarSelectionView from './CarSelectionView';
import OrderTypeView from './OrderTypeView';
import ResultView from './ResultView';
import _isEmpty from 'lodash/isEmpty';

const Step = Steps.Step;
export default class ManuSpotModal extends Component {
  state = {
    step: 0,
    firstStepRecord: {},
    firstStepQuery: {},
    carRecordList: [],
    orderRecord: {},
    carQuery: {},
    ifSuccess: false,
    isLoading: false,
    firstStepPaging: {
      current: 1,
      pageSize: 10,
      total: 10,
    },
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
    const { step, firstStepRecord, carRecordList, orderRecord, ifSuccess, isLoading } = this.state;
    return (
      <div>
        {step !== 0 && (step !== 3 || !ifSuccess) && (
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
          icon={step >= 2 ? 'check' : 'right'}
          type={step >= 2 ? 'primary' : ''}
          loading={step === 2 && isLoading}
          disabled={
            (step === 0 && _isEmpty(firstStepRecord)) ||
            (step === 1 && (!Array.isArray(carRecordList) || carRecordList.length === 0)) ||
            (step === 2 && (!orderRecord.orderType || (orderRecord.orderType === 2 && !orderRecord.bookTime)))
          }
          onClick={() => {
            if (step < 2) {
              this.setState({
                step: Math.min(3, this.state.step + 1),
              });
            } else if (step === 2) {
              this.handleSubmit();
            } else if (step === 3 && ifSuccess) {
              this.props.onOk();
            }
          }}
        >
          {step === 3 ? '完成' : step === 2 ? '提交' : '下一步'}
        </Button>
      </div>
    );
  };

  handleSubmit = () => {
    const { isCarShow, description } = this.props;
    const { firstStepRecord, carRecordList, orderRecord } = this.state;
    try {
      const carStr = JSON.stringify(
        carRecordList.map(item => ({
          ewId: item.locationId,
          carId: item.id,
        }))
      );
      const data = {
        bankId: firstStepRecord.bankId,
        bankName: firstStepRecord.bankName,
        distributorId: firstStepRecord.distributorId,
        distributorName: firstStepRecord.distributorName,
        brandId: firstStepRecord.brandId,
        brandName: firstStepRecord.brandName,
        taskId: isCarShow ? firstStepRecord.id : undefined,
        bookTime: orderRecord.orderType === 2 ? orderRecord.bookTime.format('YYYY-MM-DD HH:mm:ss') : null,
        carList: carStr,
      };
      if (description) {
        data.description = description;
      }
      this.setState({
        isLoading: true,
      });
      return httpFormClient
        .formSubmit(
          isCarShow ? 'SpotTestTaskAction_createCarShowSpotTask' : '/SpotTestTaskAction_createPlatSpotTask',
          '',
          data
        )
        .then(({ data = {} }) => {
          if (data.result == 0) {
            this.setState({
              step: 3,
              ifSuccess: true,
              isLoading: false,
            });
          } else {
            return Promise.reject(data.msg);
          }
        })
        .catch(err => {
          this.setState({
            step: 3,
            ifSuccess: false,
            isLoading: false,
          });
          message.error(err.message || err);
        });
    } catch (error) {
      message.error(error.message);
    }
  };

  handleFirstStepSelectRow = firstStepRecord => {
    this.setState({
      firstStepRecord,
      carRecordList: [],
    });
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

  updateFirstStepQuery = (firstStepQuery, firstStepPaging) => {
    this.setState({
      firstStepQuery,
      firstStepPaging,
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
  submit = formData => {
    const { record: { id } = {} } = this.props;
    const value = {
      ...formData,
      id,
    };
    httpFormClient
      .formSubmit('/SpotTestTaskAction_auditNotPass', '', value)
      .then((payload = {}) => {
        if (payload.data && payload.data.result === 0) {
          message.success('标记成功');
          this.props.onOk();
        } else {
          return Promise.reject((payload.data && payload.data.msg) || '标记失败，请重试');
        }
      })
      .catch(err => {
        message.error(err.message || err);
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
    const { visible, isCarShow, description } = this.props;
    const { step, firstStepRecord, carRecordList, orderRecord, ifSuccess } = this.state;
    return (
      <Modal
        title={isCarShow ? '下发车展手动抽查' : `下发${description ? '税控监管' : '手动'}抽查`}
        visible={visible}
        style={{ top: 20 }}
        onCancel={this.handleCancel}
        footer={this.renderFooter()}
        width={1100}
        height={800}
        destroyOnClose
      >
        <div style={{ marginBottom: '10px', minHeight: '65px' }}>
          <Steps size="small" current={step}>
            {isCarShow ? (
              <Step
                title="选择车展"
                description={!_isEmpty(firstStepRecord) ? `车展名称：${firstStepRecord.showName}` : ''}
              />
            ) : (
              <Step title="选择经销商" description={(firstStepRecord && firstStepRecord.distributorName) || ''} />
            )}
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
          {step === 0 && !isCarShow && (
            <DistributorView
              query={this.state.firstStepQuery}
              paging={this.state.firstStepPaging}
              updateQuery={this.updateFirstStepQuery}
              onSelectRow={this.handleFirstStepSelectRow}
              record={{ ...firstStepRecord, description }}
            />
          )}
          {step === 0 && isCarShow && (
            <CarShowView
              query={this.state.firstStepQuery}
              paging={this.state.firstStepPaging}
              updateQuery={this.updateFirstStepQuery}
              onSelectRow={this.handleFirstStepSelectRow}
              record={firstStepRecord}
            />
          )}
          {step === 1 && firstStepRecord && (
            <CarSelectionView
              query={this.state.carQuery}
              paging={this.state.carPaging}
              updateQuery={this.updateCarQuery}
              onSelectRow={this.handleCarSelectRow}
              record={carRecordList}
              firstStepRecord={firstStepRecord}
              isCarShow={isCarShow}
              description={description}
            />
          )}
          {step === 2 && <OrderTypeView record={orderRecord} onChange={this.handleOrderChange} />}
          {step === 3 && <ResultView ifSuccess={ifSuccess} />}
        </div>
      </Modal>
    );
  }
}
