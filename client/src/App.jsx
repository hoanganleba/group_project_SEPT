import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './components/Account/Index';

import Comment from './components/Account/UserPage/Booking/Comment';
import NavBar from './components/NavBar';
import BookingHistory from './components/Account/UserPage/Booking/BookingHistory';
import PrivateRoute from './components/PrivateRoute';

import UserPage from './components/Account/UserPage/UserPage';
import UserList from './components/Account/UserPage/UserList';


import AdminNavBar from './components/AdminNavBar';
import AdminBookingHistory from './components/Account/AdminPage/AdminBookingHistory';
import AdminComment from './components/Account/AdminPage/AdminComment';
import AdminPage from './components/Account/AdminPage/AdminPage';
import './App.scss';
import './w3school.css';
import UserDetail from './components/Account/UserPage/UserDetail/UserDetail';


function App() {
  return (
    <Router>
      <Switch>

        <Route exact path="/" component={Index} />
        <div style={{ marginTop: '90px' }}>
          <PrivateRoute path="/userPage">
            <NavBar />
            <UserPage />
          </PrivateRoute>
          <PrivateRoute path="/comment">
            <NavBar />
            <Comment />
          </PrivateRoute>
          <PrivateRoute path="/history">
            <NavBar />
            <BookingHistory />
          </PrivateRoute>      
          <PrivateRoute path="/userDetail">
            <NavBar />
            <UserDetail />
          </PrivateRoute>



          <PrivateRoute path="/adminPage">
            <AdminNavBar />
            <AdminPage />
          </PrivateRoute>
          <PrivateRoute path="/adminComment">
            <AdminNavBar />
            <AdminComment />
          </PrivateRoute>
          <PrivateRoute path="/adminHistory">
            <AdminNavBar />
            <AdminBookingHistory />
          </PrivateRoute>
          <PrivateRoute path="/userList">
            <AdminNavBar />
            <UserList />
          </PrivateRoute>
        </div>
      </Switch>
    </Router>
    
  );
}
export default App;
