import "../../style.scss";
import React, { Component } from 'react';

const url = null;
export default class Bookinghistory extends Component {
    constructor(props){
        super (props);
        this.state = {
            addNew: true,
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
                <div className="base-container">
                    <div className="content">
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
        )
    }
}