import React, { Component } from 'react';
import userService from '../../../../services/userService';
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            strSearch: '',
            firstName: '',
            lastName: '',
            userName: '',
            findUser: [],
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }
 async fetchData() {
    const { data } = await userService.getall();

    return this.setState({
      users: data,
      findUser: data

    });
  }
  componentDidMount() {
    this.fetchData();

  }
   handleSearch(strSearch) {
        var list = this.state.users;
        if(list){
            var findUser = list.filter((s) =>
                    s.firstName.toLowerCase().includes(strSearch.toLowerCase()) ||
                    s.lastName.toLowerCase().includes(strSearch.toLowerCase()) ||
                    s.userName.toLowerCase().includes(strSearch.toLowerCase())
             );
             this.setState({

                findUser: findUser
             })
        }
        console.log("12")
    }
    handleClear() {
        this.setState({ strSearch: '' });
    }
    handleSearchChange(e) {
        var obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
        console.log(e.target.value);
     }

    render() {
        return (
            <div className="searchForm">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div className="input-group">
                        <input type="text" className="form-control" id = 'strSearch' name = 'strSearch'
                        value={this.state.strSearch} onChange={this.handleSearchChange} placeholder="Search for ..." />
                        <span className="input-group-button">
                            <button onClick={() => {this.handleSearch(this.state.strSearch)}} className="btn btn-info" type="button">Go!</button>
                            <button onClick={this.handleClear} className="btn btn-warning" type="button">Clear</button>
                        </span>
                    </div>
                </div>
                <div>

                </div>
            </div>
        )
    }
}
export default Search;