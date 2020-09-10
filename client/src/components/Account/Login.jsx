import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import authService from '../../services/authService';
import userService from '../../services/userService';
import Cookies from "js-cookie";
import AuthApi from "../../AuthApi";
import setAuthorizationToken from "../../services/setAuthorizationToken";

function Login () {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(null);
  const Auth = React.useContext(AuthApi);

  async function loginUser() {
    const obj = {
      userName: userName,
      password: password,
    };
    const { data } = await authService.signIn(obj);
    await Cookies.set("token", data);
    setAuthorizationToken(data);
    const response = await userService.get();
    const userData = response.data;
    if(userData.roles === "ROLE_USER") {
      Auth.setAuth(true);
      setRedirect('/booking')
    }
    if(userData.roles === "ROLE_ADMIN") {
      Auth.setAuth(true);
      setRedirect('/adminPage');
    }
  }

    if (redirect) {
      return <Redirect to={redirect} />;
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
            className="btn btn-large btn-block btn-success"
          >
            Login
          </button>
        </div>
      </div>
    );
}

export default Login;
