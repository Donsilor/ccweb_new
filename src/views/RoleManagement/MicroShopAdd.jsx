import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Spin, Select, Input, Checkbox, Row, Col, Button, Modal, message } from 'antd';
import { httpCommonClient } from 'common/axios';
import { createRel, updateDistributorOption } from '../../redux/modules/microShopLink';
import styles from './style.module.less';
import AddShopForm from './AddShopForm';
import EwAuditTable from '../../components/EwAuditTable';

const { Option } = Select;
const { TextArea } = Input;
class MicroShopAdd extends Component {
  state = {
    shopType: 0,
    pageLoading: true,
    ewListLoading: false,
    basicInfoLoading: false,
    ewList: [],
    distributorList: [],
    dist: {},
    ew: {},
    addModalShow: false,
    goodsList: [],
    index: 0,
  };
  requiredRule = [
    {
      required: true,
      message: '请输入！',
    },
  ];

  componentDidMount() {
    this.setState({
      shopType: this.props.location.state.shopType,
      pageLoading: true,
    });
    this.getDistributorOption();
  }

  getDistributorOption() {
    if (this.props.distributorList.length === 0) {
      const url = '/AjaxAction_getDistributorOptions';
      httpCommonClient.post(url).then(res => {
        if (res.data) {
          this.setState({
            distributorList: res.data,
            pageLoading: false,
          });
          this.props.updateDistributor(res.data);
        }
      });
    } else {
      this.setState({
        distributorList: this.props.distributorList,
        pageLoading: false,
      });
    }
  }

  getEwOption(value) {
    this.setState({
      ewList: [],
      ewListLoading: true,
    });

    const url = '/AjaxAction_getEwOptionsByDistributorId?distributorId=' + value;
    httpCommonClient.post(url).then(res => {
      if (res.data) {
        this.setState({
          ewList: res.data,
          ewListLoading: false,
        });
      }
    });
  }

  chooseDistributor = value => {
    const { shopType } = this.state;
    const dist = this.state.distributorList.filter(item => item.value === value)[0];
    if (shopType === 1) {
      this.setState({
        basicInfoLoading: true,
      });
      const url = '/LinkAction_findDistributorById?distributorId=' + value;
      httpCommonClient.post(url).then(res => {
        if (res.data && res.data.data) {
          this.setState({
            dist: res.data.data,
            basicInfoLoading: false,
          });
          this.props.form.resetFields();
        }
      });
    } else if (shopType === 2) {
      this.setState({
        dist: {
          id: dist.value,
          distributorName: dist.label,
        },
        ew: {},
      });
      this.getEwOption(value);
    }
  };

  chooseEw = value => {
    // const { shopType } = this.state;
    const url = '/LinkAction_findEwById?ewId=' + value;
    httpCommonClient.post(url).then(res => {
      if (res.data && res.data.data) {
        this.setState({
          ew: res.data.data,
          basicInfoLoading: false,
        });
        this.props.form.setFields();
      }
    });
  };

