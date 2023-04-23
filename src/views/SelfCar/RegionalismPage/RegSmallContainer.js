import React, { Component } from 'react';
import { Button, Table, Tooltip, Icon, Divider, Modal, message, Select, Form } from 'antd';
import { connect } from 'react-redux';
import { FETCH_REGIONSMALL_LIST, UPDATE_REGIONSMALL_QUERY } from 'redux/modules/selfcar/regionalism';
import CCForm from 'components/CCForm';
import ModalForm from 'components/ModalForm';
import { httpCommonClient } from 'common/axios';
import AddEwModal from './AddEwModal';
import ManaJlModal from './manaJlModal';

const { confirm } = Modal;
const { Option } = Select;
export class regionalism extends Component {
  state = {
    tableLoading: true,
    addRegVisible: false,
    bindRegVisible: false,
    addEwVisible: false,
    manaJlVisible: false,
    tit: '',
    ewId: 0,
    regList: {},
    bigList: [],
    bigValue: '',
    carQuery: {},
    carPaging: {
      current: 1,
      pageSize: 10,
      total: 10,
    },
  };
  //绑定大区提交
  bindRegSubmit = () => {
    httpCommonClient
      .post(`/self-car/v1.0/selfDistributorArea/update/sub-area/binding`, {
        id: this.state.regList.id,
        parentId: this.state.bigValue,
      })
      .then(respone => {
        message.success('操作成功');
        this.setState({
          bindRegVisible: false,
        });
        this.handlePageChange();
      })
      .catch(err => {
        message.error('操作失败');
      });
  };
  //查询大区select
  bindReg = record => e => {
    e.preventDefault();
    e.stopPropagation();
    httpCommonClient.post(`/self-car/v1.0/selfDistributorArea/find/list/area`, {}).then(res => {
      if (res.data.code == 200) {
        this.setState({
          bigList: res.data.data.list,
        });
      }
    });
    this.setState({ bindRegVisible: true, regList: record });
  };
  columns = [
    { title: '小区名称', dataIndex: 'name' },
    { title: '区域经理', dataIndex: 'manager.employeename' },
    { title: '二网数量', dataIndex: 'ewNum' },
    { title: '所属大区', dataIndex: 'parent.name' },
    { title: '小区备注', dataIndex: 'remark' },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align: 'right',
      width: 250,
      render: (text, record) => (
        <div>
          <a href="#" key="bind" onClick={this.bindReg(record)}>
            <Tooltip title="绑定大区">
              <Icon type="paper-clip" />
            </Tooltip>
          </a>
          <Divider type="vertical" key="divider1" />
          <a
            href="#"
            key="new"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              this.setState({ addEwVisible: true, ewId: record.id });
            }}
          >
            <Tooltip title="新增二网">
              <Icon type="plus" />
            </Tooltip>
          </a>
          <Divider type="vertical" key="divider2" />
          <a
            href="#"
            key="modify"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              this.setState({ addRegVisible: true, tit: '修改区域信息', regList: record });
            }}
          >
            <Tooltip title="修改">
              <Icon type="edit" />
            </Tooltip>
          </a>
          <Divider type="vertical" key="divider3" />
          <a
            href="#"
            key="addReg"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              this.setState({ manaJlVisible: true, regList: record });
            }}
          >
            <Tooltip title="添加区域经理">
              <Icon type="user-add" />
            </Tooltip>
          </a>
          <Divider type="vertical" key="divider4" />
          <a href="#" key="delete" onClick={this.delReg(record)}>
            <Tooltip title="删除">
              <Icon type="delete" style={{ color: 'red' }} />
            </Tooltip>
          </a>
        </div>
      ),
    },
  ];
  //删除二网
  delEw = (record, factory) => e => {
    e.preventDefault();
    e.stopPropagation();
    let self = this;
    confirm({
      title: '请再次确认是否删除二网？',
      onOk() {
        httpCommonClient
          .post(`/self-car/v1.0/selfDistributorAreaEw/delete`, { id: record.id })
          .then(res => {
            if (res.data.code == 200) {
              message.success('操作成功');
              self.handleExpand(true, factory);
              self.handlePageChange();
            } else {
              message.error(res.data.message);
            }
          })
          .catch(err => {
            message.error('操作失败');
          });
      },
    });
  };
  //展开二网表格
  handleExpand = (expanded, record) => {
    if (!expanded) return;
    this.setState({ tableLoading: true });
    httpCommonClient
      .post(`/self-car/v1.0/selfDistributorAreaEw/find/list?pageNum=1&pageSize=500`, {
        areaId: record.id || record,
      })
      .then(({ data }) => {
        if (data.data) {
          this.setState({ [record.id || record]: data.data.list, tableLoading: false });
        } else {
          this.setState({ [record.id || record]: [], tableLoading: false });
        }
      })
      .catch(err => {
        message.error('操作失败');
        this.setState({ tableLoading: false });
      });
  };
  //二网table
  expandedRegionRender = factory => {
    const columns = [
      { title: '二网名称', dataIndex: 'ew.ewName' },
      {
        title: '省份',
        dataIndex: 'ew.provinceName',
      },
      {
        title: '城市',
        dataIndex: 'ew.cityName',
      },
      {
        title: '操作',
        key: 'state',
        align: 'right',
        width: 250,
        render: (text, region) => (
          <div>
            <a href="#" key="delete" onClick={this.delEw(region, factory)}>
              <Tooltip title="删除">
                <Icon type="delete" style={{ color: 'red' }} />
              </Tooltip>
            </a>
          </div>
        ),
      },
    ];
    const factoryKey = factory.id;
    return (
      <div>
        <div style={{ marginBottom: '5px', marginLeft: '-15px', marginRight: '-15px' }}>
          <Table
            columns={columns}
            dataSource={this.state[factoryKey]}
            loading={this.state.tableLoading}
            rowKey={'id'}
            indentSize={0}
            size="small"
          />
        </div>
      </div>
    );
  };
  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  handleSearch = (formValues, page, pageSize) => {
    const values = { ...formValues };
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };
  onCancel = () => {
    this.setState({
      addRegVisible: false,
      bindRegVisible: false,
      addEwVisible: false,
      tableLoading: true,
    });
  };
  addRegSubmit = formData => {
    let tit = '';
    let data = {
      name: formData.name,
      remark: formData.remark,
    };
    if (this.state.tit == '新增小区') {
      tit = 'add';
    } else {
      tit = 'update';
      data.id = this.state.regList.id;
    }
    httpCommonClient
      .post(`/self-car/v1.0/selfDistributorArea/${tit}/sub-area`, data)
      .then(res => {
        if (res.data.code === 200) {
          message.success('操作成功');
          this.setState({
            addRegVisible: false,
          });
          this.handlePageChange();
        } else {
          message.error(res.data.message);
          this.setState({
            addRegVisible: false,
          });
        }
      })
      .catch(err => {
        message.error('操作失败');
      });
  };
  //删除小区
  delReg = record => e => {
    e.preventDefault();
    e.stopPropagation();
    let self = this;
    if (record.ewNum > 0) {
      Modal.warning({
        title: '该区下有关联数据未删除，请先删除后继续操作',
      });
      return;
    }
    confirm({
      title: '请再次确认是否删除小区？',
      onOk() {
        httpCommonClient
          .post(`/self-car/v1.0/selfDistributorArea/delete/sub-area`, { id: record.id })
          .then(respone => {
            message.success('操作成功');
            self.handlePageChange();
          })
          .catch(err => {
            message.error('操作失败');
          });
      },
    });
  };
  handleSelectChange = value => {
    this.setState({ bigValue: value });
  };
  updateCarQuery = (carQuery, carPaging) => {
    this.setState({
      carQuery,
      carPaging,
    });
  };
  render() {
    const { match, query } = this.props;
    const { regList } = this.state;
    return (
      <div style={{ background: '#fff', padding: '20px' }}>
        <CCForm onSearch={this.handleSearch} path={match.path} query={query} onUpdateQuery={this.props.updateQuery} />
        <Button
          type="primary"
          icon="plus"
          onClick={() => this.setState({ addRegVisible: true, tit: '新增小区', regList: {} })}
        >
          新增小区
        </Button>
        <br></br>
        <div style={{ background: '#fff' }}>
          <Table
            columns={this.columns}
            dataSource={this.props.list}
            expandedRowRender={this.expandedRegionRender}
            // expandedRowKeys={this.state.expandedRow}
            expandRowByClick
            pagination={false}
            onExpand={this.handleExpand}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
            rowKey={'id'}
            indentSize={0}
          />
        </div>
        {/*新增/修改 小区*/}
        {this.state.addRegVisible && (
          <ModalForm
            title={this.state.tit}
            //onOk={this.updOrderExpSubmitOk}
            onCancel={this.onCancel}
            onSubmit={this.addRegSubmit}
            configList={[
              {
                label: '区域名称',
                type: 'input',
                key: 'name',
                required: true,
                initialValue: regList.name,
                rules: [
                  {
                    required: true,
                    message: '请填写区域名称！',
                  },
                ],
              },
              {
                label: '区域备注',
                type: 'input',
                key: 'remark',
                required: true,
                initialValue: regList.remark,
                rules: [
                  {
                    required: true,
                    message: '请填写区域备注！',
                  },
                ],
              },
            ]}
          />
        )}
        {/*绑定大区*/}
        <Modal
          title="绑定大区"
          visible={this.state.bindRegVisible}
          onOk={this.bindRegSubmit}
          onCancel={this.onCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
            <Form.Item label="小区 ：">
              <p>{this.state.regList.name}</p>
            </Form.Item>
            <Form.Item label="大区">
              <Select placeholder="请选择大区" onChange={this.handleSelectChange}>
                {this.state.bigList.map(v => (
                  <Option key={v.id} value={v.id}>
                    {v.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        {/*新增二网*/}
        {this.state.addEwVisible && (
          <AddEwModal
            query={this.state.carQuery}
            paging={this.state.carPaging}
            updateQuery={this.updateCarQuery}
            ewId={this.state.ewId}
            addEwvisible={() => {
              this.setState({ addEwVisible: false, carQuery: {} });
            }}
            searchList={() => {
              this.handleSearch();
              this.handleExpand(true, this.state.ewId);
            }}
          ></AddEwModal>
        )}
        {/*管理区域经理*/}
        {this.state.manaJlVisible && (
          <ManaJlModal
            query={this.state.carQuery}
            paging={this.state.carPaging}
            updateQuery={this.updateCarQuery}
            regList={this.state.regList}
            addEwvisible={() => {
              this.setState({ manaJlVisible: false, carQuery: {} });
            }}
            searchList={() => {
              this.handleSearch();
            }}
          ></ManaJlModal>
        )}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  loading: store.regionalism.loading,
  list: store.regionalism.regionSmall.list,
  paging: store.regionalism.regionSmall.paging,
  query: store.regionalism.regionSmall.query,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_REGIONSMALL_LIST(data, paging)),
    updateQuery: data => {
      dispatch(UPDATE_REGIONSMALL_QUERY({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(regionalism);
