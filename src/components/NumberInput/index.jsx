import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

class NumberInput extends PureComponent {
  static defaultProps = {
    onChange: () => {},
    maxLength: 8,
    placeholder: '',
  };

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
  };

  onChange = e => {
    const { value } = e.target;
    const reg = /^(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.props.onChange(value);
    }
  };

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { value, onBlur, onChange } = this.props;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      onChange(value.slice(0, -1));
    }
    if (onBlur) {
      onBlur();
    }
  };

  render() {
    return (
      <Input
        {...this.props}
        onChange={this.onChange}
        onBlur={this.onBlur}
        placeholder={this.props.placeholder}
        maxLength={this.props.maxLength}
      />
    );
  }
}

NumberInput.propTypes = {};

export default NumberInput;
