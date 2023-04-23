import React, { PureComponent } from 'react';
import { Form, Input, DatePicker, List } from 'antd';
import moment from 'moment';
import styles from './style.module.less';
const FormItem = Form.Item;

@Form.create()
class AntiCheatForm extends PureComponent {
  state = {
    ewName: '',
    ewShow: false,
    list: null,
  };
  handleSubmit = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.props.onSubmit(fieldsValue);
    });
  };

  requiredRule = [
    {
      required: true,
      message: '请选择二网！',
    },
  ];
  requiredDate = [
    {
      required: true,
      message: '请选择日期！',
    },
  ];
  listItem = e => {
    this.props.form.setFieldsValue({ ewId: e.target.innerText });
    this.setState({
      ewShow: false,
    });
  };
  ewNameValue = e => {
    this.setState({ list: this.props.selList.filter(val => val.text.match(e.target.value)) });
  };
  render() {
    const {
      form: { getFieldDecorator },
      selList = [],
    } = this.props;
    let temp = this.state.list;
    return (
      <Form className={styles.form} labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
        <Form.Item label="二网名称" wrapperCol={{ span: 12 }}>
          {getFieldDecorator('ewId', {
            rules: this.requiredRule,
          })(
            <Input
              type="text"
              autoComplete="off"
              allowClear
              placeholder="请选择二网"
              onChange={this.ewNameValue}
              onClick={() => {
                this.setState({ ewShow: true });
              }}
            />
          )}
        </Form.Item>
        <Form.Item label="生效日期" wrapperCol={{ span: 12 }}>
          {getFieldDecorator('startDate', {
            rules: this.requiredDate,
          })(<DatePicker />)}
        </Form.Item>
        <Form.Item label="失效日期" wrapperCol={{ span: 12 }}>
          {getFieldDecorator('endDate', {
            rules: this.requiredDate,
          })(<DatePicker />)}
        </Form.Item>
        {this.state.ewShow && (
          <div className={styles.selList}>
            <List
              size="small"
              bordered
              dataSource={temp || selList}
              renderItem={item => <List.Item>{item.text}</List.Item>}
              onClick={this.listItem}
            />
          </div>
        )}
      </Form>
    );
  }
}

export default AntiCheatForm;
