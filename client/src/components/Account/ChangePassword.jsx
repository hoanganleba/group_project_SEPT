import React from "react";
import userService from '../../services/userService';

export default class ChangePassword extends React.Component {
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
    console.log(obj)
    userService.editUserDetails(obj)
    .then(alert('Change Password successfully'))
    .then(this.fetchData())
    .catch((error) => alert(error))
 

  }

  render() {
    return (
      <div style={{ background: "white" }}>
        <div className="w3-content" style={{ width: 500 }}>
          <div class="w3-white w3-text-black w3-card-4">
            <br></br>
            <center><h2><b><p className='w3-text-gray'>Change Your Password Here</p></b></h2></center>
            <div className="form">

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
