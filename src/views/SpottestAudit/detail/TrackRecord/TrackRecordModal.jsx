import React, { Component } from 'react';
import { httpFormClient } from 'common/axios';
import { Modal, Form, message, Select, Input, Radio, Steps, Button, Icon, Tooltip } from 'antd';
import moment from 'moment';

export default class TrackRecordModal extends Component {
  state = {
    loading: false,
  };
  onSubmit = formValue => {
    const { isEw, id: spottestId, departId } = this.props;
    let value = {};
    const curTime = moment().format('YYYY-MM-DD HH:mm:ss');
    if (isEw) {
      value = {
        spottestId,
        ewId: departId,
        ewGetCall: formValue.ifAnswer,
        ewReply: formValue.feedbackType,
        ewReplyContent: formValue.feedbackContent,
        ewReplyReason: formValue.reason,
        remark: formValue.remark,
        ewCallTime: curTime,
      };
    } else {
      value = {
        spottestId,
        distributorId: departId,
        distGetCall: formValue.ifAnswer,
        distReply: formValue.feedbackType,
        distReplyContent: formValue.feedbackContent,
        distReplyReason: formValue.reason,
        remark: formValue.remark,
        distCallTime: curTime,
      };
    }
    this.setState({
      loading: true,
    });
    return httpFormClient
      .formSubmit(isEw ? 'SpotTestTaskAction_addEwTraceRecord' : 'SpotTestTaskAction_addDisTraceRecord', '', value)
      .then(({ data = {} }) => {
        if (data.result === 0) {
          message.success('添加跟踪记录成功！');
          this.setState({
            loading: false,
          });
          this.props.hideModal(true);
        } else {
          return Promise.reject(data.msg);
        }
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
        message.error(err.message || err);
      });
  };
  handleOk = () => {
    this.form && this.form.handleSubmit();
  };
  handleCancel = () => {
    this.props.hideModal();
  };
  render() {
    const { isEw, visible } = this.props;
    return (
      <Modal
        title={isEw ? '新增二网跟踪记录' : '新增经销商跟踪记录'}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        confirmLoading={this.state.loading}
        width={600}
        destroyOnClose
      >
        <TrackRecordForm isEw={isEw} onSubmit={this.onSubmit} wrappedComponentRef={form => (this.form = form)} />
      </Modal>
    );
  }
}

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
@Form.create()
class TrackRecordForm extends Component {
  state = {
    ifAnswer: null,
    fdType: 0,
    fdContent: 0,
    reason: 0,
    fdContentList: [],
    reasonList: [],
  };
  handleSubmit = () => {
    this.props.form.validateFields((error, values) => {
      if (!error) {
        this.props.onSubmit(values);
      }
    });
  };

  onIfAnswerChange = e => {
    this.setState({ ifAnswer: e.target.value });
  };

  onFdTypeChange = e => {
    this.setState({ fdType: e.target.value }, () => {
      this.calcFdContent();
    });
  };

  onFdContentChange = fdContent => {
    this.setState({ fdContent }, this.calcReason);
  };

  onReasonChange = reason => {
    this.setState({ reason });
  };

  calcFdContent = () => {
    const { fdType } = this.state;
    let fdContentList = [];
    try {
      fdContentList = feedbackList.find(type => type.value === fdType).contentList || [];
    } catch (error) {
      console.error(error.message);
    }
    this.setState({ fdContentList, reasonList: [] }, () => {
      const {
        form: { setFieldsValue },
      } = this.props;
      fdContentList.length > 0 &&
        setFieldsValue({
          feedbackContent: null,
          reason: null,
        });
    });
  };

