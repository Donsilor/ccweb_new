import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import EwAuditTable from '../EwAuditTable';

export default class ModalTable extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    width: PropTypes.number,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    columns: PropTypes.array,
    data: PropTypes.array,
    style: PropTypes.object,
    rowIndex: PropTypes.string,
  };

  state = {
    list: [],
  };
  componentDidMount() {
    this.props.onSearch &&
      this.props.onSearch().then(list => {
        this.setState({
          list,
        });
      });
  }

  render() {
    const {
      title = '查看',
      width,
      onOk,
      onCancel,
      onSearch,
      columns = [],
      data = [],
      style,
      rowIndex = 'id',
    } = this.props;
    return (
      <Modal title={title} width={width} onOk={onOk} onCancel={onCancel} style={style} visible={true} destroyOnClose>
        <EwAuditTable
          columns={columns}
          data={onSearch ? this.state.list : data}
          pagination={false}
          rowIndex={rowIndex}
          scroll={{ x: 'max-content' }}
        />
      </Modal>
    );
  }
}
