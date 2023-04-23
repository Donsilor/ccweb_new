import React, { PureComponent } from 'react';
import { Form, Input, Row, Col, DatePicker, Radio } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const DATEFORMAT = 'YYYY-MM-DD HH:mm:ss';
@Form.create()
class ContractModalForm extends PureComponent {
  static propTypes = {};
  contractConfig = {
    rules: [{ len: 11, message: '意愿函声明编号应为11个字符' }],
  };
  contractConfig2 = {
    rules: [
      { len: 12, message: '效力函声明编号应为12个字符' },
      { pattern: /^X|x/, message: '效力函声明编号必须以X开头' },
    ],
  };
  config = {
    rules: [
      // { type: "string", required: true, message: "请输入备注描述" },
      { max: 200, message: '备注描述不能超过200个字符' },
    ],
  };
  timeConfig = {
    rules: [{ type: 'object', required: true, message: '请选择签收时间' }],
  };
  handleSubmit = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;

      const formValues = {
        contractId: fieldsValue.contractId || undefined,
        contractConfirmData: fieldsValue.contractConfirmData.format(DATEFORMAT),
        // statementReceived: fieldsValue.statementReceived,
        contractSignRemark: fieldsValue.contractSignRemark,
      };

      this.props.onSubmit(formValues);
    });
  };

  componentDidMount() {
    const {
      isChainStore,
      fldSerialName,
      expressNum,
      contractId,
      contractType,
      effectiveId,
      contractConfirmData,
      // statementReceived,
      contractSignRemark,
    } = this.props.record;
    this.props.form.setFields({
      isChainStore: { value: isChainStore === 1 ? '直营店' : '非直营店' },
      fldSerialName: { value: fldSerialName },
      expressNum: { value: expressNum },
      contractType: { value: contractType === 1 ? '意愿函' : '效力函' },
      contractId: { value: contractType === 1 ? contractId : effectiveId },
      contractConfirmData: {
        value: contractConfirmData ? moment(contractConfirmData) : moment(),
      },
      // statementReceived: { value: statementReceived || 0 },
      contractSignRemark: { value: contractSignRemark },
    });
  }

  renderForm = () => {
    const {
      form: { getFieldDecorator },
      record,
    } = this.props;
    const formItemLayout = {
      labelCol: {
        span: 7,
      },
      wrapperCol: {
        span: 15,
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem label="经销商名称" {...formItemLayout}>
              <span>{record.distributorName}</span>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="二网名称" {...formItemLayout}>
              <span>{record.ewName}</span>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem label="二网类型" {...formItemLayout}>
              {getFieldDecorator('isChainStore')(<Input disabled />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="经营品牌" {...formItemLayout}>
              {getFieldDecorator('fldSerialName')(<Input disabled />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem label="快递单号" {...formItemLayout}>
              {getFieldDecorator('expressNum')(<Input disabled />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="声明类型" {...formItemLayout}>
              {getFieldDecorator('contractType')(<Input disabled />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem label="声明编号" {...formItemLayout}>
              {getFieldDecorator('contractId', record.contractType === 1 ? this.contractConfig : this.contractConfig2)(
                <Input placeholder="若不填写系统会自动生成" />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="签收日期" {...formItemLayout}>
              {getFieldDecorator('contractConfirmData', this.timeConfig)(<DatePicker style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem label="签收状态" {...formItemLayout}>
              <span
                className="ant-form-text"
                style={{
                  color: record.statementReceived === 0 ? '#1da02b' : '#ff0000',
                }}
              >
                {record.statementReceived === 0 ? '已签收' : '未签收'}
              </span>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <FormItem label="备注描述" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
              {getFieldDecorator('contractSignRemark', this.config)(<TextArea rows={4} placeholder="请填写备注描述" />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  };
  render() {
    return <div>{this.renderForm()}</div>;
  }
}

export default ContractModalForm;
