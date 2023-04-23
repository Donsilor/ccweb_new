import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Form, Col, Cascader } from 'antd';

const FormItem = Form.Item;

class ProvCityFormComponent extends PureComponent {
  displayRender = label => {
    return label.join(' / ');
  };

  render() {
    const { getFieldDecorator, regionList } = this.props;
    return (
      <Col md={6} sm={24} key={'provCity'}>
        <FormItem label="省市">
          {getFieldDecorator('provCity', {
            getValueProps: value => value,
          })(
            <Cascader
              options={regionList}
              fieldNames={{ label: 'label', value: 'value', children: 'list' }}
              placeholder="请选择省市"
              displayRender={this.displayRender}
              changeOnSelect
            />
          )}
        </FormItem>
      </Col>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  regionList: state.session.regionList,
  getFieldDecorator: ownProps.getFieldDecorator,
});

const ProvCityFormItemRedux = connect(
  mapStateToProps,
  null
)(ProvCityFormComponent);

export { ProvCityFormItemRedux, ProvCityFormComponent };

export default ProvCityFormItemRedux;
