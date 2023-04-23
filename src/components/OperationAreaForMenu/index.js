import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

export default class OperationAreaForMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }
  componentDidMount() {
    const modalRoot = document.getElementById('operation-root-menu');
    if (this.props && this.props.center) {
      if (!modalRoot.className.includes('operationCenter')) {
        modalRoot.className =
          modalRoot.className === '' ? 'operationCenter' : modalRoot.className + ' ' + 'operationCenter';
      }
    } else {
      if (modalRoot.className.includes('operationCenter')) {
        modalRoot.className = '';
      }
    }
    modalRoot.appendChild(this.el);
  }
  componentWillUnmount() {
    const modalRoot = document.getElementById('operation-root-menu');
    modalRoot.removeChild(this.el);
  }
  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
