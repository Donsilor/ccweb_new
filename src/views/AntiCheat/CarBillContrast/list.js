import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCarBillContrast, updateCarBillContrast } from 'redux/modules/carDataUpload';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { Button, message } from 'antd';
import CCForm from 'components/CCForm';
import OperationArea from 'components/OperationArea';
import EwAuditTable from 'components/EwAuditTable';
import { httpBufferClient } from 'common/axios';
import { exportFile } from 'common/utils';
class listView extends Component {
  state = {
    isExporting: false,
  };
  columns = [
    { title: '经销商', dataIndex: 'distributorName' },
    { title: '赎车（台）', dataIndex: 'buyNum' },
    { title: '赎车已开票（台）', dataIndex: 'buyAndBillNum' },
    { title: '赎车未开票（台）', dataIndex: 'buyAndUnBillNum' },
    { title: '税控开票（台）', dataIndex: 'taxBillNum' },
    { title: '最近一次开票日期', dataIndex: 'lastTimeBillDate' },
    { title: '质押车税控开票', dataIndex: 'carTaxBillNum' },
    { title: '质押车最近一次开票日期', dataIndex: 'carLastTimeBillDate' },
    {
      title: '操作',
      fixed: 'right',
      render: (text, record) => (
        <a
          href="javascript:;"
          onClick={() => {
            this.props.history.push(`/carBillContrast/detail/${record.distributorId}/${record.distributorName}`);
          }}
        >
          查看
        </a>
      ),
    },
  ];
  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  handleSearch = (formValues, page, pageSize) => {
    const values = { ...formValues };
    const { buyTime, billTime } = formValues;
    if (buyTime) {
      const [startTime, endTime] = buyTime;
      values.buyTimeStart = startTime && startTime.format('YYYY-MM-DD');
      values.buyTimeEnd = endTime && endTime.format('YYYY-MM-DD');
      delete values.buyTime;
    }
    if (billTime) {
      const [startTime, endTime] = billTime;
      values.billDateStart = startTime && startTime.format('YYYY-MM-DD');
      values.billDateEnd = endTime && endTime.format('YYYY-MM-DD');
      delete values.billTime;
    }
    this.props.fetch(values, {
      pageNum: page || 1,
      pageSize: pageSize || 10,
    });
  };
  render() {
    const { match, list, loading, query, paging } = this.props;
    const { isExporting } = this.state;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm onSearch={this.handleSearch} path={match.path} query={query} onUpdateQuery={this.props.updateQuery} />
        </FormArea>
        <EwAuditTable
          columns={this.columns}
          loading={loading}
          data={list}
          paging={paging}
          onChange={this.handlePageChange}
          onPageChange={this.handlePageChange}
        />
        <OperationArea>
          <Button
            type="primary"
            loading={isExporting}
            onClick={() => {
              const hide = message.loading('导出中，请稍后。。。', 0);
              this.setState({ isExporting: true });
              const value = { ...query.value };
              const { buyTime, billTime } = value;
              if (buyTime) {
                const [startTime, endTime] = buyTime;
                value.buyTimeStart = startTime && startTime.format('YYYY-MM-DD');
                value.buyTimeEnd = endTime && endTime.format('YYYY-MM-DD');
                delete value.buyTime;
              }
              if (billTime) {
                const [startTime, endTime] = billTime;
                value.billDateStart = startTime && startTime.format('YYYY-MM-DD');
                value.billDateEnd = endTime && endTime.format('YYYY-MM-DD');
                delete value.billTime;
              }
              httpBufferClient
                .submit('/CarAction_exportDistributorCarBillContrastList', value)
                .then(payload => {
                  const result = exportFile(payload);
                  result && message.warning(result, 2.5);
                })
                .then(res => {
                  this.setState({ isExporting: false });
                  hide();
                })
                .catch(err => {
                  message.error('系统异常');
                  this.setState({ isExporting: false });
                  hide();
                });
            }}
          >
            报表导出
          </Button>
        </OperationArea>
      </ViewWrapper>
    );
  }
}
const mapStateToProps = store => ({
  loading: store.carDataUpload.loading,
  list: store.carDataUpload.CarBillContrast.list,
  paging: store.carDataUpload.CarBillContrast.paging,
  query: store.carDataUpload.CarBillContrast.query,
});
function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getCarBillContrast(data, paging)),
    updateQuery: data => {
      dispatch(updateCarBillContrast({ ...data }));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(listView);
