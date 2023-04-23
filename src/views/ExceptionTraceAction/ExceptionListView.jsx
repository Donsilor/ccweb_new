import React, { Component, Fragment, EsalesInfoForm } from 'react';
import { Menu, Dropdown, Tooltip, Button, Icon, message, Divider, Table, Modal } from 'antd';
import CCForm from 'components/CCForm';
import { ViewWrapper, FormArea, OperArea } from 'layouts/ViewWrapper';
import exceptionColum, { renderExcepClassName } from './ExceptionColum';
import OperationArea from 'components/OperationArea';
import * as AdcMapper from './modalMapper';
import { exportFile } from 'common/utils';
import { Link } from 'react-router-dom';
import { matchPath } from 'react-router';
import _without from 'lodash/without';
import ExcepTypeModal from './ExcepTypeModal';
import ExceptionLog from './ExceptionLog';
import styles from './style.module.less';
import ColorTips from './ColorTips';

const MenuItem = Menu.Item;
const FORMAT = 'YYYY-MM-DD';
export default class ExceptionListView extends Component {
  state = {
    record: {},
    adcType: {},
    expandedRowKeys: [],
    modalShowing: false,
    showLogModal: false,
    modalLoading: false,
    isExporting: false,
    selectedRowKeys: []
  };
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };

  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }
  handleSearch = (values, page, pageSize) => {
    this.props
      .fetch(this.reformatValue(values), {
        pageNum: page || this.props.paging.current,
        pageSize: pageSize || this.props.paging.pageSize,
      })
      .then(() => {
        this.setState({
          expandedRowKeys: [],
        });
      });
  };

  handleExpand = (expanded, record) => {
    const { expandedRowKeys } = this.state;
    const { spottestId, spotdetailId } = record;
    if (expanded) {
      this.props.specifyParentId(spotdetailId);
      !expandedRowKeys.includes(record.spotdetailId) && expandedRowKeys.push(record.spotdetailId);
      this.setState({
        factory: record,
        expandedRowKeys,
      });
      this.props.fetchSubList({
        parentSpotId: spottestId,
        parentSpotDetailId: spotdetailId,
      });
    } else {
      this.setState({
        expandedRowKeys: _without(expandedRowKeys, record.spotdetailId),
      });
    }
  };

  handleExpandRows = expandedRowKeys => {
    this.setState({ expandedRowKeys });
  };

  handleExport = () => {
    const hide = message.loading('导出中，请稍后。。。', 0);
    this.setState({
      isExporting: true,
    });
    this.props
      .exportData(this.reformatValue(this.props.query.value))
      .then(res => {
        try {
          const result = exportFile(res);
          result && message.warning(result, 2.5);
        } catch (error) {
          return Promise.reject(error);
        }
      })
      .catch(err => {
        return message.error(err || '批量导出失败，请重试', 2.5);
      })
      .then(() => {
        hide();
        this.setState({
          isExporting: false,
        });
      });
  };

  reformatValue = formValues => {
    const values = { ...formValues };
    try {
      const { bookTime } = formValues;
      if (bookTime) {
        // 任务下发日期
        const [startTime, endTime] = bookTime;
        values.startTime = startTime && startTime.format(FORMAT);
        values.endTime = endTime && endTime.format(FORMAT);
        delete values.bookTime;
      }
    } catch (e) {
      console.error(e);
    }
    return values;
  };

  showModal = (record, adcType) => e => {
    if (!record) return;
    this.setState({
      record,
      adcType,
      modalShowing: true,
    });
  };
  logModal = record => e => {
    if (!record) return;
    this.setState({
      showLogModal: true,
      record,
    });
  };
  handleModalOk = () => {
    this.setState({
      modalShowing: false,
      selectedRowKeys: []
    });
    this.handleSearch(this.props.query.value);
  };
  handleCancel = () => {
    this.setState({
      modalShowing: false,
    });
  };
  handleLogCancel = () => {
    this.setState({
      showLogModal: false,
    });
  };

  renderColumn = () => {
    let columns = [...exceptionColum];
    const { match } = this.props;
    const matchResult = matchPath(match.path, {
      path: '/:menuId/:subMenuId/:tab',
    });
    const { params: { menuId, subMenuId, tab } = {} } = matchResult;
    if (menuId === 'movingException') {
      columns = columns.filter(
        col =>
          col.dataIndex !== 'ewNotPassFlagName' &&
          col.dataIndex !== 'ewRemarkExc' &&
          col.dataIndex !== 'secondSoldFlag' &&
          col.dataIndex !== 'modifyBookTime' &&
          col.dataIndex !== 'description'
      );
    } else {
      // columns = columns.filter(col => col.dataIndex !== 'moveApplyTime');
    }
    columns.push({
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align: 'center',
      fixed: 'right',
      width: tab === 'todo' ? 170 : 105,
      render: (text, record) => {
        const {
          btnSecondSoldFlag,
          btnMoveFlag,
          btnReturnFlag,
          btnConfirmRepaymentFlag,
          btnTimeOutConfirmRepaymentFlag,
          btnNewCarShowFlag,
          btnNewSpotFlag,
          btnBranchStoreFlag,
          btnLiveCompletionFlag,
          btnNotLiveFlag,
          btnHandleEndFlag,
        } = record;
        const menuList = [];
        btnReturnFlag === 1 &&
          menuList.push(
            <MenuItem key="退回">
              <a href="javascript:;" onClick={this.showModal(record, AdcMapper.returnAdc)}>
                <span>退回</span>
              </a>
            </MenuItem>
          );
        btnSecondSoldFlag === 1 &&
          menuList.push(
            <MenuItem key="二网确认私售1">
              <a href="javascript:;" onClick={this.showModal(record, AdcMapper.confirmSellingAdc)}>
                <span>二次确认私售</span>
              </a>
            </MenuItem>
          );
        btnConfirmRepaymentFlag === 1 &&
          menuList.push(
            <MenuItem type="vertical" key="确认还款1">
              <a href="javascript:;" onClick={this.showModal(record, AdcMapper.confirmRepaymentAdc)}>
                <span>确认还款</span>
              </a>
            </MenuItem>
          );
        btnTimeOutConfirmRepaymentFlag === 1 &&
          menuList.push(
            <MenuItem type="vertical" key="超时确认还款">
              <a href="javascript:;" onClick={this.showModal(record, AdcMapper.timeOutRepaymentAdc)}>
                <span>超时确认还款</span>
              </a>
            </MenuItem>
          );
        btnBranchStoreFlag === 1 &&
          menuList.push(
            <MenuItem type="vertical" key="分店上线">
              <a href="javascript:;" onClick={this.showModal(record, AdcMapper.subStoreReleaseAdc)}>
                <span>分店上线</span>
              </a>
            </MenuItem>
          );
        btnNotLiveFlag === 1 &&
          menuList.push(
            <MenuItem type="vertical" key="暂不上线">
              <a href="javascript:;" onClick={this.showModal(record, AdcMapper.stopReleaseAdc)}>
                <span>暂不上线</span>
              </a>
            </MenuItem>
          );
        btnLiveCompletionFlag === 1 &&
          menuList.push(
            <MenuItem type="vertical" key="上线完成">
              <a href="javascript:;" onClick={this.showModal(record, AdcMapper.finishReleaseAdc)}>
                <span>上线完成</span>
              </a>
            </MenuItem>
          );
        btnMoveFlag === 1 &&
          menuList.push(
            <MenuItem type="vertical" key="发起移动">
              <a href="javascript:;" onClick={this.showModal(record, AdcMapper.startMovingAdc)}>
                <span>发起移动</span>
              </a>
            </MenuItem>
          );
        btnNewSpotFlag === 1 &&
          menuList.push(
            <MenuItem type="vertical" key="发起新抽查">
              <a href="javascript:;" onClick={this.showModal(record, AdcMapper.startNewSpotAdc)}>
                <span>发起新抽查</span>
              </a>
            </MenuItem>
          );
        btnNewCarShowFlag === 1 &&
          menuList.push(
            <MenuItem type="vertical" key="发起车展申请">
              <a href="javascript:;" onClick={this.showModal(record, AdcMapper.startNewCarShowAdc)}>
                <span>发起车展申请</span>
              </a>
            </MenuItem>
          );
        return (
          <div>
            {record.parentSpotDetailId === 0 && (
              <Link
                to={{
                  pathname: `/${menuId}/detail/${record.spotdetailId}`,
                  search: `${subMenuId === 'list' ? `?tab=${tab}` : ''}`,
                }}
              >
                <span>查看</span>
              </Link>
            )}
            {tab === 'todo' &&
              record.parentSpotDetailId === 0 && [
                <Divider type="vertical" key="Divider" />,
                <Dropdown
                  overlay={<Menu>{menuList}</Menu>}
                  trigger={['click']}
                  key="Dropdown"
                  disabled={menuList.length === 0}
                >
                  <a className="ant-dropdown-link" href="#">
                    操作 <Icon type="down" />
                  </a>
                </Dropdown>,
              ]}

            {record.parentSpotDetailId !== 0 &&
              btnHandleEndFlag === 1 &&
              record.endFlag === 0 && [
                <a href="javascript:;" onClick={this.showModal(record, AdcMapper.startHandleEndAdc)} key="close">
                  关闭
                </a>,
                <Divider type="vertical" key="Divider" />,
              ]}
            {record.parentSpotDetailId === 0 && <Divider type="vertical" key="Divider" />}
            <a href="javascript:;" onClick={this.logModal(record)}>
              日志
            </a>
          </div>
        );
      },
    });
    return columns;
  };

  render() {
    const { match, query } = this.props;
    const matchResult = matchPath(match.path, {
      path: '/:menuId/:subMenuId/:tab',
    });
    const { params: { menuId } = {}, params: { tab } = {} } = matchResult;
    const isMoving = menuId === 'movingException';
    const { selectedRowKeys } = this.state
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm
            onSearch={this.handleSearch}
            query={query}
            path={match.path}
            onUpdateQuery={this.props.updateQuery}
            enableExport
            onExport={this.handleExport}
            isExporting={this.state.isExporting}
            wrappedComponentRef={form => (this.form = form)}
          />
        </FormArea>
        <div className={styles.exceptionListView}>
          <Table
            columns={this.renderColumn()}
            loading={this.props.loading}
            dataSource={this.props.list}
            pagination={{
              ...this.props.paging,
              pageSizeOptions: ['10', '30', '50', '100'],
              showSizeChanger: true,
              showQuickJumper: true,
              onChange: this.handlePageChange,
              onShowSizeChange: this.handlePageChange,
              showTotal: total => {
                return `共 ${total} 条数据`;
              },
            }}
            indentSize={20}
            scroll={{ x: true }}
            rowClassName={record => renderExcepClassName(record).className || ''}
            expandedRowKeys={this.state.expandedRowKeys}
            onExpand={this.handleExpand}
            onExpandedRowsChange={this.handleExpandRows}
            rowKey="spotdetailId"
            rowSelection={tab == 'todo' ? {
              selectedRowKeys,
              // getCheckboxProps: (record) => ({
              //   disabled: record.bankExcReseaonName !== "超时未拍照",
              // }),
              onChange: (selectedRowKeys) => {
                this.setState({ selectedRowKeys });
              },
            } : null}
          // rowClassName={task => (task.hasSubTasks == 1 ? 'noExpand' : '')}
          />
          <ColorTips isMoving={isMoving} />
        </div>

        {this.state.modalShowing && (
          <ExcepTypeModal
            title={this.state.adcType.adcTitle}
            visible={this.state.modalShowing}
            onOk={this.handleModalOk}
            onCancel={this.handleCancel}
            configList={this.state.adcType.adcConfig}
            onSubmit={this.state.adcType.endSkill}
            record={this.state.record}
            destroyOnClose
          />
        )}
        {this.state.showLogModal && (
          <ExceptionLog
            showModal={this.state.showLogModal}
            handleCancel={this.handleLogCancel}
            record={this.state.record}
          />
        )}
        {tab == 'todo' &&
          <OperationArea>
            <Button type="primary" onClick={() => {
              if (!selectedRowKeys.length) {
                message.error('请先选择任务！')
                return
              }
              this.setState({
                record: { selectedRowKeys },
                adcType: AdcMapper.extendedTimeAdcMore,
                modalShowing: true,
              });
            }}>
              批量延长时间处理
            </Button>
          </OperationArea>}
      </ViewWrapper>
    );
  }
}
