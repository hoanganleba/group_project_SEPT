import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import authService from '../../services/authService';
import userService from '../../services/userService';
<<<<<<< HEAD
=======
import bookingService from '../../services/bookingService';
import moment from 'moment';
>>>>>>> frontend
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class AdminBookinghistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      userName: '',
      password: '',
      roles: '',
      redirect: null,
    };
    this.loginUser = this.loginUser.bind(this);
    this.loginAdmin = this.loginAdmin.bind(this);
  }
  async fetchData() {
    const { data } = await userService.get();
    return this.setState({
      roles: data.roles,
    });
  }
  loginUser(e) {
    const obj = {
      userName: this.state.userName,
      password: this.state.password,
    };
    authService.signIn(obj).then((res) => {
      cookies.set('jwt-token', res.data, { path: '/' });
    });

    this.fetchData();
    if (this.state.roles == 'ROLE_USER') {
      this.setState({ redirect: '/booking' });
      this.setState({ roles: '' });
      console.log(this.state.roles);
    } else {
      alert('Access denied');
      console.log(this.state.roles);
    }
  }
  loginAdmin(e) {
    const obj = {
      userName: this.state.userName,
      password: this.state.password,
    };
    authService.signIn(obj).then((res) => {
      cookies.set('jwt-token', res.data, { path: '/' });
    });

    this.fetchData();

    console.log(this.state.roles);

    if (this.state.roles == 'ROLE_ADMIN') {
      this.setState({ redirect: '/adminpage' });
      this.setState({ roles: '' });
      console.log(this.state.roles);
    } else {
      alert('Access denied');
      console.log(this.state.roles);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return <h1>in progress</h1>;
  }
}

export default AdminBookinghistory;
=======
      customerId: 0,
      bookingList: [],
      bookingId: 0,
      startDateTime: '',
      endDateTime: '',
      type: '',
      status: '',
    };
   

  }
  async fetchData() {
    const { data } = await bookingService.getAllBooking();
    return this.setState({
      bookingList: data,
    });
  }
  componentDidMount() {
    this.fetchData();
  }


  delete(bookingId) {
    if (window.confirm('Do you want to cancel?')) {
      bookingService
        .cancelBooking(bookingId)
        .then(() => this.fetchData());

    }
  }
  edit(bookingId, startDateTime, endDateTime, type, status) {
    this.setState({
      bookingId: bookingId,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      type: type,
      status: status,
      addNew: false,
    });


  }
  accept(bookingId) {
    const obj = {
      status: 'Accept',
    };
    bookingService
      .changeStatus(bookingId, obj)
      .then(() => this.fetchData());
  }
  reject(bookingId) {
    const obj = {
      status: 'Reject',
    };
    bookingService
      .changeStatus(bookingId, obj)
      .then(() => this.fetchData());
  }

  render() {
    return (
      <div>
        <div className="w3-content w3-border-left w3-border-right">


          <table className="w3-table-all">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Check in</th>
                <th>Check out</th>
                <th>Court Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.bookingList.map((book, index) => (
                <tr key={index}>
                  <td>{book.account.firstName} {book.account.lastName}</td>
                  <td>{book.startDateTime}</td>
                  <td>{book.endDateTime}</td>
                  <td>{book.type}</td>
                  <td>{book.status}</td>
                  <td>
                    <button
                      className="btn-danger w3-padding"
                      onClick={this.delete.bind(this, book.id)}
                    >
                      Delete
                    </button>

                    <button
                      className="btn-danger w3-padding"
                      onClick={this.reject.bind(
                        this, book.id
                      )}
                    >
                      Reject
                    </button>
                    <button
                      className="btn-success w3-padding"
                      onClick={this.accept.bind(
                        this, book.id,
                      )}
                    >
                      Accept
                   </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}




export default AdminBookinghistory;
>>>>>>> frontend
