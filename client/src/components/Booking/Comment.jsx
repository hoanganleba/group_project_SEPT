import "../../style.scss";
import React, { Component } from "react";
import "../../w3school.css";

const url = "http://localhost:3000";
export default class Bookinghistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addNew: true,
      comment: "",
      rating: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
  }
  fetchData() {
    fetch(url + "/customers/{customerId}/reviews")
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
      fetch(url + "/customers/{customerId}/reviews", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _id: this.state._id,
          comment: this.state.comment,
          rating: this.state.rating,
        }),
      })
        .then((res) => res.json())
        .then((json) => this.fetchData());
    } else {
      fetch(url + "/customers/{customerId}/reviews/" + _id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _id: this.state._id,
          comment: this.state.comment,
          rating: this.state.rating,
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
            className="w3-sidebar w3-pale-yellow w3-collapse "
            style={{ zIndex: 3, width: 360 }}
            id="mySidebar"
          >
            <div className="w3-container w3-display-container w3-padding-16">
              <h2 className="w3-text-gray">
                {" "}
                <strong>
                  <center>Rating the Service</center>
                </strong>{" "}
              </h2>

              <div className="form">
                <div className="row">
                  <div className="w3-padding">
                    <div>
                      <label>Comment</label>
                    </div>

                    <textarea
                      id="comment"
                      name="comment"
                      value={this.state.comment}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="w3-padding">
                  <div className="row">
                    <div className="col-25">
                      <label>Rating</label>
                    </div>
                    <div className="col-75">
                      <select
                        id="rating"
                        name="rating"
                        value={this.state.rating}
                        onChange={this.handleChange}
                      >
                        <option>Excellent</option>
                        <option>Good</option>
                        <option>Bad</option>
                        <option>Horrible</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer">
              <center>
                <button onClick={this.save} className="w3-button w3-green">
                  Save
                </button>
              </center>
            </div>
          </div>
          <div className="w3-main w3-white" style={{ marginLeft: 360 }}>
            <div className="w3-container">
              <div className="dialogbox">
                <p>Name: Thinh</p>
                <p>Rating: Excellent</p>
                <div className="body">
                  <span className="tip tip-up" />
                  <div className="message">
                    <span>
                      I just made a comment about this comment box which is
                      purely made from CSS.
                    </span>
                  </div>
                </div>
              </div>

              <div className="dialogbox">
                <p>Name: Minh</p>
                <p>Rating: Good</p>
                <div className="body">
                  <span className="tip tip-up" />
                  <div className="message">
                    <span>
                      I just made a comment about this comment box which is
                      purely made from CSS.
                    </span>
                  </div>
                </div>
              </div>

              <div className="dialogbox">
                <p>Name: An</p>
                <p>Rating: Bad</p>
                <div className="body">
                  <span className="tip tip-up" />
                  <div className="message">
                    <span>
                      I just made a comment about this comment box which is
                      purely made from CSS.
                    </span>
                  </div>
                </div>
              </div>

              <div className="dialogbox">
                <p>Name: Duc</p>
                <p>Rating: Horrible</p>
                <div className="body">
                  <span className="tip tip-up" />
                  <div className="message">
                    <span>
                      I just made a comment about this comment box which is
                      purely made from CSS.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
