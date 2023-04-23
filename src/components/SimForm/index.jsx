import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Icon, Row, Col, Cascader } from 'antd';
import styles from '../CCForm/style.module.less';

@Form.create()
class SimForm extends PureComponent {
  static propTypes = {
    formItemList: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired,
    onUpdateQuery: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { query } = this.props;
    this.props.form.setFieldsValue(query);
  }

  handleSearch = () => {
    this.props.onSearch(this.props.query);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.updateQuery();
    this.forceUpdate(this.handleSearch);
  };
  updateQuery = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;

      this.props.onUpdateQuery(fieldsValue);
    });
  };

  handleFormReset = () => {
    this.props.form.resetFields();
    this.updateQuery();
  };

  renderOperFormItem = () => (
    <div style={{ float: 'right', marginBottom: 24, marginRight: 24 }} key="toggleForm">
      <Button type="primary" htmlType="submit">
        查询
      </Button>
      <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
        重置
      </Button>
    </div>
  );

  renderForm = () => {
    const {
      form: { getFieldDecorator },
      formItemList = [],
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        <Row gutter={8}>
          {formItemList.map(item => item(getFieldDecorator))}
          {this.renderOperFormItem()}
        </Row>
      </Form>
    );
  };
  render() {
    return <div className={styles.tableListForm}>{this.renderForm()}</div>;
  }
}

export default SimForm;
