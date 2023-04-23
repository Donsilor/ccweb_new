import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Cascader, Form, message } from 'antd';
import ModalForm from 'components/ModalForm';
import { httpCommonClient } from 'common/axios';
import _isEmpty from 'lodash/isEmpty';

class CarAddingModal extends Component {
  state = {
    brandList: [],
    financialList: [],
  };
  submit = formData => {
    const { record = {} } = this.props;
    const [brandId, trimId, modelId] = formData.brandId;
    const value = { ...formData, brandId, trimId, modelId, id: record.id || undefined };
    const ifNew = !record.id;
    const url = ifNew ? '/self-car/v1.0/cars/add' : `/self-car/v1.0/cars/update/${record.id}`;
    if (!value.trimId || !value.modelId) {
      return Promise.reject('品牌选择缺少车系或者车型');
    } else {
      return httpCommonClient.submit(url, value);
    }
  };
  fetchBrandInfo = async () => {
    const { record = {} } = this.props;
    const { data = {} } = await httpCommonClient.submit('/self-car/v1.0/brands/find/list');
    if (data.code === 200) {
      const { brandList = [], modelList = [], trimList = [] } = data.data;
      try {
        const _brandList = brandList.map(brand => ({
          label: brand.brandName,
          value: brand.brandId,
          disabled: record.brandId && record.brandId !== brand.brandId,
          children: trimList
            .filter(trim => trim.brandId === brand.brandId)
            .map(trim => ({
              label: trim.trimName,
              value: trim.trimId,
              children: modelList
                .filter(model => model.trimId === trim.trimId)
                .map(model => ({
                  label: model.modelName,
                  value: model.modelId,
                })),
            })),
        }));
        this.setState({
          brandList: _brandList,
        });
      } catch (err) { }
    } else {
      this.setState({
        brandList: [],
      });
    }
  };
  // 金融产品类型列表
  financialList = () => {
    httpCommonClient.submit('/self-car/v1.0/selfFinancialProducts/find/list/all', {}).then(({ data }) => {
      if (data.code === 200) {
        let financialList = data.data;
        this.setState({ financialList });
      }
    });
  };
  componentDidMount() {
    this.fetchBrandInfo();
    this.financialList();
  }
  render() {
    const { departname, departid } = this.props.session;
    const { record = {}, ewList = [], financialList = [] } = this.props;
    return (
      <ModalForm
        title={!_isEmpty(record) ? `修改车辆` : `新增车辆`}
        onOk={this.props.onOk}
        onCancel={this.props.onCancel}
        onSubmit={this.submit}
        record={record}
        width={770}
        configList={[
          {
            label: '经销商',
            type: 'label',
            value: departname,
          },
          {
            label: '车架号',
            type: 'input',
            key: 'chassis',
            rules: [
              {
                required: true,
                message: '请填写车架号！',
              },
              { pattern: new RegExp('^[0-9a-zA-Z]{17,18}$', 'g'), message: '只允许包含17或18位数字、字母' },
            ],
            initialValue: record.chassis,
            disabled: !_isEmpty(record),
          },
          {
            type: 'custom',
            key: 'brandId',
            required: true,
            label: '品牌',
            initialValue: record.brandId && [record.brandId, record.trimId, record.modelId],
            options: this.state.brandList,
          },
          {
            type: 'radio',
            key: 'carType',
            label: '车辆类型',
            required: true,
            initialValue: record.carType,
            optionList: [{ label: '新车', value: 0 }, { label: '二手车', value: 1 }],
            disabled: !_isEmpty(record),
          },
          {
            type: 'select',
            key: 'financialProducts',
            label: '金融产品',
            initialValue: record.financialProducts || 0,
            optionList: this.state.financialList,
          },
          {
            type: 'select',
            showSearch: true,
            key: 'locationId',
            label: '录入位置',
            required: true,
            optionGroup: true,
            initialValue: record.locationId,
            disabled: !_isEmpty(record),
            optionList: [
              { groupName: '主店', list: [{ name: `主店（${departname}）`, value: departid }] },
              {
                groupName: '二网',
                list: ewList.map(item => ({
                  name: item.ewName,
                  value: item.ewId,
                })),
              },
            ],
          },
          {
            label: '合作金融机构',
            type: 'input',
            key: 'bankName',
            initialValue: record.bankName,
          },
          {
            label: '车辆价格（万元）',
            type: 'inputNumber',
            key: 'carprice',
            initialValue: record.carprice,
            rules: [{ pattern: new RegExp(/[\d.]/, 'g'), message: '只允许输入数字' }],
          },
          {
            label: '钥匙数量',
            type: 'inputNumber',
            key: 'carkeys',
            initialValue: record.carkeys,
            rules: [{ pattern: new RegExp(/^[1-9]\d*$/, 'g'), message: '只允许输入数字' }],
          },
          {
            label: '发动机号',
            type: 'input',
            key: 'engine',
            initialValue: record.loenginecationId,
          },
          {
            label: '车身颜色',
            type: 'input',
            key: 'color',
            initialValue: record.color,
          },
        ]}
      />
    );
  }
}

const mapStateToProps = store => ({
  session: store.session.data,
});
export default connect(
  mapStateToProps,
  null
)(CarAddingModal);
