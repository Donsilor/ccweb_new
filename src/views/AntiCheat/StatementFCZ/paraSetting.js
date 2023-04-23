import React from 'react';
import { Table, Input, InputNumber, Modal, Form, Card, Button, message } from 'antd';
import { httpCommonClient } from 'common/axios';
import styles from './style.module.less';
import _ from 'lodash';
const { confirm } = Modal;
const EditableContext = React.createContext();
class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };
  renderCell = ({ getFieldDecorator }) => {
    const { editing, dataIndex, title, inputType, record, index, children, ...restProps } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `请输入${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], editingKey: '', cordonParam: {}, disabled: true };
    this.columns = [
      {
        title: '品牌名称',
        dataIndex: 'brandName',
      },
      {
        title: '一台车金额（元）',
        dataIndex: 'oneCarValue',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a onClick={() => this.save(form, record.id)} style={{ marginRight: 8 }}>
                    保存
                  </a>
                )}
              </EditableContext.Consumer>
              <a onClick={() => this.cancel(record.id)}> 取消</a>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => this.edit(record.id)}>
              修改
            </a>
          );
        },
      },
    ];
  }
  isEditing = record => record.id === this.state.editingKey;
  cancel = () => {
    this.setState({ editingKey: '' });
  };
  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      httpCommonClient.post(`/warning/v1.0/fangche/fangcheBrandCarValue/update`, { id: key, ...row }).then(respone => {
        if (respone.data.code === 200) {
          message.success(respone.data.message);
          this.getBrand();
          this.setState({ editingKey: '' });
        } else {
          message.error(respone.data.message);
        }
      });
    });
  }
  edit(key) {
    this.setState({ editingKey: key });
  }
  getParam() {
    httpCommonClient.post(`/warning/v1.0/fangche/fangcheParam/list`, {}).then(({ data = {} }) => {
      if (data.code === 200) {
        this.setState({ cordonParam: data.data.list[0] || {} });
      } else {
        message.error(data.message);
      }
    });
  }
  getBrand() {
    httpCommonClient.post(`/warning/v1.0/fangche/fangcheBrandCarValue/list?pageNum=1&pageSize=500`, {}).then(({ data = {} }) => {
      if (data.code === 200) {
        this.setState({ data: data.data.list });
      } else {
        message.error(data.message);
      }
    });
  }
  componentDidMount() {
    this.getParam();
    this.getBrand();
  }
  onChange = name => e => {
    const { cordonParam } = this.state;
    const value = e.target.value;
    if (['newPending', 'oldPending'].includes(name)) {
      cordonParam[name] = value.replace(/[^\.\d]/g, "");
    } else {
      cordonParam[name] = value.replace(/[^\d]/g, "");
    }
    this.setState({ cordonParam });
  };
  render() {
    const { cordonParam } = this.state;
    const components = {
      body: {
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'oneCarValue' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    return (
      <div className={styles.paraSetting}>
        <div>
          <Card
            style={{ width: '510px' }}
            title="放车参数 :"
            extra={
              <div>
                {this.state.disabled ? (
                  <Button type="primary" onClick={() => this.setState({ disabled: false })}>
                    修改
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={() => {
                      let self = this;
                      if (Object.values(cordonParam).includes('')) {
                        Modal.info({
                          title: '提示信息',
                          content: '参数信息尚未填写完整！'
                        })
                        return
                      }
                      if (cordonParam.newPending > 1 || cordonParam.oldPending > 1) {
                        Modal.info({
                          title: '提示信息',
                          content: '未赎货比例应是【0~1】之间的数值！'
                        })
                        return
                      }
                      if ((+cordonParam.newNearLeft >= +cordonParam.newNearRight) || (+cordonParam.oldNearLeft >= +cordonParam.oldNearRight)) {
                        Modal.info({
                          title: '提示信息',
                          content: '筛选天数第一个输入值不能大于等于第二个输入值! '
                        })
                        return
                      }
                      confirm({
                        title: '请确认是否保存参数?',
                        onOk() {
                          httpCommonClient
                            .post(`/warning/v1.0/fangche/fangcheParam/update`, cordonParam)
                            .then(respone => {
                              if (respone.data.code === 200) {
                                self.setState({ disabled: true });
                                message.success(respone.data.message);
                                self.getParam();
                              } else {
                                message.error(respone.data.message);
                              }
                            });
                        },
                      });
                    }}
                  >
                    保存
                  </Button>
                )}
              </div>
            }
          >
            <p>
              1.新车未赎货比例（剩余敞口金额/出账金额）大于
              <Input
                disabled={this.state.disabled}
                value={cordonParam.newPending}
                onChange={this.onChange('newPending')}
              />
            </p>
            <p>
              2.新车超赎货期票据：筛选天数大于等于
              <Input
                disabled={this.state.disabled}
                value={cordonParam.newExceed}
                onChange={this.onChange('newExceed')}
              />
              天
            </p>
            <p>
              3.新车即将超期票据：筛选天数大于等于
              <Input
                disabled={this.state.disabled}
                value={cordonParam.newNearLeft}
                onChange={this.onChange('newNearLeft')}
              />
              天且小于
              <Input
                disabled={this.state.disabled}
                value={cordonParam.newNearRight}
                onChange={this.onChange('newNearRight')}
              />天
            </p>
            <br />
            <p>
              4.二手车未赎货比例（剩余敞口金额/出账金额）大于
              <Input
                disabled={this.state.disabled}
                value={cordonParam.oldPending}
                onChange={this.onChange('oldPending')}
              />
            </p>
            <p>
              5.二手车超赎货期票据：筛选天数大于等于
              <Input
                disabled={this.state.disabled}
                value={cordonParam.oldExceed}
                onChange={this.onChange('oldExceed')}
              />
              天
            </p>
            <p>
              6.二手车即将超期票据：筛选天数大于等于
              <Input
                disabled={this.state.disabled}
                value={cordonParam.oldNearLeft}
                onChange={this.onChange('oldNearLeft')}
              />
              天且小于
              <Input
                disabled={this.state.disabled}
                value={cordonParam.oldNearRight}
                onChange={this.onChange('oldNearRight')}
              />天
            </p>
          </Card>
        </div>
        <div className={styles.tabTable}>
          <Card title="一台车价值 :">
            <EditableContext.Provider value={this.props.form}>
              <Table
                components={components}
                bordered
                dataSource={this.state.data}
                columns={columns}
                pagination={false}
              />
            </EditableContext.Provider>
          </Card>
        </div>
      </div>
    );
  }
}
const EditableFormTable = Form.create()(EditableTable);
export default EditableFormTable;
