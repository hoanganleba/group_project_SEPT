import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../w3school.css';
import Cookies from "universal-cookie";
import userService from '../services/userService';
const cookies = new Cookies();
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      userName: '',
    };
    this.signOut = this.signOut.bind(this);
  }
  signOut() {
    cookies.remove('jwt-token');
    this.setState({ redirect: '/' });
  }

  async fetchData() {
    const { data } = await userService.get();
    return this.setState({
      userName: data.userName,
    });
  }
  componentDidMount() {
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
                <Link to={'/booking'}>Booking</Link>
              </li>
              <li className="w3-bar-item w3-button">
                <Link to={'/comment'}>Comment and Rating</Link>
              </li>
              <li className="w3-bar-item w3-button">
                <Link to={'/history'}>Booking History</Link>
              </li>
              <li className="w3-bar-item w3-button">
                <Link to={'/userList'}>User List</Link>
              </li>
              <li className="w3-bar-item w3-button">Welcome {this.state.userName}</li>
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

export default NavBar
