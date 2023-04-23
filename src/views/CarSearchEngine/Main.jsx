import React, { Component } from 'react';
import styles from './style.module.less';
import OperationArea from 'components/OperationArea';
import SearchButton from './SearchButton';
import { ViewWrapper } from 'layouts/ViewWrapper';

export default class Main extends Component {
  state = {
    showError: false,
    type: '',
  };

  handleSearch = value => {
    this.setState(
      {
        type: styles.transforming,
      },
      () => {
        setTimeout(() => {
          this.setState({
            type: styles.transformed,
          });
          const { menu } = this.props.match.params;
          const link = `/${menu}/result/carInfo`;
          this.props.history.push(link);
        }, 450);
      }
    );
  };
  render() {
    return (
      <ViewWrapper>
        <OperationArea center>
          <div className={`${styles.searchArea} ${this.state.type}`}>
            <SearchButton type="large" onSearch={this.handleSearch} />
          </div>
        </OperationArea>
      </ViewWrapper>
    );
  }
}
