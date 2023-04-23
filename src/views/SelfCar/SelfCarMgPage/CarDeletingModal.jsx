import React, { Component } from 'react';
import ModalForm from 'components/ModalForm';
import { httpCommonClient } from 'common/axios';

export default class CarDeletingModal extends Component {
  submit = async formData => {
    const { record = {} } = this.props;
    const url = `/self-car/v1.0/cars/delete/${record.id}`;
    return httpCommonClient.deleteMeth(url, formData);
  };
  render() {
    const { record = {} } = this.props;
    return (
      <ModalForm
        title="删除车辆"
        onOk={this.props.onOk}
        onCancel={this.props.onCancel}
        onSubmit={this.submit}
        record={record}
        width={600}
        configList={[
          {
            label: '车架号',
            type: 'label',
            value: record.chassis,
          },
          {
            label: '备注',
            type: 'textArea',
            key: 'remark',
          },
        ]}
      />
    );
  }
}
