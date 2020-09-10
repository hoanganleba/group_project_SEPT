import React, {Component, useEffect, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../w3school.css';
import userService from '../services/userService';
import Cookies from "js-cookie"
import AuthApi from "../AuthApi";
function NavBar() {
  const [redirect, setRedirect] = useState(null);
  const [userName, setUserName] = useState('');
  const Auth = React.useContext(AuthApi);

  const signOut = () => {
    Cookies.remove('token');
    Auth.setAuth(false);
    setRedirect('/');
  }

  async function fetchData() {
    const {data} = await userService.get();
    setUserName(data.userName)
  }

  useEffect(() => {
    fetchData();
  }, [])

  if (redirect) {
    return <Redirect to={redirect} />;
  }
    return (  
      <div className="w3-top" style={{ zIndex: '1000' }}>
        <div className="w3-bar w3-white w3-wide w3-padding w3-card">
          <li className="w3-bar-item w3-button">
            <Link to={'/booking'}>
              <i className="fa fa-home fa-fw w3-large w3-text-teal" />
              <b>Home</b>
            </Link>
          </li>
          <div className="w3-right w3-hide-small">
            <ul>
              <li className="w3-bar-item w3-button">
                <Link to={'/booking'}>Booking</Link>
              </li>
              <li className="w3-bar-item w3-button">
                <Link to={'/comment'}>Comment and Rating</Link>
              </li>
              <li className="w3-bar-item w3-button">
                <Link to={'/history'}>Booking History</Link>
              </li>
              <li className="w3-bar-item w3-button">Welcome {userName}</li>
              <button className="w3-bar-item w3-button" onClick={() => signOut()}>
                Log out
              </button>
            </ul>
          </div>
        </div>
      </div>
    );
}

export default NavBar
