import React, { Component } from 'react';
import axios from 'axios';
import UserDetail from './UserDetail/UserDetail';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <div ref={this.props.userRef}>
        <UserDetail />
      </div>
    );
  }
}
export default UserPage;
