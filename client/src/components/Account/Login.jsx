import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import authService from '../../services/authService';
import userService from '../../services/userService';
import setAuthorizationToken from '../../services/setAuthorizationToken';

function Login(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser() {
    const obj = {
      userName: userName,
      password: password,
    };
    const { data } = await authService.signIn(obj);
    localStorage.setItem('token', data);
    setAuthorizationToken(data);
    const response = await userService.get();
    const userData = response.data;
    if (userData.roles === 'ROLE_USER') {
      props.history.push('/booking');
    }
    if (userData.roles === 'ROLE_ADMIN') {
      props.history.push('/adminPage');
    }
  }
  return (
    <div className="base-container">
      <div className="header">Login</div>
      <div className="content">
        <div className="form">
          <div className="form-group">
            <label>UserName:</label>
            <input
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              type="text"
              name="userName"
              id="userName"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              name="password"
              id="password"
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <button
          onClick={() => loginUser()}
          className="w3-btn w3-block w3-green w3-large"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default withRouter(Login);
