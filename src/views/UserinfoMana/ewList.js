import { connect } from 'react-redux';
import { getEWList, updateEWList } from 'redux/modules/userinfoMana';
import React, { Component, Fragment } from 'react';
import { Button, message } from 'antd';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import OperationArea from 'components/OperationArea';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { httpCommonClient, httpBufferClient, httpFormClient } from 'common/axios';
import { exportFile } from 'common/utils';
export class ewList extends Component {
  state = {
    isExporting: false,
  };
  //列表操作
  renderColumn = () => {
    const columns = [
      {
        title: '操作',
        fixed: 'right',
        render: (text, record) => (
          <Fragment>
            <a
              href="javascript:;"
              onClick={() => {
                this.props.history.push(`/ewList/edit/${record.id}`);
              }}
            >
              查看
            </a>
          </Fragment>
        ),
      },
    ];
    return columnsList.concat(columns);
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
    const { provCity, status } = values;
    if (provCity) {
      values.province = provCity[0];
      values.city = provCity[1];
      delete values.provCity;
    }
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };
  //导出
  handleExport = () => {
    if (!this.props.list.length) {
      message.error('暂无数据,无法导出');
      return;
    }
    const hide = message.loading('导出中，请稍后。。。', 0);
    this.setState({
      isExporting: true,
    });
    const values = { ...this.props.query.value };
    const { provCity, status } = values;
    if (provCity) {
      values.province = provCity[0];
      values.city = provCity[1];
      delete values.provCity;
    }
    httpBufferClient
      .submit(`/EwAction_exportList`, values)
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
    const { match, query, waitAuditNum } = this.props;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm
            onSearch={this.handleSearch}
            path={match.path}
            query={query}
            onUpdateQuery={this.props.updateQuery}
            enableExport={true}
            onExport={this.handleExport}
            isExporting={this.state.isExporting}
            provCity
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
        <OperationArea>
          <span style={{ color: 'red', marginRight: '10px' }}> 待审核数: {waitAuditNum}条 </span>
          <Button
            type="primary"
            onClick={() => {
              this.props.history.push(`/ewList/add`);
            }}
          >
            新增二网
          </Button>
        </OperationArea>
      </ViewWrapper>
    );
  }
}
const columnsList = [
  {
    title: '二网名称',
    dataIndex: 'ewName',
  },
  {
    title: '省份',
    dataIndex: 'provinceName',
  },
  {
    title: '城市',
    dataIndex: 'cityName',
  },
  {
    title: '经营地址',
    dataIndex: 'ewAddress',
  },
  {
    title: '联系人',
    dataIndex: 'ewOperatorName',
  },
  {
    title: '联系电话',
    dataIndex: 'ewOperatorTel',
  },
  {
    title: '审核状态',
    dataIndex: 'auditStatus',
    render: text => {
      if (text == 0) {
        return '正常';
      } else if (text == 2) {
        return '待上传资料';
      } else if (text == 3) {
        return '待审核';
      }
    },
  },
  {
    title: '录入时间',
    dataIndex: 'createtime',
  },
];

const mapStateToProps = store => ({
  loading: store.userinfoMana.loading,
  list: store.userinfoMana.ewList.list,
  waitAuditNum: store.userinfoMana.ewList.waitAuditNum,
  paging: store.userinfoMana.ewList.paging,
  query: store.userinfoMana.ewList.query,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => {
      dispatch(getEWList(data, paging));
    },
    updateQuery: data => {
      dispatch(updateEWList(data));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ewList);
