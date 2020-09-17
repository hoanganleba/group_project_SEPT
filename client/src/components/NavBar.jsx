import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../w3school.css';
import userService from '../services/userService';
import setAuthorizationToken from "../services/setAuthorizationToken";

class NavBar extends Component{
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
  open() {
    document.getElementById("mySidebar").style.display = "block";
  }

  close() {
    document.getElementById("mySidebar").style.display = "none";
  } 
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}/>;
    }
    return (
      <div>
      <nav className="w3-sidebar w3-bar-block w3-white w3-animate-right w3-top w3-text-black w3-large"
        style={{ display: "none", zIndex: 4, width: 200, right: 0 }} id="mySidebar"> 
        <a onClick={this.close}
          className="w3-bar-item w3-black w3-button w3-center w3-padding-32">Close Menu</a>

        <a onClick={this.close}
          className="w3-bar-item w3-button w3-center w3-padding-32"><Link to={"/profile"}>Manage Profile</Link></a>

        <a onClick={this.close}
          className="w3-bar-item w3-button w3-center w3-padding-32"><Link to={"/history"}>Booking </Link></a>

        <a onClick={this.close}
          className="w3-bar-item w3-button w3-center w3-padding-32"><Link to={"/comment"}>Comments</Link></a>

        <button className="w3-bar-item w3-button w3-center w3-padding-32" onClick={this.signOut}>
          Log out
            </button>
      </nav>
      <div className="w3-top" style={{ zIndex: 3 }}>
        <div className="w3-bar w3-white w3-wide w3-padding w3-card">
          <li className="w3-bar-item w3-button">
            <Link to={'/booking'}>
              <i className="fa fa-home fa-fw w3-large w3-text-teal" />
              <b>Home</b>
            </Link>
          </li>
          <li className="w3-bar-item">
            Welcome User {this.state.userName}
          </li>
          <div className="w3-right w3-hide-small">
            <ul>

              <li className="w3-button w3-right" onClick={this.open}>
                <i className="fa fa-user-circle w3-xlarge" /></li>

            </ul>
          </div>
        </div>
      </div>
    </div>
    );
  }

}

export default NavBar
