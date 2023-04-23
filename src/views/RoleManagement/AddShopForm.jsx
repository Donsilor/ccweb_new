import React, { PureComponent } from 'react';
import { Form, Input, message, Select, Spin } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { httpCommonClient } from 'common/axios';

const { Option } = Select;
@Form.create()
class AddShopForm extends PureComponent {
  state = {
    loading: false,
    seriesDisabled: true,
    typeDisabled: true,
    priceDisabled: true,
    brandList: [],
    seriesList: [],
    typesList: [],
    price: null,
    realPrice: null,
    list: [],
  };
  requiredRule = [
    {
      required: true,
      message: '请输入！',
    },
  ];

  componentDidMount() {
    this.getBrand();
    this.setState({
      list: this.props.goodsList ? this.props.goodsList : [],
    });
  }

  submit = () => {
    const { list } = this.state;
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (
        fieldsValue.vehicle_brand_id === 0 ||
        fieldsValue.vehicle_id === 0 ||
        fieldsValue.vehicle_type_id === 0 ||
        fieldsValue.priceNew === 0
      ) {
        message.error('请填写完所有信息');
        return;
      }

      if (list && list.some(item => item.vehicle_type_id === fieldsValue.vehicle_type_id)) {
        message.error('此车型已经添加，如需修改请删除后新建');
        return;
      }

      this.state.brandList.forEach(item => {
        if (item.brandId === fieldsValue.vehicle_brand_id) {
          fieldsValue.brandName = item.brandName;
        }
      });

      this.state.seriesList.forEach(item => {
        if (item.vehicleSeriesId === fieldsValue.vehicle_id) {
          fieldsValue.goods_name = item.vehicleSeriesName;
        }
      });

      this.state.typesList.forEach(item => {
        if (item.vehicleTypeId === fieldsValue.vehicle_type_id) {
          fieldsValue.goods_name_temp = item.vehicleTypeName;
        }
      });

      this.props.onSubmit(fieldsValue);
      this.setState({
        list: [...list, fieldsValue],
      });
      this.initModal();
    });
  };

  initModal() {
    this.props.form.resetFields();
    this.setState({
      seriesDisabled: true,
      typeDisabled: true,
      priceDisabled: true,
      price: null,
      realPrice: null,
    });
  }

  // 获取品牌信息
  getBrand() {
    if (this.state.brandList.length === 0) {
      this.setState({
        loading: true,
      });

      const url = 'http://39.100.6.76:8087/storeBrands/listall';
      httpCommonClient.get(url).then(res => {
        if (res.data && res.data.data) {
          const data = res.data.data;
          this.setState({
            brandList: data,
            loading: false,
          });
        }
      });
    }
  }

  chooseBrand = value => {
    this.setState({
      seriesDisabled: true,
      typeDisabled: true,
      priceDisabled: true,
      price: '',
      realPrice: '',
    });
    this.getSeries(value);
    this.props.form.resetFields(['vehicle_id', 'vehicle_type_id', 'new_car_price', 'priceNew']);
  };

  getSeries(value) {
    this.setState({
      loading: true,
    });

    const url = 'http://39.100.6.76:8087/storeVehicleSeries/listall/' + value;
    httpCommonClient.get(url).then(res => {
      if (res.data && res.data.data) {
        const data = res.data.data;
        this.setState({
          seriesList: data,
          loading: false,
          seriesDisabled: false,
        });
      }
    });
  }

  chooseSeries = value => {
    this.setState({
      typeDisabled: true,
      priceDisabled: true,
      price: '',
      realPrice: '',
    });
    this.getTypes(value);
    this.props.form.resetFields(['vehicle_type_id', 'new_car_price', 'priceNew']);
  };

  getTypes(value) {
    this.setState({
      loading: true,
    });

    const url = 'http://39.100.6.76:8087/storeVehicleTypes/listall/' + value;
    httpCommonClient.get(url).then(res => {
      if (res.data && res.data.data) {
        const data = res.data.data;
        this.setState({
          typesList: data,
          loading: false,
          typeDisabled: false,
        });
      }
    });
  }

  chooseType = value => {
    // ~
    this.state.typesList.forEach(item => {
      if (item.vehicleTypeId === value) {
        this.setState({
          price: this.regx(item.price),
          realPrice: this.regx(item.price),
          priceDisabled: false,
        });
      }
    });
    this.props.form.resetFields(['new_car_price', 'priceNew']);
  };

  onBlur1 = e => {
    const { value } = e.target;
    // this.props.form.setFieldsValue({ new_car_price: valueTemp });
    this.props.form.setFieldsValue({
      new_car_price: this.regx(value),
    });
  };

  onBlur2 = e => {
    const { value } = e.target;
    // this.props.form.setFieldsValue({ new_car_price: valueTemp });
    this.props.form.setFieldsValue({
      priceNew: this.regx(value),
    });
  };

  regx(value) {
    return value
      .replace(/[^\d.]/g, '')
      .replace(/\.{2,}/g, '.')
      .replace('.', '$#$')
      .replace(/\..*/g, '')
      .replace('$#$', '.')
      .replace(/^\./, '0.')
      .replace(/^(-)*(\d+).(\d\d).*$/, '$1$2.$3');
  }

  renderForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { brandList, seriesList, typesList, price, realPrice } = this.state;
    const formItemLayout = {
      labelCol: {
        span: 7,
      },
      wrapperCol: {
        span: 15,
      },
    };

    return (
      <Spin spinning={this.state.loading}>
        <Form onSubmit={this.submit}>
          <FormItem label="品牌" {...formItemLayout}>
            {getFieldDecorator('vehicle_brand_id', {
              rules: this.requiredRule,
            })(
              <Select
                showSearch
                placeholder="请选择品牌"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                onChange={this.chooseBrand}
              >
                {brandList.map((item, index) => (
                  <Option value={item.brandId} key={index}>
                    {item.brandName}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem label="车系" {...formItemLayout}>
            {getFieldDecorator('vehicle_id', {
              rules: this.requiredRule,
            })(
              <Select
                showSearch
                placeholder="请选择车系"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                onChange={this.chooseSeries}
                disabled={this.state.seriesDisabled}
              >
                {seriesList.map((item, index) => (
                  <Option value={item.vehicleSeriesId} key={index}>
                    {item.vehicleSeriesName}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem label="车型" {...formItemLayout}>
            {getFieldDecorator('vehicle_type_id', {
              rules: this.requiredRule,
            })(
              <Select
                showSearch
                placeholder="请选择车型"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                onChange={this.chooseType}
                disabled={this.state.typeDisabled}
              >
                {typesList.map((item, index) => (
                  <Option value={item.vehicleTypeId} key={index}>
                    {item.vehicleTypeName}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem label="指导价格" {...formItemLayout} required>
            {getFieldDecorator('new_car_price', { initialValue: price })(
              <Input
                disabled={this.state.priceDisabled}
                maxLength={25}
                onChange={this.onBlur1}
                onBlur={this.onBlur1}
                addonAfter={<span>万元</span>}
              />
            )}
          </FormItem>
          <FormItem label="销售价格" {...formItemLayout} required>
            {getFieldDecorator('priceNew', {
              rules: this.requiredRule,
              initialValue: realPrice,
            })(
              <Input
                disabled={this.state.priceDisabled}
                onBlur={this.onBlur2}
                maxLength={25}
                addonAfter={<span>万元</span>}
              />
            )}
          </FormItem>
        </Form>
      </Spin>
    );
  };

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

export default AddShopForm;
