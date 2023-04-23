import React, { Component } from 'react';
import { Button, Modal, message } from 'antd';
import OperationArea from 'components/OperationArea';
import { connect } from 'react-redux';
import { ViewWrapper } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
import ModalForm from 'components/ModalForm';
import { getBrandlist, updateBrandlist } from 'redux/modules/warningInd';
const { confirm } = Modal;
export class brandMana extends Component {
  state = {
    showModal: false,
    title: '新增',
  };
  columns = [
    { title: '品牌', dataIndex: 'name' },
    { title: '经销商数', dataIndex: 'dealerNum' },
    { title: '换证额度（万元）', dataIndex: 'quota' },
    { title: '供应链', dataIndex: 'supplyChains' },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <div>
          <a
            href="javascript:;"
            onClick={() => {
              this.setState({ record, title: '修改', showModal: true });
            }}
          >
            修改
          </a>
          &nbsp;&nbsp;
          {!record.dealerNum && (
            <a href="javascript:;" onClick={this.deleOper(record)}>
              删除
            </a>
          )}
        </div>
      ),
    },
  ];
  handleCancel = () => {
    this.setState({
      showModal: false,
    });
  };
  updOrderExpSubmitOk = () => {
    this.setState({ showModal: false });
    this.handleSearch();
  };
  updOrderExpSubmit = formData => {
    return httpCommonClient
      .post(
        `/warning/v1.0/warning/brand/${this.state.title == '新增' ? 'add' : 'update'}`,
        this.state.title == '新增'
          ? {
              name: formData.name,
            }
          : { name: formData.name, id: this.state.record.id }
      )
      .then(({ data = {} }) => {
        if (data.code === 200) {
          return Promise.resolve({
            data: {
              result: 0,
            },
          });
        } else {
          return Promise.resolve({
            data: {
              result: 1,
              msg: data.message,
            },
          });
        }
      });
  };
  //删除
  deleOper = record => () => {
    let self = this;
    confirm({
      title: '请确认是否删除该品牌?',
      onOk() {
        httpCommonClient.post(`/warning/v1.0/warning/brand/delete`, { id: record.id }).then(respone => {
          if (respone.data.code === 200) {
            message.success('操作成功');
          } else {
            message.error('操作失败');
          }
          self.handleSearch();
        });
      },
    });
  };
  componentDidMount() {
    this.handleSearch();
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  handleSearch = (formValues, page, pageSize) => {
    const values = { ...formValues };
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };
  render() {
    return (
      <ViewWrapper>
        <EwAuditTable
          columns={this.columns}
          data={this.props.list}
          loading={this.props.loading}
          paging={this.props.paging}
          onChange={this.handlePageChange}
          onPageChange={this.handlePageChange}
        />
        {/*新增/修改品牌*/}
        {this.state.showModal && (
          <ModalForm
            title={`${this.state.title}品牌`}
            onOk={this.updOrderExpSubmitOk}
            onCancel={this.handleCancel}
            onSubmit={this.updOrderExpSubmit}
            configList={[
              {
                label: '品牌名称',
                type: 'input',
                key: 'name',
                required: true,
                initialValue: this.state.title == '修改' ? this.state.record.name : '',
              },
            ]}
          />
        )}
        <OperationArea>
          <Button
            type="primary"
            onClick={() => {
              this.setState({
                title: '新增',
                showModal: true,
              });
            }}
          >
            新建品牌
          </Button>
        </OperationArea>
      </ViewWrapper>
    );
  }
}

const mapStateToProps = store => ({
  loading: store.warningInd.loading,
  list: store.warningInd.brand.list,
  paging: store.warningInd.brand.paging,
  query: store.warningInd.brand.query,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getBrandlist(data, paging)),
    updateQuery: data => {
      dispatch(updateBrandlist({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(brandMana);
