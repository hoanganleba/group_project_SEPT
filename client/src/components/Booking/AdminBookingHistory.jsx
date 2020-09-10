import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import authService from '../../services/authService';
import userService from '../../services/userService';
import bookingService from '../../services/bookingService';
import moment from 'moment';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class AdminBookinghistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: 0,
      bookingList: [],
      bookingId:0,
      startDateTime: '',
      endDateTime: '',
      type: '',
      status: '',
    };
    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

  }
  async fetchData() {
    const { data } = await userService.get();
    const { data2 } = await bookingService.getAllBooking();
    return this.setState({
      bookingList: data.bookingHistories,
      customerId: data.id,

    });
  }
  componentDidMount() {
    this.fetchData();

  }
  filterbyop1() {
    userService.getall().then(
      res => {
        const list = res.data
        let filterlist = list.filter(s => String(s.roles).startsWith('ROLE_ADMIN'))
        this.setState({ details: filterlist })

      })
  }
  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }
  delete(bookingId) {
    if (window.confirm('Do you want to cancel?')) {
      bookingService
        .cancelBooking(bookingId)
        .then(() => window.location.reload());
      return this.fetchData();
    }
  }
  edit(bookingId,startDateTime, endDateTime, type, status) {
    this.setState({
      bookingId:bookingId,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      type: type,
      status: status,
      addNew: false,
    });
   
    console.log(this.state.bookingId)
    console.log(this.state.type)
    console.log(this.state.status)
    console.log(this.state.startDateTime)
    console.log(this.state.endDateTime)
  }
  accept(bookingId) {
    this.edit()

    const obj = {

      status: 'Accept',
    };

    bookingService
      .editBooking(bookingId, obj)
      .then(() => window.location.reload());
    return this.fetchData();

  }
  reject(bookingId) {
    const obj = {


      status: 'Reject',
    };
    bookingService
      .editBooking(bookingId, obj)
      .then(() => window.location.reload());
    return this.fetchData();
  }

  render() {
    return (
      <div>
        <div className="w3-content w3-border-left w3-border-right">

          <div className="dropdown" >
            <div className="btn btn-success" onClick={this.showDropdownMenu}> Filter </div>

            {this.state.displayMenu ? (
              <div>
                <button className='btn btn-dark' onClick={this.fetchData.bind(this)}>All</button>
                <button className='btn btn-dark' onClick={this.filterbyop1.bind(this)}>January</button>

              </div>
            ) :
              (
                null
              )
            }

          </div>

          <table className="w3-table-all">
            <thead>
              <tr>
                <th>Check in</th>
                <th>Check out</th>
                <th>Court Type</th>
                <th>Status</th>
                <th>Customer ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.bookingList.map((book, index) => (
                <tr key={index}>
                  <td>{book.startDateTime}</td>
                  <td>{book.endDateTime}</td>
                  <td>{book.type}</td>
                  <td>{book.status}</td>
                  <td>{this.state.customerId}</td>
                  <td>
                    <button
                      className="btn-danger w3-padding"
                      onClick={this.delete.bind(this, book.id)}
                    >
                      Cancel
                    </button>

                    <button
                      className="btn-danger w3-padding"
                      onClick={this.delete.bind(
                        this,
                        this.state.customerId,
                        book.id
                      )}
                    >
                      Reject
                    </button>
                    <button
                      className="btn-success w3-padding"
                      onClick={this.edit.bind(
                        this,
                        book.bookingId,
                        book.startDateTime,
                        book.endDateTime,
                        book.type,
                        book.status,
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