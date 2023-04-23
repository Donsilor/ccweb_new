import React, { PureComponent } from 'react';
import { AutoComplete, DatePicker, Form, Input, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import moment from 'moment';

@Form.create()
class SpecialDealerForm extends PureComponent {
  state = {
    startValue: null,
    endValue: null,
    dataSource: [],
  };

  requiredRule = [
    {
      required: true,
      message: '请输入！',
    },
  ];

  componentDidMount() {
    const { record } = this.props;

    this.setState({
      startValue: record.startTime ? moment.unix(new Date(record.startTime).getTime()) / 1000 : null,
      endValue: record.endTime ? moment.unix(new Date(record.endTime).getTime()) / 1000 : null,
    });
  }

  submit = () => {
    const { record } = this.props;
    const TIME_FORMAT = 'YYYY-MM-DD';

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;

      let has = false;

      this.props.dataSource.map(item => {
        if (item === fieldsValue.dealer) {
          has = true;
          return;
        }
      });
      if (!has) {
        message.error('请选择正确的经销商！');
        return;
      }

      fieldsValue.id = record.id;
      fieldsValue.startTime = fieldsValue.startTime.format(TIME_FORMAT);
      fieldsValue.endTime = moment.unix(new Date(fieldsValue.endTime).getTime() / 1000).format(TIME_FORMAT);
      this.props.onSubmit(fieldsValue);
    });
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = value => {
    this.onChange('startValue', value);
  };

  onEndChange = value => {
    this.onChange('endValue', value);
  };

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onSearch = value => {
    // console.log('search: ', value);
    const list = [];
    this.props.dataSource.map(item => {
      if (item.indexOf(value) !== -1) {
        list.push(item);
      }
    });
    this.setState({
      dataSource: list,
    });
  };

  renderForm = () => {
    const {
      form: { getFieldDecorator },
      record,
      modifyType,
    } = this.props;
    const { dataSource } = this.state;
    const formItemLayout = {
      labelCol: {
        span: 7,
      },
      wrapperCol: {
        span: 15,
      },
    };

    return (
      <div>
        <Form onSubmit={this.submit}>
          {modifyType && modifyType === 'modify' && (
            <FormItem label="经销商名称" {...formItemLayout}>
              {getFieldDecorator('dealer', {
                rules: this.requiredRule,
                initialValue: record.dealer,
              })(
                modifyType && modifyType === 'modify' && (
                  <Input disabled={this.props.modifyType && this.props.modifyType === 'modify'} />
                )
              )}
            </FormItem>
          )}
          {modifyType && modifyType === 'add' && (
            <FormItem label="经销商名称" {...formItemLayout}>
              {getFieldDecorator('dealer', {
                rules: this.requiredRule,
              })(
                this.props.modifyType && this.props.modifyType === 'add' && (
                  <AutoComplete
                    dataSource={dataSource}
                    // style={{ width: 200 }}
                    // onSelect={this.onSelect}
                    onSearch={this.onSearch}
                    placeholder="请输入经销商"
                  />
                )
              )}
            </FormItem>
          )}
          <FormItem label="生效日期" {...formItemLayout}>
            {getFieldDecorator('startTime', {
              rules: this.requiredRule,
              initialValue: record.startTime && moment.unix(new Date(record.startTime).getTime() / 1000),
            })(
              <DatePicker disabledDate={this.disabledStartDate} format={'YYYY-MM-DD'} onChange={this.onStartChange} />
            )}
          </FormItem>
          <FormItem label="失效日期" {...formItemLayout}>
            {getFieldDecorator('endTime', {
              rules: this.requiredRule,
              initialValue: record.endTime && moment.unix(new Date(record.endTime).getTime() / 1000),
            })(<DatePicker disabledDate={this.disabledEndDate} format={'YYYY-MM-DD'} onChange={this.onEndChange} />)}
          </FormItem>
        </Form>
      </div>
    );
  };

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

export default SpecialDealerForm;
