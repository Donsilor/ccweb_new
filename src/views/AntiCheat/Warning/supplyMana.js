import React, { Component } from 'react';
import { Modal, message } from 'antd';
import { connect } from 'react-redux';
import { ViewWrapper } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import ModalForm from 'components/ModalForm';
import { httpCommonClient } from 'common/axios';
import { getSupplyChain, updateSupplyChain } from 'redux/modules/warningInd';
const { confirm } = Modal;
export class supplyMana extends Component {
  state = {
    showModal: false,
    brandList: [],
  };
  columns = [
    { title: '供应链', dataIndex: 'name' },
    { title: '供应链经销商数', dataIndex: 'dealerNum' },
    { title: '对应品牌', dataIndex: 'brandName' },
    {
      title: '操作',
      render: (text, record) =>
        !record.brandName && (
          <a
            href="javascript:;"
            onClick={() => {
              this.getBrandList();
              this.setState({ record, showModal: true });
            }}
          >
            关联
          </a>
        ),
    },
  ];
  //查询所以品牌
  getBrandList() {
    httpCommonClient.post(`/warning/v1.0/warning/brand/list/all`, {}).then(respone => {
      if (respone.data.code === 200) {
        let obj = [];
        respone.data.data.map(item => obj.push({ value: item.id, name: item.name }));
        this.setState({ brandList: obj });
      }
    });
  }
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
  updOrderExpSubmitOk = () => {
    this.setState({ showModal: false });
    this.handleSearch();
  };
  updOrderExpSubmit = formData => {
    return httpCommonClient
      .post(`/warning/v1.0/warning/supplyChain/update`, { brandId: formData.brandId, id: this.state.record.id })
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
              msg: data.msg || '操作失败，请重试',
            },
          });
        }
      });
  };
  handleCancel = () => {
    this.setState({
      showModal: false,
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
        {/*修改*/}
        {this.state.showModal && (
          <ModalForm
            title="关联品牌"
            onOk={this.updOrderExpSubmitOk}
            onCancel={this.handleCancel}
            onSubmit={this.updOrderExpSubmit}
            configList={[
              {
                label: '供应链对应品牌',
                type: 'select',
                key: 'brandId',
                required: true,
                optionList: this.state.brandList,
                initialValue: this.state.record.brandName && this.state.record.brandId,
              },
            ]}
          />
        )}
      </ViewWrapper>
    );
  }
}

const mapStateToProps = store => ({
  loading: store.warningInd.loading,
  list: store.warningInd.supplyChain.list,
  paging: store.warningInd.supplyChain.paging,
  query: store.warningInd.supplyChain.query,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getSupplyChain(data, paging)),
    updateQuery: data => {
      dispatch(updateSupplyChain({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(supplyMana);
