import React, { Component } from 'react';
import { Tooltip, Icon, Divider, message } from 'antd';
import DetailWrapper from 'layouts/DetailWrapper';
import DetailInfoGrid from 'components/DetailInfoGrid';
import ModalTable from 'components/ModalTable';
import ModalWithForm from 'components/ModalForm';
import { httpFormClient } from 'common/axios';
import moment from 'moment';

export default class BasicInfo extends Component {
  state = {
    showNewRemarkModal: false,
    showHisModal: false,
  };

  onSearch = () => {
    const {
      isEw,
      data: { distributorId, ewId },
    } = this.props;
    return httpFormClient
      .formSubmit('/SpotTestTaskAction_getRemarkList', '', isEw ? { ewId } : { distributorId })
      .then(({ data = {} }) => {
        if (data.result === 0) {
          return data.list;
        } else {
          return Promise.reject(data.msg);
        }
      })
      .catch(err => {
        message.error(err.message || err);
      });
  };

  handleSubmitRemark = value => {
    const {
      isEw,
      data: { distributorId, ewId, ewName, distributorName },
    } = this.props;
    return httpFormClient.formSubmit(
      isEw ? '/SpotTestTaskAction_addEwRemark' : '/SpotTestTaskAction_addDisRemark',
      '',
      isEw ? { ewId, ewName, ...value } : { distributorId, distributorName, ...value }
    );
  };

  handleCancel = () => {
    this.setState({
      showNewRemarkModal: false,
      showHisModal: false,
    });
  };

  handleNewRemarkOk = () => {
    this.setState(
      {
        showNewRemarkModal: false,
        showHisModal: false,
      },
      this.props.reloadData()
    );
  };
  renderInfoList = () => {
    const { isEw, data } = this.props;
    const list = !data
      ? []
      : [
          {
            label: isEw ? '二网名称' : '经销商名称',
            value: isEw ? data.ewName : data.distributorName,
          },
          {
            label: isEw ? '二网联系人' : '经销商联系人',
            value: isEw ? data.ewContactor : data.distContactor,
          },
          {
            label: '联系电话',
            value: isEw ? data.ewMobile : data.distMobile,
          },
          {
            label: isEw ? '二网备注' : '经销商备注',
            value: isEw ? data.ewRemark : data.distRemark,
          },
        ];
    return list;
  };
  render() {
    const { isEw, data, readOnly } = this.props;
    return (
      <DetailWrapper title={isEw ? '二网信息' : '经销商信息'}>
        <DetailInfoGrid list={this.renderInfoList()} layout="vertical" />
        {!readOnly && (
          <div style={{ position: 'absolute', display: 'inline-block', top: '22px', right: '50px' }}>
            <Tooltip title="新增备注">
              <a
                href="javascript:;"
                key="新增备注"
                style={{ color: 'rgba(0, 0, 0, 0.65)' }}
                onClick={() =>
                  this.setState({
                    showNewRemarkModal: true,
                  })
                }
              >
                <Icon type="plus" /> 新增备注
              </a>
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip title="新增备注">
              <a
                href="javascript:;"
                key="历史备注"
                style={{ color: 'rgba(0, 0, 0, 0.65)' }}
                onClick={() =>
                  this.setState({
                    showHisModal: true,
                  })
                }
              >
                <Icon type="clock-circle" /> 历史备注
              </a>
            </Tooltip>
          </div>
        )}
        {this.state.showHisModal && (
          <ModalTable
            title="历史备注"
            onCancel={this.handleCancel}
            onOk={this.handleNewRemarkOk}
            onSearch={this.onSearch}
            columns={isEw ? ewColumns : disColumns}
            width={600}
          />
        )}
        {this.state.showNewRemarkModal && (
          <ModalWithForm
            title="新增备注"
            onCancel={this.handleCancel}
            onOk={this.handleNewRemarkOk}
            onSearch={this.onSearch}
            onSubmit={this.handleSubmitRemark}
            configList={[
              {
                type: 'label',
                label: isEw ? '二网名称' : '经销商名称',
                key: isEw ? 'ewName' : 'distributorName',
              },
              {
                type: 'textArea',
                label: '备注',
                key: 'remark',
                required: true,
              },
            ]}
            width={600}
            record={data}
          />
        )}
      </DetailWrapper>
    );
  }
}

const ewColumns = [
  {
    title: '时间',
    dataIndex: 'opTime',
    width: 120,
    render: text => text && text.time && moment.unix(text.time / 1000).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '操作人',
    width: 120,
    dataIndex: 'opUserName',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

const disColumns = [
  {
    title: '时间',
    dataIndex: 'opTime',
    width: 120,
    render: text => text && text.time && moment.unix(text.time / 1000).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '操作人',
    width: 120,
    dataIndex: 'opUserName',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];
