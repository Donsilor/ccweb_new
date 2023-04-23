import React, { Component } from 'react';
import { Modal, message } from 'antd';
import { connect } from 'react-redux';
import { getBrandMana, updateBrandMana } from 'redux/modules/warningInd';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
import { brandManaColumns } from './Analy/Columns';
const { confirm } = Modal;
class warningBrandMana extends Component {
  state = {
    brandList: [],
  };
  componentDidMount() {
    this.getBrandList();
    this.handleSearch(this.props.query.value);
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
  getBrandList() {
    httpCommonClient.post(`/warning/v1.0/warning/brand/list/all`, {}).then(respone => {
      if (respone.data.code === 200) {
        this.setState({ brandList: respone.data.data });
      }
    });
  }
  //列表操作
  renderColumn = () => {
    const columns = [];
    columns.push({
      title: '操作',
      render: record =>
        record.cooperateStatus == 0 && (
          <a
            href="javascript:;"
            onClick={() => {
              let self = this;
              confirm({
                title: '请确认是否与该品牌不合作?',
                onOk() {
                  httpCommonClient
                    .post(`/warning/v1.0/warning/supplyChainDealerRel/update/noCooperate`, {
                      brandName: record.brandName,
                      dealerName: record.dealerName,
                    })
                    .then(({ data = {} }) => {
                      if (data.code === 200) {
                        message.success(data.message);
                        self.handlePageChange();
                      } else {
                        message.error(data.message);
                      }
                    });
                },
              });
            }}
          >
            不合作
          </a>
        ),
    });
    return brandManaColumns.concat(columns);
  };
  render() {
    const { match, query, list, loading } = this.props;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm
            onSearch={this.handleSearch}
            path={match.path}
            query={query}
            onUpdateQuery={this.props.updateQuery}
            brandList={!match.path.includes('shiftA') && this.state.brandList}
          />
        </FormArea>
        <div>
          <EwAuditTable
            columns={this.renderColumn()}
            loading={loading}
            data={list}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
          />
        </div>
      </ViewWrapper>
    );
  }
}
const mapStateToProps = store => ({
  loading: store.warningInd.loading,
  list: store.warningInd.brandMana.list,
  paging: store.warningInd.brandMana.paging,
  query: store.warningInd.brandMana.query,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getBrandMana(data, paging)),
    updateQuery: data => {
      dispatch(updateBrandMana({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(warningBrandMana);
