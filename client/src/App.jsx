  
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './components/Account/Index';
import BookingForm from './components/Booking/BookingForm';
import Comment from './components/Booking/Comment';
import NavBar from './components/NavBar';
import BookingHistory from './components/Booking/BookingHistory';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Account/Profile';
import EditProfile from './components/Account/EditProfile';
import ChangePassword from './components/Account/ChangePassword'

import AdminNavBar from './components/AdminNavBar';
import AdminBookingHistory from './components/Booking/AdminBookingHistory';
import AdminComment from './components/Booking/AdminComment';
import AdminPage from './components/Booking/AdminPage';

import ManageEmployee from './components/Employee/ManageEmployee';
import EmployeeProfile from './components/Employee/EmployeeProfile';
import AddEmployee from './components/Employee/AddEmployee';
import EditEmployee from './components/Employee/EditEmployee';
import './App.scss';
import './w3school.css';
import AuthApi from "./AuthApi";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Index} />
        <div style={{ marginTop: '90px' }}>
          <PrivateRoute path="/booking">
            <NavBar />
            <BookingForm />
          </PrivateRoute>
          <PrivateRoute path="/comment">
            <NavBar />
            <Comment />
          </PrivateRoute>
          <PrivateRoute path="/history">
            <NavBar />
            <BookingHistory />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <NavBar />
            <Profile />
          </PrivateRoute>
          <PrivateRoute path="/editprofile">
            <NavBar />
            <EditProfile />
          </PrivateRoute>
          <PrivateRoute path="/changepassword">
            <NavBar />
            <ChangePassword />
          </PrivateRoute>
          <PrivateRoute path="/manageemployee">
            <AdminNavBar />
            <ManageEmployee />
          </PrivateRoute>
          <PrivateRoute path="/employeeprofile/:id">
            <AdminNavBar />
            <EmployeeProfile />
          </PrivateRoute>
          <PrivateRoute path="/addemployee">
            <AdminNavBar />
            <AddEmployee />
          </PrivateRoute>
          <PrivateRoute path="/editemployee/:id">
            <AdminNavBar />
            <EditEmployee />
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
     
        </div>
      </Switch>
    </Router>
  );
}
export default App;
