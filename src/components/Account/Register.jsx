import React from 'react';
const url = null;
export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            phone: '',
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);

    }
    fetchData(){
        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({ bookings: json}))
    }
    componentDidMount(){
        this.fetchData()
    }
    handleChange(e){
        var obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj);
    }
    save(){        
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({fname: this.state.fname, lname: this.state.lname, phone: this.state.phone, email: this.state.email, password: this.state.password })
        }).then(res => res.json())
            .then(json => this.fetchData())             
    }
    render() {
        return(
            <div className="base-container" ref = {this.props.containerRef}>
                <div className="header">Register</div>
                <div className="content">
                    <div className="form">
                        <div className="form-group">
                            <label>First name: </label>
                            <input type="text" id="fname" name="fname" value={this.state.fname} onChange={this.handleChange.bind(this)}required></input>                      
                        </div>
                        <div className="form-group">
                            <label>Last name: </label>
                            <input type="text" id="lname" name="lname" value={this.state.lname} onChange={this.handleChange.bind(this)} required></input>                      
                        </div>
                        <div className="form-group">
                            <label>Phone: </label>
                            <input type="text" id="phone" name="phone" value={this.state.phone} onChange={this.handleChange.bind(this)} required></input>                       
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="text" name="email" id="email" value={this.state.email} onChange={this.handleChange.bind(this)}required />                        
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange.bind(this)} required/>                        
                        </div>
                    </div>
                </div>
                <div className="footer">        
                    <p><button onClick={this.save.bind(this)} className="btn btn-success">Register</button></p>             
                </div>
            </div>
        )
    }
}