import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  cameraListFetch,
  repoListFetch,
  updateFactoryId,
  updateCameraCode,
  updateRepository,
  repoRecordFetch,
  kDataFetch,
} from '../../redux/modules/repositoryList';
import { ViewWrapper } from '../../layouts/ViewWrapper';
import styles from './style.module.less';
import { message, Modal, Table } from 'antd';
import ewAuditTableColumn from '../../components/EwAuditTableColumn';
import * as subRowCol from '../../components/EwAuditTableColumn/monitorColumnItem';
import RepositoryForm from './RepositoryForm';
import EwAuditTable from '../../components/EwAuditTable';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';

class RepositoryList extends Component {
  state = {
    factory: {},
    expandedRow: [],
    expandedSubRow: {},
    editModelShow: false,
    editModel: {},
    record: {
      loading: false,
      modalShow: false,
      list: [],
      paging: { current: 1, pageSize: 10, total: 10 },
    },
    recordId: '',
    kCharts: {
      showKChartsModal: false,
      loading: false,
      data: [],
      realCnt: [],
      categoryData: [],
      option: {},
    },
  };

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = (page, pageSize) => {
    // const values = { ...formValues };
    this.props.fetch({
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };

  handlePageChange = (page, pageSize) => {
    this.handleSearch(page, pageSize);
  };

  getColumn = () => {
    const { match } = this.props;
    const columns = ewAuditTableColumn(match.url);

    columns.map(col => {
      if (col.dataIndex === 'action') {
        col.render = (text, record) => {
          return (
            <Fragment>
              <a className={`${styles.action}`} href="javascript:;">
                查看
              </a>
              <a className={`${styles.action}`} onClick={this.edit(record)}>
                修改
              </a>
              <a className={`${styles.action}`} onClick={this.getKData(record)}>
                k线图
              </a>
              <a className={`${styles.action}`} onClick={this.getRepoRecord(record)}>
                操作日志
              </a>
            </Fragment>
          );
        };
      }
    });

    return columns;
  };

  expandedRegionRender = factory => {
    const expandedSubRowColumn = [
      subRowCol.cameraSNColumn,
      subRowCol.cameraBrandColumn,
      subRowCol.clientTypeColumn,
      subRowCol.monitorStatusColumn,
      {
        title: '操作',
        dataIndex: 'action',
        align: 'left',
        render: (text, record) => <a onClick={this.updateCameraCode(record.serialNumber)}>影像明细</a>,
      },
    ];
    const id = factory.id;
    const data = this.state.expandedSubRow[id];

    return (
      <ViewWrapper style={{ 'min-height': '100px' }}>
        <Table
          loading={this.props.loading && id === this.state.factory.id}
          columns={expandedSubRowColumn}
          dataSource={data}
          rowKey="id"
          pagination={false}
        />
      </ViewWrapper>
    );
  };

  updateCameraCode = code => () => {
    this.props.updateCameraCode(code);
    this.props.history.push('/repositoryList/detail');
  };

  handleExpand = (expanded, record) => {
    if (expanded) {
      const { id } = record;
      const { expandedRow, expandedSubRow } = this.state;
      this.props.updateFactoryId(id);

      if (!expandedRow.includes(id)) {
        expandedRow.push(record.id);

        this.props
          .fetchCameraList({
            whareHouseId: id,
          })
          .then(({ payload }) => {
            this.setState({
              factory: record,
              expandedRow,
              expandedSubRow: {
                ...expandedSubRow,
                [id]: payload.data.list || [],
              },
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };

  edit = record => e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      editModelShow: true,
      editModel: record,
    });
  };

  onModalCancel = () => {
    this.setState({
      editModelShow: false,
      editModel: {},
      record: {
        loading: false,
        modalShow: false,
        list: [],
        paging: { current: 1, pageSize: 10, total: 10 },
      },
      kCharts: {
        showKChartsModal: false,
        loading: false,
        data: [],
        realCnt: [],
        categoryData: [],
      },
    });
  };

  onEditModalOk = () => {
    this.editForm && this.editForm.submit();
  };

  confirmEditModal = value => {
    console.log(value);
    if (!value) return;

    this.props.updateRepository(value).then(({ payload }) => {
      if (payload && payload.data && payload.data.result === 0) {
        message.success(payload.data.msg, 2.5);
        this.onModalCancel();
        this.handleSearch();
      } else {
        return Promise.reject(payload.data.msg);
      }
    });
  };

  getRepoRecord = (record, page, pageSize) => e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      recordId: record.id || record,
      record: {
        loading: true,
        modalShow: true,
        list: [],
        paging: { current: 1, pageSize: 10, total: 10 },
      },
    });
    let req = {
      whareHouseId: record.id || record,
    };
    this.props
      .repoRecordFetch(req, {
        pageNum: page || this.state.record.paging.current,
        pageSize: pageSize || this.state.record.paging.pageSize,
      })
      .then(({ payload }) => {
        if (payload && payload.data && payload.data.result === 0) {
          console.log(payload.data.list);
          this.setState({
            record: {
              ...record,
              loading: false,
              modalShow: true,
              list: payload.data.list || [],
              paging: {
                current: payload.data.page && payload.data.page.pageNum,
                pageSize: payload.data.page && payload.data.page.pageSize,
                total: payload.data.page && payload.data.page.total,
              },
            },
          });
        } else {
          this.setState({
            record: {
              loading: false,
              modalShow: true,
              list: [],
              paging: { current: 1, pageSize: 10, total: 10 },
            },
          });
          return Promise.reject(payload.data.msg);
        }
      });
  };

  getRepoRecordColumns = () => {
    return [
      {
        title: '操作时间',
        dataIndex: 'updateTime',
      },
      {
        title: '操作人',
        dataIndex: 'userName',
      },
      {
        title: '操作内容',
        dataIndex: 'action',
        render: (text, record) => {
          return '库存车实际数量由' + record.oldNumber + '更改为' + record.newNumber + ', 说明：' + record.remark;
        },
      },
    ];
  };

  repoRecordPageChange = (page, pageSize) => {
    this.getRepoRecord(this.state.recordId, page, pageSize);
  };

  getKData = record => e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      kCharts: {
        showKChartsModal: true,
        loading: true,
      },
    });

