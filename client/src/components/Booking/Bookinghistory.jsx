import React from "react";
import "../../w3school.css";
import axios from "axios";
import userService from "../../services/userService"

const url = "http://localhost:8080/api";
export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingList: [],
      _id:"",
      startDateTime: "",
      endDateTime: "",
      type: "",
    };
  }
  async fetchData() {
    const {data} = await userService.getBookingHistory(2);
    return this.setState({ bookingList: data });
  }
  componentDidMount() {
    this.fetchData();
  }
  handleChange(e) {
    var obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }
  delete(_id) {
    if (window.confirm("Do you want to delete?")) {
      axios.delete(url + "/customers/1/bookings/" + _id)
      return this.fetchData()
    }
  }
  edit(_id, startDateTime, endDateTime, type) {
    this.setState({
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      type: type,
    });
  }

  save(_id) {
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
  render() {
    return (
      <div>
        <div className="w3-content w3-border-left w3-border-right">
          <table className="w3-table-all">
            <thead>
              <tr>
                <th>Check in</th>
                <th>Check out</th>
                <th>Court Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.bookingList.map((book, index) => (
                <tr key={index}>
                  <td>{book.startDateTime}</td>
                  <td>{book.endDateTime}</td>
                  <td>{book.type}</td>
                  <td>
                    <button
                      className="btn-success w3-padding"
                      onClick={this.edit.bind(
                        this,
                        book.startDateTime,
                        book.endDateTime,
                        book.type
                      )}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger w3-padding"
                      onClick={this.delete.bind(this, book.id)}
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
    );
  }
}
