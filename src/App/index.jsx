import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from 'layouts';
import LoginPage from 'views/LoginPage';
import './index.less';
import 'react-viewer/dist/index.css';

class App extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router basename={'ccweb_new'}>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route path="/" component={Layout} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
