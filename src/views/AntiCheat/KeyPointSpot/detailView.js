import React, { Component } from 'react';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { Input, Button, Form } from 'antd';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient, httpFormClient } from 'common/axios';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
import { formatTime } from 'common/utils';
const FormItem = Form.Item;
export default class detailView extends Component {
  state = {
    loading: false,
    data: {},
    disName: '',
    paging: { current: 1, pageSize: 10, total: 0 },
  };
  columns = [
    { title: '经销商', dataIndex: 'distributorName' },
    { title: '车架号', dataIndex: 'chassis' },
    { title: '任务号', dataIndex: 'spotId' },
    { title: '任务下发时间', dataIndex: 'bookTime', render: text => formatTime(text) },
  ];
  componentDidMount() {
    this.handleSearch();
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(page, pageSize);
  };
  handleSearch = (page, pageSize) => {
    const { id } = this.props.match.params;
    this.setState({ loading: true });
    httpFormClient
      .formSubmit(`/SpotTestTaskAction_getKeyDistributorsSpots`, '', {
        distributorName: this.state.disName,
        uploadFileId: id,
        pageNum: page || 1,
        pageSize: pageSize || 10,
      })
      .then(({ data = {} }) => {
        if (data.result === 0) {
          this.setState({
            loading: false,
            data,
            paging: { current: data.page.pageNum, pageSize: data.page.pageSize, total: data.page.total },
          });
        } else {
          this.setState({ loading: false });
        }
      });
  };
  render() {
    const { data, disName } = this.state;
    return (
      <ViewWrapper>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            经销商：&nbsp;&nbsp;
            <Input
              style={{ width: '300px' }}
              value={disName}
              placeholder="请输入经销商名称"
              onChange={e => this.setState({ disName: e.target.value })}
            />
          </div>
          <div>
            <Button type="primary" onClick={() => this.handleSearch()}>
              查询
            </Button>
            &nbsp;&nbsp;
            <Button onClick={() => this.setState({ disName: '' })}>重置</Button>
          </div>
        </div>
        <br />
        <span style={{ fontWeight: 'bold', color: '#1da02b' }}>
          本次共下发{data.disNum}家经销商&nbsp;{data.spotNum}条任务&nbsp; 共{data.carNum}辆车
        </span>
        <EwAuditTable
          columns={this.columns}
          data={this.state.data.list}
          loading={this.state.loading}
          paging={this.state.paging}
          onChange={this.handlePageChange}
          onPageChange={this.handlePageChange}
        />
        <OperationArea>
          <BackToList />
        </OperationArea>
      </ViewWrapper>
    );
  }
}
