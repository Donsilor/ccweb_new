import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Steps, Spin, message } from 'antd';
import { getAuthStep } from 'common/utils';
import OperationArea from 'components/OperationArea';
import { httpFormClient, httpCommonClient } from 'common/axios';
import {
  authInfoFetch,
  authBondPass,
  authBondNotPass,
  authInfoPass,
  authInfoNotPass,
  authFinallyPass,
  authFinallyNotPass,
  modifyMoveAmount,
} from 'redux/modules/ewAuditDetail';
import BackToList from 'components/BackToList';
import DetailWrapper from 'layouts/DetailWrapper';
import DetailInfoGrid from 'components/DetailInfoGrid';
import ModalForm from 'components/ModalForm';
import DetailImageWrapper from './DetailImageWrapper';
import { translate } from 'common/utils/';
import EBDic from 'common/constant';
import AuthModalForm from './modalForm';
import Comment from './Comment';
import ModalFormMove from './modalFormMove';
import Trend from 'ant-design-pro/lib/Trend';
import isEmpty from 'lodash/isEmpty';
import add from 'lodash/add';
import subtract from 'lodash/subtract';
import moment from 'moment';
import * as R from 'ramda';
import BigNumber from 'bignumber.js';

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const Step = Steps.Step;
const confirm = Modal.confirm;

