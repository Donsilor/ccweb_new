import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Icon,
  Row,
  Col,
  Modal,
  Select,
  Input,
  DatePicker,
  Radio,
  message,
  Cascader,
  InputNumber,
  Tooltip,
  TimePicker,
} from 'antd';

const configListPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    type: PropTypes.string.isRequired,
    key: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    rules: PropTypes.array,
    optionList: PropTypes.array,
  })
).isRequired;
const dateFormat = 'YYYY-MM-DD';
const { Option, OptGroup } = Select;
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const RangePicker = DatePicker.RangePicker;

export default class ModalWithForm extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    width: PropTypes.number,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    style: PropTypes.object,
    configList: configListPropTypes,
  };

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
    this.setState({
      loading: true,
    });
    this.props
      .onSubmit(formData, this.props.record)
      .then(({ data = {} }) => {
        if (data && (data.result === 0 || data.code === 200)) {
          message.success('操作成功');
          this.props.onOk();
        } else {
          return Promise.reject((data && (data.msg || data.message)) || '操作失败，请重试');
        }
      })
      .catch(err => {
        message.error(err.message || err);
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    const { title = '查看', width, onCancel, configList = [], style, record, col } = this.props;
    return (
      <Modal
        title={title}
        width={width}
        onOk={this.handleOk}
        onCancel={onCancel}
        style={style}
        visible
        confirmLoading={this.state.loading}
        destroyOnClose
      >
        <ModalForm
          configList={configList}
          wrappedComponentRef={form => (this.form = form)}
          onSubmit={this.onSubmit}
          record={record}
          col={col}
        />
      </Modal>
    );
  }
}

@Form.create()
class ModalForm extends PureComponent {
  static propTypes = {
    configList: configListPropTypes,
  };

  handleSubmit = () => {
    this.props.form.validateFields((error, values) => {
      if (!error) {
        this.props.onSubmit(values);
      }
    });
  };

  renderRule = config => {
    let actionName = '输入';
    if (config.type === 'textArea') {
      return (
        config.rules ||
        (config.required
          ? [{ required: true, message: `请输入${config.label}` }, { max: 200, message: '最多输入200个字符' }]
          : [{ max: 200, message: '最多输入200个字符' }])
      );
    } else if (
      config.type === 'radio' ||
      config.type === 'select' ||
      config.type === 'datePicker' ||
      config.type === 'custom'
    ) {
      actionName = '选择';
    }
    if (Array.isArray(config.rules)) {
      config.rules.forEach(rule => {
        if (rule.validator) {
          rule.validator = rule.validator.bind(this);
        }
      });
      return config.rules;
    } else {
      return config.required ? [{ required: true, message: `请${actionName}${config.label}` }] : [];
    }
  };

  renderForm = () => {
    const {
      form: { getFieldDecorator },
      configList,
      record,
      col,
    } = this.props;
    return configList.map((config, index) => {
      switch (config.type) {
        case 'label':
          return (
            <FormItem label={config.label} key={index}>
              <span>{config.key ? record[config.key] : config.value}</span>
            </FormItem>
          );
        case 'input':
          return (
            <Col span={24 / col} key={index}>
              <FormItem label={config.label} key={index}>
                {getFieldDecorator(config.key, {
                  initialValue: config.initialValue,
                  rules: this.renderRule(config),
                })(<Input placeholder={`请输入${config.label}`} disabled={config.disabled} />)}
              </FormItem>
            </Col>
          );
        case 'inputNumber':
          return (
            <FormItem label={config.label} key={index}>
              {getFieldDecorator(config.key, {
                initialValue: config.initialValue,
                rules: this.renderRule(config),
              })(<InputNumber {...config} />)}
            </FormItem>
          );
        case 'textArea':
          return (
            <FormItem label={config.label} key={index}>
              {getFieldDecorator(config.key, {
                rules: this.renderRule(config),
              })(<TextArea placeholder={`请输入${config.label}`} rows={3} {...config} />)}
            </FormItem>
          );
        case 'datePicker':
          return (
            <Col span={24 / col} key={index}>
              <FormItem label={config.label} key={index}>
                {getFieldDecorator(config.key, {
                  rules: this.renderRule(config),
                  initialValue: config.initialValue,
                })(<DatePicker format={config.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'} {...config} />)}
              </FormItem>
            </Col>
          );
        case 'timePicker':
          return (
            <FormItem label={config.label} key={index}>
              {getFieldDecorator(config.key, {
                rules: this.renderRule(config),
                initialValue: config.initialValue,
              })(<TimePicker {...config} />)}
            </FormItem>
          );
        case 'radio':
          return (
            <FormItem label={config.label} key={index}>
              {getFieldDecorator(config.key, {
                rules: this.renderRule(config),
                initialValue: config.initialValue,
              })(
                <Radio.Group disabled={config.disabled} {...config}>
                  {Array.isArray(config.optionList) &&
                    config.optionList.map(option => (
                      <Radio value={option.value} key={option.value}>
                        {option.label}
                      </Radio>
                    ))}
                </Radio.Group>
              )}
            </FormItem>
          );
        case 'select':
          return (
            <Col span={24 / col} key={index}>
              <FormItem label={config.label} key={index}>
                {getFieldDecorator(config.key, {
                  rules: this.renderRule(config),
                  initialValue: config.initialValue,
                })(
                  <Select
                    placeholder={config.placeholder}
                    showSearch={config.showSearch || false}
                    optionFilterProp="children"
                    disabled={config.disabled}
                    {...config}
                  >
                    {Array.isArray(config.optionList) &&
                      (config.optionGroup
                        ? config.optionList.map(optionGroup => (
                          <OptGroup label={optionGroup.groupName} key={optionGroup.groupName}>
                            {optionGroup.list.map(option => (
                              <Option value={option.value} key={option.value}>
                                {option.name}
                              </Option>
                            ))}
                          </OptGroup>
                        ))
                        : config.optionList.map((option, i) => (
                          <Option value={option.value || option.code} key={i}>
                            {option.name || option.label}
                          </Option>
                        )))}
                  </Select>
                )}
              </FormItem>
            </Col>
          );
        case 'custom':
          return (
            <FormItem label={config.label} key={index}>
              {getFieldDecorator(config.key, {
                rules: this.renderRule(config),
                initialValue: config.initialValue,
              })(<Cascader options={config.options} placeholder={`请选择${config.label}`} />)}
            </FormItem>
          );
        default:
          return null;
      }
    });
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout}>
        <Row gutter={24}>{this.renderForm()}</Row>
      </Form>
    );
  }
}
