import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Select } from 'antd';
import styles from './style.module.less';
import { FETCH_FACTORY_BRAND, UPDATE_QUERY } from 'redux/modules/regionManagement';
import _first from 'lodash/first';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
class RegionForm extends PureComponent {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired,
    onUpdateQuery: PropTypes.func.isRequired,
  };
  state = {
    factoryValue: '',
    brandValue: '',
    brandList: [],
  };
  componentDidMount() {
    const { factoryValue, brandValue: brandValueProp } = this.props.query;
    this.props.fetch().then(({ payload } = {}) => {
      if (payload) {
        let brandList = [];
        let brandValue = '';
        brandList = [{ label: '全部品牌', value: '' }, ...unique(payload.data.autoMakerOption)];
        if (brandValueProp) {
          brandValue = brandList.find(brand => brand.value === brandValueProp) || '';
        } else {
          brandValue = '';
        }
        this.setState({
          factoryValue,
          brandValue,
          brandList,
        });
        this.props.form.setFields({
          factory: { value: factoryValue || '' },
          brand: { value: brandValueProp || '' },
        });
      }
    });
  }

  handleSearch = e => {
    e.preventDefault();
    e.stopPropagation();
    const { factoryValue, brandValue } = this.state;
    this.props.updateQuery({ factoryValue, brandValue });
    this.forceUpdate(this.props.onSearch);
  };

  handleFactoryChange = value => {
    const { form, list } = this.props;
    let brandList = [];
    let brandValue = '';
    if (value === '') {
      brandList = [{ label: '全部品牌', value: '' }, ...unique(list)];
    } else {
      brandList = unique(list.filter(item => item.value === value));
    }
    if (_first(brandList)) {
      brandValue = _first(brandList).value;
    }
    this.setState({ factoryValue: value, brandValue, brandList });
    form.setFieldsValue({
      brand: brandValue,
    });
  };

  handleBrandChange = value => {
    this.setState({ brandValue: value });
  };

  handleFormReset = () => {
    this.props.form.resetFields();
  };

  renderForm = () => {
    const {
      form: { getFieldDecorator },
      list,
    } = this.props;
    const { brandList } = this.state;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={8}>
          <Col md={6} sm={24} key={'factory'}>
            <FormItem label="汽车厂商">
              {getFieldDecorator('factory', {
                initialValue: '',
              })(
                <Select placeholder="请选择汽车厂商" onChange={this.handleFactoryChange}>
                  <Option value={''} key={'-1'}>
                    全部厂商
                  </Option>
                  {list.map((item, index) => (
                    <Option value={item.value} key={index}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24} key={'brand'}>
            <FormItem label="品牌">
              {getFieldDecorator('brand', {
                initialValue: '',
              })(
                <Select placeholder="请选择品牌" onChange={this.handleBrandChange}>
                  {brandList.map((item, index) => (
                    <Option value={item.value} key={index}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <div style={{ float: 'right', marginBottom: 24, marginRight: 24 }} key="toggleForm">
            <Button icon="search" htmlType="submit">
              查询
            </Button>
            {this.props.children}
          </div>
        </Row>
      </Form>
    );
  };
  render() {
    return <div className={styles.tableListForm}>{this.renderForm()}</div>;
  }
}

const mapStateToProps = store => ({
  list: store.regionManagement.brandList,
  query: store.regionManagement.query,
});

const mapDispatchToProps = dispatch => {
  return {
    fetch: () => dispatch(FETCH_FACTORY_BRAND()),
    updateQuery: data => dispatch(UPDATE_QUERY(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionForm);

function unique(arr) {
  const res = new Map();
  return arr
    .map(item => item.list)
    .reduce((arrA, arrB) => arrA.concat(arrB), [])
    .filter(item => !res.has(item.value) && res.set(item.value, 1));
}
