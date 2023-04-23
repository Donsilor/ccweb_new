import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ViewWrapper } from '../../layouts/ViewWrapper';
import { Button, message, Popconfirm, Upload } from 'antd';
import { deleteImportRecord, fetchSuperviseImportRecord } from '../../redux/modules/supervise';
import EwAuditTable from '../../components/EwAuditTable';
import * as ColList from '../../components/EwAuditTableColumn/columnItem';
import moment from 'moment';

class SuperviseImport extends Component {
  componentDidMount() {
    this.handleSearch();
  }

  handlePageChange = (page, pageSize) => {
    this.handleSearch(page, pageSize);
  };

  handleSearch = (page, pageSize) => {
    this.props.fetch({
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };

  getColumns() {
    // const { match } = this.props;
    const columns = [
      ColList.uploadTimeColumn,
      ColList.fileNameColumn,
      ColList.actionStatusColumn,
      // ColList.actionColumn,
    ];

    // const TIME_FORMAT = 'YYYY-MM-DD';
    //
    // columns.map(col => {
    //   if (col.dataIndex === 'action') {
    //     col.render = (text, record) => {
    //       // 今天导入的Excel有删除功能
    //       if (
    //         record['createdTime'] &&
    //         moment.unix(new Date(record['createdTime']).getTime() / 1000).format(TIME_FORMAT) ===
    //         moment.unix(new Date(Date.now()).getTime() / 1000).format(TIME_FORMAT)
    //       ) {
    //         return (
    //           <Fragment>
    //             {/*<a href="javascript:;">删除</a>*/}
    //             <Popconfirm
    //               title="这将会删除这个Excel导入的车辆信息，确认删除？"
    //               onConfirm={this.deleteImportRecord(record.id)}
    //               okText="确认"
    //               cancelText="取消"
    //             >
    //               <a href="javascript:;">删除</a>
    //             </Popconfirm>
    //           </Fragment>
    //         );
    //       } else {
    //         return null;
    //       }
    //     };
    //   }
    // });

    return columns;
  }

  deleteImportRecord = id => () => {
    this.props
      .delete({ id: id })
      .then(({ payload }) => {
        if (payload && payload.data && payload.data.result === 0) {
          message.success(payload.data.msg);
          this.handleSearch();
        } else {
          message.error(payload.data.msg);
        }
      })
      .catch(err => {
        message.error(err.message);
      });
  };

  render() {
    let that = this;
    let uploadConfig = {
      name: 'file',
      action: '/SuperviseAction_upload2',
      accept:
        'application/vnd.ms-excel,application/vnd.ms-excel,application/vnd.ms-works,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      headers: {
        'Content-Type': 'application/json',
      },
      beforeUpload(file) {
        console.log(file.name);
        // uploadConfig.headers['fileName'] = file.name;
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          // message.success(`${info.file.name} file uploaded successfully`);

          if (info.file && info.file.response) {
            if (info.file.response.result === 0) {
              message.success(info.file.response.msg);
              that.handleSearch();
            } else {
              message.error(info.file.response.msg);
            }
          }
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`);
        }
      },
    };

    return (
      <ViewWrapper>
        <Upload {...uploadConfig}>
          <Button>请选择一个excel文件</Button>
        </Upload>
        <div>
          <EwAuditTable
            columns={this.getColumns()}
            loading={this.props.loading}
            data={this.props.list}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
          />
        </div>
      </ViewWrapper>
    );
  }
}

function mapStateToProps(store) {
  return {
    loading: store.supervise.loading,
    list: store.supervise.importRecord.list,
    paging: store.supervise.importRecord.paging,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: paging => dispatch(fetchSuperviseImportRecord(paging)),
    delete: data => dispatch(deleteImportRecord(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuperviseImport);
