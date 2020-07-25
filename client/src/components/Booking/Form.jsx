import "../../style.scss";
import san_bong_da from "../../images/san-bong-da.jpg"
import React, { Component } from 'react';

const url = null;
export default class Form extends Component {
    constructor(props){
        super (props);
        this.state = {
            addNew: true,
            check_in: '',
            check_out: '',
            type: '',
            comment: '',
            rating: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
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
        this.setState(obj)
    }
    save(){
        if(this.state.addNew === true){
            fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ id: this.state.id, name: this.state.name })
            }).then(res => res.json())
                .then(json => this.fetchData())
        }
        else{
            fetch(url, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ check_in: this.state.check_in, check_out: this.state.check_out, type: this.state.type, comment: this.state.comment, rating: this.state.rating  })
            }).then(res => res.json())
                .then(json => this.fetchData())
        }
       
 
    }
    render() {
        return(
        <div>         
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div className="base-container">
                    <div className="header">Booking</div>
                    <div className="content">
                        <div className="form">
                            <div className="form-group">
                                <label>Check in:</label>
                                <input type="text" id="check_in" name="check_in" value={this.state.check_in} onChange={this.handleChange} placeholder="DD/MM/YYYY" required/>                        
                            </div>
                            <div className="form-group">
                                <label>Check out:</label>
                                <input type="text" id="check_out" name="check_out" value={this.state.check_out} onChange={this.handleChange} placeholder="DD/MM/YYYY" required/>                        
                            </div>
                            <div className="form-group">
                                <label>Type:</label>
                                <select id="type" name="type" value={this.state.type} onChange={this.handleChange}>
                                    <option type="normal">Normal</option>
                                    <option type="premium">Premium</option>
                                </select>                          
                            </div>
                        </div>
                    </div>
                    <div className="footer">        
                        <button onClick={this.save} className="btn btn-success">Save</button>              
                    </div>
                </div>
            </div>    
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">  
                <div className="base-container">
                    <div className="content">
                        <div className="image">
                            <img src={san_bong_da}/>
                        </div>
                        <div className="form">
                            <div className="form-group">
                                <label>Comment</label>
                                <textarea id="comment" name="comment" value={this.state.comment} onChange={this.handleChange} />                        
                            </div>
                            <div className="form-group">
                                <label>Rating</label>
                                <select id="rating" name="rating" value={this.state.rating} onChange={this.handleChange}>
                                    <option type="good">Good</option>
                                    <option type="premium">Bad</option>
                                </select>                           
                            </div>
                        
                        </div>
                    </div>
                    <div className="footer">        
                        <button onClick={this.save} className="btn btn-success">Save</button>              
                    </div>
                </div>
            </div>
        </div>            
        
        )
    }
}