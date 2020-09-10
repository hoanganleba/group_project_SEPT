import React from 'react';
import employeeService from '../../services/employeeService';

export default class AddEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      gender: '',
      address: '',
      job: '',
      phone: '',
      email: '',
      achievements: '',
      workExperience: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
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
      phone: this.state.phone,
      job: this.state.job,
      address: this.state.address,
      gender: this.state.gender,
      achievements: this.state.achievements,
      workExperience: this.state.workExperience,
    };
    console.log(this.state.firstName);
    console.log(this.state.lastName);
    console.log(this.state.email);
    console.log(this.state.workExperience);
    console.log(this.state.address);
    console.log(this.state.achievements);
    employeeService
      .createEmployees(obj)
      .then(alert('Create employee profile successfully'))

      .catch((error) => alert(error));
  }
  render() {
    return (
      <div style={{ background: 'lightblue' }}>
        <div className="w3-content" style={{ width: 500 }}>
          <div class="w3-white w3-text-black w3-card-4">
            <br></br>
            <center>
              <h2>
                <b>
                  <p className="w3-text-gray">Add Employee Profile</p>
                </b>
              </h2>
            </center>
            <div className="form">
              <div className="w3-input w3-border">
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

              <div className="w3-input w3-border">
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

              <div className="w3-input w3-border">
                <label>Gender: </label>
                <select
                  id="gender"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.handleChange}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="w3-input w3-border">
                <label>Email: </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                ></input>
              </div>

              <div className="w3-input w3-border">
                <label>Address: </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleChange}
                  required
                ></input>
              </div>

              <div className="w3-input w3-border">
                <label>Phone: </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                  required
                ></input>
              </div>

              <div className="w3-input w3-border">
                <label>Job: </label>
                <input
                  type="text"
                  id="job"
                  name="job"
                  value={this.state.job}
                  onChange={this.handleChange}
                  required
                ></input>
              </div>

              <div className="w3-input w3-border">
                <label>Achievements: </label>
                <input
                  type="text"
                  id="achievements"
                  name="achievements"
                  value={this.state.achievements}
                  onChange={this.handleChange}
                  required
                ></input>
              </div>

              <div className="w3-input w3-border">
                <label>Work experience: </label>
                <input
                  type="text"
                  id="workExperience"
                  name="workExperience"
                  value={this.state.workExperience}
                  onChange={this.handleChange}
                  required
                ></input>
              </div>
              <div className="footer">
                <center>
                  <button onClick={this.save} className="btn btn-success">
                    Save
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
