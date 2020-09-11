import React from "react";
const url = "http://localhost:3000";
export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",

            email: "",
            password: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }
    fetchData() {
        fetch(url)
            .then((res) => res.json())
            .then((json) => this.setState({ bookings: json }));
    }
    componentDidMount() {
        this.fetchData();
    }
    handleChange(e) {
        var obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }
    save() {
        fetch(url + "/customers", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                fname: this.state.fname,
                lname: this.state.lname,
                email: this.state.email,
                password: this.state.password,
            }),
        })
            .then((res) => res.json())
            .then((json) => this.fetchData());
    }
    render() {
        return (
            <div>
                <div className="w3-content" style={{ width: 500 }}>
                    <div className="w3-white w3-text-black w3-card-4">
                        <br/>
                        <center><h2><b><p className='w3-text-gray'>Change Your Password Here</p></b></h2></center>
                        <div className="form">
                            <div className="w3-input w3-border">
                                <label>User Name: </label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <div className="w3-input w3-border">
                                <label>Password: </label>
                                <input
                                    type="text"
                                    id="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="footer">
                                <center><button onClick={this.save} className="btn btn-success w3-margin">Save</button></center>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
