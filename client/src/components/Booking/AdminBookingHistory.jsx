import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import authService from '../../services/authService';
import userService from '../../services/userService';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class AdminBookinghistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      roles: '',
      redirect: null,
    };
    this.loginUser = this.loginUser.bind(this);
    this.loginAdmin = this.loginAdmin.bind(this);
  }
  async fetchData() {
    const { data } = await userService.get();
    return this.setState({
      roles: data.roles,
    });
  }
  loginUser(e) {
    const obj = {
      userName: this.state.userName,
      password: this.state.password,
    };
    authService.signIn(obj).then((res) => {
      cookies.set('jwt-token', res.data, { path: '/' });
    });

    this.fetchData();
    if (this.state.roles == 'ROLE_USER') {
      this.setState({ redirect: '/booking' });
      this.setState({ roles: '' });
      console.log(this.state.roles);
    } else {
      alert('Access denied');
      console.log(this.state.roles);
    }
  }
  loginAdmin(e) {
    const obj = {
      userName: this.state.userName,
      password: this.state.password,
    };
    authService.signIn(obj).then((res) => {
      cookies.set('jwt-token', res.data, { path: '/' });
    });

    this.fetchData();

    console.log(this.state.roles);

    if (this.state.roles == 'ROLE_ADMIN') {
      this.setState({ redirect: '/adminpage' });
      this.setState({ roles: '' });
      console.log(this.state.roles);
    } else {
      alert('Access denied');
      console.log(this.state.roles);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return <h1>in progress</h1>;
  }
}

export default AdminBookinghistory;
