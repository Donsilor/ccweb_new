import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Select, Modal, message } from 'antd';
import styles from './style.module.less';
import { UPDATE_FACTORY_BRAND } from 'redux/modules/regionManagement';
import _first from 'lodash/first';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
class FactoryAddingForm extends PureComponent {
  state = {
    factory: {},
    brand: {},
    brandList: [],
  };
  config = {
    rules: [{ required: true, message: '请选择汽车厂商' }],
  };
  brandConfig = {
    rules: [{ required: true, message: '请选择品牌' }],
  };

  componentDidMount() {
    const { form, list, factory: propFactory } = this.props;
    let brandList = [];
    let factory = (propFactory && list.find(item => item.value === propFactory.automakerId)) || {};
    let brand = {};
    if (!factory.value) {
      brand = {};
    } else {
      brandList = factory.list;
      brand = brandList.find(item => item.value === propFactory.fldSerialid) || {};
    }
    this.setState({ factory, brand, brandList });
    form.setFieldsValue({
      factoryName: factory.value,
      brandName: brand.value,
    });
  }

  handleSubmit = () => {
    this.props.form.validateFields(err => {
      if (err) return;

      const formValues = {
        type: this.props.factory.id ? 'upDate' : 'add',
        id: this.props.factory.id || undefined,
        automakerId: this.state.factory.value,
        automakerName: this.state.factory.label,
        fldSerialid: this.state.brand.value,
        fldserialname: this.state.brand.label,
      };

      formValues &&
        this.props
          .updateFactory(formValues)
          .then(({ payload }) => {
            if (payload && payload.data && payload.data.result == 0) {
              message.success(payload.data.msg);
              this.props.handleCancel(true);
            } else {
              return Promise.reject(payload.data.msg);
            }
          })
          .catch(err => {
            message.error(err || (this.props.factory.id ? '保存厂商失败' : '新增厂商失败'));
          });
    });
  };

  handleCancel = () => {
    this.props.handleCancel();
  };

  handleFactoryChange = value => {
    const { form, list } = this.props;
    let brandList = [];
    let factory = list.find(item => item.value === value);
    let brand = {};
    if (value === '') {
      brandList = [...unique(list)];
    } else {
      brandList = unique(list.filter(item => item.value === value));
    }
    if (_first(brandList)) {
      brand = _first(brandList);
    }
    this.setState({ factory, brand, brandList });
    form.setFieldsValue({
      brandName: brand.value,
    });
  };

  handleBrandChange = value => {
    const { brandList } = this.state;
    const brand = brandList.find(item => item.value === value);
    this.setState({ brand });
  };

  handleFormReset = () => {
    this.props.form.resetFields();
  };
  toggleForm = expandForm => e => {
    e.preventDefault();
    this.props.onUpdateQuery({
      expandForm,
    });
  };
  renderForm = () => {
    const {
      form: { getFieldDecorator },
      list,
    } = this.props;
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const { brandList } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="汽车厂商" {...formItemLayout}>
          {getFieldDecorator('factoryName', this.config)(
            <Select placeholder="请选择汽车厂商" onChange={this.handleFactoryChange}>
              {list.map(item => (
                <Option value={item.value} key={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem label="品牌" {...formItemLayout}>
          {getFieldDecorator('brandName', this.brandConfig)(
            <Select placeholder="请选择品牌" onChange={this.handleBrandChange}>
              {brandList.map(item => (
                <Option value={item.value} key={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
      </Form>
    );
  };
  render() {
    return (
      <Modal
        title={this.props.factory.automakerId ? '编辑厂商' : '新增厂商'}
        visible={this.props.showModal}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
        confirmLoading={this.state.modalLoading}
        destroyOnClose
      >
        {this.props.showModal && this.renderForm()}
      </Modal>
    );
  }
}

const mapStateToProps = store => ({
  list: store.regionManagement.brandList,
});

const mapDispatchToProps = dispatch => {
  return {
    updateFactory: data => dispatch(UPDATE_FACTORY_BRAND(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FactoryAddingForm);

function unique(arr) {
  const res = new Map();
  return arr
    .map(item => item.list)
    .reduce((arrA, arrB) => arrA.concat(arrB), [])
    .filter(item => !res.has(item.value) && res.set(item.value, 1));
}