class AuthInfo extends PureComponent {
  state = {
    modalLoading: false,
    bondModalVisible: false,
    infoModalVisible: false,
    infoPassModalVisible: false,
    finalModalVisible: false,
    moveAmountModalVisible: false,
    stopModalVisible: false,
    returnModalVisible: false,
  };
  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    const { urlParams: { id } = {} } = this.props;
    id && this.props.fetch({ id });
  };

  showBondModal = () => {
    this.setState({
      bondModalVisible: true,
    });
  };
  showInfoModal = () => {
    this.setState({
      infoModalVisible: true,
    });
  };
  showInfoPassModal = () => {
    this.setState({
      infoPassModalVisible: true,
    });
  };
  showFinallyModal = () => {
    this.setState({
      finalModalVisible: true,
    });
  };
  showMoveAmountModal = () => {
    this.setState({
      moveAmountModalVisible: true,
    });
  };
  authBondPass = () => {
    const self = this;
    const { id, bankId, distributorId, fldSerialid, isContractChange, status } = this.props.store.eb;
    confirm({
      title: '确定要通过该二网的保证金审批吗?',
      onOk() {
        self.props
          .authBondPass({
            id,
            bankId,
            distributorId,
            fldSerialid,
            isContractChange,
            status,
          })
          .then(() => {
            message.success('操作成功！');
            self.handleSearch();
          });
      },
    });
  };
  authInfoPass = () => {
    this.setState({
      infoPassModalVisible: true,
    });
  };
  authFinallyPass = () => {
    const self = this;
    const { id, bankId, distributorId, fldSerialid, isContractChange, isfirst, status } = this.props.store.eb;
    confirm({
      title: '确定要通过该二网的信息审批吗?',
      onOk() {
        self.props
          .authFinallyPass({
            id,
            bankId,
            distributorId,
            fldSerialid,
            isContractChange,
            isfirst,
            status,
          })
          .then(() => {
            message.success('操作成功！');
            self.goBack();
          });
      },
    });
  };
  goBack = () => {
    const { menu } = this.props.match.params;
    const { search } = this.props.location;
    const [tab] = R.match(/tab=\w+/g, search || '');

    let link = `/${menu}`;
    if (tab) {
      const tabName = tab && tab.slice(4);
      link = `/${menu}/list/${tabName || 'todoList'}`;
    }
    this.props.history.push(link);
  };
  handleBondModalOk = () => {
    this.bondForm && this.bondForm.handleSubmit();
  };
  handleInfoModalOk = () => {
    this.infoForm && this.infoForm.handleSubmit();
  };
  handleInfoPassModalOk = () => {
    this.handleCancel(this.handleSearch);
    this.props.history.push('/primaryAudit/list/todoList');
  };
  handleFinalModalOk = () => {
    this.finalForm && this.finalForm.handleSubmit();
  };
  handleMoveAmountModalOk = () => {
    this.moveForm && this.moveForm.handleSubmit();
  };
  handleInfoSubmit = formData => {
    const { id, bankId, distributorId, fldSerialid, isContractChange, status } = this.props.store.eb;
    const { firstTrialRemark } = formData;
    return httpFormClient
      .formSubmit('/EwDistributorAction_ewAuditEwInfoPassPt', 'eb', {
        id,
        bankId,
        distributorId,
        fldSerialid,
        isContractChange,
        status,
        firstTrialRemark,
      })
      .then(({ data = {} }) => {
        if (data.result === 0) {
          return Promise.resolve({
            data: {
              result: 0,
            },
          });
        } else {
          return Promise.resolve({
            data: {
              result: 1,
              msg: data.msg || '操作失败，请重试',
            },
          });
        }
      });
  };
  handleCancel = callback => {
    this.setState(
      {
        bondModalVisible: false,
        infoModalVisible: false,
        infoPassModalVisible: false,
        finalModalVisible: false,
        moveAmountModalVisible: false,
      },
      () => {
        if (typeof callback === 'function') {
          callback();
        }
      }
    );
  };
  authBondNotPass = value => {
    this.setState({
      modalLoading: true,
    });
    const { id, bankId, distributorId, fldSerialid, isContractChange, status } = this.props.store.eb;
    this.props
      .authBondNotPass({
        ...value,
        id,
        bankId,
        distributorId,
        fldSerialid,
        isContractChange,
        status,
      })
      .then(() => {
        this.setState(
          {
            bondModalVisible: false,
            infoModalVisible: false,
            infoPassModalVisible: false,
            moveAmountModalVisible: false,
            modalLoading: false,
          }
          //this.handleSearch
        );
        message.success('操作成功！');
        this.props.history.push('/primaryAudit/list/todoList');
      });
  };
  authInfoNotPass = value => {
    this.setState({
      modalLoading: true,
    });
    const remark = value.remark;
    delete value.remark;
    const { id, bankId, distributorId, fldSerialid, isContractChange, status } = this.props.store.eb;
    this.props
      .authInfoNotPass({
        ...value,
        firstTrialRemark: remark,
        id,
        bankId,
        distributorId,
        fldSerialid,
        isContractChange,
        status,
      })
      .then(() => {
        this.setState(
          {
            bondModalVisible: false,
            infoModalVisible: false,
            infoPassModalVisible: false,
            finalModalVisible: false,
            moveAmountModalVisible: false,
            modalLoading: false,
          }
          //this.handleSearch
        );
        message.success('操作成功！');
        this.props.history.push('/primaryAudit/list/todoList');
      });
  };
  authFinallyNotPass = value => {
    this.setState({
      modalLoading: true,
    });
    const remark = value.remark;
    delete value.remark;
    const { id, bankId, distributorId, fldSerialid, isContractChange, status } = this.props.store.eb;
    this.props
      .authFinallyNotPass({
        ...value,
        lastTrialRemark: remark,
        id,
        bankId,
        distributorId,
        fldSerialid,
        isContractChange,
        status,
      })
      .then(() => {
        this.setState(
          {
            bondModalVisible: false,
            infoModalVisible: false,
            infoPassModalVisible: false,
            finalModalVisible: false,
            moveAmountModalVisible: false,
            modalLoading: false,
          },
          this.goBack
        );
        message.success('操作成功！');
      });
  };
  modifyMoveAmount = value => {
    this.setState({
      modalLoading: true,
    });
    const { id, movecontrol } = this.props.store.eb;
    this.props
      .modifyMoveAmount({ ...value, id }, movecontrol)
      .then(({ payload = {} }) => {
        if (payload.data && payload.data.result == 0) {
          this.setState({
            bondModalVisible: false,
            infoModalVisible: false,
            finalModalVisible: false,
            moveAmountModalVisible: false,
            modalLoading: false,
          });
          message.success('操作成功！');
          this.handleSearch();
        } else {
          return Promise.reject((payload.data && payload.data.msg) || '操作失败，请重试');
        }
      })
      .catch(err => {
        message.error(err);
        this.setState({
          modalLoading: false,
        });
      });
  };
  renderBasicInfo = () => {
    const { store } = this.props;
    const { eb } = store;
    let list = [];
    if (!isEmpty(eb)) {
      list = [
        {
          label: '任务编号',
          value: eb.id,
        },
        {
          label: '所属经销商',
          value: eb.distributorName,
        },
        {
          label: '二网名称',
          value: eb.ewName,
        },
        {
          label: '所属品牌',
          value: eb.fldSerialName,
        },
        {
          label: '法定代表人',
          value: eb.corporationName,
        },
        {
          label: '二网类型',
          value: eb.ewId.length === 7 ? '分店' : '主店',
        },
        {
          label: '所属二网',
          value: eb.parentEwName || '-',
        },
        {
          label: '业务类型',
          value: eb.isfirst === 2 ? '解除关联' : eb.isfirst === 0 ? '首次关联' : '续作',
        },
        {
          label: '所属银行',
          value: eb.bankName,
        },
        {
          label: '行政区域',
          value: eb.ewAddress,
        },
        {
          label: '经销商申请时间',
          value: eb.applyTime && eb.applyTime.time && moment.unix(eb.applyTime.time / 1000).format(TIME_FORMAT),
          highlight: true,
        },
        {
          label: '业务状态',
          value: translate(eb.status, EBDic.statusDicList, true, eb.isConfirmReceipt, eb.isException),
        },
        {
          label: '是否存在过异常',
          value: translate(eb.isException, EBDic.commonDic),
        },
        {
          label: '合同开始时间',
          value: eb.startdate,
          highlight: true,
        },
        {
          label: '声明类型',
          value: translate(eb.contractType, EBDic.contractTypeDicList),
        },
        {
          label: '合同是否变更',
          value: translate(eb.isContractChange, EBDic.commonDic),
        },
        {
          label: '合同结束时间',
          value: eb.enddate,
          highlight: true,
        },
      ];
      if (eb.movecontrol == '22') {
        list.push({
          label: '移动台数',
          value: `${eb.moveNum} 台`,
          highlight: true,
        });
      } else if (eb.movecontrol == '21') {
        list.push({
          label: '移动额度',
          value: `${eb.moveMoney} 万`,
          highlight: true,
        });
      }
    }
    return list;
  };
  calcDeposit = (eb, bond) => {
    try {
      let amount = 0;
      if (eb.isConfirmReceipt === 1) {
        if (bond.operationType === 2) {
          amount = add(eb.depositAmount, bond.money);
        } else {
          amount = subtract(eb.depositAmount, bond.money);
        }
      } else {
        amount = eb.depositAmount;
      }
      return amount;
    } catch (e) {
      return '-';
    }
  };
  renderBondInfo = () => {
    const { store } = this.props;
    const { bond, eb } = store;
    const list =
      !isEmpty(bond) && !isEmpty(eb)
        ? [
            {
              label: '是否有保证金',
              value: eb.moneyGetType === '1' || eb.moneyGetType === '2' ? '是' : '否',
            },
            {
              label: '收取方式',
              value: eb.moneyGetType === '1' ? '按店' : eb.moneyGetType === '2' ? '按台' : '无保证金',
              highlight: true,
            },
            {
              label: '已缴保证金金额（万）',
              value: this.calcDeposit(eb, bond),
            },
            {
              label: '保证金类型',
              value: bond.operationType === 1 ? '转入' : '转出',
            },
            {
              label: '本次调整（万）',
              value: (
                <Trend flag={bond.operationType === 1 ? 'up' : 'down'}>
                  {bond.operationType === 1 ? `+${bond.money}` : `-${bond.money}`}
                </Trend>
              ),
              highlight: true,
            },
            {
              label: '调整后金额（万）',
              value:
                eb.isConfirmReceipt === 1
                  ? eb.depositAmount
                  : bond.operationType === 1
                  ? BigNumber(eb.depositAmount)
                      .plus(bond.money)
                      .toNumber()
                  : BigNumber(eb.depositAmount)
                      .minus(bond.money)
                      .toNumber(),
            },
            {
              label: '每台车保证金（万元）',
              value: eb.eachMoney || '',
              highlight: true,
            },
          ]
        : [];
    if (eb && eb.moneyGetType != '2') {
      return list.slice(0, -1);
    } else {
      return list;
    }
  };
  renderHoverList = () => {
    const { store } = this.props;
    const { bond, eb } = store;
    let list = [];
    if (bond && eb) {
      list = [
        {
          label: '所属经销商',
          value: eb.distributorName,
        },
        {
          label: '二网名称',
          value: eb.ewName,
        },
        {
          label: '所属品牌',
          value: eb.fldSerialName,
        },
        {
          label: '经销商申请时间',
          value: eb.applyTime && eb.applyTime.time && moment.unix(eb.applyTime.time / 1000).format(TIME_FORMAT),
        },
        {
          label: '合同开始时间',
          value: eb.startdate,
        },
        {
          label: '合同结束时间',
          value: eb.enddate,
        },
      ];
      if (eb.movecontrol == '22') {
        list.push({
          label: '移动台数',
          value: `${eb.moveNum} 台`,
          highlight: true,
        });
      } else if (eb.movecontrol == '21') {
        list.push({
          label: '移动额度',
          value: `${eb.moveMoney} 万`,
          highlight: true,
        });
      }
    }
    if (!isEmpty(bond) && !isEmpty(eb)) {
      list = list.concat([
        {
          label: '保证金收取方式',
          value: eb.moneyGetType === '1' ? '按店' : eb.moneyGetType === '2' ? '按台' : '无保证金',
        },
        {
          label: '已缴保证金金额（万）',
          value: this.calcDeposit(eb, bond),
        },
        {
          label: '本次调整（万）',
          value: bond.operationType === 1 ? `+${bond.money}` : `-${bond.money}`,
        },
        {
          label: '调整后金额（万）',
          value:
            eb.isConfirmReceipt === 1
              ? eb.depositAmount
              : bond.operationType === 1
              ? BigNumber(eb.depositAmount)
                  .plus(bond.money)
                  .toNumber()
              : BigNumber(eb.depositAmount)
                  .minus(bond.money)
                  .toNumber(),
        },
        {
          label: '每台车保证金（万元）',
          value: eb.eachMoney || '',
        },
      ]);
      if (eb.moneyGetType != '2') {
        list = list.slice(0, -1);
      }
    }
    return list;
  };
  render() {
    const {
      modalLoading,
      bondModalVisible,
      infoModalVisible,
      infoPassModalVisible,
      finalModalVisible,
      moveAmountModalVisible,
      stopModalVisible,
      returnModalVisible,
    } = this.state;
    const { store, match } = this.props;
    const menuName = match.params && match.params.menu;
    const { eb = {}, bank = {} } = store;
    const status = eb ? eb.status : null;
    const step = getAuthStep(status, bank.cmAuditFlag, bank.bpAuditFlag);
    return (
      <div>
        <Spin spinning={this.props.loading}>
          <DetailWrapper title="流程进度">
            <Steps progressDot current={step}>
              <Step title="经销商确认保证金" />
              <Step title="平台审核保证金" />
              <Step title="平台审核二网信息" />
              {bank.cmAuditFlag === 1 && !this.props.loading && <Step title="客户经理签署意见" />}
              {bank.bpAuditFlag === 1 && !this.props.loading && <Step title="支行行长签署意见" />}
              <Step title="银行复审" />
            </Steps>
          </DetailWrapper>
          <Comment data={eb} bank={bank} />
          <DetailWrapper title="二网基础信息">
            <DetailInfoGrid list={this.renderBasicInfo()} />
          </DetailWrapper>
          <DetailWrapper title="保证金信息">
            <DetailInfoGrid list={this.renderBondInfo()} />
          </DetailWrapper>
          <DetailWrapper title="拍摄信息">
            <DetailImageWrapper {...store} contentList={this.renderHoverList()} />
          </DetailWrapper>
          <OperationArea>
            {menuName === 'primaryAudit' && step === 1 && `${status}` !== '21' && status !== 999 && (
              <Button type="primary" onClick={this.authBondPass}>
                保证金审批通过
              </Button>
            )}
            {menuName === 'primaryAudit' && step === 1 && status !== 999 && (
              <Button type="danger" onClick={this.showBondModal}>
                保证金审批不通过
              </Button>
            )}
            {menuName === 'primaryAudit' && step === 2 && status !== 999 && (
              <Button type="primary" onClick={this.authInfoPass}>
                二网信息审批通过
              </Button>
            )}
            {menuName === 'primaryAudit' && step === 2 && status !== 999 && (
              <Button type="danger" onClick={this.showInfoModal}>
                二网信息审批不通过
              </Button>
            )}
            {menuName === 'primaryAudit' && [10, 20].includes(status) && eb.isfirst !== 2 && (
              <Button type="danger" onClick={() => this.setState({ returnModalVisible: true, returnWhere: 2 })}>
                退回到经销商
              </Button>
            )}
            {menuName === 'primaryAudit' && [20].includes(status) && eb.isfirst !== 2 && (
              <Button type="danger" onClick={() => this.setState({ returnModalVisible: true, returnWhere: 1 })}>
                退回到二网
              </Button>
            )}
            {menuName === 'primaryAudit' && [10, 11, 20, 21, 22, 30, 31, 32].includes(status) && eb.isfirst !== 2 && (
              <Button type="danger" onClick={() => this.setState({ stopModalVisible: true })}>
                终止关联
              </Button>
            )}
            {menuName === 'lastAudit' &&
              status === 33 &&
              eb &&
              eb.ewId.length === 5 &&
              (eb.movecontrol == '21' || eb.movecontrol == '22') && (
                <Button type="primary" onClick={this.showMoveAmountModal}>
                  {eb.movecontrol == '22' ? '移动台数修改' : '移动额度修改'}
                </Button>
              )}
            {menuName === 'lastAudit' && status === 33 && bank.cmAuditFlag + bank.bpAuditFlag == 0 && (
              <Button type="primary" onClick={this.authFinallyPass}>
                审批通过
              </Button>
            )}
            {menuName === 'lastAudit' && status === 33 && bank.cmAuditFlag + bank.bpAuditFlag == 0 && (
              <Button type="danger" onClick={this.showFinallyModal}>
                审批不通过
              </Button>
            )}
            <BackToList />
          </OperationArea>
          <Modal
            title="二网保证金审批不通过"
            visible={bondModalVisible}
            onOk={this.handleBondModalOk}
            confirmLoading={modalLoading}
            onCancel={this.handleCancel}
          >
            <AuthModalForm wrappedComponentRef={form => (this.bondForm = form)} onSubmit={this.authBondNotPass} />
          </Modal>
          <Modal
            title="二网信息审批不通过"
            visible={infoModalVisible}
            onOk={this.handleInfoModalOk}
            confirmLoading={modalLoading}
            onCancel={this.handleCancel}
          >
            <AuthModalForm
              wrappedComponentRef={form => (this.infoForm = form)}
              onSubmit={this.authInfoNotPass}
              disableFirstRedio={eb && eb.isChainStore === 1}
              hideThirdRedio={menuName === 'primaryAudit' && step === 2}
            />
          </Modal>
          {infoPassModalVisible && (
            <ModalForm
              title="二网信息审核通过"
              onOk={this.handleInfoPassModalOk}
              onSubmit={this.handleInfoSubmit}
              onCancel={this.handleCancel}
              configList={[
                {
                  label: '备注',
                  type: 'textArea',
                  key: 'firstTrialRemark',
                  required: true,
                },
              ]}
            />
          )}
          {stopModalVisible && (
            <ModalForm
              title="终止关联"
              onOk={() => {
                this.setState({ stopModalVisible: false });
                this.handleSearch();
              }}
              onSubmit={formData => {
                const { id } = this.props.store.eb;
                return httpCommonClient
                  .post('/EwDistributorAction_terminate', {
                    id,
                    ...formData,
                  })
                  .then(({ data = {} }) => {
                    if (data.result === 0) {
                      return Promise.resolve({
                        data: {
                          result: 0,
                        },
                      });
                    } else {
                      return Promise.resolve({
                        data: {
                          result: 1,
                          msg: data.msg || '操作失败，请重试',
                        },
                      });
                    }
                  });
              }}
              onCancel={() => this.setState({ stopModalVisible: false })}
              configList={[
                {
                  label: '终止原因',
                  type: 'textArea',
                  key: 'terminateReason',
                  required: true,
                },
              ]}
            />
          )}
          {returnModalVisible && (
            <ModalForm
              title="退回"
              onOk={() => {
                this.setState({ returnModalVisible: false });
                this.handleSearch();
              }}
              onSubmit={formData => {
                const { id } = this.props.store.eb;
                return httpFormClient
                  .formSubmit('/EwDistributorAction_retunAudit', 'eb', {
                    id,
                    returnWhere: this.state.returnWhere,
                    ...formData,
                  })
                  .then(({ data = {} }) => {
                    if (data.result === 0) {
                      return Promise.resolve({
                        data: {
                          result: 0,
                        },
                      });
                    } else {
                      return Promise.resolve({
                        data: {
                          result: 1,
                          msg: data.msg || '操作失败，请重试',
                        },
                      });
                    }
                  });
              }}
              onCancel={() => this.setState({ returnModalVisible: false })}
              configList={[
                {
                  label: '退回原因',
                  type: 'textArea',
                  key: 'remark',
                  required: true,
                },
              ]}
            />
          )}
          <Modal
            title="审批不通过"
            visible={finalModalVisible}
            onOk={this.handleFinalModalOk}
            confirmLoading={modalLoading}
            onCancel={this.handleCancel}
          >
            <AuthModalForm
              wrappedComponentRef={form => (this.finalForm = form)}
              onSubmit={this.authFinallyNotPass}
              finallyAuth
            />
          </Modal>
          <Modal
            title={eb.movecontrol == '22' ? '移动台数修改' : '移动额度修改'}
            visible={moveAmountModalVisible}
            onOk={this.handleMoveAmountModalOk}
            confirmLoading={modalLoading}
            onCancel={this.handleCancel}
          >
            <ModalFormMove
              wrappedComponentRef={form => (this.moveForm = form)}
              onSubmit={this.modifyMoveAmount}
              eb={eb}
            />
          </Modal>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  store: state.ewAuditDetail.authInfo,
  urlParams: ownProps.match.params,
  loading: state.ewAuditDetail.loading,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: data => dispatch(authInfoFetch(data)),
    authBondPass: data => dispatch(authBondPass(data)),
    authBondNotPass: data => dispatch(authBondNotPass(data)),
    authInfoPass: data => dispatch(authInfoPass(data)),
    authInfoNotPass: data => dispatch(authInfoNotPass(data)),
    authFinallyPass: data => dispatch(authFinallyPass(data)),
    authFinallyNotPass: data => dispatch(authFinallyNotPass(data)),
    modifyMoveAmount: (data, type) => dispatch(modifyMoveAmount(data, type)),
  };
}

const AuthInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthInfo);

export default AuthInfoContainer;
