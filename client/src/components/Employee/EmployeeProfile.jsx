import React, { useEffect, useState } from 'react';
import '../../w3school.css';
import { Link, useParams } from 'react-router-dom';
import employeeService from '../../services/employeeService';

export default function EmployeeProfile() {
  let { id } = useParams();
  const [employeeProfile, setEmployeeProfile] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      const res = await employeeService.getEmployee(id);
      const data = res.data;
      setEmployeeProfile(data);
    };
    fetchEmployee();
  }, []);
  return (
    <div style={{ background: 'grey' }}>
      <div className="w3-content" style={{ width: 500 }}>
        <div class="w3-white w3-text-black w3-card-4">
          <div class="w3-display-container">
            <center>
              <img
                src={require('../Booking/images/avatar.jpg')}
                height={350}
                style={{ width: '100%' }}
                alt="Avatar"
              />
            </center>
            <div class="w3-display-bottomleft w3-container w3-text-gray">
              <h2>{employeeProfile.firstName} {employeeProfile.lastName}</h2>
            </div>
          </div>
          <div class="w3-row-padding">
            <div className="w3-twothird">
              <br></br>
              <p>
                <i class="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal"></i>
                {employeeProfile.job}
              </p>
              <br></br>
              <p>
                <i class="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"></i>
                {employeeProfile.address}
              </p>
              <br></br>
              <p>
                <i class="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>
                {employeeProfile.email}
              </p>
              <br></br>
              <p>
                <i class="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"></i>
                {employeeProfile.phone}
              </p>
            </div>
            <div className="w3-third">
              <div className="fa fa-pencil w3-button">
                <Link to={'/editemployee'}> Edit Profile</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
