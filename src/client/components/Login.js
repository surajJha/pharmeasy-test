import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'

import { Form, FormControl, FormGroup, Row, Col, ControlLabel, Button } from 'react-bootstrap';
import { getCookie, setCookie } from '../utils/cookieStorage';

import actions from '../actions';

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  updateStateParams = (type, e) => {
    this.setState({
      [type]: e.target.value
    })
  };

  signIn = (e) => {
    e.preventDefault();
    this.props.actions.signIn(this.state.username, this.state.password);
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.isLogging !== nextProps.isLogging &&
      !nextProps.isLogging &&
      !nextProps.isLoggingError) {
      setCookie("username", nextProps.user.get('name'), 2);
      this.props.history.push(`/user?type=${nextProps.user.get('name')}`);
    }
  }

  componentWillMount() {
    const cookieValue = getCookie("username");
    if (cookieValue !== '') {
      this.props.history.push(`/user?type=${cookieValue}`);
    }
  }

  render() {
    return (
      <Row className="login">
        <Col sm={4} smOffset={4} className="login__container">
          <Form horizontal onSubmit={this.signIn}>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder="Email" onChange={this.updateStateParams.bind(this, 'username')} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl type="password" placeholder="Password" onChange={this.updateStateParams.bind(this, 'password')} />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="submit" className="login__btn">
                  {
                    (this.props.isLogging) ? <div className="radialLoader" /> : 'Sign in'
                  }
                </Button>
              </Col>
            </FormGroup>

            {
              this.props.isLoggingError || true ? <span className="text-danger">{this.props.error}</span> : ''
            }
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogging: state.Login.get('isLogging'),
    isLoggingError: state.Login.get('isLoggingError'),
    user: state.Login.get('user'),
    error: state.Login.get('error')
  };
};

const mapDispatchToProps = (dispatch) => ({
  'actions': bindActionCreators(actions, dispatch)
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
