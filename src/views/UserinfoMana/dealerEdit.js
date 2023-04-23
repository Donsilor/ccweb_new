import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Button, Spin, Modal, Table } from 'antd';
import BackToList from 'components/BackToList';
import { ViewWrapper } from 'layouts/ViewWrapper';
import OperationArea from 'components/OperationArea';
import FormWrapper from 'components/FormWrapper/index.jsx';
import ModalForm from 'components/ModalForm';
import { httpCommonClient, httpFormClient } from 'common/axios';
import _isEmpty from 'lodash/isEmpty';
import ImageWrapper from './ImageView';
import styles from './style.module.less';
const { confirm } = Modal;

export class DetailView extends Component {
  state = {
    loading: false,
    bankVisible: false,
    automakerInfo: [],
    blocInfo: [],
    brandList: [],
    bankList: [],
    id: this.props.match.params.id,
    getInfoList: {},
    disabled: this.props.match.params.id && true,
  };
  handleSubmit = values => {
    this.setState({ loading: true });
    const { id, getInfoList } = this.state;
    const { ownedGroupId, automakerId, landType } = values;
    let params = {
      ...values,
      customerType: 1,
      areaId: String(values.areaId[2]),
      distributorType: +values.distributorType,
      landType: landType && +values.landType,
      brandId: values.brandId.join(','),
      ownedGroupId: ownedGroupId && String(ownedGroupId),
      automakerId: automakerId && String(automakerId),
    };
    if (id) {
      params.id = id;
      if (!params.brandId.includes(getInfoList.distributor.brandId)) {
        Modal.error({
          title: '错误信息：',
          content: '经营品牌不能删除,请修改后再保存！',
        });
        return;
      }
    }
    httpCommonClient.post(`/DistributorAction_${id ? 'update' : 'add'} `, params).then(({ data = {} }) => {
      if (data.result === 0) {
        message.success(data.msg);
        this.setState({ loading: false });
        if (id) {
          this.setState({ disabled: true });
          this.getInfo();
        } else {
          this.props.history.push('/dealerList');
        }
      } else {
        message.error(data.msg);
        this.setState({ loading: false });
      }
    });
  };
  //查询经销商详情
  getInfo = () => {
    this.setState({ loading: true });
    httpCommonClient.post(`/DistributorAction_getInfo`, { id: this.state.id }).then(({ data = {} }) => {
      if (data.result === 0) {
        this.setState({ getInfoList: data, loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  };
  onSave = () => {
    let self = this;
    confirm({
      title: '请确认是否保存数据',
      onOk() {
        return new Promise((resolve, reject) => {
          resolve(self.form.handleSubmit());
        });
      },
    });
  };
  updOrderExpSubmit = formData => {
    return httpFormClient
      .formSubmit('/BankDistributorAction_insertBankDistributor', 'bankDistributorVO', {
        ...formData,
        distributorId: this.state.id,
        bankName: this.state.bankList.filter(v => v.value == formData.bankId)[0].label,
        distributorName: this.state.getInfoList.distributor.distributorName,
      })
      .then(res => {
        //debugger;
        const data = eval('(' + res.data + ')');
        if (data.msg == '关联成功') {
          return Promise.resolve({
            data: {
              result: 0,
            },
          });
        } else {
          return Promise.resolve({
            data: {
              result: 1,
              msg: data.msg,
            },
          });
        }
      });
  };
  componentDidMount() {
    if (this.state.id) {
      this.getInfo();
    }
    //汽车厂商列表
    httpCommonClient.post(`/UtilAction_automakerInfo`, {}).then(({ data = {} }) => {
      if (data.result === 0) {
        this.setState({ automakerInfo: data.list.concat([{ automaker_id: -1, automaker_name: '' }]) });
      }
    });
    //所属集团
    httpCommonClient.post(`/UtilAction_blocInfo`, {}).then(({ data = {} }) => {
      if (data.result === 0) {
        this.setState({ blocInfo: data.list.concat([{ group_id: -1, group_name: '' }]) });
      }
    });
    //品牌列表
    httpCommonClient.post(`/UtilAction_brandInfo`, {}).then(respone => {
      if (respone.data.result === 0) {
        this.setState({ brandList: respone.data.list });
      }
    });
  }
  render() {
    const { regionList } = this.props;
    const { loading, automakerInfo, brandList, blocInfo, getInfoList, disabled } = this.state;
    const record = this.state.id ? getInfoList.distributor : null;
    return (
      <Spin spinning={loading} style={{ position: 'fixed' }}>
        <ViewWrapper>
          <FormWrapper
            wrappedComponentRef={form => (this.form = form)}
            handleSubmit={this.handleSubmit}
            configList={[
              {
                title: '基本信息',
                list: [
                  {
                    label: '公司名称',
                    type: 'input',
                    key: 'distributorName',
                    maxLength: 50,
                    initialValue: record && record.distributorName,
                    disabled: disabled,
                    rules: [
                      {
                        required: true,
                        message: '请输入公司名称！',
                      },
                      (rule, value, callback) => {
                        let self = callback;
                        httpFormClient
                          .formSubmit(`/com/xhkj/depart/action/UtilAction_distributorIsExists`, '', {
                            departname: value,
                          })
                          .then(({ data = {} }) => {
                            if (!record && value && data.result === 1) {
                              self('公司' + data.msg);
                            } else {
                              self();
                            }
                          });
                      },
                    ],
                  },
                  {
                    label: '公司类型',
                    type: 'select',
                    key: 'distributorType',
                    optionList: [{ label: '有限责任公司', value: '0' }, { label: '股份有限公司', value: '1' }],
                    required: true,
                    disabled: disabled,
                    initialValue: record && String(record.distributorType),
                  },
                  {
                    label: '客户类型',
                    type: 'input',
                    key: 'customerType',
                    initialValue: '4s店',
                    disabled: true,
                    required: true,
                  },
                  {
                    label: '汽车厂商',
                    type: 'select',
                    key: 'automakerId',
                    optionList: automakerInfo,
                    valuename: 'automaker',
                    showSearch: true,
                    disabled: disabled,
                    initialValue: record && +record.automakerId,
                  },
                  {
                    label: '融资联系人名称',
                    type: 'input',
                    key: 'financingContactorName',
                    required: true,
                    disabled: disabled,
                    initialValue: record && record.financingContactorName,
                  },
                  {
                    label: '融资联系人电话',
                    type: 'input',
                    key: 'financingContactorTel',
                    disabled: disabled,
                    initialValue: record && record.financingContactorTel,
                    rules: [
                      {
                        required: true,
                        message: '请填写融资联系人电话！',
                      },
                      { pattern: /^\d{11}$/, message: '电话应为11位数字' },
                    ],
                  },
                  {
                    label: '行政区域',
                    type: 'cascader',
                    key: 'areaId',
                    optionList: regionList,
                    required: true,
                    disabled: disabled,
                    initialValue: record && [
                      parseInt(record.areaId.substr(0, 2)),
                      parseInt(record.areaId.substr(0, 4)),
                      parseInt(record.areaId),
                    ],
                  },
                  {
                    label: '所属集团',
                    type: 'select',
                    key: 'ownedGroupId',
                    optionList: blocInfo,
                    valuename: 'group',
                    disabled: disabled,
                    initialValue: record && +record.ownedGroupId,
                    onFocus: () => {
                      httpCommonClient.post(`/UtilAction_blocInfo`, {}).then(({ data = {} }) => {
                        if (data.result === 0) {
                          this.setState({ blocInfo: data.list });
                        }
                      });
                    },
                  },
                  {
                    label: '经营地址',
                    type: 'input',
                    key: 'businessAddress',
                    required: true,
                    disabled: disabled,
                    initialValue: record && record.businessAddress,
                  },
                  {
                    mode: 'multiple',
                    span: 12,
                    label: '经营品牌',
                    type: 'select',
                    key: 'brandId',
                    optionList: brandList,
                    showSearch: true,
                    valuename: 'brand',
                    required: true,
                    disabled: disabled,
                    initialValue: record ? record.brandId.split(',') : undefined,
                  },
                ],
              },
              {
                title: '其他信息',
                list: [
                  {
                    label: '二网查库经办人',
                    type: 'input',
                    key: 'operatorName',
                    required: true,
                    disabled: disabled,
                    initialValue: record && record.operatorName,
                  },
                  {
                    label: '联系方式',
                    type: 'input',
                    key: 'operatorPhone',
                    disabled: disabled,
                    initialValue: record && record.operatorPhone,
                    rules: [
                      {
                        required: true,
                        message: '请填写联系方式！',
                      },
                      { pattern: /^\d{11}$/, message: '电话应为11位数字' },
                    ],
                  },
                  {
                    label: '法人代表',
                    type: 'input',
                    key: 'corporationName',
                    required: true,
                    disabled: disabled,
                    initialValue: record && record.corporationName,
                  },
                  {
                    label: '注册地址',
                    type: 'input',
                    key: 'registerAddress',
                    required: true,
                    disabled: disabled,
                    initialValue: record && record.registerAddress,
                  },
                  {
                    label: '注册资本（万元）',
                    type: 'inputNumber',
                    key: 'registeredCapital',
                    required: true,
                    disabled: disabled,
                    initialValue: record && record.registeredCapital,
                  },
                  {
                    label: '成立日期',
                    type: 'input',
                    key: 'foundDate',
                    placeholder: 'XXXX-XX-XX格式',
                    disabled: disabled,
                    initialValue: record && record.foundDate,
                    rules: [
                      {
                        required: true,
                        message: '请填写成立日期！',
                      },
                      { pattern: /^(\d{4})(-)(\d{2})(-)(\d{2})$/, message: '请输入正确的时间格式' },
                    ],
                  },
                  {
                    label: '统一社会信用代码',
                    type: 'input',
                    key: 'distributorCode',
                    disabled: disabled,
                    initialValue: record && record.distributorCode,
                    rules: [
                      {
                        required: true,
                        message: '请输入统一社会信用代码！',
                      },
                      {                      
                        pattern: new RegExp(/^[0-9A-Za-z]+$/, "g"),
                        message: '请输入数字或字母',
                      },
                      (rule, value, callback) => {
                        let self = callback;
                        httpFormClient
                          .formSubmit(`UtilAction_distributorCUSCCIsExists`, '', { distributorCode: value })
                          .then(({ data = {} }) => {
                            if (!record && value && data.result === 1) {
                              self('统一社会信用代码' + data.msg);
                            } else {
                              self();
                            }
                          });
                      },
                    ],
                  },
                  {
                    label: '实收资本（万元）',
                    type: 'inputNumber',
                    key: 'realRegisteredCapital',
                    disabled: disabled,
                    initialValue: record && (record.realRegisteredCapital || null),
                  },
                  {
                    label: '总经理',
                    type: 'input',
                    key: 'generalManagerName',
                    disabled: disabled,
                    initialValue: record && record.generalManagerName,
                  },
                  {
                    label: '联系方式',
                    type: 'input',
                    key: 'generalManagerTel',
                    disabled: disabled,
                    initialValue: record && record.generalManagerTel,
                    rules: [{ pattern: /^\d{11}$/, message: '电话应为11位数字' }],
                  },
                  {
                    label: '土地性质',
                    type: 'select',
                    key: 'landType',
                    disabled: disabled,
                    initialValue: record && (String(record.landType) || null),
                    optionList: [
                      { label: '', value: '-1' },
                      { label: '自有', value: '0' },
                      { label: '租赁', value: '1' },
                    ],
                  },
                ],
              },
              !record && {
                title: '系统管理员账号',
                list: [
                  {
                    label: '手机号',
                    type: 'input',
                    key: 'mobile',
                    rules: [
                      {
                        required: true,
                        message: '请填写手机号！',
                      },
                      { pattern: /^\d{11}$/, message: '电话应为11位数字' },
                    ],
                  },
                  {
                    label: '用户名称',
                    type: 'input',
                    key: 'employeename',
                    required: true,
                  },
                  {
                    label: '用户账号',
                    type: 'input',
                    key: 'accid',
                    rules: [
                      {
                        required: true,
                        message: '请输入用户账号！',
                      },
                      (rule, value, callback) => {
                        let self = callback;
                        httpFormClient
                          .formSubmit(`/com/xhkj/depart/action/UtilAction_accIDIsExists`, '', { accid: value })
                          .then(({ data = {} }) => {
                            if (!record && value && data.result === 1) {
                              self('用户账号' + data.msg);
                            } else if (value && value.length < 6) {
                              self('用户账号不能少于六位');
                            } else {
                              self();
                            }
                          });
                      },
                    ],
                  },
                  {
                    label: '用户密码',
                    type: 'input',
                    key: 'accpwd',
                    required: true,
                  },
                ],
              },
            ]}
          />
          {this.state.id && <ImageWrapper onSearch={this.getInfo} infoList={getInfoList} />}
          {this.state.id && (
            <div>
              <div className={styles.collectTit}>合作银行</div>
              <Table
                columns={[
                  {
                    title: '银行名称',
                    dataIndex: 'bankName',
                  },
                  {
                    title: '品牌',
                    dataIndex: 'fldSerial',
                  },
                  {
                    title: '授信额度（万元）',
                    dataIndex: 'creditAmount',
                  },
                ]}
                rowKey="id"
                dataSource={getInfoList.bankList}
                pagination={false}
              />
            </div>
          )}
          {/*关联银行*/}
          {this.state.bankVisible && (
            <ModalForm
              title="关联银行"
              onOk={() =>
                this.setState({
                  bankVisible: false,
                })
              }
              onCancel={() =>
                this.setState({
                  bankVisible: false,
                })
              }
              onSubmit={this.updOrderExpSubmit}
              configList={[
                {
                  label: '银行名称',
                  type: 'select',
                  key: 'bankId',
                  required: true,
                  optionList: this.state.bankList,
                },
              ]}
            />
          )}
          <OperationArea>
            {this.state.id && record && record.status !== 9 && disabled && (
              <Button
                type="primary"
                loading={this.state.loading}
                onClick={() => {
                  this.setState({ bankVisible: true }, () =>
                    httpFormClient
                      .formSubmit(`/com/xhkj/depart/action/BankAction_findAllBankList`, '', {
                        distributorId: this.state.id,
                      })
                      .then(({ data = {} }) => {
                        this.setState({ bankList: JSON.parse(data) });
                      })
                  );
                }}
              >
                关联银行
              </Button>
            )}
            {this.state.id && record && record.status !== 9 && disabled ? (
              <Button
                type="primary"
                loading={this.state.loading}
                onClick={() => {
                  this.setState({ disabled: false });
                }}
              >
                修改
              </Button>
            ) : (
              this.state.id &&
              record &&
              record.status !== 9 && (
                <Button type="primary" loading={this.state.loading} onClick={this.onSave}>
                  保存
                </Button>
              )
            )}
            {!this.state.id && (
              <Button type="primary" loading={this.state.loading} onClick={this.onSave}>
                保存
              </Button>
            )}
            <BackToList />
          </OperationArea>
        </ViewWrapper>
      </Spin>
    );
  }
}
const mapStateToProps = state => ({
  regionList: state.session.regionListAll,
});

const DetailViewRedux = connect(
  mapStateToProps,
  null
)(DetailView);

export default DetailViewRedux;
