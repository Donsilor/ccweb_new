import React, { PureComponent } from 'react';
import { Form, Select, Input, Modal, Radio, message } from 'antd';
import { httpFormClient } from 'common/axios';
import _isEmpty from 'lodash/isEmpty';

const FormItem = Form.Item;
const Option = Select.Option;

export default class AccountModalForm extends PureComponent {
  state = {
    loading: false,
  };

  handleOk = () => {
    this.form && this.form.handleSubmit();
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  onSubmit = formData => {
    const { record } = this.props;
    if (_isEmpty(record)) {
      const value = { ...formData };
      if (!formData.distributorId && !formData.ewId) {
        message.error('请选择一个经销商或者二网');
        return;
      }
      value.departid = formData.distributorId ? formData.distributorId : formData.ewId;
      delete value.distributorId;
      delete value.ewId;
      this.setState({
        loading: true,
      });
      return httpFormClient
        .formSubmit('/UserAction_createUser', 'user', value)
        .then(({ data = {} }) => {
          if (data && data.result === 0) {
            message.success('添加用户成功');
            this.props.onOk();
          } else {
            return Promise.reject((data && data.msg) || '操作失败，请重试');
          }
        })
        .catch(err => {
          message.error(err.message || err);
          this.setState({
            loading: false,
          });
        });
    } else {
      const { mobile, email, address, status } = formData;
      const value = {
        id: record.id,
        mobile,
        email,
        address,
        status,
      };
      this.setState({
        loading: true,
      });
      return httpFormClient
        .formSubmit('/UserAction_updateUserInfo', 'user', value)
        .then(({ data = {} }) => {
          if (data && data.result === 1) {
            message.success('更新账号信息成功');
            this.props.onOk();
          } else {
            return Promise.reject((data && data.msg) || '操作失败，请重试');
          }
        })
        .catch(err => {
          message.error(err.message || err);
          this.setState({
            loading: false,
          });
        });
    }
  };
  render() {
    const { onCancel, record } = this.props;
    return (
      <Modal
        title={!_isEmpty(record) ? '修改账号' : '新增账号'}
        onOk={this.handleOk}
        onCancel={onCancel}
        visible={true}
        confirmLoading={this.state.loading}
        destroyOnClose
      >
        <AccountForm onSubmit={this.onSubmit} wrappedComponentRef={form => (this.form = form)} record={record} />
      </Modal>
    );
  }
}

@Form.create()
class AccountForm extends PureComponent {
  state = {
    distributorList: [],
    ewList: [],
    loading: true,
    searchValue: '',
  };

  componentDidMount() {
    const { record } = this.props;
    if (_isEmpty(record)) {
      Promise.all([this.searchEnterpriseData(2), this.searchEnterpriseData(3)]).then(() => {
        this.setState({
          loading: false,
        });
      });
    }
  }

  searchEnterpriseData = type => {
    const isEw = type === 3;
    return httpFormClient
      .formSubmit('/AjaxAction_getDepartOptions', '', { departType: isEw ? 3 : 2 })
      .then(({ data = {} }) => {
        if (typeof data === 'string') {
          try {
            data = JSON.parse(data);
          } catch (error) {
            return Promise.reject(error.message);
          }
        }
        if (!data || !_isEmpty(data)) {
          this.setState({
            distributorList: !isEw ? this.state.distributorList : data,
            ewList: isEw ? this.state.ewList : data,
          });
        } else {
          return Promise.reject(isEw ? '获取二网列表失败' : '获取经销商列表失败');
        }
      })
      .catch(err => {
        message.error(err.message || err);
        this.setState({
          distributorList: !isEw ? this.state.distributorList : [],
          ewList: isEw ? this.state.ewList : [],
        });
      });
  };

