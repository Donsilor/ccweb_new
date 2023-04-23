import React, { Component } from 'react';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
import {
  CEColumns,
  CAQCColumns,
  CAMZDColumns,
  YQDZColumns,
  QDJFColumns,
  YQJFColumns,
  re_CEColumns,
  re_XXColumns,
} from './Columns';
export default class detailView extends Component {
  state = {
    loading: false,
    list: [],
    paging: { current: 1, pageSize: 10, total: 0 },
  };

  componentDidMount() {
    this.handleSearch();
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(page, pageSize);
  };
  handleSearch = (page, pageSize) => {
    const { id, fileType } = this.props.match.params;
    this.setState({ loading: true });
    httpCommonClient
      .post(['31', '32'].includes(fileType) ? `RepaymentCarDetailAction_list` : `/ImportCarDetailAction_list`, {
        batchNo: id,
        pageNum: page || 1,
        pageSize: pageSize || 10,
      })
      .then(({ data = {} }) => {
        if (data.result === 0) {
          this.setState({
            loading: false,
            list: data.list,
            paging: { current: data.page.pageNum, pageSize: data.page.pageSize, total: data.page.total },
          });
        } else {
          this.setState({ loading: false });
        }
      });
  };
  render() {
    const columnsObj = {
      21: CEColumns,
      22: CAMZDColumns,
      23: CAQCColumns,
      24: YQDZColumns,
      25: QDJFColumns,
      26: YQJFColumns,
      31: re_CEColumns,
      32: re_XXColumns,
    };
    const typeObj = {
      21: '车辆导入-橙E格式',
      22: '车辆导入-长安马自达',
      23: '车辆导入-长安汽车',
      24: '车辆导入-一汽大众',
      25: '车辆导入-青岛解放',
      26: '车辆导入-一汽解放',
      31: '车辆还款-橙E格式',
      32: '车辆还款-线下格式',
    };
    return (
      <ViewWrapper>
        <EwAuditTable
          columns={columnsObj[this.props.match.params.fileType]}
          data={this.state.list}
          loading={this.state.loading}
          paging={this.state.paging}
          onChange={this.handlePageChange}
          onPageChange={this.handlePageChange}
        />
        <OperationArea>
          <span style={{ fontWeight: 'bold', color: '#1da02b' }}>
            录入格式: {typeObj[this.props.match.params.fileType]}
          </span>
          &nbsp;&nbsp;&nbsp;
          <BackToList />
        </OperationArea>
      </ViewWrapper>
    );
  }
}
