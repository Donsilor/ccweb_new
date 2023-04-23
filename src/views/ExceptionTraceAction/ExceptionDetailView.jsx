import React, { Component } from 'react';
import { Button, Table, Tabs, Spin } from 'antd';
import DetailWrapper from 'layouts/DetailWrapper';
import DetailInfoGrid from 'components/DetailInfoGrid';
import OperationArea from 'components/OperationArea';
import ModalWithForm from 'components/ModalForm';
import { httpFormClient } from 'common/axios';
import _isEmpty from 'lodash/isEmpty';
import ExcepTypeModal from './ExcepTypeModal';
import * as AdcMapper from './modalMapper';

const TabPane = Tabs.TabPane;
export default class ExceptionDetailView extends Component {
  state = {
    adcType: {},
    modalShowing: false,
    recodeModalShowing: false,
  };
  goBack = () => {
    const { search, pathname } = this.props.location;
    let menu = '/spotException';
    if (pathname.startsWith('/movingException')) {
      menu = '/movingException';
    }
    if (search === '?tab=done') {
      this.props.history.push(`${menu}/list/done`);
    } else {
      this.props.history.push(`${menu}/list/todo`);
    }
  };

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    const value = {
      spotdetailId: this.props.match.params.spottestId,
    };
    this.props.fetch(value);
  };
  modalShow = adcType => e => {
    this.setState({
      adcType,
      modalShowing: true,
    });
  };
  handleOk = () => {
    this.setState({
      modalShowing: false,
    });
    if (this.state.adcType.adcTitle === '关闭任务' || this.state.adcType.adcTitle === '更改异常类型') {
      this.goBack();
    } else {
      this.handleSearch();
    }
  };

  handleRecordModalOk = () => {
    this.setState(
      {
        modalShowing: false,
        recodeModalShowing: false,
      },
      this.handleSearch
    );
  };
  handleCancel = () => {
    this.setState({
      modalShowing: false,
      recodeModalShowing: false,
    });
  };

  handleRecordSubmit = formData => {
    const { spotdetailId } = this.props.detailData.detail || {};
    if (spotdetailId) {
      return httpFormClient.formSubmit('/ExceptionTraceAction_addExceptionTraceRecord', '', {
        spotdetailId,
        ...formData,
      });
    } else {
      return Promise.reject('数据异常，无法添加处理记录');
    }
  };
  renderBasicInfo = () => {
    const { pathname } = this.props.location;
    const isMoving = pathname.startsWith('/movingException');
    const { detail: data = {} } = this.props.detailData;
    const list = [
      {
        label: '任务号',
        value: data.spottestId,
      },
      {
        label: '子任务号',
        value: data.subSpotIdStr,
      },
      {
        label: '经销商名称',
        value: data.distributorName,
      },
      {
        label: '银行名称',
        value: data.bankName,
      },
      {
        label: '品牌名称',
        value: data.brandName,
      },
      {
        label: '二网名称',
        value: data.ewName,
      },
      {
        label: '车架号',
        value: data.chassis,
      },
      {
        label: '超时补拍情况',
        value: data.reshootTypeName,
      },
      {
        label: '异常时间',
        value: data.excTime,
      },
      {
        label: '异常天数',
        value: data.excDateCount,
      },
      {
        label: '上线状态',
        value: data.liveStatusName,
      },
      {
        label: '预约拍照时间',
        value: data.modifyBookTime,
      },
      {
        label: '任务类型',
        value: data.spotTestTypeName,
      },
      {
        label: '任务下发时间',
        value: data.bookTime,
      },
      {
        label: '延长处理天数',
        value: data.deferNum,
      },
      {
        label: '二网联系人',
        value: data.ewOperatorName,
      },
      {
        label: '二网联系人电话',
        value: data.ewOperatorTel,
      },
      {
        label: '有效期至',
        value: data.validTime,
      },
    ];
    if (isMoving) {
      list.splice(11, 1, {
        label: '任务申请时间',
        value: data.moveApplyTime,
      });
    }
    return list;
  };
  renderReasonInfo = () => {
    const { pathname } = this.props.location;
    const isMoving = pathname.startsWith('/movingException');
    const { detail: data = {} } = this.props.detailData;
    const list = [
      {
        label: '异常原因_二网',
        value: data.ewNotPassFlagName,
      },
      {
        label: '异常原因_平台',
        value: data.ptNotPassFlagName,
      },
      {
        label: '异常原因_最终',
        value: data.bankExcReseaonName,
      },
      {
        label: '异常备注_二网',
        value: data.ewRemarkExc,
      },
      {
        label: '异常备注_平台',
        value: data.ptRemarkExc,
      },
      {
        label: '异常备注_最终',
        value: data.bankExcRemark,
      },
    ];
    const movingList = [
      {
        label: '异常原因_平台',
        value: data.ptNotPassFlagName,
      },
      {
        label: '异常原因_最终',
        value: data.bankExcReseaonName,
      },
      {
        label: '异常备注_平台',
        value: data.ptRemarkExc,
      },
      {
        label: '异常备注_最终',
        value: data.bankExcRemark,
      },
    ];
    return isMoving ? movingList : list;
  };
  render() {
    const {
      recordList = [],
      customManagerList = [],
      checkerList = [],
      trainerList = [],
      riskManagerList = [],
      releaseManagerList = [],
      detail = {},
    } = this.props.detailData;

    const { loading } = this.props;

    const { pathname } = this.props.location;
    const isMoving = pathname.startsWith('/movingException');
    return (
      <Spin spinning={loading}>
        <DetailWrapper title="任务信息">
          <DetailInfoGrid list={this.renderBasicInfo()} />
          <div style={{ border: '1px solid #e8e8e8', marginTop: '10px' }}>
            <div
              style={{
                height: '48px',
                backgroundColor: '#fafafa',
                padding: '0 20px',
                borderBottom: '1px solid #e8e8e8',
              }}
            >
              <span style={{ color: 'rgba(0,0,0,.85)', height: '48px', lineHeight: '48px' }}>异常原因</span>
            </div>
            <div style={{ padding: '20px 0 0 0' }}>
              <DetailInfoGrid list={this.renderReasonInfo()} layout="vertical" col={isMoving ? 2 : 3} />
            </div>
          </div>
        </DetailWrapper>
        <DetailWrapper>
          <Button
            icon="plus"
            onClick={() => {
              this.setState({ recodeModalShowing: true });
            }}
            style={{ marginBottom: '10px' }}
          >
            新增处理记录
          </Button>
          <Tabs defaultActiveKey="1">
            <TabPane tab="操作记录" key="1">
              <Table dataSource={recordList} columns={columns} pagination={false} rowKey="id" size="small" />
            </TabPane>
            <TabPane tab="抽查员处理记录" key="2">
              <Table dataSource={checkerList} columns={columns} pagination={false} rowKey="id" size="small" />
            </TabPane>
            <TabPane tab="培训专员处理记录" key="3">
              <Table dataSource={trainerList} columns={columns} pagination={false} rowKey="id" size="small" />
            </TabPane>
            <TabPane tab="二网专员处理记录" key="4">
              <Table dataSource={riskManagerList} columns={columns} pagination={false} rowKey="id" size="small" />
            </TabPane>
            <TabPane tab="放车专员处理记录" key="5">
              <Table dataSource={releaseManagerList} columns={columns} pagination={false} rowKey="id" size="small" />
            </TabPane>
            <TabPane tab="客户经理处理记录" key="6">
              <Table dataSource={customManagerList} columns={columns} pagination={false} rowKey="id" size="small" />
            </TabPane>
          </Tabs>
        </DetailWrapper>
        <ExcepTypeModal
          title={this.state.adcType.adcTitle}
          visible={this.state.modalShowing}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          configList={this.state.adcType.adcConfig}
          onSubmit={this.state.adcType.endSkill}
          record={this.props.detailData.detail}
          destroyOnClose
        />
        {this.state.recodeModalShowing && (
          <ModalWithForm
            title="新增处理记录"
            onOk={this.handleRecordModalOk}
            onCancel={this.handleCancel}
            onSubmit={this.handleRecordSubmit}
            configList={[
              {
                label: '处理记录',
                key: 'remark',
                type: 'textArea',
                required: true,
              },
            ]}
          />
        )}

        <OperationArea>
          {!_isEmpty(detail) && !loading && detail.endFlag !== 1 && detail.btnHandleChangeTypeFlag === 1 && (
            <Button type="primary" onClick={this.modalShow(AdcMapper.changeExceptionTypeAdc)}>
              更改异常类型
            </Button>
          )}
          {!_isEmpty(detail) &&
            !loading &&
            detail.endFlag !== 1 &&
            detail.bankExcReseaon !== 3 &&
            detail.btnHandleDeferTimeFlag === 1 && (
              <Button type="primary" onClick={this.modalShow(AdcMapper.extendedTimeAdc)}>
                延长处理时间
              </Button>
            )}

          {!_isEmpty(detail) && !loading && detail.endFlag !== 1 && detail.btnHandleEndFlag === 1 && (
            <Button type="danger" icon="close" onClick={this.modalShow(AdcMapper.closeTeskAdc)}>
              关闭任务
            </Button>
          )}
          {!_isEmpty(detail) && !loading && detail.endFlag !== 1 && detail.btnTerminateFlg === 1 && (
            <Button type="danger" icon="stop" onClick={this.modalShow(AdcMapper.endTeskAdc)}>
              终止
            </Button>
          )}
          <Button onClick={this.goBack}>返回</Button>
        </OperationArea>
      </Spin>
    );
  }
}

const columns = [
  {
    title: '操作时间',
    dataIndex: 'operTime',
    align: 'center',
    width: 200,
  },
  {
    title: '操作人',
    width: 100,
    dataIndex: 'operName',
  },
  {
    title: '操作人角色',
    width: 100,
    dataIndex: 'usergroupname',
  },
  {
    title: '操作内容',
    width: 150,
    dataIndex: 'operText',
  },
  {
    title: '描述',
    dataIndex: 'description',
    render: text => <span style={{ whiteSpace: 'normal' }}>{text}</span>,
  },
  {
    title: '备注',
    width: 150,
    dataIndex: 'remark',
    render: text => <span style={{ whiteSpace: 'normal' }}>{text}</span>,
  },
];
