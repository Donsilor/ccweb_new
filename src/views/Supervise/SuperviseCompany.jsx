import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSuperviseCompanyCount } from '../../redux/modules/supervise';
import EwAuditTable from '../../components/EwAuditTable';
import { ViewWrapper } from '../../layouts/ViewWrapper';
import * as ColList from '../../components/EwAuditTableColumn/columnItem.jsx';

class SuperviseCompany extends Component {
  componentDidMount() {
    this.props.fetch();
  }

  getColumns() {
    // const { match } = this.props;
    const columns = [
      ColList.companyColumn,
      ColList.dealerCountColumn,
      ColList.rateColumn,
      ColList.repoCntColumn,
      ColList.countColumn,
    ];

    // columns.map(col => {
    //   if (col.dataIndex === 'action') {
    //     col.render = (text, record) => {
    //       return (
    //         <Fragment>
    //           <a onClick={this.getLog(record.id)}>查看</a>
    //         </Fragment>
    //       );
    //     };
    //   }
    // });

    return columns;
  }

  render() {
    return (
      <ViewWrapper>
        <EwAuditTable
          columns={this.getColumns()}
          loading={this.props.loading}
          data={this.props.list}
          onPageChange={() => {}}
          pagination={false}
        />
      </ViewWrapper>
    );
  }
}

function mapStateToProps(store) {
  return {
    loading: store.supervise.loading,
    list: store.supervise.company.list,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: () => dispatch(fetchSuperviseCompanyCount()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuperviseCompany);
