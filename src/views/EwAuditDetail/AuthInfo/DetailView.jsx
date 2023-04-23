import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Viewer from 'react-viewer';

export default class DetailView extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  render() {
    const { images } = this.props;
    return (
      <div>
        <Viewer
          visible={this.state.modalVisible}
          onClose={this.handleCancel}
          activeIndex={this.state.startIndex}
          images={images}
        />
      </div>
    );
  }
}
