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
import { httpCommonClient } from 'common/axios';
import { carStatusList } from 'common/constant';
import _get from 'lodash/get';
import _forEach from 'lodash/forEach';

export default class CarSelectionView extends PureComponent {
  state = {
    list: [],
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
    const values = {};
    _forEach(formValue, (value, key) => {
      if (value !== null) {
        values[key] = value;
      }
    });
    const url = !this.props.isCertificateSpot
      ? '/self-car/v1.0/cars/find/list/spot-car'
      : '/self-car/v1.0/cars/find/list/spot-certificate';
    httpCommonClient
      .postWithPaging(url, values, {
        pageNum: page || this.props.paging.current,
        pageSize: pageSize || this.props.paging.pageSize,
      })
      .then(({ data }) => {
        if (data.code == 200) {
          this.setState({
            list: data.data.list,
          });
          this.props.updateQuery(this.props.query, {
            current: _get(data, 'data.pageNum', 1),
            pageSize: _get(data, 'data.pageSize', 10),
            total: _get(data, 'data.total', 1),
          });
        } else {
          return Promise.reject(data.message || '获取车辆数据失败');
        }
      })
      .catch(err => {
        message.error(err.message || err);
        this.setState({
          list: [],
        });
      });
  };
  showTotal = total => {
    return `共 ${total} 条数据`;
  };
  render() {
    const { query, updateQuery, paging, isCertificateSpot } = this.props;
    const { selectedRowKeys } = this.state;

    return (
      <div>
        <SimForm
          formItemList={
            !isCertificateSpot
              ? [
                  FormItems.ewNameFormItem,
                  FormItems.brandNameFormItem,
                  FormItems.chassisFormItem,
                  subAreaNameFormItem,
                  FormItems.selfcarTypeFormItem,
                ]
              : [subAreaNameFormItem, managerNameFormItem, FormItems.ewNameFormItem, FormItems.chassisFormItem]
          }
          query={query}
          onUpdateQuery={value => updateQuery(value, paging)}
          onSearch={this.handleSearch}
        />
        <EwAuditTable
          columns={isCertificateSpot ? cerCarAddingColumns : commonCarAddingColumns}
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
          }}
          rowKey="id"
        />
      </div>
    );
  }
}

const FormItem = Form.Item;

const managerNameFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'areaManagerName'}>
      <FormItem label="区域经理">
        {getFieldDecorator('areaManagerName')(<Input placeholder="请选择小区名称" />)}
      </FormItem>
    </Col>
  );
};
const subAreaNameFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'subAreaName'}>
      <FormItem label="小区名称">{getFieldDecorator('subAreaName')(<Input placeholder="请输入小区名称" />)}</FormItem>
    </Col>
  );
};
const commonCarAddingColumns = [
  {
    title: '车架号',
    dataIndex: 'chassis',
  },
  {
    title: '品牌',
    dataIndex: 'brandName',
  },
  {
    title: '车辆类型',
    dataIndex: 'carTypeName',
  },
  {
    title: '金融产品',
    dataIndex: 'financialProductsName',
  },
  {
    title: '车辆状态',
    dataIndex: 'additionStatusName',
  },
  {
    title: '二网名称',
    dataIndex: 'ewName',
  },
  {
    title: '小区',
    dataIndex: 'subAreaName',
  },
  {
    title: '上次抽查时间',
    dataIndex: 'spottestTime',
  },
];
const cerCarAddingColumns = [
  {
    title: '车架号',
    dataIndex: 'chassis',
  },
  {
    title: '品牌',
    dataIndex: 'brandName',
  },

  {
    title: '车辆类型',
    dataIndex: 'carTypeName',
  },
  {
    title: '车辆状态',
    dataIndex: 'additionStatusName',
  },
  {
    title: '二网名称',
    dataIndex: 'ewName',
  },
  {
    title: '小区',
    dataIndex: 'subAreaName',
  },
  {
    title: '区域经理',
    dataIndex: 'areaManagerName',
  },
  {
    title: '上次抽查时间',
    dataIndex: 'spottestTime',
  },
];
