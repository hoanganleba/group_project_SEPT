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
        //Page Container
        <div className="w3-content w3-margin-top" style={{ width: 1400 }}>

            {/* The Grid */}
            <div className="w3-row-padding">

                {/* Left Column */}
                <div className="w3-third">
                    <div class="w3-white w3-text-black w3-card-4">
                        <div class="w3-display-container">
                            <center><img
                                src={require("../Booking/images/avatar.jpg")}
                                style={{ width: '100%' }}
                                alt="Avatar"
                            /></center>
                            <div class="w3-display-bottomleft w3-container w3-text-gray">
                                <h2>{employeeProfile.firstName} {employeeProfile.lastName}</h2>
                            </div>
                        </div>
                        <div className="fa fa-pencil w3-button"><Link to={`/editemployee/${employeeProfile.id}`}> Edit Profile</Link></div>
                        <div className="w3-container">
                            <br></br>
                            <p>
                                <i class="fa fa-venus-mars fa-fw w3-margin-right w3-large w3-text-teal"></i>
                                {employeeProfile.gender}
                            </p>
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
                    </div>

                    {/* End Left Column */}
                </div>

                {/* Right Column */}
                <div className="w3-twothird">

                    <div className="w3-container w3-card w3-white w3-margin-bottom">
                        <h2 className="w3-text-grey w3-padding-16">
                            <i className="fa fa-suitcase fa-fw w3-margin-right w3-xxlarge w3-text-teal" />
                     Work Experience
                 </h2>

                        <div className="w3-container">
                            {employeeProfile.workExperience}
                        </div>
                    </div>

                    <div className="w3-container w3-card w3-white w3-margin-bottom">
                        <h2 className="w3-text-grey w3-padding-16">
                            <i className="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal" />
                     Achievements
                 </h2>

                        <div className="w3-container">
                            {employeeProfile.achievements}
                        </div>
                    </div>

                    {/* End Right Column */}
                </div>
            </div>
        </div>
    );
}