  calcReason = () => {
    const { fdContentList, fdContent } = this.state;
    let reasonList = [];
    try {
      reasonList = fdContentList.find(content => content.value === fdContent).reasonList || [];
    } catch (error) {
      console.error(error.message);
    }
    this.setState({ reasonList });
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const {
      form: { getFieldDecorator },
      isEw,
    } = this.props;
    const { ifAnswer, fdType, fdContentList, reasonList, reason } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout}>
        <FormItem label="是否打通" key="ifAnswer">
          {getFieldDecorator('ifAnswer', {
            rules: [{ required: true, message: '请选择是否打通' }],
          })(
            <Radio.Group onChange={this.onIfAnswerChange}>
              <Radio value={IF_ANSWER_YES}>是</Radio>
              <Radio value={IF_ANSWER_NO}>否</Radio>
            </Radio.Group>
          )}
        </FormItem>
        {ifAnswer === IF_ANSWER_NO && (
          <FormItem label="反馈内容" key="feedbackContent">
            {getFieldDecorator('feedbackContent', {
              rules: [{ required: true, message: '请选择反馈内容' }],
            })(
              <Radio.Group>
                {fdCListWithNoAnswer.map(item => (
                  <Radio value={item.value} key={item.value}>
                    {item.label}
                  </Radio>
                ))}
              </Radio.Group>
            )}
          </FormItem>
        )}
        {ifAnswer === IF_ANSWER_YES && (
          <FormItem label="反馈类型" key="feedbackType">
            {getFieldDecorator('feedbackType', {
              rules: [{ required: true, message: '请选择反馈类型' }],
            })(
              <Radio.Group onChange={this.onFdTypeChange}>
                {feedbackList.slice(0, isEw ? 4 : 5).map(item => (
                  <Radio value={item.value} key={item.value}>
                    {item.label}
                  </Radio>
                ))}
              </Radio.Group>
            )}
          </FormItem>
        )}
        {ifAnswer === IF_ANSWER_YES && fdContentList.length > 0 && (
          <FormItem label="反馈内容" key="feedbackContent">
            {getFieldDecorator('feedbackContent', {
              rules: [{ required: true, message: '请选择反馈内容' }],
            })(
              <Select onChange={this.onFdContentChange}>
                {fdContentList.map(item => (
                  <Option value={item.value} key={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
        )}
        {ifAnswer === IF_ANSWER_YES && reasonList.length > 0 && (
          <FormItem label="具体原因" key="reason">
            {getFieldDecorator('reason', {
              rules: [{ required: true, message: '请选择具体原因' }],
            })(
              <Select onChange={this.onReasonChange}>
                {reasonList.map(item => (
                  <Option value={item.value} key={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
        )}
        <FormItem label="备注" key="remark">
          {getFieldDecorator('remark', {
            rules: [
              { required: requiredRemarkReason.includes(reason) || fdType === 24, message: '请填写备注' },
              { max: 200, message: '备注最大可输入200个字符' },
            ],
          })(<TextArea row={5} />)}
        </FormItem>
      </Form>
    );
  }
}

const IF_ANSWER_YES = 11;
const IF_ANSWER_NO = 10;

const fdCListWithNoAnswer = [
  {
    label: '关机',
    value: 1020300,
  },
  {
    label: '拒接',
    value: 1020301,
  },
  {
    label: '无人接听',
    value: 1020302,
  },
];

const feedbackList = [
  {
    label: '能拍',
    value: 21,
    contentList: [
      {
        label: '马上拍',
        value: 1121310,
      },
      {
        label: '在忙，稍后拍',
        value: 1121311,
      },
      {
        label: '不在店，联系同事拍',
        value: 1121312,
      },
      {
        label: '不方便，延时拍',
        value: 1121313,
      },
    ],
  },
  {
    label: '拍不了',
    value: 22,
    contentList: [
      {
        label: '车辆已售',
        value: 1122320,
        reasonList: [
          {
            label: '主店出售',
            value: 1122320400,
          },
          {
            label: '二网出售',
            value: 1122320401,
          },
        ],
      },
      {
        label: '系统问题',
        value: 1122321,
        reasonList: [
          {
            label: '照片视频无法上传',
            value: 1122321410,
          },
        ],
      },
      {
        label: '天气原因',
        value: 1122322,
        reasonList: [
          {
            label: '天气恶劣，无法拍照',
            value: 1122322420,
          },
        ],
      },
      {
        label: '取消合作',
        value: 1122323,
        reasonList: [
          {
            label: '有车在店',
            value: 1122323430,
          },
          {
            label: '无车在店',
            value: 1122323431,
          },
        ],
      },
      {
        label: '人不在店',
        value: 1122324,
        reasonList: [
          {
            label: '无人可代拍',
            value: 1122324440,
          },
        ],
      },
      {
        label: '车不在店',
        value: 1122325,
        reasonList: [
          {
            label: '在巡展',
            value: 1122325450,
          },
          {
            label: '在车展',
            value: 1122325451,
          },
          {
            label: '移回主店（针对抽查任务）',
            value: 1122325452,
          },
          {
            label: '尚未到店（针对抽查任务）',
            value: 1122325453,
          },
          {
            label: '移动到其他二网',
            value: 1122325454,
          },
          {
            label: '移动到三网或分店',
            value: 1122325455,
          },
          {
            label: '在库房',
            value: 1122325456,
          },
        ],
      },
    ],
  },
  {
    label: '拍完异常',
    value: 23,
    contentList: [
      {
        label: '车辆已售',
        value: 1123330,
        reasonList: [
          {
            label: '主店出售',
            value: 1123330460,
          },
          {
            label: '二网出售',
            value: 1123330461,
          },
        ],
      },
      {
        label: '定位异常',
        value: 1123331,
        reasonList: [
          {
            label: '在车展',
            value: 1123330470,
          },
          {
            label: '在巡展',
            value: 1123330471,
          },
          {
            label: '移回主店',
            value: 1123330472,
          },
          {
            label: '在其他二网',
            value: 1123330473,
          },
          {
            label: '在三网或分店',
            value: 1123330474,
          },
          {
            label: '在库房',
            value: 1123330475,
          },
          {
            label: '网络原因',
            value: 1123330476,
          },
        ],
      },
    ],
  },
  {
    label: '不配合',
    value: 24,
  },
  {
    label: '帮忙联系',
    value: 25,
  },
];

const requiredRemarkReason = [1122325455, 1122325456];
