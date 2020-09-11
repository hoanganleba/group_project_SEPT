import React from "react";
const url = "http://localhost:3000";
export default class EditProfile extends React.Component {
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
      <div style={{ background: "lightblue" }}>
        <div className="w3-content" style={{ width: 500 }}>
          <div class="w3-white w3-text-black w3-card-4">
              <br></br>
              <center><h2><b><p className='w3-text-gray'>Change Your Profile Here</p></b></h2></center>
                <div className="form">
                <div className="w3-input w3-border">
                    <label>First name: </label>
                    <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={this.state.fname}
                    onChange={this.handleChange}
                    required
                    />
                </div>

                <div className="w3-input w3-border">
                    <label>Last name: </label>
                    <input
                    type="text"
                    id="lname"
                    name="lname"
                    value={this.state.lname}
                    onChange={this.handleChange}
                    required
                    />
                </div>

                <div className="w3-input w3-border">
                    <label>Address:</label>
                    <input type="text" name="address" id="address" />
                </div>

                <div className="w3-input w3-border">
                    <label>Email:</label>
                    <input type="text" name="email" id="email" />
                </div>

                <div className="w3-input w3-border">
                    <label>Phone Number:</label>
                    <input type="text" name="phonenumber" id="phonenumber" />
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
