import React, { Component } from "react";
import Cookies from "universal-cookie";
import "../../style.scss";
import "../../w3school.css";
const cookies = new Cookies();


const url = "http://localhost:8080/api";
export default class Bookingform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addNew: true,
      startDateTime: "",
      endDateTime: "",
      type: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
  }
  fetchData() {
    fetch(url + "/customers/1/bookings", {
      headers: {'Authorization': 'Bearer '+ cookies.get('jwt-token')}
    })
      .then((res) => res.json())
      .then((json) => this.setState({ bookings: json }));
  }
  componentDidMount() {
    this.fetchData();
  }
  handleChange(e) {
    var obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }
  save(_id) {
    if (this.state.addNew === true) {
      fetch(url + "/customers/{customerId}/bookings", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _id: this.state._id,
          startDateTime: this.state.startDateTime,
          endDateTime: this.state.endDateTime,
          type: this.state.type,
        }),
      })
        .then((res) => res.json())
        .then((json) => this.fetchData());
    } else {
      fetch(url + "/customers/{customerId}/bookings/" + _id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _id: this.state._id,
          startDateTime: this.state.startDateTime,
          endDateTime: this.state.endDateTime,
          type: this.state.type,
        }),
      })
        .then((res) => res.json())
        .then((json) => this.fetchData());
    }
  }
  render() {
    return (
      <div>
        <div className="w3-content w3-border-left w3-border-right">
          <div
            className="w3-sidebar w3-light-grey w3-collapse "
            style={{ zIndex: 3, width: 260 }}
            id="mySidebar"
          >
            <div className="w3-container w3-display-container w3-padding-16">
              <div className="base-container">
                <div className="header">Booking Form</div>
                <div className="content">
                  <div className="form">
                    <p>
                      <label>
                        <i className="fa fa-calendar-check-o" /> Check In
                      </label>
                    </p>
                    <input
                      className="w3-input w3-border"
                      type="text"
                      id="startDateTime"
                      name="startDateTime"
                      value={this.state.startDateTime}
                      onChange={this.handleChange}
                      placeholder="hh/mm"
                      required
                    />

                    <p>
                      <label>
                        <i className="fa fa-calendar-o" /> Check Out
                      </label>
                    </p>
                    <input
                      className="w3-input w3-border"
                      type="text"
                      id="endDateTime"
                      name="endDateTime"
                      value={this.state.endDateTime}
                      onChange={this.handleChange}
                      placeholder="hh/mm"
                      required
                    />

                    <br></br>

                    <label>Court Type:</label>
                    <select
                      id="type"
                      name="type"
                      value={this.state.type}
                      onChange={this.handleChange}
                    >
                      <option type="normal">Normal</option>
                      <option type="premium">Premium</option>
                    </select>
                  </div>
                  <div className="footer">
                    <center>
                      <button
                        className="w3-button w3-green"
                        onClick={this.save}
                      >
                        Submit
                      </button>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w3-main w3-white" style={{ marginLeft: 260 }}>
            <div className="w3-container">
              <h2 className="w3-text-green">Booking Tennis Court</h2>

              <div className="w3-display-container mySlides">
                <img
                  src={require("./images/tennis_court_1.jpg")}
                  style={{ width: "100%", height: 500, marginBottom: -6 }}
                  alt={"court 1"}
                />
                <div className="w3-display-bottomleft w3-container w3-black">
                  <p>Normal Court</p>
                </div>
              </div>
              <br></br>
              <div className="w3-display-container mySlides">
                <img
                  src={require("./images/tennis_court_3.jpg")}
                  style={{ width: "100%", height: 500, marginBottom: -6 }}
                  alt={"court 1"}
                />
                <div className="w3-display-bottomleft w3-container w3-black">
                  <p>Premium Court</p>
                </div>
              </div>
            </div>

            <div className="w3-container">
              <h4>
                <strong>The space</strong>
              </h4>
              <div className="w3-row w3-large">
                <div className="w3-col s6">
                  <p>
                    <i className="fa fa-fw fa-clock-o" /> Check In: After 7AM
                  </p>
                  <p>
                    <i className="fa fa-fw fa-clock-o" /> Check Out: 10PM
                  </p>
                </div>
                <div className="w3-col s6">
                  <p>
                    <i className="fa fa-fw fa-male" /> Max people: 10
                  </p>
                </div>
              </div>

              <h4>
                <strong>Facilities</strong>
              </h4>
              <div className="w3-row w3-large">
                <div className="w3-col s6">
                  <p>
                    <i className="fa fa-fw fa-shower" /> Bathroom
                  </p>
                  <p>
                    <i className="fa fa-fw fa-wifi" /> WiFi
                  </p>
                </div>
                <div className="w3-col s6">
                  <p>
                    <i className="fa fa-fw fa-cutlery" /> BBQ
                  </p>
                </div>
              </div>
            </div>

            <div className="w3-container" id="contact">
              <h2>Contact</h2>
              <i className="fa fa-map-marker" style={{ width: 30 }} /> Vietnam,
              Ho Chi Minh City
              <br />
              <i className="fa fa-phone" style={{ width: 30 }} /> Phone:
              123456789 <br />
              <i className="fa fa-envelope" style={{ width: 30 }}>
                {" "}
              </i>{" "}
              Email: nomail@mail.com
              <br />
              <p>Questions? Go ahead, ask them:</p>
              <form target="_blank">
                <p>
                  <input
                    className="w3-input w3-border"
                    type="text"
                    placeholder="Name"
                    required
                    name="Name"
                  />
                </p>
                <p>
                  <input
                    className="w3-input w3-border"
                    type="text"
                    placeholder="Email"
                    required
                    name="Email"
                  />
                </p>
                <p>
                  <input
                    className="w3-input w3-border"
                    type="text"
                    placeholder="Message"
                    required
                    name="Message"
                  />
                </p>
                <button type="submit" className="w3-button w3-green w3-third">
                  Send a Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
