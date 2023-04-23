import { connect } from 'react-redux';
import { getDealerList, updateDealerList } from 'redux/modules/userinfoMana';
import React, { Component, Fragment } from 'react';
import { Button, message, Switch, Modal, Table } from 'antd';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import OperationArea from 'components/OperationArea';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { httpCommonClient, httpBufferClient, httpFormClient } from 'common/axios';
import { exportFile } from 'common/utils';
const { confirm } = Modal;
export class spotEwBlack extends Component {
  state = {
    isExporting: false,
    brandList: [],
  };
  //列表操作
  renderColumn = () => {
    const columns = [
      {
        title: '经销商',
        render: (text, record) => (
          <Switch
            defaultChecked={record.status !== 9}
            onChange={val => {
              const url = val ? '/DistributorAction_enableDistributor' : '/DistributorAction_stopDistributor';
              httpFormClient
                .formSubmit(url, '', {
                  id: record.id,
                })
                .then(({ data = {} }) => {
                  if (data.result === 0) {
                    message.success(data.msg);
                    this.handleSearch(this.props.query.value);
                  } else {
                    message.error(data.msg);
                  }
                });
            }}
            checkedChildren="启用"
            unCheckedChildren="停用"
          />
        ),
      },
      {
        title: '自有车管理',
        render: (text, record) => (
          <Switch
            defaultChecked={record.selfCarFlag}
            onChange={val => {
              httpCommonClient
                .post(`/self-car/v1.0/distributor/update/self-car-switch`, {
                  id: record.id,
                  selfCarFlag: +val,
                })
                .then(({ data = {} }) => {
                  if (data.code === 200) {
                    message.success(data.message);
                  } else {
                    message.error(data.message);
                  }
                });
            }}
            checkedChildren="打开"
            unCheckedChildren="关闭"
          />
        ),
      },
      {
        title: '自有车盘证任务',
        render: (text, record) => (
          <Switch
            defaultChecked={record.certificateFlag}
            onChange={val => {
              httpCommonClient
                .post(`/self-car/v1.0/distributor/update/certificate-flag`, {
                  id: record.id,
                  certificateFlag: +val,
                })
                .then(({ data = {} }) => {
                  if (data.code === 200) {
                    message.success(data.message);
                  } else {
                    message.error(data.message);
                  }
                });
            }}
            checkedChildren="打开"
            unCheckedChildren="关闭"
          />
        ),
      },
      {
        title: '税控监管',
        render: (text, record) => (
          <Switch
            checked={record.unsupervisedFlag}
            onChange={val => this.updateUnsupervised({ id: record.id, unsupervisedFlag: +val })}
            checkedChildren="打开"
            unCheckedChildren="关闭"
          />
        ),
      },
      {
        title: '日常查车',
        render: (text, record) => (
          <Switch
            checked={record.dailyCarFlag}
            onChange={val => this.updateUnsupervised({ id: record.id, dailyCarFlag: +val })}
            checkedChildren="打开"
            unCheckedChildren="关闭"
          />
        ),
      },
      {
        title: '盘证任务',
        render: (text, record) => (
          <Switch
            checked={record.dailyCertificateFlag}
            onChange={val => this.updateUnsupervised({ id: record.id, dailyCertificateFlag: +val })}
            checkedChildren="打开"
            unCheckedChildren="关闭"
          />
        ),
      },
      {
        title: '自动接车',
        render: (text, record) => (
          <Switch
            checked={record.receiveCarFlag}
            onChange={val => this.updateUnsupervised({ id: record.id, receiveCarFlag: +val })}
            checkedChildren="打开"
            unCheckedChildren="关闭"
          />
        ),
      },
      {
        title: '自动接证',
        render: (text, record) => (
          <Switch
            checked={record.receiveCertificateFlag}
            onChange={val => this.updateUnsupervised({ id: record.id, receiveCertificateFlag: +val })}
            checkedChildren="打开"
            unCheckedChildren="关闭"
          />
        ),
      },
      {
        title: '免接车',
        render: (text, record) => (
          <Switch
            checked={record.avoidReceiveCarFlag}
            onChange={val => this.updateUnsupervised({ id: record.id, avoidReceiveCarFlag: +val })}
            checkedChildren="打开"
            unCheckedChildren="关闭"
          />
        ),
      },
      {
        title: '免接证',
        render: (text, record) => (
          <Switch
            checked={record.avoidReceiveCertificateFlag}
            onChange={val => this.updateUnsupervised({ id: record.id, avoidReceiveCertificateFlag: +val })}
            checkedChildren="打开"
            unCheckedChildren="关闭"
          />
        ),
      },
      {
        title: '特殊经销商',
        render: (text, record) => (
          <Switch
            checked={record.specialFlag}
            onChange={val => this.updateUnsupervised({ id: record.id, specialFlag: +val })}
            checkedChildren="打开"
            unCheckedChildren="关闭"
          />
        ),
      },
      {
        title: '操作',
        fixed: 'right',
        render: (text, record) => (
          <Fragment>
            <a
              href="javascript:;"
              onClick={() => {
                this.props.history.push(`/dealerList/edit/${record.id}`);
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
  //修改免监管开关等信息
  updateUnsupervised = data => {
    httpCommonClient.post(`/DistributorAction_updateUnsupervisedInfo`, data).then(({ data = {} }) => {
      if (data.result === 0) {
        message.success(data.msg);
        this.handleSearch(this.props.query.value);
      } else {
        Modal.error({
          title: '提示信息：',
          content: data.msg,
        });
      }
    });
  };
  componentDidMount() {
    this.handleSearch(this.props.query.value);
    this.getBrandList();
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  //列表查询
  handleSearch = (formValues, page, pageSize) => {
    const values = { ...formValues };
    const { provCity } = values;
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
    const { provCity } = values;
    if (provCity) {
      values.province = provCity[0];
      values.city = provCity[1];
      delete values.provCity;
    }
    httpBufferClient
      .submit(`/DistributorAction_exportList`, values)
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
  //查询品牌
  getBrandList() {
    httpCommonClient.post(`/UtilAction_brandInfo`, {}).then(respone => {
      if (respone.data.result === 0) {
        this.setState({ brandList: respone.data.list });
      }
    });
  }
  render() {
    const { match, query, pendingAuditNum } = this.props;
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
            brandList={this.state.brandList}
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
          <span style={{ color: 'red', marginRight: '10px' }}> 待审核数: {pendingAuditNum}条 </span>
          <Button
            type="primary"
            onClick={() => {
              this.props.history.push(`/dealerList/add`);
            }}
          >
            新增经销商
          </Button>
        </OperationArea>
      </ViewWrapper>
    );
  }
}
const columnsList = [
  {
    title: '经销商名称',
    dataIndex: 'distributorName',
    fixed: 'left',
  },
  {
    title: '品牌',
    dataIndex: 'businessBrand',
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
    dataIndex: 'businessAddress',
  },
  {
    title: '二网查库经办人',
    dataIndex: 'operatorName',
  },
  {
    title: '联系电话',
    dataIndex: 'operatorPhone',
  },
  {
    title: '审核状态',
    dataIndex: 'status',
    render: text => {
      if (text == 0) {
        return '正常';
      } else if (text == 1) {
        return '待上传资料';
      } else if (text == 2) {
        return '待审核';
      } else if (text == 9) {
        return '停用';
      }
    },
  },
  {
    title: '录入时间',
    dataIndex: 'createTime',
  },
];

const mapStateToProps = store => ({
  loading: store.userinfoMana.loading,
  list: store.userinfoMana.dealerList.list,
  pendingAuditNum: store.userinfoMana.dealerList.pendingAuditNum,
  paging: store.userinfoMana.dealerList.paging,
  query: store.userinfoMana.dealerList.query,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => {
      dispatch(getDealerList(data, paging));
    },
    updateQuery: data => {
      dispatch(updateDealerList(data));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(spotEwBlack);
