import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import authService from '../../services/authService';
import userService from '../../services/userService';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      roles: '',
      redirect: null,
    };
  }
  fetchData() {
    return userService.get().then((res) => {
      this.setState({ roles: res.data.roles });
    });
  }

  loginUser() {
    const obj = {
      userName: this.state.userName,
      password: this.state.password,
    };
    authService
      .signIn(obj)
      .then((res) => {
        cookies.set('jwt-token', res.data, { path: '/' });
        this.fetchData();
      })
      .then(() => {
        if (this.state.roles === 'ROLE_USER') {
          this.setState({ roles: '' });
          this.setState({ redirect: '/booking' });
        } else if (this.state.roles === 'ROLE_ADMIN') {
          this.setState({ roles: '' });
          this.setState({ redirect: '/adminpage' });
        } else {
          alert('Access denied');
        }
      });
  }

  render() {
    if (this.state.redirect && cookies.get('jwt-token')) {
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
            onClick={() => this.loginUser()}
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
