import React, { Component } from 'react';
import { Modal, Form, message, Select, Input, Radio, Tooltip, Icon } from 'antd';
import { excepResionList } from 'common/constant';
import { httpFormClient } from 'common/axios';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
export default class ExceptionModal extends Component {
  state = {
    loading: false,
  };
  handleOk = () => {
    this.form && this.form.handleSubmit();
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  submit = formData => {
    const { record: { id } = {} } = this.props;
    const value = {
      ...formData,
      id,
    };
    this.setState({
      loading: true,
    });
    httpFormClient
      .formSubmit('/SpotTestTaskAction_auditNotPass', '', value)
      .then((payload = {}) => {
        if (payload.data && payload.data.result === 0) {
          message.success('标记成功');
          this.props.onOk();
        } else {
          return Promise.reject((payload.data && payload.data.msg) || '标记失败，请重试');
        }
      })
      .catch(err => {
        message.error(err.message || err);
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    const { visible, record, isSubTask, spottestType } = this.props;
    return (
      <Modal
        title="标记异常"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        confirmLoading={this.state.loading}
        destroyOnClose
      >
        {this.props.children}
        <ExceptionForm
          wrappedComponentRef={form => (this.form = form)}
          onSubmit={this.submit}
          record={record}
          isSubTask={isSubTask}
          spottestType={spottestType}
        />
      </Modal>
    );
  }
}

@Form.create()
class ExceptionForm extends Component {
  state = {
    reasonValue: null,
  };
  handleSubmit = () => {
    this.props.form.validateFields((error, values) => {
      if (!error) {
        this.props.onSubmit(values);
      }
    });
  };

  onSelectChange = value => {
    const {
      form: { setFieldsValue },
      isSubTask,
    } = this.props;
    this.setState({
      reasonValue: value,
    });
    if (isSubTask) {
      setFieldsValue({ parentFlag: value });
    }
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const {
      form: { getFieldDecorator },
      record,
      isSubTask,
      spottestType,
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout}>
        <FormItem label="异常原因" key="ptNotpassflag">
          {getFieldDecorator('ptNotpassflag', {
            rules: [{ required: true, message: '请选择异常原因' }],
          })(
            <Select placeholder="请选择异常原因" onChange={this.onSelectChange}>
              {excepResionList
                .filter(item => !hiddenExcepReasonList(record, spottestType).includes(item.value))
                .map(reason => (
                  <Option value={reason.value} key={reason.value}>
                    {reason.name}
                  </Option>
                ))}
            </Select>
          )}
        </FormItem>
        {isSubTask && (
          <FormItem label="父任务异常原因" key="parentFlag">
            {getFieldDecorator('parentFlag')(
              <span>
                {excepResionList.find(item => item.value === record.parentBankExcReseaon).name}
                <Tooltip
                  title={
                    <span>
                      标记异常会同时修改父任务的异常原因（特殊情况：当父任务异常原因为“车辆已售”，子任务只有异常原因为“定位异常”时，才更改父任务异常原因）
                      <br />
                    </span>
                  }
                >
                  <Icon type="info-circle" style={{ color: 'red' }} />
                </Tooltip>
              </span>
            )}
          </FormItem>
        )}
        {(spottestType === 5 || spottestType === 6) && this.state.reasonValue === 5 && (
          <FormItem label="车辆所在位置" key="carMovePosition">
            {getFieldDecorator('carMovePosition', {
              initialValue: 0,
              rules: [{ required: true, message: '请选择车辆所在位置' }],
            })(
              <Radio.Group>
                <Radio value={0}>移入位置</Radio>
                <Radio value={1}>移出位置</Radio>
              </Radio.Group>
            )}
          </FormItem>
        )}
        {(spottestType === 4 || spottestType === 5 || spottestType === 6) && this.state.reasonValue === 3 ? (
          [
            <FormItem label="车辆销售位置" key="carSoldPosition">
              {getFieldDecorator('carSoldPosition', {
                initialValue: 0,
                rules: [{ required: true, message: '请选择车辆销售位置' }],
              })(
                <Radio.Group>
                  <Radio value={0}>主店</Radio>
                  <Radio value={1}>二网</Radio>
                </Radio.Group>
              )}
            </FormItem>,
            <FormItem label="异常描述" key="exceptionRemarkForSell">
              {getFieldDecorator('exceptionRemarkForSell', {
                rules: [{ required: true, message: '请选择异常描述' }],
              })(
                <Radio.Group>
                  <Radio value="违规主体：主店；主店车辆已售未及时操作系统" key="0">
                    违规主体：主店；主店车辆已售未及时操作系统
                  </Radio>
                  <Radio value="违规主体：二网；二网车辆已售未及时操作系统" key="1">
                    违规主体：二网；二网车辆已售未及时操作系统
                  </Radio>
                </Radio.Group>
              )}
            </FormItem>,
          ]
        ) : this.state.reasonValue === 2 ? (
          <FormItem label="异常描述" key="exceptionRemarkForMove">
            {getFieldDecorator('exceptionRemarkForMove', {
              rules: [{ required: true, message: '请选择异常描述' }],
            })(
              <Radio.Group>
                <Radio value="违规主体：二网；二网移车未及时告知主店操作二次移动" key="0">
                  <span style={{ whiteSpace: 'normal', verticalAlign: 'top', height: '50px', display: 'inline-block' }}>
                    违规主体：二网；二网移车未及时告知主店操作二次移动
                  </span>
                </Radio>
                <Radio value="违规主体：主店；主店未及时操作二次移动" key="1">
                  违规主体：主店；主店未及时操作二次移动
                </Radio>
              </Radio.Group>
            )}
          </FormItem>
        ) : (
          <FormItem label="异常描述" key="remark">
            {getFieldDecorator('remark', {
              rules: [{ max: 200, message: '备注描述不能超过200个字符' }],
            })(<TextArea row={3} />)}
          </FormItem>
        )}
      </Form>
    );
  }
}

const hiddenExcepReasonList = (record, spottestType) => {
  /**
   * record.isWaitRetakePhoto === 1
                    ? item.value === 5
                    : spottestType === 5 || spottestType === 6
                    ? [0, 3, 5, 7, 8, 12].includes(item.value)
                    : [0, 1, 2, 3, 5, 7, 8, 12].includes(item.value)
                
   */
  const hiddenValueList = [4, 6, 9, 11];
  if (record.isWaitRetakePhoto === 1) {
    // 超时待补拍任务，不能标记为超时未拍照
    hiddenValueList.push(0);
  }
  if (spottestType === 5 || spottestType === 6) {
    // 移动任务，不能标记为移回主店和移回其他二网
    hiddenValueList.push(1);
    hiddenValueList.push(2);
  }
  return hiddenValueList;
};
