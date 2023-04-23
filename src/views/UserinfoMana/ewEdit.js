import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Button, Upload, Modal, Table, Icon, Spin } from 'antd';
import BackToList from 'components/BackToList';
import { ViewWrapper } from 'layouts/ViewWrapper';
import OperationArea from 'components/OperationArea';
import FormWrapper from 'components/FormWrapper/index.jsx';
import { formatTime } from 'common/utils';
import { httpCommonClient, httpFormClient } from 'common/axios';
import _isEmpty from 'lodash/isEmpty';
import ImageWrapper from './ImageView';
import RcViewer from 'rc-viewer';
import styles from './style.module.less';
const { confirm } = Modal;

export class DetailView extends Component {
  state = {
    loading: false,
    data: [],
    disInfo: [],
    ewInfo: [],
    blocInfo: [],
    brandList: [],
    bankList: [],
    id: this.props.match.params.id,
    getInfoList: {}, //二网详情数据
    disabled: this.props.match.params.id && true,
    ewType: 0,
    belongDistributor: [],
    fileInfo: null,
    previewVisible: false,
    isLicense: false,
  };
  handleSubmit = values => {
    const { id, getInfoList, fileInfo, belongDistributor } = this.state;
    const { cooperationNature, landNature, license } = values;
    let params = {
      ...values,
      areaId: String(values.areaId[2]),
      cooperationNature: cooperationNature && +values.cooperationNature,
      landNature: landNature && +values.landNature,
      brandId: values.brandId.join(','),
      belongDistributor: JSON.stringify(belongDistributor || []),
      licenseId: fileInfo ? fileInfo.key : 0,
    };
    if (id) {
      params.id = id;
      delete params.belongDistributor;
      if (!params.brandId.includes(getInfoList.ew.brandId)) {
        Modal.info({
          title: '提示信息：',
          content: '经营品牌不能删除,请修改后再保存！',
        });
        return;
      }
    }
    if (license == 1 && !params.licenseId) {
      Modal.info({
        title: '提示信息：',
        content: '请上传营业执照照片后再保存！',
      });
      return;
    }
    this.setState({ loading: true });
    httpCommonClient.post(`/EwAction_${id ? 'update' : 'add'} `, params).then(({ data = {} }) => {
      if (data.result === 0) {
        message.success(data.msg);
        this.setState({ loading: false });
        if (id) {
          this.setState({ disabled: true });
          this.getInfo();
        } else {
          this.props.history.push('/ewList');
        }
      } else {
        this.setState({ loading: false });
        message.error(data.msg);
      }
    });
  };
  //查询详情
  getInfo = () => {
    this.setState({ loading: true });
    httpCommonClient.post(`/EwAction_detail`, { id: this.state.id }).then(({ data = {} }) => {
      if (data.result === 0) {
        this.setState({
          loading: false,
          getInfoList: data,
          ewType: data.ew.ewNature,
          belongDistributor: data.ew.belongDistributor,
          isLicense: data.ew.license === 1,
          fileInfo: data.ew.licenseId ? { key: data.ew.licenseId, path: data.business.absolutePath } : null,
        });
      } else {
        this.setState({ loading: false });
      }
    });
  };
  //保存、修改用户信息
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
  //经销商列表
  getDistributorInfo = () => {
    httpCommonClient.post(`/UtilAction_distributorInfo`, {}).then(({ data = {} }) => {
      if (data.result === 0) {
        this.setState({ disInfo: data.list });
      }
    });
  };
  componentDidMount() {
    if (this.state.id) {
      this.getInfo();
    }
    this.getDistributorInfo();
    //二网列表
    httpCommonClient.post(`/AjaxAction_getEwOptions?ewQuery.ewNature=1&ewQuery.status=0`, {}).then(({ data = {} }) => {
      this.setState({ ewInfo: data });
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
    const {
      loading,
      isLicense,
      fileInfo,
      belongDistributor,
      ewType,
      ewInfo,
      disInfo,
      brandList,
      blocInfo,
      getInfoList,
      disabled,
    } = this.state;
    const record = this.state.id ? getInfoList.ew : null;
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
                    key: 'ewName',
                    maxLength: 50,
                    initialValue: record && record.ewName,
                    disabled: disabled,
                    rules: [
                      {
                        required: true,
                        message: '请输入公司名称！',
                      },
                      (rule, value, callback) => {
                        let self = callback;
                        httpFormClient
                          .formSubmit(`/com/xhkj/depart/action/UtilAction_ewIsExists`, '', {
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
                    label: '法人代表',
                    type: 'input',
                    key: 'corporationName',
                    initialValue: record && record.corporationName,
                    required: true,
                    disabled: disabled,
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
                    label: '经营地址',
                    type: 'input',
                    key: 'ewAddress',
                    required: true,
                    disabled: disabled,
                    initialValue: record && record.ewAddress,
                  },
                  {
                    label: '注册地址',
                    type: 'input',
                    key: 'businessAddress',
                    required: true,
                    disabled: disabled,
                    initialValue: record && record.businessAddress,
                  },
                  {
                    label: '二网投资人',
                    type: 'input',
                    key: 'ewManagerName',
                    required: true,
                    disabled: disabled,
                    initialValue: record && record.ewManagerName,
                  },
                  {
                    label: '联系电话',
                    type: 'input',
                    key: 'ewManagerTel',
                    disabled: disabled,
                    initialValue: record && record.ewManagerTel,
                    rules: [{ required: true, pattern: /^\d{11}$/, message: '电话应为11位数字' }],
                  },
                  {
                    label: '二网投资人身份证号',
                    type: 'input',
                    key: 'ewManagerIdnum',
                    disabled: disabled,
                    initialValue: record && record.ewManagerIdnum,
                  },
                  {
                    label: '二网联系人名称',
                    type: 'input',
                    key: 'ewOperatorName',
                    disabled: disabled,
                    initialValue: record && record.ewOperatorName,
                    required: true,
                  },
                  {
                    label: '联系电话',
                    type: 'input',
                    key: 'ewOperatorTel',
                    disabled: disabled,
                    initialValue: record && record.ewOperatorTel,
                    rules: [{ required: true, pattern: /^\d{11}$/, message: '电话应为11位数字' }],
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
                  {
                    label: '是否有营业执照',
                    type: 'select',
                    key: 'license',
                    optionList: [{ label: '有营业执照', value: 1 }, { label: '无营业执照', value: 2 }],
                    required: true,
                    disabled: disabled,
                    initialValue: record && record.license,
                    onChange: val => {
                      this.setState({ isLicense: val === 1, fileInfo: null });
                    },
                  },
                  isLicense && {
                    label: '上传营业执照',
                    type: 'render',
                    render: (
                      <div style={{ display: 'flex' }}>
                        <Upload
                          name="file"
                          accept='image/*'
                          showUploadList={false}
                          action="/com/xhkj/depart/action/AjaxAction_saveFile"
                          beforeUpload={() => this.setState({ loading: true })}
                          onChange={info => {
                            if (info.file.status === 'done') {
                              this.setState({ fileInfo: info.file.response, loading: false });
                              message.success(`上传成功`);
                            } else if (info.file.status === 'error') {
                              message.error(`上传失败`);
                              this.setState({ loading: false });
                            }
                          }}
                        >
                          <Button disabled={record && record.auditStatus !== 0}>
                            <Icon type="upload" /> 上传照片
                          </Button>
                        </Upload>
                        &nbsp;&nbsp;
                        {fileInfo && fileInfo.path && (
                          <div>
                            <Button onClick={() => this.setState({ previewVisible: true })}>查看营业执照</Button>
                            <Modal
                              visible={this.state.previewVisible}
                              footer={null}
                              onCancel={() => this.setState({ previewVisible: false })}
                            >
                              <RcViewer>
                                <img style={{ width: '96%' }} src={fileInfo && fileInfo.path} />
                              </RcViewer>
                            </Modal>
                          </div>
                        )}
                      </div>
                    ),
                  },
                ],
              },
              {
                title: '网点性质',
                list: [
                  {
                    label: '二网类型',
                    span: 12,
                    type: 'radio',
                    key: 'ewNature',
                    required: true,
                    disabled: !!this.state.id,
                    initialValue: record && record.ewNature,
                    optionList: [{ label: '二网主店', value: 1 }, { label: '二网分店', value: 2 }],
                    onChange: e => {
                      this.setState({ ewType: e.target.value });
                    },
                  },
                  ewType == 2 && {
                    span: 12,
                    showSearch: true,
                    label: '所属二网',
                    type: 'select',
                    key: 'parentEw',
                    disabled: !!this.state.id,
                    required: true,
                    optionList: this.state.id ? ewInfo : this.state.data,
                    defaultActiveFirstOption: false,
                    showArrow: false,
                    filterOption: false,
                    notFoundContent: null,
                    onSearch: value => {
                      if (value) {
                        this.setState({ data: ewInfo.filter(v => v.text.includes(value)) });
                      } else {
                        this.setState({ data: [] });
                      }
                    },
                    initialValue: record && record.parentEw,
                  },
                  {
                    span: 12,
                    label: '是否直营店',
                    type: 'label',
                    key: 'isZY',
                    value: ewType == 2 || !belongDistributor.length ? '否' : '是',
                    initialValue: record && record.corporationName,
                  },
                  ewType == 1 && {
                    span: 12,
                    labelInValue: true,
                    showSearch: true,
                    mode: 'multiple',
                    label: '所属4S店',
                    type: 'select',
                    key: 'belongDistributor',
                    optionList: disInfo,
                    valuename: 'distributor',
                    disabled: disabled,
                    initialValue:
                      record && record.belongDistributor
                        ? record.belongDistributor.split(',').map(v => ({ key: v }))
                        : [],
                    onFocus: () => this.getDistributorInfo(),
                    onChange: val => {
                      let arr = [],
                        self = this;
                      val.map(v => arr.push({ id: v.key, name: v.label }));
                      this.setState({ belongDistributor: arr });
                      this.state.id &&
                        confirm({
                          title: '请确认是否修改数据',
                          onOk() {
                            httpCommonClient
                              .post(`/EwAction_updateBelongDistributor`, {
                                id: self.state.id,
                                belongDistributor: JSON.stringify(arr),
                              })
                              .then(({ data = {} }) => {
                                if (data.result === 0) {
                                  Modal.success({
                                    title: '提示信息：',
                                    content: data.msg,
                                  });
                                  self.getInfo();
                                } else {
                                  Modal.error({
                                    title: '错误信息：',
                                    content: data.msg,
                                  });
                                  self.form.props.form.setFieldsValue({
                                    belongDistributor:
                                      record && record.belongDistributor
                                        ? record.belongDistributor.split(',').map(v => ({ key: v }))
                                        : [],
                                  });
                                }
                              });
                          },
                          onCancel() {
                            self.form.props.form.setFieldsValue({
                              belongDistributor:
                                record && record.belongDistributor
                                  ? record.belongDistributor.split(',').map(v => ({ key: v }))
                                  : [],
                            });
                          },
                        });
                    },
                  },
                ],
              },
              {
                title: '其他信息',
                list: [
                  {
                    label: '公司类型',
                    type: 'select',
                    key: 'cooperationNature',
                    optionList: [
                      { label: '', value: '-1' },
                      { label: '有限责任公司', value: '0' },
                      { label: '个体经营', value: '1' },
                    ],
                    disabled: disabled,
                    initialValue: record && (String(record.cooperationNature) || null),
                  },
                  {
                    label: '统一社会信用代码',
                    type: 'input',
                    key: 'businessLicense',
                    disabled: disabled,
                    initialValue: record && record.businessLicense,
                    rules: [
                      {                      
                        pattern: new RegExp(/^[0-9A-Za-z]+$/, "g"),
                        message: '请输入数字或字母',
                      },
                      (rule, value, callback) => {
                        let self = callback;
                        httpFormClient
                          .formSubmit(`UtilAction_ewCUSCCIsExists`, '', { businessLicense: value })
                          .then(({ data = {} }) => {
                            if (!record && value && data.result === 1) {
                              self('统一社会信用代码' + data.msg);
                            }else {
                              self();
                            }
                          });
                      },
                    ],
                  },
                  {
                    label: '土地性质',
                    type: 'select',
                    key: 'landNature',
                    disabled: disabled,
                    initialValue: record && (String(record.landNature) || null),
                    optionList: [
                      { label: '', value: '-1' },
                      { label: '自有', value: '0' },
                      { label: '租赁', value: '1' },
                    ],
                  },
                  {
                    label: '注册资本',
                    type: 'inputNumber',
                    key: 'registeredCapital',
                    disabled: disabled,
                    initialValue: record && (record.registeredCapital || null),
                  },
                  {
                    label: '所属集团',
                    type: 'select',
                    key: 'ownedGroupId',
                    optionList: blocInfo,
                    valuename: 'group',
                    disabled: disabled,
                    initialValue: record && (record.ownedGroupId || null),
                    onFocus: () => {
                      httpCommonClient.post(`/UtilAction_blocInfo`, {}).then(({ data = {} }) => {
                        if (data.result === 0) {
                          this.setState({ blocInfo: data.list });
                        }
                      });
                    },
                  },
                  {
                    label: '成立日期',
                    type: 'input',
                    key: 'foundDate',
                    placeholder: 'XXXX-XX-XX格式',
                    disabled: disabled,
                    initialValue: record && record.foundDate,
                    rules: [{ pattern: /^(\d{4})(-)(\d{2})(-)(\d{2})$/, message: '请输入正确的时间格式' }],
                  },
                  {
                    label: '展厅面积',
                    type: 'input',
                    key: 'displayArea',
                    disabled: disabled,
                    initialValue: record && (record.displayArea || null),
                  },
                  {
                    label: '车位数量',
                    type: 'inputNumber',
                    key: 'parkingNum',
                    disabled: disabled,
                    initialValue: record && (record.parkingNum || null),
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
              <div className={styles.collectTit}>网点性质变更记录</div>
              <Table
                columns={[
                  {
                    title: '变更内容',
                    dataIndex: 'description',
                  },
                  {
                    title: '操作人',
                    dataIndex: 'operName',
                  },
                  {
                    title: '操作时间',
                    dataIndex: 'operTime',
                    render: text => text && formatTime(text),
                  },
                ]}
                rowKey="id"
                dataSource={getInfoList.logList}
                pagination={false}
              />
            </div>
          )}
          <OperationArea>
            {this.state.id && disabled ? (
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
              this.state.id && (
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
