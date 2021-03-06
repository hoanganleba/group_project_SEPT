import React from 'react';

import employeeService from '../../services/employeeService';
import { withRouter } from "react-router";
 class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      gender: '',
      job: '',
      phone: '',
      achievements: '',
      workExperience: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
  }
  async fetchData(id) {
    const { data } = await employeeService.getEmployee(id);
    return this.setState({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      userName: data.userName,
      passWord: data.passWord,
      address: data.address,
      gender: data.gender,
      job: data.job,
      phone: data.phone,
    });
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    return this.fetchData(id);
    
  }
  handleChange(e) {
    const obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }
  save() {
    var id = this.state.id;
    const obj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      achievements: this.state.achievements,
      workExperience: this.state.workExperience,
      address: this.state.address,
      gender: this.state.gender,
      job: this.state.job,
      phone: this.state.phone,
    };
    console.log(id)
    console.log(obj)
 
    employeeService.editEmployees(id,obj)
    .then(alert('Edit employee profile successfully'))
   
    .catch((error) => alert(error))
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
                  <p className="w3-text-gray">Change Employee Profile Here</p>
                </b>
              </h2>
            </center>
            <div className="form">
              <div className="w3-input w3-border">
                <label>First name: </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  onChange={this.handleChange}
                  value={this.state.firstName}
                  placeholder={this.state.firstName}
                ></input>
              </div>

              <div className="w3-input w3-border">
                <label>Last name: </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  onChange={this.handleChange}
                  value={this.state.lastName}
                  placeholder={this.state.lastName}
                ></input>
              </div>

              <div className="w3-input w3-border">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  placeholder={this.state.email}
                ></input>
              </div>

              <div className="w3-input w3-border">
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  onChange={this.handleChange}
                  value={this.state.address}
                  placeholder={this.state.address}
                ></input>
              </div>

              <div className="w3-input w3-border">
                <label>Gender:</label>
                <select
                  name="gender"
                  id="gender"
                  onChange={this.handleChange}
                  value={this.state.gender}
                  defaultValue={this.state.gender}
                  placeholder={this.state.gender}
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="w3-input w3-border">
                <label>Job:</label>
                <input
                  type="text"
                  name="job"
                  id="job"
                  onChange={this.handleChange}
                  value={this.state.job}
                  placeholder={this.state.job}
                ></input>
              </div>

              <div className="w3-input w3-border">
                <label>Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  onChange={this.handleChange}
                  value={this.state.phone}
                  placeholder={this.state.phone}
                ></input>
              </div>

              <div className="w3-input w3-border">
                <label>Achievements:</label>
                <textarea
                  type="text"
                  name="achievements"
                  id="achievements"
                  onChange={this.handleChange}
                  value={this.state.achievements}
                  placeholder={this.state.achievements}
                ></textarea>
              </div>

              <div className="w3-input w3-border">
                <label>Work experience:</label>
                <textarea
                  type="text"
                  name="workExperience"
                  id="workExperience"
                  onChange={this.handleChange}
                  value={this.state.workExperience}
                  placeholder={this.state.workExperience}
                ></textarea>
              </div>

              <div className="footer">
                <center>
                  <button
                    onClick={this.save.bind(this)}
                    className="btn btn-success"
                  >
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
export default withRouter(EditProfile);
