import React from "react";
import "../../w3school.css";
import {Link, BrowserRouter} from "react-router-dom";

const url = "";
export default class EmployeeProfile extends React.Component {
  render() {
    return (
        <div style={{ background: "grey" }}>
        <div className="w3-content" style={{ width: 500 }}>
            <div class="w3-white w3-text-black w3-card-4">
            <div class="w3-display-container">
                <center><img
                src={require("../Booking/images/avatar.jpg")}
                height={350}
                style={{width: '100%'}}
                alt="Avatar"
                /></center>
                <div class="w3-display-bottomleft w3-container w3-text-gray">
                <h2>Thinh Nguyen</h2>
                </div>
            </div>
            <div class="w3-row-padding">
                    <div className='w3-twothird'>
                        <br></br>
                        <p>
                        <i class="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal"></i>
                        Tennis Coach
                        </p>
                        <br></br>
                        <p>
                        <i class="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"></i>
                        Viet Nam, HCM City
                        </p>
                        <br></br>
                        <p>
                        <i class="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>
                        ex@mail.com
                        </p>
                        <br></br>
                        <p>
                        <i class="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"></i>
                        1224435534
                        </p>
                    </div>
                    <div className='w3-third'>
                        <div className="fa fa-pencil w3-button"><Link to={"/editemployee"}> Edit Profile</Link></div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}
