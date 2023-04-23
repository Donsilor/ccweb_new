import React, { Component, Fragment } from 'react';
import { Button, Tooltip, Icon, message } from 'antd';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import ewAuditTableColumn from 'components/EwAuditTableColumn';
import { exportFile } from 'common/utils';
import { ViewWrapper, FormArea, OperArea } from 'layouts/ViewWrapper';

const FORMAT = 'YYYY-MM-DD';
export default class Ledger extends Component {
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };

  reformatValue = formValues => {
    const values = { ...formValues };
    try {
      const { disApplyTimeRange, ptAuditTimeRange, bankAuditTimeRange, bondSaveTimeRange } = formValues;
      if (disApplyTimeRange) {
        // 经销商申请时间
        const [startTime, endTime] = disApplyTimeRange;
        values.startTime = startTime && startTime.format(FORMAT);
        values.endTime = endTime && endTime.format(FORMAT);
        delete values.disApplyTimeRange;
      }
      if (ptAuditTimeRange) {
        // 平台初审时间
        const [startTime, endTime] = ptAuditTimeRange;
        values.firstStartTime = startTime && startTime.format(FORMAT);
        values.firstEndTime = endTime && endTime.format(FORMAT);
        delete values.ptAuditTimeRange;
      }
      if (bondSaveTimeRange) {
        // 存入日期
        const [startTime, endTime] = bondSaveTimeRange;
        values.bondSaveDateStart = startTime && startTime.format(FORMAT);
        values.bondSaveDateEnd = endTime && endTime.format(FORMAT);
        delete values.bondSaveTimeRange;
      }
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
    return values;
  };

  handleSearch = (formValues, page, pageSize) => {
    this.props.fetch(this.reformatValue(formValues), {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };

  handleExport = () => {
    this.form.updateQuery();
    this.props
      .export(this.reformatValue(this.props.query.value))
      .then(({ payload }) => {
        const result = exportFile(payload);
        result && message.warning(result, 2.5);
      })
      .catch(err => {
        console.error(err.message);
      });
  };

  handleDetailQuery = record => () => {
    let { history, setDetailQuery, jumpToMenu, match, location } = this.props;
    setDetailQuery && setDetailQuery(record);
    setDetailQuery && this.forceUpdate();
    const existSearch = location.search;
    let search = '';
    if (!jumpToMenu) {
      jumpToMenu = `primaryAudit/detail/authInfo/${record['id']}`;
    }
    let newMenu = (match.path && match.path.slice(1)) || '';
    if (existSearch) {
      search = `${existSearch}${newMenu ? `&newMenu=${newMenu}` : ''}`;
    } else {
      search = `${newMenu ? `?menu=${newMenu}` : ``}`;
    }
    history.push({
      pathname: `/${jumpToMenu}`,
      search,
    });
  };

  renderColumn = () => {
    const { match } = this.props;
    const columns = ewAuditTableColumn(match.path);
    match.path !== '/ewOnlineDetail' &&
      columns.push({
        title: '操作',
        align: 'center',
        fixed: 'right',
        width: 60,
        render: (text, record) => (
          <Fragment>
            <Tooltip title="查看">
              <a href="javascript:;" onClick={this.handleDetailQuery(record)}>
                <Icon type="search" style={{ color: 'rgba(0, 0, 0, 0.65)' }} />
              </a>
            </Tooltip>
          </Fragment>
        ),
      });
    return columns;
  };

  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }

  render() {
    const { match, query, rowKey, location, hideExport } = this.props;
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
        {!hideExport && (
          <OperArea>
            <Button type="primary" icon="export" onClick={this.handleExport}>
              导出报表
            </Button>
          </OperArea>
        )}
        <div>
          <EwAuditTable
            columns={this.renderColumn()}
            loading={this.props.loading}
            data={this.props.list}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
            rowKey={rowKey}
          />
        </div>
        {(match.path === '/bondDetail' || match.path === '/ewOnlineDetail') &&
          location &&
          location.search &&
          location.search.includes('?menu=') && (
            <OperationArea>
              <BackToList />
            </OperationArea>
          )}
      </ViewWrapper>
    );
  }
}
