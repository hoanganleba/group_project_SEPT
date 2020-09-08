import React from "react";
import userService from '../../services/userService';


export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      passWord: '',
      address: '',
      gender: '',
      job: '',
      phone: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
  }
  async fetchData() {
    const { data } = await userService.get();
    return this.setState({
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
  }
  componentDidMount() {
    return this.fetchData();
    window.location.reload()
  }
  handleChange(e) {
    const obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }
  save() {
    const obj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      userName: this.state.userName,
      passWord: this.state.passWord,
      address: this.state.address,
      gender: this.state.gender,
      job: this.state.job,
      phone: this.state.phone,
    };
    console.log(this.state.firstName)
    console.log(this.state.lastName)
    console.log(this.state.email)
    userService.editUserDetails(obj)
      .then(alert('Edit profile successfully'))
      .then(this.fetchData())
      .catch((error) => alert(error))
    window.location.reload()
  }
  render() {
    return (
      <div style={{ background: "lightblue" }}>
        <div className="w3-content" style={{ width: 500 }}>
          <div class="w3-white w3-text-black w3-card-4">
            <br></br>
            <center><h2><b><p className='w3-text-gray'>Change Your Profile Here</p></b></h2></center>
            <div className="form">
              <div className="w3-input w3-border">
                <label>First name: </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  onChange={this.handleChange}
                  value={this.state.firstName}
                  placeholder={this.state.firstName} ></input>
              </div>

              <div className="w3-input w3-border">
                <label>Last name: </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  onChange={this.handleChange}
                  value={this.state.lastName}
                  placeholder={this.state.lastName} ></input>

              </div>

              <div className="w3-input w3-border">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  placeholder={this.state.email} ></input>

              </div>

              <div className="w3-input w3-border">
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  onChange={this.handleChange}
                  value={this.state.address}
                  placeholder={this.state.address} ></input>

              </div>

              <div className="w3-input w3-border">
                <label>Gender:</label>
                <select

                  name="gender"
                  id="gender"
                  onChange={this.handleChange}
                  value={this.state.gender}
                  defaultValue={this.state.gender}
                  placeholder={this.state.gender} >

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
                  placeholder={this.state.job} ></input>

              </div>

              <div className="w3-input w3-border">
                <label>Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  onChange={this.handleChange}
                  value={this.state.phone}
                  placeholder={this.state.phone} ></input>

              </div>

              <div className="w3-input w3-border">
                <label>User Name:</label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  onChange={this.handleChange}
                  value={this.state.userName}
                  placeholder={this.state.userName} ></input>
              </div>

              <div className="w3-input w3-border">
                <label>Password:</label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  onChange={this.handleChange}
                  value={this.state.passWord}
                  placeholder={this.state.passWord} ></input>
              </div>

              <div className="footer">
                <center><button onClick={this.save.bind(this)} className="btn btn-success">Save</button></center>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
