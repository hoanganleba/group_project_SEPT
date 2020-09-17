import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../w3school.css';
<<<<<<< HEAD
import Cookies from 'universal-cookie';
import userService from '../services/userService';
const cookies = new Cookies();
=======
import userService from '../services/userService';
import setAuthorizationToken from "../services/setAuthorizationToken";

>>>>>>> frontend
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
<<<<<<< HEAD
    cookies.remove('jwt-token');
=======
    localStorage.removeItem('token');
>>>>>>> frontend
    this.setState({ redirect: '/' });
  }

  async fetchData() {
<<<<<<< HEAD
=======
    setAuthorizationToken(localStorage.getItem('token'))
>>>>>>> frontend
    const { data } = await userService.get();
    return this.setState({
      userName: data.userName,
    });
  }
<<<<<<< HEAD
  componentDidMount() {
=======

  componentWillMount() {
>>>>>>> frontend
    return this.fetchData();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
<<<<<<< HEAD
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
                <Link to={'/adminComment'}>Comment and Rating</Link>
              </li>
              <li className="w3-bar-item w3-button">
                <Link to={'/adminHistory'}>Booking History</Link>
              </li>
              <li className="w3-bar-item w3-button">
                <Link to={'/userlist'}>User List</Link>
              </li>
              <li className="w3-bar-item w3-button">
                Welcome Admin {this.state.userName}
              </li>
              <button className="w3-bar-item w3-button" onClick={this.signOut}>
                Log out
              </button>
            </ul>
=======
      <div>
        <nav className="w3-sidebar w3-bar-block w3-white w3-animate-right w3-top w3-text-black w3-large"
          style={{ display: "none", zIndex: 4, width: 200, right: 0 }} id="mySidebar">
          <a onClick={this.close}
            className="w3-bar-item w3-black w3-button w3-center w3-padding-32">Close Menu</a>

          <a onClick={this.close}
            className="w3-bar-item w3-button w3-center w3-padding-32"><Link to={"/manageemployee"}>Manage Employee</Link></a>

          <a onClick={this.close}
            className="w3-bar-item w3-button w3-center w3-padding-32"><Link to={"/adminHistory"}>Booking Request</Link></a>

          <a onClick={this.close}
            className="w3-bar-item w3-button w3-center w3-padding-32"><Link to={"/adminComment"}>Check Comments</Link></a>

          <button className="w3-bar-item w3-button w3-center w3-padding-32" onClick={this.signOut}>
            Log out
              </button>
        </nav>
        <div className="w3-top" style={{ zIndex: 3 }}>
          <div className="w3-bar w3-white w3-wide w3-padding w3-card">
            <li className="w3-bar-item w3-button">
              <Link to={'/adminPage'}>
                <i className="fa fa-home fa-fw w3-large w3-text-teal" />
                <b>Home</b>
              </Link>
            </li>
            <li className="w3-bar-item">
              Welcome Admin {this.state.userName}
            </li>
            <div className="w3-right w3-hide-small">
              <ul>

                <li className="w3-button w3-right" onClick={this.open}>
                  <i className="fa fa-user-circle w3-xlarge" /></li>

              </ul>
            </div>
>>>>>>> frontend
          </div>
        </div>
      </div>
    );
  }
<<<<<<< HEAD
=======
  open() {
    document.getElementById("mySidebar").style.display = "block";
  }

  close() {
    document.getElementById("mySidebar").style.display = "none";
  }
>>>>>>> frontend
}

export default AdminNavBar;
