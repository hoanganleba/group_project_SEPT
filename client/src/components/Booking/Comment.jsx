import "../../style.scss";
import React, { Component } from "react";
import "../../w3school.css";
import axios from "axios";
import userService from "../../services/userService"

const url = "http://localhost:3000";
export default class Bookinghistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewList:[],
      addNew: true,
      _id:"",
      comment: "",
      rating: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
  }
  async fetchData() {
    const {data} = await userService.getReview(1);
    return this.setState({ reviewList: data });
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
  delete(_id) {
    if (window.confirm("Do you want to delete?")) {
      axios.delete(url + "/customers/1/reviews/" + _id)
      return this.fetchData()
    }
  }
  edit(_id, comment, rating) {
    this.setState({
      comment: comment,
      rating: rating,
     
    });
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
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
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
            <div>
        <div className="w3-content w3-border-left w3-border-right">
          <table className="w3-table-all">
            <thead>
              <tr>
               
                <th>rating</th>
                <th>comment</th>
              </tr>
            </thead>
            <tbody>
              {this.state.reviewList.map((review, index) => (
                <tr key={index}>
                  <td>{review.rating}</td>
                  <td>{review.comment}</td>
                  
                  <td>
                    <button
                      className="btn-success w3-padding"
                      onClick={this.edit.bind(
                        this,
                        review.rating,
                        review.comment,
                     
                      )}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger w3-padding"
                      onClick={this.delete.bind(this, review.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={this.save.bind(this)}>Save</button>
        </div>
      </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
