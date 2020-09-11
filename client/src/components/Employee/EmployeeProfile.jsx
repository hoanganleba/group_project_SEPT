import React from "react";
import "../../w3school.css";
import {Link, BrowserRouter} from "react-router-dom";

const url = "";
export default class EmployeeProfile extends React.Component {
  render() {
    return (
        //Page Container
        <div className="w3-content w3-margin-top" style={{width:1400}}>

            {/* The Grid */}
            <div className="w3-row-padding">

                {/* Left Column */}
                <div className="w3-third">
                    <div class="w3-white w3-text-black w3-card-4">
                        <div class="w3-display-container">
                            <center><img
                            src={require("../Booking/images/avatar.jpg")}
                            style={{width: '100%'}}
                            alt="Avatar"
                            /></center>
                            <div class="w3-display-bottomleft w3-container w3-text-gray">
                            <h2>Thinh Nguyen</h2>
                            </div>
                        </div>
                        <div className="fa fa-pencil w3-button"><Link to={"/editprofile"}> Edit Profile</Link></div>
                        <div className="w3-container">
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
                    </div>

                    {/* End Left Column */}
                </div>

                {/* Right Column */}
                <div className="w3-twothird">

                    <div className="w3-container w3-card w3-white w3-margin-bottom">
                        <h2 className="w3-text-grey w3-padding-16">
                            <i className="fa fa-suitcase fa-fw w3-margin-right w3-xxlarge w3-text-teal"/>
                            Work Experience
                        </h2>

                        <div className="w3-container">
                            <p>10 years experience of working as a tennis coach</p>
                            <p>10 years experience of working as a tennis coach</p>
                            <p>10 years experience of working as a tennis coach</p>
                        </div>
                    </div>

                    <div className="w3-container w3-card w3-white w3-margin-bottom">
                        <h2 className="w3-text-grey w3-padding-16">
                            <i className="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"/>
                            Achievements
                        </h2>

                        <div className="w3-container">
                            <p>Achieve 3 gold medal at Sea Game</p>
                            <p>Achieve 5 silver medal at Sea Game</p>
                            <p>Achieve 11 bronze medal at Sea Game</p>
                        </div>
                    </div>

                    {/* End Right Column */}
                </div>
            </div>
        </div>
    );
  }
}
