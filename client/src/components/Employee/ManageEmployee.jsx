import React, {Component} from 'react';
import '../../w3school.css';
import { Link } from 'react-router-dom';
import employeeService from '../../services/employeeService';
export default class ManageEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeList: [],
      firstName: '',
      lastName: '',
    };
  }

  async fetchData() {
    const { data } = await employeeService.getAllEmployees();
    return this.setState({
      employeeList: data,
    });
  }

  componentDidMount() {
    return this.fetchData();
  }

  render() {
    return (
      <div>
        <div className="w3-content w3-border-left w3-border-right">
          <center>
            <Link to={'/addemployee'}>
              <button className="btn btn-success">Add Employees</button>
            </Link>
          </center>
          <hr></hr>
          <div className="w3-row w3-grayscale">
            {this.state.employeeList.map((employee, index) => (
              <div className="w3-col l3 s6" key={index}>
                <div className="w3-container">
                  <Link to={`/employeeprofile/${employee.id}`}>
                    <img
                      src={require('../Booking/images/avatar.jpg')}
                      style={{ width: 200 }}
                    />
                  </Link>
                  <p>
                    {employee.firstName} {employee.lastName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
