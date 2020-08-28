import React, {Component} from "react";
import {Link, BrowserRouter} from "react-router-dom";
import "../w3school.css"


export default class Header extends Component {
    render() {
        return (
            <div>
                <div className="w3-top">
                    <div className="w3-bar w3-white w3-wide w3-padding w3-card">
                        <li className="w3-bar-item w3-button"><Link to={"/"}><i
    className="fa fa-home fa-fw w3-large w3-text-teal"/><b>Home</b></Link></li>
                        <div className="w3-right w3-hide-small">
                            <ul>
                                <li className="w3-bar-item w3-button"><Link to={"/"}>Booking</Link></li>
                                <li className="w3-bar-item w3-button"><Link to={"/comment"}>Comment and Rating</Link></li>
                                <li className="w3-bar-item w3-button"><Link to={"/history"}>Booking History</Link></li>
                                <li className="w3-bar-item w3-button"><Link to={"/profile"}>Profile</Link></li>
                                <li className="w3-bar-item w3-button"><Link to={"/manageemployee"}>View Coaches</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}