  onSelectSearch = searchValue => {
    this.setState({
      searchValue,
    });
  };
  handleSubmit = () => {
    this.props.form.validateFields((error, values) => {
      if (!error) {
        this.props.onSubmit(values);
      }
    });
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const {
      form: { getFieldDecorator, getFieldValue },
      record,
    } = this.props;
    const { loading, distributorList, ewList, searchValue } = this.state;
    const ifShowDetail = !_isEmpty(record) || getFieldValue('distributorId') || getFieldValue('ewId');
    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout}>
        {_isEmpty(record) && (
          <FormItem label="企业类型" key={'departtype'}>
            {getFieldDecorator('departtype', {
              rules: [{ required: true, message: '请选择企业类型' }],
            })(
              <Radio.Group>
                <Radio value={3} key={3}>
                  经销商
                </Radio>
                <Radio value={2} key={2}>
                  二网
                </Radio>
              </Radio.Group>
            )}
          </FormItem>
        )}
        {getFieldValue('departtype') === 3 && _isEmpty(record) && (
          <FormItem label="选择经销商" key={'departtypeOption'} extra="最多显示30条经销商数据">
            {getFieldDecorator('distributorId', {
              rules: [{ required: true, message: '请选择一个经销商' }],
            })(
              <Select
                style={{ width: '100%' }}
                showSearch
                loading={loading}
                optionFilterProp="children"
                onSearch={this.onSelectSearch}
              >
                {distributorList
                  .sort(item => {
                    if (!record) {
                      return 0;
                    } else if (String(item.value) === String(record.departid)) {
                      return -1;
                    } else {
                      return 1;
                    }
                  })
                  .filter(item => item.value && item.label && item.label.includes(searchValue))
                  .slice(0, 29)
                  .map(item => (
                    <Option value={item.value} key={item.value}>
                      {item.label}
                    </Option>
                  ))}
              </Select>
            )}
          </FormItem>
        )}
        {getFieldValue('departtype') === 2 && _isEmpty(record) && (
          <FormItem label="选择二网" key={'departtypeOption'} extra="最多显示30条二网数据">
            {getFieldDecorator('ewId', {
              rules: [{ required: true, message: '请选择一个二网' }],
            })(
              <Select
                style={{ width: '100%' }}
                showSearch
                loading={loading}
                optionFilterProp="children"
                onSearch={this.onSelectSearch}
              >
                {ewList
                  .sort(item => {
                    if (!record) {
                      return 0;
                    } else if (String(item.value) === String(record.departid)) {
                      return -1;
                    } else {
                      return 1;
                    }
                  })
                  .filter(item => item.value && item.label && item.label.includes(searchValue))
                  .slice(0, 29)
                  .map(item => (
                    <Option value={item.value} key={item.value}>
                      {item.label}
                    </Option>
                  ))}
              </Select>
            )}
          </FormItem>
        )}
        {!_isEmpty(record) && (
          <FormItem label="企业类型" key={'departtype'} required>
            {getFieldDecorator('departtype')(<span>{record.departtype === 3 ? '经销商' : '二网'}</span>)}
          </FormItem>
        )}
        {!_isEmpty(record) && (
          <FormItem label="企业名称" key={'departtypeOption'}>
            {getFieldDecorator('employeename', {
              rules: [{ required: true, message: '请输入企业名称' }],
            })(<span>{record.departname}</span>)}
          </FormItem>
        )}
        {ifShowDetail && (
          <FormItem label="账号名称" key="employeename">
            {getFieldDecorator('employeename', {
              rules: [{ required: true, message: '请输入账号名称' }],
              initialValue: record.employeename || '',
            })(_isEmpty(record) ? <Input placeholder="请输入账号名称" /> : <span>{record.employeename}</span>)}
          </FormItem>
        )}
        {ifShowDetail && (
          <FormItem label="登录账号" key="accid">
            {getFieldDecorator('accid', {
              rules: [{ required: true, message: '请输入登录账号' }, { max: 30, message: '最多输入30个字符' }],
              initialValue: record.accid || '',
            })(_isEmpty(record) ? <Input placeholder="请输入登录账号" /> : <span>{record.accid}</span>)}
          </FormItem>
        )}
        {ifShowDetail && _isEmpty(record) && (
          <FormItem label="账号密码" key="accpwd">
            {getFieldDecorator('accpwd', {
              rules: [{ required: true, message: '请输入账号密码' }, { max: 30, message: '最多输入30个字符' }],
            })(<Input placeholder="请输入账号密码" />)}
          </FormItem>
        )}
        {ifShowDetail && !_isEmpty(record) && (
          <FormItem label="状态" key="status">
            {getFieldDecorator('status', {
              rules: [{ required: true, message: '请设置账户状态' }],
              initialValue: record.status,
            })(
              <Radio.Group>
                <Radio value="1">启用</Radio>
                <Radio value="2">停用</Radio>
              </Radio.Group>
            )}
          </FormItem>
        )}
        {ifShowDetail && (
          <FormItem label="手机号码" key="mobile">
            {getFieldDecorator('mobile', {
              rules: [
                { required: true, message: '请输入手机号码' },
                {
                  pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
                  message: '请输入合法的手机号',
                },
              ],
              initialValue: record.mobile || '',
            })(<Input placeholder="请输入手机号码" />)}
          </FormItem>
        )}
        {ifShowDetail && (
          <FormItem label="用户邮箱" key="email">
            {getFieldDecorator('email', {
              rules: [{ max: 50, message: '最多输入50个字符' }],
              initialValue: record.email || '',
            })(<Input placeholder="请输入用户邮箱" />)}
          </FormItem>
        )}
        {ifShowDetail && (
          <FormItem label="联系地址" key="address">
            {getFieldDecorator('address', {
              rules: [{ max: 200, message: '最多输入200个字符' }],
              initialValue: record.address || '',
            })(<Input.TextArea placeholder="请输入联系地址" rows={3} />)}
          </FormItem>
        )}
      </Form>
    );
  }
}
