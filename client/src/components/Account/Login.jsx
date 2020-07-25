import React from 'react';
const url = null;
export class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
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
    login(){
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({email: this.state.email, password: this.state.password })
        }).then(res => res.json())
            .then(json => this.fetchData()) 
    }
    render(){
        return(
        <div className="base-container" ref = {this.props.containerRef}>
            <div className="header">Login</div>
            <div className="content">
                <div className="form">
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text" name="email" id="email"/>                        
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" name="password" id="password"/>                        
                    </div>
                </div>
            </div>
            <div className="footer">        
                <button onClick = {this.login} type="button" className="btn btn-large btn-block btn-success">Login</button>               
            </div>
        </div>

        )
    }
}


