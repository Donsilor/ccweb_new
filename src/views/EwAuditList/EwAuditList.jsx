import React, { Component, Fragment } from 'react';
import { Alert, Button, message, Divider, Modal, Icon, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { matchPath } from 'react-router';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import ewAuditTableColumn from 'components/EwAuditTableColumn';
import { exportFile } from 'common/utils';
import ExcepModalForm from './ExcepModalForm';
import ContractModalForm from './ContractModalForm';
import { ViewWrapper, FormArea, OperArea } from 'layouts/ViewWrapper';

const FORMAT = 'YYYY-MM-DD';
export default class EwAuditList extends Component {
  state = {
    selectedRowKeys: [],
    modalLoading: false,
    contractModalVisible: false,
    record: {},
  };

  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }

  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };

  handleSearch = (formValues, page, pageSize) => {
    const values = { ...formValues };
    try {
      const {
        disApplyTimeRange,
        ptAuditTimeRange,
        bankAuditTimeRange,
        exceptionTimeRange,
        contractPostTimeRange,
      } = formValues;
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
      if (exceptionTimeRange) {
        // 异常时间
        const [startTime, endTime] = exceptionTimeRange;
        values.excepStartTime = startTime && startTime.format(FORMAT);
        values.excepEndTime = endTime && endTime.format(FORMAT);
        delete values.exceptionTimeRange;
      }
      if (bankAuditTimeRange) {
        // 复审时间
        const [startTime, endTime] = bankAuditTimeRange;
        values.fsStartTime = startTime && startTime.format(FORMAT);
        values.fsEndTime = endTime && endTime.format(FORMAT);
        delete values.bankAuditTimeRange;
      }
      if (contractPostTimeRange) {
        // 合同邮寄时间
        const [startTime, endTime] = contractPostTimeRange;
        values.contractPostStartTime = startTime && startTime.format(FORMAT);
        values.contractPostEndTime = endTime && endTime.format(FORMAT);
        delete values.contractPostTimeRange;
      }
    } catch (e) {
      console.error(e);
    }

    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };

  handleExportTotal = () => {
    const hide = message.loading('批量导出中，请稍后', 0);
    this.props
      .exportTotal(this.props.query.value)
      .then(({ payload } = {}) => {
        const result = exportFile(payload);
        result && message.warning(result, 2.5);
      })
      .catch(err => {
        return message.error('批量导出失败，请重试', 2.5);
      })
      .then(() => {
        hide();
      });
  };

  showContractModal = record => e => {
    record &&
      this.setState({
        contractModalVisible: true,
        modalLoading: false,
        record,
      });
  };

  confirmContract = value => {
    const { record } = this.state;
    this.setState({
      modalLoading: true,
    });
    record &&
      this.props
        .confirmContract({
          id: record.id,
          ...value,
        })
        .then(({ payload }) => {
          if (payload && payload.data && payload.data.result === 0) {
            message.success('声明信息更新成功！');
          } else {
            return Promise.reject(new Error(payload));
          }
        })
        .catch(err => {
          return message.error('声明信息更新失败，请重试！');
        })
        .then(() => {
          this.setState({
            modalLoading: false,
            contractModalVisible: false,
          });
          this.handleSearch(this.props.query.value);
        });
  };

  handleExcepModalOk = e => {
    this.excepForm && this.excepForm.handleSubmit();
  };

  handleContractModalOk = e => {
    this.contractForm && this.contractForm.handleSubmit();
  };

  handleCancel = () => {
    this.setState({
      excepModalVisible: false,
      contractModalVisible: false,
    });
  };

  renderCustomOperCol = () => {
    const { match } = this.props;
    const matchResult = matchPath(match.path, {
      path: '/:menuId/:subMenuId/:tab',
    });
    const { params: { menuId, subMenuId, tab } = {} } = matchResult;
    return {
      title: '操作',
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <Link
            to={{
              pathname: `/${menuId}/detail/authInfo/${record.id}`,
              search: `${subMenuId === 'list' ? `?tab=${tab}` : ''}`,
            }}
          >
            <Tooltip title="查看">
              <Icon type="search" style={{ color: 'rgba(0, 0, 0, 0.65)' }} />
            </Tooltip>
          </Link>
          <Divider type="vertical" />
          {record.status === 0 && record.isfirst !== 2 && (
            <a href="javascript:;" className={'operButton'} onClick={this.showContractModal(record)}>
              <Tooltip title="声明签收">
                <Icon type="file-done" style={{ color: '#1890ff' }} />
              </Tooltip>
            </a>
          )}
        </Fragment>
      ),
    };
  };

  renderColumns = () => {
    const { match, showCustomOperCol } = this.props;
    const columns = ewAuditTableColumn(match.path);
    if (!showCustomOperCol) {
      return columns;
    } else {
      columns.splice(-1, 1, this.renderCustomOperCol());
      return columns;
    }
  };

  handleSelectRow = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  handleExportRow = selectedRowKeys => {
    const hide = message.loading('批量导出中，请稍后', 0);
    this.props
      .exportSelected({
        ids: selectedRowKeys.join(),
      })
      .then(({ payload } = {}) => {
        const result = exportFile(payload);
        hide();
        result && message.warning(result, 2.5);
      })
      .catch(err => {
        hide();
        message.error('批量导出失败，请重试', 2.5);
      });
  };

  render() {
    const { match, query, showTableOperArea } = this.props;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm onSearch={this.handleSearch} path={match.path} query={query} onUpdateQuery={this.props.updateQuery} />
        </FormArea>
        <div>
          <EwAuditTable
            columns={this.renderColumns()}
            loading={this.props.loading}
            data={this.props.list}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
            showTableOperArea={showTableOperArea}
            onSelectRow={this.handleSelectRow}
            onOperMultipleRow={this.handleExportRow}
          />
        </div>
        <Modal
          title="声明签收"
          visible={this.state.contractModalVisible}
          onOk={this.handleContractModalOk}
          confirmLoading={this.state.modalLoading}
          onCancel={this.handleCancel}
          width={780}
          destroyOnClose
        >
          <ContractModalForm
            wrappedComponentRef={form => (this.contractForm = form)}
            onSubmit={this.confirmContract}
            record={this.state.record}
          />
        </Modal>
      </ViewWrapper>
    );
  }
}
