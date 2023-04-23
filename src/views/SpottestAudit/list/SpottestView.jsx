import React, { Component } from 'react';
import { Button, Tooltip, Icon, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { matchPath } from 'react-router';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import ewAuditTableColumn from 'components/EwAuditTableColumn';
import OperationArea from 'components/OperationArea';
import ManuSpotModal from './ManuSpotModal';
import styles from './style.module.less';
import ReportModal from './ReportModal';
import ColorTips from './ColorTips';

export default class SpottestView extends Component {
  state = {
    showManuSpotModal: false,
    showCarShowSpotModal: false,
    showReportModal: false,
    record: {},
  };
  handleCancle = () => {
    this.setState({
      showManuSpotModal: false,
      showCarShowSpotModal: false,
    });
  };
  handleOk = () => {
    this.setState({
      showManuSpotModal: false,
      showCarShowSpotModal: false,
    });
    this.handleSearch(this.props.query.value);
  };
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };

  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }

  handleSearch = (values, page, pageSize) => {
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };

  renderColumn = () => {
    const { location, match } = this.props;
    const matchResult = matchPath(match.path, {
      path: '/:menuId/:subMenuId/:tab',
    });
    const { params: { menuId, subMenuId, tab } = {} } = matchResult;
    const columns = ewAuditTableColumn(`/spottestAudit/${subMenuId}/${tab}`);
    columns.push(
      {
        title: (
          <span style={{ fontSize: '8px' }}>
            <span>总数 </span><span style={{ color: '#E13C39' }}> 未上传 </span>
            <span style={{ color: '#1da02b' }}> 已上传 </span><span style={{ color: '#377df5' }}>未审核</span>
          </span>
        ),
        dataIndex: 'categoryNum',
        fixed: 'right',
        align: 'left',
        render: (text, record) => {
          return (
            <span>
              <b style={{display: 'inline-block', width: '30px', textAlign: 'center'}}>{record.totalNum}</b>/<span style={{ color: '#E13C39', display: 'inline-block', width: '30px', textAlign: 'center' }}> {record.unuploadNum}</span>/
              <span style={{ color: '#1da02b', display: 'inline-block', width: '30px', textAlign: 'center' }}>{record.uploadNum}</span>/
              <span style={{ color: '#377df5', display: 'inline-block', width: '30px', textAlign: 'center' }}>{record.unapproveNum}</span>
            </span>
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        fixed: 'right',
        align: 'center',
        render: (text, record) => {
          return (
            <div>
              <Link
                to={{
                  pathname: `/${menuId}/detail/carInfo/${record.id}`,
                  search: `${subMenuId === 'list' ? `?tab=${tab}` : ''}`,
                }}
              >
                <Tooltip title="查看">
                  <Icon type="search" style={{ color: 'rgba(0, 0, 0, 0.65)' }}/>
                </Tooltip>
              </Link>
              {tab === 'todoComplete' && [
                <Divider type="vertical" key="Divider"/>,
                <Tooltip title="查看报告" key="查看报告">
                  <a
                    href="javascript:;"
                    onClick={() =>
                      this.setState({
                        showReportModal: true,
                        record,
                      })
                    }
                  >
                    <Icon type="file-pdf" style={{ color: 'rgba(0, 0, 0, 0.65)' }}/>
                  </a>
                </Tooltip>,
              ]}
            </div>
          );
        },
      },
    );
    return columns;
  };

  render() {
    const { match, query, paging } = this.props;
    const path = this.props.match.path;
    const matchResult = matchPath(match.path, {
      path: '/:menuId/:subMenuId/:tab',
    });
    const { params: { menuId, subMenuId, tab } = {} } = matchResult;
    return (
      <ViewWrapper className={styles.spottestView}>
        <FormArea>
          <CCForm
            onSearch={this.handleSearch}
            path={`/spottestAudit/${subMenuId}/${tab}`}
            onUpdateQuery={this.props.updateQuery}
            query={query}
          />
        </FormArea>
        <EwAuditTable
          columns={this.renderColumn()}
          loading={this.props.loading}
          data={this.props.list}
          paging={paging}
          onChange={this.handlePageChange}
          onPageChange={this.handlePageChange}
          rowClassName={record =>
            record.isCredit === 1
              ? 'niceEw'
              : record.chassisType === 102
                ? 'engine'
                : record.chassisType === 103
                  ? 'spottestBzhu'
                  : ''
          }
        />
        {(tab === 'spotTask' || tab === 'timeOut') && <ColorTips/>}
        {this.state.showManuSpotModal && (
          <ManuSpotModal
            description={this.state.description}
            visible={this.state.showManuSpotModal}
            onOk={this.handleOk}
            onCancel={this.handleCancle}
          />
        )}
        {this.state.showCarShowSpotModal && (
          <ManuSpotModal
            visible={this.state.showCarShowSpotModal}
            onOk={this.handleOk}
            onCancel={this.handleCancle}
            isCarShow
          />
        )}
        {this.state.showReportModal && (
          <ReportModal onCancel={() => this.setState({ showReportModal: false })} record={this.state.record}/>
        )}
        {menuId === 'spottestAudit' && tab === 'spotTask' && (
          <OperationArea>
            <Button
              type="primary"
              style={{ background: 'rgb(207, 181, 59)', border: 'none' }}
              onClick={() =>
                this.setState({
                  showManuSpotModal: true,
                  description: '接证任务',
                })
              }
            >
              接证任务
            </Button>
            <Button
              type="primary"
              style={{ background: 'rgb(207, 181, 59)', border: 'none' }}
              onClick={() =>
                this.setState({
                  showManuSpotModal: true,
                  description: '盘证任务',
                })
              }
            >
              盘证任务
            </Button>
            <Button
              type="primary"
              style={{ background: 'rgb(0, 127, 255)', border: 'none' }}
              onClick={() =>
                this.setState({
                  showManuSpotModal: true,
                  description: '接车任务',
                })
              }
            >
              接车任务
            </Button>
            <Button
              type="primary"
              style={{ background: 'rgb(0, 127, 255)', border: 'none' }}
              onClick={() =>
                this.setState({
                  showManuSpotModal: true,
                  description: '日常查车',
                })
              }
            >
              日常查车任务
            </Button>
            <Button
              type="primary"
              icon="plus"
              onClick={() =>
                this.setState({
                  showManuSpotModal: true,
                  description: false,
                })
              }
            >
              手动抽查
            </Button>
            <Button
              type="primary"
              icon="car"
              onClick={() =>
                this.setState({
                  showCarShowSpotModal: true,
                })
              }
            >
              车展手动抽查
            </Button>
          </OperationArea>
        )}
      </ViewWrapper>
    );
  }
}
