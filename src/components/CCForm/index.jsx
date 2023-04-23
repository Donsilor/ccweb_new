import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button, Icon, Row, Col, Cascader, Select } from 'antd';
import chunk from 'lodash/chunk';
import styles from './style.module.less';
import simpleFormGroup, { advanceFormGroup } from './formItemGroup';
import selfcarFormGroup from 'views/SelfCar/component/formItemGroup';
import aitiCheatFormGroup from 'views/AntiCheat/component/formItemGroup';
import userinfoFormGroup from 'views/UserinfoMana/component/formItemGroup';
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';
const FormItem = Form.Item;

@Form.create()
class CCForm extends PureComponent {
  static defaultProps = {
    query: {
      value: {},
      expandForm: false,
    },
    onUpdateQuery: () => { },
  };
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onExport: PropTypes.func,
    enableExport: PropTypes.bool,
    query: PropTypes.shape({
      value: PropTypes.object.isRequired,
      expandForm: PropTypes.bool.isRequired,
    }).isRequired,
    onUpdateQuery: PropTypes.func.isRequired,
  };
  componentDidMount() {
    const {
      query: { value },
    } = this.props;
    this.props.form.setFieldsValue(value);
  }
  handleSearch = () => {
    this.props.onSearch(this.props.query.value, 1);
  };
  handleSubmit = e => {
    e.preventDefault();
    this.updateQuery();
    this.forceUpdate(this.handleSearch);
  };
  handleExport = e => {
    e.preventDefault();
    this.updateQuery();
    this.forceUpdate(this.props.onExport(this.props.query.value));
  };
  updateQuery = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formValues = {
        ...fieldsValue,
      };
      if (Array.isArray(formValues.timeRange) && formValues.timeRange.length === 2) {
        let [startTime, endTime] = formValues.timeRange;
        startTime = startTime.format(dateFormat);
        endTime = endTime.format(dateFormat);
        formValues.startTime = startTime;
        formValues.endTime = endTime;
        formValues.timeRange = undefined;
      }
      for (let i in formValues) {
        if (formValues[i] && typeof formValues[i] == 'string') {
          formValues[i] = formValues[i].trim()
        }
      }
      this.props.onUpdateQuery({
        value: formValues,
      });
    });
  };
  handleFormReset = () => {
    this.props.form.resetFields();
    this.updateQuery();
  };
  toggleForm = expandForm => e => {
    e.preventDefault();
    this.props.onUpdateQuery({
      expandForm,
    });
  };
  handleQuery = () => {
    const value = this.props.value;
  };
  renderOperFormItem = () => {
    const {
      form: { getFieldDecorator },
      path,
      width,
    } = this.props;
    return (
      <div
        style={{ width: width ? '100%' : 'auto', textAlign: 'right', marginBottom: 24, marginLeft: 10 }}
        key="toggleForm"
      >
        <Button type="primary" htmlType="submit" onClick={this.handleQuery}>
          查询
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
          重置
        </Button>
        {this.props.enableExport && (
          <Button type="primary" style={{ marginLeft: 8 }} onClick={this.handleExport} loading={this.props.isExporting}>
            {this.props.exportName || '导出报表'}
          </Button>
        )}
        {advanceFormGroup(path).length > 0 && this.renderTriggerFormItem()}
      </div>
    );
  };
  renderTriggerFormItem = () =>
    this.props.query.expandForm ? (
      <a style={{ marginLeft: 8 }} onClick={this.toggleForm(false)}>
        收起 <Icon type="up" />
      </a>
    ) : (
      <a style={{ marginLeft: 8 }} onClick={this.toggleForm(true)}>
        展开 <Icon type="down" />
      </a>
    );
  renderUserinfoForm = () => {
    const {
      form: { getFieldDecorator },
      path,
      regionList,
      brandList,
      provCity,
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        <Row gutter={8}>
          {userinfoFormGroup(path).map(item => {
            return item(getFieldDecorator);
          })}
          {brandList && (
            <Col md={6} sm={24} key={'brandId'}>
              <FormItem label="品牌名称">
                {getFieldDecorator('brandId', { initialValue: null })(
                  <Select placeholder="请选择品牌">
                    <Option value={null}>全部</Option>
                    {brandList.map(reason => (
                      <Option value={reason.brand_id} key={reason.brand_id}>
                        {reason.brand_name}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
          )}
          {provCity && (
            <Col md={6} sm={24} key={'provCity'}>
              <FormItem label="省市">
                {getFieldDecorator('provCity')(
                  <Cascader
                    style={{ width: '90%' }}
                    options={regionList}
                    fieldNames={{ label: 'label', value: 'value', children: 'list' }}
                    placeholder="请选择省市"
                    changeOnSelect
                  />
                )}
              </FormItem>
            </Col>
          )}
          {this.renderOperFormItem()}
        </Row>
      </Form>
    );
  };
  renderAitiForm = () => {
    const {
      form: { getFieldDecorator },
      path,
      brandList,
      bankList,
      regionList,
      provCity,
      supplyChain,
      supplyChainName,
      supervisor
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        <Row gutter={8}>
          {aitiCheatFormGroup(path).map(item => {
            return item(getFieldDecorator);
          })}
          {brandList && (
            <Col md={6} sm={24} key={'brandName'}>
              <FormItem label="品牌名称">
                {getFieldDecorator('brandName', { initialValue: null })(
                  <Select showSearch={true} placeholder="请选择品牌">
                    <Option value={null}>全部</Option>
                    {brandList.map((reason, i) => (
                      <Option value={reason.name || reason.brand_name} key={i}>
                        {reason.name || reason.brand_name}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
          )}
          {bankList && (
            <Col md={6} sm={24} key={'bankName'}>
              <FormItem label="银行名称">
                {getFieldDecorator('bankName', { initialValue: null })(
                  <Select showSearch={true} placeholder="请选择银行">
                    <Option value={null}>全部</Option>
                    {bankList.map((reason, i) => (
                      <Option value={reason.label} key={i}>
                        {reason.label}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
          )}
          {provCity && (
            <Col md={8} sm={24} key={'provCity'}>
              <FormItem label="所在城市">
                {getFieldDecorator('provCity')(
                  <Cascader
                    options={regionList}
                    fieldNames={{ label: 'label', value: 'value', children: 'list' }}
                    placeholder="请选择省市"
                    changeOnSelect
                  />
                )}
              </FormItem>
            </Col>
          )}
          {supplyChain && (
            <Col md={6} sm={24} key={'tradername'}>
              <FormItem label="供应链名称">
                {getFieldDecorator(supplyChainName || 'tradername', { initialValue: null })(
                  <Select showSearch={true}>
                    <Option value={null}>全部</Option>
                    {supplyChain.map((reason, i) => (
                      <Option value={reason.name} key={i}>
                        {reason.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
          )}
          {supervisor && (
            <Col md={6} sm={24} key={'supervisor'}>
              <FormItem label="监管方">
                {getFieldDecorator('supervisor', { initialValue: null })(
                  <Select showSearch={true}>
                    <Option value={null}>全部</Option>
                    {supervisor.map((reason, i) => (
                      <Option value={reason.supervisorName} key={i}>
                        {reason.supervisorName}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
          )}
          {this.renderOperFormItem()}
        </Row>
      </Form>
    );
  };
  renderSelfcarForm = () => {
    const {
      form: { getFieldDecorator },
      path,
      excReasonList,
      financialList,
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        <Row gutter={8}>
          {selfcarFormGroup(path).map(item => {
            return item(getFieldDecorator);
          })}
          {excReasonList && (
            <Col md={6} sm={24} key={'excReason'}>
              <FormItem label="异常类型">
                {getFieldDecorator('excReason', { initialValue: null })(
                  <Select placeholder="请选择异常类型">
                    <Option value={null}>全部</Option>
                    {excReasonList &&
                      excReasonList.map(reason => (
                        <Option value={reason.excCode} key={reason.excCode}>
                          {reason.excName}
                        </Option>
                      ))}
                  </Select>
                )}
              </FormItem>
            </Col>
          )}
          {financialList && (
            <Col md={6} sm={24} key={'financial'}>
              <FormItem label="金融产品">
                {getFieldDecorator('financialProducts', { initialValue: null })(
                  <Select placeholder="请选择金融产品">
                    <Option value={null}>全部</Option>
                    {financialList.map(reason => (
                      <Option value={reason.code} key={reason.code}>
                        {reason.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
          )}
          {this.renderOperFormItem()}
        </Row>
      </Form>
    );
  };
  renderSimpleForm = () => {
    const {
      form: { getFieldDecorator },
      regionList,
      path,
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        <Row gutter={8}>
          {simpleFormGroup(path).map(item => {
            if (typeof item === 'function') {
              return item(getFieldDecorator);
            } else {
              return (
                <Col md={6} sm={24} key={'provCity'}>
                  <FormItem label="省市">
                    {getFieldDecorator('provCity')(
                      <Cascader
                        options={regionList}
                        fieldNames={{ label: 'label', value: 'value', children: 'list' }}
                        placeholder="请选择省市"
                        changeOnSelect
                      />
                    )}
                  </FormItem>
                </Col>
              );
            }
          })}
          {this.renderOperFormItem()}
        </Row>
      </Form>
    );
  };
  renderAdvancedForm = () => {
    const {
      form: { getFieldDecorator },
      regionList,
      path,
    } = this.props;
    const formItemList = advanceFormGroup(path).map(item => {
      if (typeof item === 'function') {
        return item(getFieldDecorator);
      } else {
        return (
          <Col md={6} sm={24} key={'provCity'}>
            <FormItem label="省市">
              {getFieldDecorator('provCity')(
                <Cascader
                  options={regionList}
                  fieldNames={{ label: 'label', value: 'value', children: 'list' }}
                  placeholder="请选择省市"
                  changeOnSelect
                />
              )}
            </FormItem>
          </Col>
        );
      }
    });
    formItemList.push(this.renderOperFormItem());
    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        {chunk(formItemList, 4).map((rowList, index) => {
          return (
            <Row gutter={8} key={index}>
              {rowList}
            </Row>
          );
        })}
      </Form>
    );
  };
  render() {
    const { expandForm, selfcarForm, aitiForm, userinfo } = this.props.query;
    if (expandForm) {
      return <div className={styles.tableListForm}>{this.renderAdvancedForm()}</div>;
    } else if (selfcarForm) {
      return <div className={styles.tableListForm}>{this.renderSelfcarForm()}</div>; //自有车模块Form
    } else if (aitiForm) {
      return <div className={styles.tableListForm}>{this.renderAitiForm()}</div>; //防作弊模块Form
    } else if (userinfo) {
      return <div className={styles.tableListForm}>{this.renderUserinfoForm()}</div>; //防作弊模块Form
    } else {
      return <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>;
    }
  }
}

const mapStateToProps = state => ({
  regionList: state.session.regionList,
});

const CCFormRedux = connect(
  mapStateToProps,
  null
)(CCForm);

export default CCFormRedux;
