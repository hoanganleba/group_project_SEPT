import React from "react";
import "../../w3school.css";
import {Link} from "react-router-dom";

const url = "";
export default class Profile extends React.Component {
  render() {
    return (
    <div style={{ background: "grey" }}>
        <div className="w3-content" style={{ width: 450 }}>
            <div className="w3-white w3-text-black w3-card-4">
            <div className="w3-display-container">
                <center><img
                src={require("../Booking/images/avatar.jpg")}
                height={350}
                style={{width: '100%'}}
                alt="Avatar"
                /></center>
                <div className="w3-display-bottomleft w3-container w3-text-gray">
                <h2>Thinh Nguyen</h2>
                </div>
            </div>
            <div className="w3-row-padding">
                    <div className='w3-twothird'>
                        <br/>
                        <p>
                        <i className="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal"/>
                        Designer
                        </p>
                        <br/>
                        <p>
                        <i className="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"/>
                        London, UK
                        </p>
                        <br/>
                        <p>
                        <i className="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"/>
                        ex@mail.com
                        </p>
                        <br/>
                        <p>
                        <i className="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"/>
                        1224435534
                        </p>
                    </div>
                    <div className='w3-third'>
                        <div className="fa fa-pencil w3-button"><Link to={"/editprofile"}> Edit Profile</Link></div>
                    </div>
                </div>
                <hr/>
                <div className="w3-row-padding">
                    <div className='w3-twothird'>
                        <br/>
                            <p className="w3-large"><b><i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal"/>User Name:</b></p>
                                <p>thinh123</p>                   
                        
                            <p className="w3-large"><b><i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal"/>Password:</b></p>
                                <p>123</p>               
                    </div>
                    <div className='w3-third'>
                        <div className="fa fa-pencil"><Link to={"/changepassword"}> Change Password</Link></div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}
