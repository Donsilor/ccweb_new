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
    this.state = { data: [], editingKey: '', cordonParam: [], disabled: true };
    this.columns = [
      {
        title: '品牌名称',
        dataIndex: 'name',
      },
      {
        title: '换证额度（万元）',
        dataIndex: 'quota',
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
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.id);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      httpCommonClient.post(`/warning/v1.0/warning/brand/update/brandList`, newData).then(respone => {
        if (respone.data.code === 200) {
          message.success(respone.data.message);
          this.setState({ data: newData, editingKey: '' });
          this.getBrand();
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
    httpCommonClient.post(`/warning/v1.0/warning/cordonParam/list/all`, {}).then(respone => {
      if (respone.data.code === 200) {
        this.setState({ cordonParam: respone.data.data });
      } else {
        message.error(respone.data.message);
      }
    });
  }
  getBrand() {
    httpCommonClient.post(`/warning/v1.0/warning/brand/list/all`, {}).then(respone => {
      if (respone.data.code === 200) {
        this.setState({ data: respone.data.data });
      } else {
        message.error(respone.data.message);
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
    const index = cordonParam.findIndex(item => item.type == name);
    cordonParam[index].val = typeof value == 'number' ? value : value.replace(/[^\d]/g, '');
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
          inputType: col.dataIndex === 'quota' ? 'number' : 'text',
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
            title="出账情况 :"
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
                      confirm({
                        title: '请确认是否保存参数?',
                        onOk() {
                          if (cordonParam.filter(v => !v.val).length) {
                            message.error('参数不能为空');
                          } else {
                            httpCommonClient
                              .post(`/warning/v1.0/warning/cordonParam/update/list`, cordonParam)
                              .then(respone => {
                                if (respone.data.code === 200) {
                                  self.setState({ disabled: true });
                                  message.success(respone.data.message);
                                  self.getParam();
                                } else {
                                  message.error(respone.data.message);
                                }
                              });
                          }
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
              1.较上月出账金额涨幅
              {cordonParam.length && (
                <Input
                  disabled={this.state.disabled}
                  value={cordonParam.find(v => v.type == 'output_account_increase').val}
                  onChange={this.onChange('output_account_increase')}
                />
              )}
              %预警
            </p>
            <p>
              2.较上月出账金额降幅
              {cordonParam.length && (
                <Input
                  disabled={this.state.disabled}
                  value={cordonParam.find(v => v.type == 'output_account_decrease').val}
                  onChange={this.onChange('output_account_decrease')}
                />
              )}
              %预警
            </p>
          </Card>
          <Card title="回款情况 :">
            <p>
              1.经销商月度回款较上月下降超过
              {cordonParam.length && (
                <Input
                  disabled={this.state.disabled}
                  value={cordonParam.find(v => v.type == 'repayment_amount_decrease').val}
                  onChange={this.onChange('repayment_amount_decrease')}
                />
              )}
              %预警
            </p>
          </Card>
          <Card title="赎车情况 :">
            <p>
              1.
              {cordonParam.length && (
                <Input
                  disabled={this.state.disabled}
                  value={cordonParam.find(v => v.type == 'ransom_car_days').val}
                  onChange={this.onChange('ransom_car_days')}
                />
              )}
              天一台车未赎预警
            </p>
            <p>
              2.经销商月度销量较上月下降超过
              {cordonParam.length && (
                <Input
                  disabled={this.state.disabled}
                  value={cordonParam.find(v => v.type == 'ransom_car_month_last_decrease').val}
                  onChange={this.onChange('ransom_car_month_last_decrease')}
                />
              )}
              %预警
            </p>
            <p>
              3.经销商月度销量较品牌平均月销量下降超过
              {cordonParam.length && (
                <Input
                  disabled={this.state.disabled}
                  value={cordonParam.find(v => v.type == 'ransom_car_month_average_decrease').val}
                  onChange={this.onChange('ransom_car_month_average_decrease')}
                />
              )}
              %预警
            </p>
          </Card>
        </div>
        <div>
          <Card title="换证情况 :">
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
