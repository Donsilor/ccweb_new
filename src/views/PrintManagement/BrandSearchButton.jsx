import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button } from 'antd';
import { updateQuery } from 'redux/modules/printManagement';

export class BrandSearchButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandName: props.query.brandName,
      distributorName: props.query.distributorName,
    };
  }
  onBtnSearch = () => {
    const { distributorName, brandName } = this.state;
    this.props.updateQuery({ brandName, distributorName });
    this.props.onSearch();
  };

  onDistributorSearch = e => {
    this.setState({
      distributorName: e.target.value,
    });
  };

  onBrandSearch = e => {
    this.setState({
      brandName: e.target.value,
    });
  };

  render() {
    const { brandName, distributorName } = this.props.query;
    return (
      <div style={{ width: '600px', display: 'inline-block' }}>
        <div style={{ width: '40%', display: 'inline-block', marginRight: '2%' }}>
          <Input
            onChange={this.onDistributorSearch}
            defaultValue={distributorName}
            placeholder="请输入经销商名称"
            maxLength={20}
            allowClear
          />
        </div>
        <div style={{ width: '40%', display: 'inline-block', marginRight: '2%' }}>
          <Input
            onChange={this.onBrandSearch}
            defaultValue={brandName}
            placeholder="请输入品牌名称"
            maxLength={20}
            allowClear
          />
        </div>
        <div style={{ width: '16%', display: 'inline-block' }}>
          <Button type="primary" icon="search" onClick={this.onBtnSearch}>
            查询
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  query: store.printManagement.query,
});

function mapDispatchToProps(dispatch) {
  return {
    updateQuery: data => dispatch(updateQuery(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrandSearchButton);
