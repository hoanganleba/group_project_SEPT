import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import authService from '../../services/authService';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      redirect: null,
    };
    this.login = this.login.bind(this);
  }

  login(e) {
    const obj = {
      userName: this.state.userName,
      password: this.state.password,
    };
    authService
      .signIn(obj)
      .then((res) => {
        cookies.set('jwt-token', res.data, { path: '/' });
      })
      .then(() => this.setState({ redirect: '/booking' }))
      .catch((err) => alert('Invalid'));
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <label>UserName:</label>
              <input
                onChange={(e) => this.setState({ userName: e.target.value })}
                value={this.state.userName}
                type="text"
                name="userName"
                id="userName"
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                onChange={(e) => this.setState({ password: e.target.value })}
                value={this.state.password}
                type="password"
                name="password"
                id="password"
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button
            onClick={this.login}
            type="submit"
            className="btn btn-large btn-block btn-success"
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
