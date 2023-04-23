import React, { Component } from 'react';
import { message, Icon, Tooltip, Modal } from 'antd';
import { httpCommonClient } from 'common/axios';
import ModalForm from 'components/ModalForm';
import styles from './style.module.less';
const { confirm } = Modal;
export default class carExce extends Component {
  state = {
    record: {},
    modVisible: false,
    addVisible: false,
  };
  //删除
  delList = id => () => {
    let self = this;
    confirm({
      title: '请再次确认是否删除？',
      onOk() {
        httpCommonClient
          .post(`/self-car/v1.0/selfExceptionType/delete`, { id: id })
          .then(respone => {
            message.success('操作成功');
            self.props.handleSearch();
          })
          .catch(err => {
            message.success('操作失败');
          });
      },
    });
  };
  onCancel = () => {
    this.setState({
      modVisible: false,
      addVisible: false,
    });
  };
  modList = record => () => {
    this.setState({
      modVisible: true,
      record: record,
    });
  };
  modSubmit = formData => {
    return httpCommonClient
      .post(`/self-car/v1.0/selfExceptionType/update/remark`, {
        id: this.state.record.id,
        remark: formData.remark,
      })
      .then(({ data = {} }) => {
        if (data.code === 200) {
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
  onOk = () => {
    this.setState({
      modVisible: false,
      addVisible: false,
    });
    this.props.handleSearch();
  };
  addSubmit = formData => {
    return httpCommonClient
      .post(`/self-car/v1.0/selfExceptionType/add`, {
        excName: formData.excName,
        remark: formData.remark,
        spottesttype: this.props.spottesttype,
      })
      .then(({ data = {} }) => {
        if (data.code === 200) {
          return Promise.resolve({
            data: {
              result: 0,
            },
          });
        } else {
          return Promise.resolve({
            data: {
              result: 1,
              msg: data.message || '操作失败，请重试',
            },
          });
        }
      });
  };
  render() {
    return (
      <div className={styles.conBar}>
        {this.props.data.map((item, index) => (
          <div key={item.id}>
            <span>{index + 1}</span>
            {item.excName}
            <hr />
            {item.remark}
            &nbsp; &nbsp;
            <Tooltip title="修改" onClick={this.modList(item)}>
              <Icon type="edit" style={{ color: '#66CD00' }} />
            </Tooltip>
            &nbsp; &nbsp;
            <Tooltip title="删除" onClick={this.delList(item.id)}>
              <Icon type="close-circle" style={{ color: '#FF3030' }} />
            </Tooltip>
          </div>
        ))}
        <Tooltip
          title="增加"
          onClick={() => {
            this.setState({ addVisible: true });
          }}
        >
          <Icon type="plus-circle" className={styles.icon} />
        </Tooltip>
        {/*修改异常类型备注*/}
        {this.state.modVisible && (
          <ModalForm
            title="修改异常类型备注"
            onOk={this.onOk}
            onCancel={this.onCancel}
            onSubmit={this.modSubmit}
            configList={[
              {
                label: '异常类型备注',
                type: 'input',
                key: 'remark',
                required: true,
                rules: [
                  {
                    required: true,
                    message: '请填写异常类型备注！',
                  },
                ],
              },
            ]}
          />
        )}
        {/*新增异常类型*/}
        {this.state.addVisible && (
          <ModalForm
            title="新增异常类型"
            onOk={this.onOk}
            onCancel={this.onCancel}
            onSubmit={this.addSubmit}
            configList={[
              {
                label: '异常类型',
                type: 'input',
                key: 'excName',
                required: true,
                rules: [
                  {
                    required: true,
                    message: '请填写异常类型！',
                  },
                ],
              },
              {
                label: '异常类型备注',
                type: 'input',
                key: 'remark',
                required: true,
                rules: [
                  {
                    required: true,
                    message: '请填写异常类型备注！',
                  },
                ],
              },
            ]}
          />
        )}
      </div>
    );
  }
}
