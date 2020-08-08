import React from "react";
import "../../w3school.css";

const url = 'http://localhost:3000';
export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Booking: [],
      startDateTime: "",
      endDateTime: "",
      type: "",
    };
  }
  fetchData() {
    fetch(url+'/customers/{customerId}/bookings')
      .then((res) => res.json())
      .then((json) => this.setState({ Booking: json }));
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
      fetch(url + "/customers/{customerId}/bookings/" + _id, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((json) => this.fetchData());
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
    fetch(url+'/customers/{customerId}/bookings/'+_id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
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
            <tr>
              <th>Check in</th>
              <th>Check out</th>
              <th>Court Type</th>
            </tr>
            {this.state.bookings.map((book) => (
              <tr>
                <td>{book.startDateTime}</td>
                <td>{book.endDateTime}</td>
                <td>{book.type}</td>
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
                  onClick={this.delete.bind(this, book._id)}
                >
                  Delete
                </button>
              </tr>
            ))}
          </table>
          <button onClick={this.save.bind(this)}>Save</button>
        </div>
      </div>
    );
  }
}
