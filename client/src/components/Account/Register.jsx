import React from 'react';
import authService from '../../services/authService';
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      password: '',
      address: '',
      gender: '',
      job: '',
      phone: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    var obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  save() {
   
   
    const obj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      userName: this.state.userName,
      password: this.state.password,
      address: this.state.address,
      gender: this.state.gender,
      job: this.state.job,
      phone: this.state.phone,
    };
    authService
      .signUp(obj)
      .then(alert('Account created successfully'))
      .catch((error) => alert(error));
  }
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <label>First name: </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
                required
              ></input>
            </div>
            <div className="form-group">
              <label>Last name: </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
                required
              ></input>
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                name="userName"
                id="userName"
                value={this.state.userName}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <p>
            <button onClick={this.save.bind(this)} className="btn btn-success">
              Register
            </button>
          </p>
        </div>
      </div>
    );
  }
}
export default Register