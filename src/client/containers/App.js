import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom'

import Header from '../components/Header';
import SuperUser from "../components/SuperUser";
import Login from '../components/Login';

class App extends Component {
  renderBody = () => {
    return (
      <Switch>
        <Route path="/login" exact={true} component={Login} />
        <Route path="/user" exact={true} component={SuperUser} />
        <Redirect to='/login' />
      </Switch>
    )
  };

  render() {
    return (
      <div>
        <Header />
        {this.renderBody()}
      </div>
    );
  }
}

export default withRouter(App);
