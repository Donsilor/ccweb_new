import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Select, Icon, Row, Col, Cascader, Table, Input, message } from 'antd';
import chunk from 'lodash/chunk';
import styles from 'components/CCForm/style.module.less';
import * as FormItems from 'components/CCForm/formItem';
import * as ColItems from 'components/EwAuditTableColumn/columnItem';
import EwAuditTable from 'components/EwAuditTable';
import SimForm from 'components/SimForm';
import { httpFormClient } from 'common/axios';
import { carStatusList } from 'common/constant';
import listStyles from '../style.module.less';

export default class CarSelectionView extends PureComponent {
  state = {
    loading: true,
    list: [],
    blackList: [],
    selectedRowKeys: Array.isArray(this.props.record) ? this.props.record.map(item => item.id) : [],
  };
  componentDidMount() {
    this.handleSearch(this.props.query);
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query, page, pageSize);
  };
  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys });
    this.props.onSelectRow(selectedRowKeys, selectedRows);
  };

  handleSearch = (formValue, page, pageSize) => {
    const {
      firstStepRecord: { bankId, distributorId, brandId: fldSerialid, id },
      isCarShow,
      description,
    } = this.props;
    const values = { ...formValue, ...(!isCarShow ? { bankId, distributorId, fldSerialid } : { showId: id }) };
    if (['接证任务', '盘证任务'].includes(description)) {
      values.unsupervisedFlag = 1;
    }
    this.setState({ loading: true });
    httpFormClient
      .formSubmit(
        isCarShow ? '/SpotTestTaskAction_getSpotCarsInCarShow' : '/SpotTestTaskAction_getSpotCarsInDistributor',
        '',
        values,
        {
          pageNum: page || this.props.paging.current,
          pageSize: pageSize || this.props.paging.pageSize,
        }
      )
      .then(({ data }) => {
        if (data.result == 0) {
          this.setState({
            list: data.list || [],
            loading: Array.isArray(data.list) && data.list.length > 0,
          });
          if (Array.isArray(data.list) && data.list.length > 0) {
            const cars = data.list.map(item => item.id).join();
            httpFormClient
              .formSubmit('/SpotTestTaskAction_checkSpot', '', { cars })
              .then(({ data: checkData }) => {
                if (checkData.result == 1) {
                  this.setState({
                    blackList: [...new Set(checkData.list)],
                    loading: false,
                  });
                } else {
                  this.setState({
                    blackList: [],
                    loading: false,
                  });
                }
              })
              .catch(err => Promise.reject(err));
          }

          this.props.updateQuery(this.props.query, {
            current: data.page && data.page.pageNum,
            pageSize: data.page && data.page.pageSize,
            total: data.page && data.page.total,
          });
        } else {
          return Promise.reject(data.msg);
        }
      })
      .catch(err => {
        message.error(err.message || err);
        this.setState({
          list: [],
          loading: false,
        });
      });
  };
  showTotal = total => {
    return `共 ${total} 条数据`;
  };
  render() {
    const { query, updateQuery, paging, isCarShow, description } = this.props;
    const { selectedRowKeys, blackList = [] } = this.state;

    return (
      <div className={listStyles.carSelectionView}>
        <SimForm
          formItemList={
            isCarShow
              ? [FormItems.chassisFormItem]
              : [FormItems.locationNameFormItem, FormItems.chassisFormItem, carStatusFormItem]
          }
          query={query}
          onUpdateQuery={value => updateQuery(value, paging)}
          onSearch={this.handleSearch}
        />
        <EwAuditTable
          columns={[
            ColItems.chassisColumn,
            ColItems.fldModelColumn,
            {
              title: '所在网点',
              dataIndex: 'locationName',
              align: 'center',
            },
            {
              title: '车辆状态',
              dataIndex: 'locationStatus',
              align: 'center',
            },
            {
              title: '位置状态',
              dataIndex: 'carstatus',
              align: 'center',
            },
            {
              title: '抽查次数',
              dataIndex: 'spotnum',
              align: 'center',
            },
          ]}
          onChange={this.handlePageChange}
          onPageChange={this.handlePageChange}
          data={this.state.list}
          paging={{
            ...paging,
            pageSizeOptions: ['10', '30', '50', '100'],
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: this.props.onChange,
            onShowSizeChange: this.props.onPageChange,
            showTotal: this.showTotal,
          }}
          size="small"
          scroll={{ x: 'max-content' }}
          bordered={false}
          rowSelection={{
            selectedRowKeys,
            onChange: this.handleRowSelectChange,
            getCheckboxProps: record => ({
              disabled: !['接证任务', '盘证任务'].includes(description) && blackList.includes(record.chassis), // 盘证接证任务一直可下
            }),
          }}
          rowClassName={record => (!['接证任务', '盘证任务'].includes(description) && blackList.includes(record.chassis) ? 'hasTaskCar' : '')}
          rowKey="id"
          loading={this.state.loading}
        />
        {blackList.length > 0 && (
          <span style={{ color: 'red', position: 'absolute', bottom: '20px', left: '50px' }}>
            *标红的车辆表明有抽查任务，不可下发新任务
          </span>
        )}
      </div>
    );
  }
}

const FormItem = Form.Item;
const { Option } = Select;
const carStatusFormItem = getFieldDecorator => {
  return (
    <Col md={8} sm={24} key={'carLocationStatus'}>
      <FormItem label="位置状态">
        {getFieldDecorator('carLocationStatus')(
          <Select placeholder="请选择" style={{ width: '100%' }} mode="multiple">
            {carStatusList
              .filter(item => [0, 1, 4, 5, 6, 7, 20].includes(item.value))
              .map(item => (
                <Option value={item.value} key={item.value}>
                  {item.name}
                </Option>
              ))}
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
