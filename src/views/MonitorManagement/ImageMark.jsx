import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

class ImageMark extends Component {
  saveCanvas = () => {
    console.log(this.saveableCanvas.getSaveData());
  };

  render() {
    return (
      <div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(ImageMark);
