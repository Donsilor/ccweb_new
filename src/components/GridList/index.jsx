import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

class GridList extends PureComponent {
  static defaultProps = {
    loading: false,
    data: [],
  };

  static propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.array,
  };

  static columns = [
    {
      title: 'key',
      dataIndex: 'key',
    },
    {
      title: 'value',
      dataIndex: 'value',
    },
  ];

  render() {
    return (
      <div>
        <Table
          columns={GridList.columns}
          dataSource={this.props.data}
          bordered
          title={null}
          footer={null}
          showHeader={false}
          loading={this.props.loading}
          pagination={ false }
        />
      </div>
    );
  }
}

export default GridList;
