import React, { Component } from 'react';
import Control from './Function/Control';
import Search from './Function/Search';

import { filter, includes } from 'lodash';
import { Link, Router } from 'react-router-dom';
import Comment from '../../Booking/Comment';
import BookingHistory from '../../Booking/BookingHistory';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            strSearch: '',
            users: [],
        };
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch(value) {
        this.setState({
            strSearch: value
        })
    }

    render() {
        let elmForm = null;
        let usersOrigin = (this.state.users !== null) ? [...this.state.users] : [];
        let users = [];

        // Search
        users = filter(usersOrigin, (user) => {
            return includes(user.name.toLowerCase(), this.state.strSearch.toLowerCase());
        });


        return (
            <div ref={this.props.userRef}>
                <Search />
                <Comment />
                <BookingHistory />

            </div>
        )
    }
}
export default AdminPage;