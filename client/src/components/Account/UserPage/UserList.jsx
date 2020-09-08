import React from 'react';
import '../../../w3school.css';
import userService from '../../../services/userService';
import Search from '../AdminPage/Function/Search';
import authService from '../../../services/authService';
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      password: '',
      roles: '',
    };
    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

    this.handleChange = this.handleChange.bind(this);
  }
  async fetchData() {
    const { data } = await userService.getall();

    return this.setState({
      details: data,
    });
  }
  componentDidMount() {
    this.fetchData();
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

  filterbyop1() {
    userService.getall().then((res) => {
      const list = res.data;
      let filterlist = list.filter((s) =>
        String(s.roles).startsWith('ROLE_ADMIN')
      );
      this.setState({ details: filterlist });
    });
  }
  handleChange(e) {
    var obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  save() {
    const obj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      userName: this.state.userName,
      password: this.state.password,
    };
    authService
      .signUp(obj)
      .then(alert('Account created successfully'))
      .catch((error) => alert(error));
    window.location.reload();
  }
  delete(customerId) {
    if (window.confirm('Do you want to cancel?')) {
      userService.deleteCustomer(customerId);
      window.location.reload();
      return this.fetchData();
    }
  }
  render() {
    return (
      <div>
        <div className="w3-content w3-border-left w3-border-right">
          <div className="dropdown">
            <div className="btn btn-success" onClick={this.showDropdownMenu}>
              {' '}
              Filter{' '}
            </div>

            {this.state.displayMenu ? (
              <div>
                <button
                  className="btn btn-dark"
                  onClick={this.fetchData.bind(this)}
                >
                  All
                </button>
                <button
                  className="btn btn-dark"
                  onClick={this.filterbyop1.bind(this)}
                >
                  Admin User
                </button>
              </div>
            ) : null}
          </div>

          <table className="w3-table-all">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>User Name</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.details.map((list, index) => (
                <tr key={index}>
                  <td>{list.id}</td>
                  <td>{list.firstName}</td>
                  <td>{list.lastName}</td>
                  <td>{list.email}</td>
                  <td>{list.userName}</td>
                  <td>{list.roles}</td>
                  <td>
                    <button
                      className="btn-danger w3-padding"
                      onClick={this.delete.bind(this, list.id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Create Users</div>
            <div className="content">
              <div className="form">
                <div className="form-group">
                  <label>First name: </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    required
                  ></input>
                </div>
                <div className="form-group">
                  <label>Last name: </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    required
                  ></input>
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    value={this.state.userName}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="footer">
              <p>
                <button
                  onClick={this.save.bind(this)}
                  className="btn btn-success"
                >
                  Create
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserList;