    this.props
      .kDataFetch({ id: record.id })
      .then(({ payload }) => {
        if (payload.data && payload.data.result == 0) {
          const TIME_FORMAT = 'YYYY-MM-DD';
          let data = [];
          let realCnt = [];
          let categoryData = [];

          payload.data.list.forEach(item => {
            const itemDate = item.createTime && moment.unix(item.createTime.time / 1000).format(TIME_FORMAT);
            // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
            data.push([
              item.openNumber,
              item.closeNumber ? item.closeNumber : item.realNumber,
              item.minNumber,
              item.maxNumber,
            ]);
            realCnt.push(item.realNumber);
            categoryData.push(itemDate);
          });

          this.setState({
            kCharts: {
              showKChartsModal: true,
              loading: false,
              data: data,
              realCnt: realCnt,
              categoryData: categoryData,
            },
          });
        } else {
          this.setState({
            kCharts: {
              showKChartsModal: false,
              loading: false,
            },
          });
          return Promise.reject(payload.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          kCharts: {
            showKChartsModal: false,
            loading: false,
          },
        });
        return Promise.reject(err);
      });
  };

  getKOption = () => {
    const { data, realCnt, categoryData } = this.state.kCharts;
    let rate = 0;
    if (categoryData && categoryData.length > 30) {
      rate = (30 / categoryData.length) * 100;
    }

    var upColor = '#ec0000';
    var upBorderColor = '#8A0000';
    var downColor = '#00da3c';
    var downBorderColor = '#008F28';

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {
        data: ['日K', '实际在库车辆数'],
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '20%',
      },
      xAxis: {
        type: 'category',
        data: categoryData,
        scale: true,
        boundaryGap: true,
        axisLine: { onZero: false },
        splitLine: { show: false },
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax',
      },
      yAxis: {
        scale: true,
        splitArea: {
          show: true,
        },
      },
      dataZoom: [
        {
          type: 'inside',
          start: rate,
          end: 100,
        },
        {
          show: true,
          type: 'slider',
          y: '90%',
          start: rate,
          end: 100,
        },
      ],
      series: [
        {
          // dimensions: ['日期', '最高', '最低', null, null],
          name: '日K',
          type: 'candlestick',
          data: data,
          itemStyle: {
            normal: {
              color: upColor,
              color0: downColor,
              borderColor: upBorderColor,
              borderColor0: downBorderColor,
            },
          },
        },
        {
          name: '实际在库车辆数',
          type: 'line',
          data: realCnt,
          lineStyle: {
            normal: { opacity: 0.5 },
          },
        },
      ],
    };

    return option;
  };

  render() {
    const { rowKey } = this.props;
    return (
      <ViewWrapper>
        <div className={styles.wrapper}>
          <Table
            columns={this.getColumn()}
            dataSource={this.props.list}
            expandedRowRender={this.expandedRegionRender}
            expandRowByClick
            paging={this.props.paging}
            onExpand={this.handleExpand}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
            rowKey={rowKey}
            indentSize={0}
          />
        </div>
        <Modal
          visible={this.state.editModelShow}
          onOk={this.onEditModalOk}
          onCancel={this.onModalCancel}
          destroyOnClose
        >
          <RepositoryForm
            wrappedComponentRef={form => (this.editForm = form)}
            onSubmit={this.confirmEditModal}
            record={this.state.editModel}
          />
        </Modal>
        <Modal
          title="操作日志"
          visible={this.state.record.modalShow}
          footer={null}
          onCancel={this.onModalCancel}
          width={950}
          destroyOnClose
        >
          <EwAuditTable
            columns={this.getRepoRecordColumns()}
            data={this.state.record.list}
            paging={this.state.record.paging}
            loading={this.state.record.loading}
            onPageChange={this.repoRecordPageChange}
            onChange={this.repoRecordPageChange}
          />
        </Modal>
        <Modal
          title="k线图"
          visible={this.state.kCharts.showKChartsModal}
          footer={null}
          onCancel={this.onModalCancel}
          width={950}
          destroyOnClose
        >
          <ReactEcharts
            showLoading={this.state.kCharts.loading}
            option={this.getKOption()}
            notMerge={true}
            lazyUpdate={true}
          />
        </Modal>
      </ViewWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.repositoryList.loading,
    list: state.repositoryList.repoList,
    paging: state.repositoryList.paging,
    cameraCode: state.repositoryList.cameraCode,
    rowKey: record => `${record.id},${record.code}`,
  };
}

const mapDispatchToProps = {
  fetch: paging => repoListFetch(paging),
  fetchCameraList: data => cameraListFetch(data),
  updateFactoryId: id => updateFactoryId(id),
  updateCameraCode: code => updateCameraCode(code),
  updateRepository: data => updateRepository(data),
  kDataFetch: data => kDataFetch(data),
  repoRecordFetch: (data, paging) => repoRecordFetch(data, paging),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryList);
