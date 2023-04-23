import React, { Component } from 'react';
import { Button, Tooltip, Icon, Divider, Cascader, message, Modal, Table } from 'antd';
import { matchPath, Link } from 'react-router';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import OperationArea from 'components/OperationArea';
import CCForm from 'components/CCForm';
import { httpCommonClient } from 'common/axios';
import {
  commonTodoColumns,
  commonDoneColumns,
  reportModalColumns,
  certificateTodo,
  certificateDone,
  moveTodoColumns,
  moveDoneColumns,
} from './Columns';
import ManuSpotModal from './ManuSpotModal';
import _isEmpty from 'lodash/isEmpty';
import styles from './style.module.less';
const confirm = Modal.confirm;
export default class SpottestListView extends Component {
  state = {
    showManuSpotModal: false,
    showReportModal: false,
    record: {},
    excepList: [],
    financialList: [],
  };

  componentDidMount() {
    const { menuId } = this.props;
    const spottesttype = menuId === 'commonDone' ? 20 : 50;
    this.excReasonList(spottesttype);
    this.financialList();
    this.handleSearch();
  }

  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };

  handleSearch = (values, page, pageSize) => {
    this.props.fetch(values || this.props.query.value, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
    this.financialList();
  };
  //终止任务
  stopTask = record => {
    const self = this;
    if (_isEmpty(record)) {
      return;
    }
    confirm({
      title: '您真的要终止该任务吗？',
      onOk() {
        httpCommonClient
          .post(`/self-car/v1.0/selfSpottestDetail/update/stop`, { id: record.id, terminationRemark: 'TBC' })
          .then(({ data = {} }) => {
            if (data.code === 200) {
              message.success('终止任务成功');
              self.handleSearch();
            } else {
              return Promise.reject(data.message || '终止任务失败');
            }
          })
          .catch(err => {
            message.error(err.message || err);
          });
      },
    });
  };
  //取消移动
  cancelMove = record => {
    let self = this;
    confirm({
      title: '请再次确认是否取消移动',
      onOk() {
        httpCommonClient
          .post(`/self-car/v1.0/moveCars/selfMoveCars/cance-move/${record.spottest.taskId}`, {
            remark: '移动任务取消移动',
          })
          .then(res => {
            if (res.data.code == 200) {
              message.success('操作成功');
              self.handleSearch();
            } else {
              return Promise.reject(res.data.message);
            }
          })
          .catch(err => {
            message.error('操作失败');
          });
      },
    });
  };
  calcColumns = () => {
    let columns = [];
    const { menuId } = this.props;
    switch (menuId) {
      case 'commonTodo':
        {
          columns = [...commonTodoColumns];
        }
        break;
      case 'commonDone':
        {
          columns = [...commonDoneColumns];
        }
        break;
      case 'certificateTodo':
        {
          columns = [...certificateTodo];
        }
        break;
      case 'certificateDone':
        {
          columns = [...certificateDone];
        }
        break;
      case 'movingTodo':
        {
          columns = [...moveTodoColumns];
        }
        break;
      case 'movingDone':
        {
          columns = [...moveDoneColumns];
        }
        break;
      default:
        columns = [...commonTodoColumns];
        break;
    }
    columns.push({
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      fixed: 'right',
      align: 'center',
      render: (text, record) => {
        return (
          <div>
            {menuId !== 'certificateTodo' &&
              menuId !== 'certificateDone' && [
                <Tooltip title="所属信息" key="所属信息">
                  <a
                    href="javascript:;"
                    onClick={() =>
                      this.setState({
                        showReportModal: true,
                        record,
                      })
                    }
                  >
                    <Icon type="user" style={{ color: 'rgba(0, 0, 0, 0.65)' }} />
                  </a>
                </Tooltip>,
                <Divider type="vertical" key="Divider" />,
              ]}
            {menuId !== 'certificateTodo' && menuId !== 'certificateDone' && (
              <Tooltip title="审核" key="审核">
                <a href="javascript:;" onClick={() => this.jumpToDetail(record.id)}>
                  <Icon type="search" />
                </a>
              </Tooltip>
            )}
            {(menuId === 'certificateTodo' || menuId === 'certificateDone') && (
              <Tooltip title="审核" key="审核">
                <a href="javascript:;" onClick={() => this.jumpToDetail(record.id, 'cert')}>
                  <Icon type="search" />
                </a>
              </Tooltip>
            )}
            {(menuId === 'commonTodo' || menuId === 'movingTodo') && <Divider type="vertical" key="Divider" />}
            {menuId === 'commonTodo' && (
              <Tooltip title="终止" key="终止">
                <a href="javascript:;" onClick={() => this.stopTask(record)}>
                  <Icon type="poweroff" style={{ color: 'red' }} />
                </a>
              </Tooltip>
            )}
            {menuId === 'movingTodo' && (
              <Tooltip title="取消移动" key="取消移动">
                <a href="javascript:;" onClick={() => this.cancelMove(record)}>
                  <Icon type="poweroff" style={{ color: 'red' }} />
                </a>
              </Tooltip>
            )}
          </div>
        );
      },
    });
    return columns;
  };

  jumpToDetail = (id, name) => {
    if (!id) {
      return;
    }
    const { match } = this.props;
    const matchResult = matchPath(match.path, {
      path: '/:menu/list/:tab',
    });
    const { params: { menu, tab } = {} } = matchResult;

    const link = {
      pathname: name ? `/${menu}/CerDetail/${id}` : `/${menu}/detail/${id}`,
      search: `?tab=${tab}`,
    };
    this.props.history.push(link);
  };
  setClassName = record => {
    let trColor = '';
    if (record.deadline && new Date(record.deadline) < new Date()) {
      if (record.status == 10 || record.status == 30 || record.unuploadNum > 0) {
        trColor = styles.trColor;
      }
    }
    return trColor;
  };
  // 抽查任务异常类型列表
  excReasonList = spottesttype => {
    httpCommonClient
      .submit('/self-car/v1.0/selfExceptionType/find/list/used', { spottesttype: spottesttype })
      .then(({ data }) => {
        if (data.code === 200) {
          let excepList = data.data;
          this.setState({ excepList });
        }
      });
  };
  // 金融产品类型列表
  financialList = () => {
    httpCommonClient.submit('/self-car/v1.0/selfFinancialProducts/find/list/all', {}).then(({ data }) => {
      if (data.code === 200) {
        let financialList = data.data;
        this.setState({ financialList });
      }
    });
  };
  render() {
    const { menuId, query, paging, dealer } = this.props;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm
            onSearch={this.handleSearch}
            path={this.props.location.pathname}
            onUpdateQuery={this.props.updateQuery}
            query={query}
            financialList={menuId === 'commonTodo' || menuId === 'commonDone' ? this.state.financialList : false}
            excReasonList={menuId === 'commonDone' || menuId === 'movingDone' ? this.state.excepList : false}
          />
        </FormArea>
        <EwAuditTable
          columns={this.calcColumns()}
          loading={this.props.loading}
          data={this.props.list}
          paging={paging}
          onChange={this.handlePageChange}
          onPageChange={this.handlePageChange}
          rowClassName={menuId.indexOf('Todo') > -1 ? this.setClassName : ''}
        />
        {menuId.indexOf('Todo') > -1 && (
          <div className={styles.iocnCer}>
            <span></span>超时未拍照
          </div>
        )}

        {this.state.showManuSpotModal && (
          <ManuSpotModal
            isCertificateSpot={menuId !== 'commonTodo'}
            description={this.state.description}
            onCancel={() =>
              this.setState({
                showManuSpotModal: false,
              })
            }
            onOk={() =>
              this.setState(
                {
                  showManuSpotModal: false,
                },
                this.handleSearch
              )
            }
          />
        )}
        {/* 所属信息 */}
        <Modal
          title="所属信息"
          visible={this.state.showReportModal}
          onCancel={() =>
            this.setState({
              showReportModal: false,
            })
          }
          width={1100}
          footer={null}
          destroyOnClose
        >
          <div>
            <Table
              dataSource={[this.state.record.areaInfo]}
              columns={reportModalColumns}
              rowKey={record => `${record.areaId}`}
              pagination={false}
              loading={false}
            />
          </div>
        </Modal>

        <OperationArea>
          {menuId === 'commonTodo' && (
            <Button
              type="primary"
              icon="plus"
              onClick={() => {
                this.setState({
                  showManuSpotModal: true,
                });
              }}
            >
              新增抽查任务
            </Button>
          )}
          {/* {menuId === 'certificateTodo' && !!dealer.unsupervisedFlag && (
            <Button
              type="primary"
              icon="plus"
              onClick={() => {
                if (dealer.certificateFlag) {
                  this.setState({
                    showManuSpotModal: true,
                    description: '接证任务',
                  });
                } else {
                  message.error('对不起！盘证抽查权限尚未开通，请联系平台管理员开通权限！');
                }
              }}
            >
              接证任务
            </Button>
          )} */}
          {/* {menuId === 'certificateTodo' && !!dealer.unsupervisedFlag && (
            <Button
              type="primary"
              icon="plus"
              onClick={() => {
                if (dealer.certificateFlag) {
                  this.setState({
                    showManuSpotModal: true,
                    description: '日常盘证',
                  });
                } else {
                  message.error('对不起！盘证抽查权限尚未开通，请联系平台管理员开通权限！');
                }
              }}
            >
              日常盘证任务
            </Button>
          )} */}
          {menuId === 'certificateTodo' && (
            <Button
              type="primary"
              icon="plus"
              onClick={() => {
                if (dealer.certificateFlag) {
                  this.setState({
                    showManuSpotModal: true,
                    description: false,
                  });
                } else {
                  message.error('对不起！盘证抽查权限尚未开通，请联系平台管理员开通权限！');
                }
              }}
            >
              新增盘证任务
            </Button>
          )}
        </OperationArea>
      </ViewWrapper>
    );
  }
}
