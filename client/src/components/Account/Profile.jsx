import React from "react";
import "../../w3school.css";
import { Link } from "react-router-dom";
import userService from '../../services/userService';
const url = "";
export default class Profile extends React.Component {
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




  render() {
    return (
      <div style={{ background: "grey" }}>
        <div className="w3-content" style={{ width: 500 }}>
          <div class="w3-white w3-text-black w3-card-4">
            <div class="w3-display-container">
              <center><img
                src={require("../Booking/images/avatar.jpg")}
                height={350}
                style={{ width: '100%' }}
                alt="Avatar"
              /></center>
              <div class="w3-display-bottomleft w3-container w3-text-gray">
                <h2>{this.state.firstName} {this.state.lastName}</h2>
              </div>
            </div>
            <div class="w3-row-padding">
              <div className='w3-twothird'>
                <br></br>
                <p>
                  <i class="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal"></i>
                  {this.state.job}
                        </p>
                <br></br>
                <p>
                  <i class="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"></i>
                  {this.state.address}
                        </p>
                <br></br>
                <p>
                  <i class="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>
                  {this.state.email}
                </p>
                <br></br>
                <p>
                  <i class="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"></i>
                  {this.state.phone}
                        </p>
              </div>
              <div className='w3-third'>
                <div className="fa fa-pencil w3-button"><Link to={"/editprofile"}> Edit Profile</Link></div>
              </div>
            </div>
            <hr></hr>
            <div class="w3-row-padding">
              <div className='w3-twothird'>
                <br></br>
                <p className="w3-large"><b><i class="fa fa-asterisk fa-fw w3-margin-right w3-text-teal"></i>User Name:</b></p>
                <p>{this.state.userName} {console.log('333' + this.state.userName)}</p>

                <p className="w3-large"><b><i class="fa fa-asterisk fa-fw w3-margin-right w3-text-teal"></i>Password:</b></p>
                <p> {this.state.passWord} {console.log('123' + this.state.passWord)}</p>
              </div>
              <div className='w3-third'>
                <div className="fa fa-pencil w3-button"><Link to={"/editprofile"}> Change Password</Link></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
