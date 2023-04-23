import React, { Component } from 'react';
import { Icon, Input, message, Tooltip } from 'antd';
import styles from './style.module.less';

export default class AddNewItem extends Component {
  state = {
    isEditing: false,
    isSubmitting: false,
    value: '',
  };

  onChange = e => {
    const value = e && e.target.value;
    this.setState({
      value,
    });
  };

  handleSubmit = () => {
    const { onSubmit } = this.props;
    const self = this;
    if (typeof onSubmit === 'function' && !this.state.isSubmitting) {
      self.setState({
        isSubmitting: true,
      });
      onSubmit(self.state.value)
        .then(() => {
          self.setState({
            value: '',
            isEditing: false,
            isSubmitting: false,
          });
        })
        .catch(err => {
          self.setState({
            value: '',
            isEditing: false,
            isSubmitting: false,
          });
          message.error(err.message || err);
        });
    }
  };

  render() {
    const { isEditing, isSubmitting } = this.state;
    if (isEditing) {
      return (
        <Input
          onChange={this.onChange}
          disabled={isSubmitting}
          onPressEnter={this.handleSubmit}
          maxLength={100}
          addonAfter={
            isSubmitting ? (
              <Icon type="loading" />
            ) : (
              <div>
                <Icon type="check" style={{ marginRight: '10px', cursor: 'pointer' }} onClick={this.handleSubmit} />
                <Icon
                  type="close"
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    this.setState({
                      isEditing: false,
                    })
                  }
                />
              </div>
            )
          }
        />
      );
    }
    return (
      <Tooltip title="添加">
        <Icon
          type="plus-circle"
          className={styles.newBtn}
          onClick={() =>
            this.setState({
              isEditing: true,
            })
          }
        />
      </Tooltip>
    );
  }
}