  submit = e => {
    const { shopType, dist, ew, goodsList } = this.state;
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;

      if (goodsList && goodsList.length === 0) {
        message.error('请添加销售车型！');
        return;
      }

      const orgin = shopType === 1 ? dist : ew;
      fieldsValue.shopType = shopType;
      fieldsValue.distributorId = dist.id;
      fieldsValue.distributorName = dist.distributorName;
      fieldsValue.ewId = shopType === 1 ? null : ew.id;
      fieldsValue.ewName = shopType === 1 ? null : ew.ewName;
      fieldsValue.goodsList = goodsList;
      fieldsValue.goods_management_category = fieldsValue.businessType.toString();
      fieldsValue.shopProvinceId = orgin.province;
      fieldsValue.shopProvince = orgin.provinceName;
      fieldsValue.shopCityId = orgin.city;
      fieldsValue.shopCity = orgin.cityName;
      fieldsValue.shopCountyId = orgin.county;
      fieldsValue.shopCounty = orgin.countyName;
      fieldsValue.accuracy = orgin.longitude; // 经度
      fieldsValue.dimension = orgin.latitude; // 纬度
      fieldsValue.shopTown = shopType === 1 ? orgin.businessAddress : orgin.ewAddress;
      fieldsValue.address = shopType === 1 ? orgin.businessAddress : orgin.ewAddress;

      console.log('fieldsValue', fieldsValue);
      httpCommonClient.post('/LinkAction_createRel', { ...fieldsValue }).then(({ data }) => {
        if (data.result === 0) {
          message.success('操作成功');
          this.props.history.goBack();
        } else {
          message.error(data.msg);
        }
      });
    });
  };

  addSoldVehicleType = () => {
    this.setState({
      addModalShow: true,
    });
  };

  onModalCancel = () => {
    this.setState({
      addModalShow: false,
    });
  };

  onAddModalOk = () => {
    this.addForm && this.addForm.submit();
  };

  confirmAddModal = value => {
    if (!value) return;
    value.index = this.state.index;
    const list = [...this.state.goodsList, value];
    this.setState({
      goodsList: list,
      index: value.index + 1,
    });
    // this.onModalCancel();
  };

  renderColumns = () => {
    return [
      {
        title: '品牌',
        dataIndex: 'brandName',
      },
      {
        title: '车系',
        dataIndex: 'goods_name',
      },
      {
        title: '车型',
        dataIndex: 'goods_name_temp',
      },
      {
        title: '指导价格(万)',
        dataIndex: 'new_car_price',
      },
      {
        title: '销售价格(万)',
        dataIndex: 'priceNew',
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: (text, record) => {
          return (
            <Fragment>
              <a className={`${styles.action}`} onClick={this.deleteType(record)}>
                删除
              </a>
            </Fragment>
          );
        },
      },
    ];
  };

  deleteType = record => () => {
    const list = this.state.goodsList.filter(item => item.index !== record.index);
    this.setState({ goodsList: list });
  };

  render() {
    const formItemLayout = {
      labelCol: {
        span: 7,
      },
      wrapperCol: {
        span: 7,
      },
    };

    const { shopType, dist, ew, goodsList } = this.state;

    const {
      form: { getFieldDecorator },
    } = this.props;

    const desc =
      '买车不必东奔西走，汽车微店应用尽有。线上选车、线下试车、更多优惠、更多惊喜，欢迎到店咨询，给你不一样的体验。';

    return (
      <Spin spinning={this.state.pageLoading}>
        <Form {...formItemLayout} onSubmit={this.submit}>
          <div>
            <h3>店铺信息</h3>
            <Form.Item label="选择经销商">
              <Select
                showSearch
                placeholder="请选择经销商"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                onChange={this.chooseDistributor}
              >
                {this.state.distributorList.map((item, index) => (
                  <Option value={item.value} key={index}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <div style={{ display: shopType === 2 ? '' : 'none' }}>
              <Spin spinning={this.state.ewListLoading}>
                <Form.Item label="选择二网">
                  <Select
                    showSearch
                    placeholder="请选择二网"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                    onChange={this.chooseEw}
                  >
                    {this.state.ewList.map((item, index) => (
                      <Option value={item.id} key={index}>
                        {item.text}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Spin>
            </div>

            <Spin spinning={this.state.basicInfoLoading}>
              <Form.Item label="业务类型">
                {getFieldDecorator('businessType', {
                  initialValue: ['586'],
                })(
                  <Checkbox.Group style={{ width: '100%' }}>
                    <Row>
                      <Col span={8}>
                        <Checkbox value="586" checked={true} disabled={true} className={styles.disableCheckbox}>
                          新车业务
                        </Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="592">二手车业务</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                )}
              </Form.Item>
              <Form.Item label="店铺名称">
                {getFieldDecorator('shop_name', {
                  rules: this.requiredRule,
                  initialValue: shopType === 1 ? dist.distributorName : ew.ewName,
                })(<Input />)}
              </Form.Item>
              <Form.Item label="所在城市">
                {getFieldDecorator('city', {})(<span>{shopType === 1 ? dist.cityName : ew.cityName}</span>)}
              </Form.Item>
              <Form.Item label="详细地址">
                {getFieldDecorator('address', {})(<span>{shopType === 1 ? dist.businessAddress : ew.ewAddress}</span>)}
              </Form.Item>
              <Form.Item label="登录账号">
                {getFieldDecorator('username', {
                  rules: this.requiredRule,
                  initialValue: shopType === 1 ? dist.distributorName : ew.ewName,
                })(<Input />)}
              </Form.Item>
              <Form.Item label="登录密码">
                <span>123456</span>
              </Form.Item>
              <Form.Item label="联系人">
                {getFieldDecorator('operatorName', {
                  rules: this.requiredRule,
                  initialValue: shopType === 1 ? dist.operatorName : ew.ewOperatorName,
                })(<Input />)}
              </Form.Item>
              <Form.Item label="联系电话">
                {getFieldDecorator('telNum', {
                  rules: this.requiredRule,
                  initialValue: shopType === 1 ? dist.operatorPhone : ew.ewOperatorTel,
                })(<Input />)}
              </Form.Item>
              <Form.Item label="店铺描述">
                {getFieldDecorator('description', { initialValue: desc })(<TextArea rows={3} />)}
              </Form.Item>
            </Spin>
          </div>

          <div>
            <h3>车辆信息</h3>
            <Button type="primary" onClick={this.addSoldVehicleType}>
              添加销售车型
            </Button>
            <EwAuditTable
              loading={false}
              columns={this.renderColumns()}
              data={goodsList}
              pagination={false}
              rowKey={'id'}
              scroll={{ x: 'max-content' }}
              onPageChange={() => {}}
            />
            <Modal
              visible={this.state.addModalShow}
              onOk={this.onAddModalOk}
              onCancel={this.onModalCancel}
              okText={'确认并继续'}
              destroyOnClose
            >
              <AddShopForm
                wrappedComponentRef={form => (this.addForm = form)}
                onSubmit={this.confirmAddModal}
                record={goodsList}
              />
            </Modal>
          </div>

          <Button type="primary" htmlType="submit" className="login-form-button">
            提交
          </Button>
        </Form>
      </Spin>
    );
  }
}

function mapStateToProps(store) {
  return {
    distributorList: store.microShopLink.distributorList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateDistributor: data => {
      dispatch(updateDistributorOption(data));
    },
    createRel: data => {
      dispatch(createRel(data));
    },
  };
}

const MicroShopAdds = Form.create()(MicroShopAdd);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MicroShopAdds);
