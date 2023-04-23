import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Button } from 'antd';
import { searchNoSpotCarList, updateNoSpotCarList } from 'redux/modules/spotEwBlack';
import { httpBufferClient, httpFormClient } from 'common/axios';
import OperationArea from 'components/OperationArea';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { exportFile } from 'common/utils';
import moment from 'moment';
import ModalForm from 'components/ModalForm';
export class noSpotCarList extends Component {
  state = {
    isExporting: false,
    modVisible: false,
    bookType: false,
    bankList: [],
    startTime: new Date(+new Date() + 8 * 3600 * 1000)
      .toISOString()
      .split('T')[1]
      .split('.')[0],
  };
  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  //列表查询
  handleSearch = (formValues, page, pageSize) => {
    const values = { ...formValues };
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };
  //导出
  handleExport = () => {
    if (!this.props.list) {
      message.error('暂无数据,无法导出');
      return;
    }
    const hide = message.loading('导出中，请稍后。。。', 0);
    const { value } = this.props.query;
    this.setState({
      isExporting: true,
    });
    httpBufferClient
      .submit(`/SpotTestTaskAction_exportNoSpotCarList`, value)
      .then(payload => {
        const result = exportFile(payload);
        result && message.warning(result, 2.5);
      })
      .then(res => {
        this.setState({
          isExporting: false,
        });
        hide();
      })
      .catch(err => {
        message.error('操作失败');
      });
  };
  updOrderExpSubmit = formData => {
    return httpFormClient
      .formSubmit(`/SpotTestTaskAction_batchSendTask`, '', {
        bankName: formData.bankName,
        bookTime: formData.bookTime && moment(formData.bookTime).format('YYYY-MM-DD HH:mm:ss'),
      })
      .then(({ data = {} }) => {
        if (data.result === 0) {
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
  disabledHours = () => {
    let hours = [];
    let time = this.state.startTime;
    let timeArr = time.split(':');
    for (var i = 0; i < parseInt(timeArr[0]); i++) {
      hours.push(i);
    }
    return hours;
  };
  disabledMinutes = selectedHour => {
    let { startTime } = this.state;
    let timeArr = startTime.split(':');
    let minutes = [];
    if (selectedHour == parseInt(timeArr[0])) {
      for (let i = 0; i < parseInt(timeArr[1]); i++) {
        minutes.push(i);
      }
    }
    return minutes;
  };
  //限制秒
  disabledSeconds = (selectedHour, selectedMinute) => {
    let { startTime } = this.state;
    let timeArr = startTime.split(':');
    let second = [];
    if (selectedHour == parseInt(timeArr[0]) && selectedMinute == parseInt(timeArr[1])) {
      for (var i = 0; i <= parseInt(timeArr[2]); i++) {
        second.push(i);
      }
    }
    return second;
  };
  render() {
    const { match, query, loading, list, paging } = this.props;
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
        <EwAuditTable
          columns={columnsList}
          loading={loading}
          data={list}
          paging={paging}
          rowKey="chassis"
          onChange={this.handlePageChange}
          onPageChange={this.handlePageChange}
        />
        {/*一键下发抽查*/}
        {this.state.modVisible && (
          <ModalForm
            title="一键下发抽查"
            onOk={() => {
              this.setState({ modVisible: false });
              this.handlePageChange();
            }}
            onCancel={() => this.setState({ modVisible: false })}
            onSubmit={this.updOrderExpSubmit}
            configList={[
              {
                label: '选择银行',
                type: 'select',
                key: 'bankName',
                required: true,
                optionList: this.state.bankList,
              },
              {
                label: '选择预约方式',
                type: 'radio',
                key: 'bookType',
                required: true,
                optionList: [{ label: '立即下发', value: 0 }, { label: '预约下发(只能预约当天时间)', value: 1 }],
                onChange: e => {
                  this.setState({ bookType: !!e.target.value });
                },
              },
              this.state.bookType
                ? {
                    label: '下发时间',
                    type: 'timePicker',
                    key: 'bookTime',
                    required: true,
                    disabledHours: this.disabledHours,
                    disabledMinutes: this.disabledMinutes,
                    disabledSeconds: this.disabledSeconds,
                  }
                : {},
            ]}
          />
        )}
        <OperationArea>
          <Button type="primary" loading={this.state.isExporting} icon="export" onClick={this.handleExport}>
            导出明细
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            type="primary"
            onClick={() => {
              this.setState({ modVisible: true });
              httpFormClient
                .formSubmit(`/com/xhkj/depart/action/BankAction_findAllBankList`, '')
                .then(({ data = {} }) => {
                  let bankList = [];
                  JSON.parse(data).map(v => bankList.push({ label: v.label, value: v.label }));
                  this.setState({
                    bankList: bankList.reduce(
                      (all, next) => (all.some(item => item['label'] == next['label']) ? all : [...all, next]),
                      []
                    ),
                  });
                });
            }}
          >
            一键下发抽查
          </Button>
        </OperationArea>
      </ViewWrapper>
    );
  }
}
const columnsList = [
  {
    title: '车架号',
    dataIndex: 'chassis',
  },
  {
    title: '银行名称',
    dataIndex: 'bankName',
  },
  {
    title: '经销商名称',
    dataIndex: 'distributorName',
  },
  {
    title: '车辆位置状态',
    dataIndex: 'statusName',
  },
  {
    title: '上次抽查时间',
    dataIndex: 'lastSpotTime',
    render: text => text && moment.unix(text.time / 1000).format('YYYY-MM-DD'),
  },
  {
    title: '上次移动时间',
    dataIndex: 'lastMoveTime',
    render: text => text && moment.unix(text.time / 1000).format('YYYY-MM-DD'),
  },
  {
    title: '无任务天数',
    dataIndex: 'noSpotDays',
  },
];
const mapStateToProps = store => ({
  loading: store.spotEwBlack.loading,
  list: store.spotEwBlack.noSpotCar.list,
  paging: store.spotEwBlack.noSpotCar.paging,
  query: store.spotEwBlack.noSpotCar.query,
});
function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => {
      dispatch(searchNoSpotCarList(data, paging));
    },
    updateQuery: data => {
      dispatch(updateNoSpotCarList(data));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(noSpotCarList);
