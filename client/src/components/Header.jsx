import React, {Component} from "react";
import {Link, BrowserRouter} from "react-router-dom";
import "../w3school.css"

export default class Header extends Component {
    render() {
        return (
            <div>

                <nav className="w3-sidebar w3-bar-block w3-white w3-animate-right w3-top w3-text-black w3-large"
                     style={{display:"none", zIndex: 3, width: 200, right:0}} id="mySidebar">
                    <a onClick={this.close}
                       className="w3-bar-item w3-black w3-button w3-center w3-padding-32">Close Menu</a>
                    <a onClick={this.close}
                       className="w3-bar-item w3-button w3-center w3-padding-32"><Link to={"/profile"}>Profile</Link></a>
                    <a onClick={this.close}
                       className="w3-bar-item w3-button w3-center w3-padding-32"><Link to={"/manageemployee"}>View Coaches</Link></a>

                </nav>

                <div className="w3-top">
                    <div className="w3-bar w3-white w3-wide w3-padding w3-card">
                        <li className="w3-bar-item w3-button"><Link to={"/"}><i
    className="fa fa-home fa-fw w3-large w3-text-teal"/><b>Home</b></Link></li>
                        <div className="w3-right w3-hide-small">
                            <ul>
                                <li className="w3-bar-item w3-button"><Link to={"/"}>Booking</Link></li>
                                <li className="w3-bar-item w3-button"><Link to={"/comment"}>Comment and Rating</Link></li>
                                <li className="w3-bar-item w3-button"><Link to={"/history"}>Booking History</Link></li>
                                <li className="w3-button w3-padding-16 w3-right" onClick={this.open}>☰</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    open()
    {
        document.getElementById("mySidebar").style.display = "block";
    }

    close()
    {
        document.getElementById("mySidebar").style.display = "none";
    }
}