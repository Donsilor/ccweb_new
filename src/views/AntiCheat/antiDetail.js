import { connect } from 'react-redux';
import { searchDetailList, updateDetailList } from 'redux/modules/spotEwBlack';
import React, { Component, Fragment } from 'react';
import { Button, message, Drawer, Divider, Radio } from 'antd';
import EwAuditTable from 'components/EwAuditTable';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { httpCommonClient, httpBufferClient, httpFormClient } from 'common/axios';
import { exportFile } from 'common/utils';
import RcViewer from 'rc-viewer';
import axios from 'axios';
export class AntiDetail extends Component {
  state = {
    isExporting: false,
    visible: false,
    photoList: [],
    record: {},
  };
  //列表操作
  renderColumn = () => {
    const columns = [];
    columns.push({
      title: '操作',
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a
            href="javascript:;"
            onClick={() => {
              httpCommonClient
                .post(`/AntiCheatingAction_searchPhotoList`, { spotdetailId: record.spotdetailId })
                .then(({ data = {} }) => {
                  this.setState({ photoList: data.list, record, visible: true });
                });
            }}
          >
            查看图片
          </a>
        </Fragment>
      ),
    });
    return columnsDetailList.concat(columns);
  };
  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  //列表查询
  handleSearch = (formValues, page, pageSize) => {
    const values = { ...formValues };
    this.props.fetch(this.props.match.params.id, values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };
  //导出明细
  spotHandleExport = () => {
    if (!this.props.list) {
      message.error('暂无数据,无法导出');
      return;
    }
    const hide = message.loading('导出中，请稍后。。。', 0);
    this.setState({
      isExporting: true,
    });
    httpBufferClient
      .submit(`/AntiCheatingAction_exportDetailList`, { recordId: this.props.match.params.id })
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
    const { paging, list, loading } = this.props;
    const { isExporting, visible, photoList, record } = this.state;
    return (
      <ViewWrapper>
        <div>
          <Button type="primary" loading={isExporting} icon="export" onClick={this.spotHandleExport}>
            导出明细
          </Button>
          <EwAuditTable
            columns={this.renderColumn()}
            loading={loading}
            data={list}
            paging={paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
          />
        </div>
        <Drawer
          title="查看图片"
          placement="right"
          width={500}
          onClose={() => {
            this.handlePageChange();
            this.setState({ visible: false });
          }}
          visible={visible}
        >
          {photoList.map(item => (
            <div key={item.id}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <RcViewer>
                  <img style={{ width: '300px', height: '200px' }} src={item.file.absolutePath} />
                </RcViewer>
                &nbsp;&nbsp;
                <div>
                  人工判断 : &nbsp;
                  <Radio.Group
                    defaultValue={item.file.isCheating}
                    onChange={e => {
                      httpCommonClient.submit('/AntiCheatingAction_updateFileCheating', {
                        id: record.id,
                        fileId: item.file.id,
                        isCheating: e.target.value,
                      });
                    }}
                  >
                    <Radio value={0}>正常</Radio>
                    <Radio value={1}>作弊</Radio>
                  </Radio.Group>
                </div>
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}>{item.codetypeDesc}</span>
                <Divider type="vertical" />
                {!!item.file.hasMoire ? (
                  <span style={{ color: 'red' }}>( 疑似存在摩尔纹 )</span>
                ) : (
                  <span>( 正常 )</span>
                )}
              </div>
              <Divider />
            </div>
          ))}
        </Drawer>
        <OperationArea>
          <BackToList></BackToList>
        </OperationArea>
      </ViewWrapper>
    );
  }
}
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
  {
    title: '是否已标记',
    dataIndex: 'isMarked',
    render: text => (text ? '是' : '否'),
  },
];
const mapStateToProps = store => ({
  loading: store.spotEwBlack.loading,
  list: store.spotEwBlack.detail.list,
  paging: store.spotEwBlack.detail.paging,
  query: store.spotEwBlack.detail.query,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (recordId, data, paging) => {
      data.recordId = recordId;
      dispatch(searchDetailList(data, paging));
    },
    updateQuery: data => {
      dispatch(updateDetailList(data));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AntiDetail);
