import React, { Component } from 'react';
import { Spin, Button } from 'antd';
import OperationArea from 'components/OperationArea';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import { httpCommonClient } from 'common/axios';
export default class details extends Component {
  state = {
    loading: false,
    list: [],
    paging: { current: 1, pageSize: 10, total: 0 },
    value: {},
  };
  componentDidMount() {
    this.handleSearch();
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(page, pageSize);
  };
  handleSearch = (page, pageSize) => {
    this.setState({ loading: true });
    const { type, id } = this.props.match.params;
    let url = '',
      data = {};
    if (type == '51') {
      url = `/ImportCarDetailAction_listSupervision`;
      data = { batchno: id };
    } else if (type == '52') {
      url = `/CarBillAction_list`;
      data = { batchno: id, ...this.state.value };
    } else {
      url = `/UnsupervisedSpotDisAction_listSpotCars`;
      data = { spotDistributorId: id };
    }
    httpCommonClient
      .post(url, {
        ...data,
        pageNum: page || 1,
        pageSize: pageSize || 10,
      })
      .then(({ data = {} }) => {
        if (data.result === 0) {
          this.setState({
            loading: false,
            list: data.list,
            paging: {
              current: data.page.pageNum,
              pageSize: data.page.pageSize,
              total: data.page.total,
            },
          });
        } else {
          this.setState({ loading: false, list: [] });
        }
      });
  };
  render() {
    const { type } = this.props.match.params;
    let columns = [];
    if (type == '51') {
      columns = columnsCar;
    } else if (type == '52') {
      columns = columnsMake;
    } else {
      columns = columnsTask;
    }
    return (
      <ViewWrapper>
        <Spin spinning={this.state.loading}>
          {/*开票信息详情页面才有查询项  */}
          {this.props.match.params.type == '52' && (
            <FormArea>
              <CCForm
                onSearch={() => this.handleSearch()}
                path="/noSuperviseList/detail"
                query={{
                  value: {},
                  expandForm: false,
                  aitiForm: true,
                }}
                onUpdateQuery={query => {
                  this.setState({ value: query.value });
                }}
              />
            </FormArea>
          )}
          <EwAuditTable
            columns={columns}
            data={this.state.list}
            paging={this.state.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
          />
        </Spin>
        <OperationArea>
          <Button onClick={() => this.props.history.push(`/noSuperviseList/${this.props.match.params.tab}`)}>
            返回列表
          </Button>
        </OperationArea>
      </ViewWrapper>
    );
  }
}
const columnsCar = [
  { title: '发车日期', dataIndex: 'departDate' },
  { title: '经销商名称', dataIndex: 'distributorName' },
  { title: '车架号', dataIndex: 'chassis' },
  { title: '金额（元）', dataIndex: 'carprice' },
  { title: '凭证号', dataIndex: 'voucherno' },
  { title: '业务编号', dataIndex: 'businessno' },
  { title: '车辆状态', dataIndex: 'carStatus' },
  { title: '位置', dataIndex: 'location' },
  { title: '地址', dataIndex: 'address' },
  { title: '是否三公里以内', dataIndex: 'ltThreeKiloMetre' },
  { title: '橙e状态', dataIndex: 'chengEStatus' },
  { title: '全地盘号', dataIndex: 'fullChassis' },
  { title: '备注', dataIndex: 'remark' },
];
const columnsMake = [
  { title: '经销商名称', dataIndex: 'distributorName' },
  { title: '经销商税号', dataIndex: 'taxNo' },
  { title: '发票代码', dataIndex: 'fpdm' },
  { title: '发票号码', dataIndex: 'billNo' },
  { title: '开票日期', dataIndex: 'billDate' },
  { title: '车辆类型', dataIndex: 'carType' },
  { title: '车架号码', dataIndex: 'chassis' },
  { title: '厂牌型号', dataIndex: 'brandModel' },
  { title: '价税合计', dataIndex: 'taxAmount' },
  { title: '购货单位', dataIndex: 'gmfmc' },
  { title: '原发票代码', dataIndex: 'yfpdm' },
  { title: '原发票号码', dataIndex: 'yfphm' },
  { title: '备注', dataIndex: 'bz' },
  { title: '入库时间', dataIndex: 'rksj' },
];
const columnsTask = [
  { title: '经销商名称', dataIndex: 'distributorName' },
  { title: '车架号', dataIndex: 'vin' },
  { title: '抽查位置', dataIndex: 'libraryType' },
  { title: '抽查描述', dataIndex: 'spotType' },
  { title: '下发结果', dataIndex: 'spotCarResult' },
];
