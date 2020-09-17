import React, { Component } from 'react';
import axios from "axios";

import userService from '../../../../services/userService';
const url = "http://localhost:3000";
class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [],
            firstName: '',
            lastName: '',
            email: '',
           
            customerId: 0,

        };
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.edit = this.edit.bind(this);
    }

    handleChange(e) {
        var obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }
      async fetchData() {
<<<<<<< HEAD
        const { data } = await userService.getUserDetails(2);
=======
        const { data } = await userService.get();
>>>>>>> frontend

        return this.setState({
          details: data,
          customerId: data.id,

        });
      }
      componentDidMount() {
        this.fetchData();
        {console.log('details'+this.state.details)}
      }
    save(_id) {
        fetch(url + "" + _id, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                _id: this.state._id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            }),
        })
            .then((res) => res.json())
            .then((json) => this.fetchData());

    }
    edit(firstName, lastName, email, password) {
        this.setState({ firstName: firstName, lastName: lastName, email: email, password: password })
    }

    render() {
        return (
            <div>
            <tbody>
                {this.state.details.map((info, index) => (
                    <tr key={index}>
                        <td>First name: {info.firstName}</td>
                        <td>Last name: {info.lastName}</td>
                        <td>Email: {info.email}</td>
                    </tr>
                    
                
                ))}
                
                <button onClick={this.edit.bind(this)}>Edit</button>
                <button onClick={this.save.bind(this)}>Save</button>
                </tbody>
            </div>
        )
    }
}
export default UserDetail;