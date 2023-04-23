import { connect } from 'react-redux';
import { searchRecordList, updateRecordList } from 'redux/modules/spotEwBlack';
import React, { Component, Fragment } from 'react';
import { Button, message, Modal, Input, Table } from 'antd';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import OperationArea from 'components/OperationArea';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { httpCommonClient, httpBufferClient } from 'common/axios';
import { exportFile } from 'common/utils';
const FORMAT = 'YYYY-MM-DD';
export class spotEwBlack extends Component {
  state = {
    modEwVisible: false,
    confirmLoading: false,
    isExporting: false,
    percent: '',
    percentId: '',
    record: {},
    detailList: [],
  };
  handleCancel = () => {
    this.setState({
      modEwVisible: false,
      confirmLoading: false,
    });
  };
  //查询详情列表
  searchDetailList = record => () => {
    this.setState({ modEwVisible: true, confirmLoading: true, record: record });
    return httpCommonClient
      .post('/AntiCheatingAction_searchDetailList', {
        recordId: record.id,
        page: 1,
        pageSize: 1000,
      })
      .then(({ data = {} }) => {
        if (data.result === 0) {
          this.setState({ confirmLoading: false, detailList: data.list });
        } else {
          this.setState({ confirmLoading: false, detailList: [] });
        }
      });
  };
  //列表操作
  renderColumn = () => {
    const columns = [];
    columns.push({
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a
            href="javascript:;"
            onClick={() => {
              this.props.history.push(`/antiCheat/detail/${record.id}`);
            }}
          >
            查看
          </a>
        </Fragment>
      ),
    });
    return columnsList.concat(columns);
  };
  componentDidMount() {
    this.handleSearch(this.props.query.value);
    this.getParam();
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  //列表查询
  handleSearch = (formValues, page, pageSize) => {
    const values = { ...formValues };
    try {
      const { dateRange } = formValues;
      if (dateRange) {
        const [startTime, endTime] = dateRange;
        values.fromTime = startTime && startTime.format(FORMAT);
        values.toTime = endTime && endTime.format(FORMAT);
        delete values.dateRange;
      }
    } catch (e) {
      console.error(e);
    }
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };
  //查询参数
  getParam = () => {
    const url = '/AntiCheatingAction_getParam';
    httpCommonClient.post(url, {}).then(res => {
      if (res.data) this.setState({ percentId: res.data.id, percent: res.data.percent });
    });
  };
  //修改参数
  updateParam = () => {
    if (this.state.percent > 100) {
      message.error('参数值不能大于100');
      return;
    }
    httpCommonClient
      .post('/AntiCheatingAction_updateParam', { id: this.state.percentId, percent: this.state.percent })
      .then(res => {
        if (res.data.result === 0) {
          message.success(res.data.msg);
        } else {
          message.error(res.data.msg);
        }
      });
  };
  //导出明细
  spotHandleExport = () => {
    if (!this.state.detailList.length) {
      message.error('暂无数据,无法导出');
      return;
    }
    const hide = message.loading('导出中，请稍后。。。', 0);
    this.setState({
      isExporting: true,
    });
    httpBufferClient
      .submit(`/AntiCheatingAction_exportDetailList`, { recordId: this.state.record.id })
      .then(payload => {
        const result = exportFile(payload);
        result && message.warning(result, 2.5);
      })
      .then(res => {
        this.setState({
          isExporting: false,
        });
        hide();
      })
      .catch(err => {
        message.error('操作失败');
      });
  };
  render() {
    const { match, query } = this.props;
    const { modEwVisible, confirmLoading, percent, isExporting, detailList } = this.state;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm
            onSearch={this.handleSearch}
            path={match.path}
            query={query}
            onUpdateQuery={this.props.updateQuery}
            wrappedComponentRef={form => (this.form = form)}
          />
        </FormArea>
        <div>
          <EwAuditTable
            columns={this.renderColumn()}
            loading={this.props.loading}
            data={this.props.list}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
          />
        </div>
        <Modal title="查看明细" footer={null} visible={modEwVisible} onCancel={this.handleCancel} width={1200}>
          <Button type="primary" loading={isExporting} icon="export" onClick={this.spotHandleExport}>
            导出明细
          </Button>
          <Table
            scroll={{ x: true }}
            rowKey="id"
            loading={confirmLoading}
            dataSource={detailList}
            columns={columnsDetailList}
          />
        </Modal>
        <OperationArea>
          每天抽取自动审核通过任务
          <Input
            size="small"
            value={percent}
            onChange={e => {
              this.setState({ percent: e.target.value.replace(/[^\d]/g, '') });
            }}
            style={{ width: '50px' }}
          />
          %，用于检查是否作弊 &nbsp; &nbsp; &nbsp;
          <Button type="primary" onClick={this.updateParam}>
            保存
          </Button>
        </OperationArea>
      </ViewWrapper>
    );
  }
}
const columnsList = [
  {
    title: '检查任务编号',
    dataIndex: 'code',
  },
  {
    title: '自动审核通过数',
    dataIndex: 'totalNum',
  },
  {
    title: '抽取样本数量',
    dataIndex: 'sampleNum',
  },
  {
    title: '疑为作弊数',
    dataIndex: 'suspectNum',
  },
  {
    title: '任务执行时间',
    dataIndex: 'createTime',
  },
];
const columnsDetailList = [
  {
    title: '任务号',
    dataIndex: 'spottestId',
  },
  {
    title: '任务下发时间',
    dataIndex: 'bookTime',
  },
  {
    title: '银行名称',
    dataIndex: 'bankName',
  },
  {
    title: '经销商名称',
    dataIndex: 'distriburorName',
  },
  {
    title: '品牌',
    dataIndex: 'brandName',
  },
  {
    title: '二网名称',
    dataIndex: 'ewName',
  },
  {
    title: '车架号',
    dataIndex: 'chassis',
  },
];
const mapStateToProps = store => ({
  loading: store.spotEwBlack.loading,
  list: store.spotEwBlack.record.list,
  paging: store.spotEwBlack.record.paging,
  query: store.spotEwBlack.record.query,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => {
      dispatch(searchRecordList(data, paging));
    },
    updateQuery: data => {
      dispatch(updateRecordList(data));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(spotEwBlack);
