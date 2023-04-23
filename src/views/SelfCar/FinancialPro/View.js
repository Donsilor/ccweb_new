import React, { Component, Fragment } from 'react';
import { Button, message, Modal } from 'antd';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import OperationArea from 'components/OperationArea';
import ModalForm from 'components/ModalForm';
import { ViewWrapper, FormArea, OperArea } from 'layouts/ViewWrapper';
import { httpCommonClient } from 'common/axios';
import SetFinForm from './SetFinForm';
const { confirm } = Modal;
export default class spotEwBlack extends Component {
  state = {
    addFinVisible: false,
    modFinVisible: false,
    setFinVisible: false,
    setList: null,
  };
  handleCancel = () => {
    this.setState({
      addFinVisible: false,
      modFinVisible: false,
      setFinVisible: false,
    });
  };

  //列表操作
  renderColumn = () => {
    const columns = [];
    columns.push({
      title: '操作',
      render: record => (
        <Fragment>
          <a
            href="javascript:;"
            onClick={() => {
              this.setState({
                infoItem: record,
                modFinVisible: true,
              });
            }}
          >
            修改
          </a>
          &nbsp; &nbsp;
          <a href="javascript:;" onClick={this.delFinFun(record)}>
            删除
          </a>
          &nbsp; &nbsp;
          <a
            href="javascript:;"
            onClick={() => {
              this.setState({
                infoItem: record,
                setFinVisible: true,
              });
            }}
          >
            参数设置
          </a>
        </Fragment>
      ),
    });
    return columnsList.concat(columns);
  };
  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  //列表查询
  handleSearch = (formValues, page, pageSize) => {
    this.props.fetch(
      { ...formValues },
      {
        pageNum: page || this.props.paging.current,
        pageSize: pageSize || this.props.paging.pageSize,
      }
    );
  };
  addFinSubmitOk = () => {
    this.setState({ addFinVisible: false, modFinVisible: false, setdEwVisible: false });
    this.handleSearch(this.props.query.value);
  };
  addFinSubmit = params => (formData, record) => {
    const url = `/self-car/v1.0/selfFinancialProducts/${params}/selfFinancialProducts`;
    const data = {
      name: formData.name,
      description: formData.description,
    };
    if (params === 'update') data.id = record.id;
    return httpCommonClient.post(url, data).then(({ data = {} }) => {
      if (data.code === 200) {
        return Promise.resolve({
          data: {
            result: 0,
          },
        });
      } else {
        return Promise.resolve({
          data: {
            result: 1,
            msg: data.message || '操作失败，请重试',
          },
        });
      }
    });
  };
  delFinFun = record => () => {
    let self = this;
    confirm({
      title: '请再次确认是否删除',
      onOk() {
        httpCommonClient
          .post(`/self-car/v1.0/selfFinancialProducts/delete/selfFinancialProducts`, { id: record.id })
          .then(res => {
            if (res.data.code === 200) {
              message.success('操作成功');
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
  SetFinSubmit = data => {
    this.setState({ setList: data });
  };
  setFinSubmitOk = () => {
    let arr = Object.values(this.state.setList);
    let item = arr.filter(v => v.confirmEndTimeType == 2 && !v.confirmEndTimeValue);
    if (item.length) {
      message.error(`${item[0].itemName}时效未填写 ！`);
      return;
    }
    httpCommonClient
      .post(`/self-car/v1.0/selfDistributorParamItem/update`, this.state.setList)
      .then(res => {
        if (res.data.code === 200) {
          message.success('操作成功');
          this.setState({
            setFinVisible: false,
          });
        } else {
          message.error(res.data.message);
        }
      })
      .catch(err => {
        message.error('操作失败');
      });
  };
  render() {
    const { match, query, dealer } = this.props;
    const { addFinVisible, infoItem, modFinVisible, setFinVisible } = this.state;
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
        <div>
          <EwAuditTable
            columns={this.renderColumn()}
            loading={this.props.loading}
            data={this.props.list}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
          />
        </div>
        {/*新增金融产品*/}
        {addFinVisible && (
          <ModalForm
            title="新增金融产品"
            onOk={this.addFinSubmitOk}
            onCancel={this.handleCancel}
            onSubmit={this.addFinSubmit('add')}
            configList={[
              {
                label: '产品名称',
                type: 'input',
                key: 'name',
                required: true,
              },
              {
                label: '产品描述',
                type: 'input',
                key: 'description',
              },
            ]}
          />
        )}
        {/*修改金融产品*/}
        {modFinVisible && (
          <ModalForm
            title="修改"
            onOk={this.addFinSubmitOk}
            onCancel={this.handleCancel}
            onSubmit={this.addFinSubmit('update')}
            record={infoItem}
            configList={[
              {
                label: '产品名称',
                type: 'input',
                key: 'name',
                required: true,
                initialValue: infoItem.name,
              },
              {
                label: '产品描述',
                type: 'input',
                key: 'description',
                initialValue: infoItem.description,
              },
            ]}
          />
        )}
        {/*参数设置*/}
        <Modal
          title="参数设置"
          visible={setFinVisible}
          onOk={this.setFinSubmitOk}
          onCancel={this.handleCancel}
          width={600}
          okText="确认"
          cancelText="取消"
          destroyOnClose
        >
          <SetFinForm record={infoItem} onSubmit={this.SetFinSubmit} />
        </Modal>
        <OperationArea>
          {dealer.selfCarFlag && (
            <Button
              type="primary"
              icon="plus"
              onClick={() => {
                this.setState({
                  addFinVisible: true,
                });
              }}
            >
              新增金融产品
            </Button>
          )}
        </OperationArea>
      </ViewWrapper>
    );
  }
}
const columnsList = [
  {
    title: '产品名称',
    dataIndex: 'name',
  },
  {
    title: '建立时间',
    dataIndex: 'createTime',
  },
  {
    title: '产品描述',
    dataIndex: 'description',
  },
];
