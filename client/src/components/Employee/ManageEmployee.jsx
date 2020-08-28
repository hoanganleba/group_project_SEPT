import React from "react";
import "../../w3school.css";
import {Link} from "react-router-dom";

const url = "";
export default class ManageEmployee extends React.Component {
  render() {
    return (
        <div>
            <div className="w3-content w3-border-left w3-border-right">

                <center>
                    <Link to={"/addemployee"}><button className="btn btn-success">Add Employees</button></Link>
                </center>
                <hr></hr>

                <div className="w3-row w3-grayscale">
                    <div className="w3-col l3 s6">
                        <div className="w3-container">
                        <Link to={"/employeeprofile"}><img src={require("../Booking/images/avatar.jpg")} style={{width: 200}}/></Link>
                            <p>Thinh Nguyen</p>
                        </div>
                    </div>
                    <div className="w3-col l3 s6">
                        <div className="w3-container">
                            <img src={require("../Booking/images/avatar.jpg")} style={{width: 200}}/>
                            <p>Duc</p>
                        </div>
                    </div>
                    <div className="w3-col l3 s6">
                        <div className="w3-container">
                            <img src={require("../Booking/images/avatar.jpg")} style={{width: 200}}/>
                            <p>An</p>
                        </div>
                    </div>
                    <div className="w3-col l3 s6">
                        <div className="w3-container">
                            <img src={require("../Booking/images/avatar.jpg")} style={{width: 200}}/>
                            <p>Minh</p>
                        </div>
                    </div>
                    <div className="w3-col l3 s6">
                        <div className="w3-container">
                            <img src={require("../Booking/images/avatar.jpg")} style={{width: 200}}/>
                            <p>Thinh</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
