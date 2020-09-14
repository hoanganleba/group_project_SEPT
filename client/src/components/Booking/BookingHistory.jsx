import React from 'react';
import '../../w3school.css';
import userService from '../../services/userService';
import bookingService from '../../services/bookingService';
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: 0,
      bookingList: [],
      startDateTime: '',
      endDateTime: '',
      type: '',
      status:'',
    };
  }
  async fetchData() {
    const { data } = await userService.get();

    return this.setState({
      bookingList: data.bookingHistories,
      customerId: data.id,
    });
  }
  componentDidMount() {
    this.fetchData();
  }
  delete(bookingId) {
    if (window.confirm('Do you want to cancel?')) {
      bookingService
        .cancelBooking(bookingId)
        
      return this.fetchData();
    }
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
                <th>Status</th>
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
                  <td>
                    <button
                      className="btn-danger w3-padding"
                      onClick={this.delete.bind(this, book.id)}
                    >
                      Cancel
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

export default List;
