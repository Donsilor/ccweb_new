import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Input, Form, message } from 'antd';
import { UPDATE_REGION } from 'redux/modules/regionManagement';

class RegionEditModal extends Component {
  handleOk = () => {
    this.form && this.form.handleSubmit();
  };
  handleCancel = () => {
    this.props.handleCancel(false);
  };
  handleSubmit = formData => {
    if (formData && formData.regionName) {
      const { factoryId, region = {} } = this.props;
      const value = {
        type: region.id ? 'upDate' : 'add',
        id: region.id || factoryId,
        regionName: formData.regionName,
      };
      this.props
        .updateRegion(value)
        .then(({ payload }) => {
          if (payload.data && payload.data.result == '0') {
            this.props.handleCancel(true);
            message.success('大区保存成功');
          } else {
            return Promise.reject(payload.data.msg || '大区保存失败');
          }
        })
        .catch(err => {
          message.error(err);
        });
    }
  };
  render() {
    const { region, loading } = this.props;
    return (
      <Modal
        title={region ? '修改大区' : '新增大区'}
        visible={this.props.showModal}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        confirmLoading={loading}
      >
        <RegionNameForm
          regionName={(region && region.regionName) || ''}
          wrappedComponentRef={form => (this.form = form)}
          modalHandleOk={this.handleSubmit}
        />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.regionManagement.loading,
});

const mapDispatchToProps = dispatch => ({
  updateRegion: data => dispatch(UPDATE_REGION(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionEditModal);

const FormItem = Form.Item;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
@Form.create()
class RegionNameForm extends Component {
  handleSubmit = () => {
    this.props.form.validateFields((error, values) => {
      if (!error) {
        console.log('no error', values);
        this.props.modalHandleOk(values);
      }
    });
  };
  render() {
    const {
      form: { getFieldDecorator },
      regionName,
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        <FormItem label="大区名字" {...layout}>
          {getFieldDecorator('regionName', {
            initialValue: regionName,
            rules: [
              { type: 'string', required: true, message: '请输入大区名称' },
              { max: 20, message: '大区名称不能超过20个字符' },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    );
  }
}
