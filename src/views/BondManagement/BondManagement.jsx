import React, { Component, Fragment } from 'react';
import { Alert, Button, message, Tooltip, Icon } from 'antd';
import styles from './style.module.less';
import { exportFile } from 'common/utils';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import ewAuditTableColumn from 'components/EwAuditTableColumn';
import { ViewWrapper, FormArea, OperArea } from 'layouts/ViewWrapper';

const FORMAT = 'YYYY-MM-DD';
export default class BondManagement extends Component {
  state = {
    selectedRowKeys: [],
  };

  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };

  handleSearch = (formValues, page, pageSize) => {
    const values = { ...formValues };
    try {
      const { bankAuditTimeRange } = formValues;
      if (bankAuditTimeRange) {
        // 复审时间
        const [startTime, endTime] = bankAuditTimeRange;
        values.fsStartTime = startTime && startTime.format(FORMAT);
        values.fsEndTime = endTime && endTime.format(FORMAT);
        delete values.bankAuditTimeRange;
      }
    } catch (e) {
      console.error(e);
    }
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };
  handleSelectRow = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  renderCol = () => {
    const { match, customOper } = this.props;
    if (!customOper) {
      return ewAuditTableColumn(match.path);
    } else {
      const columns = ewAuditTableColumn(match.path);

      return columns;
    }
  };

  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }

  render() {
    const { match, query } = this.props;
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
        <OperArea>
          <EwAuditTable
            columns={this.renderCol()}
            loading={this.props.loading}
            data={this.props.list}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
            rowKey={'bondFlowId'}
          />
        </OperArea>
      </ViewWrapper>
    );
  }
}
