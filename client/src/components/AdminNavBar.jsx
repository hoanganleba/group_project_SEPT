import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../w3school.css';
import userService from '../services/userService';
import setAuthorizationToken from "../services/setAuthorizationToken";

class AdminNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      userName: '',
    };
    this.signOut = this.signOut.bind(this);
  }
  signOut() {
    localStorage.removeItem('token');
    this.setState({ redirect: '/' });
  }

  async fetchData() {
    setAuthorizationToken(localStorage.getItem('token'))
    const { data } = await userService.get();
    return this.setState({
      userName: data.userName,
    });
  }

  componentWillMount() {
    return this.fetchData();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
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
                <Link to={'/adminPage'}>Main page</Link>
              </li>
              <li className="w3-bar-item w3-button">
                <Link to={'/adminComment'}>Comment </Link>
              </li>
              <li className="w3-bar-item w3-button">
                <Link to={'/adminHistory'}>Booking History</Link>
              </li>
              <li className="w3-bar-item w3-button">
                <Link to={'/userlist'}>User List</Link>
              </li>
              <li className="w3-bar-item w3-button">
                <Link to={'/manageemployee'}>View Coach</Link>
              </li>
              <li className="w3-bar-item w3-button">
                Welcome Admin {this.state.userName}
              </li>
              <button className="w3-bar-item w3-button" onClick={this.signOut}>
                Log out
              </button>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminNavBar;
