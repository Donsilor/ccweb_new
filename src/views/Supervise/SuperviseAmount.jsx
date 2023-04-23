import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDealerAmount, fetchVehicleAmount } from '../../redux/modules/supervise';
import { FormArea, ViewWrapper } from '../../layouts/ViewWrapper';
import CCForm from '../../components/CCForm';
import EwAuditTable from '../../components/EwAuditTable';
import ewAuditTableColumn from '../../components/EwAuditTableColumn';
import moment from 'moment';
import { Button, Col, message, Row } from 'antd';
import * as XLSX from 'xlsx';
import saveAs from 'file-saver';
import { httpCommonClient } from '../../common/axios';

class SuperviseAmount extends Component {
  state = {
    hasWeekAmount: true,
    exportBtnLoading: false,
  };

  componentDidMount() {
    console.log(this.props);
    this.handleSearch(this.props.query.value);
  }

  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };

  handleSearch = (formValues, page, pageSize) => {
    let values = { ...formValues };
    if (formValues && formValues['theMonth']) {
      const theMonth = moment.unix(formValues['theMonth'] / 1000).format('YYYYMM');
      values = { theMonth: theMonth };
      console.log(theMonth === moment().format('YYYYMM'));
      if (theMonth === moment().format('YYYYMM')) {
        this.setState({
          hasWeekAmount: true,
        });
      } else {
        this.setState({
          hasWeekAmount: false,
        });
      }
    } else {
      // 197001
      values = { theMonth: moment().format('YYYYMM') };
      this.setState({
        hasWeekAmount: true,
      });
    }
    console.log(values);
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };

  getColumns = () => {
    const { match } = this.props;
    const { hasWeekAmount } = this.state;
    const columns = ewAuditTableColumn(match.path);

    if (!hasWeekAmount) {
      columns.pop();
    }

    return columns;
  };

  export = () => {
    const { match, query } = this.props;
    this.setState({
      exportBtnLoading: true,
    });

    let fileDate = '';
    console.log(query.value);
    if (query && query.value && query.value.theMonth && query.value.theMonth !== '') {
      fileDate = query.value;
    } else {
      fileDate = moment().format('YYYYMM');
    }
    console.log(fileDate);

    let url = '/SuperviseAction_dealerAmount';
    if (match.path.includes('vehicleAmount')) {
      url = '/SuperviseAction_vehicleAmount';
    }

    httpCommonClient
      .post(url, {
        ...query.value,
        pageNum: 1,
        pageSize: 10000,
      })
      .then(payload => {
        // console.log(payload);
        if (payload && payload.data && payload.data.result === 0) {
          const list = payload.data.list || [];
          this.exportExcel(list, fileDate);
        } else {
          message.error(payload.data.msg);
          this.setState({
            exportBtnLoading: false,
          });
        }
      })
      .catch(err => {
        message.error(err.message);
        this.setState({
          exportBtnLoading: false,
        });
      });
  };

  exportExcel(list, fileDate) {
    const { match } = this.props;
    const { hasWeekAmount } = this.state;
    let aoa = [['抽查日期', '监管公司', '品牌', '经销商名称', '是否特殊名单', '本月抽查次数']];
    let fileName = '';

    if (match.path.includes('dealerAmount')) {
      if (hasWeekAmount) {
        aoa = [['抽查日期', '监管公司', '品牌', '经销商名称', '是否特殊名单', '本月抽查次数', '本周抽查次数']];
        list.map(item => {
          aoa.push([
            fileDate,
            item.company,
            item.brand,
            item.dealer,
            item.isSpecial === 1 ? '是' : '否',
            item['cntByMonth'],
            item['cntByWeek'],
          ]);
        });
      } else {
        aoa = [['抽查日期', '监管公司', '品牌', '经销商名称', '是否特殊名单', '本月抽查次数']];
        list.map(item => {
          aoa.push([
            fileDate,
            item.company,
            item.brand,
            item.dealer,
            item.isSpecial === 1 ? '是' : '否',
            item['cntByMonth'],
          ]);
        });
      }
      fileName = fileDate + '经销商抽查名单.xlsx';
    } else {
      if (hasWeekAmount) {
        aoa = [
          ['抽查日期', '监管公司', '品牌', '经销商名称', '车架号', '是否特殊名单', '本月抽查次数', '本周抽查次数'],
        ];
        list.map(item => {
          aoa.push([
            fileDate,
            item.company,
            item.brand,
            item.dealer,
            item.vin,
            item.isSpecial === 1 ? '是' : '否',
            item['cntByMonth'],
            item['cntByWeek'],
          ]);
        });
      } else {
        aoa = [['抽查日期', '监管公司', '品牌', '经销商名称', '车架号', '是否特殊名单', '本月抽查次数']];
        list.map(item => {
          aoa.push([
            fileDate,
            item.company,
            item.brand,
            item.dealer,
            item.vin,
            item.isSpecial === 1 ? '是' : '否',
            item['cntByMonth'],
          ]);
        });
      }
      fileName = fileDate + '车辆抽查名单.xlsx';
    }

    console.log(aoa);
    // const fileName = moment.unix(new Date(Date.now()).getTime() / 1000).format('YYYYMMDD') + '抽查名单.xlsx';
    const sheet = XLSX.utils.aoa_to_sheet(aoa);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, sheet, '抽查名单');
    const workBookOut = XLSX.write(workBook, { type: 'binary', bookType: 'xlsx' });
    saveAs(new Blob([this.s2ab(workBookOut)], { type: 'application/octet-stream' }), fileName);
    this.setState({
      exportBtnLoading: false,
    });
  }

  s2ab(s) {
    // 字符串转字符流
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }

  render() {
    const { match, query, loading, list, paging } = this.props;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm onSearch={this.handleSearch} path={match.path} query={query} onUpdateQuery={this.props.updateQuery} />
        </FormArea>
        <Row style={{ 'margin-bottom': 15 }}>
          <Col span={2}>
            <Button type="primary" htmlType="submit" onClick={this.export} loading={this.state.exportBtnLoading}>
              导出
            </Button>
            <Col span={22} />
          </Col>
        </Row>
        <EwAuditTable
          columns={this.getColumns()}
          loading={loading}
          data={list}
          paging={paging}
          onChange={this.handlePageChange}
          onPageChange={this.handlePageChange}
        />
      </ViewWrapper>
    );
  }
}

function mapStateToProps(store) {
  return {
    loading: store.supervise.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDealerAmount: (data, paging) => dispatch(fetchDealerAmount(data, paging)),
    fetchVehicleAmount: (data, paging) => dispatch(fetchVehicleAmount(data, paging)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuperviseAmount);
