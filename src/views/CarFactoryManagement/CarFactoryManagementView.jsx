import React, { Component } from 'react';
import styles from './style.module.less';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import ewAuditTableColumn from 'components/EwAuditTableColumn';
import { Button, message, Modal, Tooltip, Icon } from 'antd';
import { exportFile } from 'common/utils';

const FORMAT = 'YYYY-MM-DD';
class CarFactoryManagementView extends Component {
  state = {
    showModal: false,
    value: {},
    type: '',
    isExporting: false,
  };

  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }

  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  reformatValue = formValues => {
    const values = { ...formValues };
    try {
      const { statisDate, provCity } = formValues;
      if (statisDate) {
        // 统计日期
        const [startTime, endTime] = statisDate;
        values.beginDate = startTime && startTime.format(FORMAT);
        values.endDate = endTime && endTime.format(FORMAT);
        delete values.statisDate;
      }
      if (provCity) {
        const [provinceId, cityId] = provCity;
        values.provinceId = provinceId;
        values.cityId = cityId;
        delete values.provCity;
      }
    } catch (e) {
      console.error(e);
    }
    return values;
  };

  handleSearch = (value, page, pageSize) => {
    this.props.fetch(this.reformatValue(value), {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };

  handleExport = () => {
    const hide = message.loading('导出中，请稍后。。。', 0);
    this.setState({
      isExporting: true,
    });
    const { value } = this.props.query;
    this.props
      .exportData(this.reformatValue(value))
      .then(({ payload }) => {
        const result = exportFile(payload);
        result && message.warning(result, 2.5);
      })
      .catch(err => {
        console.error(err.message);
      })
      .then(() => {
        this.setState({
          isExporting: false,
        });
        hide();
      });
  };

  handleSearchDetail = (value, type, page, pageSize) => {
    const { value: queryValue } = this.props.query;
    this.props
      .handleSearchDetail(
        {
          ...value,
          disFindType: type,
          ...this.reformatValue(queryValue),
          regionName: queryValue.regionName || value.regionName,
          regionSubName: queryValue.regionSubName || value.regionSubName,
        },
        {
          pageNum: page || this.props.detailPaging.current,
          pageSize: pageSize || this.props.detailPaging.pageSize,
        }
      )
      .then(() => {
        this.setState({
          showModal: true,
          type,
        });
      });
    console.log(this.props);
  };

  handleDetailPageChange = (page, pageSize) => {
    this.handleSearchDetail(this.state.value, this.state.type, page, pageSize);
  };

  onCancel = () => {
    this.setState({
      showModal: false,
    });
  };

  renderColumn = () => {
    const reformat = (record, type) => {
      const {
        bankId,
        ewId,
        ewAreaId,
        fldSerialid: fldSerialid,
        disAreaId,
        distributorId,
        regionName,
        regionSubName,
        fldTrimid,
        fldModelid,
      } = record;
      return {
        onClick: () => {
          const value = {
            bankId,
            ewId: !type ? ewId : undefined,
            ewAreaId: !type ? ewAreaId : undefined,
            disAreaId: !type || disAreaId === 0 ? undefined : disAreaId,
            fldSerialid,
            distributorId: distributorId === '' ? undefined : distributorId,
            regionName: regionName === '' ? undefined : regionName,
            regionSubName: regionSubName === '' ? undefined : regionSubName,
            fldTrimid: fldTrimid === '' ? undefined : fldTrimid,
            fldModelid: fldModelid === '' ? undefined : fldModelid,
          };
          this.setState({
            value,
            type,
          });
          this.handleSearchDetail(value, type);
        },
      };
    };
    const { match } = this.props;
    const columns = ewAuditTableColumn(match.path);
    if (this.props.rinkType === 'ew') {
      columns.push({
        title: '二网销量',
        dataIndex: 'ewSalesNum',
        align: 'right',
        onCell: (record, rowIndex) => reformat(record),
        render: text => (
          <a href="javascript:;" className="inlineBlock">
            {text}
          </a>
        ),
      });
    } else if (this.props.rinkType === 'dealer') {
      columns.push(
        {
          title: '总销量',
          dataIndex: 'countSalesNum',
          align: 'right',
          onCell: (record, rowIndex) => reformat(record, '1'),
          render: text => (
            <a href="javascript:;" className="inlineBlock">
              {text}
            </a>
          ),
        },
        {
          title: '主店销量',
          dataIndex: 'mainStoresalesNum',
          align: 'right',
          onCell: (record, rowIndex) => reformat(record, '2'),
          render: text => (
            <a href="javascript:;" className="inlineBlock">
              {text}
            </a>
          ),
        },
        {
          title: '二网销量',
          dataIndex: 'ewSalesNum',
          align: 'right',
          onCell: (record, rowIndex) => reformat(record, '3'),
          render: text => (
            <a href="javascript:;" className="inlineBlock">
              {text}
            </a>
          ),
        },
        {
          title: '二网销量占比',
          dataIndex: 'ewSalesRatio',
          align: 'right',
        }
      );
    } else if (this.props.rinkType === 'CarSales') {
      columns.push(
        {
          title: '总销量',
          dataIndex: 'countSalesNum',
          align: 'right',
          onCell: (record, rowIndex) => reformat(record, '1'),
          render: text => (
            <a href="javascript:;" className="inlineBlock">
              {text}
            </a>
          ),
        },
        {
          title: '主店销量',
          dataIndex: 'mainStoresalesNum',
          align: 'right',
          onCell: (record, rowIndex) => reformat(record, '2'),
          render: text => (
            <a href="javascript:;" className="inlineBlock">
              {text}
            </a>
          ),
        },
        {
          title: '二网销量',
          dataIndex: 'ewSalesNum',
          align: 'right',
          onCell: (record, rowIndex) => reformat(record, '3'),
          render: text => (
            <a href="javascript:;" className="inlineBlock">
              {text}
            </a>
          ),
        },
        {
          title: '二网销量占比',
          dataIndex: 'ewSalesRatio',
          align: 'right',
        }
      );
    }
    return columns;
  };

  render() {
    const { match, query, rowKey, rinkType, detailColumns, detailRowKey } = this.props;
    return (
      <div className={styles.ledger}>
        <div className={styles.formArea}>
          <CCForm
            onSearch={this.handleSearch}
            path={match.path}
            query={query}
            onUpdateQuery={this.props.updateQuery}
            wrappedComponentRef={form => (this.form = form)}
          />
        </div>
        <div className={styles.operArea}>
          <Button type="primary" icon="export" onClick={this.handleExport}>
            导出报表
          </Button>
          {rinkType === 'carMoving' && (
            <Tooltip
              title={
                <span>
                  报表说明：
                  <br />
                  1，二网数量、审批允许移动总台数 取实时数据
                  <br />
                  2，抵／质押车总数、二网实际移动台数 取统计日期-结束日期 当天真实数据（功能上线后会每天备份库存）
                  <br />
                  3，赎回车辆数量、销售总数量、二网销量 取统计时间段实际数据
                  <br />
                </span>
              }
            >
              <Icon type="exclamation-circle" style={{ color: 'red' }} />
            </Tooltip>
          )}
        </div>
        <div className={styles.wrapper}>
          <EwAuditTable
            columns={this.renderColumn()}
            loading={this.props.loading}
            data={this.props.list}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
            rowKey={rowKey}
          />
        </div>
        <Modal
          visible={this.state.showModal}
          onCancel={this.onCancel}
          footer={null}
          width={1100}
          title="查看明细"
          destroyOnClose
        >
          <EwAuditTable
            loading={this.props.loading}
            data={this.props.detailList}
            regionName={this.props.regionName}
            columns={detailColumns || []}
            paging={this.props.detailPaging}
            onChange={this.handleDetailPageChange}
            onPageChange={this.handleDetailPageChange}
            scroll={{ x: 800 }}
            rowKey={detailRowKey}
          />
        </Modal>
      </div>
    );
  }
}
export default CarFactoryManagementView;
