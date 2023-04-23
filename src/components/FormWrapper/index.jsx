import React, { PureComponent } from 'react';
import { Form, Row, Col, Select, Input, Radio, Cascader, InputNumber } from 'antd';
import styles from './style.module.less';
const dateFormat = 'YYYY-MM-DD';
const { Option } = Select;
const FormItem = Form.Item;
@Form.create()
class ModalForm extends PureComponent {
  handleSubmit = () => {
    this.props.form.validateFields((error, values) => {
      if (!error) {
        this.props.handleSubmit(values);
      }
    });
  };
  renderRule = config => {
    if (Array.isArray(config.rules)) {
      config.rules.forEach(rule => {
        if (rule.validator) {
          rule.validator = rule.validator.bind(this);
        }
      });
      return config.rules;
    } else {
      return config.required ? [{ required: true, message: `请填写${config.label}` }] : [];
    }
  };
  renderForm = list => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      list &&
      list.map((config, index) => {
        switch (config.type) {
          case 'render':
            return (
              <Col span={6}>
                <FormItem label={config.label} key={index}>
                  {config.render}
                </FormItem>
              </Col>
            );
          case 'label':
            return (
              <Col span={config.span || 6}>
                <FormItem label={config.label} key={index}>
                  <span>{config.value}</span>
                </FormItem>
              </Col>
            );
          case 'input':
            return (
              <Col span={6}>
                <FormItem label={config.label} key={index}>
                  {getFieldDecorator(config.key, {
                    initialValue: config.initialValue,
                    rules: this.renderRule(config),
                  })(<Input style={{ color: '#000' }} {...config} />)}
                </FormItem>
              </Col>
            );
          case 'inputNumber':
            return (
              <Col span={6}>
                <FormItem label={config.label} key={index}>
                  {getFieldDecorator(config.key, {
                    initialValue: config.initialValue,
                    rules: this.renderRule(config),
                  })(<InputNumber style={{ color: '#000', width: '100%' }} {...config} />)}
                </FormItem>
              </Col>
            );
          case 'radio':
            return (
              <Col span={config.span || 6}>
                <FormItem label={config.label} key={index}>
                  {getFieldDecorator(config.key, {
                    rules: this.renderRule(config),
                    initialValue: config.initialValue,
                  })(
                    <Radio.Group {...config}>
                      {Array.isArray(config.optionList) &&
                        config.optionList.map(option => (
                          <Radio value={option.value} key={option.value}>
                            {option.label}
                          </Radio>
                        ))}
                    </Radio.Group>
                  )}
                </FormItem>
              </Col>
            );
          case 'select':
            return (
              <Col span={config.span || 6}>
                <FormItem label={config.label} key={index}>
                  {getFieldDecorator(config.key, {
                    rules: this.renderRule(config),
                    initialValue: config.initialValue,
                  })(
                    <Select optionFilterProp="children" {...config} style={{ color: '#000' }}>
                      {config.optionList &&
                        config.optionList.map((option, i) => {
                          return (
                            <Option
                              style={{ display: option.value == -1 ? 'none' : 'block' }}
                              value={option.value || option.id || option[`${config.valuename}_id`]}
                              key={i}
                            >
                              {option.label || option.text || option[`${config.valuename}_name`]}
                            </Option>
                          );
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
            );
          case 'cascader':
            return (
              <Col span={6} key={index}>
                <FormItem label={config.label}>
                  {getFieldDecorator(config.key, {
                    rules: this.renderRule(config),
                    initialValue: config.initialValue,
                  })(
                    <Cascader
                      style={{ color: '#000' }}
                      {...config}
                      options={config.optionList}
                      fieldNames={{ label: 'label', value: 'value', children: 'list' }}
                    />
                  )}
                </FormItem>
              </Col>
            );
          default:
            return null;
        }
      })
    );
  };
  render() {
    const { configList, record } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} layout="vertical" className={styles.FormWrapper}>
        {configList.map(item => (
          <div>
            {item && <div className={styles.collectTit}>{item.title}</div>}
            <Row gutter={16}>{this.renderForm(item.list)}</Row>
          </div>
        ))}
      </Form>
    );
  }
}
export default ModalForm;
