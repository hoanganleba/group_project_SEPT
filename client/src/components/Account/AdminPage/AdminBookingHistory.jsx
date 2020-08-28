import React from 'react';
import '../../../w3school.css';
import userService from '../../../services/userService';


class AdminBookinghistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: 0,
      bookingList: [],
      startDateTime: '',
      endDateTime: '',
      type: '',
    };
    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

  }
  async fetchData() {
    const { data } = await userService.get();

    return this.setState({
      bookingList: data.bookingList,
      customerId: data.id,

    });
  }
  componentDidMount() {
    this.fetchData();

  }
  filterbyop1() {
    userService.getall().then(
          res => {
            const list= res.data
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
  delete(customerId, bookingId) {
    if (window.confirm('Do you want to cancel?')) {
      userService.delete(customerId, bookingId);
      window.location.reload();
      return this.fetchData();
    }
  }
  render() {
    return (
      <div>
        <div className="w3-content w3-border-left w3-border-right">
          
        <div className="dropdown" >
            <div className="btn btn-success"  onClick={this.showDropdownMenu}> Filter </div>

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
                  <td>{this.state.customerId}</td>
                  <td>
                    <button
                      className="btn-danger w3-padding"
                      onClick={this.delete.bind(
                        this,
                        this.state.customerId,
                        book.id
                      )}
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




export default AdminBookinghistory;
